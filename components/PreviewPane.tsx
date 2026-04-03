"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useResumeStore } from "@/store/resumeStore";
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  PREVIEW_INITIAL_SCALE,
  PREVIEW_CONTAINER_PADDING,
  PREVIEW_MIN_BODY_HEIGHT,
} from "@/constants/config";
import { buildResumeDocument } from "@/helper/documentBuilder";
import { canvas } from "@/constants/theme";
import type { SelectedEl } from "@/types/resume";
import StylePanel from "./StylePanel";

export default function PreviewPane({
  exporting,
  onExportDoneAction,
  setFocusLineAction,
  selectedEl,
  setSelectedElAction,
  onCloseAllAction,
  onScaleChangeAction,
  onPageCountChangeAction,
}: {
  exporting: boolean;
  onExportDoneAction: (n: boolean) => void;
  setFocusLineAction: (line: number | null) => void;
  selectedEl: SelectedEl | null;
  setSelectedElAction: (el: SelectedEl) => void;
  onCloseAllAction: () => void;
  onScaleChangeAction: (s: number) => void;
  onPageCountChangeAction: (n: number) => void;
}) {
  const [scale, setScale] = useState(PREVIEW_INITIAL_SCALE);
  const [pageCount, setPageCount] = useState(1);
  const [blobUrl, setBlobUrlAction] = useState<string | null>(null);

  const outerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ↓ Store latest actions in a ref to prevent listener teardowns
  const actionsRef = useRef({
    setSelectedElAction,
    onCloseAllAction,
    onPageCountChangeAction,
  });

  // Keep ref updated without triggering re-renders
  useEffect(() => {
    actionsRef.current = {
      setSelectedElAction,
      onCloseAllAction,
      onPageCountChangeAction,
    };
  }, [setSelectedElAction, onCloseAllAction, onPageCountChangeAction]);

  const mode = useResumeStore((s) => s.mode);
  const content = useResumeStore((s) => s.content[s.mode]);
  const markdownTheme = useResumeStore((s) => s.markdownTheme);
  const latexTheme = useResumeStore((s) => s.latexTheme);
  const templateLayout = useResumeStore((s) => s.templateLayout);
  const fontId = useResumeStore((s) => s.fontId);
  const resetKey = useResumeStore((s) => s.resetKey);

  const docHTML = useMemo(() => {
    if (mode === "markdown")
      return buildResumeDocument(
        content,
        mode,
        markdownTheme,
        fontId,
        templateLayout
      );
    if (mode === "latex")
      return buildResumeDocument(
        content,
        mode,
        latexTheme,
        fontId,
        templateLayout
      );
    return buildResumeDocument(content, mode, undefined, fontId);
  }, [content, mode, markdownTheme, latexTheme, fontId, templateLayout]);

  useEffect(() => {
    const blob = new Blob([docHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setBlobUrlAction(url);
    return () => URL.revokeObjectURL(url);
  }, [docHTML, resetKey]);

  const updateScale = useCallback(() => {
    if (!outerRef.current) return;
    const s =
      (outerRef.current.clientWidth - PREVIEW_CONTAINER_PADDING) / A4_WIDTH_PX;
    setScale(s);
    onScaleChangeAction(s);
  }, [onScaleChangeAction]);

  useEffect(() => {
    if (!outerRef.current) return;
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  useEffect(() => {
    if (exporting) {
      iframeRef.current?.contentWindow?.print();
      onExportDoneAction(false);
    }
  }, [exporting, onExportDoneAction]);

  // ↓ Bulletproof event listener (empty dependency array)
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.data) return;

      // Always pull the freshest functions from the ref
      const { setSelectedElAction, onCloseAllAction, onPageCountChangeAction } =
        actionsRef.current;

      if (e.data.type === "rf-click") {
        setSelectedElAction({
          elIdx: e.data.elIdx,
          text: e.data.text,
          computedColor: e.data.computed.color,
          computedFontSize: e.data.computed.fontSize,
        });
      }
      if (e.data.type === "rf-close") onCloseAllAction();
      if (e.data.type === "rf-height") {
        const h = e.data.height as number;
        if (h > PREVIEW_MIN_BODY_HEIGHT) {
          const n = Math.ceil(Math.max(A4_HEIGHT_PX, h) / A4_HEIGHT_PX);
          setPageCount(n);
          onPageCountChangeAction(n);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []); // ← Important: Empty dependency array

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
        style={
          {
            "--scale": scale,
            "--total-h": `${totalPaperH}px`,
          } as React.CSSProperties
        }
      >
        <div className="py-8 flex justify-center">
          <div className="relative shrink-0 overflow-hidden w-[calc(794px*var(--scale))] h-[calc(var(--total-h)*var(--scale))]">
            <div
              className={`absolute inset-0 ${canvas.paperBg} rounded-sm ${canvas.paperShadow}`}
            />

            <iframe
              key={resetKey}
              ref={iframeRef}
              src={blobUrl ?? "about:blank"}
              /* ↓ Replaced w-198.5 and h-(--total-h) with bulletproof arbitrary values */
              className="w-[794px] h-[var(--total-h)] border-0 bg-transparent overflow-hidden transform-[scale(var(--scale))] origin-top-left absolute top-0 left-0"
              sandbox="allow-scripts allow-modals allow-popups allow-same-origin"
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
