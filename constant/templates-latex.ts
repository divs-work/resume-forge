// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT LATEX TEMPLATE (ALL FEATURES SUPPORTED: GUIDE & CHEATSHEET)
// ─────────────────────────────────────────────────────────────────────────────

import { ResumeTheme } from "@/types/resume";

export const DEFAULT_LATEX_TEMPLATE = `%% Clean Lines — Ultimate Minimalist Density
\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{2pt}
\\hypersetup{colorlinks=false,pdfborder={0 0 0}}

\\newcommand{\\rsection}[1]{\\vspace{6pt}\\noindent\\textbf{\\MakeUppercase{#1}}\\vspace{2pt}\\\\\\rule{\\linewidth}{0.5pt}\\vspace{2pt}}
\\newcommand{\\rjob}[3]{\\textbf{#1} $|$ \\textit{#2} \\hfill #3}

\\begin{document}
\\pagestyle{empty}

\\begin{center}
{\\Huge\\bfseries YOUR NAME}\\\\[3pt]
{\\large\\itshape Senior Full-Stack Engineer}\\\\[4pt]
{\\small your@email.com \\quad\\textbullet\\quad +1 (555) 123-4567 \\quad\\textbullet\\quad San Francisco, CA}\\\\
{\\small \\href{https://linkedin.com/in/yourname}{LinkedIn} \\quad\\textbullet\\quad \\href{https://github.com/yourusername}{GitHub} \\quad\\textbullet\\quad \\href{https://yourwebsite.com}{Portfolio}}
\\end{center}

\\vspace{-2pt}\\rule{\\linewidth}{1.5pt}\\vspace{2pt}

\\emph{Passionate about building scalable systems and pixel-perfect interfaces. I bridge the gap between secure, high-throughput backends and interactive frontends.}

\\rsection{Professional Experience}

\\rjob{Lead Frontend \\& Systems Engineer}{The Innovate Group}{Jan 2023 -- Present}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=2pt,itemsep=2pt]
\\item \\textbf{Architected} an event-driven micro-frontend system using Next.js and TypeScript, reducing build times by 45\\%.
\\item \\textbf{Optimized} Core Web Vitals (LCP, CLS) across the primary dashboard, improving session duration by 22\\% for 50,000+ daily active users.
\\item Led a 6-engineer squad; established strict CI/CD guidelines via GitHub Actions that decreased production bug rates by 65\\%.
\\item Automated cloud operations tooling, saving \\$80K annually in redundant AWS compute costs.
\\end{itemize}

\\vspace{4pt}
\\rjob{Software Engineer II}{Quantum Leap Inc.}{2020 -- 2022}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=2pt,itemsep=2pt]
\\item Engineered core payment gateway APIs processing \\$5M+ in monthly transaction volume with 99.99\\% uptime.
\\item Slashed API response times by 60\\% (800ms to sub-50ms) through aggressive Redis caching and complex SQL refactoring.
\\item Containerized localized development environments using Docker, reducing onboarding time from 3 days to under 4 hours.
\\end{itemize}

\\rsection{Featured Projects}

\\vspace{2pt}
\\begin{tabular}{ l l l }
\\textbf{Project Name} & \\textbf{Tech Stack} & \\textbf{Key Impact} \\\\
\\hline
\\textbf{OpenStream} & React, Node.js, Redis & 10k concurrent users per room, sub-50ms latency. \\\\
\\textbf{InfraCLI} & Python, Terraform, AWS & Developer utility downloaded 500+ times/month. \\\\
\\textbf{Aura UI} & TypeScript, Tailwind CSS & OSS component library used by 5+ enterprise teams. \\\\
\\end{tabular}
\\vspace{4pt}

\\rsection{Technical Arsenal}

\\begin{enumerate}[nosep,leftmargin=1.5em,topsep=2pt,itemsep=2pt]
\\item \\textbf{Frontend:} React, Next.js, TypeScript, JavaScript, Tailwind CSS, Zustand
\\item \\textbf{Backend:} Node.js, Python (FastAPI), PostgreSQL, Redis, GraphQL
\\item \\textbf{DevOps \\& Security:} AWS, Docker, Kubernetes, Terraform, Linux, CI/CD
\\end{enumerate}

\\rsection{Education \\& Credentials}

\\textbf{B.Tech, Computer Science} \\hfill University of Technology \\quad \\textit{2017 -- 2021}

\\smallskip
\\textbf{Certifications:} AWS Certified Solutions Architect (2023) \\quad $|$ \\quad OSCP Offensive Security Certified (2022)

\\end{document}`;

export const DEFAULT_LATEX_THEME: ResumeTheme = {
  h1: "text-4xl font-serif font-bold text-black text-center mb-4 leading-tight",
  h2: "text-xl font-serif font-bold text-black mt-6 mb-3 border-b border-black pb-1",
  h3: "text-lg font-serif font-bold text-black mt-4",
  h4: "text-base font-serif italic text-gray-800 mb-1",
  p: "text-[11pt] font-serif text-black leading-relaxed text-justify mb-3",
  ul: "list-disc pl-6 mb-3 space-y-1 font-serif",
  ol: "list-decimal pl-6 mb-3 space-y-1 font-serif",
  li: "text-[11pt] text-black pl-1",
  strong: "font-bold",
  em: "italic",
  hr: "border-t border-black my-5",
  a: "text-black hover:underline",
  table: "w-full border-collapse my-4 font-serif text-[11pt]",
  thead: "border-b-2 border-black border-t-2",
  tbody: "border-b-2 border-black",
  tr: "",
  th: "text-left py-2 px-2 font-bold",
  td: "py-2 px-2 align-top border-t border-gray-300",
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
  h1: "text-3xl font-serif font-bold text-black text-center mb-5",
  h2: "text-sm font-serif font-bold uppercase tracking-widest text-black text-center mt-6 mb-3",
  h3: "text-base font-serif font-bold text-black mt-3 flex justify-between",
  h4: "text-[10.5pt] font-serif italic text-black mb-1",
  p: "text-[10pt] font-serif text-black leading-snug text-justify mb-2",
  ul: "list-disc pl-5 mb-2 space-y-0.5 font-serif",
  ol: "list-decimal pl-5 mb-2 space-y-0.5 font-serif",
  li: "text-[10pt] text-black",
  strong: "font-bold",
  em: "italic",
  hr: "border-t border-black my-4",
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
