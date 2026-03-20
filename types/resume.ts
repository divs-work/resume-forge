export interface ATSCheck {
  label: string;
  pass: boolean;
  tip: string;
  category: string;
}

export interface ATSResult {
  checks: ATSCheck[];
  score: number;
}

export interface ModeConfig {
  label: string;
  fileExt: string;
}

export type EditorMode = "latex" | "markdown" | "html";
export type View = "editor" | "parsed";
