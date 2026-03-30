"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useResumeStore } from "@/store/resumeStore";
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  PREVIEW_INITIAL_SCALE,
  PREVIEW_CONTAINER_PADDING,
  PREVIEW_MIN_BODY_HEIGHT,
  PREVIEW_POLL_MS,
} from "@/constants/config";
import { buildResumeDocument } from "@/helper/documentBuilder";
import { canvas } from "@/constants/theme";
import StylePanel from "./StylePanel";
import type { SelectedEl } from "@/types/resume";

export default function PreviewPane({
  exporting,
  onExportDoneAction,
  setFocusLineAction,
  selectedEl,
  setSelectedElAction,
  onCloseAllAction,
  onScaleChange,
  onPageCountChange,
}: {
  exporting: boolean;
  onExportDoneAction: (n: boolean) => void;
  setFocusLineAction: (line: number | null) => void;
  selectedEl: SelectedEl | null;
  setSelectedElAction: (el: SelectedEl) => void;
  onCloseAllAction: () => void;
  onScaleChange: (s: number) => void;
  onPageCountChange: (n: number) => void;
}) {
  const [scale,     setScale]     = useState(PREVIEW_INITIAL_SCALE);
  const [pageCount, setPageCount] = useState(1);

  const outerRef  = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const mode           = useResumeStore((s) => s.mode);
  const content        = useResumeStore((s) => s.content[s.mode]);
  const markdownTheme  = useResumeStore((s) => s.markdownTheme);
  const latexTheme     = useResumeStore((s) => s.latexTheme);
  const templateLayout = useResumeStore((s) => s.templateLayout);
  const fontId         = useResumeStore((s) => s.fontId);
  const resetKey       = useResumeStore((s) => s.resetKey);

  const docHTML = useMemo(() => {
    if (mode === "markdown") return buildResumeDocument(content, mode, markdownTheme, fontId, templateLayout);
    if (mode === "latex")    return buildResumeDocument(content, mode, latexTheme, fontId, templateLayout);
    return buildResumeDocument(content, mode, undefined, fontId);
  }, [content, mode, markdownTheme, latexTheme, fontId, templateLayout]);

  const updateScale = useCallback(() => {
    if (!outerRef.current) return;
    const s = (outerRef.current.clientWidth - PREVIEW_CONTAINER_PADDING) / A4_WIDTH_PX;
    setScale(s);
    onScaleChange(s);
  }, [onScaleChange]);

  useEffect(() => {
    if (!outerRef.current) return;
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  useEffect(() => {
    const poll = setInterval(() => {
      try {
        const body = iframeRef.current?.contentDocument?.body;
        if (body) {
          const h = body.scrollHeight;
          if (h > PREVIEW_MIN_BODY_HEIGHT) {
            const n = Math.ceil(Math.max(A4_HEIGHT_PX, h) / A4_HEIGHT_PX);
            setPageCount(n);
            onPageCountChange(n);
          }
        }
      } catch {}
    }, PREVIEW_POLL_MS);
    return () => clearInterval(poll);
  }, [docHTML, onPageCountChange]);

  useEffect(() => {
    if (exporting) {
      iframeRef.current?.contentWindow?.print();
      onExportDoneAction(false);
    }
  }, [exporting, onExportDoneAction]);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.data) return;
      if (e.data.type === "rf-click") {
        setSelectedElAction({
          elIdx: e.data.elIdx,
          text: e.data.text,
          computedColor: e.data.computed.color,
          computedFontSize: e.data.computed.fontSize,
        });
      }
      if (e.data.type === "rf-close") {
        onCloseAllAction();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onCloseAllAction, setSelectedElAction]);

  function handleClosePanel() {
    iframeRef.current?.contentWindow?.postMessage({ type: "rf-deselect" }, "*");
    onCloseAllAction();
  }

  const totalPaperH = pageCount * A4_HEIGHT_PX;

  const breakLines = useMemo(() => {
    const lines: number[] = [];
    for (let i = 1; i < pageCount; i++) lines.push(i * A4_HEIGHT_PX);
    return lines;
  }, [pageCount]);

  return (
    <div className="flex min-w-0 flex-1">
      <div
        ref={outerRef}
        onClick={handleClosePanel}
        className={`flex-1 overflow-auto ${canvas.bg} min-w-0`}
        style={{ "--scale": scale, "--total-h": `${totalPaperH}px` } as React.CSSProperties}
      >
        <div className="py-8 flex justify-center">
          <div className="relative shrink-0 overflow-hidden w-[calc(794px*var(--scale))] h-[calc(var(--total-h)*var(--scale))]">
            <div className={`absolute inset-0 ${canvas.paperBg} rounded-sm ${canvas.paperShadow}`} />

            <iframe
              key={resetKey}
              ref={iframeRef}
              srcDoc={docHTML}
              className="w-198.5 h-(--total-h) border-0 bg-transparent overflow-hidden transform-[scale(var(--scale))] origin-top-left absolute top-0 left-0"
              sandbox="allow-scripts allow-same-origin allow-modals allow-popups"
              title="Resume Preview"
              tabIndex={-1}
            />

            {breakLines.map((y, i) => (
              <div
                key={i}
                style={{ "--y": `${y}px` } as React.CSSProperties}
                className="absolute left-0 right-0 h-0 z-10 top-[calc(var(--y)*var(--scale))]"
              >
                <div className={`w-full h-[calc(8px*var(--scale))] ${canvas.bg} -translate-y-1/2 relative`}>
                  <div className={`absolute top-0 inset-x-0 h-0.75 ${canvas.breakShadowTop}`} />
                  <div className={`absolute bottom-0 inset-x-0 h-0.75 ${canvas.breakShadowBottom}`} />
                </div>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 right-[calc(-36px*var(--scale))] text-[calc(9px*var(--scale))] ${canvas.pageLabel} whitespace-nowrap font-mono`}
                >
                  p.{i + 2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEl && (
        <StylePanel
          key={selectedEl.elIdx}
          selected={selectedEl}
          iframeRef={iframeRef}
          onClose={handleClosePanel}
          setFocusLineAction={setFocusLineAction}
        />
      )}
    </div>
  );
}
