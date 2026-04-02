"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { SubjectEntry, HomeworkTemplate, CLASS_OPTIONS } from "@/lib/types";
import { useTemplates } from "@/lib/useTemplates";
import SubjectRow from "./components/SubjectRow";
import SaveTemplateModal from "./components/SaveTemplateModal";
import TemplatesSidebar from "./components/TemplatesSidebar";

const WhiteboardMockup = dynamic(() => import("./components/WhiteboardMockup"), {
  ssr: false,
});

function todayStr() {
  return new Date().toISOString().split("T")[0];
}
function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

const DEFAULT_SUBJECTS: SubjectEntry[] = [
  { id: makeId(), name: "Maths",   task: "" },
  { id: makeId(), name: "English", task: "" },
  { id: makeId(), name: "Hindi",   task: "" },
];

export default function HomePage() {
  const [date,       setDate]       = useState(todayStr());
  const [className,  setClassName]  = useState("empty");
  const [schoolName, setSchoolName] = useState("");
  const [subjects,   setSubjects]   = useState<SubjectEntry[]>(DEFAULT_SUBJECTS);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [toast,    setToast]    = useState("");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow">H</div>
          <div>
            <h1 className="text-base font-black text-gray-800 leading-tight">Homework Board</h1>
            <p className="text-xs text-gray-400 leading-tight">Whiteboard Generator</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          📋 Templates
          {templates.length > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {templates.length}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 items-start">

        {/* LEFT: controls */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
            <h2 className="text-sm font-black text-gray-700 uppercase tracking-wide">Board Details</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">School Name (optional)</label>
              <input
                type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. St. Mary's Primary School"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Class</label>
                <select value={className} onChange={(e) => setClassName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {CLASS_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
            <h2 className="text-sm font-black text-gray-700 uppercase tracking-wide">Subjects & Homework</h2>
            {subjects.map((s) => (
              <SubjectRow key={s.id} entry={s}
                onChange={(updated) => updateSubject(s.id, updated)}
                onRemove={() => removeSubject(s.id)}
                canRemove={subjects.length > 1}
              />
            ))}
            <button onClick={addSubject}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm font-bold text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-colors"
            >
              + Add Subject
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={downloadImage} disabled={downloading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black rounded-xl py-3.5 text-base transition-colors shadow-md shadow-blue-200"
            >
              {downloading ? "Preparing Download…" : "⬇ Download High-Quality Image"}
            </button>
            <button onClick={() => setShowSaveModal(true)}
              className="w-full border-2 border-blue-200 text-blue-600 font-bold rounded-xl py-2.5 text-sm hover:bg-blue-50 transition-colors"
            >
              💾 Save as Template
            </button>
          </div>
          <p className="text-xs text-center text-gray-400">Downloaded image is high-res — perfect for WhatsApp</p>
        </div>

        {/* RIGHT: mockup preview */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Live Preview</span>
            <span className="text-xs text-gray-400">Updates as you type</span>
          </div>
          <div ref={mockupRef} className="w-full rounded-xl overflow-hidden shadow-2xl">
            <WhiteboardMockup
              dateStr={date}
              className={className}
              subjects={subjects}
              schoolName={schoolName}
            />
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="w-80 bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-black text-gray-800">Saved Templates</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <TemplatesSidebar templates={templates} onLoad={loadTemplate} onDelete={deleteTemplate} />
            </div>
          </div>
        </div>
      )}
      {showSaveModal && <SaveTemplateModal onSave={handleSaveTemplate} onClose={() => setShowSaveModal(false)} />}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-xl z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
