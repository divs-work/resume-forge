"use client";

import { useMemo, type ChangeEvent } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { checkAts } from "@/helper/ats";
import {
  MODE_CONFIG,
  MARGIN_MM_MIN, MARGIN_MM_MAX,
  PADDING_MM_MIN, PADDING_MM_MAX,
  LINE_HEIGHT_MIN, LINE_HEIGHT_MAX, LINE_HEIGHT_STEP,
} from "@/constants/config";
import type { EditorMode } from "@/types/resume";
import { shell, modeBg, toolbar } from "@/constants/theme";
import { FONT_OPTIONS } from "@/constants/styleOptions";

interface ToolbarProps {
  showAts: boolean;
  onToggleATS: () => void;
  showTemplates: boolean;
  onToggleTemplates: () => void;
  exporting: boolean;
  onExport: () => void;
  onCloseStylePanel: () => void;
}

export default function Toolbar({
  showAts,
  onToggleATS,
  showTemplates,
  onToggleTemplates,
  exporting,
  onExport,
  onCloseStylePanel,
}: ToolbarProps) {
  const mode = useResumeStore((s) => s.mode);
  const setMode = useResumeStore((s) => s.setMode);
  const content = useResumeStore((s) => s.content[s.mode]);
  const resetTemplate = useResumeStore((s) => s.resetTemplate);
  const fontId = useResumeStore((s) => s.fontId);
  const setFontId = useResumeStore((s) => s.setFontId);
  const templateLayout = useResumeStore((s) => s.templateLayout);
  const setTemplateLayout = useResumeStore((s) => s.setTemplateLayout);

  const atsScore = useMemo(() => checkAts(content).score, [content]);

  const handleMarginChange  = (e: ChangeEvent<HTMLInputElement>) => setTemplateLayout({ marginMm: Number(e.target.value) });
  const handlePaddingChange = (e: ChangeEvent<HTMLInputElement>) => setTemplateLayout({ paddingMm: Number(e.target.value) });
  const handleSpacingChange = (e: ChangeEvent<HTMLInputElement>) => setTemplateLayout({ lineHeight: Number(e.target.value) });
  const handleFontChange    = (e: ChangeEvent<HTMLSelectElement>) => setFontId(e.target.value);

  const templatesBtnCls = showTemplates
    ? `${toolbar.atsActiveBg} ${toolbar.atsActiveText}`
    : `${toolbar.atsInactiveBg} ${toolbar.atsInactiveText}`;
  const atsBtnCls = showAts
    ? `${toolbar.atsActiveBg} ${toolbar.atsActiveText}`
    : `${toolbar.atsInactiveBg} ${toolbar.atsInactiveText}`;

  return (
    <div
      onClick={onCloseStylePanel}
      className={`flex items-center justify-between px-4 py-2 ${shell.bg} border-b ${shell.border} gap-2 flex-wrap shrink-0`}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-6 flex items-center justify-center`}>
            <svg
              viewBox="0 0 512 512"
              width="512"
              height="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bgDoc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1976D2" />
                  <stop offset="100%" stopColor="#0D47A1" />
                </linearGradient>
                <linearGradient id="fgDoc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFA726" />
                  <stop offset="100%" stopColor="#F57C00" />
                </linearGradient>
                <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E65100" />
                  <stop offset="100%" stopColor="#BF360C" />
                </linearGradient>
                <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BF360C" />
                  <stop offset="100%" stopColor="#8B1A00" />
                </linearGradient>
                <filter
                  id="docShadow"
                  x="-8%"
                  y="-4%"
                  width="120%"
                  height="116%"
                >
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="12"
                    floodColor="#0D47A1"
                    floodOpacity="0.22"
                  />
                </filter>
                <filter
                  id="fgShadow"
                  x="-8%"
                  y="-4%"
                  width="120%"
                  height="116%"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="14"
                    floodColor="#E65100"
                    floodOpacity="0.2"
                  />
                </filter>
                <filter
                  id="rShadow"
                  x="-20%"
                  y="-10%"
                  width="140%"
                  height="130%"
                >
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor="#4E1500"
                    floodOpacity="0.3"
                  />
                </filter>
                <clipPath id="fgClip">
                  <path d="M96,104 L96,468 Q96,496 124,496 L428,496 Q456,496 456,468 L456,194 L358,96 L124,96 Q96,96 96,124 Z" />
                </clipPath>
                <clipPath id="bgClip">
                  <rect x="48" y="36" width="360" height="430" rx="28" />
                </clipPath>
              </defs>

              <g filter="url(#docShadow)">
                <rect
                  x="48"
                  y="36"
                  width="360"
                  height="430"
                  rx="28"
                  fill="url(#bgDoc)"
                />
              </g>

              <g clipPath="url(#bgClip)" opacity="0.35">
                <line
                  x1="88"
                  y1="120"
                  x2="220"
                  y2="120"
                  stroke="#64B5F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="88"
                  y1="152"
                  x2="310"
                  y2="152"
                  stroke="#64B5F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="88"
                  y1="180"
                  x2="280"
                  y2="180"
                  stroke="#64B5F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="88"
                  y1="208"
                  x2="250"
                  y2="208"
                  stroke="#64B5F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="88"
                  y1="260"
                  x2="200"
                  y2="260"
                  stroke="#64B5F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="88"
                  y1="292"
                  x2="300"
                  y2="292"
                  stroke="#64B5F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="88"
                  y1="320"
                  x2="260"
                  y2="320"
                  stroke="#64B5F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              <g filter="url(#fgShadow)">
                <path
                  d="M96,124 Q96,96 124,96 L358,96 L456,194 L456,468 Q456,496 428,496 L124,496 Q96,496 96,468 Z"
                  fill="url(#fgDoc)"
                />
              </g>

              <g clipPath="url(#fgClip)" opacity="0.3">
                <line
                  x1="140"
                  y1="200"
                  x2="290"
                  y2="200"
                  stroke="#FFE0B2"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="140"
                  y1="232"
                  x2="380"
                  y2="232"
                  stroke="#FFE0B2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="140"
                  y1="260"
                  x2="350"
                  y2="260"
                  stroke="#FFE0B2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="140"
                  y1="288"
                  x2="320"
                  y2="288"
                  stroke="#FFE0B2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              <path
                d="M358,96 L456,194 L370,194 Q358,194 358,182 Z"
                fill="url(#foldGrad)"
              />

              <path
                d="M362,100 L450,188"
                fill="none"
                stroke="#FFCC80"
                strokeWidth="0.8"
                opacity="0.25"
              />

              <path
                d="M358,182 Q358,194 370,194 L456,194"
                fill="none"
                stroke="#7F2000"
                strokeWidth="1"
                opacity="0.15"
              />

              <path
                d="M124,96 L358,96"
                stroke="#FFE0B2"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.35"
                fill="none"
              />

              <g filter="url(#rShadow)">
                <text
                  x="276"
                  y="430"
                  fontFamily="'Georgia','Times New Roman',serif"
                  fontSize="168"
                  fontWeight="700"
                  fill="url(#rGrad)"
                  textAnchor="middle"
                  letterSpacing="-4"
                >
                  R
                </text>
              </g>
              <text
                x="274"
                y="426"
                fontFamily="'Georgia','Times New Roman',serif"
                fontSize="168"
                fontWeight="700"
                fill="#FF8A65"
                textAnchor="middle"
                letterSpacing="-4"
                opacity="0.15"
              >
                R
              </text>
            </svg>
          </div>
          <span
            className={`text-[13px] font-bold ${shell.text} tracking-tight`}
          >
            ResumeForge
          </span>
        </div>
        <div className={`w-px h-4.4 ${shell.divider}`} />
        <div className={`flex ${shell.bgMuted} rounded-lg p-0.5 gap-0.5`}>
          {(["markdown", "latex", "html"] as EditorMode[]).map((m) => {
            const btnCls = mode === m
              ? `${shell.bg} shadow-sm ${shell.text}`
              : `${shell.textMuted} ${shell.hoverText}`;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.25 rounded-md text-[11px] font-medium transition-all ${btnCls}`}
              >
                {MODE_CONFIG[m].label}
              </button>
            );
          })}
        </div>

        {(mode === "markdown" || mode === "latex") && (
          <>
            <div className={`w-px h-4 ${shell.divider}`} />
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] ${shell.textFaint} whitespace-nowrap`}>Margin</span>
              <input
                type="number" min={MARGIN_MM_MIN} max={MARGIN_MM_MAX}
                value={templateLayout.marginMm}
                onChange={handleMarginChange}
                className={`w-10 px-1 py-1 rounded text-[11px] text-center ${shell.bgMuted} ${shell.textMuted} border-none outline-none`}
              />
              <span className={`text-[10px] ${shell.textFaint}`}>mm</span>
              <span className={`text-[10px] ${shell.textFaint} whitespace-nowrap ml-1`}>Pad</span>
              <input
                type="number" min={PADDING_MM_MIN} max={PADDING_MM_MAX}
                value={templateLayout.paddingMm}
                onChange={handlePaddingChange}
                className={`w-10 px-1 py-1 rounded text-[11px] text-center ${shell.bgMuted} ${shell.textMuted} border-none outline-none`}
              />
              <span className={`text-[10px] ${shell.textFaint}`}>mm</span>
              <span className={`text-[10px] ${shell.textFaint} whitespace-nowrap ml-1`}>Spacing</span>
              <input
                type="number" min={LINE_HEIGHT_MIN} max={LINE_HEIGHT_MAX} step={LINE_HEIGHT_STEP}
                value={templateLayout.lineHeight}
                onChange={handleSpacingChange}
                className={`w-12 px-1 py-1 rounded text-[11px] text-center ${shell.bgMuted} ${shell.textMuted} border-none outline-none`}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-1.25 flex-wrap">
        <select
          value={fontId}
          onChange={handleFontChange}
          className={`px-2 py-1.25 rounded-lg text-[11px] font-medium border-none cursor-pointer ${shell.bgMuted} ${shell.textMuted} outline-none`}
        >
          <option value="">Default Font</option>
          {(["sans-serif", "display", "serif", "monospace"] as const).map((cat) => (
            <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", "-")}>
              {FONT_OPTIONS.filter((f) => f.category === cat).map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className={`w-px h-4 ${shell.divider}`} />
        <button
          onClick={onToggleTemplates}
          className={`flex items-center gap-1 px-2.5 py-1.25 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all ${templatesBtnCls}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Templates
        </button>

        <button
          onClick={onToggleATS}
          className={`flex items-center gap-1 px-2.5 py-1.25 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all ${atsBtnCls}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="13"
            height="13"
          >
            <path
              d="M9 12l2 2 4-4M12 3a9 9 0 100 18 9 9 0 000-18z"
              strokeLinecap="round"
            />
          </svg>
          ATS {atsScore}%
        </button>

        <button
          onClick={resetTemplate}
          className={`px-2.5 py-1.25 rounded-lg ${shell.bgMuted} border-none cursor-pointer text-[11px] font-medium ${shell.textMuted}`}
        >
          Reset
        </button>

        <button
          onClick={onExport}
          disabled={exporting}
          className={`flex items-center gap-1.25 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold border-none cursor-pointer ${shell.textInverse} transition-all disabled:opacity-60 disabled:cursor-wait ${modeBg[mode]}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-white"
            strokeWidth="2"
            width="13"
            height="13"
          >
            <path
              d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              strokeLinecap="round"
            />
          </svg>
          {exporting ? "Preparing…" : "Export PDF"}
        </button>
      </div>
    </div>
  );
}
