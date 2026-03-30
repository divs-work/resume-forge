"use client";

import { shell } from "@/constants/theme";

export type SidePanel = "templates" | "ats" | "help";

interface Props {
  active: SidePanel | null;
  onToggle: (p: SidePanel) => void;
  onReset: () => void;
}

function NavBtn({
  active,
  title,
  onClick,
  children,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative w-full flex items-center justify-center h-10 transition-colors cursor-pointer ${
        active ? "text-[#e4e4e4]" : "text-[#4a4a4a] hover:text-[#a0a0a0]"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#e4e4e4] rounded-r" />
      )}
      {children}
    </button>
  );
}

export default function ActivityBar({ active, onToggle, onReset }: Props) {
  return (
    <div
      className={`w-11 shrink-0 flex flex-col items-center py-2 ${shell.bg} border-r ${shell.border}`}
    >
      <NavBtn active={active === "templates"} title="Templates" onClick={() => onToggle("templates")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="17" height="17">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </NavBtn>

      <NavBtn active={active === "ats"} title="ATS Score" onClick={() => onToggle("ats")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="17" height="17">
          <path d="M9 12l2 2 4-4M12 3a9 9 0 100 18 9 9 0 000-18z" strokeLinecap="round" />
        </svg>
      </NavBtn>

      <NavBtn active={active === "help"} title="Reference" onClick={() => onToggle("help")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="17" height="17">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round" />
          <circle cx="12" cy="17" r=".5" fill="currentColor" />
        </svg>
      </NavBtn>

      <div className="flex-1" />

      <button
        onClick={onReset}
        title="Reset to template"
        className="w-full flex items-center justify-center h-10 text-[#4a4a4a] hover:text-[#a0a0a0] transition-colors cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="15" height="15">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11v6M14 11v6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
