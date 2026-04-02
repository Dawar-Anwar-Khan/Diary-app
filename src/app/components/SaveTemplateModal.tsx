"use client";
import { useState } from "react";

interface Props {
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SaveTemplateModal({ onSave, onClose }: Props) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-80">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Save as Template</h3>
        <p className="text-sm text-gray-500 mb-4">
          Give this template a name so you can reuse it later.
        </p>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Class 3 – Week 1"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onSave(name.trim())}
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!name.trim()}
            onClick={() => onSave(name.trim())}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-bold hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
