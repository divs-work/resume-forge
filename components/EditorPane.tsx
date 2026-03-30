"use client";

import { useResumeStore } from "@/store/resumeStore";
import { editor } from "@/constants/theme";
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

  return (
    <div
      onClick={onCloseStylePanelAction}
      className={`flex flex-col min-w-0 flex-1 border-r ${editor.border}`}
    >
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
