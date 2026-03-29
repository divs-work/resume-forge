// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT MARKDOWN TEMPLATE (ALL FEATURES SUPPORTED: GUIDE & CHEATSHEET)
// ─────────────────────────────────────────────────────────────────────────────

import { ResumeTheme } from "@/types/resume";

export const DEFAULT_MD_TEMPLATE = `# YOUR NAME
**Senior Full-Stack Engineer** | your@email.com | +1 (555) 123-4567 | San Francisco, CA
[LinkedIn](https://linkedin.com/in/yourname) | [GitHub](https://github.com/yourusername) | [Portfolio](https://yourwebsite.com)

> *Passionate about building scalable systems and pixel-perfect interfaces. I bridge the gap between secure, high-throughput backends and interactive frontends.*

---

## PROFESSIONAL EXPERIENCE

### **Lead Frontend & Systems Engineer** | The Innovate Group
*Jan 2023 – Present | San Francisco, CA*

- **Architected** an event-driven micro-frontend system using \`Next.js\` and \`TypeScript\`, reducing build times by 45%.
- **Optimized** Core Web Vitals (LCP, CLS) across the primary dashboard, improving session duration by 22% for 50,000+ daily active users.
- Led a 6-engineer squad; established strict CI/CD guidelines via \`GitHub Actions\` that decreased production bug rates by 65%.
- Automated cloud operations tooling, saving $80K annually in redundant AWS compute costs.

### **Software Engineer II** | Quantum Leap Inc.
*2020 – 2022 | Remote*

- Engineered core payment gateway APIs processing $5M+ in monthly transaction volume with 99.99% uptime.
- Slashed API response times by 60% (800ms to sub-50ms) through aggressive Redis caching and complex SQL refactoring.
- Containerized localized development environments using Docker, reducing onboarding time from 3 days to under 4 hours.

## FEATURED PROJECTS

| Project Name | Tech Stack | Key Impact |
| :--- | :--- | :--- |
| **OpenStream** | \`React\`, \`Node.js\`, \`Redis\` | 10k concurrent users per room, sub-50ms latency. |
| **InfraCLI** | \`Python\`, \`Terraform\`, \`AWS\` | Developer utility downloaded 500+ times/month. |
| **Aura UI** | \`TypeScript\`, \`Tailwind CSS\` | OSS component library used by 5+ enterprise teams. |

## TECHNICAL ARSENAL

1. **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, Zustand
2. **Backend:** Node.js, Python (FastAPI), PostgreSQL, Redis, GraphQL
3. **DevOps & Security:** AWS, Docker, Kubernetes, Terraform, Linux, CI/CD

## EDUCATION & CREDENTIALS

**B.Tech, Computer Science** · University of Technology · *2017 – 2021*
- **Certifications:** AWS Certified Solutions Architect (2023) | OSCP Offensive Security Certified (2022)
`;

export const DEFAULT_MD_THEME: ResumeTheme = {
  h1: "text-3xl font-black text-gray-900 tracking-tight mb-1",
  h2: "text-[13px] font-bold text-blue-600 uppercase tracking-widest border-b border-gray-200 pb-0.5 mt-4 mb-2",
  h3: "text-[15px] font-bold text-gray-900 mt-2",
  h4: "text-[14px] font-medium text-gray-700 mb-0.5",
  p: "text-[13px] text-gray-800 leading-normal mb-1.5",
  ul: "list-disc pl-5 mb-2 space-y-0.5",
  ol: "list-decimal pl-5 mb-2 space-y-0.5",
  li: "text-[13px] text-gray-800",
  strong: "font-bold text-gray-900",
  em: "italic text-gray-600",
  hr: "my-3 border-gray-200",
  a: "text-blue-600 underline",
  table: "min-w-full border-collapse mb-3",
  thead: "bg-gray-50",
  tbody: "divide-y divide-gray-200",
  tr: "even:bg-gray-50",
  th: "px-3 py-1.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider",
  td: "px-3 py-1.5 text-sm text-gray-600 whitespace-nowrap",
};

export const MINIMALIST_MD_THEME: ResumeTheme = {
  h1: "text-3xl font-light text-black tracking-widest uppercase mb-1",
  h2: "text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mt-4 mb-2",
  h3: "text-base font-medium text-black mt-2",
  h4: "text-sm text-gray-500 italic mb-1",
  p: "text-sm text-gray-700 leading-normal mb-1.5",
  ul: "list-disc pl-5 mb-2 space-y-0.5 marker:text-gray-300",
  ol: "list-decimal pl-5 mb-2 space-y-0.5 marker:text-gray-300",
  li: "text-sm text-gray-700",
  strong: "font-semibold text-black",
  em: "italic text-gray-500",
  hr: "my-3 border-black border-t",
  a: "text-gray-900 border-b border-gray-900",
  table: "min-w-full border-collapse mb-3",
  thead: "border-b-2 border-black",
  tbody: "divide-y divide-gray-100",
  tr: "",
  th: "px-3 py-1.5 text-left text-xs font-semibold text-black uppercase tracking-wider",
  td: "px-3 py-1.5 text-sm text-gray-700 whitespace-nowrap",
};

export const EARTHY_MD_THEME: ResumeTheme = {
  h1: "text-3xl font-serif text-stone-800 tracking-tight mb-1",
  h2: "text-[14px] font-bold text-emerald-700 uppercase tracking-wider border-b-2 border-emerald-100 pb-0.5 mt-4 mb-2",
  h3: "text-[16px] font-semibold text-stone-800 mt-2",
  h4: "text-[13px] font-medium text-stone-500 mb-0.5",
  p: "text-[13.5px] text-stone-600 leading-normal mb-1.5",
  ul: "list-disc pl-5 mb-2 space-y-0.5 marker:text-emerald-600",
  ol: "list-decimal pl-5 mb-2 space-y-0.5 marker:text-emerald-600",
  li: "text-[13.5px] text-stone-600",
  strong: "font-semibold text-stone-900",
  em: "italic text-stone-500",
  hr: "my-3 border-stone-200",
  a: "text-emerald-600 hover:text-emerald-800 underline decoration-emerald-200 decoration-2 underline-offset-2",
  table:
    "min-w-full border-collapse mb-3 bg-stone-50/50 rounded-lg overflow-hidden",
  thead: "bg-emerald-50 border-b border-emerald-100",
  tbody: "divide-y divide-stone-200",
  tr: "even:bg-stone-50",
  th: "px-4 py-1.5 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider",
  td: "px-4 py-1.5 text-sm text-stone-700 whitespace-nowrap",
};

export const MODERN_TECH_MD_THEME: ResumeTheme = {
  h1: "text-3xl font-extrabold text-slate-900 tracking-tighter mb-1",
  h2: "text-sm font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-500 pb-0.5 mt-4 mb-2 inline-block",
  h3: "text-base font-bold text-slate-800 mt-2",
  h4: "text-sm font-semibold text-indigo-500 mb-0.5",
  p: "text-sm text-slate-600 leading-normal mb-1.5",
  ul: "list-disc pl-5 mb-2 space-y-0.5 marker:text-indigo-400",
  ol: "list-decimal pl-5 mb-2 space-y-0.5 marker:text-indigo-400",
  li: "text-sm text-slate-600",
  strong: "font-bold text-slate-900",
  em: "italic text-slate-500",
  hr: "my-3 border-slate-200",
  a: "text-indigo-600 font-medium",
  table:
    "min-w-full border-collapse mb-3 shadow-sm ring-1 ring-slate-200 rounded-md",
  thead: "bg-slate-100",
  tbody: "divide-y divide-slate-200 bg-white",
  tr: "",
  th: "px-4 py-1.5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider",
  td: "px-4 py-1.5 text-sm text-slate-600 whitespace-nowrap",
};

export const ACADEMIC_MD_THEME: ResumeTheme = {
  h1: "text-3xl font-serif font-bold text-gray-900 mb-1 text-center",
  h2: "text-[13px] font-serif font-bold text-red-800 uppercase tracking-widest border-b border-gray-300 pb-0.5 mt-4 mb-2 text-center",
  h3: "text-[15px] font-serif font-bold text-gray-900 mt-2",
  h4: "text-[13px] font-serif italic text-gray-700 mb-0.5",
  p: "text-[13px] font-serif text-gray-800 leading-normal mb-1.5",
  ul: "list-disc pl-6 mb-2 space-y-0.5 marker:text-red-800",
  ol: "list-decimal pl-6 mb-2 space-y-0.5 marker:text-red-800",
  li: "text-[13px] font-serif text-gray-800 pl-1",
  strong: "font-bold text-black",
  em: "italic text-gray-700",
  hr: "my-3 border-gray-300 border-double border-t-4",
  a: "text-red-800 underline decoration-1 underline-offset-2",
  table: "min-w-full border-collapse mb-3 border border-gray-300",
  thead: "bg-gray-100 border-b-2 border-gray-300",
  tbody: "divide-y divide-gray-200",
  tr: "even:bg-gray-50",
  th: "px-3 py-1.5 text-left text-[12px] font-serif font-bold text-gray-700 uppercase tracking-wider",
  td: "px-3 py-1.5 text-[13px] font-serif text-gray-800 whitespace-nowrap",
};
