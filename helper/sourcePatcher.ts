import type { EditorMode } from "@/types/resume";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toKebab(key: string): string {
  return key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

function cssString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${toKebab(k)}: ${v}`)
    .join("; ");
}

function mergeInlineStyles(
  existing: string,
  incoming: Record<string, string>
): string {
  const map: Record<string, string> = {};
  for (const rule of existing.split(";")) {
    const colon = rule.indexOf(":");
    if (colon > 0) map[rule.slice(0, colon).trim()] = rule.slice(colon + 1).trim();
  }
  // incoming keys may be camelCase — normalise to kebab before merging
  for (const [k, v] of Object.entries(incoming)) {
    map[toKebab(k)] = v;
  }
  return Object.entries(map)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ");
}

// splits HTML on tag boundaries — even parts are text nodes, odd parts are tags
function inTextNodes(source: string, replacer: (textNode: string) => string): string {
  return source.split(/(<[^>]*>)/g).map((part, i) => i % 2 === 0 ? replacer(part) : part).join('');
}

// text replacement

export function replaceTextInSource(
  source: string,
  oldText: string,
  newText: string,
  mode?: EditorMode
): string {
  if (mode === "html") {
    return inTextNodes(source, (part) => part.split(oldText).join(newText));
  }
  return source.split(oldText).join(newText);
}

// style injection

export function applyStyleAsSpan(
  source: string,
  text: string,
  styles: Record<string, string>,
  mode: EditorMode
): string {
  const escaped = escapeRegex(text);

  const spanRe = new RegExp(`<span style="([^"]*)">(${escaped})<\\/span>`, "g");
  if (spanRe.test(source)) {
    return source.replace(
      new RegExp(`<span style="([^"]*)">(${escaped})<\\/span>`, "g"),
      (_, existingStyle, content) =>
        `<span style="${mergeInlineStyles(existingStyle, styles)}">${content}</span>`
    );
  }

  const styleStr = cssString(styles);
  if (mode === "html") {
    return inTextNodes(source, (part) =>
      part.replace(new RegExp(escaped, "g"), `<span style="${styleStr}">$&</span>`)
    );
  }
  return source.replace(
    new RegExp(`(${escaped})`, "g"),
    `<span style="${styleStr}">$1</span>`
  );
}

export function applyStyleAsLatexCmd(
  source: string,
  text: string,
  styles: Record<string, string>
): string {
  const escaped = escapeRegex(text);

  const cmdRe = new RegExp(`\\\\rfstyle\\{([^}]*)\\}\\{${escaped}\\}`, "g");
  if (cmdRe.test(source)) {
    return source.replace(
      new RegExp(`\\\\rfstyle\\{([^}]*)\\}\\{(${escaped})\\}`, "g"),
      (_, existingStyle, content) =>
        `\\rfstyle{${mergeInlineStyles(existingStyle, styles)}}{${content}}`
    );
  }

  const styleStr = cssString(styles);
  return source.replace(
    new RegExp(`(${escaped})`, "g"),
    `\\rfstyle{${styleStr}}{$1}`
  );
}

export function applyStyleToSource(
  source: string,
  mode: EditorMode,
  text: string,
  styles: Record<string, string>
): string {
  if (mode === "latex") return applyStyleAsLatexCmd(source, text, styles);
  return applyStyleAsSpan(source, text, styles, mode);
}
