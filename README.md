# ResumeForge

ATS-friendly resume builder with LaTeX, Markdown, and HTML+Tailwind editors — runs entirely in the browser, persists to localStorage.

**Next.js 16.2** · **React 19.2** · **Zustand 5** · **Tailwind CSS 4** · **TypeScript 5.7**

## Features

- **Three editor modes** — LaTeX, Markdown, and HTML+Tailwind with a default template for each
- **Live preview** — STIX Two Text for LaTeX, Source Sans 3 for Markdown, DM Sans for HTML; scales to fit any window
- **ATS Score** — 24 real-time checks across contact info, experience, education, skills, metrics, action verbs, and length
- **PDF Export** — print-to-PDF via hidden iframe, correct fonts per mode, Tailwind CDN for HTML
- **Persistent** — editor content and active mode survive page refresh via localStorage
- **Client-side only** — no server rendering, no hydration mismatches

## Architecture

UI state (`showATS`, `exporting`) lives in component `useState`. Only content and mode are in Zustand, persisted via the `persist` middleware.

```
app/
├── globals.css
├── layout.tsx
└── page.tsx                    # dynamic ssr:false entry point
components/
├── ResumeBuilder.tsx           # shell, PDF export event handler
├── Toolbar.tsx                 # mode switcher, ATS toggle, export button
├── ATSPanel.tsx                # score ring + pass/fail badges
├── EditorPane.tsx              # textarea with per-mode syntax caret
└── PreviewPane.tsx             # scaled iframe preview, page break lines
constant/
├── config.ts                   # mode labels and file extensions
├── templates.ts                # default resume content per mode
└── theme.ts                    # all Tailwind class tokens
lib/
├── parsers.ts                  # Markdown→HTML, LaTeX→HTML, DOMPurify sanitizer
├── ats.ts                      # 24 ATS check functions
├── document-builder.ts         # assembles full HTML document for iframe + PDF
└── pdf-export.ts               # print-to-PDF via hidden iframe
store/
└── resume-store.ts             # mode + content, persisted to localStorage
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

- **Image uploads** — upload images, get short `{{img-xxx}}` tags, auto-resolved to base64 in preview and PDF
- **Font picker** — choose from a curated set of resume fonts per mode (e.g. Lato, Inter, Merriweather)
- **Tailwind config editor** — second editor tab in HTML mode to customise `tailwind.config.js` live
- **Theme/colour presets** — one-click accent colour swaps for the HTML template
- **Prebuilt templates** — multiple named starting templates per mode (minimal, modern, academic, etc.)
- **Prebuilt components** — drag-in blocks for experience entries, skill grids, education rows
- **Multiple resume tabs** — manage more than one resume in the same session
- **Export to DOCX** — Word-compatible export alongside PDF
