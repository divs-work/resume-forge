"use client";

import { useEffect, useRef, useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { MODE_CONFIG } from "@/constant/config";
import { editor, modeBg } from "@/constant/theme";
import CodeEditor, { type CodeEditorHandle, type SelectionInfo } from "./CodeEditor";
import PropertyPanel from "./PropertyPanel";

export default function EditorPane() {
  const mode       = useResumeStore((s) => s.mode);
  const content    = useResumeStore((s) => s.content[s.mode]);
  const setContent = useResumeStore((s) => s.setContent);
  const focusLine  = useResumeStore((s) => s.focusLine);
  const setFocusLine = useResumeStore((s) => s.setFocusLine);

  const [selection, setSelection] = useState<SelectionInfo | null>(null);
  const codeRef = useRef<CodeEditorHandle>(null);
  const cfg       = MODE_CONFIG[mode];
  const lineCount = content.split("\n").length;
  const charCount = content.length;

  // Hide property panel when mode changes
  useEffect(() => { setSelection(null); }, [mode]);

  const handleFocusLineHandled = () => setFocusLine(null);

  const handlePropertyApply = (from: number, to: number, newClasses: string) => {
    codeRef.current?.applyEdit(from, to, newClasses);
  };

  return (
    <div className="flex flex-col min-w-0 flex-1">
      {/* Tab bar */}
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

      {/* Editor area */}
      <div className="flex-1 relative overflow-hidden">
        <CodeEditor
          ref={codeRef}
          value={content}
          onChange={setContent}
          mode={mode}
          focusLine={focusLine}
          onFocusLineHandled={handleFocusLineHandled}
          onSelectionChange={mode === "html" ? setSelection : () => setSelection(null)}
        />
      </div>

      {/* Property panel — shown on selection in HTML mode only */}
      {selection && (
        <PropertyPanel
          selection={selection}
          source={content}
          onApply={handlePropertyApply}
          onClose={() => setSelection(null)}
        />
      )}
    </div>
  );
}
