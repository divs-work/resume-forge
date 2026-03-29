"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { TEMPLATE_STYLES } from "@/constants/templates";
import { buildResumeDocument } from "@/helper/documentBuilder";
import { MODE_CONFIG, A4_WIDTH_PX, DEFAULT_TEMPLATE_LAYOUT } from "@/constants/config";
import { shell, modeBg } from "@/constants/theme";

const PREVIEW_H = 560;
const CARD_W = 168;
const SCALE = CARD_W / A4_WIDTH_PX;
const CARD_H = Math.round(PREVIEW_H * SCALE);

export default function TemplatesPanel() {
  const mode = useResumeStore((s) => s.mode);
  const setContent = useResumeStore((s) => s.setContent);
  const setMarkdownTheme = useResumeStore((s) => s.setMarkdownTheme);
  const setLatexTheme = useResumeStore((s) => s.setLatexTheme);
  const setTemplateLayout = useResumeStore((s) => s.setTemplateLayout);

  const templates = TEMPLATE_STYLES[mode];

  const handleSelectTemplate = (tpl: (typeof templates)[number]) => {
    setContent(tpl.content);
    if (mode !== "html") {
      if (mode === "latex") {
        setLatexTheme(tpl.theme!);
      } else {
        setMarkdownTheme(tpl.theme!);
      }
      setTemplateLayout({ ...DEFAULT_TEMPLATE_LAYOUT });
    }
  };

  const previewDocs = useMemo(
    () =>
      templates.map((tpl) => buildResumeDocument(tpl.content, mode, tpl.theme)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  return (
    <div
      className={`border-b shrink-0 ${shell.bg} ${shell.border} overflow-hidden`}
    >
      <div className="flex items-stretch gap-0 h-full">
        <div
          className={`flex flex-col justify-center gap-1.5 px-5 py-4 border-r ${shell.border} shrink-0 min-w-[120px]`}
        >
          <div
            className={`text-[9px] font-bold uppercase tracking-[0.18em] ${shell.textFaint}`}
          >
            Templates
          </div>
          <div
            className={`text-[13px] font-semibold ${shell.text} leading-tight`}
          >
            {MODE_CONFIG[mode].label}
          </div>
          <div className={`text-[10px] ${shell.textMuted} leading-snug`}>
            {templates.length} starter{templates.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto">
          {templates.map((tpl, i) => (
            <button
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`group flex-shrink-0 rounded-xl border ${shell.border} overflow-hidden bg-white text-left cursor-pointer hover:border-gray-400 hover:shadow-md transition-all focus:outline-none`}
              style={{ width: CARD_W }}
            >
              <div
                className="relative overflow-hidden bg-white border-b border-gray-100"
                style={{ width: CARD_W, height: CARD_H }}
              >
                <iframe
                  srcDoc={previewDocs[i]}
                  scrolling="no"
                  className="absolute top-0 left-0 pointer-events-none border-none"
                  style={{
                    width: A4_WIDTH_PX,
                    height: PREVIEW_H,
                    transform: `scale(${SCALE})`,
                    transformOrigin: "top left",
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <span
                    className={`opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-white px-2.5 py-1 rounded-full ${modeBg[mode]} shadow-sm`}
                  >
                    Use this
                  </span>
                </div>
              </div>

              <div className="px-2.5 py-2">
                <p
                  className={`text-[11px] font-semibold ${shell.text} truncate`}
                >
                  {tpl.name}
                </p>
                <p
                  className={`text-[9.5px] ${shell.textMuted} truncate mt-0.5`}
                >
                  {tpl.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
