"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/store/resume-store";
import { checkATS } from "@/lib/ats";
import { MODE_CONFIG } from "@/constant/config";
import type { EditorMode } from "@/types/resume";
import { shell, modeBg, toolbar } from "@/constant/theme";

interface ToolbarProps {
  showATS: boolean;
  onToggleATS: () => void;
  exporting: boolean;
  onExport: () => void;
}

export default function Toolbar({
  showATS,
  onToggleATS,
  exporting,
  onExport,
}: ToolbarProps) {
  const mode = useResumeStore((s) => s.mode);
  const setMode = useResumeStore((s) => s.setMode);
  const content = useResumeStore((s) => s.content[s.mode]);
  const resetTemplate = useResumeStore((s) => s.resetTemplate);

  const atsScore = useMemo(() => checkATS(content).score, [content]);

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 ${shell.bg} border-b ${shell.border} gap-2 flex-wrap shrink-0`}
    >
      {/* LEFT */}
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
                  <stop offset="0%" stop-color="#1976D2" />
                  <stop offset="100%" stop-color="#0D47A1" />
                </linearGradient>
                <linearGradient id="fgDoc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FFA726" />
                  <stop offset="100%" stop-color="#F57C00" />
                </linearGradient>
                <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#E65100" />
                  <stop offset="100%" stop-color="#BF360C" />
                </linearGradient>
                <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#BF360C" />
                  <stop offset="100%" stop-color="#8B1A00" />
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
                    flood-color="#0D47A1"
                    flood-opacity="0.22"
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
                    flood-color="#E65100"
                    flood-opacity="0.2"
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
                    flood-color="#4E1500"
                    flood-opacity="0.3"
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

              <g clip-path="url(#bgClip)" opacity="0.35">
                <line
                  x1="88"
                  y1="120"
                  x2="220"
                  y2="120"
                  stroke="#64B5F6"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                <line
                  x1="88"
                  y1="152"
                  x2="310"
                  y2="152"
                  stroke="#64B5F6"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <line
                  x1="88"
                  y1="180"
                  x2="280"
                  y2="180"
                  stroke="#64B5F6"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <line
                  x1="88"
                  y1="208"
                  x2="250"
                  y2="208"
                  stroke="#64B5F6"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <line
                  x1="88"
                  y1="260"
                  x2="200"
                  y2="260"
                  stroke="#64B5F6"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                <line
                  x1="88"
                  y1="292"
                  x2="300"
                  y2="292"
                  stroke="#64B5F6"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <line
                  x1="88"
                  y1="320"
                  x2="260"
                  y2="320"
                  stroke="#64B5F6"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </g>

              <g filter="url(#fgShadow)">
                <path
                  d="M96,124 Q96,96 124,96 L358,96 L456,194 L456,468 Q456,496 428,496 L124,496 Q96,496 96,468 Z"
                  fill="url(#fgDoc)"
                />
              </g>

              <g clip-path="url(#fgClip)" opacity="0.3">
                <line
                  x1="140"
                  y1="200"
                  x2="290"
                  y2="200"
                  stroke="#FFE0B2"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                <line
                  x1="140"
                  y1="232"
                  x2="380"
                  y2="232"
                  stroke="#FFE0B2"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <line
                  x1="140"
                  y1="260"
                  x2="350"
                  y2="260"
                  stroke="#FFE0B2"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <line
                  x1="140"
                  y1="288"
                  x2="320"
                  y2="288"
                  stroke="#FFE0B2"
                  stroke-width="3"
                  stroke-linecap="round"
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
                stroke-width="0.8"
                opacity="0.25"
              />

              <path
                d="M358,182 Q358,194 370,194 L456,194"
                fill="none"
                stroke="#7F2000"
                stroke-width="1"
                opacity="0.15"
              />

              <path
                d="M124,96 L358,96"
                stroke="#FFE0B2"
                stroke-width="1.5"
                stroke-linecap="round"
                opacity="0.35"
                fill="none"
              />

              <g filter="url(#rShadow)">
                <text
                  x="276"
                  y="430"
                  font-family="'Georgia','Times New Roman',serif"
                  font-size="168"
                  font-weight="700"
                  fill="url(#rGrad)"
                  text-anchor="middle"
                  letter-spacing="-4"
                >
                  R
                </text>
              </g>
              <text
                x="274"
                y="426"
                font-family="'Georgia','Times New Roman',serif"
                font-size="168"
                font-weight="700"
                fill="#FF8A65"
                text-anchor="middle"
                letter-spacing="-4"
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
          {(["latex", "markdown", "html"] as EditorMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.25 rounded-md text-[11px] font-medium transition-all ${
                mode === m
                  ? `${shell.bg} shadow-sm ${shell.text}`
                  : `${shell.textMuted} ${shell.hoverText}`
              }`}
            >
              {MODE_CONFIG[m].label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1.25 flex-wrap">
        <button
          onClick={onToggleATS}
          className={`flex items-center gap-1 px-2.5 py-1.25 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all ${
            showATS
              ? `${toolbar.atsActiveBg} ${toolbar.atsActiveText}`
              : `${toolbar.atsInactiveBg} ${toolbar.atsInactiveText}`
          }`}
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
