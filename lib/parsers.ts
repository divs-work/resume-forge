"use client";
import createDOMPurify from "dompurify";
import { Marked, Renderer } from "marked";
import type { Tokens } from "marked";
import { unified } from "unified";
import { unifiedLatexFromString } from "@unified-latex/unified-latex-util-parse";
import { unifiedLatexToHast } from "@unified-latex/unified-latex-to-hast";
import rehypeStringify from "rehype-stringify";
import { ResumeTheme } from "@/types/resume";

/* ═══════════════════════ HTML SANITIZER ═══════════════════════ */

export function sanitizeHTML(html: string): string {
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

/* ═══════════════════════ PARSERS ═══════════════════════ */

/**
 * MARKDOWN PARSER
 */
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
    // Manually build header
    const headerContent = token.header
      .map(
        (cell) =>
          `<th class="${theme.th}">${this.parser.parseInline(cell.tokens)}</th>`
      )
      .join("");

    // Manually build body rows
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

    return `
      <table class="${theme.table}">
        <thead class="${theme.thead}"><tr>${headerContent}</tr></thead>
        <tbody class="${theme.tbody}">${bodyContent}</tbody>
      </table>`;
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

/**
 * LATEX PARSER
 */
export function parseLatex(tex: string, theme: ResumeTheme): string {
  try {
    let content = tex;

    // 1. EXTRACT BODY
    const docMatch = tex.match(
      /\\begin\{document\}([\s\S]*?)\\end\{document\}/
    );
    if (docMatch) content = docMatch[1];

    // 2. PRE-PROCESSOR (Structural Protection)
    content = content
      // Protect custom Job headers (Flexbox Layout)
      .replace(
        /\\rjob\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g,
        `__H3_START__<span>$1</span><span class="font-normal text-sm">$3</span>__H3_END____H4_START__$2__H4_END__`
      )

      // Protect Lists (Since unified-latex often fails on itemize)
      .replace(/\\begin\{itemize\}/g, "__UL_START__")
      .replace(/\\end\{itemize\}/g, "__UL_END__")
      .replace(/\\item\s+/g, "__LI_START__")

      // Protect standard formatting
      .replace(/\\textbf\{([^}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\textit\{([^}]*)\}/g, "<em>$1</em>")
      .replace(/\\rule\{[^}]*\}\{[^}]*\}/g, "__HR__")
      .replace(/\\rsection\{([^}]*)\}/g, "<h2>$1</h2>")

      // Nuke layout commands that leak numbers/units into the text
      .replace(
        /\\(?:pagestyle|thispagestyle|geometry|fancyhf|lhead|rhead|cfoot|vspace\*?|hspace\*?|noindent|linewidth|hfill)\b(?:\{[^}]*\})?/g,
        ""
      );

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const processor = unified()
      .use(unifiedLatexFromString as any)
      .use(unifiedLatexToHast as any)
      .use(rehypeStringify as any);
    /* eslint-enable @typescript-eslint/no-explicit-any */

    let html = processor.processSync(content).toString();

    // 3. POST-PROCESSOR (Swap Placeholders for Themed HTML)
    html = html
      .replace(/__UL_START__/g, `<ul class="${theme.ul}">`)
      .replace(/__UL_END__/g, `</ul>`)
      .replace(/__LI_START__/g, `<li class="${theme.li}">`)
      .replace(/__H3_START__/g, `<h3 class="${theme.h3}">`)
      .replace(/__H3_END__/g, `</h3>`)
      .replace(/__H4_START__/g, `<h4 class="${theme.h4}">`)
      .replace(/__H4_END__/g, `</h4>`)
      .replace(/__HR__/g, `<hr class="${theme.hr}" />`);

    // 4. FINAL THEME INJECTION (For everything else like p, strong, em)
    (Object.keys(theme) as Array<keyof ResumeTheme>).forEach((tag) => {
      const regex = new RegExp(`<${tag}(?![^>]*class=)`, "g");
      html = html.replace(regex, `<${tag} class="${theme[tag]}"`);
    });

    return sanitizeHTML(html);
  } catch (e) {
    return sanitizeHTML(`<div class="text-red-500">LaTeX Parse Error</div>`);
  }
}
