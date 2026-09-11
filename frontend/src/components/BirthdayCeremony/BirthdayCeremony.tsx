import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { birthdayWishData } from "../../data/birthdayWishData";
import { BirthdayCake } from "./BirthdayCake";
import { CakeKnife } from "./CakeKnife";
import { BirthdayWishesProse } from "./BirthdayWishesProse";
import { BubuDuduHint } from "./BubuDuduHint";
import { BubuDuduCakeCompanion } from "./BubuDuduCakeCompanion";
import { Wind, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BirthdayCeremonyProps {
  onContinueToNext?: () => void;
  onCakeCut?: () => void;
  className?: string;
}

export const BirthdayCeremony: React.FC<BirthdayCeremonyProps> = ({
  onContinueToNext,
  onCakeCut,
  className,
}) => {
  const d = birthdayWishData;

  // State Management
  const [candleStates, setCandleStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [wishConfirmed, setWishConfirmed] = useState(false);
  const [isCakeCutting, setIsCakeCutting] = useState(false);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [showFinalGreeting, setShowFinalGreeting] = useState(false);
  const [showGifHint, setShowGifHint] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const extinguishedCount = candleStates.filter(Boolean).length;
  const allCandlesOut = extinguishedCount === d.cake.totalCandles;

  // Extinguish individual candle
  const handleExtinguish = (index: number) => {
    setCandleStates((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // Blow all out helper
  const handleBlowOutAll = () => {
    setCandleStates((prev) => {
      const unlitIndices = prev
        .map((lit, idx) => (!lit ? idx : null))
        .filter((val): val is number => val !== null);

      unlitIndices.forEach((cIdx, delayIndex) => {
        setTimeout(() => {
          setCandleStates((curr) => {
            const copy = [...curr];
            copy[cIdx] = true;
            return copy;
          });
        }, delayIndex * 140);
      });

      return prev;
    });
  };

  // Screen 4 & 5: When user clicks "I MADE MY WISH"
  const handleMakeWish = () => {
    if (!allCandlesOut) return;
    setWishConfirmed(true);
    setIsCakeCutting(true);
  };

  // Cake knife slice finishes
  const handleCutComplete = () => {
    setIsCakeCutting(false);
    setIsCakeCut(true);
    onCakeCut?.();

    // Screen 5: Trigger side party poppers shooting diagonally from left & right edges
    triggerSidePoppers();

    // After 2.2 seconds, transition smoothly to Screen 6: Sincere Birthday Wishes
    setTimeout(() => {
      setShowWishes(true);
      const wishesEl = document.getElementById("ceremony-wishes-prose-anchor");
      if (wishesEl) {
        wishesEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 2200);
  };

  // Side Party Poppers: left and right edges shooting diagonally toward center
  const triggerSidePoppers = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const popperColors = ["#F5C84B", "#FFF7F0", "#E88AAA", "#0D1330", "#AEB6CC"];

    // Left Edge shooting diagonally upward-right
    confetti({
      particleCount: 55,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: 0.65 },
      colors: popperColors,
      disableForReducedMotion: true,
    });

    // Right Edge shooting diagonally upward-left
    confetti({
      particleCount: 55,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.65 },
      colors: popperColors,
      disableForReducedMotion: true,
    });

    // Secondary soft delayed bursts for 2.5s duration
    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 65,
        spread: 45,
        origin: { x: 0.1, y: 0.62 },
        colors: popperColors,
      });
      confetti({
        particleCount: 35,
        angle: 115,
        spread: 45,
        origin: { x: 0.9, y: 0.62 },
        colors: popperColors,
      });
    }, 450);
  };

  // Reveal Screen 7 and Screen 8 sequentially once wishes are shown
  useEffect(() => {
    if (!showWishes) return;

    const timer1 = setTimeout(() => {
      setShowFinalGreeting(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      setShowGifHint(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [showWishes]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full text-[#FFF7F0] select-none font-sans overflow-hidden",
        className
      )}
    >
      {/* Subtle Night Sky Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full bg-radial from-[#F5C84B]/10 via-[#F05AA6]/5 to-transparent pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-24 sm:py-36 space-y-36 sm:space-y-48">
        {/* ==========================================
            SCREEN 1 — SIMPLE BIRTHDAY INTRO
           ========================================== */}
        <section className="space-y-8 text-center pt-6 max-w-[850px] mx-auto">
          {/* Eyebrow */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F5C84B] font-semibold drop-shadow-[0_0_12px_rgba(245,200,75,0.45)]">
            {d.intro.eyebrow}
          </p>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] text-[#FFF7F0] font-light leading-none tracking-tight">
              {d.intro.headline}
            </h2>
            <h1 className="font-serif text-[clamp(3.2rem,8.5vw,6.5rem)] text-[#F5C84B] font-normal leading-none tracking-tight drop-shadow-[0_4px_35px_rgba(245,200,75,0.45)]">
              {d.intro.name}
            </h1>
          </div>

          {/* Sincere Supporting Line */}
          <div className="pt-4 space-y-2">
            <p className="font-serif text-[clamp(1.4rem,2.8vw,2.2rem)] text-[#FFF7F0]/95 font-light">
              {d.intro.supporting}
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#AEB6CC]/70 tracking-widest uppercase font-mono">
              {d.intro.subSupporting}
            </p>
          </div>
        </section>

        {/* ==========================================
            SCREEN 2, 3 & 4 — THE CAKE, WISH & CUTTING
           ========================================== */}
        <section className="relative space-y-8 text-center max-w-[850px] mx-auto">
          {/* Small Bubu & Dudu Photo in the Right Corner */}
          <div className="absolute -top-2 right-0 sm:right-2 z-20">
            <BubuDuduCakeCompanion />
          </div>

          {/* Cake Header Instructions */}
          <div className="space-y-3 px-12 sm:px-0">
            <h3 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] text-[#FFF7F0] font-normal leading-tight">
              {allCandlesOut ? d.wishPrompt.title : d.cake.title}
            </h3>
            <p className="font-serif italic text-base sm:text-xl text-[#AEB6CC]">
              {allCandlesOut ? d.wishPrompt.dontTell : d.cake.subtitle}
            </p>
          </div>

          {/* Subtle Progress (Fades away once all 7 candles are out) */}
          {!allCandlesOut && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0D1330]/90 border border-white/10 shadow-sm transition-opacity duration-500">
              <span className="w-2 h-2 rounded-full bg-[#F5C84B] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#AEB6CC] uppercase">
                {extinguishedCount} {d.cake.progressLabel}
              </span>
            </div>
          )}

          {/* The Cake Scene Container */}
          <div className="relative pt-4">
            <BirthdayCake
              candleStates={candleStates}
              onExtinguishCandle={handleExtinguish}
              isCut={isCakeCut}
            />

            {/* Screen 4: Cake Knife Slicing Animation */}
            <CakeKnife
              isCutting={isCakeCutting}
              onCutComplete={handleCutComplete}
            />
          </div>

          {/* Standout Attractive "BLOW THEM OUT" Button (Directly below the cake) */}
          {!allCandlesOut && (
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                id="btn-blow-candles"
                onClick={handleBlowOutAll}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.22em] uppercase font-bold shadow-[0_0_28px_rgba(245,200,75,0.45)] hover:shadow-[0_0_38px_rgba(232,138,170,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#FFF7F0]/40"
              >
                <Wind size={18} className="transition-transform group-hover:translate-x-1 duration-300 text-[#080D25]" />
                <span>{d.cake.blowOutButtonText}</span>
                <Sparkles size={16} className="text-[#080D25] animate-pulse" />
              </button>
            </div>
          )}

          {/* Screen 3: "Just make a good one." + [I MADE MY WISH] Button (Directly below the cake) */}
          {allCandlesOut && !wishConfirmed && (
            <div className="pt-4 space-y-4 animate-fadeIn">
              <p className="font-serif text-lg sm:text-xl text-[#FFF7F0]/90">
                {d.wishPrompt.goodOne}
              </p>
              <div>
                <button
                  type="button"
                  id="btn-make-wish"
                  onClick={handleMakeWish}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_30px_rgba(245,200,75,0.4)] hover:shadow-[0_0_35px_rgba(232,138,170,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>{d.wishPrompt.buttonText}</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Scroll anchor for wishes section */}
        <div id="ceremony-wishes-prose-anchor" />

        {/* ==========================================
            SCREEN 6 — THE ACTUAL BIRTHDAY WISH
           ========================================== */}
        {showWishes && (
          <section className="space-y-36 animate-fadeIn">
            <BirthdayWishesProse />

            {/* ==========================================
                SCREEN 7 — FINAL BIRTHDAY MESSAGE
               ========================================== */}
            {showFinalGreeting && (
              <section className="space-y-6 text-center max-w-2xl mx-auto pt-6 animate-fadeIn">
                <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#E88AAA] font-normal leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(245,200,75,0.3)]">
                  {d.finalGreeting.headline}
                </h2>
                <p className="font-serif italic text-xl sm:text-3xl text-[#FFF7F0] font-light">
                  {d.finalGreeting.subline}
                </p>
              </section>
            )}

            {/* ==========================================
                SCREEN 8 — BUBU DUDU GIF & CONTINUE
               ========================================== */}
            {showGifHint && (
              <section className="animate-fadeIn">
                <BubuDuduHint onContinue={onContinueToNext} />
              </section>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
