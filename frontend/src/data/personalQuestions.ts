export interface QuestionOption {
  id: string; // "a" | "b" | "c" | "d"
  label: string;
}

export interface PersonalQuestionItem {
  id: "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7";
  number: number;
  type: "mcq" | "text";
  question: string;
  subtitle?: string;
  options?: QuestionOption[];
  maxLength?: number;
  placeholder?: string;
  isImportant?: boolean;
  isEmotionalFocalPoint?: boolean;
}

export const personalQuestions: PersonalQuestionItem[] = [
  {
    id: "q1",
    number: 1,
    type: "mcq",
    question: "What was your first impression of me?",
    options: [
      { id: "a", label: "Quiet / Reserved" },
      { id: "b", label: "Funny / Fun to be around" },
      { id: "c", label: "Little bit annoying 😂" },
      { id: "d", label: "Something about him caught my attention" },
    ],
  },
  {
    id: "q2",
    number: 2,
    type: "mcq",
    question: "If I suddenly stopped talking to you, what would you feel?",
    options: [
      { id: "a", label: "Nothing much, honestly 😂" },
      { id: "b", label: "I'd notice it, but that's it" },
      { id: "c", label: "I'd actually miss talking to you" },
      { id: "d", label: "I'd wonder what happened and probably come looking for you" },
    ],
  },
  {
    id: "q3",
    number: 3,
    type: "mcq",
    question: "Which one describes me best in your life right now?",
    options: [
      { id: "a", label: "Just someone I know" },
      { id: "b", label: "A good friend" },
      { id: "c", label: "Someone I have a special connection with" },
      { id: "d", label: "Someone I can't really put into a category" },
    ],
  },
  {
    id: "q4",
    number: 4,
    type: "text",
    question: "What is something about me that you genuinely like, but have never actually told me?",
    subtitle: "Okay... now the real questions.",
    maxLength: 1000,
    placeholder: "Say what you actually think...",
    isImportant: true,
  },
  {
    id: "q5",
    number: 5,
    type: "text",
    question:
      "Do you think I treat you differently from the way I treat other people? If yes, what makes you feel that way?",
    maxLength: 1000,
    placeholder: "Be honest...",
    isImportant: true,
  },
  {
    id: "q6",
    number: 6,
    type: "text",
    question:
      "Have you ever wondered why I call you things like Lucky Charm, Muttabondaa, Princess, Bunny or Kalnenjakkaari, and why I care about the little things about you?",
    maxLength: 1000,
    placeholder: "Be honest...",
    isImportant: true,
  },
  {
    id: "q7",
    number: 7,
    type: "text",
    question:
      "Okay... be completely honest with me. When you think about me and the bond we have, what do you actually feel? What am I to you?",
    maxLength: 1500,
    placeholder: "Take your time. Say what you really feel...",
    isImportant: true,
    isEmotionalFocalPoint: true,
  },
];
