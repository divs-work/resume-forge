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

  const inputCls = `w-full text-[12px] px-2.5 py-2 border ${shell.border} rounded-lg ${shell.bgMuted} ${shell.text} outline-none focus:border-[#404040] transition-colors`;

  return (
    <div className={`w-[228px] shrink-0 flex flex-col border-l ${shell.border} ${shell.bg} overflow-y-auto`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${shell.border} shrink-0`}>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13" className={shell.textFaint}>
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-[11px] font-semibold ${shell.textSecondary} tracking-wide`}>Inspector</span>
        </div>
        <button
          onClick={onClose}
          className={`w-5 h-5 flex items-center justify-center rounded ${shell.bgMuted} ${shell.textFaint} hover:bg-[#2a2a2a] hover:${shell.textMuted} transition-colors`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-4 px-4 py-4">

        {/* Text */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-[10px] font-semibold uppercase tracking-widest ${shell.textFaint}`}>Text</label>
          <textarea
            value={text}
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
              handleTextChange(e.target.value);
            }}
            ref={(el) => {
              if (el) {
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }
            }}
            className={`${inputCls} resize-none overflow-hidden leading-relaxed`}
            rows={1}
          />
        </div>

        {/* Font size */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-[10px] font-semibold uppercase tracking-widest ${shell.textFaint}`}>Font Size</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={fontSize}
              min={STYLE_PANEL_FONT_SIZE_MIN}
              max={STYLE_PANEL_FONT_SIZE_MAX}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className={`${inputCls} w-20`}
            />
            <span className={`text-[11px] ${shell.textFaint}`}>px</span>
          </div>
        </div>

        {/* Color */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-[10px] font-semibold uppercase tracking-widest ${shell.textFaint}`}>Color</label>
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 shrink-0 rounded-lg overflow-hidden border border-[#353535]">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer opacity-0"
              />
              <div className="w-full h-full rounded-lg" style={{ backgroundColor: color }} />
            </div>
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className={`${inputCls} flex-1 font-mono text-[11px] uppercase`}
              maxLength={7}
            />
          </div>
        </div>

        {/* Go to code */}
        <button
          onClick={handleGoToCode}
          className={`flex items-center gap-1.5 text-[11px] ${shell.textFaint} hover:text-[#a0a0a0] transition-colors mt-1`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Go to code
        </button>
      </div>
    </div>
  );
}
