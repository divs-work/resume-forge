"use client";

import { useState } from "react";
import { shell } from "@/constants/theme";
import {
  GENERAL_HELP,
  MARKDOWN_HELP,
  LATEX_HELP,
  HTML_HELP,
  AI_PROMPTS,
} from "@/constants/help";
import type { HelpSection, AiPrompt } from "@/constants/help";

const TABS = [
  { id: "general",  label: "Guide"    },
  { id: "markdown", label: "Markdown" },
  { id: "latex",    label: "LaTeX"    },
  { id: "html",     label: "HTML"     },
  { id: "ai",       label: "AI"       },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SECTION_MAP: Record<Exclude<TabId, "general" | "ai">, HelpSection> = {
  markdown: MARKDOWN_HELP,
  latex:    LATEX_HELP,
  html:     HTML_HELP,
};

export default function HelpPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <div className="flex flex-col">
      {/* Tab bar — wraps to next line on narrow widths */}
      <div
        className={`flex flex-wrap gap-1 px-2 pt-2 pb-1.5 border-b ${shell.border} ${shell.bgSubtle}`}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-all duration-150 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]"
                : `${shell.textMuted} border-[#E0E0E0] hover:text-[#616161] hover:bg-black/[0.04]`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "general" ? (
        <GeneralContent />
      ) : activeTab === "ai" ? (
        <AiPromptsContent />
      ) : (
        <SectionContent section={SECTION_MAP[activeTab as Exclude<TabId, "general" | "ai">]} />
      )}
    </div>
  );
}

function GeneralContent() {
  return (
    <div className="px-4 py-4">
      {GENERAL_HELP.split("\n\n").map((block, i) => {
        const lines = block.split("\n");
        const heading = lines[0].match(/^[A-Z][A-Z\s]+$/);
        if (heading) {
          return (
            <div key={i} className="mb-3 mt-4 first:mt-0">
              <h3 className={`text-[10px] font-bold uppercase tracking-widest ${shell.textMuted} mb-1.5`}>
                {lines[0]}
              </h3>
              {lines.slice(1).map((l, j) => (
                <p key={j} className={`text-[11.5px] ${shell.text} leading-relaxed`}>
                  {l.replace(/^  /, "")}
                </p>
              ))}
            </div>
          );
        }
        return (
          <p key={i} className={`text-[11.5px] ${shell.text} leading-relaxed mb-2`}>
            {block}
          </p>
        );
      })}
    </div>
  );
}

function AiPromptsContent() {
  const [copiedId, setCopiedId]     = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = async (prompt: AiPrompt) => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="px-4 py-4">
      <p className={`text-[11px] ${shell.textMuted} leading-relaxed mb-4`}>
        Copy a prompt, fill in the{" "}
        <code className={`text-[10px] font-mono ${shell.bgMuted} px-1 py-0.5 rounded`}>
          [bracketed fields]
        </code>{" "}
        and paste into any AI assistant.
      </p>

      <div className="space-y-2">
        {AI_PROMPTS.map((prompt) => (
          <div key={prompt.id} className={`border ${shell.border} rounded-lg overflow-hidden`}>
            <div className={`flex items-center justify-between gap-2 px-3 py-2 ${shell.bgSubtle}`}>
              <div className="flex items-center gap-2 min-w-0">
                <span className={`shrink-0 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${shell.bgMuted} ${shell.textFaint}`}>
                  {prompt.mode}
                </span>
                <button
                  onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                  className={`text-[11px] font-semibold ${shell.text} hover:underline truncate text-left`}
                >
                  {prompt.title}
                </button>
              </div>
              <button
                onClick={() => handleCopy(prompt)}
                className={`shrink-0 px-2 py-0.5 text-[9.5px] font-medium rounded transition-colors ${
                  copiedId === prompt.id
                    ? "bg-emerald-950/40 text-emerald-400"
                    : `${shell.bgMuted} ${shell.textMuted} hover:text-[#c8c8c8]`
                }`}
              >
                {copiedId === prompt.id ? "✓" : "Copy"}
              </button>
            </div>

            <div className={`px-3 py-1.5 border-t ${shell.border}`}>
              <p className={`text-[10.5px] ${shell.textMuted} leading-relaxed`}>{prompt.description}</p>
            </div>

            {expandedId === prompt.id && (
              <div className={`border-t ${shell.border} ${shell.bgMuted} max-h-40 overflow-y-auto`}>
                <pre className={`px-3 py-2 text-[9.5px] ${shell.text} whitespace-pre-wrap break-all font-mono leading-relaxed`}>
                  {prompt.prompt}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionContent({ section }: { section: HelpSection }) {
  const [openGroup, setOpenGroup] = useState<string | null>(section.groups[0]?.heading ?? null);

  return (
    <div>
      {/* Group selector — wraps */}
      <div className={`flex flex-wrap gap-1 px-3 py-2 border-b ${shell.border}`}>
        {section.groups.map((g) => (
          <button
            key={g.heading}
            onClick={() => setOpenGroup(g.heading)}
            className={`px-3 py-1 rounded-full border text-[10px] font-medium transition-all duration-150 whitespace-nowrap ${
              openGroup === g.heading
                ? "bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]"
                : `${shell.textFaint} border-[#E0E0E0] hover:bg-black/[0.04] hover:text-[#616161]`
            }`}
          >
            {g.heading}
          </button>
        ))}
      </div>

      {/* Items as cards */}
      <div className="px-3 py-3 space-y-2">
        {section.groups
          .filter((g) => g.heading === openGroup)
          .flatMap((g) => g.items)
          .map((item, i) => (
            <div key={i} className={`rounded-lg border ${shell.border} ${shell.bgSubtle} px-3 py-2.5`}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className={`text-[11px] font-semibold ${shell.text}`}>{item.label}</span>
                <code className={`text-[9.5px] font-mono ${shell.bgMuted} px-1.5 py-0.5 rounded shrink-0 ${shell.textMuted} max-w-[120px] truncate`}>
                  {item.syntax}
                </code>
              </div>
              <p className={`text-[10.5px] ${shell.textMuted} leading-relaxed`}>{item.result}</p>
              {item.note && (
                <p className={`mt-1 text-[9.5px] ${shell.textFaint} italic`}>{item.note}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
