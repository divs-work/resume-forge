/**
 * UI colour tokens — single source of truth for every colour in the app.
 * All values are static Tailwind class strings so the v4 JIT scanner picks
 * them up here. Components import and reference these; no colour string
 * should appear raw in a component file.
 */

// ─── App shell ────────────────────────────────────────────────────────────────
export const shell = {
  bg:            "bg-white",
  bgSubtle:      "bg-gray-50",    // panels, headers, app container
  bgMuted:       "bg-gray-100",   // button groups, secondary surfaces
  bgInverted:    "bg-gray-900",   // active/toggled dark buttons
  divider:       "bg-gray-200",   // thin vertical dividers
  border:        "border-gray-200",
  text:          "text-gray-900",
  textSecondary: "text-gray-600",
  textMuted:     "text-gray-500",
  textFaint:     "text-gray-400",
  textInverse:   "text-white",
  shadow:        "shadow-sm",
  iconStroke:    "stroke-gray-400",
  iconFill:      "fill-white",
  hoverBg:       "hover:bg-gray-200",
  hoverText:     "hover:text-gray-700",
} as const;

// ─── Editor (dark GitHub-style) ───────────────────────────────────────────────
export const editor = {
  barBg:        "bg-[#161b22]",
  border:       "border-[#30363d]",
  activeBg:     "bg-[#0d1117]",
  inactiveBg:   "bg-[#1c2128]",
  activeText:   "text-[#e6edf3]",
  inactiveText: "text-[#636c76]",
  mutedText:    "text-[#8b949e]",
  text:         "text-[#c9d1d9]",
} as const;

// ─── Per-mode accents ─────────────────────────────────────────────────────────
export const modeBg: Record<string, string> = {
  latex:    "bg-red-600",
  markdown: "bg-blue-600",
  html:     "bg-orange-600",
};

export const modeCaret: Record<string, string> = {
  latex:    "caret-red-600",
  markdown: "caret-blue-600",
  html:     "caret-orange-600",
};


// ─── Preview canvas ───────────────────────────────────────────────────────────
export const canvas = {
  bg:                "bg-[#d4d4d4]",
  pageLabel:         "text-[#999]",
  paperBg:           "bg-white",
  paperShadow:       "shadow-[0_2px_8px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.1)]",
  breakShadowTop:    "bg-gradient-to-b from-black/8 to-transparent",
  breakShadowBottom: "bg-gradient-to-t from-black/8 to-transparent",
} as const;

// ─── ATS score ring ───────────────────────────────────────────────────────────
export const atsScore = {
  high:  "stroke-green-500",  // >= 80
  mid:   "stroke-yellow-500", // >= 50
  low:   "stroke-red-500",    // <  50
  track: "stroke-gray-200",   // background track
} as const;

// ─── ATS check badges ─────────────────────────────────────────────────────────
export const atsBadge = {
  passBg:     "bg-green-50",
  passBorder: "border-green-100",
  passText:   "text-green-700",
  passDot:    "bg-green-400",
  failBg:     "bg-red-50",
  failBorder: "border-red-100",
  failText:   "text-red-600",
  failDot:    "bg-red-400",
  failHover:  "hover:bg-red-100",
} as const;

// ─── ATS category progress ────────────────────────────────────────────────────
export const atsCategory = {
  track:       "bg-gray-100",
  barPass:     "bg-green-400",
  barPartial:  "bg-yellow-400",
  barFail:     "bg-red-400",
  labelPass:   "text-green-600",
  labelPartial:"text-yellow-600",
  labelFail:   "text-red-500",
} as const;

// ─── ATS tooltip ──────────────────────────────────────────────────────────────
export const atsTooltip = {
  bg:         "bg-gray-900",
  headerBg:   "bg-gray-800",
  headerBorder:"border-gray-700",
  titleText:  "text-white",
  bodyText:   "text-gray-300",
  arrow:      "border-b-gray-900",
} as const;

// ─── Toolbar ──────────────────────────────────────────────────────────────────
export const toolbar = {
  atsActiveBg:     "bg-gray-900",
  atsActiveText:   "text-white",
  atsInactiveBg:   "bg-gray-100",
  atsInactiveText: "text-gray-600",
} as const;
