import React, { useState, useRef, useEffect, useCallback } from "react";
import { LetterEnvelope } from "./LetterEnvelope";
import { ContinuousLetter } from "./ContinuousLetter";
import { cn } from "../../utils/cn";

export interface PersonalLetterProps {
  onContinueToNext?: () => void;
  className?: string;
}

const TARGET_VOLUME = 0.32;
const FADE_IN_DURATION_MS = 1200;
const FADE_OUT_DURATION_MS = 1000;
const FADE_STEP_MS = 50;

export const PersonalLetter: React.FC<PersonalLetterProps> = ({
  onContinueToNext,
  className,
}) => {
  // Single source of truth for the Personal Letter audio lifecycle
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);

  // Stable HTMLAudioElement ref preserved across re-renders and animation steps
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const clearFadeTimer = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  // Helper to obtain or lazily initialize the single Audio instance
  const getOrCreateAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/audio/letter-bgm.mp3");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  // Smooth Fade-In function
  const startBgmWithFadeIn = useCallback(() => {
    const audio = getOrCreateAudio();
    clearFadeTimer();

    // Always start from beginning with zero volume
    audio.currentTime = 0;
    audio.volume = 0;

    // Direct user gesture triggered play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Safe handling: gracefully continue if browser restricts audio
        console.warn("[LETTER AUDIO] Playback was deferred or restricted by browser:", err);
      });
    }

    const steps = FADE_IN_DURATION_MS / FADE_STEP_MS;
    const increment = TARGET_VOLUME / steps;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        clearFadeTimer();
        return;
      }
      const nextVol = Math.min(TARGET_VOLUME, audioRef.current.volume + increment);
      audioRef.current.volume = nextVol;
      if (nextVol >= TARGET_VOLUME) {
        audioRef.current.volume = TARGET_VOLUME;
        clearFadeTimer();
      }
    }, FADE_STEP_MS);
  }, [clearFadeTimer, getOrCreateAudio]);

  // Smooth Fade-Out function
  const stopBgmWithFadeOut = useCallback(
    (onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) {
        onComplete?.();
        return;
      }

      clearFadeTimer();

      if (audio.paused || audio.volume <= 0.01) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0;
        onComplete?.();
        return;
      }

      const startVol = audio.volume;
      const steps = FADE_OUT_DURATION_MS / FADE_STEP_MS;
      const decrement = startVol / steps;

      fadeIntervalRef.current = window.setInterval(() => {
        if (!audioRef.current) {
          clearFadeTimer();
          onComplete?.();
          return;
        }
        const nextVol = Math.max(0, audioRef.current.volume - decrement);
        audioRef.current.volume = nextVol;
        if (nextVol <= 0) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          clearFadeTimer();
          onComplete?.();
        }
      }, FADE_STEP_MS);
    },
    [clearFadeTimer]
  );

  // Immediate Stop function for cleanup or instant transitions
  const stopBgmImmediately = useCallback(() => {
    clearFadeTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
    }
  }, [clearFadeTimer]);

  // Initialize once on mount & teardown on unmount
  useEffect(() => {
    // Initial mount with closed envelope: BGM is completely silent
    return () => {
      clearFadeTimer();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0;
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [clearFadeTimer]);

  // STATE 2: User clicks "OPEN LETTER"
  // The click gesture directly starts the audio synchronously to satisfy autoplay policies
  const handleEnvelopeOpenStart = () => {
    startBgmWithFadeIn();
  };

  // Envelope 3D unfolding animation completed -> transition to continuous letter
  const handleEnvelopeOpened = () => {
    setIsLetterOpen(true);
    setTimeout(() => {
      const el = document.getElementById("continuous-letter-root");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // STATE 4: User closes / folds the letter back
  const handleCloseLetter = () => {
    stopBgmWithFadeOut(() => {
      setIsLetterOpen(false);
    });
  };

  // STATE 6: User clicks Continue to Module 10 (Final Big Photo Heart)
  const handleContinueToNext = () => {
    // Immediately stop BGM so Module 10 is guaranteed 100% silent
    stopBgmImmediately();
    onContinueToNext?.();
  };

  return (
    <div
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden",
        className
      )}
    >
      {!isLetterOpen ? (
        <LetterEnvelope
          onOpenStart={handleEnvelopeOpenStart}
          onOpenComplete={handleEnvelopeOpened}
        />
      ) : (
        <div id="continuous-letter-root" className="w-full flex justify-center animate-fadeIn">
          <ContinuousLetter
            onCloseLetter={handleCloseLetter}
            onContinueToNext={handleContinueToNext}
          />
        </div>
      )}
    </div>
  );
};
