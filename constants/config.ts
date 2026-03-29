import type { EditorMode, ModeConfig, TemplateLayout } from "@/types/resume";

export const MODE_CONFIG: Record<EditorMode, ModeConfig> = {
  latex: { label: "LaTeX", fileExt: "tex" },
  markdown: { label: "Markdown", fileExt: "md" },
  html: { label: "HTML + Tailwind", fileExt: "html" },
};

// ── A4 page dimensions ────────────────────────────────────────────────────────
export const A4_WIDTH_PX  = 794;
export const A4_HEIGHT_PX = 1123;
export const A4_WIDTH_MM  = 210;

// ── Default layout ────────────────────────────────────────────────────────────
export const DEFAULT_TEMPLATE_LAYOUT: TemplateLayout = {
  marginMm:   14,
  paddingMm:  10,
  lineHeight: 1.4,
};

// ── Toolbar layout slider ranges ──────────────────────────────────────────────
export const MARGIN_MM_MIN    = 5;
export const MARGIN_MM_MAX    = 40;
export const PADDING_MM_MIN   = 5;
export const PADDING_MM_MAX   = 40;
export const LINE_HEIGHT_MIN  = 1;
export const LINE_HEIGHT_MAX  = 3;
export const LINE_HEIGHT_STEP = 0.1;

// ── Debounce timings ──────────────────────────────────────────────────────────
export const TEXT_DEBOUNCE_MS  = 400;
export const STYLE_DEBOUNCE_MS = 300;

// ── Preview pane ──────────────────────────────────────────────────────────────
export const PREVIEW_INITIAL_SCALE     = 0.7;
export const PREVIEW_CONTAINER_PADDING = 48;   // px subtracted from container width for scale calc
export const PREVIEW_MIN_BODY_HEIGHT   = 100;  // px — below this height the page count is not updated
export const PREVIEW_POLL_MS           = 300;  // ms — iframe body height poll interval

// ── Style panel ───────────────────────────────────────────────────────────────
export const STYLE_PANEL_FONT_SIZE_MIN  = 6;
export const STYLE_PANEL_FONT_SIZE_MAX  = 72;
export const STYLE_PANEL_TEXT_FRAGMENT  = 30;  // chars used for fallback "go to code" line search

// ── Code editor ───────────────────────────────────────────────────────────────
export const EDITOR_FONT_SIZE        = "13px";
export const EDITOR_LINE_HEIGHT      = "1.7";
export const EDITOR_CONTENT_PADDING  = "14px 0";
export const LINE_HIGHLIGHT_MS       = 2000;   // ms — how long the "go to line" highlight stays

export const EDITOR_COLORS = {
  gutterBg:         "#0d1117",
  gutterBorder:     "1px solid #30363d",
  activeLineGutter: "#161b22",
  caretMarkdown:    "#3b82f6",
  caretHtml:        "#f97316",
  caretLatex:       "#ef4444",
  caretFallback:    "#fff",
  gotoLineBg:       "#1c3a5e",
  gotoLineBorder:   "3px solid #3b82f6",
  gotoLineShadow:   "inset 0 0 0 1px #2563eb22",
} as const;

// ── Document builder ──────────────────────────────────────────────────────────
export const SELECTION_OUTLINE        = "2px solid #3b82f6";
export const SELECTION_OUTLINE_OFFSET = "2px";
export const TEXT_CONTENT_SLICE       = 500;   // max chars sent in rf-click postMessage
export const BODY_FONT_SIZE           = "11pt";
export const LINK_COLOR               = "#1a5fb4";
export const TAILWIND_CDN             = "https://cdn.tailwindcss.com";

// ── Persistence ───────────────────────────────────────────────────────────────
export const STORE_KEY = "resume-forge-v2";
