"use client";

import { useEffect, useRef, useState } from "react";
import { shell } from "@/constant/theme";

export interface ClickInfo {
  elIdx: string;
  tag: string;
  text: string;
  pageX: number;
  pageY: number;
  computed: {
    color: string;
    fontSize: string;
  };
}

interface Props {
  info: ClickInfo;
  onStyleChange: (elIdx: string, styles: Record<string, string>) => void;
  onStyleCommit: (elIdx: string, styles: Record<string, string>) => void;
  onTextChange: (elIdx: string, oldText: string, newText: string) => void;
  onGoToCode: (text: string) => void;
  onClose: () => void;
}

function rgbToHex(rgb: string): string {
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return "#000000";
  return (
    "#" +
    m
      .slice(0, 3)
      .map((n) => parseInt(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

function parsePx(val: string): number {
  return Math.round(parseFloat(val)) || 14;
}

export default function FloatingStyleBar({ info, onStyleChange, onStyleCommit, onTextChange, onGoToCode, onClose }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(() => parsePx(info.computed.fontSize));
  const [color, setColor] = useState(() => rgbToHex(info.computed.color));
  const [textValue, setTextValue] = useState(info.text);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Reset state when a different element is clicked
  useEffect(() => {
    setFontSize(parsePx(info.computed.fontSize));
    setColor(rgbToHex(info.computed.color));
    setTextValue(info.text);
  }, [info.elIdx, info.computed.fontSize, info.computed.color, info.text]);

  const handleFontSize = (v: number) => {
    setFontSize(v);
    onStyleChange(info.elIdx, { fontSize: `${v}px` });
  };

  const handleColor = (v: string) => {
    setColor(v);
    onStyleChange(info.elIdx, { color: v });
  };

  const commitText = () => {
    if (textValue.trim() !== info.text.trim()) {
      onTextChange(info.elIdx, info.text, textValue);
    }
  };

  // Position: below-right of click, clamped to viewport
  const BAR_W = 240;
  const x = Math.min(
    info.pageX + 12,
    (typeof window !== "undefined" ? window.innerWidth : 1200) - BAR_W - 16
  );
  const y = info.pageY + 14;

  return (
    <div
      ref={barRef}
      style={{ position: "fixed", left: x, top: y, width: BAR_W, zIndex: 9999 }}
      className={`flex flex-col gap-2.5 p-3 rounded-xl shadow-2xl border ${shell.bg} ${shell.border}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[10px] ${shell.textFaint}`}>
          &lt;{info.tag}&gt;
        </span>
        <button
          onClick={onClose}
          className={`text-[14px] leading-none ${shell.textFaint} hover:text-gray-500`}
        >
          ×
        </button>
      </div>

      {/* Text edit */}
      <div className="flex flex-col gap-1">
        <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
          Text
        </span>
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onBlur={commitText}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              commitText();
            }
          }}
          rows={2}
          className={`w-full resize-none rounded-md border px-2 py-1.5 text-[11px] font-sans leading-snug outline-none ${shell.border} ${shell.text} ${shell.bgMuted} focus:border-blue-400`}
        />
      </div>

      {/* Font size */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
            Size
          </span>
          <span className={`text-[9px] font-mono ${shell.textSecondary}`}>{fontSize}px</span>
        </div>
        <input
          type="range"
          min={8}
          max={72}
          value={fontSize}
          onChange={(e) => handleFontSize(Number(e.target.value))}
          onMouseUp={(e) => onStyleCommit(info.elIdx, { fontSize: `${(e.target as HTMLInputElement).value}px` })}
          className="w-full h-[3px] accent-gray-800 cursor-pointer"
        />
      </div>

      {/* Color */}
      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
          Color
        </span>
        <input
          type="color"
          value={color}
          onChange={(e) => handleColor(e.target.value)}
          onBlur={(e) => onStyleCommit(info.elIdx, { color: e.target.value })}
          className="w-7 h-5 rounded cursor-pointer border border-gray-200 p-0"
        />
      </div>

      {/* Divider */}
      <div className={`h-px ${shell.divider}`} />

      {/* Go to code */}
      <button
        onClick={() => onGoToCode(info.text)}
        className={`flex items-center gap-1.5 text-[10px] font-medium ${shell.textMuted} hover:text-blue-500 transition-colors text-left`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        go to code
      </button>
    </div>
  );
}
