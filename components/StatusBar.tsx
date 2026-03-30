"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { checkAts } from "@/helper/ats";
import { shell, modeBg, atsCategory } from "@/constants/theme";
import { MODE_CONFIG } from "@/constants/config";

interface Props {
  pageCount: number;
  scale: number;
}

export default function StatusBar({ pageCount, scale }: Props) {
  const mode    = useResumeStore((s) => s.mode);
  const content = useResumeStore((s) => s.content[s.mode]);

  const lineCount = content.split("\n").length;
  const charCount = content.length;
  const atsScore  = useMemo(() => checkAts(content).score, [content]);
  const cfg       = MODE_CONFIG[mode];

  const scoreColor =
    atsScore >= 80 ? atsCategory.labelPass :
    atsScore >= 50 ? atsCategory.labelPartial :
    atsCategory.labelFail;

  return (
    <div className={`flex items-center justify-between px-4 h-7 shrink-0 ${shell.bg} border-t ${shell.border} font-mono text-[10px] select-none`}>

      {/* Left — file info */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${modeBg[mode]}`} />
          <span className={shell.textMuted}>resume.{cfg.fileExt}</span>
        </div>
        <span className={shell.textFaint}>·</span>
        <span className={`${shell.textMuted} tabular-nums`}>{lineCount}L</span>
        <span className={shell.textFaint}>·</span>
        <span className={`${shell.textMuted} tabular-nums`}>{charCount.toLocaleString()}C</span>
      </div>

      {/* Right — ATS + preview meta */}
      <div className="flex items-center gap-2.5">
        <span className={`${scoreColor} tabular-nums font-medium`}>ATS {atsScore}%</span>
        <span className={shell.textFaint}>·</span>
        <span className={`${shell.textMuted} tabular-nums`}>p.{pageCount}</span>
        <span className={shell.textFaint}>·</span>
        <span className={`${shell.textMuted} tabular-nums`}>{Math.round(scale * 100)}%</span>
      </div>
    </div>
  );
}
