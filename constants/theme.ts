/**
 * UI colour tokens — single source of truth.
 * Palette: Material Design 3 — Blue primary
 * Primary:  #1976D2  |  Surface: #FFFFFF  |  Background: #FAFAFA
 */

// ─── App shell ────────────────────────────────────────────────────────────────
export const shell = {
  bg:            "bg-[#FAFAFA]",
  bgSubtle:      "bg-[#F5F5F5]",
  bgMuted:       "bg-[#EEEEEE]",
  bgRaised:      "bg-white",
  bgGlass:       "bg-black/[0.04]",
  divider:       "bg-[#E0E0E0]",
  border:        "border-[#E0E0E0]",
  text:          "text-[#212121]",
  textSecondary: "text-[#616161]",
  textMuted:     "text-[#757575]",
  textFaint:     "text-[#9E9E9E]",
  textInverse:   "text-white",
  iconStroke:    "stroke-[#757575]",
  hoverText:     "hover:text-[#212121]",
} as const;

// ─── Editor ───────────────────────────────────────────────────────────────────
export const editor = {
  barBg:    "bg-[#F5F5F5]",
  border:   "border-[#E0E0E0]",
  activeBg: "bg-white",
  mutedText:"text-[#9E9E9E]",
  text:     "text-[#212121]",
} as const;

// ─── Primary accent (MD Blue 700) ─────────────────────────────────────────────
export const accent = {
  bar:    "bg-[#1976D2]",
  bgFill: "bg-[#E3F2FD]",
  pill:   "bg-[#E3F2FD] text-[#1565C0]",
  text:   "text-[#1976D2]",
  border: "border-[#1976D2]",
  glow:   "hover:shadow-[0_2px_8px_rgba(25,118,210,0.3)]",
  grad:   "bg-[#1976D2]",
} as const;

// ─── Per-mode accents ─────────────────────────────────────────────────────────
export const modeBg: Record<string, string> = {
  latex:    "bg-[#D32F2F]",
  markdown: "bg-[#1976D2]",
  html:     "bg-[#F57C00]",
};

export const modeGradient: Record<string, string> = {
  latex:    "bg-[#D32F2F]",
  markdown: "bg-[#1976D2]",
  html:     "bg-[#F57C00]",
};

export const modeActivePill: Record<string, string> = {
  latex:    "bg-[#FFEBEE] text-[#C62828]",
  markdown: "bg-[#E3F2FD] text-[#1565C0]",
  html:     "bg-[#FFF3E0] text-[#E65100]",
};

export const modeExportGlow: Record<string, string> = {
  latex:    "hover:shadow-[0_2px_8px_rgba(211,47,47,0.45)]",
  markdown: "hover:shadow-[0_2px_8px_rgba(25,118,210,0.45)]",
  html:     "hover:shadow-[0_2px_8px_rgba(245,124,0,0.45)]",
};

// ─── Preview canvas ───────────────────────────────────────────────────────────
export const canvas = {
  bg:                "bg-[#ECEFF1]",
  pageLabel:         "text-[#BDBDBD]",
  paperBg:           "bg-white",
  paperShadow:       "shadow-[0_2px_4px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.1)]",
  breakShadowTop:    "bg-gradient-to-b from-black/[0.08] to-transparent",
  breakShadowBottom: "bg-gradient-to-t from-black/[0.08] to-transparent",
} as const;

// ─── ATS score ring ───────────────────────────────────────────────────────────
export const atsScore = {
  high:  "stroke-[#388E3C]",
  mid:   "stroke-[#F57C00]",
  low:   "stroke-[#D32F2F]",
  track: "stroke-[#E0E0E0]",
} as const;

// ─── ATS check badges ─────────────────────────────────────────────────────────
export const atsBadge = {
  passBg:     "bg-[#E8F5E9]",
  passBorder: "border-[#C8E6C9]",
  passText:   "text-[#2E7D32]",
  passDot:    "bg-[#388E3C]",
  failBg:     "bg-[#FFEBEE]",
  failBorder: "border-[#FFCDD2]",
  failText:   "text-[#C62828]",
  failDot:    "bg-[#D32F2F]",
  failHover:  "hover:bg-[#FFCDD2]",
} as const;

// ─── ATS category progress ────────────────────────────────────────────────────
export const atsCategory = {
  track:        "bg-[#E0E0E0]",
  barPass:      "bg-[#388E3C]",
  barPartial:   "bg-[#F57C00]",
  barFail:      "bg-[#D32F2F]",
  labelPass:    "text-[#2E7D32]",
  labelPartial: "text-[#E65100]",
  labelFail:    "text-[#C62828]",
} as const;

// ─── ATS tooltip ──────────────────────────────────────────────────────────────
export const atsTooltip = {
  bg:          "bg-white",
  headerBg:    "bg-[#F5F5F5]",
  headerBorder:"border-[#E0E0E0]",
  titleText:   "text-[#212121]",
  bodyText:    "text-[#757575]",
  arrow:       "border-b-white",
} as const;

// ─── Toolbar ──────────────────────────────────────────────────────────────────
export const toolbar = {
  atsActiveBg:     "bg-[#212121]",
  atsActiveText:   "text-white",
  atsInactiveBg:   "bg-black/[0.05]",
  atsInactiveText: "text-[#757575]",
} as const;
