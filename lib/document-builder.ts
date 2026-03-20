import type { EditorMode } from "@/types/resume";
import { FONTS, FONT_IMPORTS } from "@/constant/fonts";
import { parseMarkdown, parseLatex, sanitizeHTML } from "@/lib/parsers";

export function buildResumeDocument(
  rawContent: string,
  mode: EditorMode,
): string {
  let body: string;
  if (mode === "latex") {
    body = sanitizeHTML(parseLatex(rawContent));
  } else if (mode === "markdown") {
    body = sanitizeHTML(parseMarkdown(rawContent));
  } else {
    body = sanitizeHTML(rawContent);
  }

  const fontUrl = FONT_IMPORTS[mode];
  const fontFamily = FONTS[mode];

  const tailwindScript =
    mode === "html"
      ? `<script src="https://cdn.tailwindcss.com"><\/script>`
      : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
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

  @media screen {
    body {
      ${
        mode === "html"
          ? ""
          : `
      width: 174mm;
      margin: 0 auto;
      padding: 18mm 0;
      `
      }
    }
  }

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
      html, body {
        ${
          mode === "html"
            ? `
        width: 100%;
        margin: 0;
        padding: 0;
        `
            : `
        width: 174mm;
        margin: 0 auto;
        padding: 18mm 0;
        `
        }
        background: #fff;
        overflow: visible;
      }
      a { color: inherit !important; }
    }
</style>
</head>
<body>${body}</body>
</html>`;
}
