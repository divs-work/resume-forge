"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Extension } from "@codemirror/state";
import type { EditorMode } from "@/types/resume";

interface Props {
  value: string;
  onChange: (v: string) => void;
  mode: EditorMode;
  focusLine: number | null;
  onFocusLineHandled: () => void;
}

const CARET: Record<string, string> = {
  markdown: "#3b82f6",
  html:     "#f97316",
  latex:    "#ef4444",
};

function langFor(mode: EditorMode): Extension {
  if (mode === "html")     return html();
  if (mode === "markdown") return markdown();
  return StreamLanguage.define(stex);
}

export default function CodeEditor({ value, onChange, mode, focusLine, onFocusLineHandled }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef      = useRef<EditorView | null>(null);
  const langComp     = useRef(new Compartment());
  const onChangeRef  = useRef(onChange);
  const modeRef      = useRef(mode);
  const skipNext     = useRef(false);

  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { modeRef.current = mode; },         [mode]);

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
              ".cm-content":          { padding: "14px 0" },
              "&.cm-focused":         { outline: "none" },
              ".cm-gutters":          { backgroundColor: "#0d1117", borderRight: "1px solid #30363d" },
              ".cm-activeLineGutter": { backgroundColor: "#161b22" },
              ".cm-cursor, .cm-dropCursor": { borderLeftColor: caretColor },
            },
            { dark: true }
          ),
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !skipNext.current) {
              onChangeRef.current(update.state.doc.toString());
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

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: langComp.current.reconfigure(langFor(mode)) });
  }, [mode]);

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

  useEffect(() => {
    const view = viewRef.current;
    if (!focusLine || !view) return;
    const lineNo = Math.min(focusLine, view.state.doc.lines);
    const line   = view.state.doc.line(lineNo);
    view.dispatch({
      selection: { anchor: line.from, head: line.from },
      effects:   EditorView.scrollIntoView(line.from, { y: "center" }),
    });
    view.focus();
    onFocusLineHandled();
  }, [focusLine, onFocusLineHandled]);

  return <div ref={containerRef} className="w-full h-full" />;
}
