/**
 * Data configuration for Module 10 — Final Big Photo Heart
 *
 * 17 Real photographs of Dharshini from public/photos/,
 * mapped with custom face-safe objectPosition values and
 * precise normalized heart coordinates (x%, y%).
 */

export interface HeartPhotoItem {
  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  objectPosition: string;
  /** Normalized final target position in % relative to heart center */
  x: number;
  y: number;
  /** Initial scattered position in % for assembly animation */
  scatterX: number;
  scatterY: number;
  scatterRotation: number;
  /** Final subtle tilt in degrees */
  rotation: number;
  /** Size modifier (0.9 to 1.1) */
  scale: number;
}

export const photoHeartList: HeartPhotoItem[] = [
  // ==========================================
  // ROW 1: TOP LEFT LOBE (2 photos)
  // ==========================================
  {
    id: "h-top-left-outer",
    src: "/photos/main-01.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Rooftop Sunset (Little Bunny)",
    objectPosition: "center 20%",
    x: -24,
    y: -36,
    scatterX: -44,
    scatterY: -48,
    scatterRotation: -12,
    rotation: -2,
    scale: 1,
  },
  {
    id: "h-top-left-inner",
    src: "/photos/main-02.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Road trip yellow dress (Muttabondaa)",
    objectPosition: "center 25%",
    x: -11,
    y: -40,
    scatterX: -18,
    scatterY: -55,
    scatterRotation: 8,
    rotation: 1.5,
    scale: 1.04,
  },

  // ==========================================
  // ROW 1: TOP RIGHT LOBE (2 photos)
  // ==========================================
  {
    id: "h-top-right-inner",
    src: "/photos/main-03.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Green hills (Kannukutty)",
    objectPosition: "center 15%",
    x: 11,
    y: -40,
    scatterX: 18,
    scatterY: -55,
    scatterRotation: -9,
    rotation: -1.5,
    scale: 1.04,
  },
  {
    id: "h-top-right-outer",
    src: "/photos/main-04.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Saree with shades (Kalnenjakkaari)",
    objectPosition: "center 20%",
    x: 24,
    y: -36,
    scatterX: 45,
    scatterY: -46,
    scatterRotation: 14,
    rotation: 2,
    scale: 1,
  },

  // ==========================================
  // ROW 2: UPPER BODY / WIDEST SECTION (5 photos)
  // ==========================================
  {
    id: "h-upper-left-outer",
    src: "/photos/main-05.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Garden stroll (Thenmozhi)",
    objectPosition: "center 20%",
    x: -36,
    y: -18,
    scatterX: -54,
    scatterY: -15,
    scatterRotation: 10,
    rotation: -2,
    scale: 0.98,
  },
  {
    id: "h-upper-left-mid",
    src: "/photos/main-06.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Pine forest",
    objectPosition: "center 25%",
    x: -18,
    y: -20,
    scatterX: -26,
    scatterY: -22,
    scatterRotation: -7,
    rotation: 1,
    scale: 1.02,
  },
  {
    id: "h-upper-center",
    src: "/photos/hero.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Cinematic Hero portrait",
    objectPosition: "center 20%",
    x: 0,
    y: -22,
    scatterX: 0,
    scatterY: -30,
    scatterRotation: 4,
    rotation: 0,
    scale: 1.08,
  },
  {
    id: "h-upper-right-mid",
    src: "/photos/main-07.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Retro cool aviators",
    objectPosition: "center 25%",
    x: 18,
    y: -20,
    scatterX: 28,
    scatterY: -20,
    scatterRotation: -11,
    rotation: -1,
    scale: 1.02,
  },
  {
    id: "h-upper-right-outer",
    src: "/photos/main-08.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - The Soft Smile",
    objectPosition: "center 15%",
    x: 36,
    y: -18,
    scatterX: 52,
    scatterY: -12,
    scatterRotation: 8,
    rotation: 2,
    scale: 0.98,
  },

  // ==========================================
  // ROW 3: MIDDLE BODY (4 photos)
  // ==========================================
  {
    id: "h-mid-left-outer",
    src: "/photos/main-09.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Balcony Daydreams (Princess)",
    objectPosition: "center 20%",
    x: -28,
    y: 2,
    scatterX: -48,
    scatterY: 15,
    scatterRotation: -14,
    rotation: -1.8,
    scale: 1,
  },
  {
    id: "h-mid-left-center",
    src: "/photos/main-10.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Radiant in Saree (Lucky Charm)",
    objectPosition: "center 15%",
    x: -10,
    y: 0,
    scatterX: -14,
    scatterY: 8,
    scatterRotation: 6,
    rotation: 1.2,
    scale: 1.06,
  },
  {
    id: "h-mid-right-center",
    src: "/photos/main-11.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Holding baby (Chellakutti)",
    objectPosition: "center 15%",
    x: 10,
    y: 0,
    scatterX: 15,
    scatterY: 12,
    scatterRotation: -8,
    rotation: -1.2,
    scale: 1.06,
  },
  {
    id: "h-mid-right-outer",
    src: "/photos/main-12.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Laughing in the chaos",
    objectPosition: "center 20%",
    x: 28,
    y: 2,
    scatterX: 46,
    scatterY: 20,
    scatterRotation: 12,
    rotation: 1.6,
    scale: 1,
  },

  // ==========================================
  // ROW 4: LOWER TAPER (3 photos)
  // ==========================================
  {
    id: "h-taper-left",
    src: "/photos/timeline-02.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Sitting on bench",
    objectPosition: "center 15%",
    x: -18,
    y: 22,
    scatterX: -32,
    scatterY: 42,
    scatterRotation: 9,
    rotation: -1.5,
    scale: 1,
  },
  {
    id: "h-taper-center",
    src: "/photos/timeline-03.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Maroon dress (Lucky Charm)",
    objectPosition: "center 15%",
    x: 0,
    y: 18,
    scatterX: 2,
    scatterY: 34,
    scatterRotation: -5,
    rotation: 0.5,
    scale: 1.05,
  },
  {
    id: "h-taper-right",
    src: "/photos/timeline-04.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Pink feather headband (Little Bunny)",
    objectPosition: "center 15%",
    x: 18,
    y: 22,
    scatterX: 30,
    scatterY: 44,
    scatterRotation: -10,
    rotation: 1.5,
    scale: 1,
  },

  // ==========================================
  // ROW 5: BOTTOM POINT (1 photo)
  // ==========================================
  {
    id: "h-bottom-point",
    src: "/photos/timeline-07.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Dharshini - Traditional Saree (The Caring Side)",
    objectPosition: "center 15%",
    x: 0,
    y: 40,
    scatterX: 0,
    scatterY: 58,
    scatterRotation: 15,
    rotation: 0,
    scale: 1.08,
  },
];

export const photoHeartCopy = {
  title: "A Heart Full of Memories",
  postFormation: {
    line1: "Some memories are worth keeping close.",
    line2: "Happy Birthday, Dharshini.",
  },
  finalCard: {
    greeting: "Happy Birthday, Dharshini.",
    wish: "I hope this year gives you everything you've been dreaming of.",
    closing1: "Keep being you.",
    closing2: "Take care of yourself, Lucky Charm.",
  },
};
