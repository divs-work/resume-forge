"use client";

import { useMemo, useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { checkAts } from "@/helper/ats";
import {
  shell,
  atsScore,
  atsBadge,
  atsCategory,
  atsTooltip,
} from "@/constants/theme";
import type { ATSCheck } from "@/types/resume";

const CATEGORY_ORDER = [
  "Contact Info",
  "Sections",
  "Content Quality",
  "Bullet Quality",
  "Keywords",
  "Credentials",
  "Formatting",
  "Length",
];

function Tooltip({ label, tip }: { label: string; tip: string }) {
  return (
    <div className="absolute top-full left-0 mt-2 z-999 w-56 pointer-events-none">
      <div
        className={`absolute -top-1.5 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent ${atsTooltip.arrow}`}
      />
      <div className={`${atsTooltip.bg} rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.10),0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden border border-[#E0E0E0]`}>
        <div className={`px-3 py-2 ${atsTooltip.headerBg} border-b ${atsTooltip.headerBorder}`}>
          <p className={`text-[11px] font-semibold ${atsTooltip.titleText}`}>{label}</p>
        </div>
        <div className="px-3 py-2.5">
          <p className={`text-[10.5px] leading-[1.65] ${atsTooltip.bodyText}`}>{tip}</p>
        </div>
      </div>
    </div>
  );
}

function Badge({ check }: { check: ATSCheck }) {
  const [show, setShow] = useState(false);

  const badgeCls = check.pass
    ? `${atsBadge.passBg} ${atsBadge.passText} ${atsBadge.passBorder}`
    : `${atsBadge.failBg} ${atsBadge.failText} ${atsBadge.failBorder} ${atsBadge.failHover}`;
  const dotCls = check.pass ? atsBadge.passDot : atsBadge.failDot;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => { if (!check.pass) setShow(true); }}
      onMouseLeave={() => setShow(false)}
    >
      <span
        className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full font-medium border select-none transition-colors ${badgeCls}`}
      >
        <span className={`size-1.5 rounded-full shrink-0 ${dotCls}`} />
        {check.label}
      </span>
      {show && <Tooltip label={check.label} tip={check.tip} />}
    </div>
  );
}

function CategoryCard({
  name, checks, passed, total,
}: {
  name: string; checks: ATSCheck[]; passed: number; total: number;
}) {
  const pct = (passed / total) * 100;
  const allPass = passed === total;
  const barColor  = allPass ? atsCategory.barPass  : pct >= 60 ? atsCategory.barPartial  : atsCategory.barFail;
  const labelColor = allPass ? atsCategory.labelPass : pct >= 60 ? atsCategory.labelPartial : atsCategory.labelFail;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className={`text-[9px] font-bold uppercase tracking-widest ${shell.textFaint} flex-1 min-w-0 truncate`}>
          {name}
        </span>
        <span className={`text-[9px] font-semibold tabular-nums shrink-0 ${labelColor}`}>
          {passed}/{total}
        </span>
        <div className={`w-12 h-px ${atsCategory.track} rounded-full overflow-hidden shrink-0`}>
          <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {checks.map((check, i) => <Badge key={i} check={check} />)}
      </div>
    </div>
  );
}

export default function ATSPanel() {
  const content = useResumeStore((s) => s.content[s.mode]);
  const ats = useMemo(() => checkAts(content), [content]);

  const ringColor =
    ats.score >= 80 ? atsScore.high :
    ats.score >= 50 ? atsScore.mid  :
    atsScore.low;

  const scoreLabel =
    ats.score >= 80 ? "Strong" :
    ats.score >= 50 ? "Fair"   :
    "Weak";

  const scoreFg =
    ats.score >= 80 ? atsCategory.labelPass :
    ats.score >= 50 ? atsCategory.labelPartial :
    atsCategory.labelFail;

  const totalPassed = ats.checks.filter((c) => c.pass).length;

  const byCategory = useMemo(() => {
    const map = new Map<string, ATSCheck[]>();
    for (const check of ats.checks) {
      const cat = check.category ?? "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(check);
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
      name: c,
      checks: map.get(c)!,
      passed: map.get(c)!.filter((ch) => ch.pass).length,
      total: map.get(c)!.length,
    }));
  }, [ats.checks]);

  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      {/* Score ring */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <svg width="96" height="96" viewBox="0 0 36 36" className="-rotate-90">
            <circle cx="18" cy="18" r="14.5" fill="none" strokeWidth="2" className={atsScore.track} />
            <circle
              cx="18" cy="18" r="14.5" fill="none" strokeWidth="2.75"
              className={ringColor}
              strokeDasharray={`${ats.score * 0.91} 100`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span className={`text-[20px] font-bold tabular-nums leading-none ${shell.text}`}>{ats.score}</span>
            <span className={`text-[8px] font-semibold uppercase tracking-wider ${scoreFg}`}>{scoreLabel}</span>
          </div>
        </div>
        <p className={`text-[10px] tabular-nums ${shell.textFaint}`}>
          {totalPassed} / {ats.checks.length} checks passed
        </p>
      </div>

      {/* Divider */}
      <div className={`h-px ${shell.divider}`} />

      {/* Categories */}
      <div className="flex flex-col gap-4">
        {byCategory.map((cat) => (
          <CategoryCard key={cat.name} {...cat} />
        ))}
      </div>
    </div>
  );
}
