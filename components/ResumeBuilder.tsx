"use client";

import { useState, useCallback } from "react";
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
  ats: "ATS Score",
  help: "Reference",
};

export default function ResumeBuilder() {
  const [sidePanel, setSidePanel] = useState<SidePanel | null>(null);
  const [exporting, setExporting] = useState(false);
  const [focusLine, setFocusLine] = useState<number | null>(null);
  const [selectedEl, setSelectedEl] = useState<SelectedEl | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [scale, setScale] = useState(0.7);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  const resetTemplate = useResumeStore((s) => s.resetTemplate);

  const closeAll = useCallback(() => {
    setSidePanel(null);
    setSelectedEl(null);
  }, []);

  const handleToggleSidePanel = useCallback((panel: SidePanel) => {
    setSelectedEl(null);
    setSidePanel((cur) => (cur === panel ? null : panel));
  }, []);

  const handleOpenStylePanel = useCallback((el: SelectedEl) => {
    setSidePanel(null);
    setSelectedEl(el);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden font-sans">
      <Toolbar
        exporting={exporting}
        onExport={() => setExporting(true)}
        onCloseAllAction={closeAll}
        mobileView={mobileView}
        onSetMobileView={setMobileView}
        sidePanel={sidePanel}
        onToggleSidePanel={handleToggleSidePanel}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Activity bar — desktop only */}
        <ActivityBar
          active={sidePanel}
          onToggle={handleToggleSidePanel}
          onReset={() => {
            closeAll();
            resetTemplate();
          }}
        />

        {/* Mobile backdrop */}
        {sidePanel && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm animate-fade-in"
            onClick={() => setSidePanel(null)}
          />
        )}

        {/* Side panel */}
        {sidePanel && (
          <div
            className="
            fixed lg:relative
            top-[88px] sm:top-12 lg:top-auto bottom-0 lg:bottom-auto
            left-0 lg:left-auto
            w-full sm:w-[288px] z-50 lg:z-auto
            flex flex-col
            border-r border-[#E0E0E0]
            bg-white
            shadow-[2px_0_8px_rgba(0,0,0,0.06)] lg:shadow-none
            overflow-hidden
            animate-slide-in-left
          "
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0E0E0] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1976D2]" />
                <span className="text-[11px] font-semibold text-[#636c76] tracking-wide">
                  {SIDE_PANEL_TITLES[sidePanel]}
                </span>
              </div>
              <button
                onClick={() => setSidePanel(null)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-black/4 text-[#9E9E9E] hover:bg-black/8 hover:text-[#616161] transition-all duration-150"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="10"
                  height="10"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">
              {sidePanel === "templates" && <TemplatesPanel />}
              {sidePanel === "ats" && <ATSPanel />}
              {sidePanel === "help" && <HelpPanel />}
            </div>
          </div>
        )}

        {/* Editor */}
        <div
          className={`${
            mobileView === "editor" ? "flex" : "hidden lg:flex"
          } flex-col flex-1 min-w-0`}
        >
          <EditorPane
            focusLine={focusLine}
            onFocusLineHandledAction={() => setFocusLine(null)}
            onCloseStylePanelAction={closeAll}
          />
        </div>

        {/* Preview */}
        <div
          className={`${
            mobileView === "preview" ? "flex" : "hidden lg:flex"
          } flex-1 min-w-0`}
        >
          <PreviewPane
            exporting={exporting}
            onExportDoneAction={setExporting}
            setFocusLineAction={setFocusLine}
            selectedEl={selectedEl}
            setSelectedElAction={handleOpenStylePanel}
            onCloseAllAction={closeAll}
            onScaleChangeAction={setScale}
            onPageCountChangeAction={setPageCount}
          />
        </div>
      </div>

      {/* Status bar — desktop only */}
      <div className="hidden lg:block">
        <StatusBar pageCount={pageCount} scale={scale} />
      </div>
    </div>
  );
}
