"use client";
import { useState, useEffect } from "react";
import { HomeworkTemplate } from "./types";

const STORAGE_KEY = "homework_templates";

export function useTemplates() {
  const [templates, setTemplates] = useState<HomeworkTemplate[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTemplates(JSON.parse(raw));
    } catch {}
  }, []);

  function save(updated: HomeworkTemplate[]) {
    setTemplates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function saveTemplate(template: Omit<HomeworkTemplate, "id" | "createdAt">) {
    const newT: HomeworkTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    save([newT, ...templates]);
    return newT;
  }

  function deleteTemplate(id: string) {
    save(templates.filter((t) => t.id !== id));
  }

  return { templates, saveTemplate, deleteTemplate };
}
