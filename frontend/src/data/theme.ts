export const PALETTE = {
  // Midnight Navy Backgrounds
  background: {
    darkest: "#050817",
    primary: "#080D25",
    surface: "#0D1330",
    secondaryDark: "#111936",
    elevated: "#151A3A",
    border: "rgba(255, 247, 240, 0.08)",
  },
  // Accents
  accent: {
    pinkSubtle: "#E88AAA",
    pinkBlush: "#D97898",
    pink: "#F05AA6",
    pinkGlow: "rgba(232, 138, 170, 0.18)",
    pinkAtmosphere: "rgba(232, 138, 170, 0.05)",
    gold: "#F5C84B",
    goldGlow: "rgba(245, 200, 75, 0.3)",
    goldSoft: "rgba(245, 200, 75, 0.12)",
  },
  // Typography
  text: {
    primary: "#FFF7F0", // warm cream / off-white
    secondary: "#AEB6CC", // muted blue-grey
    muted: "#6D7792",
  },
} as const;

export const FONTS = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  display: "'Cinzel', serif",
} as const;
