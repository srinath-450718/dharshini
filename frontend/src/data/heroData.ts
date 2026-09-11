export interface HeroData {
  title: [string, string];
  subtitle: string;
  description: string;
  nickname: string;
  heroPhoto: string;
  fallbackPhoto: string;
  photoAlt: string;
}

export const heroData: HeroData = {
  title: ["Happy Birthday,", "Dear Dharshini."],
  subtitle: "Welcome to your little surprise.",
  description: "Made for one very particular person.",
  nickname: "Yes, you. Lucky Charm.",
  heroPhoto: "/photos/hero.jpg",
  fallbackPhoto:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=85",
  photoAlt: "Cinematic portrait of Dharshini",
};
