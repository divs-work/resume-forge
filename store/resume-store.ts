import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditorMode, ResumeTheme } from "@/types/resume";
import { TEMPLATES } from "@/constant/templates";
import { buildResumeDocument } from "@/lib/document-builder";
import { DEFAULT_LATEX_THEME } from "@/constant/templates-latex";
import { DEFAULT_MD_THEME } from "@/constant/templates-markdown";

interface ResumeState {
  mode: EditorMode;
  content: Record<EditorMode, string>;
  parsed: Record<EditorMode, string>;
  latexTheme: ResumeTheme;
  markdownTheme: ResumeTheme;
  parsedChanged: Date;
  contentChanged: Date;
}

interface ResumeActions {
  setMode: (mode: EditorMode) => void;
  setContent: (value: string) => void;
  setParsed: (value: string) => void;
  setLatexTheme: (theme: ResumeTheme) => void;
  setMarkdownTheme: (theme: ResumeTheme) => void;
  resetTemplate: () => void;
}

export type ResumeStore = ResumeState & ResumeActions;

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      mode: "markdown",
      content: { ...TEMPLATES },
      latexTheme: DEFAULT_LATEX_THEME,
      markdownTheme: DEFAULT_MD_THEME,

      parsed: {
        ...Object.entries(TEMPLATES).reduce((acc, [key, value]) => {
          acc[key as EditorMode] = buildResumeDocument(
            value,
            key as EditorMode,
            key !== "html"
              ? key === "latex"
                ? DEFAULT_LATEX_THEME
                : DEFAULT_MD_THEME
              : undefined
          );
          return acc;
        }, {} as Record<EditorMode, string>),
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
            [mode]: buildResumeDocument(
              value,
              mode,
              mode !== "html"
                ? mode === "latex"
                  ? DEFAULT_LATEX_THEME
                  : DEFAULT_MD_THEME
                : undefined
            ),
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

      setLatexTheme: (theme) => {
        const { mode } = get();
        set((state) => ({
          parsed: {
            ...state.parsed,
            [mode]: buildResumeDocument(state.content[mode], mode, theme),
          },
          parsedChanged: new Date(),
        }));
      },
      setMarkdownTheme: (theme) => {
        const { mode } = get();
        set((state) => ({
          parsed: {
            ...state.parsed,
            [mode]: buildResumeDocument(state.content[mode], mode, theme),
          },
          parsedChanged: new Date(),
        }));
      },

      resetTemplate: () => {
        const mode = get().mode;
        set((state) => ({
          content: { ...state.content, [mode]: TEMPLATES[mode] },
          parsed: {
            ...state.parsed,
            [mode]: buildResumeDocument(
              TEMPLATES[mode],
              mode,
              mode !== "html"
                ? mode === "latex"
                  ? DEFAULT_LATEX_THEME
                  : DEFAULT_MD_THEME
                : undefined
            ),
          },
          parsedChanged: new Date(),
          contentChanged: new Date(),
        }));
      },
    }),
    {
      name: "resume-forge",
      partialize: (state) => ({ mode: state.mode, content: state.content }),
    }
  )
);
