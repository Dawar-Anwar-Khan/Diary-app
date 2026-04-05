"use client";
import { SubjectEntry, SUBJECT_OPTIONS } from "@/lib/types";

interface Props {
  entry: SubjectEntry;
  onChange: (updated: SubjectEntry) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export default function SubjectRow({
  entry,
  onChange,
  onRemove,
  canRemove,
}: Props) {
  return (
    <div className="flex gap-2 items-start">
      <select
        value={entry.name}
        onChange={(e) => onChange({ ...entry, name: e.target.value })}
        className="rounded-lg px-2 py-2 text-sm font-semibold w-20 flex-shrink-0 outline-none"
        style={{
          background: "#0f1117",
          border: "1px solid #2d3348",
          color: "#94a3b8",
          colorScheme: "dark",
        }}
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
        className="flex-1 rounded-lg px-3 py-2 text-sm resize-none outline-none"
        style={{
          background: "#0f1117",
          border: "1px solid #2d3348",
          color: "#e2e8f0",
        }}
      />

      {canRemove && (
        <button
          onClick={onRemove}
          className="mt-1 w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
          style={{
            background: "transparent",
            border: "1px solid #2d3348",
            color: "#475569",
          }}
          title="Remove subject"
        >
          ×
        </button>
      )}
    </div>
  );
}
