import React, { useState, useEffect } from "react";
import { PageBackground } from "./components/PageBackground";
import { HeartLockSection } from "./sections/HeartLockSection";
import { CinematicHero } from "./sections/CinematicHero";
import { TimelineSection } from "./sections/TimelineSection";
import { MainCharacterSection } from "./sections/MainCharacterSection";
import { SevenQuestionsSection } from "./sections/SevenQuestionsSection";
import { LoveGlimpseSection } from "./sections/LoveGlimpseSection";
import { BirthdayCeremonySection } from "./sections/BirthdayCeremonySection";
import { BunnyHeistSection } from "./sections/BunnyHeistSection";
import { PersonalLetterSection } from "./sections/PersonalLetterSection";
import { PhotoHeartSection } from "./sections/PhotoHeartSection";
import { useLenis } from "./hooks/useLenis";

export type Module =
  | "heart-lock"
  | "hero"
  | "timeline"
  | "gallery"
  | "questions"
  | "love-glimpse"
  | "birthday"
  | "bunnies"
  | "letter"
  | "final-heart";

export const MODULE_ORDER: readonly Module[] = [
  "heart-lock",
  "hero",
  "timeline",
  "gallery",
  "questions",
  "love-glimpse",
  "birthday",
  "bunnies",
  "letter",
  "final-heart",
] as const;

export const App: React.FC = () => {
  // Smooth scroll Lenis integration
  useLenis();

  // Central Authoritative Navigation State (Single Source of Truth)
  const [currentModule, setCurrentModule] = useState<Module>("heart-lock");
  const [, setCompletedModules] = useState<Partial<Record<Module, boolean>>>({});

  // Ensure fresh start at top with zero bypass on link load
  useEffect(() => {
    try {
      localStorage.removeItem("heart_lock_unlocked");
      sessionStorage.removeItem("heart_lock_unlocked");
    } catch {}
    window.scrollTo(0, 0);
    console.log("[FLOW] App mounted. Starting sequence strictly at:", MODULE_ORDER[0]);
    (window as unknown as { __setModule?: (mod: Module) => void }).__setModule = (mod: Module) => {
      setCurrentModule(mod);
    };
  }, []);

  const completeModule = (module: Module) => {
    console.log(`[FLOW] Module completed: ${module}`);
    setCompletedModules((prev) => ({
      ...prev,
      [module]: true,
    }));
  };

  const advanceModule = () => {
    setCurrentModule((prev) => {
      const currentIndex = MODULE_ORDER.indexOf(prev);

      if (currentIndex === -1) {
        console.error("[FLOW] Unknown module:", prev);
        return "heart-lock";
      }

      if (currentIndex >= MODULE_ORDER.length - 1) {
        console.log("[FLOW] Reached final module:", prev);
        return prev;
      }

      const nextModule = MODULE_ORDER[currentIndex + 1];
      console.log("[FLOW]", "Current:", prev, "Next:", nextModule);
      console.log(`[FLOW] Navigating: ${prev} -> ${nextModule}`);

      // Instantly and reliably reset viewport to top of new module
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        const lenis = (window as unknown as {
          __lenis?: {
            scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean }) => void;
          };
        }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      });

      return nextModule;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#080D25] text-[#FFF7F0] font-sans antialiased overflow-x-hidden selection:bg-[#E88AAA]/25 selection:text-[#FFF7F0]">
      {/* Continuous Midnight Sky Background with Canvas Stars, Volumetric Glows, and Grain */}
      <PageBackground />

      {/* Main Interactive Experience: One authoritative sequential module at a time */}
      <main className="relative z-10 w-full min-h-screen">
        {currentModule === "heart-lock" && (
          <HeartLockSection
            onUnlockComplete={() => {
              completeModule("heart-lock");
              advanceModule();
            }}
          />
        )}

        {currentModule === "hero" && (
          <CinematicHero
            onContinue={() => {
              completeModule("hero");
              advanceModule();
            }}
          />
        )}

        {currentModule === "timeline" && (
          <TimelineSection
            onContinue={() => {
              completeModule("timeline");
              advanceModule();
            }}
          />
        )}

        {currentModule === "gallery" && (
          <MainCharacterSection
            onContinue={() => {
              completeModule("gallery");
              advanceModule();
            }}
          />
        )}

        {currentModule === "questions" && (
          <SevenQuestionsSection
            onModuleComplete={() => {
              completeModule("questions");
              advanceModule();
            }}
          />
        )}

        {currentModule === "love-glimpse" && (
          <LoveGlimpseSection
            onContinueToNext={() => {
              completeModule("love-glimpse");
              advanceModule();
            }}
          />
        )}

        {currentModule === "birthday" && (
          <BirthdayCeremonySection
            onContinueToNext={() => {
              completeModule("birthday");
              advanceModule();
            }}
          />
        )}

        {currentModule === "bunnies" && (
          <BunnyHeistSection
            onContinueToNext={() => {
              completeModule("bunnies");
              advanceModule();
            }}
          />
        )}

        {currentModule === "letter" && (
          <PersonalLetterSection
            onContinueToNext={() => {
              completeModule("letter");
              advanceModule();
            }}
          />
        )}

        {currentModule === "final-heart" && (
          <PhotoHeartSection />
        )}
      </main>
    </div>
  );
};

export default App;
