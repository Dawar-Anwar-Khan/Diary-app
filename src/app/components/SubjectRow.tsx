"use client";
import { SubjectEntry, SUBJECT_OPTIONS } from "@/lib/types";

interface Props {
  entry: SubjectEntry;
  onChange: (updated: SubjectEntry) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export default function SubjectRow({ entry, onChange, onRemove, canRemove }: Props) {
  return (
    <div className="flex gap-2 items-start">
      <select
        value={entry.name}
        onChange={(e) => onChange({ ...entry, name: e.target.value })}
        className="border border-gray-300 rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 bg-white w-36 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {SUBJECT_OPTIONS.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <textarea
        value={entry.task}
        onChange={(e) => onChange({ ...entry, task: e.target.value })}
        placeholder="Write homework task here..."
        rows={2}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {canRemove && (
        <button
          onClick={onRemove}
          className="mt-1 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-colors flex-shrink-0"
          title="Remove subject"
        >
          ×
        </button>
      )}
    </div>
  );
}
