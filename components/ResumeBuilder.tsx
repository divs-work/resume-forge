"use client";

import { useState, useCallback } from "react";
import { shell } from "@/constants/theme";
import { useResumeStore } from "@/store/resumeStore";
import type { SelectedEl } from "@/types/resume";
import Toolbar from "./Toolbar";
import ActivityBar, { type SidePanel } from "./ActivityBar";
import ATSPanel from "./ATSPanel";
import TemplatesPanel from "./TemplatesPanel";
import HelpPanel from "./HelpPanel";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";
import StatusBar from "./StatusBar";

const SIDE_PANEL_TITLES: Record<SidePanel, string> = {
  templates: "Templates",
  ats:       "ATS Score",
  help:      "Reference",
};

export default function ResumeBuilder() {
  const [sidePanel,   setSidePanel]   = useState<SidePanel | null>(null);
  const [exporting,   setExporting]   = useState(false);
  const [focusLine,   setFocusLine]   = useState<number | null>(null);
  const [selectedEl,  setSelectedEl]  = useState<SelectedEl | null>(null);
  const [pageCount,   setPageCount]   = useState(1);
  const [scale,       setScale]       = useState(0.7);

  const resetTemplate = useResumeStore((s) => s.resetTemplate);

  const closeAll = useCallback(() => {
    setSidePanel(null);
    setSelectedEl(null);
  }, []);

  const handleToggleSidePanel = useCallback((panel: SidePanel) => {
    setSelectedEl(null);
    setSidePanel((cur) => cur === panel ? null : panel);
  }, []);

  const handleOpenStylePanel = useCallback((el: SelectedEl) => {
    setSidePanel(null);
    setSelectedEl(el);
  }, []);

  return (
    <div className={`flex flex-col h-screen ${shell.bg} overflow-hidden font-sans`}>
      <Toolbar
        exporting={exporting}
        onExport={() => setExporting(true)}
        onCloseAllAction={closeAll}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Activity bar */}
        <ActivityBar
          active={sidePanel}
          onToggle={handleToggleSidePanel}
          onReset={() => { closeAll(); resetTemplate(); }}
        />

        {/* Side panel */}
        {sidePanel && (
          <div
            className={`w-[280px] shrink-0 flex flex-col border-r ${shell.border} ${shell.bgSubtle} overflow-hidden`}
          >
            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${shell.border} shrink-0`}>
              <span className={`text-[11px] font-semibold ${shell.textSecondary} tracking-wide`}>
                {SIDE_PANEL_TITLES[sidePanel]}
              </span>
              <button
                onClick={() => setSidePanel(null)}
                className={`w-5 h-5 flex items-center justify-center rounded ${shell.bgMuted} text-[#4a4a4a] hover:bg-[#2a2a2a] hover:text-[#a0a0a0] transition-colors`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="9" height="9">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sidePanel === "templates" && <TemplatesPanel />}
              {sidePanel === "ats"       && <ATSPanel />}
              {sidePanel === "help"      && <HelpPanel />}
            </div>
          </div>
        )}

        {/* Editor */}
        <EditorPane
          focusLine={focusLine}
          onFocusLineHandledAction={() => setFocusLine(null)}
          onCloseStylePanelAction={closeAll}
        />

        {/* Preview + style panel */}
        <PreviewPane
          exporting={exporting}
          onExportDoneAction={setExporting}
          setFocusLineAction={setFocusLine}
          selectedEl={selectedEl}
          setSelectedElAction={handleOpenStylePanel}
          onCloseAllAction={closeAll}
          onScaleChange={setScale}
          onPageCountChange={setPageCount}
        />
      </div>

      <StatusBar pageCount={pageCount} scale={scale} />
    </div>
  );
}
