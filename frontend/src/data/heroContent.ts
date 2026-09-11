export interface HeroBadge {
  id: string;
  label: string;
  value: string;
}

export interface HeroContent {
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  subtitle: string;
  teaseQuote: string;
  stats: HeroBadge[];
  scrollPrompt: string;
}

export const heroContent: HeroContent = {
  eyebrow: "CONFIDENTIAL DOSSIER • FILE #09-09",
  headlinePrefix: "You can try ",
  headlineHighlight: "avoiding me,",
  headlineSuffix: " but you can't avoid your birthday.",
  subtitle:
    "Happy Birthday, Lucky Charm. Yes, you—Little Bunny. Here’s a little corner of the internet made just for the girl who carries the world on her shoulders and still pretends she isn't tired.",
  teaseQuote:
    "“Special skill: vanished mid-conversation, only to reappear 3 days later acting like nothing happened.”",
  stats: [
    {
      id: "avoidance",
      label: "Avoidance Frequency",
      value: "84%",
    },
    {
      id: "moods",
      label: "Daily Mood Cycles",
      value: "4.7 / day",
    },
    {
      id: "caring",
      label: "Family Care Index",
      value: "Infinite",
    },
    {
      id: "selfcare",
      label: "Sleep Prioritization",
      value: "Critically Low",
    },
  ],
  scrollPrompt: "Scroll to decrypt the dossier",
};
