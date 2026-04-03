import type { EditorMode, ResumeTheme, TemplateLayout } from "@/types/resume";
import { FONTS, FONT_IMPORTS } from "@/constants/fonts";
import { parseMarkdown, parseLatex, sanitizeHTML } from "@/helper/parsers";
import { FONT_OPTIONS } from "@/constants/styleOptions";
import {
  A4_WIDTH_MM,
  DEFAULT_TEMPLATE_LAYOUT,
  BODY_FONT_SIZE,
  LINK_COLOR,
} from "@/constants/config";

// Tailwind variant prefixes that don't apply in a static iframe/print context
const STRIP_VARIANTS =
  /^(?:sm|md|lg|xl|2xl|hover|focus(?:-within|-visible)?|active|visited|checked|disabled|dark|print|group-hover|group-focus|peer-hover|peer-focus|motion-(?:safe|reduce)|selection):/;

// Viewport-relative classes that cause iframe feedback loops
const STRIP_VIEWPORT =
  /^(?:min-h-screen|h-screen|w-screen|min-w-screen|max-h-screen|max-w-screen)$/;

// Animation / transition / cursor classes not needed in static preview
const STRIP_DYNAMIC =
  /^(?:transition|animate|duration|ease|delay|will-change|cursor|scroll-smooth|scroll-auto)(?:-|$)/;

function shouldStrip(cls: string): boolean {
  return (
    STRIP_VARIANTS.test(cls) ||
    STRIP_VIEWPORT.test(cls) ||
    STRIP_DYNAMIC.test(cls)
  );
}

function stripProblematicClasses(html: string): string {
  return html.replace(/class="([^"]*)"/g, (_, classes: string) => {
    const cleaned = classes
      .split(/\s+/)
      .filter((cls) => cls && !shouldStrip(cls))
      .join(" ");
    return `class="${cleaned}"`;
  });
}

const SKIP_TAGS = new Set([
  "script", "style", "head", "html", "body",
  "meta", "link", "title", "base", "noscript",
]);

function injectElementIds(html: string): string {
  let idx = 0;
  return html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>/g,
    (_: string, tag: string, attrs: string = "") => {
      if (SKIP_TAGS.has(tag.toLowerCase())) return `<${tag}${attrs}>`;
      idx++;
      return `<${tag}${attrs} data-rf-el="${idx}">`;
    }
  );
}

// ── Full document for srcDoc thumbnail iframes (TemplatesPanel) ──────────────
// These iframes are pointer-events-none so no click handler is needed.
export function buildResumeDocument(
  rawContent: string,
  mode: EditorMode,
  theme?: ResumeTheme,
  fontId?: string,
  layout?: TemplateLayout
): string {
  const { bodyHTML, fontUrl, styleCSS } = buildResumePayload(
    rawContent, mode, theme, fontId, layout
  );

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<base target="_blank"/>
<link href="${fontUrl}" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"><\/script>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { background: #fff; overflow-x: hidden; overflow-y: visible; }
  ${styleCSS}
  img { max-width: 100%; height: auto; }
  .page-break { page-break-before: always; break-before: page; }
  h2, h3 { page-break-after: avoid; break-after: avoid; }
  ul, ol { page-break-inside: avoid; break-inside: avoid; }
  @page { size: A4; margin: 0; }
</style>
</head>
<body>${bodyHTML}</body>
</html>`;
}

export interface ResumePayload {
  bodyHTML: string;
  fontUrl: string;
  styleCSS: string;
}

export function buildResumePayload(
  rawContent: string,
  mode: EditorMode,
  theme?: ResumeTheme,
  fontId?: string,
  layout?: TemplateLayout
): ResumePayload {
  let body: string;
  if (mode === "latex") {
    body = sanitizeHTML(parseLatex(rawContent, theme!));
  } else if (mode === "markdown") {
    body = sanitizeHTML(parseMarkdown(rawContent, theme!));
  } else {
    body = stripProblematicClasses(sanitizeHTML(rawContent));
  }

  body = injectElementIds(body);

  const overrideFont = fontId ? FONT_OPTIONS.find((f) => f.id === fontId) : null;
  const fontUrl    = overrideFont?.importUrl ?? FONT_IMPORTS[mode];
  const fontFamily = overrideFont?.family    ?? FONTS[mode];

  // When the user picks a custom font, force it on every element so Tailwind
  // utility classes (font-serif, font-sans, etc.) can't override it.
  const fontOverrideCSS = overrideFont
    ? `* { font-family: ${fontFamily} !important; }`
    : "";

  // For Markdown/LaTeX force the user's spacing value on all elements so
  // Tailwind's leading-* classes (injected after our style) can't override it.
  const lineHeightOverrideCSS = mode !== "html"
    ? `* { line-height: ${layout?.lineHeight ?? DEFAULT_TEMPLATE_LAYOUT.lineHeight} !important; }`
    : "";

  const styleCSS = `
    body {
      font-family: ${fontFamily};
      font-size: ${BODY_FONT_SIZE};
      line-height: ${layout?.lineHeight ?? DEFAULT_TEMPLATE_LAYOUT.lineHeight};
      color: #000;
    }
    a { color: ${LINK_COLOR}; text-decoration: none; }
    ${fontOverrideCSS}
    ${lineHeightOverrideCSS}
  `;

  const bodyHTML = mode === "html"
    ? body
    : (() => {
        const marginMm  = layout?.marginMm  ?? DEFAULT_TEMPLATE_LAYOUT.marginMm;
        const paddingMm = layout?.paddingMm ?? DEFAULT_TEMPLATE_LAYOUT.paddingMm;
        const widthMm   = A4_WIDTH_MM - 2 * marginMm;
        return `<div style="width:${widthMm}mm;margin:0 auto;padding:${paddingMm}mm 0">${body}</div>`;
      })();

  return { bodyHTML, fontUrl, styleCSS };
}
