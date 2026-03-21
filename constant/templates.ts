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
{\\LARGE\\bfseries Your Name}

\\textit{Senior Software Engineer}

your@email.com \\quad|\\quad +1 (555) 123-4567 \\quad|\\quad San Francisco, CA

\\href{https://linkedin.com/in/yourname}{linkedin.com/in/yourname} \\quad|\\quad \\href{https://github.com/yourusername}{github.com/yourusername}
\\end{center}

Summary

Full-stack engineer with over 5 years building scalable web and mobile products. Strong analytical thinking and cross-functional collaboration. Proven track record of reducing costs, accelerating delivery, and mentoring engineers in environments that value ownership and velocity.

Experience
\\section{Experience}

\\textbf{Senior Software Engineer} \\hfill \\textit{Jan 2023 -- Present}

\\textit{Company Name \\quad|\\quad Full-time \\quad|\\quad San Francisco, CA}
\\begin{itemize}[nosep, leftmargin=*]
\\item Delivered feature X that increased user retention by 35\\%, serving 50,000+ daily active users across web and mobile
\\item Architected end-to-end system Z, reducing manual effort by 12 hours per week and saving \\$80K annually in operational costs
\\item Led migration from legacy stack to modern architecture, cutting load times by 40\\% and improving Core Web Vitals scores
\\item Collaborated with cross-functional product and design teams to deploy 5 features in quarterly sprints
\\item Established code review standards and CI/CD pipelines, improving deployment velocity across a team of 8 engineers
\\end{itemize}

\\textbf{Software Engineer} \\hfill \\textit{2021 -- 2022}

\\textit{Previous Company \\quad|\\quad Full-time \\quad|\\quad San Francisco, CA}
\\begin{itemize}[nosep, leftmargin=*]
\\item Developed core product module processing 2M+ requests per month with 99.9\\% uptime on AWS infrastructure
\\item Optimized API response times by 60\\% through query refactoring, caching with Redis, and database indexing
\\item Integrated 12 third-party services via REST APIs, expanding platform capabilities for 3,000 active users
\\item Automated deployment pipeline using Docker and GitHub Actions, reducing release cycle from 2 weeks to 2 days
\\item Resolved critical production incidents through root cause analysis, achieving 99.95\\% quarterly uptime
\\end{itemize}

\\section{Projects}

\\textbf{Project Alpha} --- Scalable real-time dashboard processing 10,000 events per second with sub-200ms latency. \\textit{React, Node.js, WebSocket, Redis}

\\textbf{Project Beta} --- CLI tool automating cloud infrastructure provisioning for 50+ microservices across staging and production. \\textit{Python, Terraform, AWS}

\\textbf{Project Gamma} --- Open-source monitoring and observability library adopted by 500+ developers on GitHub. \\textit{TypeScript, Prometheus, Grafana}

\\section{Education}
\\textbf{B.Tech in Computer Science} \\hfill \\textit{2017 -- 2021}

University Name, San Francisco, CA

\\section{Certifications}
AWS Certified Solutions Architect --- Associate

\\section{Skills}
\\textbf{Frontend \\& Mobile:} React, React Native, Next.js, TypeScript, JavaScript, Tailwind CSS

\\textbf{Backend \\& Infrastructure:} Node.js, Python, Django, REST APIs, GraphQL, AWS, Docker, Redis, PostgreSQL, Nginx, CI/CD

\\textbf{Tools \\& Practices:} Git, Agile, Scrum, Terraform, GitHub Actions, Monitoring, Code Review, Observability

\\section{Achievements}
--- Reduced infrastructure costs by 30\\% through strategic cloud resource optimization and capacity planning

--- Mentored 3 junior engineers, establishing pair programming and continuous learning practices across the team

\\end{document}`,

  markdown: `# Your Name

**Senior Software Engineer**

your@email.com | +1 (555) 123-4567 | San Francisco, CA | [LinkedIn](https://linkedin.com/in/yourname) | [GitHub](https://github.com/yourusername)


## Summary

Full-stack engineer with over 5 years building scalable web and mobile products. Strong analytical thinking and cross-functional collaboration. Proven track record of reducing costs, accelerating delivery, and mentoring engineers in environments that value ownership and velocity.


## Experience

### Senior Software Engineer
**Company Name** | Full-time | San Francisco, CA | *Jan 2023 – Present*

- Delivered feature X that increased user retention by 35%, serving 50,000+ daily active users across web and mobile
- Architected end-to-end system Z, reducing manual effort by 12 hours per week and saving $80K annually in operational costs
- Led migration from legacy stack to modern architecture, cutting load times by 40% and improving Core Web Vitals scores
- Collaborated with cross-functional product and design teams to deploy 5 features in quarterly sprints
- Established code review standards and CI/CD pipelines, improving deployment velocity across a team of 8 engineers

### Software Engineer
**Previous Company** | Full-time | San Francisco, CA | *2021 – 2022*

- Developed core product module processing 2M+ requests per month with 99.9% uptime on AWS infrastructure
- Optimized API response times by 60% through query refactoring, caching with Redis, and database indexing
- Integrated 12 third-party services via REST APIs, expanding platform capabilities for 3,000 active users
- Automated deployment pipeline using Docker and GitHub Actions, reducing release cycle from 2 weeks to 2 days


## Projects

**Project Alpha** — Scalable real-time dashboard processing 10,000 events per second with sub-200ms latency. *React, Node.js, WebSocket, Redis*

**Project Beta** — CLI tool automating cloud infrastructure provisioning for 50+ microservices across staging and production. *Python, Terraform, AWS*

**Project Gamma** — Open-source monitoring and observability library adopted by 500+ developers on GitHub. *TypeScript, Prometheus, Grafana*


## Education

### B.Tech in Computer Science
**University Name, San Francisco, CA** | *2017 – 2021*


## Certifications

AWS Certified Solutions Architect — Associate


## Skills

**Frontend & Mobile:** React, React Native, Next.js, TypeScript, JavaScript, Tailwind CSS
**Backend & Infrastructure:** Node.js, Python, Django, REST APIs, GraphQL, AWS, Docker, Redis, PostgreSQL, Nginx, CI/CD
**Tools & Practices:** Git, Agile, Scrum, Terraform, GitHub Actions, Monitoring, Code Review, Observability


## Achievements

- Reduced infrastructure costs by 30% through strategic cloud resource optimization and capacity planning
- Mentored 3 junior engineers, establishing pair programming and continuous learning practices across the team`,

  html: `<div class="w-full font-['DM_Sans',sans-serif] text-[#1a1a1a] px-5 py-5"><div class="border-l-[3px] border-[#2563eb] pl-5 mb-5"><h1 class="font-['Instrument_Serif',serif] text-[38px] leading-[1.05] tracking-[-0.02em]">Your Name</h1>
    <p class="text-[13px] text-[#666] mt-1 tracking-[0.04em] uppercase font-light">Senior Software Engineer</p>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] font-['JetBrains_Mono',monospace] text-[#999] mt-3">
      <span class="text-[#555]">your@email.com</span>
      <span class="text-[#d0d0d0]">|</span>
      <span class="text-[#555]">+1 (555) 123-4567</span>
      <span class="text-[#d0d0d0]">|</span>
      <span class="text-[#555]">San Francisco, CA</span>
      <span class="text-[#d0d0d0]">|</span>
      <a href="https://linkedin.com/in/yourname" class="text-[#2563eb] hover:underline">linkedin.com/in/yourname</a>
      <span class="text-[#d0d0d0]">|</span>
      <a href="https://github.com/yourusername" class="text-[#2563eb] hover:underline">github.com/yourusername</a>
    </div>
  </div>

  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Summary</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>
    <div class="bg-[#f8f8f6] rounded-md px-5 py-3.5">
      <p class="text-[12px] text-[#444] leading-[1.75]">
        Full-stack engineer with over 5 years building scalable web and mobile products. Strong analytical thinking and cross-functional collaboration. Proven track record of reducing costs, accelerating delivery, and mentoring engineers in environments that value ownership and velocity.
      </p>
    </div>
  </section>
Experience
  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Experience</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>

    <div class="flex gap-3.5 mb-4">
      <div class="flex flex-col items-center pt-0.75">
        <div class="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 ring-[3px] ring-[#2563eb]/10"></div>
        <div class="w-px bg-linear-to-b from-[#2563eb]/30 to-[#e4e4e0] grow mt-1"></div>
      </div>
      <div class="flex-1">
        <div class="flex items-baseline justify-between flex-wrap gap-x-3">
          <div>
            <h3 class="font-semibold text-[13px] text-[#111]">Senior Software Engineer</h3>
            <p class="text-[12px] text-[#777] mt-0.5">Company Name <span class="text-[#ccc] mx-1">|</span> Full-time <span class="text-[#ccc] mx-1">|</span> San Francisco, CA</p>
          </div>
          <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#aaa] bg-[#f5f5f3] px-2 py-0.5 rounded">Jan 2023 - Present</p>
        </div>
        <ul class="mt-2 space-y-1">
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Delivered feature X that increased user retention by 35%, serving 50,000+ daily active users across web and mobile</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Architected end-to-end system Z, reducing manual effort by 12 hours per week and saving $80K annually in operational costs</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Led migration from legacy stack to modern architecture, cutting load times by 40% and improving Core Web Vitals scores</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Collaborated with cross-functional product and design teams to deploy 5 features in quarterly sprints</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Established code review standards and CI/CD pipelines, improving deployment velocity across a team of 8 engineers</li>
        </ul>
      </div>
    </div>

    <div class="flex gap-3.5">
      <div class="flex flex-col items-center pt-0.75">
        <div class="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 ring-[3px] ring-[#2563eb]/10"></div>
      </div>
      <div class="flex-1">
        <div class="flex items-baseline justify-between flex-wrap gap-x-3">
          <div>
            <h3 class="font-semibold text-[13px] text-[#111]">Software Engineer</h3>
            <p class="text-[12px] text-[#777] mt-0.5">Previous Company <span class="text-[#ccc] mx-1">|</span> Full-time <span class="text-[#ccc] mx-1">|</span> San Francisco, CA</p>
          </div>
          <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#aaa] bg-[#f5f5f3] px-2 py-0.5 rounded">2021 - 2022</p>
        </div>
        <ul class="mt-2 space-y-1">
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Developed core product module processing 2M+ requests per month with 99.9% uptime on AWS infrastructure</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Optimized API response times by 60% through query refactoring, caching with Redis, and database indexing</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Integrated 12 third-party services via REST APIs, expanding platform capabilities for 3,000 active users</li>
          <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Automated deployment pipeline using Docker and GitHub Actions, reducing release cycle from 2 weeks to 2 days</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Projects</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>

    <div class="space-y-3">

      <div class="border border-[#e8e8e4] rounded-lg p-3 bg-linear-to-br from-white to-[#fafaf8] hover:border-[#2563eb]/20 hover:shadow-sm transition-all">
        <div class="flex items-center gap-1.5 mb-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
          <h4 class="font-semibold text-[12px] text-[#111]">Project Alpha</h4>
        </div>
        <p class="text-[10.5px] text-[#666] leading-[1.6]">Scalable real-time dashboard processing 10,000 events per second with sub-200ms latency.</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">React</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Node.js</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">WebSocket</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Redis</span>
        </div>
      </div>

      <div class="border border-[#e8e8e4] rounded-lg p-3 bg-linear-to-br from-white to-[#fafaf8] hover:border-[#2563eb]/20 hover:shadow-sm transition-all">
        <div class="flex items-center gap-1.5 mb-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
          <h4 class="font-semibold text-[12px] text-[#111]">Project Beta</h4>
        </div>
        <p class="text-[10.5px] text-[#666] leading-[1.6]">CLI tool automating cloud infrastructure provisioning for 50+ microservices across staging and production.</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Python</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Terraform</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">AWS</span>
        </div>
      </div>

      <div class="border border-[#e8e8e4] rounded-lg p-3 bg-linear-to-br from-white to-[#fafaf8] hover:border-[#2563eb]/20 hover:shadow-sm transition-all">
        <div class="flex items-center gap-1.5 mb-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
          <h4 class="font-semibold text-[12px] text-[#111]">Project Gamma</h4>
        </div>
        <p class="text-[10.5px] text-[#666] leading-[1.6]">Open-source monitoring and observability library adopted by 500+ developers on GitHub.</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">TypeScript</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Prometheus</span>
          <span class="text-[8.5px] font-medium px-1.5 py-0.5 rounded bg-[#2563eb]/5 text-[#2563eb] border border-[#2563eb]/10">Grafana</span>
        </div>
      </div>

    </div>
  </section>

  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Education</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>
    <div class="border-l-2 border-[#2563eb]/20 pl-3">
      <h3 class="font-semibold text-[12px] text-[#111]">B.Tech in Computer Science</h3>
      <p class="text-[11px] text-[#777]">University Name, San Francisco, CA <span class="font-['JetBrains_Mono',monospace] text-[10px] text-[#aaa] ml-1">2017 - 2021</span></p>
    </div>
  </section>

  <section class="mb-5">
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Certifications</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>
    <p class="text-[12px] text-[#444]">AWS Certified Solutions Architect - Associate</p>
  </section>

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
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">React Native</span>
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
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Django</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">REST APIs</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">GraphQL</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">AWS</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Docker</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Redis</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">PostgreSQL</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Nginx</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">CI/CD</span>
        </div>
      </div>
      <div>
        <p class="font-semibold text-[10.5px] text-[#333] mb-1.5 tracking-wide uppercase">Tools &amp; Practices</p>
        <div class="flex flex-wrap gap-1.5">
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Git</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Agile</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Scrum</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Terraform</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">GitHub Actions</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Monitoring</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Code Review</span>
          <span class="text-[10px] px-2.5 py-0.75 rounded-md bg-[#f0f0ee] text-[#333] font-medium">Observability</span>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="flex items-center gap-3 mb-3">
      <p class="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.16em] uppercase text-[#2563eb] font-medium">Achievements</p>
      <div class="h-px bg-[#e4e4e0] flex-1"></div>
    </div>
    <ul class="space-y-1.5">
      <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Reduced infrastructure costs by 30% through strategic cloud resource optimization and capacity planning</li>
      <li class="relative pl-3.5 text-[12px] leading-[1.6] text-[#444] before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[10px] before:text-[#2563eb]/50">Mentored 3 junior engineers, establishing pair programming and continuous learning practices across the team</li>
    </ul>
  </section>

</div>`,
};
