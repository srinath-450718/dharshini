export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  tag: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

// Data-driven photo registry.
// To use Dharshini's real photos:
// 1. Place the image files in /public/photos/ (e.g. /photos/photo1.jpg)
// 2. Update the 'url' field below to match the filename.
export const initialPhotos: PhotoItem[] = [
  {
    id: "frame-1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    title: "The Subtle Grin",
    caption: "That exact face she makes right before she denies being in a mood.",
    tag: "Signature Look",
    aspectRatio: "portrait",
  },
  {
    id: "frame-2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    title: "Always On The Move",
    caption: "Managing ten different family tasks, zero minutes reserved for herself.",
    tag: "Unstoppable",
    aspectRatio: "portrait",
  },
  {
    id: "frame-3",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85",
    title: "The 'Don't Bug Me' Glare",
    caption: "Standard protocol whenever I bring up school memories she thought I forgot.",
    tag: "Caution Advised",
    aspectRatio: "portrait",
  },
  {
    id: "frame-4",
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=85",
    title: "Golden Hour Glow",
    caption: "Looking like the quiet center of gravity in every room she walks into.",
    tag: "Lucky Charm",
    aspectRatio: "portrait",
  },
];
