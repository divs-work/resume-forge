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

export default function Toolbar({ showATS, onToggleATS, exporting, onExport }: ToolbarProps) {
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
          <div
            className={`w-5.5 h-5.5 rounded-[5px] flex items-center justify-center ${modeBg[mode]}`}
          >
            <svg viewBox="0 0 24 24" fill="#fff" width="12" height="12">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            </svg>
          </div>
          <span className={`text-[13px] font-bold ${shell.text} tracking-tight`}>
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
