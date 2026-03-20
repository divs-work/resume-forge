import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditorMode } from "@/types/resume";
import { TEMPLATES } from "@/constant/templates";
import { buildResumeDocument } from "@/lib/document-builder";

interface ResumeState {
  mode: EditorMode;
  content: Record<EditorMode, string>;
  parsed: Record<EditorMode, string>;
  parsedChanged: Date;
  contentChanged: Date;
}

interface ResumeActions {
  setMode: (mode: EditorMode) => void;
  setContent: (value: string) => void;
  setParsed: (value: string) => void;
  resetTemplate: () => void;
}

export type ResumeStore = ResumeState & ResumeActions;

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      mode: "markdown",
      content: { ...TEMPLATES },
      parsed: {
        ...Object.entries(TEMPLATES).reduce(
          (acc, [key, value]) => {
            acc[key as EditorMode] = buildResumeDocument(
              value,
              key as EditorMode,
            );
            return acc;
          },
          {} as Record<EditorMode, string>,
        ),
      },
      parsedChanged: new Date(),
      contentChanged: new Date(),

      setMode: (mode) => set({ mode }),

      setContent: (value) => {
        const { mode } = get();
        set((state) => ({
          content: { ...state.content, [mode]: value },
          parsed: {
            ...state.parsed,
            [mode]: buildResumeDocument(value, mode),
          },
          contentChanged: new Date(),
        }));
      },

      setParsed: (value) => {
        const { mode } = get();
        set((state) => ({
          parsed: { ...state.parsed, [mode]: value },
          parsedChanged: new Date(),
        }));
      },

      resetTemplate: () => {
        const mode = get().mode;
        set((state) => ({
          content: { ...state.content, [mode]: TEMPLATES[mode] },
          parsed: {
            ...state.parsed,
            [mode]: buildResumeDocument(TEMPLATES[mode], mode),
          },
          parsedChanged: new Date(),
          contentChanged: new Date(),
        }));
      },
    }),
    {
      name: "resume-forge",
      partialize: (state) => ({ mode: state.mode, content: state.content }),
    },
  ),
);
