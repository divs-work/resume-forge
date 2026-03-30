"use client";

import { shell, accent } from "@/constants/theme";

export type SidePanel = "templates" | "ats" | "help";

interface Props {
  active: SidePanel | null;
  onToggle: (p: SidePanel) => void;
  onReset: () => void;
}

interface NavBtnProps {
  active: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

function NavBtn({ active, title, onClick, children }: NavBtnProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative w-full flex items-center justify-center h-11 transition-all duration-200 cursor-pointer group ${
        active
          ? accent.text
          : `${shell.textFaint} hover:text-[#616161]`
      }`}
    >
      {/* State layer */}
      <span
        className={`absolute inset-x-1.5 inset-y-1 rounded-2xl transition-all duration-200 ${
          active
            ? accent.bgFill
            : "opacity-0 group-hover:opacity-100 bg-black/[0.05]"
        }`}
      />
      <span className="relative">{children}</span>
    </button>
  );
}

export default function ActivityBar({ active, onToggle, onReset }: Props) {
  return (
    <div className={`hidden lg:flex w-11 shrink-0 flex-col items-center py-1.5 ${shell.bg} border-r ${shell.border}`}>
      <NavBtn active={active === "templates"} title="Templates" onClick={() => onToggle("templates")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="17" height="17">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
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

      {/* Reset */}
      <button
        onClick={onReset}
        title="Reset to template"
        className={`relative w-full flex items-center justify-center h-11 ${shell.textFaint} hover:text-[#636c76] transition-all duration-200 cursor-pointer group`}
      >
        <span className="absolute inset-x-1.5 inset-y-1 rounded-2xl opacity-0 group-hover:opacity-100 bg-black/[0.05] transition-all duration-200" />
        <span className="relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="15" height="15">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11v6M14 11v6" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
