"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useResumeStore } from "@/store/resumeStore";
import { MODE_CONFIG } from "@/constants/config";
import type { EditorMode } from "@/types/resume";
import {
  shell,
  modeGradient,
  modeActivePill,
  modeExportGlow,
} from "@/constants/theme";
import { FONT_OPTIONS } from "@/constants/styleOptions";
import type { SidePanel } from "./ActivityBar";

interface ToolbarProps {
  exporting: boolean;
  onExport: () => void;
  onCloseAllAction: () => void;
  mobileView: "editor" | "preview";
  onSetMobileView: (v: "editor" | "preview") => void;
  sidePanel: SidePanel | null;
  onToggleSidePanel: (p: SidePanel) => void;
}

const MODE_LABELS: Record<EditorMode, string> = {
  markdown: "MD",
  latex: "LaTeX",
  html: "HTML",
};

export default function Toolbar({
  exporting,
  onExport,
  onCloseAllAction,
  mobileView,
  onSetMobileView,
  sidePanel,
  onToggleSidePanel,
}: ToolbarProps) {
  const mode = useResumeStore((s) => s.mode);
  const setMode = useResumeStore((s) => s.setMode);
  const fontId = useResumeStore((s) => s.fontId);
  const setFontId = useResumeStore((s) => s.setFontId);
  const templateLayout = useResumeStore((s) => s.templateLayout);
  const setTemplateLayout = useResumeStore((s) => s.setTemplateLayout);

  const [fontOpen, setFontOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!(e.target as Element).closest("[data-font-dropdown]")) {
        setFontOpen(false);
      }
    }
    if (fontOpen) document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [fontOpen]);

  function openFontDropdown() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setFontOpen((v) => !v);
  }

  const exportGlow = modeExportGlow[mode];
  const exportGrad = modeGradient[mode];
  const selectedFontName =
    FONT_OPTIONS.find((f) => f.id === fontId)?.name ?? "Default Font";

  return (
    <header
      className={`relative z-20 flex items-center justify-between px-4 h-12 shrink-0 ${shell.bg} border-b ${shell.border} gap-3`}
      style={{ backdropFilter: "blur(20px)" }}
      onClick={onCloseAllAction}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 512 512"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bgDoc2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1976D2" />
                  <stop offset="100%" stopColor="#0D47A1" />
                </linearGradient>
                <linearGradient id="fgDoc2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFA726" />
                  <stop offset="100%" stopColor="#F57C00" />
                </linearGradient>
                <linearGradient id="fold2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E65100" />
                  <stop offset="100%" stopColor="#BF360C" />
                </linearGradient>
                <linearGradient id="rGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BF360C" />
                  <stop offset="100%" stopColor="#8B1A00" />
                </linearGradient>
                <filter id="ds2" x="-8%" y="-4%" width="120%" height="116%">
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="12"
                    floodColor="#0D47A1"
                    floodOpacity="0.22"
                  />
                </filter>
                <filter id="fs2" x="-8%" y="-4%" width="120%" height="116%">
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="14"
                    floodColor="#E65100"
                    floodOpacity="0.2"
                  />
                </filter>
                <filter id="rs2" x="-20%" y="-10%" width="140%" height="130%">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor="#4E1500"
                    floodOpacity="0.3"
                  />
                </filter>
                <clipPath id="fgClip2">
                  <path d="M96,104 L96,468 Q96,496 124,496 L428,496 Q456,496 456,468 L456,194 L358,96 L124,96 Q96,96 96,124 Z" />
                </clipPath>
                <clipPath id="bgClip2">
                  <rect x="48" y="36" width="360" height="430" rx="28" />
                </clipPath>
              </defs>
              <g filter="url(#ds2)">
                <rect
                  x="48"
                  y="36"
                  width="360"
                  height="430"
                  rx="28"
                  fill="url(#bgDoc2)"
                />
              </g>
              <g clipPath="url(#bgClip2)" opacity="0.35">
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
                  y1="260"
                  x2="200"
                  y2="260"
                  stroke="#64B5F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>
              <g filter="url(#fs2)">
                <path
                  d="M96,124 Q96,96 124,96 L358,96 L456,194 L456,468 Q456,496 428,496 L124,496 Q96,496 96,468 Z"
                  fill="url(#fgDoc2)"
                />
              </g>
              <g clipPath="url(#fgClip2)" opacity="0.3">
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
              </g>
              <path
                d="M358,96 L456,194 L370,194 Q358,194 358,182 Z"
                fill="url(#fold2)"
              />
              <path
                d="M124,96 L358,96"
                stroke="#FFE0B2"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.35"
                fill="none"
              />
              <g filter="url(#rs2)">
                <text
                  x="276"
                  y="430"
                  fontFamily="Georgia,serif"
                  fontSize="168"
                  fontWeight="700"
                  fill="url(#rGrad2)"
                  textAnchor="middle"
                  letterSpacing="-4"
                >
                  R
                </text>
              </g>
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#1f2328] tracking-tight hidden sm:block">
            ResumeForge
          </span>
        </div>

        <div className="w-px h-4 bg-black/10" />

        {/* Mode switcher — MD Segmented Button */}
        <div className="flex items-center border border-[#E0E0E0] rounded-full overflow-hidden bg-white">
          {(["markdown", "latex", "html"] as EditorMode[]).map((m) => (
            <button
              key={m}
              onClick={(e) => {
                e.stopPropagation();
                onCloseAllAction();
                setMode(m);
              }}
              className={`px-3 py-1.5 text-[11px] font-medium transition-all duration-200 border-r border-[#E0E0E0] last:border-r-0 ${
                mode === m
                  ? modeActivePill[m]
                  : `${shell.textMuted} hover:text-[#616161] hover:bg-black/4`
              }`}
            >
              <span className="hidden sm:inline">{MODE_CONFIG[m].label}</span>
              <span className="sm:hidden">{MODE_LABELS[m]}</span>
            </button>
          ))}
        </div>

        {/* Mobile: Editor / Preview toggle — MD Segmented Button */}
        <div className="flex lg:hidden items-center border border-[#E0E0E0] rounded-full overflow-hidden bg-white ml-1">
          {(["editor", "preview"] as const).map((v) => (
            <button
              key={v}
              onClick={(e) => {
                e.stopPropagation();
                onSetMobileView(v);
              }}
              className={`px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 capitalize border-r border-[#E0E0E0] last:border-r-0 ${
                mobileView === v
                  ? "bg-[#E3F2FD] text-[#1565C0]"
                  : `${shell.textMuted} hover:text-[#616161] hover:bg-black/4`
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Center — layout controls (md/latex, desktop only) ── */}
      {(mode === "markdown" || mode === "latex") && (
        <div
          className="hidden lg:flex items-center gap-2 font-mono"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] text-[#636c76]">Margin</span>
          <input
            type="text"
            inputMode="decimal"
            value={templateLayout.marginMm}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v))
                setTemplateLayout({ marginMm: v === "" ? 0 : Number(v) });
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown")
                e.preventDefault();
            }}
            className="w-10 px-1.5 h-5.5 text-[11px] text-center bg-white text-[#616161] border border-[#E0E0E0] rounded-full outline-none focus:border-[#1976D2]/60 transition-colors"
          />
          <span className="text-[10px] text-[#8c959f]">mm</span>
          <span className="w-px h-3.5 bg-black/8" />
          <span className="text-[10px] text-[#636c76]">Pad</span>
          <input
            type="text"
            inputMode="decimal"
            value={templateLayout.paddingMm}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v))
                setTemplateLayout({ paddingMm: v === "" ? 0 : Number(v) });
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown")
                e.preventDefault();
            }}
            className="w-10 px-1.5 h-5.5 text-[11px] text-center bg-white text-[#616161] border border-[#E0E0E0] rounded-full outline-none focus:border-[#1976D2]/60 transition-colors"
          />
          <span className="text-[10px] text-[#8c959f]">mm</span>
          <span className="w-px h-3.5 bg-black/8" />
          <span className="text-[10px] text-[#636c76]">Spacing</span>
          <input
            type="text"
            inputMode="decimal"
            value={templateLayout.lineHeight}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v))
                setTemplateLayout({ lineHeight: v === "" ? 0 : Number(v) });
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown")
                e.preventDefault();
            }}
            className="w-12 px-1.5 h-5.5 text-[11px] text-center bg-white text-[#616161] border border-[#E0E0E0] rounded-full outline-none focus:border-[#1976D2]/60 transition-colors"
          />
        </div>
      )}

      {/* ── Right ── */}
      <div className="flex items-center gap-2">
        {/* Mobile panel buttons */}
        <div className="flex lg:hidden items-center gap-1">
          {(["templates", "ats", "help"] as SidePanel[]).map((p) => (
            <button
              key={p}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSidePanel(p);
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-medium transition-all duration-200 ${
                sidePanel === p
                  ? "bg-[#E3F2FD] text-[#1565C0]"
                  : `bg-black/4 ${shell.textMuted} hover:text-[#616161]`
              }`}
              title={p}
            >
              {p === "templates" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  width="14"
                  height="14"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              ) : p === "ats" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  width="14"
                  height="14"
                >
                  <path
                    d="M9 12l2 2 4-4M12 3a9 9 0 100 18 9 9 0 000-18z"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  width="14"
                  height="14"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="17" r=".5" fill="currentColor" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Font selector — custom dropdown, hidden on small screens */}
        <div
          className="hidden md:block"
          data-font-dropdown
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={triggerRef}
            onClick={openFontDropdown}
            className={`flex items-center gap-1.5 px-3 h-7.5 rounded-full text-[11px] font-medium border bg-white transition-colors outline-none min-w-32.5 justify-between ${
              fontOpen
                ? "border-[#1976D2] text-[#212121]"
                : "border-[#E0E0E0] text-[#757575] hover:text-[#212121] hover:border-[#BDBDBD]"
            }`}
          >
            <span className="truncate">{selectedFontName}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              width="10"
              height="10"
              className={`shrink-0 transition-transform duration-150 ${
                fontOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {fontOpen &&
          createPortal(
            <div
              data-font-dropdown
              style={{
                position: "fixed",
                top: dropdownPos.top,
                right: dropdownPos.right,
              }}
              className="w-52 bg-white border border-[#E0E0E0] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden z-9999"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-72 overflow-y-auto">
                {/* Default */}
                <button
                  onClick={() => {
                    setFontId("");
                    onCloseAllAction();
                    setFontOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-[11px] text-left transition-colors ${
                    !fontId
                      ? "bg-[#E3F2FD] text-[#1565C0] font-medium"
                      : "text-[#212121] hover:bg-[#F5F5F5]"
                  }`}
                >
                  Default Font
                </button>

                {(["sans-serif", "display", "serif", "monospace"] as const).map(
                  (cat) => (
                    <div key={cat}>
                      <div className="px-3 pt-2 pb-1 text-[9px] font-bold uppercase tracking-widest text-[#9E9E9E] bg-[#F5F5F5] border-t border-[#EEEEEE]">
                        {cat === "sans-serif"
                          ? "Sans-serif"
                          : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </div>
                      {FONT_OPTIONS.filter((f) => f.category === cat).map(
                        (f) => (
                          <button
                            key={f.id}
                            onClick={() => {
                              setFontId(f.id);
                              onCloseAllAction();
                              setFontOpen(false);
                            }}
                            className={`w-full px-3 py-1.5 text-[11px] text-left transition-colors ${
                              fontId === f.id
                                ? "bg-[#E3F2FD] text-[#1565C0] font-medium"
                                : "text-[#212121] hover:bg-[#F5F5F5]"
                            }`}
                          >
                            {f.name}
                          </button>
                        )
                      )}
                    </div>
                  )
                )}
              </div>
            </div>,
            document.body
          )}

        {/* Export */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExport();
          }}
          disabled={exporting}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-wait active:scale-95 ${exportGrad} ${exportGlow}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            width="11"
            height="11"
          >
            <path
              d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden sm:inline">
            {exporting ? "Preparing…" : "Export PDF"}
          </span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
    </header>
  );
}
