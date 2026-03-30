"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import {
  EditorState,
  Compartment,
  StateEffect,
  StateField,
} from "@codemirror/state";
import { Decoration } from "@codemirror/view";
import type { DecorationSet } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import type { EditorMode } from "@/types/resume";
import {
  EDITOR_COLORS,
  EDITOR_FONT_SIZE,
  EDITOR_LINE_HEIGHT,
  EDITOR_CONTENT_PADDING,
  LINE_HIGHLIGHT_MS,
} from "@/constants/config";

const highlightLineEffect = StateEffect.define<number | null>();
const highlightLineMark = Decoration.line({ class: "cm-goto-line" });

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
  onFocusLineHandledAction: () => void;
}

const CARET: Record<string, string> = {
  markdown: EDITOR_COLORS.caretMarkdown,
  html:     EDITOR_COLORS.caretHtml,
  latex:    EDITOR_COLORS.caretLatex,
};

function langFor(mode: EditorMode): Extension {
  if (mode === "html") return html();
  if (mode === "markdown") return markdown();
  return StreamLanguage.define(stex);
}

export default function CodeEditor({
  value,
  onChange,
  mode,
  focusLine,
  onFocusLineHandledAction,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const langCompRef = useRef(new Compartment());
  const onChangeRef = useRef(onChange);
  const modeRef = useRef(mode);
  const skipNextRef = useRef(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const caretColor = CARET[mode] ?? EDITOR_COLORS.caretFallback;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          langCompRef.current.of(langFor(mode)),
          highlightLineField,
          EditorView.domEventHandlers({
            mousedown(_, view) {
              view.dispatch({ effects: highlightLineEffect.of(null) });
            },
          }),
          EditorView.theme(
            {
              "&": { height: "100%" },
              ".cm-editor": { height: "100%" },
              ".cm-scroller": {
                overflow:   "auto",
                fontFamily: "var(--font-mono, ui-monospace, 'JetBrains Mono', monospace)",
                fontSize:   EDITOR_FONT_SIZE,
                lineHeight: EDITOR_LINE_HEIGHT,
                scrollbarWidth: "thin",
                scrollbarColor: "#BDBDBD #F5F5F5",
              },
              ".cm-scroller::-webkit-scrollbar": {
                width: "4px",
                height: "4px",
              },
              ".cm-scroller::-webkit-scrollbar-track": {
                background: "#F5F5F5",
              },
              ".cm-scroller::-webkit-scrollbar-thumb": {
                background: "#BDBDBD",
                borderRadius: "100px",
              },
              ".cm-scroller::-webkit-scrollbar-thumb:hover": {
                background: "#9E9E9E",
              },
              ".cm-scroller::-webkit-scrollbar-corner": {
                background: "#F5F5F5",
              },
              ".cm-content":          { padding: EDITOR_CONTENT_PADDING },
              "&.cm-focused":         { outline: "none" },
              ".cm-gutters":          { backgroundColor: EDITOR_COLORS.gutterBg, borderRight: EDITOR_COLORS.gutterBorder },
              ".cm-activeLineGutter": { backgroundColor: EDITOR_COLORS.activeLineGutter },
              ".cm-cursor, .cm-dropCursor": { borderLeftColor: caretColor },
              ".cm-goto-line": {
                backgroundColor: EDITOR_COLORS.gotoLineBg,
                borderLeft:      EDITOR_COLORS.gotoLineBorder,
                boxShadow:       EDITOR_COLORS.gotoLineShadow,
              },
            },
            { dark: false }
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
    return () => {
      view.destroy();
      viewRef.current = null;
    };
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
    const line = view.state.doc.line(lineNo);
    view.dispatch({
      selection: { anchor: line.from, head: line.from },
      effects: [
        EditorView.scrollIntoView(line.from, { y: "center" }),
        highlightLineEffect.of(lineNo),
      ],
    });
    view.focus();
    onFocusLineHandledAction();
    const timer = setTimeout(() => {
      viewRef.current?.dispatch({ effects: highlightLineEffect.of(null) });
    }, LINE_HIGHLIGHT_MS);
    return () => clearTimeout(timer);
  }, [focusLine, onFocusLineHandledAction]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
