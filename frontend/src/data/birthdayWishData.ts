/**
 * Data-Driven Configuration for Module 7 — The Birthday Wish Ceremony
 *
 * Cleaned, sincere, thoughtful, and free from cringe or repetitive copy.
 */

export interface BirthdayWishContent {
  date: string;
  name: string;
  intro: {
    eyebrow: string;
    headline: string;
    name: string;
    supporting: string;
    subSupporting: string;
  };
  cake: {
    totalCandles: number;
    title: string;
    subtitle: string;
    progressLabel: string;
    blowOutButtonText: string;
  };
  wishPrompt: {
    title: string;
    dontTell: string;
    goodOne: string;
    buttonText: string;
  };
  wishProse: {
    lead: string;
    points: string[];
    closingCallout: string;
    closingHope: string;
    closingDeserve: string;
  };
  finalGreeting: {
    headline: string;
    subline: string;
  };
  finalCard: {
    eyebrow: string;
    headline: string;
    name: string;
    wishes: string[];
    photo: {
      src: string;
      fallbackSrc: string;
      alt: string;
      objectPosition: string;
    };
  };
  gifHint: {
    gifSrc: string;
    fallbackSrc: string;
    alt: string;
    line1: string;
    line2: string;
    buttonText: string;
  };
}

export const birthdayWishData: BirthdayWishContent = {
  date: "September 11",
  name: "Dharshini",
  intro: {
    eyebrow: "SEPTEMBER 11",
    headline: "HAPPY BIRTHDAY",
    name: "Dharshini.",
    supporting: "Today is yours.",
    subSupporting: "One more year of being you.",
  },
  cake: {
    totalCandles: 7,
    title: "Make a wish.",
    subtitle: "Seven little lights.",
    progressLabel: "OF 7",
    blowOutButtonText: "BLOW THEM OUT",
  },
  wishPrompt: {
    title: "Now make your wish.",
    dontTell: "Don't tell me.",
    goodOne: "Just make a good one.",
    buttonText: "I MADE MY WISH",
  },
  wishProse: {
    lead: "May this year be kind to you.",
    points: [
      "More reasons to smile.",
      "More moments that make you genuinely happy.",
      "More dreams turning into things you can actually hold.",
      "And a little more time to take care of yourself too.",
    ],
    closingCallout: "Dharshini,",
    closingHope: "I genuinely hope this year brings you good things.",
    closingDeserve: "Things you deserve.",
  },
  finalGreeting: {
    headline: "HAPPY BIRTHDAY, DHARSHINI.",
    subline: "Keep being you.",
  },
  finalCard: {
    eyebrow: "SEPTEMBER 11",
    headline: "HAPPY BIRTHDAY",
    name: "Dharshini",
    wishes: [
      "May this year be kinder to you.",
      "More laughter.",
      "More good memories.",
      "More reasons to smile.",
    ],
    photo: {
      src: "/photos/hero.jpg",
      fallbackSrc: "/photos/timeline-02.jpg",
      alt: "Dharshini - Birthday Portrait",
      objectPosition: "center 20%",
    },
  },
  gifHint: {
    gifSrc: "/assets/bubu-dudu.gif",
    fallbackSrc: "https://media1.tenor.com/m/RFmhzeK8E9oAAAAC/bubu-dudu.gif",
    alt: "Bubu Dudu Kiss",
    line1: "Okay... one last thing. 😌",
    line2: "Don't overthink it.",
    buttonText: "CONTINUE",
  },
};
