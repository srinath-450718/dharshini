import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { bunnyHeistData } from "../../data/bunnyHeistData";
import { BirthdayCake } from "../BirthdayCeremony/BirthdayCake";
import { CuteBunny } from "./CuteBunny";
import { Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BunnyHeistSceneProps {
  onContinueToModule9?: () => void;
  className?: string;
}

export const BunnyHeistScene: React.FC<BunnyHeistSceneProps> = ({
  onContinueToModule9,
  className,
}) => {
  const d = bunnyHeistData;

  // Scene state
  const [phase, setPhase] = useState<
    "intro" | "sneak" | "grab" | "run" | "escaped" | "aftermath" | "finale"
  >("intro");

  // Dynamic text overlays
  const [introLine, setIntroLine] = useState<string>("");
  const [shoutLine, setShoutLine] = useState<string>("");
  const [aftermathIndex, setAftermathIndex] = useState<number>(0);
  const [finaleIndex, setFinaleIndex] = useState<number>(0);

  // Easter egg: peek bunny ear
  const [showPeek, setShowPeek] = useState<boolean>(false);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  // Refs for GSAP
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heistGroupRef = useRef<HTMLDivElement | null>(null);
  const leftBunnyRef = useRef<HTMLDivElement | null>(null);
  const rightBunnyRef = useRef<HTMLDivElement | null>(null);
  const cakeWrapperRef = useRef<HTMLDivElement | null>(null);
  const crumbsRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const peekRef = useRef<HTMLDivElement | null>(null);

  const candleStates = Array(7).fill(true); // All 7 candles are already blown out!

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reset local states
    setPhase("intro");
    setIntroLine("");
    setShoutLine("");
    setAftermathIndex(0);
    setFinaleIndex(0);
    setShowPeek(false);
    setIsGrabbing(false);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Reduced motion fast-track
      if (prefersReducedMotion) {
        setPhase("finale");
        setFinaleIndex(4);
        return;
      }

      // Initial positions
      if (leftBunnyRef.current) gsap.set(leftBunnyRef.current, { x: -280, opacity: 0, scale: 0.9 });
      if (rightBunnyRef.current) gsap.set(rightBunnyRef.current, { x: 280, opacity: 0, scale: 0.9 });
      if (cakeWrapperRef.current) gsap.set(cakeWrapperRef.current, { opacity: 0, scale: 0.95 });
      if (heistGroupRef.current) gsap.set(heistGroupRef.current, { x: 0 });
      if (crumbsRef.current) gsap.set(crumbsRef.current.children, { opacity: 0, scale: 0 });

      const tl = gsap.timeline();

      // ==========================================
      // SCREEN 1 — SOMETHING IS WRONG
      // ==========================================
      tl.to({}, { duration: 0.6 });
      tl.call(() => setIntroLine(d.screen1.wait));
      tl.to({}, { duration: 1.4 });
      tl.call(() => setIntroLine(d.screen1.where));
      tl.to({}, { duration: 1.5 });
      tl.call(() => setIntroLine(d.screen1.dots));
      tl.to({}, { duration: 1.1 });
      tl.call(() => {
        setIntroLine("");
        setPhase("sneak");
      });

      // ==========================================
      // SCREEN 2 & 3 — BUNNIES SNEAK IN & CAKE APPEARS
      // ==========================================
      tl.to({}, { duration: 0.3 });

      // Cake fades in under spotlight
      tl.to(cakeWrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Left bunny sneaks in
      tl.to(
        leftBunnyRef.current,
        {
          x: -150,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Right bunny sneaks in
      tl.to(
        rightBunnyRef.current,
        {
          x: 150,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.9"
      );

      // Small pause: both pause and look toward the cake
      tl.to({}, { duration: 0.7 });

      // Bunnies glance at each other (subtle head wiggles)
      tl.to([leftBunnyRef.current, rightBunnyRef.current], {
        rotation: (i) => (i === 0 ? 5 : -5),
        duration: 0.35,
        yoyo: true,
        repeat: 1,
      });

      tl.to({}, { duration: 0.5 });

      // ==========================================
      // SCREEN 4 — THE STEAL
      // ==========================================
      // Bunnies step right up to cake
      tl.to(leftBunnyRef.current, {
        x: -95,
        duration: 0.6,
        ease: "power1.inOut",
      });
      tl.to(
        rightBunnyRef.current,
        {
          x: 95,
          duration: 0.6,
          ease: "power1.inOut",
        },
        "-=0.6"
      );

      // Both grab the cake!
      tl.call(() => {
        setIsGrabbing(true);
        setPhase("grab");
      });

      // Cake slightly shakes
      tl.to(cakeWrapperRef.current, {
        x: -4,
        duration: 0.08,
        repeat: 5,
        yoyo: true,
        ease: "rough",
      });

      // Tiny crumbs puff out
      if (crumbsRef.current) {
        tl.to(
          crumbsRef.current.children,
          {
            opacity: 0.8,
            scale: 1,
            y: (i) => (i % 2 === 0 ? 12 : 8),
            x: (i) => (i % 2 === 0 ? -10 : 10),
            duration: 0.3,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      tl.to({}, { duration: 0.4 });

      // ==========================================
      // SCREEN 5 & 6 — BUNNIES RUN AWAY CARRYING CAKE
      // ==========================================
      tl.call(() => setPhase("run"));

      // Shout sequence starts as they begin running
      tl.call(() => setShoutLine(d.screen5[0])); // "HEY."

      // Continuous running bounce
      const bounceTween = gsap.to(
        [leftBunnyRef.current, rightBunnyRef.current, cakeWrapperRef.current],
        {
          y: -7,
          duration: 0.16,
          repeat: 18,
          yoyo: true,
          ease: "power1.inOut",
        }
      );

      // Heist group moves rightward across the screen
      tl.to(
        heistGroupRef.current,
        {
          x: "120vw",
          duration: 3.2,
          ease: "power1.in",
          onComplete: () => {
            bounceTween.kill();
          },
        },
        "-=0.1"
      );

      // Timed shouts during escape
      tl.to({}, { duration: 0.6 });
      tl.call(() => setShoutLine(d.screen5[1])); // "COME BACK."
      tl.to({}, { duration: 0.7 });
      tl.call(() => setShoutLine(d.screen5[2])); // "THAT'S HER CAKE."
      tl.to({}, { duration: 0.8 });
      tl.call(() => setShoutLine(d.screen5[3])); // "..."
      tl.to({}, { duration: 0.7 });
      tl.call(() => setShoutLine(d.screen5[4])); // "Seriously?"

      // ==========================================
      // SCREEN 6 — EMPTY SCREEN & AFTERMATH
      // ==========================================
      tl.to({}, { duration: 1.0 });
      tl.call(() => {
        setShoutLine("");
        setPhase("escaped");
      });

      // Optional Easter egg: Peek ear/head from right edge
      tl.to({}, { duration: 0.6 });
      tl.call(() => setShowPeek(true));
      tl.to({}, { duration: 1.2 });
      tl.call(() => setShowPeek(false));
      tl.to({}, { duration: 0.6 });

      // Aftermath lines
      tl.call(() => {
        setPhase("aftermath");
        setAftermathIndex(1); // "Fine."
      });
      tl.to({}, { duration: 1.2 });
      tl.call(() => setAftermathIndex(2)); // "Let them have it."
      tl.to({}, { duration: 1.4 });
      tl.call(() => setAftermathIndex(3)); // "Apparently, even the cake has an escape plan."

      // ==========================================
      // SCREEN 7 — FINALE & AUTOMATIC TRANSITION INTO NEXT MODULE
      // ==========================================
      tl.to({}, { duration: 1.8 });
      tl.call(() => {
        setPhase("finale");
        setFinaleIndex(1); // "Okay."
      });
      tl.to({}, { duration: 1.1 });
      tl.call(() => setFinaleIndex(2)); // "Birthday cake crisis handled."
      tl.to({}, { duration: 1.1 });
      tl.call(() => setFinaleIndex(3)); // "But..."
      tl.to({}, { duration: 1.1 });
      tl.call(() => setFinaleIndex(4)); // "I think you still have one more thing waiting for you."
      tl.to({}, { duration: 1.6 }); // Brief pause to read
      tl.call(() => {
        // Automatically and instantly move to the next module without asking permission
        onContinueToModule9?.();
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-[750px] sm:min-h-[850px] flex flex-col items-center justify-center text-[#FFF7F0] select-none font-sans overflow-hidden px-4 py-20",
        className
      )}
    >
      {/* 1. Cinematic Ambient Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[500px] rounded-full bg-radial from-[#F5C84B]/12 via-[#0D1330]/40 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* 2. Soft Floor Shadow beneath the heist scene */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] h-10 rounded-full bg-black/50 blur-xl pointer-events-none -z-10" />

      {/* ==========================================
          DYNAMIC OVERLAY TEXT (SCREEN 1 & SCREEN 5)
         ========================================== */}
      {/* Screen 1: "Wait. Where did the cake go? ..." */}
      {introLine && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center px-4 w-full max-w-xl animate-fadeIn">
          <p className="font-serif text-[clamp(2.2rem,5.5vw,4.2rem)] font-light text-[#FFF7F0] tracking-tight drop-shadow-[0_4px_30px_rgba(245,200,75,0.4)]">
            {introLine}
          </p>
        </div>
      )}

      {/* Screen 5: "HEY. COME BACK. THAT'S HER CAKE. ... Seriously?" */}
      {shoutLine && (
        <div className="absolute top-20 sm:top-28 left-1/2 -translate-x-1/2 z-30 text-center px-4 w-full max-w-xl animate-fadeIn">
          <p className="font-mono text-[clamp(1.8rem,4.5vw,3.2rem)] font-black uppercase text-[#F05AA6] tracking-widest drop-shadow-[0_0_25px_rgba(240,90,166,0.6)]">
            {shoutLine}
          </p>
        </div>
      )}

      {/* ==========================================
          THE HEIST STAGE (BUNNY 1 — CAKE — BUNNY 2)
         ========================================== */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[380px]">
        {/* The Moving Heist Group */}
        <div
          ref={heistGroupRef}
          className="relative flex items-center justify-center will-change-transform"
        >
          {/* LEFT BUNNY */}
          <div
            ref={leftBunnyRef}
            className="absolute z-20 will-change-transform"
            style={{ right: "50%", marginRight: "70px" }}
          >
            <CuteBunny
              facing="right"
              isGrabbing={isGrabbing}
              isSneaking={phase === "sneak"}
              earWiggle={phase === "run"}
            />
          </div>

          {/* THE CAKE (Reused from Module 7 with isCut={true}) */}
          <div
            ref={cakeWrapperRef}
            className="relative z-10 will-change-transform scale-[0.78] sm:scale-90 md:scale-100"
          >
            <BirthdayCake
              candleStates={candleStates}
              onExtinguishCandle={() => {}}
              isCut={true}
            />

            {/* Tiny Crumb Particles left behind when snatched */}
            <div
              ref={crumbsRef}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 flex justify-center gap-4 pointer-events-none z-0"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5C84B] opacity-0" />
              <div className="w-1 h-1 rounded-full bg-[#FFF7F0] opacity-0" />
              <div className="w-2 h-2 rounded-full bg-[#F05AA6] opacity-0" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5C84B] opacity-0" />
              <div className="w-1 h-1 rounded-full bg-[#FFF7F0] opacity-0" />
            </div>
          </div>

          {/* RIGHT BUNNY */}
          <div
            ref={rightBunnyRef}
            className="absolute z-20 will-change-transform"
            style={{ left: "50%", marginLeft: "70px" }}
          >
            <CuteBunny
              facing="left"
              isGrabbing={isGrabbing}
              isSneaking={phase === "sneak"}
              earWiggle={phase === "run"}
            />
          </div>
        </div>
      </div>

      {/* ==========================================
          EASTER EGG: PEEKING BUNNY EAR FROM RIGHT EDGE
         ========================================== */}
      {showPeek && (
        <div
          ref={peekRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 translate-x-8 animate-bounce duration-700"
        >
          <div className="w-16 h-20 opacity-90 drop-shadow-[0_0_15px_rgba(245,200,75,0.4)]">
            <CuteBunny facing="left" />
          </div>
        </div>
      )}

      {/* ==========================================
          SCREEN 6 — AFTERMATH JOKE
         ========================================== */}
      {phase === "aftermath" && (
        <div className="max-w-xl mx-auto text-center space-y-4 pt-12 animate-fadeIn">
          {aftermathIndex >= 1 && (
            <p className="font-mono text-sm sm:text-base tracking-[0.25em] uppercase text-[#F5C84B] font-semibold animate-fadeIn">
              {d.screen6.fine}
            </p>
          )}

          {aftermathIndex >= 2 && (
            <p className="font-serif text-2xl sm:text-3xl text-[#FFF7F0] font-light animate-fadeIn">
              {d.screen6.letThem}
            </p>
          )}

          {aftermathIndex >= 3 && (
            <p className="font-serif italic text-lg sm:text-xl text-[#AEB6CC] font-light pt-2 animate-fadeIn">
              &ldquo;{d.screen6.escapePlan}&rdquo;
            </p>
          )}
        </div>
      )}

      {/* ==========================================
          SCREEN 7 — FINALE & TRANSITION INTO MODULE 9
         ========================================== */}
      {phase === "finale" && (
        <div className="max-w-xl mx-auto text-center space-y-6 pt-10 animate-fadeIn">
          {finaleIndex >= 1 && (
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#AEB6CC] font-medium animate-fadeIn">
              {d.screen7.okay}
            </p>
          )}

          {finaleIndex >= 2 && (
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF7F0] font-normal tracking-tight animate-fadeIn">
              {d.screen7.handled}
            </h3>
          )}

          {finaleIndex >= 3 && (
            <p className="font-serif italic text-xl sm:text-2xl text-[#F5C84B] font-light animate-fadeIn">
              {d.screen7.but}
            </p>
          )}

          {finaleIndex >= 4 && (
            <div className="space-y-8 animate-fadeIn pt-2">
              <p className="font-serif text-lg sm:text-xl text-[#FFF7F0]/95 font-light leading-relaxed">
                {d.screen7.waiting}
              </p>

              {/* Automatic smooth indicator */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[#F5C84B] font-mono text-xs tracking-widest uppercase animate-pulse">
                <Sparkles size={14} />
                <span>Moving to next surprise...</span>
                <Sparkles size={14} />
              </div>

              {/* Continue Action Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  id="btn-module-8-continue"
                  onClick={onContinueToModule9}
                  className="inline-flex items-center gap-3 px-10 sm:px-12 py-3.5 rounded-full bg-gradient-to-r from-[#F5C84B] to-[#E88AAA] text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <span>CONTINUE TO LETTER</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
