export interface ATSCheck {
  label: string;
  pass: boolean;
  tip: string;
  category: string;
}


export interface ModeConfig {
  label: string;
  fileExt: string;
}

export interface ResumeTheme {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  p: string;
  ul: string;
  ol: string;
  li: string;
  strong: string;
  em: string;
  hr: string;
  a: string;
  table: string;
  thead: string;
  tbody: string;
  tr: string;
  th: string;
  td: string;
}

export interface TemplateLayout {
  marginMm: number;
  paddingMm: number;
  lineHeight: number;
}

export type EditorMode = "latex" | "markdown" | "html";

export interface SelectedEl {
  elIdx: string;
  text: string;
  computedColor: string;
  computedFontSize: string;
}
