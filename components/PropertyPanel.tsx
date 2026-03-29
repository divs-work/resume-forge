"use client";

import { useEffect, useRef, useState } from "react";
import { shell } from "@/constant/theme";
import type { SelectionInfo } from "./CodeEditor";

// ─── Class parsing ────────────────────────────────────────────────────────────

interface ClassInfo {
  start: number; // position of first char in the class value (after opening ")
  end: number;   // position of closing "
  classes: string[];
}

function findClassAttr(source: string, pos: number): ClassInfo | null {
  const lastOpen  = source.lastIndexOf("<", pos);
  const lastClose = source.lastIndexOf(">", pos);

  let tagStart: number | undefined;
  if (lastOpen > lastClose) {
    tagStart = lastOpen;
  } else {
    // cursor is in text content — walk back past closing tags to the nearest opening tag
    let s = lastClose - 1;
    while (s >= 0) {
      const o = source.lastIndexOf("<", s);
      if (o < 0) break;
      if (source[o + 1] !== "/") { tagStart = o; break; }
      s = o - 1;
    }
  }
  if (tagStart == null) return null;

  const tagEnd = source.indexOf(">", tagStart);
  if (tagEnd < 0) return null;

  const tag = source.slice(tagStart, tagEnd + 1);
  const m = tag.match(/class="([^"]*)"/);
  if (!m || m.index == null) return null;

  const start = tagStart + m.index + 7; // 7 = `class="`
  const end   = start + m[1].length;
  return { start, end, classes: m[1].split(/\s+/).filter(Boolean) };
}

// ─── Class value helpers ──────────────────────────────────────────────────────

const TW_SIZES: Record<string, number> = {
  "text-xs": 12, "text-sm": 14, "text-base": 16, "text-lg": 18,
  "text-xl": 20, "text-2xl": 24, "text-3xl": 30, "text-4xl": 36,
  "text-5xl": 48, "text-6xl": 60,
};
const WEIGHTS = [
  "font-thin","font-light","font-normal","font-medium",
  "font-semibold","font-bold","font-extrabold","font-black",
];

function getSize(cls: string[]): number {
  for (const c of cls) {
    const arb = c.match(/^text-\[(\d+(?:\.\d+)?)px\]$/);
    if (arb) return Math.round(parseFloat(arb[1]));
    if (TW_SIZES[c]) return TW_SIZES[c];
  }
  return 16;
}

function getColor(cls: string[]): string {
  for (const c of cls) {
    const m = c.match(/^text-\[(#[0-9a-fA-F]{3,8})\]$/);
    if (m) return m[1];
  }
  return "";
}

function getWeight(cls: string[]): string {
  return cls.find((c) => WEIGHTS.includes(c)) ?? "";
}

function setSize(cls: string[], px: number): string[] {
  const filtered = cls.filter(
    (c) => !TW_SIZES[c] && !c.match(/^text-\[\d+(?:\.\d+)?px\]$/)
  );
  return [...filtered, `text-[${px}px]`];
}

function setColor(cls: string[], hex: string): string[] {
  const filtered = cls.filter((c) => !c.match(/^text-\[#.+\]$/));
  return hex ? [...filtered, `text-[${hex}]`] : filtered;
}

function setWeight(cls: string[], w: string): string[] {
  const filtered = cls.filter((c) => !WEIGHTS.includes(c));
  return w ? [...filtered, w] : filtered;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  selection: SelectionInfo;
  source: string;
  onApply: (from: number, to: number, newClassStr: string) => void;
  onClose: () => void;
}

const WEIGHT_LABELS = [
  { label: "Normal",   value: "font-normal"   },
  { label: "Medium",   value: "font-medium"   },
  { label: "Semibold", value: "font-semibold" },
  { label: "Bold",     value: "font-bold"     },
];

export default function PropertyPanel({ selection, source, onApply, onClose }: Props) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const classInfo = findClassAttr(source, selection.from);

  const [size,   setS] = useState(() => classInfo ? getSize(classInfo.classes)   : 16);
  const [color,  setC] = useState(() => classInfo ? getColor(classInfo.classes)  : "");
  const [weight, setW] = useState(() => classInfo ? getWeight(classInfo.classes) : "");

  // Re-derive state whenever the cursor moves to a different class attr
  useEffect(() => {
    const info = findClassAttr(source, selection.from);
    if (!info) return;
    setS(getSize(info.classes));
    setC(getColor(info.classes));
    setW(getWeight(info.classes));
  }, [selection.from, source]);

  // Close on outside click
  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) onClose();
    };
    window.addEventListener("mousedown", down);
    return () => window.removeEventListener("mousedown", down);
  }, [onClose]);

  if (!classInfo) return null;

  const apply = (patcher: (c: string[]) => string[]) => {
    const next = patcher(classInfo.classes);
    onApply(classInfo.start, classInfo.end, next.join(" "));
  };

  const { coords } = selection;
  const PANEL_W = 236;
  const left = coords
    ? Math.min(coords.left, window.innerWidth - PANEL_W - 12)
    : 120;
  const top = coords
    ? Math.max(8, coords.top - 192)
    : 120;

  return (
    <div
      ref={panelRef}
      style={{ position: "fixed", left, top, width: PANEL_W, zIndex: 9999 }}
      className={`flex flex-col gap-2.5 p-3 rounded-xl shadow-2xl border ${shell.bg} ${shell.border}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
          Properties
        </span>
        <button
          onClick={onClose}
          className={`text-[14px] leading-none ${shell.textFaint} hover:text-gray-500`}
        >
          ×
        </button>
      </div>

      {/* Font size */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
            Size
          </span>
          <span className={`text-[9px] font-mono ${shell.textSecondary}`}>{size}px</span>
        </div>
        <input
          type="range"
          min={8}
          max={72}
          value={size}
          onChange={(e) => {
            const v = Number(e.target.value);
            setS(v);
            apply((c) => setSize(c, v));
          }}
          className="w-full h-[3px] accent-gray-800 cursor-pointer"
        />
      </div>

      {/* Text color */}
      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
          Color
        </span>
        <div className="flex items-center gap-1.5">
          <input
            type="color"
            value={color || "#111827"}
            onChange={(e) => {
              setC(e.target.value);
              apply((c) => setColor(c, e.target.value));
            }}
            className="w-7 h-5 rounded cursor-pointer border border-gray-200 p-0"
          />
          {color && (
            <button
              onClick={() => { setC(""); apply((c) => setColor(c, "")); }}
              className={`text-[10px] leading-none ${shell.textFaint} hover:text-gray-600`}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Font weight */}
      <div className="flex flex-col gap-1">
        <span className={`text-[9px] font-mono uppercase tracking-wider ${shell.textFaint}`}>
          Weight
        </span>
        <div className="flex gap-1">
          {WEIGHT_LABELS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                const next = weight === value ? "" : value;
                setW(next);
                apply((c) => setWeight(c, next));
              }}
              className={`flex-1 py-0.5 rounded text-[9px] border transition-colors ${
                weight === value
                  ? "bg-gray-900 text-white border-transparent"
                  : `${shell.border} ${shell.textFaint} hover:bg-gray-100`
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
