import createDOMPurify from "dompurify";
import { FONTS } from "@/constant/fonts";

export function sanitizeHTML(html: string): string {
  if (typeof window === "undefined") return html;
  const purify = createDOMPurify(window);
  return purify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "a",
      "span",
      "div",
      "section",
      "header",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "style", "class", "id", "target"],
    ALLOW_DATA_ATTR: true,
  });
}

/* ═══════════════════════ MARKDOWN → HTML ═══════════════════════ */

export function parseMarkdown(md: string): string {
  const f = FONTS.markdown;

  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /^### (.+)$/gm,
      `<h3 style="font-family:${f};font-size:15px;font-weight:600;margin-top:14px;margin-bottom:2px;color:#111">$1</h3>`,
    )
    .replace(
      /^## (.+)$/gm,
      `<h2 style="font-family:${f};font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;border-bottom:1.5px solid #c4c4c4;padding-bottom:3px;margin-bottom:8px;margin-top:22px;color:#1a1a1a">$1</h2>`,
    )
    .replace(
      /^# (.+)$/gm,
      `<h1 style="font-family:${f};font-size:28px;font-weight:700;text-align:center;letter-spacing:-0.3px;color:#111;margin-bottom:4px">$1</h1>`,
    )
    .replace(
      /^---$/gm,
      '<hr style="border:none;border-top:1.5px solid #d4d4d4;margin:16px 0"/>',
    )
    .replace(
      /^\- (.+)$/gm,
      `<li style="font-family:${f};font-size:13.5px;color:#333;margin-left:16px;line-height:1.55">$1</li>`,
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" style="color:#1a5fb4;text-decoration:none">$1</a>',
    );

  html = html.replace(
    /((?:<li[^>]*>.*?<\/li>\s*)+)/g,
    '<ul style="list-style:disc;padding-left:10px;margin:4px 0">$1</ul>',
  );

  html = html
    .split("\n")
    .map((line) => {
      const t = line.trim();
      if (!t) return "";
      if (/^<(h[1-6]|ul|li|hr|div|section|header|p|br)/.test(t)) return t;
      return `<p style="font-family:${f};font-size:13.5px;color:#333;line-height:1.55;margin:1px 0">${t}</p>`;
    })
    .join("\n");

  return html;
}

/* ═══════════════════════ LATEX → HTML ═══════════════════════ */

export function parseLatex(tex: string): string {
  const f = FONTS.latex;

  let body = tex;
  const match = tex.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (match) body = match[1];

  body = body
    .replace(/\\%/g, "%")
    .replace(/\\&/g, "&amp;")
    .replace(/\\\$/g, "$")
    .replace(/\\#/g, "#")
    .replace(/\\_/g, "_")
    .replace(/\\~/g, "&nbsp;")
    .replace(/~/g, "&nbsp;")
    .replace(/``/g, "\u201C")
    .replace(/''/g, "\u201D")
    .replace(/---/g, "\u2014")
    .replace(/--/g, "\u2013")
    .replace(
      /\\textbf\{(.+?)\}/g,
      `<strong style="font-family:${f};font-weight:700">$1</strong>`,
    )
    .replace(
      /\\textit\{(.+?)\}/g,
      `<em style="font-family:${f};font-style:italic">$1</em>`,
    )
    .replace(
      /\\textsc\{(.+?)\}/g,
      '<span style="font-variant:small-caps">$1</span>',
    )
    .replace(
      /\\texttt\{(.+?)\}/g,
      '<code style="font-family:monospace;font-size:0.92em">$1</code>',
    )
    .replace(
      /\\emph\{(.+?)\}/g,
      `<em style="font-family:${f};font-style:italic">$1</em>`,
    )
    .replace(
      /\\href\{(.+?)\}\{(.+?)\}/g,
      '<a href="$1" style="color:#1a5fb4;text-decoration:none">$2</a>',
    )
    .replace(
      /\\url\{(.+?)\}/g,
      '<a href="$1" style="color:#1a5fb4;text-decoration:none;font-family:monospace;font-size:0.9em">$1</a>',
    )
    .replace(
      /\{\\LARGE\\bfseries (.+?)\}/g,
      `<h1 style="font-family:${f};font-size:26px;font-weight:700;text-align:center;margin-bottom:4px;color:#000">$1</h1>`,
    )
    .replace(
      /\{\\Large\\bfseries (.+?)\}/g,
      `<h1 style="font-family:${f};font-size:22px;font-weight:700;text-align:center;margin-bottom:4px;color:#000">$1</h1>`,
    )
    .replace(
      /\{\\large\\bfseries (.+?)\}/g,
      `<h2 style="font-family:${f};font-size:18px;font-weight:700;color:#000">$1</h2>`,
    )
    .replace(
      /\\section\*?\{(.+?)\}/g,
      `<h2 style="font-family:${f};font-size:14.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:0.8px solid #000;padding-bottom:2px;margin-bottom:6px;margin-top:18px;color:#000">$1</h2>`,
    )
    .replace(
      /\\subsection\*?\{(.+?)\}/g,
      `<h3 style="font-family:${f};font-size:13px;font-weight:700;margin-top:12px;margin-bottom:2px;color:#000">$1</h3>`,
    )
    .replace(
      /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
      `<div style="text-align:center;margin-bottom:12px;font-family:${f};font-size:12px;line-height:1.6;color:#111">$1</div>`,
    )
    .replace(
      /\\begin\{itemize\}(\[.*?\])?([\s\S]*?)\\end\{itemize\}/g,
      (_, __, items: string) => {
        const lis = items.replace(
          /\\item\s+(.+)/g,
          `<li style="font-family:${f};font-size:11.5px;color:#111;line-height:1.5;margin-bottom:1px">$1</li>`,
        );
        return `<ul style="list-style:disc;padding-left:18px;margin:3px 0">${lis}</ul>`;
      },
    )
    .replace(
      /\\begin\{enumerate\}(\[.*?\])?([\s\S]*?)\\end\{enumerate\}/g,
      (_, __, items: string) => {
        const lis = items.replace(
          /\\item\s+(.+)/g,
          `<li style="font-family:${f};font-size:11.5px;color:#111;line-height:1.5;margin-bottom:1px">$1</li>`,
        );
        return `<ol style="padding-left:18px;margin:3px 0">${lis}</ol>`;
      },
    )
    .replace(/\\hfill/g, '<span style="float:right;font-size:inherit">')
    .replace(/\\\\(\[.*?\])?/g, "</span><br/>")
    .replace(/\\quad/g, " \u2003 ")
    .replace(/\\qquad/g, " \u2003\u2003 ")
    .replace(/\\,/g, "\u2009")
    .replace(/\\;/g, "\u2005")
    .replace(/\\!/g, "")
    .replace(/\\vspace\{.*?\}/g, '<div style="margin-top:8px"></div>')
    .replace(/\\smallskip/g, '<div style="margin-top:4px"></div>')
    .replace(/\\medskip/g, '<div style="margin-top:8px"></div>')
    .replace(/\\bigskip/g, '<div style="margin-top:14px"></div>')
    .replace(/\\[a-zA-Z]+\*?\{.*?\}/g, "")
    .replace(/\\[a-zA-Z]+\*?/g, "");

  return body;
}
