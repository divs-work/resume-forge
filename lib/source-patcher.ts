import type { EditorMode } from "@/types/resume";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Convert JS DOM camelCase property names to CSS kebab-case. */
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

// ─── Text replacement (all modes) ─────────────────────────────────────────────

export function replaceTextInSource(
  source: string,
  oldText: string,
  newText: string
): string {
  return source.split(oldText).join(newText);
}

// ─── Style injection ──────────────────────────────────────────────────────────

/**
 * HTML / Markdown: inject styles as <span style="...">.
 * marked.js passes inline HTML through, so this works for both modes.
 * If already wrapped in a style span, merges into it.
 */
export function applyStyleAsSpan(
  source: string,
  text: string,
  styles: Record<string, string>
): string {
  const escaped = escapeRegex(text);

  // Case 1: already wrapped in a style span → merge styles
  const spanRe = new RegExp(
    `<span style="([^"]*)">(${escaped})<\\/span>`,
    "g"
  );
  if (spanRe.test(source)) {
    return source.replace(
      new RegExp(`<span style="([^"]*)">(${escaped})<\\/span>`, "g"),
      (_, existingStyle, content) =>
        `<span style="${mergeInlineStyles(existingStyle, styles)}">${content}</span>`
    );
  }

  // Case 2: bare text anywhere in source → wrap directly
  const styleStr = cssString(styles);
  return source.replace(
    new RegExp(`(${escaped})`, "g"),
    `<span style="${styleStr}">$1</span>`
  );
}

/**
 * LaTeX: inject styles as \rfstyle{css}{text}.
 * The LaTeX pre-processor converts this to <span style="css">text</span>.
 * If already wrapped, merges styles.
 */
export function applyStyleAsLatexCmd(
  source: string,
  text: string,
  styles: Record<string, string>
): string {
  const escaped = escapeRegex(text);

  // Case 1: already wrapped → merge
  const cmdRe = new RegExp(`\\\\rfstyle\\{([^}]*)\\}\\{${escaped}\\}`, "g");
  if (cmdRe.test(source)) {
    return source.replace(
      new RegExp(`\\\\rfstyle\\{([^}]*)\\}\\{(${escaped})\\}`, "g"),
      (_, existingStyle, content) =>
        `\\rfstyle{${mergeInlineStyles(existingStyle, styles)}}{${content}}`
    );
  }

  // Case 2: bare text → wrap
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
  return applyStyleAsSpan(source, text, styles);
}
