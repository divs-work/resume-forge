// ─────────────────────────────────────────────────────────────────────────────
// HTML TEMPLATES (FULL COLLECTION: CONTENT-HEAVY & CREATIVE VARIANTS)
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_HTML_TEMPLATE = `<div class="w-full font-['Inter',sans-serif] bg-[#F3F4F6] text-[#111827] px-8 py-6 min-h-[297mm] flex flex-col gap-3 relative z-0">

  <header class="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
    <div>
      <h1 class="text-[38px] font-black tracking-tight leading-none text-[#0F172A] mb-1.5">Your Name</h1>
      <p class="text-[13px] font-semibold text-[#6366F1] uppercase tracking-[0.15em]">Senior Software Engineer</p>
    </div>
    <div class="flex flex-col items-end gap-1.5">
      <div class="flex items-center gap-1.5">
        <a href="mailto:your@email.com" class="text-[10.5px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">your@email.com</a>
        <a href="tel:+15551234567" class="text-[10.5px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">+1 (555) 123-4567</a>
      </div>
      <div class="flex items-center gap-1.5">
        <a href="https://linkedin.com/in/yourname" class="text-[10.5px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">linkedin.com/in/yourname</a>
        <a href="https://github.com/yourusername" class="text-[10.5px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">github.com/yourusername</a>
        <a href="https://yourwebsite.com" class="text-[10.5px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">yourwebsite.com</a>
      </div>
    </div>
  </header>

  <div class="grid grid-cols-12 gap-3 flex-1">

    <div class="col-span-8 flex flex-col gap-3">

      <section class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex-1">
        <div class="flex items-center gap-2.5 mb-4">
          <div class="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#6366F1]">
            <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <h2 class="text-[15px] font-extrabold text-[#0F172A] tracking-tight">Experience</h2>
        </div>

        <div class="space-y-4">
          <div class="group">
            <div class="flex justify-between items-start mb-1.5">
              <div>
                <h3 class="text-[13.5px] font-bold text-[#111827] group-hover:text-[#6366F1] transition-colors">Staff Software Engineer</h3>
                <p class="text-[11.5px] font-medium text-gray-500">TechNova Solutions <span class="mx-1">•</span> San Francisco, CA</p>
              </div>
              <span class="text-[9.5px] font-bold text-[#6366F1] bg-[#EEF2FF] px-2 py-1 rounded-md">2023 – Present</span>
            </div>
            <ul class="space-y-1">
              <li class="text-[11.5px] text-gray-600 leading-[1.45] pl-3.5 relative before:content-['→'] before:absolute before:left-0 before:text-gray-300 before:font-bold">Architected a micro-frontend architecture using Next.js and Module Federation, reducing build times by 45% and enabling independent deployments for 4 engineering squads.</li>
              <li class="text-[11.5px] text-gray-600 leading-[1.45] pl-3.5 relative before:content-['→'] before:absolute before:left-0 before:text-gray-300 before:font-bold">Led the transition to a serverless backend on AWS, cutting operational costs by $120k annually while handling 5M+ daily requests.</li>
              <li class="text-[11.5px] text-gray-600 leading-[1.45] pl-3.5 relative before:content-['→'] before:absolute before:left-0 before:text-gray-300 before:font-bold">Implemented robust CI/CD pipelines and end-to-end testing protocols, increasing release frequency from bi-weekly to daily.</li>
            </ul>
          </div>

          <div class="w-full h-[1px] bg-gray-100"></div>

          <div class="group">
            <div class="flex justify-between items-start mb-1.5">
              <div>
                <h3 class="text-[13.5px] font-bold text-[#111827] group-hover:text-[#6366F1] transition-colors">Senior Full-Stack Developer</h3>
                <p class="text-[11.5px] font-medium text-gray-500">Quantum Leap Inc. <span class="mx-1">•</span> Remote</p>
              </div>
              <span class="text-[9.5px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">2020 – 2023</span>
            </div>
            <ul class="space-y-1">
              <li class="text-[11.5px] text-gray-600 leading-[1.45] pl-3.5 relative before:content-['→'] before:absolute before:left-0 before:text-gray-300 before:font-bold">Built scalable REST APIs using Node.js and Express to power the core analytics dashboard, maintaining sub-100ms response times under heavy load.</li>
              <li class="text-[11.5px] text-gray-600 leading-[1.45] pl-3.5 relative before:content-['→'] before:absolute before:left-0 before:text-gray-300 before:font-bold">Refactored legacy React codebase to use functional components and custom hooks, shrinking bundle size by 30%.</li>
              <li class="text-[11.5px] text-gray-600 leading-[1.45] pl-3.5 relative before:content-['→'] before:absolute before:left-0 before:text-gray-300 before:font-bold">Mentored 3 junior developers through pair programming and comprehensive PR reviews.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-[#6366F1]/30 transition-colors">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-[13.5px] font-bold text-[#0F172A]">OpenStream <span class="text-[9px] font-normal bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-1">Live</span></h3>
          </div>
          <p class="text-[11px] text-gray-500 leading-[1.45] mb-2.5">Real-time collaboration tool built with WebSockets and Redis. Supports 10k concurrent users per room.</p>
          <div class="flex flex-wrap gap-1"><span class="text-[8.5px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">React</span><span class="text-[8.5px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">Node.js</span></div>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-[#6366F1]/30 transition-colors">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-[13.5px] font-bold text-[#0F172A]">Aura UI <span class="text-[9px] font-normal bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-1">OSS</span></h3>
          </div>
          <p class="text-[11px] text-gray-500 leading-[1.45] mb-2.5">Accessible React component library downloaded 10k+ times. Highly customizable via Tailwind presets.</p>
          <div class="flex flex-wrap gap-1"><span class="text-[8.5px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">TypeScript</span><span class="text-[8.5px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">Tailwind</span></div>
        </div>
      </section>
    </div>

    <div class="col-span-4 flex flex-col gap-3">

      <section class="bg-[#0F172A] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 bg-[#6366F1] rounded-full blur-[50px] opacity-30"></div>
        <h2 class="text-[11px] font-bold text-white uppercase tracking-widest mb-2 relative z-10">Philosophy</h2>
        <p class="text-[11.5px] text-gray-300 leading-[1.55] relative z-10 font-medium">I build resilient, high-performance web systems. I believe in typed languages, automated testing, reducing cloud bloat, and creating developer experiences that prioritize velocity without sacrificing stability.</p>
      </section>

      <section class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex-1">
        <div class="flex items-center gap-2.5 mb-4">
          <div class="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <h2 class="text-[15px] font-extrabold text-[#0F172A] tracking-tight">Toolkit</h2>
        </div>

        <div class="space-y-3.5">
          <div>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Frontend Core</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">React</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Next.js</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">TypeScript</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Tailwind CSS</span>
            </div>
          </div>

          <div>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Backend & DB</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Node.js</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Python</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">PostgreSQL</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Redis</span>
            </div>
          </div>

          <div>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Infrastructure</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">AWS</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Docker</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">Data Structures</span>
              <span class="text-[10.5px] font-semibold text-[#111827] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
        <div class="flex items-center gap-2.5 mb-3">
          <div class="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
            <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
          </div>
          <h2 class="text-[15px] font-extrabold text-[#0F172A] tracking-tight">Education</h2>
        </div>
        <h3 class="text-[12.5px] font-bold text-[#111827]">B.S. Computer Science</h3>
        <p class="text-[10.5px] font-medium text-gray-500 mt-0.5">University of Technology</p>
        <p class="text-[9.5px] font-bold text-gray-400 mt-1.5">Class of 2020</p>
      </section>

    </div>
  </div>
</div>`;

export const HTML_DARK_MINIMAL = `<div class="w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111] to-[#050505] text-[#fafafa] font-sans px-10 py-8 box-border flex flex-col justify-between min-h-[297mm]">

  <header class="mb-4">
    <div class="flex items-end justify-between mb-4">
      <div>
        <h1 class="text-[46px] font-bold tracking-[-1.5px] leading-none text-white drop-shadow-md">Your Name</h1>
        <p class="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50 mt-3">Frontend Developer</p>
      </div>
      <div class="flex flex-col items-end gap-1.5 text-[9px] font-mono text-white/50">
        <a href="mailto:your@email.com" class="hover:text-white transition-colors">your@email.com</a>
        <a href="https://yourwebsite.com" class="hover:text-white transition-colors">yourwebsite.com</a>
        <a href="https://linkedin.com/in/yourname" class="hover:text-white transition-colors">linkedin.com/in/yourname</a>
        <a href="https://github.com/yourusername" class="hover:text-white transition-colors">github.com/yourusername</a>
      </div>
    </div>
    <div class="h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent"></div>
  </header>

  <div class="grid grid-cols-12 gap-6 flex-1">
    <div class="col-span-8 flex flex-col gap-5">
      <section class="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm">
        <div class="flex items-center gap-3 mb-3">
          <div class="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <p class="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Experience</p>
        </div>
        <div class="space-y-4">
          <div>
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="text-[13px] font-bold text-white tracking-wide">Senior Frontend Engineer <span class="text-white/30 font-light mx-1">|</span> <span class="text-white/60">Company Name</span></h3>
                <p class="text-[8.5px] font-mono text-white/30 uppercase tracking-widest mt-1">React · JavaScript · Webpack</p>
              </div>
              <span class="text-[9px] font-mono text-white/40 shrink-0 bg-white/[0.03] px-2 py-1 rounded-md">Jan 2023 — Present</span>
            </div>
            <ul class="space-y-1.5">
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Spearheaded the migration of a legacy monolithic architecture to component-driven React architecture, handling 15k+ req/sec.</li>
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Architected internal UI library reducing manual effort 12 hrs/week, saving $80K annually in operational costs.</li>
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Led a cross-functional squad of 6 engineers; established strict CI/CD guidelines increasing deployment frequency by 40%.</li>
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Optimized Core Web Vitals across the primary SaaS dashboard, yielding a 22% improvement in user session duration.</li>
            </ul>
          </div>
          <div class="w-full h-px bg-white/[0.03]"></div>
          <div>
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="text-[13px] font-bold text-white tracking-wide">Frontend Developer <span class="text-white/30 font-light mx-1">|</span> <span class="text-white/60">Previous Company</span></h3>
                <p class="text-[8.5px] font-mono text-white/30 uppercase tracking-widest mt-1">JavaScript · Flutter · REST APIs</p>
              </div>
              <span class="text-[9px] font-mono text-white/40 shrink-0 bg-white/[0.03] px-2 py-1 rounded-md">2020 — 2022</span>
            </div>
            <ul class="space-y-1.5">
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Developed core cross-platform mobile application features using Flutter, maintaining 99.99% crash-free sessions.</li>
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Slashed application bundle size by 60% through aggressive code-splitting and asset optimization.</li>
              <li class="text-[11.5px] text-white/60 leading-[1.5] font-light pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-white/30 before:text-[10px]">Mentored 3 junior developers, conducting weekly pair-programming sessions and rigorous code reviews.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div class="flex items-center gap-3 mb-3">
          <div class="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <p class="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Select Projects</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20 transition-colors">
            <h4 class="text-[12px] font-bold text-white mb-1">Project Alpha <span class="text-[9px] text-white/30 font-light ml-1">Web</span></h4>
            <p class="text-[10.5px] text-white/50 leading-[1.5] font-light mb-2.5">Distributed real-time analytics dashboard handling 10K events/sec with sub-200ms latency at scale.</p>
            <p class="text-[8px] font-mono text-white/30 bg-white/[0.03] inline-block px-1.5 py-0.5 rounded">React · WebSockets</p>
          </div>
          <div class="p-3.5 rounded-xl border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20 transition-colors">
            <h4 class="text-[12px] font-bold text-white mb-1">Project Beta <span class="text-[9px] text-white/30 font-light ml-1">Mobile</span></h4>
            <p class="text-[10.5px] text-white/50 leading-[1.5] font-light mb-2.5">Cross-platform mobile application orchestrating smart home IoT devices across local networks.</p>
            <p class="text-[8px] font-mono text-white/30 bg-white/[0.03] inline-block px-1.5 py-0.5 rounded">Flutter · Dart</p>
          </div>
          <div class="p-3.5 rounded-xl border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20 transition-colors">
            <h4 class="text-[12px] font-bold text-white mb-1">Project Gamma <span class="text-[9px] text-white/30 font-light ml-1">Security</span></h4>
            <p class="text-[10.5px] text-white/50 leading-[1.5] font-light mb-2.5">Automated vulnerability scanner for CI/CD pipelines. Adopted by 50+ enterprise teams.</p>
            <p class="text-[8px] font-mono text-white/30 bg-white/[0.03] inline-block px-1.5 py-0.5 rounded">Python · Shell</p>
          </div>
          <div class="p-3.5 rounded-xl border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/20 transition-colors">
            <h4 class="text-[12px] font-bold text-white mb-1">Project Delta <span class="text-[9px] text-white/30 font-light ml-1">AI/ML</span></h4>
            <p class="text-[10.5px] text-white/50 leading-[1.5] font-light mb-2.5">Predictive model for user interaction patterns, serving inferences via a lightweight API.</p>
            <p class="text-[8px] font-mono text-white/30 bg-white/[0.03] inline-block px-1.5 py-0.5 rounded">Machine Learning</p>
          </div>
        </div>
      </section>
    </div>

    <div class="col-span-4 flex flex-col gap-5">
      <section class="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
        <p class="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">Profile</p>
        <p class="text-[11px] text-white/60 leading-[1.65] font-light">Product-minded frontend developer with a keen eye for dark, cyberpunk aesthetics and deep tech integration. Passionate about performant user interfaces, cross-platform mobile development, and bridging the gap between pixel-perfect UIs and robust backend security.</p>
      </section>

      <section class="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
        <p class="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3">Core Technical Skills</p>
        <div class="space-y-3">
          <div>
            <p class="text-[8.5px] text-white/50 uppercase tracking-widest mb-1.5">Frontend & Mobile</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">React</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">JavaScript</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">TypeScript</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Flutter</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">HTML/CSS</span>
            </div>
          </div>
          <div>
            <p class="text-[8.5px] text-white/50 uppercase tracking-widest mb-1.5">Systems & Theory</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Data Structures</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Algorithms</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Machine Learning</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Cybersecurity</span>
            </div>
          </div>
          <div>
            <p class="text-[8.5px] text-white/50 uppercase tracking-widest mb-1.5">Infrastructure</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Linux (Arch/Gentoo)</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Docker</span>
              <span class="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Git</span>
            </div>
          </div>
        </div>
      </section>

      <section class="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
        <p class="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3">Education & Certs</p>
        <div class="space-y-3">
          <div>
            <p class="text-[11px] font-bold text-white">B.Tech · Computer Science</p>
            <p class="text-[10px] text-white/50">University of Technology</p>
            <p class="text-[8.5px] font-mono text-white/30 mt-0.5">2017 — 2021</p>
          </div>
          <div class="w-full h-px bg-white/[0.05]"></div>
          <div class="space-y-1.5">
            <div class="flex justify-between items-center"><span class="text-[10.5px] text-white/70 font-light">Advanced Cyber Security</span><span class="text-[8.5px] font-mono text-white/30">2023</span></div>
          </div>
        </div>
      </section>

      <section class="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] flex-1">
        <p class="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3">Writing & Talks</p>
        <ul class="space-y-2">
          <li>
            <a href="#" class="text-[11px] text-white hover:underline block leading-tight">Optimizing React Context for Scale</a>
            <span class="text-[9px] text-white/40">Medium Tech Blog • 50k Views</span>
          </li>
          <li>
            <a href="#" class="text-[11px] text-white hover:underline block leading-tight">Securing Frontend Architectures</a>
            <span class="text-[9px] text-white/40">Guest Speaker @ CityTech Meetup</span>
          </li>
        </ul>
      </section>

    </div>
  </div>
</div>`;

export const HTML_NEO_BRUTALIST = `<div class="w-full bg-[#f4f4f0] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] font-sans px-8 py-6 box-border flex flex-col gap-4 min-h-[297mm]">

  <header class="border-[3px] border-black bg-[#FCD34D] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
    <div class="absolute -right-10 -top-10 text-[150px] font-black opacity-10">DEV</div>
    <div class="flex items-start justify-between relative z-10">
      <div class="flex flex-col">
        <h1 class="text-[52px] font-black tracking-[-2px] leading-[0.9] text-black uppercase transform -skew-x-3">Your Name</h1>
        <div class="inline-block bg-black text-white px-3 py-1 mt-3 w-max transform skew-x-3">
          <p class="text-[12px] font-black uppercase tracking-[0.2em]">Senior Software Engineer</p>
        </div>
      </div>
      <div class="flex flex-col gap-1.5 text-right bg-white border-[2px] border-black p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <a href="mailto:your@email.com" class="text-[10px] font-mono font-bold hover:bg-black hover:text-white px-1">your@email.com</a>
        <a href="#" class="text-[10px] font-mono font-bold hover:bg-black hover:text-white px-1">+1 (555) 123-4567</a>
        <a href="https://yourwebsite.com" class="text-[10px] font-mono font-bold hover:bg-black hover:text-white px-1">yourwebsite.com</a>
        <a href="https://linkedin.com/in/yourname" class="text-[10px] font-mono font-bold hover:bg-black hover:text-white px-1">linkedin/yourname</a>
        <a href="https://github.com/yourusername" class="text-[10px] font-mono font-bold hover:bg-black hover:text-white px-1">github/yourusername</a>
      </div>
    </div>
  </header>

  <section class="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <div class="flex items-center gap-2 mb-2">
      <div class="w-4 h-4 bg-[#FF90E8] border-[2px] border-black"></div>
      <h2 class="text-[14px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-0.5">System Override // Profile</h2>
    </div>
    <p class="text-[12px] leading-[1.6] text-black font-bold">Hardcore builder specializing in ultra-fast, highly concurrent backend systems and pixel-perfect frontends. 5+ years breaking things in development so they don't break in production. Obsessed with clean code, data structures, algorithms, and reducing cloud bills.</p>
  </section>

  <div class="grid grid-cols-12 gap-5 flex-1">

    <div class="col-span-7 flex flex-col gap-5">
      <section>
        <div class="flex items-center gap-2 mb-3">
          <div class="w-4 h-4 bg-[#38BDF8] border-[2px] border-black rounded-full"></div>
          <h2 class="text-[14px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-0.5">Experience Log</h2>
        </div>

        <div class="space-y-4">
          <div class="border-[3px] border-black bg-white p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div class="flex items-start justify-between border-b-2 border-black border-dashed pb-2 mb-2">
              <div>
                <h3 class="text-[14px] font-black uppercase tracking-tight">Lead Software Engineer</h3>
                <span class="text-[11px] font-bold text-[#FF5722] uppercase tracking-wider">Cybernetics Inc.</span>
              </div>
              <div class="bg-black text-[#FCD34D] font-mono font-bold text-[10px] px-2 py-1 transform rotate-2">2023 - PRESENT</div>
            </div>
            <ul class="space-y-1">
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Engineered a distributed cache layer with Redis & Go, crushing latency by 75% for 1M+ active users.</li>
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Rewrote the legacy frontend monolith into Next.js micro-frontends, achieving 100/100 Lighthouse scores.</li>
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Led a tactical squad of 5 devs; implemented strict TDD, bringing crash rates down to 0.01%.</li>
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Deployed infrastructure-as-code (Terraform) to automate multi-region failover.</li>
            </ul>
          </div>

          <div class="border-[3px] border-black bg-white p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div class="flex items-start justify-between border-b-2 border-black border-dashed pb-2 mb-2">
              <div>
                <h3 class="text-[14px] font-black uppercase tracking-tight">Backend Developer</h3>
                <span class="text-[11px] font-bold text-[#FF5722] uppercase tracking-wider">DataFlow LLC</span>
              </div>
              <div class="bg-black text-[#FCD34D] font-mono font-bold text-[10px] px-2 py-1 transform -rotate-1">2020 - 2022</div>
            </div>
            <ul class="space-y-1">
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Built the core GraphQL API (Node.js/Apollo) handling 50M+ queries weekly.</li>
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Containerized 20+ legacy apps using Docker, standardizing deployment across staging/prod.</li>
              <li class="text-[11.5px] font-medium leading-[1.4] pl-4 relative before:content-['►'] before:absolute before:left-0 before:text-[10px] before:top-[2px]">Wrote automated cron-jobs to purge dead data, freeing up 5TB of RDS storage.</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="flex gap-4">
        <section class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-3 h-3 bg-[#4ADE80] border-[2px] border-black transform rotate-45"></div>
            <h2 class="text-[12px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-0.5">Education</h2>
          </div>
          <div class="border-[3px] border-black bg-[#FCD34D] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-black text-[12px] uppercase">BS Computer Science</h3>
            <p class="font-bold text-[10px] border-b-[2px] border-black pb-1 mb-1">State University • 2016-2020</p>
            <p class="text-[10px] font-bold">Focus: Machine Learning, DSA</p>
          </div>
        </section>
        <section class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-3 h-3 bg-[#FF90E8] border-[2px] border-black transform rotate-45"></div>
            <h2 class="text-[12px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-0.5">Hackathons</h2>
          </div>
          <div class="border-[3px] border-black bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-black text-[12px] uppercase">Global Web3 Hack</h3>
            <p class="font-bold text-[10px] border-b-[2px] border-black pb-1 mb-1">1st Place Overall • 2022</p>
            <p class="text-[10px] font-medium">Built a decentralized voting dApp in 48 hours using React & Solidity.</p>
          </div>
        </section>
      </div>
    </div>

    <div class="col-span-5 flex flex-col gap-5">

      <section>
        <div class="flex items-center gap-2 mb-3">
          <div class="w-4 h-4 bg-[#A78BFA] border-[2px] border-black rounded-sm"></div>
          <h2 class="text-[14px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-0.5">Arsenal</h2>
        </div>
        <div class="space-y-3">
          <div class="border-[3px] border-black bg-white p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p class="text-[11px] font-black uppercase mb-2 border-b-2 border-black inline-block">Frontend</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[10px] font-bold uppercase bg-[#FF90E8] border-[2px] border-black px-1.5 py-0.5">React</span>
              <span class="text-[10px] font-bold uppercase bg-[#FF90E8] border-[2px] border-black px-1.5 py-0.5">Next.js</span>
              <span class="text-[10px] font-bold uppercase bg-[#FF90E8] border-[2px] border-black px-1.5 py-0.5">JavaScript</span>
              <span class="text-[10px] font-bold uppercase bg-[#FF90E8] border-[2px] border-black px-1.5 py-0.5">Tailwind</span>
            </div>
          </div>
          <div class="border-[3px] border-black bg-white p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p class="text-[11px] font-black uppercase mb-2 border-b-2 border-black inline-block">Backend & Algorithms</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[10px] font-bold uppercase bg-[#4ADE80] border-[2px] border-black px-1.5 py-0.5">Node.js</span>
              <span class="text-[10px] font-bold uppercase bg-[#4ADE80] border-[2px] border-black px-1.5 py-0.5">Go</span>
              <span class="text-[10px] font-bold uppercase bg-[#4ADE80] border-[2px] border-black px-1.5 py-0.5">DSA Focus</span>
              <span class="text-[10px] font-bold uppercase bg-[#4ADE80] border-[2px] border-black px-1.5 py-0.5">PostgreSQL</span>
            </div>
          </div>
          <div class="border-[3px] border-black bg-white p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p class="text-[11px] font-black uppercase mb-2 border-b-2 border-black inline-block">DevOps & Cloud</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[10px] font-bold uppercase bg-[#38BDF8] border-[2px] border-black px-1.5 py-0.5">AWS</span>
              <span class="text-[10px] font-bold uppercase bg-[#38BDF8] border-[2px] border-black px-1.5 py-0.5">Docker</span>
              <span class="text-[10px] font-bold uppercase bg-[#38BDF8] border-[2px] border-black px-1.5 py-0.5">K8s</span>
              <span class="text-[10px] font-bold uppercase bg-[#38BDF8] border-[2px] border-black px-1.5 py-0.5">GitHub Actions</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-3">
          <div class="w-4 h-4 bg-[#FF5722] border-[2px] border-black rounded-sm transform rotate-12"></div>
          <h2 class="text-[14px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-0.5">Projects</h2>
        </div>
        <div class="space-y-3">
          <div class="border-[3px] border-black bg-[#FCD34D] p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-black text-[13px] uppercase underline">Alpha Engine</h3>
            <p class="text-[11px] font-bold mt-1.5 mb-2 leading-[1.4]">Open-source 2D physics engine built in Rust. Capable of handling 10k+ rigid bodies at 60FPS.</p>
            <div class="inline-block bg-black text-white text-[9px] font-bold uppercase px-1.5 py-0.5">Rust • WebAssembly</div>
          </div>
          <div class="border-[3px] border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="font-black text-[13px] uppercase underline">Nexus CLI</h3>
            <p class="text-[11px] font-medium mt-1.5 mb-2 leading-[1.4]">NPM package downloaded 5k+ times/month. Scaffolds full-stack TRPC+Next.js apps instantly.</p>
            <div class="inline-block bg-black text-white text-[9px] font-bold uppercase px-1.5 py-0.5">TypeScript • CLI</div>
          </div>
        </div>
      </section>

    </div>
  </div>
</div>`;

export const HTML_NIGHT_PRO = `<div class="w-full font-sans bg-[#050505] text-gray-300 px-10 py-10 min-h-[297mm] flex flex-col relative overflow-hidden box-border">

  <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none"></div>
  <div class="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[120px] pointer-events-none"></div>
  <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50"></div>

  <header class="relative z-10 flex justify-between items-end border-b border-gray-800 pb-6 mb-8">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <span class="inline-block w-2 h-2 bg-[#0ea5e9] rounded-sm animate-pulse"></span>
        <span class="text-[10px] font-mono text-[#0ea5e9] uppercase tracking-widest">System_Ready // Root</span>
      </div>
      <h1 class="text-[48px] font-black tracking-tighter leading-none text-white drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Your Name</h1>
      <p class="text-[13px] font-mono text-gray-400 mt-3 flex items-center gap-2">
        <span class="text-[#8b5cf6]">const</span> role = <span class="text-[#10b981]">'Frontend & Security Engineer'</span>;
      </p>
    </div>
    <div class="flex flex-col items-end gap-1.5 font-mono text-[10px] text-gray-400">
      <a href="mailto:your@email.com" class="hover:text-[#0ea5e9] transition-colors">>> mail: your@email.com</a>
      <a href="https://yourwebsite.com" class="hover:text-[#0ea5e9] transition-colors">>> host: yourwebsite.com</a>
      <a href="https://github.com/yourusername" class="hover:text-[#0ea5e9] transition-colors">>> git: github.com/yourusername</a>
      <a href="https://linkedin.com/in/yourname" class="hover:text-[#0ea5e9] transition-colors">>> net: linkedin.com/in/yourname</a>
    </div>
  </header>

  <div class="grid grid-cols-12 gap-10 flex-1 relative z-10">

    <div class="col-span-8 flex flex-col gap-8">

      <section>
        <h2 class="text-[13px] font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
          <span class="text-[#0ea5e9]">#</span> Execution_Log [Experience]
        </h2>

        <div class="relative border-l border-gray-800 ml-2 pl-6 space-y-8">

          <div class="relative">
            <div class="absolute w-2 h-2 bg-[#0ea5e9] rounded-sm -left-[29px] top-1.5 shadow-[0_0_10px_#0ea5e9]"></div>
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-[15px] font-bold text-white tracking-wide">Security-Focused Frontend Lead</h3>
                <p class="text-[12px] font-mono text-gray-500 mt-0.5">CyberShield Networks <span class="text-gray-700">|</span> Remote</p>
              </div>
              <span class="text-[10px] font-mono text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/5 px-2 py-1 rounded">2023 - PRESENT</span>
            </div>
            <ul class="space-y-2 mt-3 text-[12px] text-gray-400 leading-[1.6]">
              <li class="pl-4 relative before:content-['>_'] before:absolute before:left-0 before:text-[#10b981] before:font-mono">Engineered a robust, highly secure React dashboard for threat monitoring, utilizing strict Content Security Policies (CSP) and mitigating XSS vulnerabilities across the platform.</li>
              <li class="pl-4 relative before:content-['>_'] before:absolute before:left-0 before:text-[#10b981] before:font-mono">Architected deep Linux server hardening protocols for deployment environments (Arch/Gentoo custom kernels) supporting the frontend microservices.</li>
              <li class="pl-4 relative before:content-['>_'] before:absolute before:left-0 before:text-[#10b981] before:font-mono">Led the migration to a modern tech stack (Next.js, TypeScript, Tailwind) resulting in a 60% improvement in load times and Lighthouse scores.</li>
            </ul>
          </div>

          <div class="relative">
            <div class="absolute w-2 h-2 bg-gray-700 rounded-sm -left-[29px] top-1.5"></div>
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-[15px] font-bold text-white tracking-wide">Full-Stack Developer</h3>
                <p class="text-[12px] font-mono text-gray-500 mt-0.5">FinTech Secure <span class="text-gray-700">|</span> New York, NY</p>
              </div>
              <span class="text-[10px] font-mono text-gray-400 border border-gray-700 bg-gray-900 px-2 py-1 rounded">2020 - 2023</span>
            </div>
            <ul class="space-y-2 mt-3 text-[12px] text-gray-400 leading-[1.6]">
              <li class="pl-4 relative before:content-['>_'] before:absolute before:left-0 before:text-gray-500 before:font-mono">Developed complex algorithmic trading interfaces using React and WebSockets, rendering thousands of data points with zero frame drops.</li>
              <li class="pl-4 relative before:content-['>_'] before:absolute before:left-0 before:text-gray-500 before:font-mono">Built cross-platform utility applications in Flutter for secure internal comms.</li>
              <li class="pl-4 relative before:content-['>_'] before:absolute before:left-0 before:text-gray-500 before:font-mono">Conducted internal cyber security audits, identifying and patching SQL injection and SSRF vulnerabilities in legacy codebases.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-[13px] font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
          <span class="text-[#0ea5e9]">#</span> Deployed_Modules [Projects]
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-[#0a0a0a] border border-gray-800 p-4 hover:border-[#8b5cf6]/50 transition-colors relative group">
            <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#8b5cf6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 class="text-[14px] font-bold text-white mb-1.5">Phantom OS <span class="text-[9px] font-mono text-[#10b981] ml-2">[ACTIVE]</span></h3>
            <p class="text-[11.5px] text-gray-400 leading-[1.5] mb-3">Custom hardened Linux distribution based on Arch Linux. Configured for penetration testing and secure frontend development environments.</p>
            <p class="text-[9px] font-mono text-[#8b5cf6]">Bash • C • Linux Kernel</p>
          </div>
          <div class="bg-[#0a0a0a] border border-gray-800 p-4 hover:border-[#0ea5e9]/50 transition-colors relative group">
            <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0ea5e9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 class="text-[14px] font-bold text-white mb-1.5">CyberDash <span class="text-[9px] font-mono text-[#10b981] ml-2">[ACTIVE]</span></h3>
            <p class="text-[11.5px] text-gray-400 leading-[1.5] mb-3">A cyberpunk-themed analytics dashboard built for monitoring network traffic. Features dark UI, complex data visualization, and real-time updates.</p>
            <p class="text-[9px] font-mono text-[#0ea5e9]">React • Tailwind • D3.js</p>
          </div>
        </div>
      </section>
    </div>

    <div class="col-span-4 flex flex-col gap-8">

      <section>
        <h2 class="text-[13px] font-mono font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
          <span class="text-[#0ea5e9]">#</span> Sys_Info
        </h2>
        <p class="text-[12px] text-gray-400 leading-[1.6] bg-[#0a0a0a] border border-gray-800 p-4 border-l-2 border-l-[#0ea5e9]">
          Frontend Developer with a heavy focus on deep tech, cybersecurity, and system architecture. I specialize in the React and Flutter ecosystems while maintaining a deep understanding of Linux internals (Arch/Gentoo) and application security.
        </p>
      </section>

      <section>
        <h2 class="text-[13px] font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
          <span class="text-[#0ea5e9]">#</span> Core_Dependencies
        </h2>
        <div class="space-y-4">
          <div>
            <span class="block text-[10px] font-mono text-gray-500 mb-2">>> frontend.config.json</span>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">React</span>
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">JavaScript</span>
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">Flutter</span>
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">Tailwind</span>
            </div>
          </div>
          <div>
            <span class="block text-[10px] font-mono text-gray-500 mb-2">>> backend_sec.yml</span>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">Cybersecurity</span>
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">Arch Linux</span>
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">Gentoo</span>
              <span class="text-[11px] font-mono text-gray-300 bg-gray-900 border border-gray-800 px-2 py-0.5">Node.js</span>
            </div>
          </div>
        </div>
      </section>

      <section class="flex-1">
        <h2 class="text-[13px] font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
          <span class="text-[#0ea5e9]">#</span> Credentials
        </h2>
        <ul class="space-y-3">
          <li class="bg-[#0a0a0a] border border-gray-800 p-3">
            <h4 class="text-[12px] font-bold text-white">B.S. Computer Science</h4>
            <p class="text-[10px] font-mono text-gray-500 mt-1">Tech University • 2020</p>
          </li>
          <li class="bg-[#0a0a0a] border border-gray-800 p-3">
            <h4 class="text-[12px] font-bold text-white">OSCP Certified</h4>
            <p class="text-[10px] font-mono text-[#10b981] mt-1">Offensive Security • Active</p>
          </li>
          <li class="bg-[#0a0a0a] border border-gray-800 p-3">
            <h4 class="text-[12px] font-bold text-white">Advanced Cyber Security</h4>
            <p class="text-[10px] font-mono text-[#0ea5e9] mt-1">Training Completion • 2023</p>
          </li>
        </ul>
      </section>

    </div>
  </div>

  <div class="relative z-10 border-t border-gray-800 pt-4 mt-4 flex justify-between items-center text-[9px] font-mono text-gray-600">
    <span>[OK] All modules loaded successfully.</span>
    <span>UPTIME: 99.99%</span>
  </div>

</div>`;

export const HTML_EDITORIAL = `<div class="w-full bg-[#fdfcfaf0] font-sans px-10 py-8 box-border flex flex-col gap-5 min-h-[297mm] border-x-[8px] border-[#222]">

  <header class="text-center pb-5 border-b-[3px] border-[#222]">
    <h1 class="text-[48px] font-bold tracking-[-1.5px] leading-none text-[#111]" style="font-family:'Georgia',serif">YOUR NAME</h1>
    <h2 class="text-[12px] uppercase tracking-[0.5em] text-[#555] mt-3 font-medium" style="font-family:'Helvetica Neue', sans-serif">Software Engineer</h2>

    <div class="flex justify-center items-center gap-4 mt-4 text-[9.5px] uppercase tracking-widest text-[#666] font-bold">
      <a href="mailto:your@email.com" class="hover:text-black">your@email.com</a>
      <span class="text-[#ccc]">|</span>
      <span>+1 (555) 123-4567</span>
      <span class="text-[#ccc]">|</span>
      <a href="https://yourwebsite.com" class="hover:text-black">yourwebsite.com</a>
      <span class="text-[#ccc]">|</span>
      <a href="https://linkedin.com/in/yourname" class="hover:text-black">linkedin/yourname</a>
      <span class="text-[#ccc]">|</span>
      <a href="https://github.com/yourusername" class="hover:text-black">github/yourusername</a>
    </div>
  </header>

  <section class="flex flex-col items-center max-w-[85%] mx-auto text-center">
    <p class="text-[16px] leading-[1.5] text-[#333] italic" style="font-family:'Georgia',serif">"I build resilient digital infrastructure and intuitive interfaces. My engineering philosophy centers on simplicity, rigorous testing, and writing code that subsequent developers can understand and scale."</p>
  </section>

  <div class="h-[1px] bg-gradient-to-r from-transparent via-[#222] to-transparent"></div>

  <div class="grid grid-cols-12 gap-8 flex-1">

    <div class="col-span-8 flex flex-col gap-5">

      <div class="flex items-center gap-3">
        <h3 class="text-[13px] font-bold uppercase tracking-[0.2em] text-[#222] border-b-2 border-[#222] pb-1">Professional History</h3>
      </div>

      <div class="space-y-5">
        <article>
          <header class="mb-2">
            <h4 class="text-[17px] font-bold text-[#111] leading-tight" style="font-family:'Georgia',serif">Senior Frontend Engineer</h4>
            <div class="flex justify-between items-baseline mt-1 border-b border-[#eee] pb-1.5">
              <span class="text-[10.5px] font-bold uppercase tracking-widest text-[#666]">The Innovate Group — San Francisco, CA</span>
              <span class="text-[9.5px] font-bold uppercase tracking-widest text-[#999]">2023 — Present</span>
            </div>
          </header>
          <div class="text-[11.5px] text-[#333] leading-[1.55] text-justify space-y-2">
            <p><span class="float-left text-[28px] leading-[22px] pt-1 pr-2 font-bold" style="font-family:'Georgia',serif">D</span>irected the frontend transition to React (Next.js), optimizing Core Web Vitals to achieve a 95+ score across all major product verticals. This initiative modernized the user experience, directly resulting in a 40% reduction in client-side latency.</p>
            <p>I managed a dedicated task force of six engineers, establishing strict continuous integration standards via GitHub Actions. Additionally, I integrated secure authentication flows and patched crucial XSS vulnerabilities during our Q3 cyber security audit.</p>
          </div>
        </article>

        <article>
          <header class="mb-2">
            <h4 class="text-[17px] font-bold text-[#111] leading-tight" style="font-family:'Georgia',serif">Software Engineer II</h4>
            <div class="flex justify-between items-baseline mt-1 border-b border-[#eee] pb-1.5">
              <span class="text-[10.5px] font-bold uppercase tracking-widest text-[#666]">DataSynergy LLC — Remote</span>
              <span class="text-[9.5px] font-bold uppercase tracking-widest text-[#999]">2020 — 2023</span>
            </div>
          </header>
          <ul class="text-[11.5px] text-[#333] leading-[1.55] space-y-2 list-disc pl-4 marker:text-[#888]">
            <li>Engineered scalable user interfaces (React/JavaScript) processing upwards of $5M in monthly transaction volume with zero downtime.</li>
            <li>Implemented intelligent caching strategies utilizing Redux and localized storage, reducing complex query response times from 800ms to sub-50ms.</li>
            <li>Championed the migration of localized development environments to Docker and Linux-based systems, drastically reducing onboarding time for new hires.</li>
          </ul>
        </article>
      </div>

    </div>

    <div class="col-span-4 flex flex-col gap-5 border-l-[1px] border-[#ccc] pl-6">

      <section>
        <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#222] border-b-2 border-[#222] pb-1 mb-2.5">Technical Repertoire</h3>
        <div class="space-y-2.5">
          <div>
            <h4 class="text-[9.5px] font-bold uppercase tracking-widest text-[#777] mb-1">Languages</h4>
            <p class="text-[11.5px] text-[#222] leading-[1.4]" style="font-family:'Georgia',serif">JavaScript, TypeScript, Python, HTML/CSS</p>
          </div>
          <div>
            <h4 class="text-[9.5px] font-bold uppercase tracking-widest text-[#777] mb-1">Frameworks & Libs</h4>
            <p class="text-[11.5px] text-[#222] leading-[1.4]" style="font-family:'Georgia',serif">React, Next.js, Node.js, Express, Tailwind CSS</p>
          </div>
          <div>
            <h4 class="text-[9.5px] font-bold uppercase tracking-widest text-[#777] mb-1">Architecture & Systems</h4>
            <p class="text-[11.5px] text-[#222] leading-[1.4]" style="font-family:'Georgia',serif">Linux, Git, Docker, Cybersecurity, Web APIs</p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#222] border-b-2 border-[#222] pb-1 mb-2.5">Select Works</h3>
        <div class="space-y-3">
          <div>
            <h4 class="text-[12px] font-bold text-[#111]" style="font-family:'Georgia',serif">Project Alpha</h4>
            <p class="text-[10.5px] text-[#444] leading-[1.4] mt-1 mb-1">Open-source React component library prioritizing accessibility. Featured on HackerNews.</p>
            <p class="text-[8.5px] uppercase tracking-widest text-[#888] font-bold">JavaScript / React</p>
          </div>
          <div>
            <h4 class="text-[12px] font-bold text-[#111]" style="font-family:'Georgia',serif">InfraScanner</h4>
            <p class="text-[10.5px] text-[#444] leading-[1.4] mt-1 mb-1">Security utility for rapidly identifying vulnerabilities in web applications.</p>
            <p class="text-[8.5px] uppercase tracking-widest text-[#888] font-bold">Python / WebSec</p>
          </div>
        </div>
      </section>

      <section class="mt-auto">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#222] border-b-2 border-[#222] pb-1 mb-2.5">Academia</h3>
        <div>
          <h4 class="text-[12px] font-bold text-[#111]" style="font-family:'Georgia',serif">B.Tech Computer Science</h4>
          <p class="text-[10px] text-[#555] uppercase tracking-wider mt-0.5">University of Technology</p>
          <p class="text-[9.5px] text-[#888] italic">Class of 2020</p>
        </div>
      </section>

    </div>
  </div>

</div>`;
