"use client";

import { useResumeStore } from "@/store/resumeStore";
import { MODE_CONFIG } from "@/constants/config";
import { editor, modeBg } from "@/constants/theme";
import CodeEditor from "./CodeEditor";

export default function EditorPane({
  focusLine,
  onFocusLineHandledAction,
  onCloseStylePanelAction,
}: {
  focusLine: number | null;
  onFocusLineHandledAction: () => void;
  onCloseStylePanelAction: () => void;
}) {
  const mode       = useResumeStore((s) => s.mode);
  const content    = useResumeStore((s) => s.content[s.mode]);
  const setContent = useResumeStore((s) => s.setContent);

  const cfg       = MODE_CONFIG[mode];
  const lineCount = content.split("\n").length;
  const charCount = content.length;

  return (
    <div onClick={onCloseStylePanelAction} className="flex flex-col min-w-0 flex-1">
      <div className={`shrink-0 ${editor.barBg} border-b ${editor.border}`}>
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 px-4 py-2 border-r ${editor.border} ${editor.activeBg} border-b-2`}
            style={{ borderBottomColor: "transparent" }}
          >
            <div className={`w-2 h-2 rounded-full ${modeBg[mode]}`} />
            <span className="text-[11px] font-semibold font-mono text-white">
              resume.{cfg.fileExt}
            </span>
          </div>
          <span className={`text-[10px] ${editor.mutedText} pr-3`}>
            {lineCount}L &bull; {charCount}C
          </span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <CodeEditor
          value={content}
          onChange={setContent}
          mode={mode}
          focusLine={focusLine}
          onFocusLineHandledAction={onFocusLineHandledAction}
        />
      </div>
    </div>
  );
}
