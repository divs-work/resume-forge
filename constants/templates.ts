import type { EditorMode, ResumeTheme } from "@/types/resume";
import {
  DEFAULT_HTML_TEMPLATE,
  HTML_DARK_MINIMAL,
  HTML_EDITORIAL,
  HTML_NEO_BRUTALIST,
  HTML_NIGHT_PRO,
} from "./templatesHtml";
import {
  ACADEMIC_MD_THEME,
  DEFAULT_MD_TEMPLATE,
  DEFAULT_MD_THEME,
  EARTHY_MD_THEME,
  MINIMALIST_MD_THEME,
  MODERN_TECH_MD_THEME,
} from "./templatesMarkdown";
import {
  ACADEMIC_LATEX_THEME,
  DEFAULT_LATEX_TEMPLATE,
  DEFAULT_LATEX_THEME,
  MODERNCV_LATEX_THEME,
  RES_CLS_LATEX_THEME,
  TUFTE_LATEX_THEME,
} from "./templatesLatex";

type ContentMap = Record<EditorMode, string>;

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  content: string;
  theme?: ResumeTheme;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// EXPORTS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const TEMPLATE_STYLES: Record<EditorMode, TemplateOption[]> = {
  html: [
    {
      id: "clean-light",
      name: "Clean Light",
      description: "Blue accent, timeline experience, card projects",
      content: DEFAULT_HTML_TEMPLATE,
    },
    {
      id: "dark-minimal",
      name: "Dark Minimal",
      description: "Dark cards, mono labels, flex layout",
      content: HTML_DARK_MINIMAL,
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
      content: DEFAULT_MD_TEMPLATE,
      theme: DEFAULT_MD_THEME,
    },
    {
      id: "minimalist",
      name: "Minimalist Monochrome",
      description:
        "Clean, elegant, and highly professional layout prioritizing spacing",
      content: DEFAULT_MD_TEMPLATE,
      theme: MINIMALIST_MD_THEME,
    },
    {
      id: "earthy",
      name: "Earthy Warmth",
      description: "Approachable and creative with a soft, warm aesthetic",
      content: DEFAULT_MD_TEMPLATE,
      theme: EARTHY_MD_THEME,
    },
    {
      id: "modern-tech",
      name: "Modern Tech",
      description: "Sleek, bold, and high-contrastâ€”designed for developers",
      content: DEFAULT_MD_TEMPLATE,
      theme: MODERN_TECH_MD_THEME,
    },
    {
      id: "academic",
      name: "Classic Academic",
      description:
        "Traditional, authoritative structure perfect for extensive CVs",
      content: DEFAULT_MD_TEMPLATE,
      theme: ACADEMIC_MD_THEME,
    },
  ],
  latex: [
    {
      id: "classic",
      name: "Classic",
      description: "titlesec horizontal rules, standard margins, strict serif",
      content: DEFAULT_LATEX_TEMPLATE,
      theme: DEFAULT_LATEX_THEME,
    },
    {
      id: "moderncv",
      name: "ModernCV",
      description: "Clean, sans-serif European style with subtle color accents",
      content: DEFAULT_LATEX_TEMPLATE,
      theme: MODERNCV_LATEX_THEME,
    },
    {
      id: "academic",
      name: "Academic Journal",
      description: "Dense, formal, highly structured small-caps layout",
      content: DEFAULT_LATEX_TEMPLATE,
      theme: ACADEMIC_LATEX_THEME,
    },
    {
      id: "tufte",
      name: "Tufte Style",
      description: "Elegant typography, heavy reliance on italics and sizing",
      content: DEFAULT_LATEX_TEMPLATE,
      theme: TUFTE_LATEX_THEME,
    },
    {
      id: "res-cls",
      name: "Old-School res.cls",
      description:
        "Traditional 90s resume style with heavy bolding and indents",
      content: DEFAULT_LATEX_TEMPLATE,
      theme: RES_CLS_LATEX_THEME,
    },
  ],
};

// Backward compat â€” store's resetTemplate uses TEMPLATES[mode] = first template per set
export const TEMPLATES: ContentMap = {
  latex: DEFAULT_LATEX_TEMPLATE,
  markdown: DEFAULT_MD_TEMPLATE,
  html: DEFAULT_HTML_TEMPLATE,
};
