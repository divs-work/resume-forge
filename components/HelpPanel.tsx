"use client";

import { useState } from "react";
import { shell } from "@/constants/theme";
import { GENERAL_HELP, MARKDOWN_HELP, LATEX_HELP, HTML_HELP, AI_PROMPTS } from "@/constants/help";
import type { HelpSection, AiPrompt } from "@/constants/help";

const TABS = [
  { id: "general",  label: "Getting Started" },
  { id: "markdown", label: "Markdown" },
  { id: "latex",    label: "LaTeX" },
  { id: "html",     label: "HTML + Tailwind" },
  { id: "ai",       label: "AI Prompts" },
] as const;

type TabId = typeof TABS[number]["id"];

const SECTION_MAP: Record<Exclude<TabId, "general" | "ai">, HelpSection> = {
  markdown: MARKDOWN_HELP,
  latex:    LATEX_HELP,
  html:     HTML_HELP,
};

export default function HelpPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <div className={`border-b ${shell.border} ${shell.bg} overflow-hidden`} style={{ maxHeight: "42vh" }}>
      {/* Tab bar */}
      <div className={`flex items-center gap-0.5 px-3 pt-2 border-b ${shell.border} ${shell.bgSubtle}`}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-t transition-colors ${
              activeTab === tab.id
                ? `${shell.text} bg-white border border-b-0 ${shell.border}`
                : `${shell.textMuted} hover:${shell.text}`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: "calc(42vh - 36px)" }}>
        {activeTab === "general" ? (
          <div className="px-6 py-4">
            {GENERAL_HELP.split("\n\n").map((block, i) => {
              const lines = block.split("\n");
              const heading = lines[0].match(/^[A-Z][A-Z\s]+$/);
              if (heading) {
                return (
                  <div key={i} className="mb-3 mt-4 first:mt-0">
                    <h3 className={`text-[11px] font-bold uppercase tracking-widest ${shell.textMuted} mb-2`}>{lines[0]}</h3>
                    {lines.slice(1).map((l, j) => (
                      <p key={j} className={`text-[12px] ${shell.text} leading-relaxed`}>{l.replace(/^  /, "")}</p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={i} className={`text-[12px] ${shell.text} leading-relaxed mb-2`}>{block}</p>
              );
            })}
          </div>
        ) : activeTab === "ai" ? (
          <AiPromptsContent />
        ) : (
          <SectionContent section={SECTION_MAP[activeTab as Exclude<TabId, "general" | "ai">]} />
        )}
      </div>
    </div>
  );
}

function AiPromptsContent() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = async (prompt: AiPrompt) => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-4">
        <h3 className={`text-[11px] font-bold uppercase tracking-widest ${shell.textMuted} mb-1`}>
          AI-Powered Resume Generation
        </h3>
        <p className={`text-[12px] ${shell.text} leading-relaxed`}>
          Copy any prompt below, edit the <code className={`text-[11px] font-mono ${shell.bgMuted} px-1 py-0.5 rounded`}>[bracketed fields]</code> with your own details, and paste it into any AI assistant (ChatGPT, Claude, Gemini, etc.) to generate a ready-to-use resume. Then paste the AI output straight into ResumeForge&apos;s editor.
        </p>
      </div>

      <div className="space-y-3">
        {AI_PROMPTS.map((prompt) => (
          <div key={prompt.id} className={`border ${shell.border} rounded-lg overflow-hidden`}>
            {/* Header row */}
            <div className={`flex items-center justify-between px-3 py-2 ${shell.bgSubtle}`}>
              <div className="flex items-center gap-2 min-w-0">
                <span className={`shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${shell.bgMuted} ${shell.textMuted}`}>
                  {prompt.mode}
                </span>
                <button
                  onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                  className={`text-[12px] font-semibold ${shell.text} hover:underline truncate text-left`}
                >
                  {prompt.title}
                </button>
              </div>
              <button
                onClick={() => handleCopy(prompt)}
                className={`shrink-0 ml-2 px-2.5 py-1 text-[10px] font-medium rounded transition-colors ${
                  copiedId === prompt.id
                    ? "bg-green-100 text-green-700"
                    : `${shell.bgMuted} ${shell.textMuted} hover:${shell.text}`
                }`}
              >
                {copiedId === prompt.id ? "Copied!" : "Copy Prompt"}
              </button>
            </div>

            {/* Description */}
            <div className={`px-3 py-1.5 border-t ${shell.border}`}>
              <p className={`text-[11px] ${shell.textMuted} leading-relaxed`}>{prompt.description}</p>
            </div>

            {/* Expandable prompt preview */}
            {expandedId === prompt.id && (
              <div className={`px-3 py-2 border-t ${shell.border} ${shell.bgMuted}`}>
                <pre className={`text-[10px] ${shell.text} whitespace-pre-wrap break-words font-mono leading-relaxed max-h-[200px] overflow-y-auto`}>
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
    <div className="flex gap-0 h-full">
      {/* Sidebar: group list */}
      <div className={`w-44 shrink-0 border-r ${shell.border} ${shell.bgSubtle} py-2`}>
        <p className={`px-3 pb-2 text-[10px] ${shell.textFaint} leading-relaxed`}>{section.intro.split("\n")[0]}</p>
        {section.groups.map((g) => (
          <button
            key={g.heading}
            onClick={() => setOpenGroup(g.heading)}
            className={`w-full text-left px-3 py-1.5 text-[11px] transition-colors ${
              openGroup === g.heading
                ? `font-semibold ${shell.text} bg-white/60`
                : `${shell.textMuted} hover:${shell.text}`
            }`}
          >
            {g.heading}
          </button>
        ))}
      </div>

      {/* Main: items table */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {section.groups
          .filter((g) => g.heading === openGroup)
          .map((g) => (
            <div key={g.heading}>
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className={`border-b ${shell.border}`}>
                    <th className={`text-left pb-1.5 pr-4 text-[10px] uppercase tracking-wider font-semibold ${shell.textFaint} w-1/4`}>Command</th>
                    <th className={`text-left pb-1.5 pr-4 text-[10px] uppercase tracking-wider font-semibold ${shell.textFaint} w-1/3`}>Syntax</th>
                    <th className={`text-left pb-1.5 text-[10px] uppercase tracking-wider font-semibold ${shell.textFaint}`}>What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {g.items.map((item, i) => (
                    <tr key={i} className={`border-b ${shell.border} last:border-0`}>
                      <td className={`py-2 pr-4 font-medium ${shell.text} align-top`}>{item.label}</td>
                      <td className="py-2 pr-4 align-top">
                        <code className={`text-[11px] font-mono ${shell.bgMuted} px-1.5 py-0.5 rounded whitespace-pre-wrap break-all ${shell.textMuted}`}>
                          {item.syntax}
                        </code>
                        {item.note && (
                          <p className={`mt-1 text-[10px] ${shell.textFaint} italic`}>{item.note}</p>
                        )}
                      </td>
                      <td className={`py-2 ${shell.textMuted} align-top leading-relaxed`}>{item.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
