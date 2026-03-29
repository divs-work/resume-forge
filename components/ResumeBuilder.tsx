"use client";

import { useState, useCallback } from "react";
import { shell } from "@/constants/theme";
import type { SelectedEl } from "@/types/resume";
import Toolbar from "./Toolbar";
import ATSPanel from "./ATSPanel";
import TemplatesPanel from "./TemplatesPanel";
import HelpPanel from "./HelpPanel";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";

export default function ResumeBuilder() {
  const [showAts, setShowATS]           = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHelp, setShowHelp]         = useState(false);
  const [exporting, setExporting]       = useState(false);
  const [focusLine, setFocusLine]       = useState<number | null>(null);
  const [selectedEl, setSelectedEl]     = useState<SelectedEl | null>(null);

  const closeAll = useCallback(() => {
    setShowATS(false);
    setShowTemplates(false);
    setShowHelp(false);
    setSelectedEl(null);
  }, []);

  const handleExport = () => {
    setExporting(true);
  };

  const handleToggleATS = () => {
    if (showAts) { closeAll(); return; }
    setSelectedEl(null);
    setShowTemplates(false);
    setShowHelp(false);
    setShowATS(true);
  };

  const handleToggleTemplates = () => {
    if (showTemplates) { closeAll(); return; }
    setSelectedEl(null);
    setShowATS(false);
    setShowHelp(false);
    setShowTemplates(true);
  };

  const handleToggleHelp = () => {
    if (showHelp) { closeAll(); return; }
    setSelectedEl(null);
    setShowATS(false);
    setShowTemplates(false);
    setShowHelp(true);
  };

  const handleOpenStylePanel = useCallback((el: SelectedEl) => {
    setShowATS(false);
    setShowTemplates(false);
    setShowHelp(false);
    setSelectedEl(el);
  }, []);

  return (
    <div
      className={`flex flex-col h-screen ${shell.bgSubtle} overflow-hidden font-sans`}
    >
      <Toolbar
        showAts={showAts}
        onToggleATS={handleToggleATS}
        showTemplates={showTemplates}
        onToggleTemplates={handleToggleTemplates}
        showHelp={showHelp}
        onToggleHelp={handleToggleHelp}
        exporting={exporting}
        onExport={handleExport}
        onCloseStylePanelAction={() => setSelectedEl(null)}
        onCloseAllAction={closeAll}
      />

      {showAts && <ATSPanel />}
      {showTemplates && <TemplatesPanel />}
      {showHelp && <HelpPanel />}

      <div className="flex flex-1 overflow-hidden min-h-0">
        <EditorPane focusLine={focusLine} onFocusLineHandledAction={() => setFocusLine(null)} onCloseStylePanelAction={closeAll} />
        <PreviewPane exporting={exporting} onExportDoneAction={setExporting} setFocusLineAction={setFocusLine} selectedEl={selectedEl} setSelectedElAction={handleOpenStylePanel} onCloseAllAction={closeAll} />
      </div>
    </div>
  );
}
