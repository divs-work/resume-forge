import DOMPurify from "dompurify";

export function sanitizeHTML(html: string): string {
  // Just a safety check in case this file ever accidentally gets imported into a server environment
  if (typeof window === "undefined") return html;

  /* --- SECURITY HOOKS --- */
  DOMPurify.addHook("afterSanitizeAttributes", function (node) {
    // 1. Enforce reverse-tabnabbing protection on external links
    if ("target" in node && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }

    // 2. Ensure task-list checkboxes cannot be tampered with by users
    if (node.nodeName.toLowerCase() === "input") {
      const type = node.getAttribute("type");
      if (type === "checkbox") {
        node.setAttribute("disabled", "true");
      } else {
        node.removeAttribute("type"); // Strip non-checkbox inputs
      }
    }
  });

  /* --- CORE SANITIZATION --- */
  const cleanHtml = DOMPurify.sanitize(html, {
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
      "span",
      "div",
      "section",
      "header",
      "blockquote",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "del",
      "mark",
      "sup",
      "sub",
      "kbd",
      "ul",
      "ol",
      "li",
      "dl",
      "dt",
      "dd",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "a",
      "details",
      "summary",
      "input",
    ],
    ALLOWED_ATTR: [
      "href",
      "title",
      "class",
      "id",
      "style",
      "target",
      "rel",
      "type",
      "checked",
      "disabled",
      "data-footnote",
      "data-list",
    ],
    ALLOW_DATA_ATTR: true,
    USE_PROFILES: { html: true }, // Standard HTML only

    // Explicit Blacklists (No images, media, or scripts)
    FORBID_TAGS: [
      "script",
      "style",
      "iframe",
      "form",
      "object",
      "embed",
      "img",
      "figure",
      "figcaption",
      "picture",
      "video",
      "audio",
      "math",
      "svg",
    ],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "src"],
  });

  // Clean up hooks
  DOMPurify.removeAllHooks();

  return cleanHtml;
}
/* ═══════════════════════ MARKDOWN → HTML ═══════════════════════ */

export function parseMarkdown(md: string): string {
  let body = md;

  // 1. Strip YAML Frontmatter (If they use it for metadata)
  body = body.replace(/^---\n[\s\S]*?\n---\n/, "");

  // 2. Protection Arrays (Code only, no math)
  const codeBlocks: string[] = [];
  const inlineCode: string[] = [];

  // 3. Extract & Protect Code Blocks (Useful for Dev Resumes)
  body = body.replace(
    /```([a-zA-Z0-9-+#]*)\n([\s\S]*?)```/g,
    (_, lang, code) => {
      const safeCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      // Print-friendly code block (No shadows, subtle borders)
      const html = `<div class="my-3 border border-slate-200 bg-slate-50 rounded-md p-3 overflow-x-auto"><pre><code class="font-mono text-[0.85rem] leading-snug text-slate-800 language-${lang}">${safeCode}</code></pre></div>`;
      codeBlocks.push(html);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    },
  );

  // 4. Extract & Protect Inline Code (Great for tech stacks like `React`, `Node.js`)
  body = body.replace(/`([^`]+)`/g, (_, code) => {
    const safeCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    inlineCode.push(
      `<code class="bg-slate-100 text-slate-800 font-mono text-[0.85em] px-1 py-0.5 rounded border border-slate-200">${safeCode}</code>`,
    );
    return `__INLINE_CODE_${inlineCode.length - 1}__`;
  });

  // 5. Basic HTML Escaping
  body = body.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 6. Footnotes Collection (Useful for references or portfolio links)
  const footnotes: string[] = [];
  body = body.replace(/^\[\^([^\]]+)\]:\s+(.+)$/gm, (_, id, text) => {
    footnotes.push(
      `<li id="fn-${id}" class="text-xs text-slate-500 mb-1">${text} <a href="#fnref-${id}" class="text-slate-800 hover:underline">↩</a></li>`,
    );
    return "";
  });

  body = body.replace(/\[\^([^\]]+)\]/g, (_, id) => {
    return `<sup id="fnref-${id}"><a href="#fn-${id}" class="text-[0.7em] text-slate-500 hover:text-slate-900 font-medium px-0.5" data-footnote>\[${id}\]</a></sup>`;
  });

  // 7. Reference Links Collection
  const refLinks: Record<string, string> = {};
  body = body.replace(/^\[([^\]]+)\]:\s+(.+)$/gm, (_, label, url) => {
    refLinks[label.toLowerCase()] = url;
    return "";
  });

  body = body.replace(/\[([^\]]+)\]\[([^\]]*)\]/g, (match, text, label) => {
    const key = (label || text).toLowerCase();
    const url = refLinks[key];
    // Resume links: subtle, professional styling (not bright blue)
    return url
      ? `<a href="${url}" target="_blank" class="text-slate-900 font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">${text}</a>`
      : match;
  });

  // 8. Callouts / Objectives (Styled as a clean summary box)
  body = body.replace(
    /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|SUMMARY|OBJECTIVE)\]\s*(.*?)\n((?:>\s*.*\n?)*)/gim,
    (_, type, title, content) => {
      const cleanContent = content.replace(/^>\s*/gm, "").trim();
      const displayTitle =
        title || type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      // Very subtle, print-friendly gray box for resume summaries
      return `
        <div class="my-3 border-l-2 border-slate-400 bg-slate-50/50 p-3">
          ${displayTitle ? `<div class="font-bold text-slate-800 text-sm tracking-wide uppercase mb-1">${displayTitle}</div>` : ""}
          <div class="text-[0.9rem] text-slate-700 leading-snug">${cleanContent}</div>
        </div>
      `;
    },
  );

  // 9. Standard Blockquotes (Used for testimonials or summaries)
  body = body.replace(/^(>\s*(.+)\n?)+/gm, (match) => {
    const cleanQuote = match.replace(/^>\s*/gm, "").trim();
    return `<blockquote class="border-l-2 border-slate-300 pl-3 py-1 my-3 italic text-slate-600 text-[0.9rem] leading-snug">${cleanQuote}</blockquote>\n`;
  });

  // 10. Tables (Perfect for Skill Matrices)
  body = body.replace(/(^\|.+?\|\n)+/gm, (match) => {
    const rows = match.trim().split("\n");
    if (rows.length < 2 || !/\|[\s\-\:]+\|/.test(rows[1])) return match;

    const thead = rows[0]
      .split("|")
      .filter(Boolean)
      .map(
        (h) =>
          `<th class="px-3 py-2 border-b-2 border-slate-800 text-left text-xs font-bold text-slate-900 uppercase tracking-wider">${h.trim()}</th>`,
      )
      .join("");

    const tbody = rows
      .slice(2)
      .map((row) => {
        const cells = row
          .split("|")
          .filter(Boolean)
          .map(
            (c) =>
              `<td class="px-3 py-1.5 border-b border-slate-200 text-[0.9rem] text-slate-700 align-top">${c.trim()}</td>`,
          )
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    // No shadows, no heavy backgrounds. Just a clean layout grid.
    return `<div class="overflow-x-auto my-4"><table class="w-full border-collapse text-left"><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table></div>`;
  });

  // 11. Headings (Resume specific Hierarchy & Typography)
  body = body
    // H6: Tags / Minor details
    .replace(
      /^###### (.+)$/gm,
      (_, t) =>
        `<h6 class="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 mb-1">${t}</h6>`,
    )
    // H5: Sub-groupings
    .replace(
      /^##### (.+)$/gm,
      (_, t) =>
        `<h5 class="text-sm font-semibold text-slate-700 mt-2 mb-1">${t}</h5>`,
    )
    // H4: Companies / Dates / Locations (Italicized, medium gray)
    .replace(
      /^#### (.+)$/gm,
      (_, t) =>
        `<h4 class="text-[0.95rem] font-medium italic text-slate-600 mt-1 mb-2">${t}</h4>`,
    )
    // H3: Job Titles / Degrees (Bold, dark)
    .replace(
      /^### (.+)$/gm,
      (_, t) =>
        `<h3 class="text-lg font-bold text-slate-900 mt-3 mb-0">${t}</h3>`,
    )
    // H2: Section Headers (Experience, Education)
    .replace(
      /^## (.+)$/gm,
      (_, t) =>
        `<h2 class="text-[1.15rem] font-bold uppercase tracking-widest text-slate-900 border-b-[1.5px] border-slate-800 pb-1 mt-6 mb-3">${t}</h2>`,
    )
    // H1: Candidate Name
    .replace(
      /^# (.+)$/gm,
      (_, t) =>
        `<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mt-2 mb-1 text-center">${t}</h1>`,
    );

  // 12. Horizontal Rules
  body = body.replace(
    /^(---|___|\*\*\*)$/gm,
    `<hr class="border-0 border-t border-slate-300 my-4 w-full"/>`,
  );

  // 13. Links & Attachments
  // This explicitly catches standard markdown links and auto-links.
  body = body
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g,
      (_, text, url, title) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" ${title ? `title="${title}"` : ""} class="text-slate-900 font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600 transition-colors">${text}</a>`,
    )
    .replace(
      /<(https?:\/\/[^\s>]+)>/g,
      `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-slate-900 font-mono text-[0.85rem] underline decoration-slate-300 underline-offset-2">$1</a>`,
    );

  // 14. Extended Typography
  body = body
    .replace(
      /\*\*\*(.+?)\*\*\*/g,
      "<strong class='font-bold italic text-slate-900'>$1</strong>",
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      "<strong class='font-semibold text-slate-900'>$1</strong>",
    )
    .replace(
      /__(.+?)__/g,
      "<strong class='font-semibold text-slate-900'>$1</strong>",
    )
    .replace(/\*(.+?)\*/g, "<em class='italic text-slate-700'>$1</em>")
    .replace(/_(.+?)_/g, "<em class='italic text-slate-700'>$1</em>")
    .replace(/~~(.+?)~~/g, "<del class='line-through text-slate-400'>$1</del>")
    .replace(
      /==(.+?)==/g,
      "<mark class='bg-yellow-100 text-slate-900 px-1 rounded-sm'>$1</mark>",
    )
    .replace(
      /<kbd>(.+?)<\/kbd>|\[\[(.+?)\]\]/g,
      (_, k1, k2) =>
        `<kbd class="bg-slate-100 border border-slate-300 rounded-[3px] px-1.5 py-0.5 text-[0.7rem] uppercase tracking-wider font-sans text-slate-700 mx-0.5">${k1 || k2}</kbd>`,
    );

  // 15. Lists (Ultra-compact for Experience Bullet Points)
  body = body
    // Task lists
    .replace(
      /^\s*-\s+\[ \]\s+(.+)$/gm,
      `<li class="flex items-start gap-2 my-0.5"><input type="checkbox" disabled class="mt-1 w-3.5 h-3.5 rounded-sm border-slate-300 text-slate-800 focus:ring-slate-800 disabled:opacity-70" /><span class="text-[0.95rem] text-slate-700 leading-snug">$1</span></li>`,
    )
    .replace(
      /^\s*-\s+\[[xX]\]\s+(.+)$/gm,
      `<li class="flex items-start gap-2 my-0.5"><input type="checkbox" checked disabled class="mt-1 w-3.5 h-3.5 rounded-sm border-slate-300 text-slate-800 focus:ring-slate-800 disabled:opacity-70" /><span class="text-[0.95rem] text-slate-500 line-through leading-snug">$1</span></li>`,
    )
    // Standard Bullets (Uses standard '•' character for perfect PDF rendering, negative margin to align text perfectly)
    .replace(
      /^\s*[-*+]\s+(?!<input)(.+)$/gm,
      `<li data-list="unordered" class="text-[0.95rem] text-slate-700 leading-[1.4] pl-4 relative before:content-['•'] before:absolute before:-left-1 before:text-slate-400 before:text-lg before:leading-none my-1">$1</li>`,
    )
    // Numbered Lists
    .replace(
      /^\s*\d+\.\s+(.+)$/gm,
      `<li data-list="ordered" class="text-[0.95rem] text-slate-700 leading-[1.4] ml-4 pl-1 my-1">$1</li>`,
    );

  // Group contiguous lists (Tight vertical spacing)
  body = body
    .replace(
      /(?:<li data-list="unordered"[^>]*>.*?<\/li>\s*)+/g,
      (match) => `<ul class="space-y-0.5 my-2 ml-1">${match}</ul>`,
    )
    .replace(
      /(?:<li data-list="ordered"[^>]*>.*?<\/li>\s*)+/g,
      (match) =>
        `<ol class="list-decimal space-y-0.5 my-2 ml-4 text-slate-700 marker:text-slate-500">${match}</ol>`,
    )
    .replace(
      /(?:<li class="flex items-start[^>]*>.*?<\/li>\s*)+/g,
      (match) => `<ul class="space-y-0.5 my-2 ml-1 list-none">${match}</ul>`,
    );

  // 16. Restore Protected Blocks
  body = body.replace(
    /__CODE_BLOCK_(\d+)__/g,
    (_, index) => codeBlocks[Number(index)],
  );
  body = body.replace(
    /__INLINE_CODE_(\d+)__/g,
    (_, index) => inlineCode[Number(index)],
  );

  // 17. Append Footnotes
  if (footnotes.length > 0) {
    body += `\n<div class="mt-6 pt-3 border-t border-slate-200"><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">References</h3><ol class="list-decimal pl-4">${footnotes.join("\n")}</ol></div>`;
  }

  // 18. Paragraph Wrapper (Compact leading)
  body = body
    .split(/\n\n+/)
    .map((para) => {
      const t = para.trim();
      if (!t) return "";
      if (/^<(h[1-6]|ul|ol|table|div|blockquote|pre|hr|figure)/.test(t))
        return t;
      return `<p class="text-[0.95rem] text-slate-700 leading-snug my-2">${t}</p>`;
    })
    .join("\n");

  return body;
}

/* ═══════════════════════ LATEX → HTML ═══════════════════════ */

export function parseLatex(tex: string): string {
  let body = tex;

  // 1. Extract Document Body & Strip Preamble
  const documentMatch = tex.match(
    /\\begin\{document\}([\s\S]*?)\\end\{document\}/,
  );
  if (documentMatch) body = documentMatch[1];

  // 1.5 Strip LaTeX Comments (Crucial so % doesn't bleed into text)
  // Replaces % and anything after it, unless it is escaped \%
  body = body.replace(/([^\\])%.*$/gm, "$1").replace(/^%.*$/gm, "");

  // 2. Special Symbols & Escaped Characters
  body = body
    .replace(/\\%/g, "%")
    .replace(/\\&/g, "__AMP__")
    .replace(/\\\$/g, "$")
    .replace(/\\#/g, "#")
    .replace(/\\_/g, "_")
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}")
    .replace(/\\~/g, "&nbsp;")
    .replace(/~/g, "&nbsp;")
    .replace(/\\copyright\{\}|\\copyright\b/g, "&copy;")
    .replace(/\\textbullet\{\}|\\textbullet\b/g, "&bull;")
    .replace(/\\dag\{\}|\\dag\b/g, "&dagger;")
    .replace(/\\ddag\{\}|\\ddag\b/g, "&Dagger;")
    .replace(/\\ldots\{\}|\\ldots\b/g, "&hellip;")
    .replace(/``/g, "&ldquo;")
    .replace(/''/g, "&rdquo;")
    .replace(/---/g, "&mdash;")
    .replace(/\$\|\$/g, `<span class="mx-1.5 text-slate-300">|</span>`)
    .replace(/--/g, "&ndash;");

  // 3. Cross-Referencing & Citations
  body = body
    .replace(/\\label\{(.+?)\}/g, `<a id="ref-$1" class="scroll-mt-20"></a>`)
    .replace(
      /\\ref\{(.+?)\}/g,
      `<a href="#ref-$1" class="text-slate-600 hover:text-slate-900 font-medium underline decoration-slate-300 transition-colors">[$1]</a>`,
    )
    .replace(
      /\\cite\{(.+?)\}/g,
      `<a href="#cite-$1" class="text-slate-500 hover:text-slate-800 font-medium align-super text-[0.7rem] transition-colors">[$1]</a>`,
    );

  // 4. Links & URLs
  body = body
    .replace(
      /\\href\{(.+?)\}\{([\s\S]+?)\}/g,
      `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-slate-900 font-medium underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600 transition-colors">$2</a>`,
    )
    .replace(
      /\\url\{(.+?)\}/g,
      `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-slate-900 font-mono text-[0.85rem] underline decoration-slate-300 underline-offset-2 transition-colors">$1</a>`,
    );

  // 5. Custom Template Commands (Specific to your premium templates)
  body = body
    // Handles \sect, \sectiontitle, \rsection
    .replace(
      /\\(?:sectiontitle|sect|rsection)\{((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<h2 class="text-[1.15rem] font-bold uppercase tracking-widest text-slate-900 border-b-[1.5px] border-slate-800 pb-1 mt-5 mb-3">$1</h2>`,
    )
    // Handles \rjob{Title}{Company}{Date}
    .replace(
      /\\rjob\{((?:[^{}]|\{[^{}]*\})+)\}\{((?:[^{}]|\{[^{}]*\})+)\}\{((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<div class="mt-3 mb-1"><strong class="font-bold text-slate-900">$1</strong> <span class="mx-1.5 text-slate-300">|</span> <em class="italic text-slate-700">$2</em> <span class="float-right text-slate-700">$3</span></div>`,
    )
    // Handles \MakeUppercase used in LATEX_COMPACT
    .replace(
      /\\(?:MakeUppercase|uppercase)\{((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="uppercase">$1</span>`,
    );

  // 6. Text Formatting
  body = body
    .replace(/\$\\cdot\$/g, `<span class="mx-1.5 text-slate-400">&bull;</span>`)
    .replace(/\$\|\$/g, `<span class="mx-1.5 text-slate-300">|</span>`)
    .replace(/\\textcolor\{[^{}]*\}\{((?:[^{}]|\{[^{}]*\})+)\}/g, `$1`)
    // Captures \rule and \sectionrule
    .replace(
      /\\(?:rule\{[^{}]*\}\{[^{}]*\}|sectionrule)/g,
      `<hr class="border-0 border-t border-slate-300 my-3 w-full"/>`,
    )
    .replace(
      /\\textbf\{([\s\S]+?)\}/g,
      `<strong class="font-bold text-slate-900">$1</strong>`,
    )
    .replace(
      /\\textit\{([\s\S]+?)\}/g,
      `<em class="italic text-slate-700">$1</em>`,
    )
    .replace(
      /\\textsl\{([\s\S]+?)\}/g,
      `<span class="italic text-slate-700">$1</span>`,
    )
    .replace(
      /\\underline\{([\s\S]+?)\}/g,
      `<u class="underline decoration-slate-400 underline-offset-2">$1</u>`,
    )
    .replace(
      /\\sout\{([\s\S]+?)\}/g,
      `<del class="line-through text-slate-400">$1</del>`,
    )
    .replace(
      /\\textsc\{([\s\S]+?)\}/g,
      `<span class="tracking-wider text-slate-800 font-medium uppercase text-[0.9em]">$1</span>`,
    )
    .replace(
      /\\texttt\{([\s\S]+?)\}/g,
      `<code class="bg-slate-50 text-slate-800 font-mono text-[0.85em] px-1 py-0.5 rounded border border-slate-200">$1</code>`,
    )
    .replace(
      /\\textsf\{([\s\S]+?)\}/g,
      `<span class="font-sans text-slate-800">$1</span>`,
    )
    .replace(
      /\\emph\{([\s\S]+?)\}/g,
      `<em class="italic text-slate-700">$1</em>`,
    );

  // 7. Typography Sizing Declarations
  body = body
    .replace(
      /\{\\Huge\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mt-2 mb-1 text-center">$1</h1>`,
    )
    .replace(
      /\{\\huge\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 mt-2 mb-1 text-center">$1</h1>`,
    )
    .replace(
      /\{\\LARGE\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-3xl font-bold leading-snug">$1</span>`,
    )
    .replace(
      /\{\\Large\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-2xl font-bold leading-snug">$1</span>`,
    )
    .replace(
      /\{\\large\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<h2 class="text-[1.1rem] font-medium text-slate-700 text-center mb-2">$1</h2>`,
    )
    .replace(
      /\{\\normalsize\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-[0.95rem]">$1</span>`,
    )
    .replace(
      /\{\\small\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-[0.85rem]">$1</span>`,
    )
    .replace(
      /\{\\footnotesize\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-xs text-slate-600">$1</span>`,
    )
    .replace(
      /\{\\scriptsize\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-[0.7rem] text-slate-500">$1</span>`,
    )
    .replace(
      /\{\\tiny\s*(?:\\[a-zA-Z]+)?\s*((?:[^{}]|\{[^{}]*\})+)\}/g,
      `<span class="text-[0.6rem] text-slate-400">$1</span>`,
    );

  // 8. Document Structure (Resume Heading Hierarchy)
  body = body
    .replace(
      /\\part\*?\{(.+?)\}/g,
      `<h1 class="text-5xl font-extrabold tracking-tight text-slate-900 mt-2 mb-2 text-center">$1</h1>`,
    )
    .replace(
      /\\chapter\*?\{(.+?)\}/g,
      `<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mt-2 mb-1 text-center">$1</h1>`,
    )
    .replace(
      /\\section\*?\{(.+?)\}/g,
      `<h2 class="text-[1.15rem] font-bold uppercase tracking-widest text-slate-900 border-b-[1.5px] border-slate-800 pb-1 mt-5 mb-3">$1</h2>`,
    )
    .replace(
      /\\subsection\*?\{(.+?)\}/g,
      `<h3 class="text-lg font-bold text-slate-900 mt-3 mb-0">$1</h3>`,
    )
    .replace(
      /\\subsubsection\*?\{(.+?)\}/g,
      `<h4 class="text-[0.95rem] font-medium italic text-slate-600 mt-1 mb-2">$1</h4>`,
    )
    .replace(
      /\\paragraph\*?\{(.+?)\}/g,
      `<h5 class="text-[0.95rem] font-bold text-slate-900 mt-2 mb-1 inline-block mr-2">$1</h5>`,
    )
    .replace(
      /\\subparagraph\*?\{(.+?)\}/g,
      `<h6 class="text-sm font-bold text-slate-700 mt-2 mb-1 inline-block mr-2">$1</h6>`,
    );

  // 8. Tables (Tabular & Tabularx Environments - Clean Layout Grid)
  body = body.replace(
    // The upgraded regex safely consumes nested brackets like {@{}X r@{}}
    /\\begin\{(tabular|tabularx)\}(?:\s*\{(?:[^{}]|\{[^{}]*\})*\})+\s*([\s\S]*?)\\end\{\1\}/g,
    (_, __, tableBody) => {
      const rows = tableBody
        .split(/\\\\/)
        .map((row: string) => {
          if (!row.trim()) return "";
          const isHline = row.includes("\\hline");
          const cleanRow = row.replace(/\\hline/g, "").trim();
          if (!cleanRow) return "";

          // Safely split by & knowing that \& is protected
          const cells = cleanRow
            .split("&")
            .map(
              (cell) =>
                `<td class="px-3 py-1.5 border-b border-slate-200 text-[0.9rem] text-slate-700 align-top">${cell.trim()}</td>`,
            );

          return `<tr class="${isHline ? "border-t-2 border-slate-800" : ""}">${cells.join("")}</tr>`;
        })
        .join("");

      return `<div class="overflow-x-auto my-4 w-full"><table class="w-full border-collapse text-left"><tbody>${rows}</tbody></table></div>`;
    },
  );
  // 10. Block Environments (Includes Minipage for 2-column layouts)
  body = body
    .replace(
      /\\begin\{minipage\}(?:\[.*?\])?\{.*?\}/g,
      `<div class="w-full md:w-[48%] inline-block align-top mt-2">`, // Makes minipages stack nicely or sit side-by-side
    )
    .replace(/\\end\{minipage\}/g, `</div>`)
    .replace(
      /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
      `<div class="text-center my-3 w-full flex flex-col items-center justify-center">$1</div>`,
    )
    .replace(
      /\\begin\{flushleft\}([\s\S]*?)\\end\{flushleft\}/g,
      `<div class="text-left my-3 w-full">$1</div>`,
    )
    .replace(
      /\\begin\{flushright\}([\s\S]*?)\\end\{flushright\}/g,
      `<div class="text-right my-3 w-full">$1</div>`,
    )
    .replace(
      /\\begin\{quote\}([\s\S]*?)\\end\{quote\}/g,
      `<blockquote class="border-l-2 border-slate-300 pl-3 py-1 my-3 italic text-slate-600 text-[0.9rem] leading-snug">$1</blockquote>`,
    )
    .replace(
      /\\begin\{quotation\}([\s\S]*?)\\end\{quotation\}/g,
      `<blockquote class="border-l-2 border-slate-400 bg-slate-50 pl-4 py-2 my-4 italic text-slate-700 text-[0.95rem] leading-snug">$1</blockquote>`,
    )
    .replace(
      /\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g,
      `<div class="my-3 border border-slate-200 bg-slate-50 rounded-md p-3 overflow-x-auto"><pre><code class="font-mono text-[0.85rem] leading-snug text-slate-800">$1</code></pre></div>`,
    );

  // 11. Lists (Ultra-compact for Resume Bullet Points)
  body = body
    .replace(
      /\\begin\{itemize\}(\[.*?\])?([\s\S]*?)\\end\{itemize\}/g,
      (_, __, items) => {
        const lis = items.replace(
          /\\item\s+(.*?)(?=\\item|$)/gs,
          `<li class="text-[0.95rem] text-slate-700 leading-[1.4] pl-4 relative before:content-['•'] before:absolute before:-left-1 before:text-slate-400 before:text-lg before:leading-none my-1">$1</li>`,
        );
        return `<ul class="space-y-0.5 my-2 ml-1">${lis}</ul>`;
      },
    )
    .replace(
      /\\begin\{enumerate\}(\[.*?\])?([\s\S]*?)\\end\{enumerate\}/g,
      (_, __, items) => {
        const lis = items.replace(
          /\\item\s+(.*?)(?=\\item|$)/gs,
          `<li class="text-[0.95rem] text-slate-700 leading-[1.4] ml-4 pl-1 my-1">$1</li>`,
        );
        return `<ol class="list-decimal space-y-0.5 my-2 ml-4 text-slate-700 marker:text-slate-500">${lis}</ol>`;
      },
    )
    .replace(
      /\\begin\{description\}(\[.*?\])?([\s\S]*?)\\end\{description\}/g,
      (_, __, items) => {
        const lis = items.replace(
          /\\item\[(.*?)\]\s+(.*?)(?=\\item\[|$)/gs,
          `<dt class="font-bold text-slate-900 mt-2 text-[0.95rem]">$1</dt><dd class="text-[0.95rem] text-slate-700 ml-4 mt-0.5 mb-1 leading-[1.4]">$2</dd>`,
        );
        return `<dl class="my-3">${lis}</dl>`;
      },
    );

  // 12. Utilities, Spacing & Line Breaks
  body = body
    .replace(
      /\\hfill/g,
      `<span class="flex-grow inline-block w-full text-right"></span>`,
    )
    .replace(/\\\\(\[.*?\])?/g, "<br/>\n")
    .replace(/\\noindent/g, "")
    .replace(/\\quad/g, `<span class="ml-2 inline-block"></span>`)
    .replace(/\\qquad/g, `<span class="ml-4 inline-block"></span>`)
    .replace(/\\,/g, `<span class="ml-0.5 inline-block"></span>`)
    .replace(/\\;/g, `<span class="ml-1 inline-block"></span>`)
    .replace(/\\vspace\{.*?\}/g, `\n<div class="mt-2 w-full block"></div>\n`)
    .replace(/\\smallskip/g, `\n<div class="mt-1 w-full block"></div>\n`)
    .replace(/\\medskip/g, `\n<div class="mt-2 w-full block"></div>\n`)
    .replace(/\\bigskip/g, `\n<div class="mt-4 w-full block"></div>\n`)
    .replace(
      /\\newpage|\\clearpage/g,
      `\n<hr class="my-8 border-0 border-t-2 border-slate-300 break-after-page" />\n`,
    );

  // 13. Cleanup unhandled macros (Upgraded to catch optional arguments like [t])
  body = body.replace(/\\[a-zA-Z]+\*?(?:\[.*?\])?(?:\{.*?\})*/g, "");

  // 14. Parse Paragraphs
  body = body
    .split(/\n\s*\n/)
    .map((para) => {
      const t = para.trim();
      if (!t) return "";
      // Skip block elements
      if (/^<(h[1-6]|ul|ol|dl|div|blockquote|pre|br|hr|table)/.test(t))
        return t;
      // Compact leading for standard text
      return `<p class="text-[0.95rem] text-slate-700 leading-snug my-2">${t}</p>`;
    })
    .join("\n");

  // 15. Restore Safe Ampersands
  body = body.replace(/__AMP__/g, "&amp;");

  return body;
}
