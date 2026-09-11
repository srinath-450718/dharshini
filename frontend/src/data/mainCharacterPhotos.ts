export interface MainCharacterPhotoItem {
  id: string;
  src: string;
  alt: string;
  nickname: string;
  caption: string;
  note: string;
  objectPosition: string;
  x?: number; // horizontal offset percentage or px
  y?: number; // vertical offset percentage or px
  scale?: number;
  rotation?: number; // subtle rotation in degrees (-3 to +3)
  size: "large" | "medium" | "small";
  zIndex?: number;
  isEmotionalFocus?: boolean;
  isAvoider?: boolean;
}

/**
 * Data-driven configuration for Module 4 — The Main Character Cinematic Stretched Gallery.
 * 
 * 10 Photos configured with Dharshini's real personal nicknames:
 * - "Princess"
 * - "Muttabondaa"
 * - "Bunny"
 * - "Kalnenjakkaari"
 * - "Lucky Charm"
 * - "Little Bunny"
 * 
 * HOW TO ADD / SWAP PHOTOS:
 * 1. Drop Dharshini's photos in `public/photos/` (e.g. `main-01.jpg` to `main-10.jpg`).
 * 2. Update the `src` field below to match the filename.
 * 3. Adjust `objectPosition` per photo (e.g. "center top", "50% 15%", "center 20%") to prevent head/face cropping.
 * 4. Adjust `x`, `y`, `rotation`, and `size` to fine-tune layout positioning.
 */
export const mainCharacterPhotos: MainCharacterPhotoItem[] = [
  {
    id: "photo-01",
    src: "/photos/main-01.jpg",
    alt: "Dharshini - Rooftop Sunset",
    nickname: "Little Bunny",
    caption: "Rooftop Sunset Glow",
    note: "Flower in your hair, purple saree at golden hour, and that gentle smile. Definitely Little Bunny mode.",
    objectPosition: "center 20%",
    size: "large",
    rotation: -2,
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 3,
  },
  {
    id: "photo-02",
    src: "/photos/main-02.jpg",
    alt: "Dharshini - Road Trip Shenanigans",
    nickname: "Muttabondaa",
    caption: "Road Trip Shenanigans",
    note: "Front seat secured, yellow dress on, smiling innocently like you didn't fight for shotgun.",
    objectPosition: "center 25%",
    size: "medium",
    rotation: 2,
    x: 5,
    y: -20,
    scale: 1,
    zIndex: 2,
  },
  {
    id: "photo-03",
    src: "/photos/main-03.jpg",
    alt: "Dharshini - Kannukutty in the Hills",
    nickname: "Kannukutty",
    caption: "Kannukutty in the Hills",
    note: "Dungarees, long braid, and green tea hills. Looking like the cutest little cartoon character. 😌",
    objectPosition: "center 15%",
    size: "medium",
    rotation: -1.5,
    x: -5,
    y: 15,
    scale: 1,
    zIndex: 4,
  },
  {
    id: "photo-04",
    src: "/photos/main-04.jpg",
    alt: "Dharshini - Saree with Sunglasses Swag",
    nickname: "Kalnenjakkaari",
    caption: "Unbothered & Unstoppable",
    note: "Saree, jasmine flowers, and dark shades. You really thought you were the boss here.",
    objectPosition: "center 20%",
    size: "medium",
    rotation: 2.2,
    x: 8,
    y: 25,
    scale: 1,
    zIndex: 2,
  },
  {
    id: "photo-05",
    src: "/photos/main-05.jpg",
    alt: "Dharshini - Garden Stroll",
    nickname: "Thenmozhi",
    caption: "Garden Stroll",
    note: "Graceful walk among the flowers. You actually look so poised here, don't let it go to your head.",
    objectPosition: "center 20%",
    size: "large",
    rotation: -1.5,
    x: -8,
    y: -10,
    scale: 1.02,
    zIndex: 5,
  },
  {
    id: "photo-06",
    src: "/photos/main-06.jpg",
    alt: "Dharshini - Pine Forest Chronicles",
    nickname: "Eruma Maadu",
    caption: "Pine Forest Chronicles",
    note: "Family trip, misty pine trees, and you peeking in the middle. Pure Eruma Maadu behavior.",
    objectPosition: "center 25%",
    size: "medium",
    rotation: 1.8,
    x: 0,
    y: 25,
    scale: 1,
    zIndex: 2,
  },
  {
    id: "photo-07",
    src: "/photos/main-07.jpg",
    alt: "Dharshini - Childhood Retro Cool with Aviators",
    nickname: "Professional Avoider",
    caption: "Born With Attitude",
    note: "The attitude started early. Giant aviators on, ignoring everyone since day one. 😂",
    objectPosition: "center 25%",
    size: "medium",
    rotation: -2,
    x: -10,
    y: 30,
    scale: 1,
    zIndex: 3,
    isAvoider: true,
  },
  {
    id: "photo-08",
    src: "/photos/main-08.jpg",
    alt: "Dharshini - The Soft Smile",
    nickname: "Kanmani",
    caption: "The Soft Smile",
    note: "Some smiles don't need any explanation. Just pure Kanmani.",
    objectPosition: "center 15%",
    size: "medium",
    rotation: 1.2,
    x: 8,
    y: 10,
    scale: 1,
    zIndex: 4,
  },
  {
    id: "photo-09",
    src: "/photos/main-09.jpg",
    alt: "Dharshini - Balcony Daydreams",
    nickname: "Princess",
    caption: "Balcony Daydreams",
    note: "Caught mid-thought. Royal appearance confirmed.",
    objectPosition: "center 20%",
    size: "medium",
    rotation: -1.8,
    x: -4,
    y: 20,
    scale: 1,
    zIndex: 2,
  },
  {
    id: "photo-10",
    src: "/photos/main-10.jpg",
    alt: "Dharshini - Radiant in Saree",
    nickname: "Lucky Charm",
    caption: "The one you keep coming back to",
    note: "Some pictures are just pictures. And then there are the ones you keep coming back to.",
    objectPosition: "center 15%",
    size: "large",
    rotation: 0,
    x: 0,
    y: 30,
    scale: 1.04,
    zIndex: 6,
    isEmotionalFocus: true,
  },
  {
    id: "photo-11",
    src: "/photos/main-11.jpg",
    alt: "Dharshini - Holding the baby",
    nickname: "Chellakutti",
    caption: "Soft Heart Confirmed",
    note: "Look at you acting all calm, gentle, and responsible. Who are you trying to fool? 😌",
    objectPosition: "center 15%",
    size: "medium",
    rotation: -1.2,
    x: -6,
    y: 15,
    scale: 1,
    zIndex: 3,
  },
  {
    id: "photo-12",
    src: "/photos/main-12.jpg",
    alt: "Dharshini - Laughing with friend",
    nickname: "Troublemaker",
    caption: "Smiling Through The Chaos",
    note: "Whatever chaos happened before or after this picture, you were definitely in the middle of it.",
    objectPosition: "center 20%",
    size: "large",
    rotation: 1.6,
    x: 6,
    y: 25,
    scale: 1.02,
    zIndex: 4,
  },
];
