"use client";
import { HomeworkTemplate } from "@/lib/types";

interface Props {
  templates: HomeworkTemplate[];
  onLoad: (t: HomeworkTemplate) => void;
  onDelete: (id: string) => void;
}

export default function TemplatesSidebar({ templates, onLoad, onDelete }: Props) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-gray-400">
        <div className="text-3xl mb-2">📋</div>
        No saved templates yet.
        <br />
        Generate a board and save it as a template!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {templates.map((t) => (
        <div
          key={t.id}
          className="border border-gray-200 rounded-xl p-3 hover:border-blue-300 hover:bg-blue-50/40 transition-colors group"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-800 truncate">{t.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.className} · {t.subjects.length} subject{t.subjects.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => onDelete(t.id)}
              className="text-gray-300 hover:text-red-400 text-lg leading-none opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete template"
            >
              ×
            </button>
          </div>
          <button
            onClick={() => onLoad(t)}
            className="mt-2 w-full text-xs text-blue-600 font-bold border border-blue-200 rounded-lg py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
          >
            Load Template
          </button>
        </div>
      ))}
    </div>
  );
}
