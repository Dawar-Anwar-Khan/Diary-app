"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { SubjectEntry, HomeworkTemplate, CLASS_OPTIONS } from "@/lib/types";
import { useTemplates } from "@/lib/useTemplates";
import SubjectRow from "./components/SubjectRow";
import SaveTemplateModal from "./components/SaveTemplateModal";
import TemplatesSidebar from "./components/TemplatesSidebar";

const WhiteboardMockup = dynamic(
  () => import("./components/WhiteboardMockup"),
  {
    ssr: false,
  },
);

function todayStr() {
  return new Date().toISOString().split("T")[0];
}
function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

const DEFAULT_SUBJECTS: SubjectEntry[] = [
  { id: makeId(), name: "Maths", task: "" },
  { id: makeId(), name: "English", task: "" },
  { id: makeId(), name: "Hindi", task: "" },
];

export default function HomePage() {
  const [date, setDate] = useState(todayStr());
  const [className, setClassName] = useState("empty");
  const [schoolName, setSchoolName] = useState("");
  const [subjects, setSubjects] = useState<SubjectEntry[]>(DEFAULT_SUBJECTS);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [downloading, setDownloading] = useState(false);
  const mockupRef = useRef<HTMLDivElement>(null);

  const { templates, saveTemplate, deleteTemplate } = useTemplates();

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }
  function updateSubject(id: string, updated: SubjectEntry) {
    setSubjects((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }
  function removeSubject(id: string) {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }
  function addSubject() {
    setSubjects((prev) => [...prev, { id: makeId(), name: "Maths", task: "" }]);
  }
  function handleSaveTemplate(name: string) {
    saveTemplate({ name, className, subjects });
    setShowSaveModal(false);
    showToast("Template saved!");
  }
  function loadTemplate(t: HomeworkTemplate) {
    setClassName(t.className);
    setSubjects(t.subjects.map((s) => ({ ...s, id: makeId() })));
    setSidebarOpen(false);
    showToast(`Loaded: ${t.name}`);
  }

  async function downloadImage() {
    if (!mockupRef.current) return;
    setDownloading(true);
    try {
      const { downloadMockupAsImage } = await import("@/lib/downloadMockup");
      const fname = `Homework_${className.replace(" ", "_")}_${date}`;
      await downloadMockupAsImage(mockupRef.current, fname);
      showToast("Image downloaded!");
    } catch (e) {
      console.error(e);
      showToast("Download failed, please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f1117" }}>
      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-40"
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
          borderBottom: "1px solid #2563eb",
          boxShadow: "0 4px 24px rgba(29, 78, 216, 0.4)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            H
          </div>
          <div>
            <h1
              className="text-base font-black leading-tight"
              style={{ color: "#ffffff" }}
            >
              Homework Board
            </h1>
            <p
              className="text-xs leading-tight"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Whiteboard Generator
            </p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition-colors"
          style={{
            background: "rgba(255,255,255,0.12)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          📋 Templates
          {templates.length > 0 && (
            <span
              className="text-xs rounded-full w-5 h-5 flex items-center justify-center font-black"
              style={{ background: "#ffffff", color: "#1d4ed8" }}
            >
              {templates.length}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 items-start">
        {/* LEFT: controls */}
        <div className="flex flex-col gap-4">
          {/* Board Details card */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: "#161b27", border: "1px solid #1e2130" }}
          >
            <h2
              className="text-xs font-black uppercase tracking-widest"
              style={{
               background: "linear-gradient(135deg, #00d2ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Board Details
            </h2>

            <div>
              <label
                className="text-xs font-bold uppercase tracking-wide block mb-1.5"
                style={{ color: "#475569" }}
              >
                School Name (optional)
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. St. Mary's Primary School"
                className="w-full rounded-lg px-3 py-2.5 text-sm transition-all outline-none"
                style={{
                  background: "#0f1117",
                  border: "1px solid #2d3348",
                  color: "#e2e8f0",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  className="text-xs font-bold uppercase tracking-wide block mb-1.5"
                  style={{ color: "#475569" }}
                >
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                  style={{
                    background: "#0f1117",
                    border: "1px solid #2d3348",
                    color: "#e2e8f0",
                    colorScheme: "dark",
                  }}
                />
              </div>
              <div>
                <label
                  className="text-xs font-bold uppercase tracking-wide block mb-1.5"
                  style={{ color: "#475569" }}
                >
                  Class
                </label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                  style={{
                    background: "#0f1117",
                    border: "1px solid #2d3348",
                    color: "#e2e8f0",
                    colorScheme: "dark",
                  }}
                >
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subjects card */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: "#161b27", border: "1px solid #1e2130" }}
          >
            <h2
              className="text-xs font-black uppercase tracking-widest"
              style={{
                background: "linear-gradient(135deg, #00d2ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Subjects & Homework
            </h2>
            {subjects.map((s) => (
              <SubjectRow
                key={s.id}
                entry={s}
                onChange={(updated) => updateSubject(s.id, updated)}
                onRemove={() => removeSubject(s.id)}
                canRemove={subjects.length > 1}
              />
            ))}
            <button
              onClick={addSubject}
              className="w-full rounded-lg py-2.5 text-sm font-bold transition-colors"
              style={{
                background: "transparent",
                border: "1.5px dashed #2d3348",
                color: "#475569",
              }}
            >
              + Add Subject
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={downloadImage}
              disabled={downloading}
              className="w-full font-black rounded-xl py-3.5 text-sm transition-all"
              style={{
                background: downloading
                  ? "#1e3a8a"
                  : "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
                color: "#fff",
                opacity: downloading ? 0.7 : 1,
                letterSpacing: "0.02em",
                boxShadow: downloading
                  ? "none"
                  : "0 4px 24px rgba(29, 78, 216, 0.4)",
              }}
            >
              {downloading
                ? "Preparing Download…"
                : "⬇  Download High-Quality Image"}
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              className="w-full font-bold rounded-xl py-2.5 text-sm transition-colors"
              style={{
                background: "#161b27",
                border: "1.5px solid #2d3348",
                color: "#94a3b8",
              }}
            >
              💾 Save as Template
            </button>
          </div>

          <p className="text-xs text-center" style={{ color: "#334155" }}>
            Downloaded image is high-res — perfect for WhatsApp
          </p>
        </div>

        {/* RIGHT: mockup preview */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{
               background: "linear-gradient(135deg, #00d2ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Live Preview
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              Updates as you type
            </span>
          </div>
          <div
            ref={mockupRef}
            className="w-full rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 0 1px #1e2130, 0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            <WhiteboardMockup
              dateStr={date}
              className={className}
              subjects={subjects}
              schoolName={schoolName}
            />
          </div>
        </div>
      </main>

      {/* Templates Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className="w-80 h-full flex flex-col"
            style={{ background: "#161b27", borderLeft: "1px solid #1e2130" }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid #1e2130" }}
            >
              <h2 className="font-black" style={{ color: "#f1f5f9" }}>
                Saved Templates
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-2xl leading-none"
                style={{ color: "#475569" }}
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <TemplatesSidebar
                templates={templates}
                onLoad={loadTemplate}
                onDelete={deleteTemplate}
              />
            </div>
          </div>
        </div>
      )}

      {showSaveModal && (
        <SaveTemplateModal
          onSave={handleSaveTemplate}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold px-5 py-2.5 rounded-full z-50"
          style={{
            background: "#1e2130",
            color: "#e2e8f0",
            border: "1px solid #2d3348",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
