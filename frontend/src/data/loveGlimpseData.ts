/**
 * Data-Driven Configuration for Module 6 — The Little Love Glimpse
 *
 * Designed for intentional ambiguity:
 * Sincere, observing, personal, but strictly NO direct love confession.
 * Easy to update, customize, or fine-tune.
 */

export interface GlimpseNicknameItem {
  id: string;
  name: string;
}

export interface GlimpseObservationItem {
  id: string;
  text: string;
}

export interface LoveGlimpseContent {
  intro: {
    darknessDelayMs: number;
    lines: string[];
  };
  shift: {
    annoying: string;
    pauseLine: string;
    revealLine: string;
  };
  nicknames: GlimpseNicknameItem[];
  nicknameReflection: {
    lead: string;
    allNames: string[];
    closing: string[];
  };
  observations: GlimpseObservationItem[];
  observationClimax: {
    lead: string;
    line: string;
  };
  doubleMeaning: {
    lines: string[];
    orMaybe: string;
    climax: string;
    playfulReset: string;
  };
  photo: {
    src: string;
    fallbackSrc: string;
    alt: string;
    objectPosition: string;
  };
  importantLine: {
    leadLines: string[];
    mainStatement: string;
  };
  closingReset: {
    okay: string;
    sincerity: string;
    dontGetUsedToIt: string;
    bridge: string[];
    buttonText: string;
  };
}

export const loveGlimpseData: LoveGlimpseContent = {
  intro: {
    darknessDelayMs: 1000,
    lines: [
      "Well...",
      "That was interesting.",
      "I asked you what you think about me.",
      "But I never really told you what I think about you.",
    ],
  },
  shift: {
    annoying: "You're annoying.",
    pauseLine: "Occasionally.",
    revealLine: "Actually... You've become someone I care about.",
  },
  nicknames: [
    { id: "nick-1", name: "Princess." },
    { id: "nick-2", name: "Muttabondaa." },
    { id: "nick-3", name: "Bunny." },
    { id: "nick-4", name: "Kalnenjakkaari." },
    { id: "nick-5", name: "Lucky Charm." },
  ],
  nicknameReflection: {
    lead: "Somehow you collected quite a few names.",
    allNames: ["Princess.", "Little Bunny.", "Muttabondaa.", "Kalnenjakkaari.", "Lucky Charm."],
    closing: [
      "And somehow...",
      "You became the person behind all of them.",
    ],
  },
  observations: [
    { id: "obs-1", text: "You care about everyone around you." },
    { id: "obs-2", text: "You worry about people more than you worry about yourself." },
    { id: "obs-3", text: "You disappear when you feel like it." },
    { id: "obs-4", text: "You change moods like it's a professional skill." },
  ],
  observationClimax: {
    lead: "And somehow...",
    line: "I still look forward to hearing from you.",
  },
  doubleMeaning: {
    lines: [
      "Maybe it's the nickname.",
      "Maybe it's the teasing.",
      "Maybe it's just the way you are.",
    ],
    orMaybe: "Or maybe...",
    climax: "It's something else.",
    playfulReset: "Anyway. 😌",
  },
  photo: {
    src: "/photos/glimpse.png",
    fallbackSrc: "/photos/main-10.jpg",
    alt: "Dharshini - The quiet moment in traditional saree",
    objectPosition: "center 15%",
  },
  importantLine: {
    leadLines: [
      "Maybe you already noticed.",
      "Maybe you didn't.",
      "Either way...",
    ],
    mainStatement: "I think you know you're a little more special than you pretend to be.",
  },
  closingReset: {
    okay: "Okay.",
    sincerity: "That's enough sincerity for one day.",
    dontGetUsedToIt: "Don't get used to it.",
    bridge: [
      "Come on.",
      "There are still a few things waiting for you.",
    ],
    buttonText: "KEEP GOING",
  },
};
