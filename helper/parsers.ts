"use client";
import createDOMPurify from "dompurify";
import { Marked, Renderer, type Tokens } from "marked";
import type { ResumeTheme } from "@/types/resume";

/* ═══════════════════════ HTML SANITIZER ═══════════════════════ */
// Created once, reused on every call
const DOMPurify = createDOMPurify(window);

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
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
    ALLOWED_ATTR: ["href", "src", "alt", "style", "class", "id"],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ["data-rf-el"],
    FORBID_ATTR: [
      "onerror",
      "onload",
      "onmouseover",
      "onfocus",
      "onclick",
      "onauxclick",
    ],
  });
}

/* ═══════════════════════ MARKDOWN PARSER ═══════════════════════ */

export function parseMarkdown(md: string, theme: ResumeTheme): string {
  const r = new Renderer();

  r.heading = function ({ tokens, depth }) {
    const key = `h${depth}` as keyof ResumeTheme;
    return `<h${depth} class="${
      theme[key] || theme.h3
    }">${this.parser.parseInline(tokens)}</h${depth}>`;
  };
  r.paragraph = function ({ tokens }) {
    return `<p class="${theme.p}">${this.parser.parseInline(tokens)}</p>`;
  };
  r.list = function (token) {
    const body = token.items.map((item) => this.listitem(item)).join("");
    return `<${token.ordered ? "ol" : "ul"} class="${
      token.ordered ? theme.ol : theme.ul
    }">${body}</${token.ordered ? "ol" : "ul"}>`;
  };
  r.listitem = function (token) {
    return `<li class="${theme.li}">${this.parser.parseInline(
      token.tokens
    )}</li>`;
  };
  r.table = function (token: Tokens.Table) {
    const headerContent = token.header
      .map(
        (cell) =>
          `<th class="${theme.th}">${this.parser.parseInline(cell.tokens)}</th>`
      )
      .join("");
    const bodyContent = token.rows
      .map((row) => {
        const rowCells = row
          .map(
            (cell) =>
              `<td class="${theme.td}">${this.parser.parseInline(
                cell.tokens
              )}</td>`
          )
          .join("");
        return `<tr class="${theme.tr}">${rowCells}</tr>`;
      })
      .join("");
    return `<table class="${theme.table}"><thead class="${theme.thead}"><tr>${headerContent}</tr></thead><tbody class="${theme.tbody}">${bodyContent}</tbody></table>`;
  };
  r.strong = function ({ tokens }) {
    return `<strong class="${theme.strong}">${this.parser.parseInline(
      tokens
    )}</strong>`;
  };
  r.em = function ({ tokens }) {
    return `<em class="${theme.em}">${this.parser.parseInline(tokens)}</em>`;
  };
  r.hr = () => `<hr class="${theme.hr}"/>`;
  r.link = function ({ href, tokens }) {
    return `<a href="${href}" class="${theme.a}">${this.parser.parseInline(
      tokens
    )}</a>`;
  };

  const marked = new Marked({ renderer: r, gfm: true });
  return sanitizeHTML(marked.parse(md) as string);
}

/* ═══════════════════════ LATEX PARSER ═══════════════════════════
   Pure regex-based — no unified-latex, so HTML injections are
   never escaped as text.
═══════════════════════════════════════════════════════════════════ */

export function parseLatex(tex: string, theme: ResumeTheme): string {
  try {
    const bodyMatch = tex.match(
      /\\begin\{document\}([\s\S]*?)\\end\{document\}/
    );
    let src = bodyMatch ? bodyMatch[1] : tex;

    src = src.replace(/^%[^\n]*/gm, "");

    src = src.replace(
      /\\rfstyle\{([^}]*)\}\{([^}]*)\}/g,
      '<span style="$1">$2</span>'
    );

    src = src
      .replace(/\\&/g, "&amp;")
      .replace(/\\%/g, "%")
      .replace(/\\#/g, "#")
      .replace(/\\~/g, "&nbsp;")
      .replace(/\\,/g, "&#8201;")
      .replace(/\\quad\b/g, "  ")
      .replace(/\\qquad\b/g, "    ")
      .replace(/---/g, "—")
      .replace(/--/g, "–");

    src = src
      .replace(/\\\$/g, "&#36;")
      .replace(/\$\s*\|\s*\$/g, " | ")
      .replace(/\$\s*\\cdot\s*\$/g, "·")
      .replace(/\$\s*\\bullet\s*\$/g, "•")
      .replace(/\$\s*\\textbullet\s*\$/g, "•")
      .replace(/\$[^$\n]*\$/g, "");

    src = src.replace(
      /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
      (_, inner) => `<div class="text-center mb-4">${inner.trim()}</div>`
    );

    src = src.replace(
      /\{((?:\\(?:Huge|huge|LARGE|Large|large|small|footnotesize|scriptsize|tiny|normalsize|bfseries|mdseries|itshape|upshape)\s*)+)((?:[^{}]|\\.)*?)\}/g,
      (_, cmds, content) => {
        const cls: string[] = [];
        if (/\\Huge/.test(cmds)) cls.push("text-4xl");
        else if (/\\huge/.test(cmds)) cls.push("text-3xl");
        else if (/\\LARGE/.test(cmds)) cls.push("text-2xl");
        else if (/\\Large/.test(cmds)) cls.push("text-xl");
        else if (/\\large/.test(cmds)) cls.push("text-lg");
        else if (/\\small|\\footnotesize/.test(cmds)) cls.push("text-sm");
        if (/\\bfseries/.test(cmds)) cls.push("font-bold");
        if (/\\itshape/.test(cmds)) cls.push("italic");
        const trimmed = content.trim();
        return cls.length
          ? `<span class="${cls.join(" ")}">${trimmed}</span>`
          : trimmed;
      }
    );

    src = src.replace(
      /\\rsection\{([^}]*)\}/g,
      `<h2 class="${theme.h2}">$1</h2>`
    );

    src = src.replace(
      /\\rjob\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g,
      `<h3 class="${theme.h3}">$1 <span class="font-normal text-sm ml-2">$3</span></h3>` +
        `<h4 class="${theme.h4}">$2</h4>`
    );

    src = src
      .replace(
        /\\textbf\{([^}]*)\}/g,
        `<strong class="${theme.strong}">$1</strong>`
      )
      .replace(/\\textit\{([^}]*)\}/g, `<em class="${theme.em}">$1</em>`)
      .replace(/\\emph\{([^}]*)\}/g, `<em class="${theme.em}">$1</em>`)
      .replace(
        /\\textsc\{([^}]*)\}/g,
        `<span class="uppercase tracking-wider text-sm">$1</span>`
      )
      .replace(
        /\\href\{([^}]*)\}\{([^}]*)\}/g,
        `<a href="$1" class="${theme.a}">$2</a>`
      )
      .replace(/\\url\{([^}]*)\}/g, `<a href="$1" class="${theme.a}">$1</a>`)
      .replace(/\\rule\{[^}]*\}\{[^}]*\}/g, `<hr class="${theme.hr}"/>`);

    // tables must be converted before \\ → <br> so row separators still work
    src = src.replace(
      /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
      (_, body) => {
        const rawRows = body
          .split(/\\\\(?:\[[^\]]*\])?/)
          .map((r: string) => r.replace(/\\hline/g, "").trim())
          .filter((r: string) => r.length > 0);

        const hasHeaderRow = body.includes("\\hline");
        const htmlRows = rawRows.map((row: string, i: number) => {
          const cells = row.split("&").map((cell: string) => {
            const c = cell.trim();
            return hasHeaderRow && i === 0
              ? `<th class="${theme.th}">${c}</th>`
              : `<td class="${theme.td}">${c}</td>`;
          });
          return `<tr class="${theme.tr}">${cells.join("")}</tr>`;
        });

        const thead =
          hasHeaderRow && htmlRows.length
            ? `<thead class="${theme.thead}">${htmlRows[0]}</thead>`
            : "";
        const tbodyRows = hasHeaderRow ? htmlRows.slice(1) : htmlRows;
        return `<table class="${theme.table}">${thead}<tbody class="${
          theme.tbody
        }">${tbodyRows.join("")}</tbody></table>`;
      }
    );

    src = src
      .replace(/\\begin\{itemize\}(?:\[[^\]]*\])?/g, `<ul class="${theme.ul}">`)
      .replace(/\\end\{itemize\}/g, "</ul>")
      .replace(
        /\\begin\{enumerate\}(?:\[[^\]]*\])?/g,
        `<ol class="${theme.ol}">`
      )
      .replace(/\\end\{enumerate\}/g, "</ol>");
    src = src.replace(
      /\\item\s+([\s\S]*?)(?=\\item|<\/[uo]l>)/g,
      `<li class="${theme.li}">$1</li>`
    );

    src = src.replace(
      /\\(?:pagestyle|thispagestyle|geometry|fancyhf|lhead|rhead|cfoot|lfoot|rfoot|renewcommand|setlength|vspace\*?|hspace\*?|noindent|newpage|clearpage|centering|raggedright|raggedleft|linewidth|textwidth|hfill|hrulefill|dotfill|medskip|smallskip|bigskip|vfill|parindent|parskip)\b(?:\{[^}]*\}){0,2}/g,
      ""
    );

    src = src.replace(/\\\\(?:\[[^\]]*\])?/g, "<br>");

    src = src.replace(/\\[a-zA-Z]+\*?(?:\{[^}]*\}){2,}/g, (m) =>
      (m.match(/\{([^}]*)\}/g) ?? []).map((g) => g.slice(1, -1)).join(" ")
    );
    src = src.replace(/\\[a-zA-Z]+\*?\{([^}]*)\}/g, "$1");
    src = src.replace(/\\[a-zA-Z]+\*?\b/g, "");

    src = src.replace(/[{}]/g, "");

    src = src.replace(/\r\n/g, "\n");
    const html = src
      .split(/\n{2,}/)
      .map((block) => {
        const trimmed = block
          .trim()
          .replace(/\n/g, " ")
          .replace(/\s{2,}/g, " ");
        if (!trimmed) return "";
        if (/^<(?:h[1-6]|ul|ol|div|hr|table|br|p)[\s>/]/.test(trimmed))
          return trimmed;
        return `<p class="${theme.p}">${trimmed}</p>`;
      })
      .filter(Boolean)
      .join("\n");

    return sanitizeHTML(html);
  } catch {
    return sanitizeHTML(
      `<div style="color:red;padding:1rem">LaTeX parse error</div>`
    );
  }
}
