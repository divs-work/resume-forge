"use client";

import { useState } from "react";
import { shell } from "@/constant/theme";
import Toolbar from "./Toolbar";
import ATSPanel from "./ATSPanel";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";

export default function ResumeBuilder() {
  const [showATS, setShowATS] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
  };

  return (
    <div
      className={`flex flex-col h-screen ${shell.bgSubtle} overflow-hidden font-sans`}
    >
      <Toolbar
        showATS={showATS}
        onToggleATS={() => setShowATS((v) => !v)}
        exporting={exporting}
        onExport={handleExport}
      />

      {showATS && <ATSPanel />}

      <div className="flex flex-1 overflow-hidden min-h-0">
        <EditorPane />
        <PreviewPane exporting={exporting} setExportingAction={setExporting} />
      </div>
    </div>
  );
}
