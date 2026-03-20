import createDOMPurify from "dompurify";

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
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /^### (.+)$/gm,
      `<h3 class="text-[15px] font-semibold mt-3.5 mb-0.5 text-[#111]">$1</h3>`,
    )
    .replace(
      /^## (.+)$/gm,
      `<h2 class="text-[16px] font-bold uppercase tracking-[1.2px] border-b border-[#c4c4c4] pb-0.75 mb-2 mt-5.5 text-[#1a1a1a]">$1</h2>`,
    )
    .replace(
      /^# (.+)$/gm,
      `<h1 class="text-[28px] font-bold text-center tracking-[-0.3px] text-[#111] mb-1">$1</h1>`,
    )
    .replace(/^---$/gm, `<hr class="border-0 border-t border-[#d4d4d4] my-4"/>`)
    .replace(
      /^\- (.+)$/gm,
      `<li class="text-[13.5px] text-[#333] ml-4 leading-[1.55]">$1</li>`,
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      `<a href="$2" class="text-[#1a5fb4] no-underline">$1</a>`,
    );

  html = html.replace(
    /((?:<li[^>]*>.*?<\/li>\s*)+)/g,
    `<ul class="list-disc pl-2.5 my-1">$1</ul>`,
  );

  html = html
    .split("\n")
    .map((line) => {
      const t = line.trim();
      if (!t) return "";
      if (/^<(h[1-6]|ul|li|hr|div|section|header|p|br)/.test(t)) return t;
      return `<p class="text-[13.5px] text-[#333] leading-[1.55] my-px">${t}</p>`;
    })
    .join("\n");

  return html;
}

/* ═══════════════════════ LATEX → HTML ═══════════════════════ */

export function parseLatex(tex: string): string {
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
    .replace(/\\textbf\{(.+?)\}/g, `<strong class="font-bold">$1</strong>`)
    .replace(/\\textit\{(.+?)\}/g, `<em class="italic">$1</em>`)
    .replace(
      /\\textsc\{(.+?)\}/g,
      `<span class="[font-variant:small-caps]">$1</span>`,
    )
    .replace(
      /\\texttt\{(.+?)\}/g,
      `<code class="font-mono text-[0.92em]">$1</code>`,
    )
    .replace(/\\emph\{(.+?)\}/g, `<em class="italic">$1</em>`)
    .replace(
      /\\href\{(.+?)\}\{(.+?)\}/g,
      `<a href="$1" class="text-[#1a5fb4] no-underline">$2</a>`,
    )
    .replace(
      /\\url\{(.+?)\}/g,
      `<a href="$1" class="text-[#1a5fb4] no-underline font-mono text-[0.9em]">$1</a>`,
    )
    .replace(
      /\{\\LARGE\\bfseries (.+?)\}/g,
      `<h1 class="text-[26px] font-bold text-center mb-1 text-black">$1</h1>`,
    )
    .replace(
      /\{\\Large\\bfseries (.+?)\}/g,
      `<h1 class="text-[22px] font-bold text-center mb-1 text-black">$1</h1>`,
    )
    .replace(
      /\{\\large\\bfseries (.+?)\}/g,
      `<h2 class="text-[18px] font-bold text-black">$1</h2>`,
    )
    .replace(
      /\\section\*?\{(.+?)\}/g,
      `<h2 class="text-[14.5px] font-bold uppercase tracking-[0.5px] border-b border-black pb-0.5 mb-1.5 mt-4.5 text-black">$1</h2>`,
    )
    .replace(
      /\\subsection\*?\{(.+?)\}/g,
      `<h3 class="text-[13px] font-bold mt-3 mb-0.5 text-black">$1</h3>`,
    )
    .replace(
      /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
      `<div class="text-center mb-3 text-[12px] leading-[1.6] text-[#111]">$1</div>`,
    )
    .replace(
      /\\begin\{itemize\}(\[.*?\])?([\s\S]*?)\\end\{itemize\}/g,
      (_, __, items: string) => {
        const lis = items.replace(
          /\\item\s+(.+)/g,
          `<li class="text-[11.5px] text-[#111] leading-normal mb-px">$1</li>`,
        );
        return `<ul class="list-disc pl-4.5 my-0.75">${lis}</ul>`;
      },
    )
    .replace(
      /\\begin\{enumerate\}(\[.*?\])?([\s\S]*?)\\end\{enumerate\}/g,
      (_, __, items: string) => {
        const lis = items.replace(
          /\\item\s+(.+)/g,
          `<li class="text-[11.5px] text-[#111] leading-normal mb-px">$1</li>`,
        );
        return `<ol class="pl-4.5 my-0.75">${lis}</ol>`;
      },
    )
    .replace(/\\hfill/g, `<span class="float-right">`)
    .replace(/\\\\(\[.*?\])?/g, "</span><br/>")
    .replace(/\\quad/g, " \u2003 ")
    .replace(/\\qquad/g, " \u2003\u2003 ")
    .replace(/\\,/g, "\u2009")
    .replace(/\\;/g, "\u2005")
    .replace(/\\!/g, "")
    .replace(/\\vspace\{.*?\}/g, `<div class="mt-2"></div>`)
    .replace(/\\smallskip/g, `<div class="mt-1"></div>`)
    .replace(/\\medskip/g, `<div class="mt-2"></div>`)
    .replace(/\\bigskip/g, `<div class="mt-3.5"></div>`)
    .replace(/\\[a-zA-Z]+\*?\{.*?\}/g, "")
    .replace(/\\[a-zA-Z]+\*?/g, "");

  return body;
}
