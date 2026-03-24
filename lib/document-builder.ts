import type { EditorMode, ResumeTheme } from "@/types/resume";
import { FONTS, FONT_IMPORTS } from "@/constant/fonts";
import { parseMarkdown, parseLatex, sanitizeHTML } from "@/lib/parsers";

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

export function buildResumeDocument(
  rawContent: string,
  mode: EditorMode,
  theme?: ResumeTheme
): string {
  let body: string;
  if (mode === "latex") {
    body = sanitizeHTML(parseLatex(rawContent, theme!));
  } else if (mode === "markdown") {
    body = sanitizeHTML(parseMarkdown(rawContent, theme!));
  } else {
    body = stripProblematicClasses(sanitizeHTML(rawContent));
  }

  const fontUrl = FONT_IMPORTS[mode];
  const fontFamily = FONTS[mode];

  const tailwindScript = `<script src="https://cdn.tailwindcss.com"><\/script>`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<base target="_blank"/>
<link href="${fontUrl}" rel="stylesheet"/>
${tailwindScript}
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background: #fff;
    overflow-x: hidden;
    overflow-y: visible;
  }

  body {
    font-family: ${fontFamily};
    font-size: 11pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: visible;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a { color: #1a5fb4; text-decoration: none; }
  img { max-width: 100%; height: auto; }

  .page-break { page-break-before: always; break-before: page; }
  h2, h3 { page-break-after: avoid; break-after: avoid; }
  ul, ol { page-break-inside: avoid; break-inside: avoid; }

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    html, body {
      width: 210mm;
      margin: 0;
      padding: 0;
      background: #fff;
      overflow: visible;
    }
    a { color: inherit !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>${
    mode === "html"
      ? body
      : `<div style="width:174mm;margin:0 auto;padding:18mm 0">${body}</div>`
  }</body>
</html>`;
}
