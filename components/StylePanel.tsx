"use client";

import { useRef, useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { replaceTextInSource, applyStyleToSource } from "@/helper/sourcePatcher";
import { shell } from "@/constants/theme";
import {
  TEXT_DEBOUNCE_MS,
  STYLE_DEBOUNCE_MS,
  STYLE_PANEL_FONT_SIZE_MIN,
  STYLE_PANEL_FONT_SIZE_MAX,
  STYLE_PANEL_TEXT_FRAGMENT,
} from "@/constants/config";
import type { SelectedEl } from "@/types/resume";

interface Props {
  selected: SelectedEl;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onClose: () => void;
  setFocusLineAction: (line: number | null) => void;
}

function rgbToHex(rgb: string): string {
  const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!m) return "#000000";
  return "#" + [m[1], m[2], m[3]].map((n) => parseInt(n).toString(16).padStart(2, "0")).join("");
}

export default function StylePanel({ selected, iframeRef, onClose, setFocusLineAction }: Props) {
  const [text, setText]         = useState(selected.text);
  const [fontSize, setFontSize] = useState(selected.computedFontSize.replace(/[^0-9.]/g, ""));
  const [color, setColor]       = useState(rgbToHex(selected.computedColor));

  const prevTextRef    = useRef(selected.text);
  const pendingTextRef = useRef(selected.text);
  const textDebounceRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const styleDebounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  function sendToIframe(msg: object) {
    iframeRef.current?.contentWindow?.postMessage(msg, "*");
  }

  function handleTextChange(val: string) {
    setText(val);
    pendingTextRef.current = val;
    sendToIframe({ type: "rf-text", elIdx: selected.elIdx, text: val });

    clearTimeout(textDebounceRef.current ?? undefined);
    textDebounceRef.current = setTimeout(() => {
      const store = useResumeStore.getState();
      const patched = replaceTextInSource(store.content[store.mode], prevTextRef.current, pendingTextRef.current, store.mode);
      store.setContent(patched);
      prevTextRef.current = pendingTextRef.current;
    }, TEXT_DEBOUNCE_MS);
  }

  function handleFontSizeChange(val: string) {
    setFontSize(val);
    if (!val) return;
    sendToIframe({ type: "rf-style", elIdx: selected.elIdx, styles: { fontSize: `${val}px` } });

    clearTimeout(styleDebounceRef.current ?? undefined);
    styleDebounceRef.current = setTimeout(() => {
      const store = useResumeStore.getState();
      const patched = applyStyleToSource(store.content[store.mode], store.mode, prevTextRef.current, { fontSize: `${val}px` });
      store.setContent(patched);
    }, STYLE_DEBOUNCE_MS);
  }

  function handleColorChange(val: string) {
    setColor(val);
    sendToIframe({ type: "rf-style", elIdx: selected.elIdx, styles: { color: val } });

    clearTimeout(styleDebounceRef.current ?? undefined);
    styleDebounceRef.current = setTimeout(() => {
      const store = useResumeStore.getState();
      const patched = applyStyleToSource(store.content[store.mode], store.mode, prevTextRef.current, { color: val });
      store.setContent(patched);
    }, STYLE_DEBOUNCE_MS);
  }

  function handleGoToCode() {
    const store = useResumeStore.getState();
    const lines = store.content[store.mode].split("\n");
    const searchText = prevTextRef.current;
    let lineNum = lines.findIndex((l) => l.includes(searchText));
    if (lineNum < 0) {
      const fragment = searchText.slice(0, STYLE_PANEL_TEXT_FRAGMENT).trim();
      if (fragment) lineNum = lines.findIndex((l) => l.includes(fragment));
    }
    if (lineNum >= 0) setFocusLineAction(lineNum + 1);
    onClose();
  }

  const inputClass = `w-full text-[12px] px-2 py-1.5 border ${shell.border} rounded bg-white ${shell.text} outline-none focus:border-blue-400`;

  return (
    <div className={`w-[220px] shrink-0 flex flex-col border-l ${shell.border} ${shell.bgSubtle} overflow-y-auto`}>
      <div className={`flex items-center justify-between px-3 py-2 border-b ${shell.border} shrink-0`}>
        <span className={`text-[11px] font-semibold ${shell.textMuted}`}>Style</span>
        <button onClick={onClose} className={`text-[13px] ${shell.textFaint} hover:text-gray-600 leading-none`}>✕</button>
      </div>

      <div className="flex flex-col gap-3 px-3 py-3">
        <div>
          <label className={`block text-[10px] ${shell.textFaint} mb-1`}>Text</label>
          <input type="text" value={text} onChange={(e) => handleTextChange(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={`block text-[10px] ${shell.textFaint} mb-1`}>Size (px)</label>
          <input type="number" value={fontSize} min={STYLE_PANEL_FONT_SIZE_MIN} max={STYLE_PANEL_FONT_SIZE_MAX} onChange={(e) => handleFontSizeChange(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={`block text-[10px] ${shell.textFaint} mb-1`}>Color</label>
          <input type="color" value={color} onChange={(e) => handleColorChange(e.target.value)} className="w-full h-8 rounded border border-gray-200 cursor-pointer" />
        </div>

        <button onClick={handleGoToCode} className="mt-1 text-[11px] text-blue-500 hover:text-blue-600 text-left">
          ↗ Go to code
        </button>
      </div>
    </div>
  );
}
