"use client";

import { useState } from "react";
import { shell } from "@/constant/theme";
import Toolbar from "./Toolbar";
import ATSPanel from "./ATSPanel";
import TemplatesPanel from "./TemplatesPanel";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";

export default function ResumeBuilder() {
  const [showATS, setShowATS] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [exporting, setExporting] = useState(false);

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
      />

      {showATS && <ATSPanel />}
      {showTemplates && <TemplatesPanel />}

      <div className="flex flex-1 overflow-hidden min-h-0">
        <EditorPane />
        <PreviewPane exporting={exporting} setExportingAction={setExporting} />
      </div>
    </div>
  );
}
