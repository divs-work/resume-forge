import type { EditorMode } from "@/types/resume";

export const FONTS: Record<EditorMode, string> = {
  latex:    "'STIX Two Text', 'Latin Modern Roman', 'Computer Modern', Georgia, serif",
  markdown: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
  html:     "'DM Sans', system-ui, sans-serif",
};

export const FONT_IMPORTS: Record<EditorMode, string> = {
  latex:
    "https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap",
  markdown:
    "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap",
  html:
    "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
};
