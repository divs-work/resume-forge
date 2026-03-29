"use client";

import { useState } from "react";
import { shell } from "@/constant/theme";
import type { SelectedEl } from "@/types/resume";
import Toolbar from "./Toolbar";
import ATSPanel from "./ATSPanel";
import TemplatesPanel from "./TemplatesPanel";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";

export default function ResumeBuilder() {
  const [showATS, setShowATS]       = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [exporting, setExporting]   = useState(false);
  const [focusLine, setFocusLine]   = useState<number | null>(null);
  const [selectedEl, setSelectedEl] = useState<SelectedEl | null>(null);

  const handleCloseStylePanel = () => setSelectedEl(null);

  const handleCloseAll = () => {
    setShowATS(false);
    setShowTemplates(false);
  };

  const handleExport = () => {
    setExporting(true);
  };

  const handleToggleATS = () => {
    if (showATS) { handleCloseAll(); return; }
    setShowATS((v) => !v);
  };

  const handleToggleTemplates = () => {
    if (showTemplates) { handleCloseAll(); return; }
    setShowTemplates((v) => !v);
  };

  return (
    <div
      className={`flex flex-col h-screen ${shell.bgSubtle} overflow-hidden font-sans`}
    >
      <Toolbar
        showATS={showATS}
        onToggleATS={handleToggleATS}
        showTemplates={showTemplates}
        onToggleTemplates={handleToggleTemplates}
        exporting={exporting}
        onExport={handleExport}
        onCloseStylePanel={handleCloseStylePanel}
      />

      {showATS && <ATSPanel />}
      {showTemplates && <TemplatesPanel />}

      <div className="flex flex-1 overflow-hidden min-h-0">
        <EditorPane focusLine={focusLine} onFocusLineHandled={() => setFocusLine(null)} onCloseStylePanel={handleCloseStylePanel} />
        <PreviewPane exporting={exporting} setExportingAction={setExporting} setFocusLine={setFocusLine} selectedEl={selectedEl} setSelectedEl={setSelectedEl} />
      </div>
    </div>
  );
}
