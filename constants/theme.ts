/**
 * UI colour tokens — single source of truth for every colour in the app.
 * All values are static Tailwind class strings so the v4 JIT scanner picks
 * them up here. Components import and reference these; no colour string
 * should appear raw in a component file.
 */

// ─── App shell ────────────────────────────────────────────────────────────────
export const shell = {
  bg:            "bg-[#0f0f0f]",
  bgSubtle:      "bg-[#141414]",
  bgMuted:       "bg-[#1e1e1e]",
  bgRaised:      "bg-[#2a2a2a]",
  divider:       "bg-[#242424]",
  border:        "border-[#272727]",
  text:          "text-[#e4e4e4]",
  textSecondary: "text-[#a0a0a0]",
  textMuted:     "text-[#808080]",
  textFaint:     "text-[#555555]",
  textInverse:   "text-[#0f0f0f]",
  iconStroke:    "stroke-[#555555]",
  hoverText:     "hover:text-[#c8c8c8]",
} as const;

// ─── Editor (dark) ────────────────────────────────────────────────────────────
export const editor = {
  barBg:    "bg-[#0c0c0c]",
  border:   "border-[#1c1c1c]",
  activeBg: "bg-[#0a0a0a]",
  mutedText:"text-[#4a4a4a]",
  text:     "text-[#c9d1d9]",
} as const;

// ─── Per-mode accents ─────────────────────────────────────────────────────────
export const modeBg: Record<string, string> = {
  latex:    "bg-red-500",
  markdown: "bg-violet-500",
  html:     "bg-orange-500",
};

// ─── Preview canvas ───────────────────────────────────────────────────────────
export const canvas = {
  bg:                "bg-[#161616]",
  pageLabel:         "text-[#3c3c3c]",
  paperBg:           "bg-white",
  paperShadow:       "shadow-[0_12px_48px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]",
  breakShadowTop:    "bg-gradient-to-b from-black/30 to-transparent",
  breakShadowBottom: "bg-gradient-to-t from-black/30 to-transparent",
} as const;

// ─── ATS score ring ───────────────────────────────────────────────────────────
export const atsScore = {
  high:  "stroke-emerald-500",
  mid:   "stroke-amber-400",
  low:   "stroke-red-500",
  track: "stroke-[#2a2a2a]",
} as const;

// ─── ATS check badges ─────────────────────────────────────────────────────────
export const atsBadge = {
  passBg:     "bg-emerald-950/40",
  passBorder: "border-emerald-900/50",
  passText:   "text-emerald-400",
  passDot:    "bg-emerald-500",
  failBg:     "bg-red-950/40",
  failBorder: "border-red-900/50",
  failText:   "text-red-400",
  failDot:    "bg-red-500",
  failHover:  "hover:bg-red-950/60",
} as const;

// ─── ATS category progress ────────────────────────────────────────────────────
export const atsCategory = {
  track:        "bg-[#2a2a2a]",
  barPass:      "bg-emerald-500",
  barPartial:   "bg-amber-400",
  barFail:      "bg-red-500",
  labelPass:    "text-emerald-400",
  labelPartial: "text-amber-400",
  labelFail:    "text-red-400",
} as const;

// ─── ATS tooltip ──────────────────────────────────────────────────────────────
export const atsTooltip = {
  bg:          "bg-[#1e1e1e]",
  headerBg:    "bg-[#161616]",
  headerBorder:"border-[#2a2a2a]",
  titleText:   "text-[#e4e4e4]",
  bodyText:    "text-[#909090]",
  arrow:       "border-b-[#1e1e1e]",
} as const;

// ─── Toolbar ──────────────────────────────────────────────────────────────────
export const toolbar = {
  atsActiveBg:     "bg-[#e4e4e4]",
  atsActiveText:   "text-[#0f0f0f]",
  atsInactiveBg:   "bg-[#1e1e1e]",
  atsInactiveText: "text-[#808080]",
} as const;
