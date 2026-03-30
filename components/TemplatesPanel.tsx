"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { TEMPLATE_STYLES } from "@/constants/templates";
import { buildResumeDocument } from "@/helper/documentBuilder";
import { A4_WIDTH_PX, DEFAULT_TEMPLATE_LAYOUT } from "@/constants/config";
import { shell, modeBg } from "@/constants/theme";

const CARD_W   = 244;
const SCALE    = CARD_W / A4_WIDTH_PX;
const PREVIEW_H = 560;
const CARD_H   = Math.round(PREVIEW_H * SCALE);

export default function TemplatesPanel() {
  const mode            = useResumeStore((s) => s.mode);
  const setContent      = useResumeStore((s) => s.setContent);
  const setMarkdownTheme = useResumeStore((s) => s.setMarkdownTheme);
  const setLatexTheme   = useResumeStore((s) => s.setLatexTheme);
  const setTemplateLayout = useResumeStore((s) => s.setTemplateLayout);

  const templates = TEMPLATE_STYLES[mode];

  const handleSelectTemplate = (tpl: (typeof templates)[number]) => {
    setContent(tpl.content);
    if (mode !== "html") {
      if (mode === "latex") setLatexTheme(tpl.theme!);
      else setMarkdownTheme(tpl.theme!);
      setTemplateLayout({ ...DEFAULT_TEMPLATE_LAYOUT });
    }
  };

  const previewDocs = useMemo(
    () => templates.map((tpl) => buildResumeDocument(tpl.content, mode, tpl.theme)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  return (
    <div className="p-3 flex flex-col gap-2.5">
      {templates.map((tpl, i) => (
        <button
          key={tpl.id}
          onClick={() => handleSelectTemplate(tpl)}
          className={`group w-full rounded-2xl border ${shell.border} overflow-hidden text-left cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.05)] hover:border-[#BDBDBD] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 focus:outline-none`}
          style={{ background: "#FAFAFA" }}
        >
          {/* Preview */}
          <div
            className="relative overflow-hidden bg-white border-b border-[#e5e5e5]"
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors flex items-center justify-center">
              <span
                className={`opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-[#0f0f0f] px-3 py-1 rounded-full ${modeBg[mode]} shadow-sm`}
              >
                Use this
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="px-3 py-2.5">
            <p className={`text-[11px] font-semibold ${shell.text} truncate`}>{tpl.name}</p>
            <p className={`text-[10px] ${shell.textFaint} truncate mt-0.5`}>{tpl.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
