export interface SiteConfig {
  recipientName: string;
  nicknames: string[];
  primaryNickname: string;
  secondaryNickname: string;
  birthdayDate: string;
  navigationItems: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  recipientName: "Dharshini",
  nicknames: ["Lucky Charm", "Little Bunny"],
  primaryNickname: "Lucky Charm",
  secondaryNickname: "Little Bunny",
  birthdayDate: "September 9",
  navigationItems: [
    { label: "The Dossier", href: "#hero" },
    { label: "Avoidance Radar", href: "#teasing" },
    { label: "Frames", href: "#gallery" },
    { label: "Reminders", href: "#reminders" },
    { label: "The Letter", href: "#letter" },
  ],
};
