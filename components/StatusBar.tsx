"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { checkAts } from "@/helper/ats";
import { shell, modeBg, atsCategory } from "@/constants/theme";
import {
  MODE_CONFIG,
  MARGIN_MM_MIN, MARGIN_MM_MAX,
  PADDING_MM_MIN, PADDING_MM_MAX,
  LINE_HEIGHT_MIN, LINE_HEIGHT_MAX, LINE_HEIGHT_STEP,
} from "@/constants/config";

interface Props {
  pageCount: number;
  scale: number;
}

export default function StatusBar({ pageCount, scale }: Props) {
  const mode           = useResumeStore((s) => s.mode);
  const content        = useResumeStore((s) => s.content[s.mode]);
  const templateLayout = useResumeStore((s) => s.templateLayout);
  const setTemplateLayout = useResumeStore((s) => s.setTemplateLayout);

  const lineCount = content.split("\n").length;
  const charCount = content.length;
  const atsScore  = useMemo(() => checkAts(content).score, [content]);
  const cfg       = MODE_CONFIG[mode];

  const scoreColor =
    atsScore >= 80 ? atsCategory.labelPass :
    atsScore >= 50 ? atsCategory.labelPartial :
    atsCategory.labelFail;

  const numCls = `w-9 px-1 h-5 text-[10px] text-center ${shell.bgMuted} ${shell.textSecondary} border ${shell.border} rounded outline-none focus:border-[#404040] transition-colors font-mono`;

  return (
    <div
      className={`flex items-center justify-between px-4 h-7 shrink-0 ${shell.bg} border-t ${shell.border} font-mono text-[10px] select-none`}
    >
      {/* Left — file info */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${modeBg[mode]}`} />
          <span className="text-[#4a4a4a]">resume.{cfg.fileExt}</span>
        </div>
        <span className="text-[#333333]">·</span>
        <span className="text-[#4a4a4a] tabular-nums">{lineCount}L</span>
        <span className="text-[#333333]">·</span>
        <span className="text-[#4a4a4a] tabular-nums">{charCount.toLocaleString()}C</span>
      </div>

      {/* Center — layout controls (md / latex only) */}
      {(mode === "markdown" || mode === "latex") && (
        <div className="flex items-center gap-2">
          <span className="text-[#4a4a4a]">Margin</span>
          <input
            type="number" min={MARGIN_MM_MIN} max={MARGIN_MM_MAX}
            value={templateLayout.marginMm}
            onChange={(e) => setTemplateLayout({ marginMm: Number(e.target.value) })}
            className={numCls}
          />
          <span className="text-[#4a4a4a]">mm</span>
          <span className={`inline-block w-px h-3 ${shell.divider}`} />
          <span className="text-[#4a4a4a]">Pad</span>
          <input
            type="number" min={PADDING_MM_MIN} max={PADDING_MM_MAX}
            value={templateLayout.paddingMm}
            onChange={(e) => setTemplateLayout({ paddingMm: Number(e.target.value) })}
            className={numCls}
          />
          <span className="text-[#4a4a4a]">mm</span>
          <span className={`inline-block w-px h-3 ${shell.divider}`} />
          <span className="text-[#4a4a4a]">Spacing</span>
          <input
            type="number" min={LINE_HEIGHT_MIN} max={LINE_HEIGHT_MAX} step={LINE_HEIGHT_STEP}
            value={templateLayout.lineHeight}
            onChange={(e) => setTemplateLayout({ lineHeight: Number(e.target.value) })}
            className={`${numCls} w-11`}
          />
        </div>
      )}

      {/* Right — ATS + preview meta */}
      <div className="flex items-center gap-2.5">
        <span className={`${scoreColor} tabular-nums`}>ATS {atsScore}%</span>
        <span className="text-[#333333]">·</span>
        <span className="text-[#4a4a4a] tabular-nums">p.{pageCount}</span>
        <span className="text-[#333333]">·</span>
        <span className="text-[#4a4a4a] tabular-nums">{Math.round(scale * 100)}%</span>
      </div>
    </div>
  );
}
