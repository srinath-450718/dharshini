export interface TimelineItem {
  id: string;
  label: string;
  title: string;
  description: string;
  delayedText?: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  note: string;
  specialIcon?: "charm" | "bunny" | "heart" | "none";
  isAvoiderEvent?: boolean;
}

/**
 * Data-driven timeline configuration for Dharshini's personal story.
 *
 * HOW TO ADD / CHANGE PHOTOS:
 * 1. Drop Dharshini's photos in `public/photos/` (e.g. `public/photos/timeline-01.jpg`)
 * 2. Update the `image` field below to match the path: `/photos/timeline-01.jpg`.
 * 3. Adjust `objectPosition` if needed (e.g. "center top", "center 20%").
 *
 * HOW TO ADD PERSONAL NOTES:
 * Simply add your text inside the `note` field for any event (e.g. note: "My personal memory...").
 * When empty (note: ""), the layout preserves its natural space without showing placeholder text.
 */
export const timelineEvents: TimelineItem[] = [
  {
    id: "school-days",
    label: "SCHOOL DAYS",
    title: "We knew each other.",
    description:
      "We had our own worlds. Nothing particularly dramatic. Just school days, random moments, and life moving along.",
    image: "/photos/timeline-01.jpg",
    imageAlt: "Dharshini during school days",
    objectPosition: "center 20%",
    note: "",
    specialIcon: "none",
  },
  {
    id: "somewhere-along",
    label: "SOMEWHERE ALONG THE WAY",
    title: "Something changed.",
    description:
      "I don't remember exactly when it happened. You just slowly became someone I started noticing.",
    image: "/photos/timeline-02.jpg",
    imageAlt: "Dharshini sitting on the bench",
    objectPosition: "center 15%",
    note: "",
    specialIcon: "none",
  },
  {
    id: "the-nickname",
    label: "THE NICKNAME",
    title: "Lucky Charm.",
    description:
      "Somehow you earned yourself a nickname. And somehow it stuck.",
    image: "/photos/timeline-03.jpg",
    imageAlt: "Dharshini in maroon dress - Lucky Charm",
    objectPosition: "center 15%",
    note: "",
    specialIcon: "charm",
  },
  {
    id: "round-two",
    label: "ROUND TWO",
    title: "Little Bunny.",
    description:
      "Because apparently one nickname wasn't enough.",
    image: "/photos/timeline-04.jpg",
    imageAlt: "Dharshini with pink feather headband - Little Bunny",
    objectPosition: "center 15%",
    note: "",
    specialIcon: "bunny",
  },
  {
    id: "avoiding-era",
    label: "THE AVOIDING ERA",
    title: "Professional Avoider.",
    description:
      "You've somehow turned avoiding me into a skill. Honestly, impressive.",
    image: "/photos/timeline-05.jpg",
    imageAlt: "Dharshini on scooter - Professional Avoider",
    objectPosition: "center 15%",
    note: "",
    specialIcon: "none",
    isAvoiderEvent: true,
  },
  {
    id: "mood-department",
    label: "THE MOOD DEPARTMENT",
    title: "Which version are we getting today?",
    description:
      "Your mood changes faster than my Wi-Fi. Still trying to keep up.",
    image: "/photos/timeline-06.jpg",
    imageAlt: "Dharshini on college balcony - Mood department",
    objectPosition: "center 20%",
    note: "",
    specialIcon: "none",
  },
  {
    id: "caring-part",
    label: "THE CARING PART",
    title: "You care a lot.",
    description:
      "You spend so much time making sure everyone else is okay. Sometimes I think you forget to check on yourself.",
    image: "/photos/timeline-07.jpg",
    imageAlt: "Dharshini in traditional saree - The caring side",
    objectPosition: "center 15%",
    note: "",
    specialIcon: "none",
  },
  {
    id: "now",
    label: "NOW",
    title: "And somehow...",
    description:
      "I started hoping you wouldn't become just another person I used to know.",
    delayedText: "Funny how that happens.",
    image: "/photos/timeline-08.jpg",
    imageAlt: "Dharshini - Now and onwards",
    objectPosition: "center 15%",
    note: "",
    specialIcon: "heart",
  },
];
