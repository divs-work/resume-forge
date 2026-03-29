"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Extension } from "@codemirror/state";
import type { EditorMode } from "@/types/resume";

export interface SelectionInfo {
  from: number;
  to: number;
  coords: { left: number; top: number; bottom: number } | null;
}

export interface CodeEditorHandle {
  applyEdit: (from: number, to: number, text: string) => void;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  mode: EditorMode;
  focusLine: number | null;
  onFocusLineHandled: () => void;
  onSelectionChange: (sel: SelectionInfo | null) => void;
}

const CARET: Record<string, string> = {
  markdown: "#3b82f6",
  html:     "#f97316",
  latex:    "#ef4444",
};

function langFor(mode: EditorMode): Extension {
  if (mode === "html")     return html();
  if (mode === "markdown") return markdown();
  return [];
}

const CodeEditor = forwardRef<CodeEditorHandle, Props>(function CodeEditor(
  { value, onChange, mode, focusLine, onFocusLineHandled, onSelectionChange },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef      = useRef<EditorView | null>(null);
  const langComp     = useRef(new Compartment());
  // Refs so the stable closure inside the view can always read latest callbacks/mode
  const onChangeRef          = useRef(onChange);
  const onSelectionChangeRef = useRef(onSelectionChange);
  const modeRef              = useRef(mode);
  useEffect(() => { onChangeRef.current = onChange; },                   [onChange]);
  useEffect(() => { onSelectionChangeRef.current = onSelectionChange; }, [onSelectionChange]);
  useEffect(() => { modeRef.current = mode; },                           [mode]);

  // Prevent echo: when we push a change from outside, don't fire onChange
  const skipNext = useRef(false);

  useImperativeHandle(ref, () => ({
    applyEdit(from, to, text) {
      const view = viewRef.current;
      if (!view) return;
      skipNext.current = true;
      view.dispatch({ changes: { from, to, insert: text } });
      skipNext.current = false;
      onChangeRef.current(view.state.doc.toString());
    },
  }));

  // ── Create editor once on mount ──────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const caretColor = CARET[mode] ?? "#fff";

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          langComp.current.of(langFor(mode)),
          oneDark,
          EditorView.theme(
            {
              "&":              { height: "100%" },
              ".cm-editor":     { height: "100%" },
              ".cm-scroller":   {
                overflow:   "auto",
                fontFamily: "var(--font-mono, ui-monospace, 'JetBrains Mono', monospace)",
                fontSize:   "13px",
                lineHeight: "1.7",
              },
              ".cm-content":         { padding: "14px 0" },
              "&.cm-focused":        { outline: "none" },
              ".cm-gutters":         { backgroundColor: "#0d1117", borderRight: "1px solid #30363d" },
              ".cm-activeLineGutter":{ backgroundColor: "#161b22" },
              ".cm-cursor, .cm-dropCursor": { borderLeftColor: caretColor },
            },
            { dark: true }
          ),
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !skipNext.current) {
              onChangeRef.current(update.state.doc.toString());
            }
            if (update.selectionSet || update.docChanged) {
              const sel = update.state.selection.main;
              if (!sel.empty) {
                const coords = view.coordsAtPos(sel.from);
                onSelectionChangeRef.current({
                  from: sel.from,
                  to:   sel.to,
                  coords: coords
                    ? { left: coords.left, top: coords.top, bottom: coords.bottom }
                    : null,
                });
              } else {
                onSelectionChangeRef.current(null);
              }
            }
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => { view.destroy(); viewRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Swap language when mode changes ──────────────────────────────────────
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: langComp.current.reconfigure(langFor(mode)) });
  }, [mode]);

  // ── Sync value when changed externally (reset, template switch…) ─────────
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const doc = view.state.doc.toString();
    if (doc !== value) {
      skipNext.current = true;
      view.dispatch({ changes: { from: 0, to: doc.length, insert: value } });
      skipNext.current = false;
    }
  }, [value]);

  // ── Scroll + select when "→ code" fires a focusLine ──────────────────────
  useEffect(() => {
    const view = viewRef.current;
    if (!focusLine || !view) return;
    const lineNo = Math.min(focusLine, view.state.doc.lines);
    const line   = view.state.doc.line(lineNo);
    view.dispatch({
      selection: { anchor: line.from, head: line.from }, // cursor only, no selection
      effects:   EditorView.scrollIntoView(line.from, { y: "center" }),
    });
    view.focus();
    onFocusLineHandled();
  }, [focusLine, onFocusLineHandled]);

  return <div ref={containerRef} className="w-full h-full" />;
});

export default CodeEditor;
