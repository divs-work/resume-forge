// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT LATEX TEMPLATE (ALL FEATURES SUPPORTED: GUIDE & CHEATSHEET)
// ─────────────────────────────────────────────────────────────────────────────

import { ResumeTheme } from "@/types/resume";

export const DEFAULT_LATEX_TEMPLATE = `%% Clean Lines — Single Page
\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\hypersetup{colorlinks=false,pdfborder={0 0 0}}

\\newcommand{\\rsection}[1]{\\vspace{4pt}\\noindent\\textbf{\\MakeUppercase{#1}}\\\\\\rule{\\linewidth}{0.5pt}\\vspace{2pt}}
\\newcommand{\\rjob}[3]{\\textbf{#1} $|$ \\textit{#2} \\hfill #3}

\\begin{document}
\\pagestyle{empty}

\\begin{center}
{\\Huge\\bfseries YOUR NAME}\\\\[2pt]
{\\small your@email.com \\quad\\textbullet\\quad +1 (555) 123-4567 \\quad\\textbullet\\quad San Francisco, CA \\quad\\textbullet\\quad \\href{https://linkedin.com/in/yourname}{LinkedIn} \\quad\\textbullet\\quad \\href{https://github.com/yourusername}{GitHub}}
\\end{center}

\\vspace{-2pt}\\rule{\\linewidth}{1pt}\\vspace{2pt}

\\rsection{Experience}

\\rjob{Lead Frontend \\& Systems Engineer}{The Innovate Group}{Jan 2023 -- Present}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=1pt,itemsep=1pt]
\\item \\textbf{Architected} an event-driven micro-frontend system with Next.js and TypeScript, cutting build times by 45\\%.
\\item \\textbf{Optimized} Core Web Vitals across the primary dashboard, improving session duration by 22\\% for 50k+ DAU.
\\item Led a 6-engineer squad; CI/CD pipelines via GitHub Actions reduced production bugs by 65\\%.
\\end{itemize}

\\vspace{3pt}
\\rjob{Software Engineer II}{Quantum Leap Inc.}{2020 -- 2022}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=1pt,itemsep=1pt]
\\item Engineered payment gateway APIs processing \\$5M+ monthly with 99.99\\% uptime.
\\item Reduced API response times by 60\\% (800ms to sub-50ms) via Redis caching and SQL refactoring.
\\item Containerized dev environments with Docker, cutting onboarding from 3 days to 4 hours.
\\end{itemize}

\\rsection{Projects}

\\rjob{OpenStream}{React, Node.js, Redis}{2023}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=1pt,itemsep=1pt]
\\item Real-time collaboration platform supporting 10k concurrent users with sub-50ms latency.
\\end{itemize}

\\vspace{3pt}
\\rjob{InfraCLI}{Python, Terraform, AWS}{2022}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=1pt,itemsep=1pt]
\\item Developer utility for cloud provisioning; 500+ downloads/month, adopted by 3 enterprise teams.
\\end{itemize}

\\rsection{Skills}

\\textbf{Frontend:} React, Next.js, TypeScript, Tailwind CSS \\quad
\\textbf{Backend:} Node.js, Python, PostgreSQL, Redis, GraphQL \\quad
\\textbf{DevOps:} AWS, Docker, Kubernetes, Terraform, CI/CD

\\rsection{Education}

\\textbf{B.Tech, Computer Science} \\hfill University of Technology \\quad \\textit{2017 -- 2021}\\\\
\\textbf{Certifications:} AWS Certified Solutions Architect (2023) $|$ OSCP (2022)

\\end{document}`;

export const DEFAULT_LATEX_THEME: ResumeTheme = {
  h1: "text-4xl font-serif font-bold text-black text-center mb-2 leading-tight",
  h2: "text-xl font-serif font-bold text-black mt-4 mb-2 border-b border-black pb-0.5",
  h3: "text-lg font-serif font-bold text-black mt-2",
  h4: "text-base font-serif italic text-gray-800 mb-0.5",
  p: "text-[11pt] font-serif text-black leading-normal text-justify mb-1.5",
  ul: "list-disc pl-6 mb-2 space-y-0.5 font-serif",
  ol: "list-decimal pl-6 mb-2 space-y-0.5 font-serif",
  li: "text-[11pt] text-black pl-1",
  strong: "font-bold",
  em: "italic",
  hr: "border-t border-black my-3",
  a: "text-black hover:underline",
  table: "w-full border-collapse my-3 font-serif text-[11pt]",
  thead: "border-b-2 border-black border-t-2",
  tbody: "border-b-2 border-black",
  tr: "",
  th: "text-left py-1.5 px-2 font-bold",
  td: "py-1.5 px-2 align-top border-t border-gray-300",
};

export const MODERNCV_LATEX_THEME: ResumeTheme = {
  h1: "text-5xl font-sans font-light text-slate-800 mb-6 tracking-tight",
  h2: "text-2xl font-sans font-light text-blue-700 mt-6 mb-4",
  h3: "text-lg font-sans font-semibold text-slate-800 mt-3",
  h4: "text-base font-sans italic text-slate-600 mb-1",
  p: "text-[11pt] font-sans text-slate-700 leading-relaxed mb-3",
  ul: "list-none pl-4 mb-3 space-y-1 border-l-2 border-blue-200 ml-2",
  ol: "list-decimal pl-6 mb-3 space-y-1",
  li: "text-[11pt] text-slate-700 pl-2",
  strong: "font-semibold text-slate-900",
  em: "italic",
  hr: "border-t border-slate-200 my-5",
  a: "text-blue-600 hover:underline",
  table: "w-full border-collapse my-4 font-sans text-[11pt]",
  thead: "bg-slate-50",
  tbody: "divide-y divide-slate-100",
  tr: "",
  th: "text-left py-3 px-2 font-semibold text-slate-800",
  td: "py-3 px-2 align-top text-slate-600",
};

export const ACADEMIC_LATEX_THEME: ResumeTheme = {
  h1: "text-3xl font-serif font-bold text-black text-center mb-3",
  h2: "text-sm font-serif font-bold uppercase tracking-widest text-black text-center mt-4 mb-2",
  h3: "text-base font-serif font-bold text-black mt-2 flex justify-between",
  h4: "text-[10.5pt] font-serif italic text-black mb-0.5",
  p: "text-[10pt] font-serif text-black leading-snug text-justify mb-1.5",
  ul: "list-disc pl-5 mb-1.5 space-y-0.5 font-serif",
  ol: "list-decimal pl-5 mb-1.5 space-y-0.5 font-serif",
  li: "text-[10pt] text-black",
  strong: "font-bold",
  em: "italic",
  hr: "border-t border-black my-3",
  a: "text-black underline decoration-1",
  table: "w-full border-collapse my-3 font-serif text-[10pt]",
  thead: "border-b border-black border-t",
  tbody: "border-b border-black",
  tr: "",
  th: "text-left py-1 px-1 font-bold",
  td: "py-1 px-1 align-top",
};

export const TUFTE_LATEX_THEME: ResumeTheme = {
  h1: "text-4xl font-serif text-gray-900 mb-5 tracking-tight",
  h2: "text-xl font-serif italic text-gray-900 mt-7 mb-3",
  h3: "text-lg font-serif text-gray-900 mt-4",
  h4: "text-[11pt] font-serif uppercase tracking-wider text-gray-600 mb-2",
  p: "text-[11pt] font-serif text-gray-800 leading-loose text-justify mb-4",
  ul: "list-disc pl-6 mb-4 space-y-2 font-serif",
  ol: "list-decimal pl-6 mb-4 space-y-2 font-serif",
  li: "text-[11pt] text-gray-800 pl-1",
  strong: "font-semibold text-gray-900",
  em: "italic",
  hr: "border-none h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent my-6",
  a: "text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900",
  table: "w-full border-collapse my-5 font-serif text-[11pt]",
  thead: "border-b-2 border-gray-800",
  tbody: "divide-y divide-gray-200",
  tr: "",
  th: "text-left py-2 font-normal italic text-gray-900",
  td: "py-2 align-top text-gray-800",
};

export const RES_CLS_LATEX_THEME: ResumeTheme = {
  h1: "text-3xl font-serif font-black text-black uppercase tracking-widest text-center mb-6",
  h2: "text-lg font-serif font-bold text-black uppercase tracking-wider mt-5 mb-2",
  h3: "text-[11pt] font-serif font-bold text-black mt-3",
  h4: "text-[11pt] font-serif italic text-gray-800 mb-1",
  p: "text-[11pt] font-serif text-black leading-normal mb-2",
  ul: "list-[square] pl-8 mb-3 space-y-1 font-serif",
  ol: "list-decimal pl-8 mb-3 space-y-1 font-serif",
  li: "text-[11pt] text-black",
  strong: "font-bold",
  em: "italic",
  hr: "border-t-4 border-double border-black my-5",
  a: "text-black font-bold",
  table: "w-full border-collapse my-3 font-serif text-[11pt]",
  thead: "border-b-2 border-black",
  tbody: "",
  tr: "",
  th: "text-left py-1 font-bold",
  td: "py-1 align-top",
};
