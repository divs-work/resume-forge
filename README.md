# ResumeForge

ATS-friendly resume builder with LaTeX, Markdown, and HTML+Tailwind editors — runs entirely in the browser, persists to localStorage.

**Next.js 16.2** · **React 19.2** · **Zustand 5** · **Tailwind CSS 4** · **TypeScript 5.7**

## Features

- **Three editor modes** — LaTeX, Markdown, and HTML+Tailwind with a default template for each
- **Live preview** — STIX Two Text for LaTeX, Source Sans 3 for Markdown, DM Sans + Instrument Serif + JetBrains Mono for HTML; scales to fit any window
- **ATS Panel** — 56 real-time checks across 8 categories (Contact Info, Sections, Content Quality, Bullet Quality, Keywords, Credentials, Formatting, Length) with score ring, progress bars per category, and hover tooltips on failed checks
- **PDF Export** — triggers the browser print dialog on the live preview iframe; correct fonts and styles per mode
- **Persistent** — editor content and active mode survive page refresh via localStorage
- **Client-side only** — no server rendering, no hydration mismatches, no backend required

## Architecture

UI state (`showATS`, `exporting`) lives in component `useState`. Only content and mode are in Zustand, persisted via the `persist` middleware.

```
app/
├── globals.css
├── layout.tsx
└── page.tsx                    # "use client" + dynamic ssr:false entry point
components/
├── ResumeBuilder.tsx           # shell, printTrigger counter, export handler
├── Toolbar.tsx                 # mode switcher, ATS toggle, export button
├── ATSPanel.tsx                # score ring, category cards, badge tooltips
├── EditorPane.tsx              # textarea with per-mode syntax caret, no scrollbar
└── PreviewPane.tsx             # scaled iframe preview, page break lines, print trigger
constant/
├── config.ts                   # mode labels and file extensions
├── fonts.ts                    # FONTS and FONT_IMPORTS per mode
├── templates.ts                # default resume content per mode
└── theme.ts                    # all Tailwind class tokens (single source of truth)
lib/
├── parsers.ts                  # Markdown→HTML, LaTeX→HTML, DOMPurify sanitizer
├── ats.ts                      # 56 ATS checks across 8 categories
└── document-builder.ts         # assembles full HTML document for iframe + PDF
store/
└── resume-store.ts             # mode + content only, persisted to localStorage
types/
└── resume.ts                   # EditorMode, ATSCheck, ATSResult, ModeConfig
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## To Do

- **Font picker** — choose from a curated set of resume fonts per mode (e.g. Lato, Inter, Merriweather)
- **Theme/colour presets** — one-click accent colour swaps for the HTML template
- **Prebuilt templates** — multiple named starting templates per mode (minimal, modern, academic, etc.)
- **Prebuilt components** — drag-in blocks for experience entries, skill grids, education rows
- **Authentication + multi-resume saving** — sign in, save multiple named resumes to the cloud, switch between them
- **Export to DOCX** — Word-compatible export alongside PDF
