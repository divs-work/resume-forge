"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment, StateEffect, StateField } from "@codemirror/state";
import { Decoration } from "@codemirror/view";
import type { DecorationSet, Extension } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { oneDark } from "@codemirror/theme-one-dark";
import type { EditorMode } from "@/types/resume";

const highlightLineEffect = StateEffect.define<number | null>();
const highlightLineMark   = Decoration.line({ class: "cm-goto-line" });

const highlightLineField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(deco, tr) {
    deco = deco.map(tr.changes);
    for (const e of tr.effects) {
      if (e.is(highlightLineEffect)) {
        if (e.value === null) return Decoration.none;
        const line = tr.state.doc.line(e.value);
        return Decoration.set([highlightLineMark.range(line.from)]);
      }
    }
    return deco;
  },
  provide: (f) => EditorView.decorations.from(f),
});

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
  const langCompRef     = useRef(new Compartment());
  const onChangeRef  = useRef(onChange);
  const modeRef      = useRef(mode);
  const skipNextRef     = useRef(false);

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
          langCompRef.current.of(langFor(mode)),
          oneDark,
          highlightLineField,
          EditorView.domEventHandlers({
            mousedown(_, view) {
              view.dispatch({ effects: highlightLineEffect.of(null) });
            },
          }),
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
              ".cm-goto-line": {
                backgroundColor: "#1c3a5e",
                borderLeft:      "3px solid #3b82f6",
                boxShadow:       "inset 0 0 0 1px #2563eb22",
              },
            },
            { dark: true }
          ),
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !skipNextRef.current) {
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
    view.dispatch({ effects: langCompRef.current.reconfigure(langFor(mode)) });
  }, [mode]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const doc = view.state.doc.toString();
    if (doc !== value) {
      skipNextRef.current = true;
      view.dispatch({ changes: { from: 0, to: doc.length, insert: value } });
      skipNextRef.current = false;
    }
  }, [value]);

  useEffect(() => {
    const view = viewRef.current;
    if (!focusLine || !view) return;
    const lineNo = Math.min(focusLine, view.state.doc.lines);
    const line   = view.state.doc.line(lineNo);
    view.dispatch({
      selection: { anchor: line.from, head: line.from },
      effects: [
        EditorView.scrollIntoView(line.from, { y: "center" }),
        highlightLineEffect.of(lineNo),
      ],
    });
    view.focus();
    onFocusLineHandled();
    const timer = setTimeout(() => {
      viewRef.current?.dispatch({ effects: highlightLineEffect.of(null) });
    }, 2000);
    return () => clearTimeout(timer);
  }, [focusLine, onFocusLineHandled]);

  return <div ref={containerRef} className="w-full h-full" />;
}
