export interface FontOption {
  id: string;
  name: string;
  family: string;
  importUrl: string;
  category: "sans-serif" | "serif" | "monospace" | "display";
}

export const FONT_OPTIONS: FontOption[] = [
  // ── Sans-serif ────────────────────────────────────────────────────────────
  {
    id: "inter",
    name: "Inter",
    category: "sans-serif",
    family: "'Inter', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "source-sans",
    name: "Source Sans 3",
    category: "sans-serif",
    family: "'Source Sans 3', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap",
  },
  {
    id: "ibm-plex",
    name: "IBM Plex Sans",
    category: "sans-serif",
    family: "'IBM Plex Sans', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "lato",
    name: "Lato",
    category: "sans-serif",
    family: "'Lato', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap",
  },
  {
    id: "raleway",
    name: "Raleway",
    category: "sans-serif",
    family: "'Raleway', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "work-sans",
    name: "Work Sans",
    category: "sans-serif",
    family: "'Work Sans', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },

  // ── Display ───────────────────────────────────────────────────────────────
  {
    id: "playfair",
    name: "Playfair Display",
    category: "display",
    family: "'Playfair Display', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap",
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    category: "display",
    family: "'Space Grotesk', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    category: "display",
    family: "'Cormorant Garamond', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },

  // ── Serif ─────────────────────────────────────────────────────────────────
  {
    id: "merriweather",
    name: "Merriweather",
    category: "serif",
    family: "'Merriweather', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap",
  },
  {
    id: "lora",
    name: "Lora",
    category: "serif",
    family: "'Lora', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap",
  },
  {
    id: "eb-garamond",
    name: "EB Garamond",
    category: "serif",
    family: "'EB Garamond', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "source-serif",
    name: "Source Serif 4",
    category: "serif",
    family: "'Source Serif 4', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap",
  },
  {
    id: "libre-baskerville",
    name: "Libre Baskerville",
    category: "serif",
    family: "'Libre Baskerville', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
  },

  // ── Monospace ─────────────────────────────────────────────────────────────
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    category: "monospace",
    family: "'JetBrains Mono', 'Courier New', monospace",
    importUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap",
  },
  {
    id: "fira-code",
    name: "Fira Code",
    category: "monospace",
    family: "'Fira Code', 'Courier New', monospace",
    importUrl: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    category: "monospace",
    family: "'IBM Plex Mono', 'Courier New', monospace",
    importUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap",
  },
];
