import { EditorMode, ModeConfig } from "@/types/resume";

export const MODE_CONFIG: Record<EditorMode, ModeConfig> = {
  latex: { label: "LaTeX", fileExt: "tex" },
  markdown: { label: "Markdown", fileExt: "md" },
  html: { label: "HTML + Tailwind", fileExt: "html" },
};
