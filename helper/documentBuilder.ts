import type { EditorMode, ResumeTheme, TemplateLayout } from "@/types/resume";
import { FONTS, FONT_IMPORTS } from "@/constants/fonts";
import { parseMarkdown, parseLatex, sanitizeHTML } from "@/helper/parsers";
import { FONT_OPTIONS } from "@/constants/styleOptions";
import {
  A4_WIDTH_MM,
  DEFAULT_TEMPLATE_LAYOUT,
  SELECTION_OUTLINE,
  SELECTION_OUTLINE_OFFSET,
  TEXT_CONTENT_SLICE,
  BODY_FONT_SIZE,
  LINK_COLOR,
  TAILWIND_CDN,
} from "@/constants/config";

// Tailwind variant prefixes that don't apply in a static iframe/print context
const STRIP_VARIANTS =
  /^(?:sm|md|lg|xl|2xl|hover|focus(?:-within|-visible)?|active|visited|checked|disabled|dark|print|group-hover|group-focus|peer-hover|peer-focus|motion-(?:safe|reduce)|selection):/;

// Viewport-relative classes that cause iframe feedback loops
const STRIP_VIEWPORT =
  /^(?:min-h-screen|h-screen|w-screen|min-w-screen|max-h-screen|max-w-screen)$/;

// Animation / transition / cursor classes not needed in static preview
const STRIP_DYNAMIC =
  /^(?:transition|animate|duration|ease|delay|will-change|cursor|scroll-smooth|scroll-auto)(?:-|$)/;

function shouldStrip(cls: string): boolean {
  return (
    STRIP_VARIANTS.test(cls) ||
    STRIP_VIEWPORT.test(cls) ||
    STRIP_DYNAMIC.test(cls)
  );
}

function stripProblematicClasses(html: string): string {
  return html.replace(/class="([^"]*)"/g, (_, classes: string) => {
    const cleaned = classes
      .split(/\s+/)
      .filter((cls) => cls && !shouldStrip(cls))
      .join(" ");
    return `class="${cleaned}"`;
  });
}

const SKIP_TAGS = new Set([
  "script", "style", "head", "html", "body",
  "meta", "link", "title", "base", "noscript",
]);

function injectElementIds(html: string): string {
  let idx = 0;
  return html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>/g,
    (_: string, tag: string, attrs: string = "") => {
      if (SKIP_TAGS.has(tag.toLowerCase())) return `<${tag}${attrs}>`;
      idx++;
      return `<${tag}${attrs} data-rf-el="${idx}">`;
    }
  );
}

// Only text-bearing elements are clickable/editable
const CLICK_HANDLER =
  `(function(){` +
  `var T={p:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,li:1,td:1,th:1,span:1,a:1,strong:1,em:1,b:1,i:1};` +
  `var sel=null;` +
  `document.addEventListener('click',function(e){` +
    `var el=e.target;` +
    `while(el&&el.tagName!=='BODY'){` +
      `if(el.hasAttribute&&el.hasAttribute('data-rf-el')&&T[el.tagName.toLowerCase()])break;` +
      `el=el.parentElement;` +
    `}` +
    `if(!el||el.tagName==='BODY'){if(sel){sel.style.outline='';sel.style.outlineOffset='';sel=null;}window.parent.postMessage({type:'rf-close'},'*');return;}` +
    `if(sel){sel.style.outline='';sel.style.outlineOffset='';}` +
    `sel=el;` +
    `el.style.outline='${SELECTION_OUTLINE}';` +
    `el.style.outlineOffset='${SELECTION_OUTLINE_OFFSET}';` +
    `var cs=window.getComputedStyle(el);` +
    `window.parent.postMessage({` +
      `type:'rf-click',` +
      `elIdx:el.getAttribute('data-rf-el'),` +
      `tag:el.tagName.toLowerCase(),` +
      `text:(el.textContent||'').trim().slice(0,${TEXT_CONTENT_SLICE}),` +
      `x:e.clientX,` +
      `y:e.clientY,` +
      `computed:{color:cs.color,fontSize:cs.fontSize}` +
    `},'*');` +
    `e.preventDefault();` +
  `});` +
  `window.addEventListener('message',function(e){` +
    `if(!e.data)return;` +
    `if(e.data.type==='rf-style'){` +
      `var el=document.querySelector('[data-rf-el="'+e.data.elIdx+'"]');` +
      `if(!el)return;` +
      `var s=e.data.styles;` +
      `if(s.fontSize!==undefined)el.style.fontSize=s.fontSize;` +
      `if(s.color!==undefined)el.style.color=s.color;` +
    `}` +
    `if(e.data.type==='rf-text'){` +
      `var el=document.querySelector('[data-rf-el="'+e.data.elIdx+'"]');` +
      `if(el)el.textContent=e.data.text;` +
    `}` +
    `if(e.data.type==='rf-deselect'){` +
      `if(sel){sel.style.outline='';sel.style.outlineOffset='';sel=null;}` +
    `}` +
  `});` +
  `})()`;

const CLICK_SCRIPT = `<script>${CLICK_HANDLER}</` + `script>`;

export function buildResumeDocument(
  rawContent: string,
  mode: EditorMode,
  theme?: ResumeTheme,
  fontId?: string,
  layout?: TemplateLayout
): string {
  let body: string;
  if (mode === "latex") {
    body = sanitizeHTML(parseLatex(rawContent, theme!));
  } else if (mode === "markdown") {
    body = sanitizeHTML(parseMarkdown(rawContent, theme!));
  } else {
    body = stripProblematicClasses(sanitizeHTML(rawContent));
  }

  body = injectElementIds(body);

  const overrideFont = fontId ? FONT_OPTIONS.find((f) => f.id === fontId) : null;
  const fontUrl    = overrideFont?.importUrl ?? FONT_IMPORTS[mode];
  const fontFamily = overrideFont?.family    ?? FONTS[mode];
  // Tailwind utility classes (font-serif, font-sans, font-mono) override body font-family.
  // When the user picks a custom font, force it on every element.
  const fontOverrideCSS = overrideFont
    ? `* { font-family: ${fontFamily} !important; }`
    : "";

  // Tailwind's leading-* classes override body line-height (Tailwind CDN injects after our <style>).
  // For Markdown/LaTeX force the user's spacing value on all elements, same pattern as fontOverrideCSS.
  const lineHeightOverrideCSS = mode !== "html"
    ? `* { line-height: ${layout?.lineHeight ?? DEFAULT_TEMPLATE_LAYOUT.lineHeight} !important; }`
    : "";

  const tailwindScript = `<script src="${TAILWIND_CDN}"><\/script>`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<base target="_blank"/>
<link href="${fontUrl}" rel="stylesheet"/>
${tailwindScript}
${CLICK_SCRIPT}
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background: #fff;
    overflow-x: hidden;
    overflow-y: visible;
  }

  body {
    font-family: ${fontFamily};
    font-size: ${BODY_FONT_SIZE};
    line-height: ${layout?.lineHeight ?? DEFAULT_TEMPLATE_LAYOUT.lineHeight};
    color: #000;
    background: #fff;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: visible;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  ${fontOverrideCSS}
  ${lineHeightOverrideCSS}
  a { color: ${LINK_COLOR}; text-decoration: none; }
  img { max-width: 100%; height: auto; }

  .page-break { page-break-before: always; break-before: page; }
  h2, h3 { page-break-after: avoid; break-after: avoid; }
  ul, ol { page-break-inside: avoid; break-inside: avoid; }

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    html, body {
      width: 210mm;
      margin: 0;
      padding: 0;
      background: #fff;
      overflow-x: hidden;
      overflow-y: visible;
    }
    a { color: inherit !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; outline: none !important; max-width: 100%; }
  }
</style>
</head>
<body>${
    mode === "html"
      ? body
      : (() => {
          const marginMm  = layout?.marginMm  ?? DEFAULT_TEMPLATE_LAYOUT.marginMm;
          const paddingMm = layout?.paddingMm ?? DEFAULT_TEMPLATE_LAYOUT.paddingMm;
          const widthMm   = A4_WIDTH_MM - 2 * marginMm;
          return `<div style="width:${widthMm}mm;margin:0 auto;padding:${paddingMm}mm 0">${body}</div>`;
        })()
  }</body>
</html>`;
}
