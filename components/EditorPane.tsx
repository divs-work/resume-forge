"use client";

import { useResumeStore } from "@/store/resume-store";
import { MODE_CONFIG } from "@/constant/config";
import { editor, modeBg, modeCaret } from "@/constant/theme";
import { useState } from "react";
import { View } from "@/types/resume";

export default function EditorPane() {
  const mode = useResumeStore((s) => s.mode);
  const content = useResumeStore((s) => s.content[s.mode]);
  const parsed = useResumeStore((s) => s.parsed[s.mode]);
  const setParsed = useResumeStore((s) => s.setParsed);
  const setContent = useResumeStore((s) => s.setContent);

  const [view, setView] = useState<View>("editor");

  const cfg = MODE_CONFIG[mode];

  const lineCount = content.split("\n").length;
  const charCount = content.length;

  const getTabComponent = (tabView: View) => {
    const isActive = view === tabView;
    return (
      <div
        onClick={() => setView(tabView)}
        className={`
          flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-200 border-r ${editor.border}
          ${isActive ? `${editor.activeBg} text-white border-b-2` : `${editor.mutedText} hover:bg-white/5`}
        `}
      >
        {isActive && <div className={`w-2 h-2 rounded-full ${modeBg[mode]}`} />}
        <span className="text-[11px] font-semibold font-mono">
          resume.{tabView === "parsed" ? "parsed" : cfg.fileExt}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-w-0 flex-1">
      {/* File header */}
      <div className={`shrink-0 ${editor.barBg} border-b ${editor.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getTabComponent("editor")}
            {getTabComponent("parsed")}
          </div>
          <span className={`text-[10px] ${editor.mutedText}`}>
            {lineCount}L &bull; {charCount}C
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={view === "parsed" ? parsed : content}
          onChange={
            view === "parsed"
              ? (e) => setParsed(e.target.value)
              : (e) => setContent(e.target.value)
          }
          spellCheck={false}
          className={`w-full h-full resize-none border-none outline-none px-4 py-3.5 font-mono leading-[1.7] [tab-size:2] overflow-auto no-scrollbar ${editor.activeBg} ${editor.text} ${modeCaret[mode]}`}
        />
      </div>
    </div>
  );
}
