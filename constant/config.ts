import type { EditorMode, ModeConfig, TemplateLayout } from "@/types/resume";

export const MODE_CONFIG: Record<EditorMode, ModeConfig> = {
  latex: { label: "LaTeX", fileExt: "tex" },
  markdown: { label: "Markdown", fileExt: "md" },
  html: { label: "HTML + Tailwind", fileExt: "html" },
};

// A4 page dimensions
export const A4_WIDTH_PX  = 794;
export const A4_HEIGHT_PX = 1123;
export const A4_WIDTH_MM  = 210;

// Default layout applied when resetting or selecting a new template
export const DEFAULT_TEMPLATE_LAYOUT: TemplateLayout = {
  marginMm:   14,
  paddingMm:  10,
  lineHeight: 1.4,
};
