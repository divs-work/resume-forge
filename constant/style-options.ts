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
    id: "dm-sans",
    name: "DM Sans",
    category: "sans-serif",
    family: "'DM Sans', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "source-sans",
    name: "Source Sans 3",
    category: "sans-serif",
    family: "'Source Sans 3', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap",
  },
  {
    id: "plus-jakarta",
    name: "Plus Jakarta Sans",
    category: "sans-serif",
    family: "'Plus Jakarta Sans', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
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
    id: "nunito",
    name: "Nunito",
    category: "sans-serif",
    family: "'Nunito', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "raleway",
    name: "Raleway",
    category: "sans-serif",
    family: "'Raleway', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "outfit",
    name: "Outfit",
    category: "sans-serif",
    family: "'Outfit', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "josefin",
    name: "Josefin Sans",
    category: "sans-serif",
    family: "'Josefin Sans', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "manrope",
    name: "Manrope",
    category: "sans-serif",
    family: "'Manrope', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "work-sans",
    name: "Work Sans",
    category: "sans-serif",
    family: "'Work Sans', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "rubik",
    name: "Rubik",
    category: "sans-serif",
    family: "'Rubik', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "karla",
    name: "Karla",
    category: "sans-serif",
    family: "'Karla', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "figtree",
    name: "Figtree",
    category: "sans-serif",
    family: "'Figtree', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "mulish",
    name: "Mulish",
    category: "sans-serif",
    family: "'Mulish', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "barlow",
    name: "Barlow",
    category: "sans-serif",
    family: "'Barlow', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },

  // ── Display ───────────────────────────────────────────────────────────────
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    category: "display",
    family: "'Space Grotesk', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "sora",
    name: "Sora",
    category: "display",
    family: "'Sora', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap",
  },
  {
    id: "urbanist",
    name: "Urbanist",
    category: "display",
    family: "'Urbanist', system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "dm-serif",
    name: "DM Serif Display",
    category: "display",
    family: "'DM Serif Display', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    category: "display",
    family: "'Playfair Display', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap",
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
    id: "libre-baskerville",
    name: "Libre Baskerville",
    category: "serif",
    family: "'Libre Baskerville', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
  },
  {
    id: "crimson-pro",
    name: "Crimson Pro",
    category: "serif",
    family: "'Crimson Pro', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  {
    id: "source-serif",
    name: "Source Serif 4",
    category: "serif",
    family: "'Source Serif 4', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap",
  },
  {
    id: "pt-serif",
    name: "PT Serif",
    category: "serif",
    family: "'PT Serif', Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap",
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
  {
    id: "space-mono",
    name: "Space Mono",
    category: "monospace",
    family: "'Space Mono', 'Courier New', monospace",
    importUrl: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
  },
  {
    id: "roboto-mono",
    name: "Roboto Mono",
    category: "monospace",
    family: "'Roboto Mono', 'Courier New', monospace",
    importUrl: "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap",
  },
];
