"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useResumeStore } from "@/store/resume-store";
import { MODE_CONFIG } from "@/constant/config";
import { buildResumeDocument } from "@/lib/document-builder";
import { shell, canvas } from "@/constant/theme";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function PreviewPane({
  exporting,
  setExportingAction,
}: {
  exporting: boolean;
  setExportingAction: (n: boolean) => void;
}) {
  const mode = useResumeStore((s) => s.mode);
  const content = useResumeStore((s) => s.content[s.mode]);
  const parsed = useResumeStore((s) => s.parsed[s.mode]);
  const parsedChanged = useResumeStore((s) => s.parsedChanged);
  const contentChanged = useResumeStore((s) => s.contentChanged);

  const cfg = MODE_CONFIG[mode];
  const outerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(0.7);
  const [pageCount, setPageCount] = useState(1);

  const docHTML = useMemo(
    () => buildResumeDocument(content, mode),
    [content, mode],
  );

  const updateScale = useCallback(() => {
    if (!outerRef.current) return;
    setScale((outerRef.current.clientWidth - 48) / A4_WIDTH);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  useEffect(() => {
    const poll = setInterval(() => {
      try {
        const body = iframeRef.current?.contentDocument?.body;
        if (body) {
          const h = body.scrollHeight;
          if (h > 100)
            setPageCount(Math.ceil(Math.max(A4_HEIGHT, h) / A4_HEIGHT));
        }
      } catch {}
    }, 300);
    return () => clearInterval(poll);
  }, [docHTML]);

  useEffect(() => {
    if (exporting) {
      iframeRef.current?.contentWindow?.print();
      setExportingAction(false);
    }
  }, [exporting, setExportingAction]);

  const totalPaperH = pageCount * A4_HEIGHT;

  const breakLines = useMemo(() => {
    const lines: number[] = [];
    for (let i = 1; i < pageCount; i++) lines.push(i * A4_HEIGHT);
    return lines;
  }, [pageCount]);

  const renderHTML = useMemo(() => {
    if (parsedChanged > contentChanged) return parsed;
    return docHTML;
  }, [docHTML, parsed, parsedChanged, contentChanged]);

  return (
    <div className="flex flex-col min-w-0 flex-1">
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-1.5 ${shell.bgSubtle} border-b ${shell.border} shrink-0`}
      >
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={shell.iconStroke}
            strokeWidth="1.5"
            width="13"
            height="13"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className={`text-[11px] font-semibold ${shell.textMuted}`}>
            Preview
          </span>
          <span className={`text-[10px] ${shell.textFaint}`}>
            — {cfg.label}
          </span>
        </div>
        <span className={`text-[10px] ${shell.textFaint}`}>
          {pageCount} page{pageCount !== 1 ? "s" : ""} &bull; A4 &bull;{" "}
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Canvas */}
      <div
        ref={outerRef}
        className={`flex-1 overflow-auto ${canvas.bg}`}
        style={
          {
            "--scale": scale,
            "--total-h": `${totalPaperH}px`,
          } as React.CSSProperties
        }
      >
        <div className="py-6 flex justify-center">
          <div className="relative shrink-0 w-[calc(794px*var(--scale))] h-[calc(var(--total-h)*var(--scale))]">
            <div
              className={`absolute inset-0 ${canvas.paperBg} rounded-sm ${canvas.paperShadow}`}
            />

            <iframe
              ref={iframeRef}
              srcDoc={renderHTML}
              className="w-198.5 h-(--total-h) border-0 bg-transparent overflow-hidden transform-[scale(var(--scale))] origin-top-left absolute top-0 left-0"
              sandbox="allow-scripts allow-same-origin allow-modals"
              title="Resume Preview"
              tabIndex={-1}
            />

            {breakLines.map((y, i) => (
              <div
                key={i}
                style={{ "--y": `${y}px` } as React.CSSProperties}
                className="absolute left-0 right-0 h-0 z-10 top-[calc(var(--y)*var(--scale))]"
              >
                <div
                  className={`w-full h-[calc(8px*var(--scale))] ${canvas.bg} -translate-y-1/2 relative`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-0.75 ${canvas.breakShadowTop}`}
                  />
                  <div
                    className={`absolute bottom-0 inset-x-0 h-0.75 ${canvas.breakShadowBottom}`}
                  />
                </div>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 right-[calc(-36px*var(--scale))] text-[calc(9px*var(--scale))] ${canvas.pageLabel} whitespace-nowrap`}
                >
                  p.{i + 2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
