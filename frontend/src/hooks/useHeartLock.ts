import { useState, useCallback } from "react";

export type LockState = "idle" | "error" | "unlocking" | "unlocked" | "transitioning";

const ERROR_MESSAGES = [
  "Nice try. 😌",
  "Nope.",
  "That's not it, Dharshini.",
  "Think about your date of birth (DDMMYYYY).",
  "8 digits: DDMMYYYY...",
];

export function useHeartLock(onUnlocked?: () => void) {
  const [password, setPassword] = useState("");
  const [lockState, setLockState] = useState<LockState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [unlockStage, setUnlockStage] = useState<number>(0);

  const checkPassword = useCallback(() => {
    const clean = password.trim().toLowerCase();
    const cleanDigits = clean.replace(/[^0-9]/g, "");
    const cleanNoSpaces = clean.replace(/\s+/g, "");

    // Accept LuckyCharm (case-insensitive, with or without spaces) and DOB in standard formats:
    const isMatch =
      cleanNoSpaces === "luckycharm" ||
      clean === "luckycharm" ||
      clean === "lucky charm" ||
      clean === "11092007" ||
      cleanDigits === "11092007" ||
      cleanDigits === "1192007" ||
      cleanDigits === "110907" ||
      cleanDigits === "11907" ||
      cleanDigits === "1109" ||
      cleanDigits === "119" ||
      cleanDigits === "20070911" ||
      cleanDigits === "2007911" ||
      (clean.includes("11") && (clean.includes("sep") || clean.includes("09") || clean.includes("9")) && (clean.includes("2007") || clean.includes("07") || clean.includes("september")));

    if (isMatch) {
      setLockState("unlocking");
      setErrorMessage(null);
      setUnlockStage(1);

      // Sequenced progression
      // Stage 1: Input glows, button says "Unlocked", heart stops pulsing (immediate)
      // Stage 2: Tiny warm-gold light appears in center and expands (after 300ms)
      setTimeout(() => {
        setUnlockStage(2);
      }, 300);

      // Stage 3: Glowing vertical seam appears, heart gently opens into two halves (after 700ms)
      setTimeout(() => {
        setUnlockStage(3);
      }, 700);

      // Stage 4: Light shines from inside, particles travel, heart halves dissolve into particles (after 1200ms)
      setTimeout(() => {
        setUnlockStage(4);
      }, 1200);

      // Stage 5: Unlocked messages and Lucky Charm motif (after 1600ms)
      setTimeout(() => {
        setUnlockStage(5);
        setLockState("unlocked");
        if (onUnlocked) {
          onUnlocked();
        }
      }, 1600);

    } else {
      setAttempts((prev) => prev + 1);
      setLockState("error");
      // Select random teasing error message
      const randomMsg =
        ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
      setErrorMessage(randomMsg);

      // Reset error shake state after 700ms so user can immediately retry
      setTimeout(() => {
        setLockState("idle");
      }, 750);
    }
  }, [password, onUnlocked]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (lockState !== "unlocking" && lockState !== "unlocked") {
        checkPassword();
      }
    }
  };

  return {
    password,
    setPassword,
    lockState,
    errorMessage,
    attempts,
    unlockStage,
    checkPassword,
    handleKeyDown,
  };
}
