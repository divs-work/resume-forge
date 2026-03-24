// ─────────────────────────────────────────────────────────────────────────────
// LATEX TEMPLATES (SINGLE-PAGE, HIGH-DENSITY, PREMIUM)
// ─────────────────────────────────────────────────────────────────────────────

export const LATEX_CLASSIC = `%% ATS-Friendly LaTeX Resume — Premium Classic
\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{darkgray}{HTML}{333333}
\\titleformat{\\section}{\\large\\bfseries\\color{darkgray}}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{8pt}{5pt}
\\setlength{\\parindent}{0pt}
\\hypersetup{colorlinks=true, urlcolor=darkgray}

\\begin{document}
\\pagestyle{empty}

\\begin{center}
{\\Huge\\bfseries YOUR NAME}\\\\[4pt]
{\\large\\textit{Senior Frontend \\& Security Engineer}}\\\\[4pt]
{\\small your@email.com \\quad$|$\\quad +1 (555) 123-4567 \\quad$|$\\quad San Francisco, CA}\\\\
{\\small \\href{https://linkedin.com/in/yourname}{linkedin.com/in/yourname} \\quad$|$\\quad \\href{https://github.com/yourusername}{github.com/yourusername}}
\\end{center}

\\vspace{-5pt}

\\section{Professional Summary}
Performance-driven engineer with 5+ years of experience architecting highly scalable web applications and cross-platform mobile products. Proven expertise in bridging the gap between pixel-perfect React frontends and secure, high-throughput systems. Deep understanding of Linux environments and modern cybersecurity protocols.

\\section{Experience}

\\textbf{Staff Software Engineer} \\hfill \\textit{Jan 2023 -- Present}\\\\
\\textit{CyberShield Networks \\quad$|$\\quad San Francisco, CA}
\\begin{itemize}[nosep, leftmargin=1.2em, topsep=3pt, itemsep=2pt]
\\item Spearheaded the architecture of a highly secure React dashboard for threat monitoring, mitigating XSS/CSRF vulnerabilities and handling 15k+ concurrent connections via WebSockets.
\\item Led the frontend transition to Next.js, optimizing Core Web Vitals to achieve a 95+ score across all major product verticals and reducing client-side latency by 40\\%.
\\item Architected deep Linux server hardening protocols (custom Arch/Gentoo kernels) for deployment environments supporting the frontend microservices.
\\item Established strict CI/CD guidelines (GitHub Actions) and pair-programming protocols for a 6-engineer squad, decreasing production bug rates by 65\\%.
\\end{itemize}

\\vspace{4pt}
\\textbf{Frontend \\& Mobile Developer} \\hfill \\textit{2020 -- 2022}\\\\
\\textit{DataSynergy LLC \\quad$|$\\quad Remote}
\\begin{itemize}[nosep, leftmargin=1.2em, topsep=3pt, itemsep=2pt]
\\item Developed core cross-platform mobile application features using Flutter and Dart, maintaining 99.99\\% crash-free sessions across iOS and Android.
\\item Slashed application bundle size by 60\\% through aggressive code-splitting and asset optimization.
\\item Engineered secure internal authentication flows communicating with REST APIs, ensuring strict JWT validation.
\\item Championed the containerization of localized development environments using Docker, reducing onboarding time for new hires from 3 days to under 4 hours.
\\end{itemize}

\\section{Selected Projects}
\\textbf{Phantom OS (Open Source)} --- Custom hardened Linux distribution based on Arch Linux. Configured specifically for penetration testing and secure frontend development. \\textit{Bash, C, Linux Kernel}

\\vspace{3pt}
\\textbf{CyberDash} --- A real-time analytics dashboard for monitoring network traffic. Features complex data visualization with zero frame drops. \\textit{React, WebSockets, D3.js, Tailwind CSS}

\\vspace{3pt}
\\textbf{SecureComms Mobile} --- End-to-end encrypted messaging application for internal enterprise use, achieving sub-50ms message delivery. \\textit{Flutter, Dart, Node.js}

\\section{Technical Arsenal}
\\textbf{Frontend \\& Mobile:} React, Next.js, JavaScript, TypeScript, Flutter, Dart, Tailwind CSS, Zustand\\\\
\\textbf{Systems \\& Security:} Linux (Arch, Gentoo), Cybersecurity Auditing, CSP, XSS Mitigation, Bash\\\\
\\textbf{Infrastructure \\& Tools:} Node.js, Git, Docker, AWS (EC2, S3), CI/CD, GitHub Actions

\\section{Education \\& Credentials}
\\textbf{B.Tech in Computer Science} \\hfill \\textit{2017 -- 2021}\\\\
University of Technology, San Francisco, CA

\\vspace{3pt}
\\textbf{Certifications:} OSCP (Offensive Security Certified Professional) \\quad$|$\\quad Advanced Cyber Security Training

\\end{document}`;

export const LATEX_COMPACT = `%% Ultra-Compact LaTeX Resume — High Density
\\documentclass[9pt,letterpaper]{article}
\\usepackage[top=0.4in,bottom=0.4in,left=0.5in,right=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{titlesec}

\\definecolor{accent}{HTML}{0EA5E9} % Tech Cyan
\\titleformat{\\section}{\\large\\bfseries\\color{accent}\\MakeUppercase}{}{0em}{}[{\\color{accent}\\titlerule}]
\\titlespacing*{\\section}{0pt}{6pt}{4pt}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{2pt}
\\hypersetup{colorlinks=true,urlcolor=accent}

\\begin{document}
\\pagestyle{empty}

{\\LARGE\\bfseries YOUR NAME} \\hfill your@email.com $\\cdot$ +1 (555) 123-4567\\\\
{\\normalsize\\textit{Senior Frontend \\& Systems Engineer}} \\hfill \\href{https://linkedin.com/in/yourname}{linkedin.com/in/yourname} $\\cdot$ \\href{https://github.com/yourusername}{github.com/yourusername}

\\noindent\\textcolor{accent}{\\rule{\\linewidth}{1pt}}

\\section{Profile}
Full-stack engineer with 5+ years shipping secure, high-performance web and mobile products. Expert in the React and Flutter ecosystems, deeply integrated with Linux systems and modern cybersecurity practices.

\\section{Experience}

\\textbf{Lead Software Engineer} \\hfill \\textit{Jan 2023 -- Present}\\\\
\\textit{Cybernetics Inc. $\\cdot$ San Francisco, CA}
\\begin{itemize}[nosep,leftmargin=1em,topsep=2pt,itemsep=1pt]
\\item Rewrote the legacy frontend monolith into Next.js micro-frontends, achieving 100/100 Lighthouse scores.
\\item Engineered a secure, real-time event dashboard processing 15k+ req/sec using React and WebSockets.
\\item Hardened deployment infrastructure by configuring custom Linux (Gentoo) environments and strict CSPs.
\\item Led a tactical squad of 5 devs; implemented strict TDD and security audits, bringing crash rates to 0.01\\%.
\\end{itemize}

\\textbf{Frontend Developer} \\hfill \\textit{2020 -- 2022}\\\\
\\textit{DataFlow LLC $\\cdot$ Remote}
\\begin{itemize}[nosep,leftmargin=1em,topsep=2pt,itemsep=1pt]
\\item Built cross-platform utility applications in Flutter for secure internal communications.
\\item Containerized 20+ legacy apps using Docker, standardizing deployment across staging and production.
\\item Conducted internal cyber security audits, identifying and patching XSS and CSRF vulnerabilities.
\\end{itemize}

\\section{Projects}
\\textbf{Alpha Engine} --- Open-source 2D physics engine handling 10k+ rigid bodies at 60FPS. \\textit{Rust, WebAssembly}

\\textbf{Nexus CLI} --- NPM package downloaded 5k+ times/month. Scaffolds secure full-stack apps. \\textit{TypeScript, CLI}

\\textbf{Phantom Distro} --- Custom hardened Arch Linux build for penetration testing. \\textit{Linux Kernel, Bash}

\\section{Technical Arsenal}
\\textbf{Frontend:} React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion\\\\
\\textbf{Mobile \\& Systems:} Flutter, Dart, Linux (Arch/Gentoo), Bash Scripting, Rust\\\\
\\textbf{Security \\& Cloud:} Web Security (XSS/CSRF), Penetration Testing, Docker, AWS, GitHub Actions

\\section{Education \\& Certifications}
\\textbf{B.Tech Computer Science} \\hfill University Name $\\cdot$ \\textit{2017 -- 2021}\\\\
OSCP Certified $\\cdot$ AWS Security Specialty

\\end{document}`;

export const LATEX_MODERN = `%% Modern CV — Sleek Tabular Layout
\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{tabularx}
\\usepackage{xcolor}

\\definecolor{textdark}{HTML}{111827}
\\definecolor{textlight}{HTML}{6B7280}
\\setlength{\\parindent}{0pt}
\\hypersetup{colorlinks=true,urlcolor=textdark}

\\newcommand{\\sectionrule}{\\vspace{2pt}\\noindent\\rule{\\linewidth}{0.5pt}\\vspace{4pt}}
\\newcommand{\\sectiontitle}[1]{\\vspace{8pt}{\\large\\bfseries\\color{textdark} #1}\\\\\\sectionrule}

\\begin{document}
\\pagestyle{empty}

\\begin{tabularx}{\\textwidth}{@{}X r@{}}
  {\\Huge\\bfseries Your Name} & your@email.com \\\\
  {\\large\\itshape Senior Frontend \\& Mobile Engineer} & +1 (555) 123-4567 \\\\
  & \\href{https://linkedin.com/in/yourname}{linkedin/yourname} \\\\
  & \\href{https://github.com/yourusername}{github/yourusername}
\\end{tabularx}

\\sectiontitle{Summary}
Product-minded frontend developer with a keen eye for modern aesthetics and deep tech integration. Passionate about performant user interfaces, cross-platform mobile development (Flutter), and bridging the gap between pixel-perfect UIs and robust backend security.

\\sectiontitle{Experience}

\\textbf{Senior Frontend Engineer} \\hfill Company Name \\quad \\textit{Jan 2023 -- Present}
\\begin{itemize}[nosep,leftmargin=1.2em,topsep=3pt,itemsep=2pt]
\\item Spearheaded the migration of a legacy monolithic architecture to a component-driven React architecture, drastically improving maintainability and developer velocity.
\\item Implemented strict Content Security Policies (CSP) and mitigated XSS vulnerabilities across the platform.
\\item Led legacy migration: load times decreased by 40\\%, Core Web Vitals improved across all pages.
\\item Established CI/CD and code review standards for an 8-person engineering team using GitHub Actions.
\\end{itemize}

\\vspace{4pt}
\\textbf{Software Engineer} \\hfill Previous Company \\quad \\textit{2020 -- 2022}
\\begin{itemize}[nosep,leftmargin=1.2em,topsep=3pt,itemsep=2pt]
\\item Developed highly responsive cross-platform mobile applications using Flutter and Dart.
\\item Automated deployment pipelines for mobile builds, cutting release cycles from 2 weeks to 2 days.
\\item Managed and hardened Linux-based deployment servers (Arch/Gentoo) for internal microservices.
\\end{itemize}

\\sectiontitle{Projects}

\\textbf{CyberDash} \\quad Real-time security event dashboard, sub-200ms latency \\hfill \\textit{React, WebSockets}

\\textbf{SecureComms} \\quad Encrypted cross-platform mobile messaging app \\hfill \\textit{Flutter, Dart}

\\textbf{Phantom OS} \\quad Custom hardened Arch Linux distro for developers \\hfill \\textit{Linux Kernel, Bash}

\\sectiontitle{Skills}

\\textbf{Frontend:} React, Next.js, JavaScript, TypeScript, Tailwind CSS, Zustand, HTML/CSS

\\textbf{Mobile \\& Systems:} Flutter, Dart, Linux (Arch/Gentoo), Data Structures \\& Algorithms

\\textbf{Security \\& DevOps:} Web Security, XSS/CSRF Mitigation, Docker, Git, CI/CD, AWS

\\sectiontitle{Education \\& Certifications}

\\textbf{B.Tech in Computer Science} \\hfill University Name \\quad \\textit{2017 -- 2021}

\\vspace{3pt}
OSCP Certified \\quad $|$ \\quad Advanced Cyber Security Training

\\end{document}`;

export const LATEX_TWO_COLUMN = `%% Two-Column Tech/Cyber Layout
\\documentclass[9.5pt,letterpaper]{article}
\\usepackage[top=0.4in,bottom=0.4in,left=0.4in,right=0.4in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{multicol}

\\definecolor{accent}{HTML}{8B5CF6} % Deep Purple / Cyber aesthetic
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{2pt}
\\hypersetup{colorlinks=true,urlcolor=accent}

\\newcommand{\\sect}[1]{\\vspace{6pt}{\\large\\bfseries\\color{accent}\\MakeUppercase{#1}}\\\\\\noindent\\textcolor{accent!40}{\\rule{\\linewidth}{0.5pt}}\\vspace{3pt}}

\\begin{document}
\\pagestyle{empty}

% ── Header ──────────────────────────────────────────────────────────────────
{\\Huge\\bfseries YOUR NAME}\\hfill{\\small your@email.com $\\cdot$ +1 (555) 123-4567}\\\\
{\\large\\itshape Frontend \\& Security Engineer}\\hfill{\\small\\href{https://linkedin.com/in/yourname}{linkedin/yourname} $\\cdot$ \\href{https://github.com/yourusername}{github/yourusername}}

\\noindent\\textcolor{accent}{\\rule{\\linewidth}{1.5pt}}
\\vspace{4pt}

% ── Two Columns ─────────────────────────────────────────────────────────────
\\begin{minipage}[t]{0.65\\textwidth}

\\sect{Execution Log (Experience)}

\\textbf{Security-Focused Frontend Lead}\\hfill\\textit{Jan 2023 -- Present}\\\\
\\textit{CyberShield Networks}\\vspace{2pt}
\\begin{itemize}[nosep,leftmargin=1.2em,topsep=1pt,itemsep=2pt]
\\item Engineered a robust, highly secure React dashboard for threat monitoring, utilizing strict CSPs.
\\item Architected deep Linux server hardening protocols for deployment environments (Arch/Gentoo).
\\item Led the migration to Next.js and TypeScript, resulting in a 60\\% improvement in Lighthouse scores.
\\item Mentored a team of 5 in secure coding practices, eliminating critical vulnerabilities in staging.
\\end{itemize}

\\vspace{4pt}
\\textbf{Full-Stack \\& Mobile Developer}\\hfill\\textit{2020 -- 2022}\\\\
\\textit{FinTech Secure}\\vspace{2pt}
\\begin{itemize}[nosep,leftmargin=1.2em,topsep=1pt,itemsep=2pt]
\\item Built cross-platform utility applications in Flutter for secure internal financial communications.
\\item Developed complex trading interfaces using React and WebSockets with zero frame drops.
\\item Conducted internal cyber security audits, patching SQL injection and SSRF vulnerabilities.
\\end{itemize}

\\vspace{6pt}
\\sect{Deployed Modules (Projects)}

\\textbf{CyberDash} \\hfill \\textit{React, WebSockets, Tailwind}\\\\
Cyberpunk-themed analytics dashboard for monitoring network traffic. Features complex data visualization and real-time updates.

\\vspace{3pt}
\\textbf{Phantom OS} \\hfill \\textit{Bash, Linux Kernel}\\\\
Custom hardened Linux distribution based on Arch Linux. Configured for penetration testing and secure frontend environments.

\\vspace{3pt}
\\textbf{SecureComms} \\hfill \\textit{Flutter, Dart}\\\\
End-to-end encrypted messaging application for enterprise use.

\\end{minipage}%
\\hfill
\\begin{minipage}[t]{0.32\\textwidth}

\\sect{System Profile}

{\\small Frontend Developer with a heavy focus on deep tech, cybersecurity, and system architecture. I specialize in the React and Flutter ecosystems while maintaining a deep understanding of Linux internals.}

\\vspace{6pt}
\\sect{Core Dependencies}

\\textbf{[ Frontend ]}\\\\
React, Next.js, TypeScript\\\\
JavaScript, Tailwind CSS\\\\
Zustand, Framer Motion

\\vspace{3pt}
\\textbf{[ Mobile \\& Systems ]}\\\\
Flutter, Dart\\\\
Linux (Arch/Gentoo)\\\\
Bash Scripting

\\vspace{3pt}
\\textbf{[ Security \\& DevOps ]}\\\\
Cybersecurity Auditing\\\\
Penetration Testing\\\\
Docker, GitHub Actions

\\vspace{6pt}
\\sect{Credentials}

\\textbf{B.S. Computer Science}\\\\
University of Technology\\\\
\\textit{2017 -- 2021}

\\vspace{3pt}
\\textbf{Certifications}\\\\
OSCP Certified\\\\
Advanced Cyber Security

\\end{minipage}

\\end{document}`;

export const LATEX_CLEAN_LINES = `%% Clean Lines — Ultimate Minimalist Density
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
{\\large\\itshape Frontend \\& Systems Engineer}\\\\[4pt]
{\\small your@email.com \\quad\\textbullet\\quad +1 (555) 123-4567 \\quad\\textbullet\\quad \\href{https://linkedin.com/in/yourname}{linkedin.com/in/yourname} \\quad\\textbullet\\quad \\href{https://github.com/yourusername}{github.com/yourusername}}
\\end{center}

\\vspace{-2pt}\\rule{\\linewidth}{1.5pt}\\vspace{2pt}

\\rsection{Professional Summary}

Performance-driven engineer bridging the gap between pixel-perfect React/Flutter interfaces and deep system architecture. Expert in modern frontend ecosystems, Linux server hardening (Arch/Gentoo), and cybersecurity practices. Consistent track record of accelerating delivery while maintaining rigorous security standards.

\\rsection{Experience}

\\rjob{Senior Frontend Engineer}{Company Name}{Jan 2023 -- Present}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=2pt,itemsep=2pt]
\\item Architected an event-driven micro-frontend system using Next.js, reducing build times by 45\\% and enabling independent deployments for 4 engineering squads.
\\item Implemented strict Content Security Policies (CSP) and mitigated XSS vulnerabilities across the primary SaaS dashboard serving 50,000+ daily active users.
\\item Established CI/CD pipelines (GitHub Actions) and containerized development environments using Docker, eliminating "works on my machine" issues.
\\end{itemize}

\\vspace{4pt}
\\rjob{Software Developer (Mobile \\& Web)}{Previous Company}{2020 -- 2022}
\\begin{itemize}[nosep,leftmargin=1.5em,topsep=2pt,itemsep=2pt]
\\item Developed high-performance cross-platform mobile applications using Flutter and Dart, reducing codebase maintenance overhead by 50\\% compared to native equivalents.
\\item Managed and hardened Linux-based deployment servers, optimizing Nginx configurations and firewall rules.
\\item Conducted internal security audits on legacy codebases, identifying and patching critical vulnerabilities.
\\end{itemize}

\\rsection{Projects}

\\textbf{CyberDash} \\hfill \\textit{React, Next.js, WebSockets, Tailwind CSS}\\\\
Real-time security analytics dashboard capable of rendering 10,000+ events per second with sub-200ms latency.

\\smallskip
\\textbf{Phantom OS} \\hfill \\textit{Arch Linux, Bash, C}\\\\
Open-source custom hardened Linux distribution optimized for secure development and penetration testing.

\\smallskip
\\textbf{SecureComms} \\hfill \\textit{Flutter, Dart, WebRTC}\\\\
End-to-end encrypted cross-platform mobile messaging application for internal enterprise usage.

\\rsection{Technical Skills}

\\textbf{Frontend:} React, Next.js, JavaScript, TypeScript, Tailwind CSS, Zustand, Framer Motion\\\\
\\textbf{Mobile \\& Systems:} Flutter, Dart, Linux (Arch/Gentoo), Bash Scripting, Data Structures \\& Algorithms\\\\
\\textbf{Security \\& DevOps:} Cyber Security, Penetration Testing, Docker, Git, CI/CD, GitHub Actions

\\rsection{Education \\& Certifications}

\\textbf{B.Tech in Computer Science} \\hfill University Name, 2017 -- 2021

\\smallskip
OSCP (Offensive Security Certified Professional) \\quad $|$ \\quad Advanced Cyber Security Training

\\end{document}`;
