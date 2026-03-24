import type { EditorMode } from "@/types/resume";
import {
  HTML_CLEAN_LIGHT,
  HTML_DARK_MINIMAL,
  HTML_EDITORIAL,
  HTML_NEO_BRUTALIST,
  HTML_NIGHT_PRO,
} from "./templates-html";
import {
  MD_COMPACT,
  MD_CREATIVE,
  MD_EXECUTIVE,
  MD_STANDARD,
  MD_TECHNICAL,
} from "./templates-markdown";
import {
  LATEX_CLASSIC,
  LATEX_CLEAN_LINES,
  LATEX_COMPACT,
  LATEX_MODERN,
  LATEX_TWO_COLUMN,
} from "./templates-latex";

type ContentMap = Record<EditorMode, string>;

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  content: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_SETS: Record<EditorMode, TemplateOption[]> = {
  html: [
    {
      id: "dark-minimal",
      name: "Dark Minimal",
      description: "Dark cards, mono labels, flex layout",
      content: HTML_DARK_MINIMAL,
    },
    {
      id: "clean-light",
      name: "Clean Light",
      description: "Blue accent, timeline experience, card projects",
      content: HTML_CLEAN_LIGHT,
    },
    {
      id: "neo-brutalist",
      name: "Neo Brutalist",
      description: "Thick borders, yellow accent, offset shadows",
      content: HTML_NEO_BRUTALIST,
    },
    {
      id: "night-pro",
      name: "Night Pro",
      description: "Dark navy header, two-column, cyan accents",
      content: HTML_NIGHT_PRO,
    },
    {
      id: "editorial",
      name: "Editorial",
      description: "Centered serif name, numbered sections, minimal",
      content: HTML_EDITORIAL,
    },
  ],
  markdown: [
    {
      id: "standard",
      name: "Standard",
      description: "Clean structured sections, classic format",
      content: MD_STANDARD,
    },
    {
      id: "compact",
      name: "Compact",
      description: "Dense single-page, horizontal rules, minimal",
      content: MD_COMPACT,
    },
    {
      id: "technical",
      name: "Technical",
      description: "Stack tables, architecture detail, metrics-heavy",
      content: MD_TECHNICAL,
    },
    {
      id: "executive",
      name: "Executive",
      description: "Business outcomes, narrative paragraphs, KPIs",
      content: MD_EXECUTIVE,
    },
    {
      id: "creative",
      name: "Creative",
      description: "Emoji accents, personal voice, brand-forward",
      content: MD_CREATIVE,
    },
  ],
  latex: [
    {
      id: "classic",
      name: "Classic",
      description: "titlesec horizontal rules, standard margins",
      content: LATEX_CLASSIC,
    },
    {
      id: "compact",
      name: "Compact",
      description: "Tight margins, blue accent headings",
      content: LATEX_COMPACT,
    },
    {
      id: "modern",
      name: "Modern CV",
      description: "tabular* two-column header, small caps",
      content: LATEX_MODERN,
    },
    {
      id: "two-column",
      name: "Two Column",
      description: "minipage split: experience left, skills right",
      content: LATEX_TWO_COLUMN,
    },
    {
      id: "clean-lines",
      name: "Clean Lines",
      description: "Custom macros only, centered header, no color",
      content: LATEX_CLEAN_LINES,
    },
  ],
};

// Backward compat — store's resetTemplate uses TEMPLATES[mode] = first template per set
export const TEMPLATES: ContentMap = {
  latex: TEMPLATE_SETS.latex[0].content,
  markdown: TEMPLATE_SETS.markdown[0].content,
  html: TEMPLATE_SETS.html[0].content,
};
