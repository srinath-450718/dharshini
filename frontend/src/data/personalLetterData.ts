export interface PersonalLetterData {
  envelope: {
    label: string;
    buttonText: string;
  };
  header: {
    salutation: string;
    subline: string;
  };
  body: {
    p1: string;
    pauseLine: string;
    specialMoment1: string;
    p2: string;
    specialMoment2: string;
    p3_1: string;
    p3_2: string;
    caringLine1: string;
    caringLine2: string;
    distanceLine1: string;
    distanceLine2: string;
    shoulderLines: string[];
    careReason1: string;
    careReason2: string;
    wishesLead: string;
    wishesPoints: string[];
    wishesClosing: string;
    luckyCharmLine: {
      lead: string;
      nickname: string;
    };
    birthdayGreeting: string;
    playful1: string;
    playful2: string;
    playful3: string;
    playful4: string;
    signature: string;
  };
  closing: {
    anyway: string;
    enough: string;
    dontGetUsed: string;
    journey: string;
    buttonText: string;
  };
  photo: {
    src: string;
    alt: string;
    caption: string;
  };
}

export const personalLetterData: PersonalLetterData = {
  envelope: {
    label: "For Dharshini",
    buttonText: "OPEN LETTER",
  },
  header: {
    salutation: "Dharshini",
    subline: "I wish all the good things in this world for you.",
  },
  body: {
    p1: "There are many people in this world who can care for you and maybe sometimes you might even feel that they understand you well.",
    pauseLine: "But you know what?",
    specialMoment1: "I don't think anyone understands you in the way I have tried to.",
    p2: "I've spent so much time noticing the little things about you that sometimes I can feel what you're going through even before you say it.",
    specialMoment2: "Sometimes I feel like I know something about you that even you haven't noticed about yourself yet.",
    p3_1: "I've always noticed how much you care about the people around you.",
    p3_2: "You make sure everyone else is okay and somewhere along the way forget to take care of yourself.",
    caringLine1: "So please take care of yourself too.",
    caringLine2: "You deserve the same care you give everyone else.",
    distanceLine1: "Even if you push me away from your life I'll never force myself into it.",
    distanceLine2: "I'll stay somewhere at a distance hoping that someday I'll get to be a little closer to you again.",
    shoulderLines: [
      "If you ever need a shoulder to lean on I'll be there.",
      "If you ever need someone to listen I'll be there.",
      "And if you ever have tears that you don't know where to put I'll be there to wipe them away.",
    ],
    careReason1: "Not because you owe me anything.",
    careReason2: "Just because I care about you.",
    wishesLead: "I hope from this year onwards you get everything you've been dreaming of.",
    wishesPoints: [
      "More reasons to smile.",
      "More moments that make you genuinely happy.",
      "More things that make you proud of yourself.",
    ],
    wishesClosing: "And wherever life takes you I hope it takes you somewhere good.",
    luckyCharmLine: {
      lead: "Take care of yourself",
      nickname: "Lucky Charm.",
    },
    birthdayGreeting: "Happy Birthday Dharshini.",
    playful1: "Keep being the annoying caring moody little person you are.",
    playful2: "I wouldn't want you any other way.",
    playful3: "And don't get too emotional reading this.",
    playful4: "You already have enough evidence that I'm occasionally nice.",
    signature: "From someone who's still somewhere nearby cheering for you.",
  },
  closing: {
    anyway: "Anyway",
    enough: "That's enough sincerity for one letter.",
    dontGetUsed: "Don't get used to it.",
    journey: "There is one last little journey.",
    buttonText: "CONTINUE →",
  },
  photo: {
    src: "/photos/glimpse.png",
    alt: "Dharshini - A quiet memory tucked into the letter",
    caption: "A quiet moment with you.",
  },
};

