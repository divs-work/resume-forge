import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditorMode, ResumeTheme, TemplateLayout } from "@/types/resume";
import { TEMPLATES } from "@/constant/templates";
import { DEFAULT_LATEX_THEME } from "@/constant/templates-latex";
import { DEFAULT_MD_THEME } from "@/constant/templates-markdown";
import { DEFAULT_TEMPLATE_LAYOUT } from "@/constant/config";

interface ResumeState {
  mode: EditorMode;
  content: Record<EditorMode, string>;
  latexTheme: ResumeTheme;
  markdownTheme: ResumeTheme;
  templateLayout: TemplateLayout;
  fontId: string;
  focusLine: number | null;
  resetKey: number;
}

interface ResumeActions {
  setMode: (mode: EditorMode) => void;
  setContent: (value: string) => void;
  setLatexTheme: (theme: ResumeTheme) => void;
  setMarkdownTheme: (theme: ResumeTheme) => void;
  setTemplateLayout: (layout: Partial<TemplateLayout>) => void;
  setFontId: (fontId: string) => void;
  setFocusLine: (line: number | null) => void;
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
      templateLayout: { ...DEFAULT_TEMPLATE_LAYOUT },
      fontId: "",
      focusLine: null,
      resetKey: 0,

      setMode: (mode) => set({ mode }),

      setContent: (value) => {
        const { mode } = get();
        set((state) => ({
          content: { ...state.content, [mode]: value },
        }));
      },

      setLatexTheme: (theme) => set({ latexTheme: theme }),
      setMarkdownTheme: (theme) => set({ markdownTheme: theme }),
      setTemplateLayout: (layout) =>
        set((state) => ({ templateLayout: { ...state.templateLayout, ...layout } })),
      setFontId: (fontId) => set({ fontId }),
      setFocusLine: (line) => set({ focusLine: line }),

      resetTemplate: () => {
        const { mode } = get();
        set((state) => ({
          content: { ...state.content, [mode]: TEMPLATES[mode] },
          templateLayout: { ...DEFAULT_TEMPLATE_LAYOUT },
          resetKey: state.resetKey + 1,
        }));
      },
    }),
    {
      name: "resume-forge-v2",
      partialize: (state) => ({
        mode: state.mode,
        content: state.content,
        fontId: state.fontId,
        templateLayout: state.templateLayout,
      }),
    }
  )
);
