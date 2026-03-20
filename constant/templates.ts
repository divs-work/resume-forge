import type { EditorMode } from "@/types/resume";

type ContentMap = Record<EditorMode, string>;

export const TEMPLATES: ContentMap = {
  latex: `%% ATS-Friendly LaTeX Resume
\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\setlength{\\parindent}{0pt}

\\begin{document}

\\begin{center}
{\\LARGE\\bfseries Your Name} \\\\[4pt]
\\textit{Your Title} \\\\[4pt]
your@email.com \\quad|\\quad \\href{https://yourwebsite.com}{yourwebsite.com} \\\\
\\href{https://linkedin.com/in/yourprofile}{linkedin.com/in/yourprofile} \\quad|\\quad \\href{https://github.com/yourusername}{github.com/yourusername}
\\end{center}

\\section{Experience}

\\textbf{Senior Software Engineer} \\hfill \\textit{Jan 2023 -- Present} \\\\
\\textit{Company Name \\quad|\\quad Full-time \\quad|\\quad Location}
\\begin{itemize}[nosep, leftmargin=*]
\\item Delivered feature X that increased user retention by Y\\%
\\item Built end-to-end system Z, reducing manual effort by N hours per week
\\item Led migration from legacy stack to modern architecture, cutting load times by 40\\%
\\item Collaborated with product and design to ship N features across web and mobile
\\item Established code review standards and CI/CD pipelines across a team of N engineers
\\end{itemize}

\\textbf{Software Engineer} \\hfill \\textit{Jun 2021 -- Dec 2022} \\\\
\\textit{Previous Company \\quad|\\quad Full-time \\quad|\\quad Location}
\\begin{itemize}[nosep, leftmargin=*]
\\item Owned development of core product module used by N+ daily active users
\\item Improved API response times by X\\% through query optimisation and caching
\\item Shipped N integrations with third-party services, expanding platform capabilities
\\end{itemize}

\\section{Projects}
\\textbf{Project Alpha} — Brief description of what it does and the problem it solves. Highlight scale or impact. \\textit{Tech, Stack, Here} \\\\[4pt]
\\textbf{Project Beta} — Brief description of what it does and the problem it solves. Highlight scale or impact. \\textit{Tech, Stack, Here} \\\\[4pt]
\\textbf{Project Gamma} — Brief description of what it does and the problem it solves. Highlight scale or impact. \\textit{Tech, Stack, Here}

\\section{Skills}
\\textbf{Frontend \\& Mobile:} React, React Native, Next.js, TypeScript, JavaScript, Tailwind CSS \\\\
\\textbf{Backend \\& Infrastructure:} Node.js, Python, REST APIs, AWS, Docker, Nginx, CI/CD \\\\
\\textbf{Tools \\& Practices:} Git, Agile, System Design, Code Review, Technical Documentation

\\section{Education}
\\textbf{B.Tech / M.Tech in Computer Science} \\hfill \\textit{2018 -- 2022} \\\\
University Name, Location

\\section{Achievements}
\\begin{itemize}[nosep, leftmargin=*]
\\item \\textbf{Achievement One} — One-line description of impact or recognition
\\item \\textbf{Achievement Two} — One-line description of impact or recognition
\\end{itemize}

\\end{document}`,

  markdown: `# Your Name

**Your Title**

your@email.com | [yourwebsite.com](https://yourwebsite.com) | [LinkedIn](https://linkedin.com/in/yourprofile) | [GitHub](https://github.com/yourusername)



## Experience

### Senior Software Engineer
**Company Name** · Full-time · Location | *Jan 2023 – Present*

- Delivered feature X that increased user retention by Y%
- Built end-to-end system Z, reducing manual effort by N hours per week
- Led migration from legacy stack to modern architecture, cutting load times by 40%
- Collaborated with product and design to ship N features across web and mobile
- Established code review standards and CI/CD pipelines across a team of N engineers

### Software Engineer
**Previous Company** · Full-time · Location | *Jun 2021 – Dec 2022*

- Owned development of core product module used by N+ daily active users
- Improved API response times by X% through query optimisation and caching
- Shipped N integrations with third-party services, expanding platform capabilities


## Projects

**Project Alpha** — Brief description of what it does and the problem it solves. Highlight scale or impact. *Tech, Stack, Here*

**Project Beta** — Brief description of what it does and the problem it solves. Highlight scale or impact. *Tech, Stack, Here*

**Project Gamma** — Brief description of what it does and the problem it solves. Highlight scale or impact. *Tech, Stack, Here*

## Skills

**Frontend & Mobile:** React, React Native, Next.js, TypeScript, JavaScript, Tailwind CSS
**Backend & Infrastructure:** Node.js, Python, REST APIs, AWS, Docker, Nginx, CI/CD
**Tools & Practices:** Git, Agile, System Design, Code Review, Technical Documentation


## Education

### B.Tech / M.Tech in Computer Science
**University Name, Location** | *2018 – 2022*


## Achievements

- **Achievement One** — One-line description of impact or recognition
- **Achievement Two** — One-line description of impact or recognition`,

  html: `<!-- ATS-Friendly HTML Resume — Edit with Tailwind classes -->
<div class="w-full font-['DM_Sans',sans-serif] text-[#1a1a1a] px-5 py-5">

  <!-- HEADER -->
  <header class="border-l-[3px] border-[#2563eb] pl-5 mb-5">
    <h1 class="font-['Instrument_Serif',serif] text-[38px] leading-[1.05] tracking-[-0.02em]">Your Name</h1>
    <p class="text-[13px] text-[#666] mt-1 tracking-[0.04em] uppercase font-light">Your Title</p>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] font-['JetBrains_Mono',monospace] text-[#999] mt-3">
      <span class="text-[#555]">your@email.com</span>
      <span class="text-[#d0d0d0]">│</span>
      <a href="https://yourwebsite.com" class="text-[#2563eb] hover:underline">yourwebsite.com</a>
      <span class="text-[#d0d0d0]">│</span>
      <a href="https://linkedin.com/in/yourprofile" class="text-[#2563eb] hover:underline">linkedin.com/in/yourprofile</a>
      <span class="text-[#d0d0d0]">│</span>
      <a href="https://github.com/yourusername" class="text-[#2563eb] hover:underline">github.com/yourusername</a>
    </div>
  </header>

  <!-- SUMMARY -->
  <div class="bg-[#f8f8f6] rounded-md px-5 py-3.5 mb-5">
    <p class="text-[12px] text-[#444] leading-[1.75]">
      Results-driven engineer with X+ years of experience building scalable web and mobile products. Strong across the full stack — from pixel-level frontend work to production deployments, CI/CD, and infrastructure. Thrives in fast-moving, ownership-driven environments where engineering meets product thinking.
    </p>
  </div>

  <!-- EXPERIENCE -->
  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Experience</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>

    <!-- Job 1 -->
    <div class="flex gap-3.5 mb-4">
      <div class="flex flex-col items-center pt-0.75">
        <div class="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 ring-[3px] ring-[#2563eb]/10"></div>
        <div class="w-px bg-linear-to-b from-[#2563eb]/30 to-[#e4e4e0] grow mt-1"></div>
      </div>
      <div class="flex-1">
        <div class="flex items-baseline justify-between flex-wrap gap-x-3">
          <div>
            <h3 class="font-semibold text-[13px] text-[#111]">Senior Software Engineer</h3>
            <p class="text-[12px] text-[#777] mt-0.5">Company Name <span class="text-[#ccc] mx-1">·</span> Full-time <span class="text-[#ccc] mx-1">·</span> Location</p>
          </div>
          <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#aaa] bg-[#f5f5f3] px-2 py-0.5 rounded">Jan 2023 — Present</p>
        </div>
        <ul class="mt-2 space-y-1">
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Delivered feature X that increased user retention by Y%</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Built end-to-end system Z, reducing manual effort by N hours per week</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Led migration from legacy stack to modern architecture, cutting load times by 40%</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Collaborated with product and design to ship N features across web and mobile</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Established code review standards and CI/CD pipelines across a team of N engineers</li>
        </ul>
      </div>
    </div>

    <!-- Job 2 -->
    <div class="flex gap-3.5">
      <div class="flex flex-col items-center pt-0.75">
        <div class="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 ring-[3px] ring-[#2563eb]/10"></div>
      </div>
      <div class="flex-1">
        <div class="flex items-baseline justify-between flex-wrap gap-x-3">
          <div>
            <h3 class="font-semibold text-[13px] text-[#111]">Software Engineer</h3>
            <p class="text-[12px] text-[#777] mt-0.5">Previous Company <span class="text-[#ccc] mx-1">·</span> Full-time <span class="text-[#ccc] mx-1">·</span> Location</p>
          </div>
          <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#aaa] bg-[#f5f5f3] px-2 py-0.5 rounded">Jun 2021 — Dec 2022</p>
        </div>
        <ul class="mt-2 space-y-1">
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Owned development of core product module used by N+ daily active users</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Improved API response times by X% through query optimisation and caching</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Shipped N integrations with third-party services, expanding platform capabilities</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Projects</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>

    <div class="grid grid-cols-3 gap-3">

      <div class="border border-[#e8e8e4] rounded-lg p-3 bg-linear-to-br from-white to-[#fafaf8] hover:border-[#2563eb]/20 hover:shadow-sm transition-all">
        <div class="flex items-center gap-1.5 mb-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
          <h4 class="font-semibold text-[12px] text-[#111]">Project Alpha</h4>
        </div>
        <p class="text-[10.5px] text-[#666] leading-[1.6]">Brief description of what it does and the problem it solves. Highlight scale or impact.</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Tech</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Stack</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Here</span>
        </div>
      </div>

      <div class="border border-[#e8e8e4] rounded-lg p-3 bg-linear-to-br from-white to-[#fafaf8] hover:border-[#2563eb]/20 hover:shadow-sm transition-all">
        <div class="flex items-center gap-1.5 mb-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
          <h4 class="font-semibold text-[12px] text-[#111]">Project Beta</h4>
        </div>
        <p class="text-[10.5px] text-[#666] leading-[1.6]">Brief description of what it does and the problem it solves. Highlight scale or impact.</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Tech</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Stack</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Here</span>
        </div>
      </div>

      <div class="border border-[#e8e8e4] rounded-lg p-3 bg-linear-to-br from-white to-[#fafaf8] hover:border-[#2563eb]/20 hover:shadow-sm transition-all">
        <div class="flex items-center gap-1.5 mb-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
          <h4 class="font-semibold text-[12px] text-[#111]">Project Gamma</h4>
        </div>
        <p class="text-[10.5px] text-[#666] leading-[1.6]">Brief description of what it does and the problem it solves. Highlight scale or impact.</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Tech</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Stack</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Here</span>
        </div>
      </div>

    </div>
  </section>

  <!-- SKILLS -->
  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Skills</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>

    <div class="space-y-2.5">
      <div>
        <p class="font-semibold text-[10.5px] text-[#333] mb-1.5 tracking-wide uppercase">Frontend &amp; Mobile</p>
        <div class="flex flex-wrap gap-1.5">
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">React</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Next.js</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">TypeScript</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">JavaScript</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Tailwind CSS</span>
        </div>
      </div>
      <div>
        <p class="font-semibold text-[10.5px] text-[#333] mb-1.5 tracking-wide uppercase">Backend &amp; Infrastructure</p>
        <div class="flex flex-wrap gap-1.5">
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Node.js</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Python</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">REST APIs</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">AWS</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Docker</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">CI/CD</span>
        </div>
      </div>
      <div>
        <p class="font-semibold text-[10.5px] text-[#333] mb-1.5 tracking-wide uppercase">Tools &amp; Practices</p>
        <div class="flex flex-wrap gap-1.5">
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Git</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Agile</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">System Design</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Code Review</span>
        </div>
      </div>
    </div>
  </section>

  <!-- EDUCATION + ACHIEVEMENTS -->
  <div class="grid grid-cols-2 gap-6">

    <section>
      <div class="flex items-center gap-3 mb-3">
        <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Education</p>
        <div class="h-px bg-[#e4e4e0] flex-1"></div>
      </div>
      <div class="space-y-2.5">
        <div class="border-l-2 border-[#2563eb]/20 pl-3">
          <h3 class="font-semibold text-[12px] text-[#111]">B.Tech / M.Tech in Computer Science</h3>
          <p class="text-[11px] text-[#777]">University Name <span class="font-['JetBrains_Mono',monospace] text-[10px] text-[#aaa] ml-1">2018 — 2022</span></p>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center gap-3 mb-3">
        <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Achievements</p>
        <div class="h-px bg-[#e4e4e0] flex-1"></div>
      </div>
      <ul class="space-y-1.5">
        <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50"><span class="font-semibold text-[#111]">Achievement One</span> — One-line description of impact or recognition</li>
        <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50"><span class="font-semibold text-[#111]">Achievement Two</span> — One-line description of impact or recognition</li>
      </ul>
    </section>

  </div>

</div>`,
};
