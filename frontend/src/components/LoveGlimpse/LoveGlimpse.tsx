import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loveGlimpseData } from "../../data/loveGlimpseData";
import { LoveGlimpsePhoto } from "./LoveGlimpsePhoto";
import { TinyHeartMotif } from "./TinyHeartMotif";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

export interface LoveGlimpseProps {
  onContinue?: () => void;
  className?: string;
}

export const LoveGlimpse: React.FC<LoveGlimpseProps> = ({
  onContinue,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heartbeatGlowRef = useRef<HTMLDivElement | null>(null);
  const tinyHeartRef = useRef<HTMLDivElement | null>(null);
  const photoImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 1. Text reveal animations for all scroll-triggered prose sections
      const proseBlocks = containerRef.current?.querySelectorAll(".glimpse-prose-block");
      if (proseBlocks) {
        proseBlocks.forEach((block) => {
          const lines = block.querySelectorAll(".glimpse-line");
          if (prefersReducedMotion) {
            gsap.set(lines, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            lines,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // 2. Sequential Nickname Reveal (Fade each in with slight bounce/scale)
      const nicknameCards = containerRef.current?.querySelectorAll(".glimpse-nickname-card");
      if (nicknameCards && nicknameCards.length > 0) {
        if (prefersReducedMotion) {
          gsap.set(nicknameCards, { opacity: 1 });
        } else {
          gsap.fromTo(
            nicknameCards,
            { opacity: 0, y: 18, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#glimpse-nicknames-container",
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 3. Visual Heartbeat Breathing Effect on Climax ("It's something else.")
      if (heartbeatGlowRef.current) {
        if (!prefersReducedMotion) {
          gsap.timeline({
            scrollTrigger: {
              trigger: "#glimpse-climax-trigger",
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          })
            .to(heartbeatGlowRef.current, {
              scale: 1.025,
              opacity: 0.45,
              duration: 0.75,
              ease: "sine.inOut",
            })
            .to(heartbeatGlowRef.current, {
              scale: 1,
              opacity: 0.18,
              duration: 0.85,
              ease: "sine.out",
            });
        }
      }

      // 4. Tiny Heart Motif: appears, slowly moves backward, then softly dissolves
      if (tinyHeartRef.current) {
        if (!prefersReducedMotion) {
          gsap.fromTo(
            tinyHeartRef.current,
            { opacity: 0, x: 15, scale: 0.8 },
            {
              opacity: 1,
              x: -20,
              scale: 1.15,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#glimpse-climax-trigger",
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
              onComplete: () => {
                gsap.to(tinyHeartRef.current, {
                  opacity: 0,
                  duration: 0.9,
                  delay: 0.4,
                  ease: "power1.in",
                });
              },
            }
          );
        } else {
          gsap.set(tinyHeartRef.current, { opacity: 0.9 });
        }
      }

      // 5. Emotional Photograph Entrance
      if (photoImageRef.current) {
        if (!prefersReducedMotion) {
          gsap.fromTo(
            photoImageRef.current,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 0.9,
              scale: 1.0,
              duration: 2.0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#glimpse-photo-container",
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        } else {
          gsap.set(photoImageRef.current, { opacity: 0.9, scale: 1 });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const d = loveGlimpseData;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full text-[#FFF7F0] select-none font-sans overflow-hidden",
        className
      )}
    >
      {/* Dynamic Visual Heartbeat Background Glow */}
      <div
        ref={heartbeatGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-radial from-[#E88AAA]/12 via-[#F5C84B]/06 to-transparent pointer-events-none -z-10 opacity-20 will-change-transform"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-36 sm:space-y-48 py-24 sm:py-36">
        {/* ==========================================
            1. THE DARK OPENING & TONE SHIFT
           ========================================== */}
        <section className="glimpse-prose-block space-y-12 text-center pt-4">
          <div className="space-y-4">
            <p className="glimpse-line font-mono text-sm sm:text-base tracking-[0.3em] uppercase text-[#F5C84B] font-semibold drop-shadow-[0_0_12px_rgba(245,200,75,0.5)]">
              {d.intro.lines[0]}
            </p>
            <h2 className="glimpse-line font-serif text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(245,200,75,0.35)]">
              {d.intro.lines[1]}
            </h2>
          </div>

          <div className="space-y-6 pt-4 max-w-2xl mx-auto">
            <p className="glimpse-line font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#FFF7F0] font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              &ldquo;{d.intro.lines[2]}&rdquo;
            </p>
            <p className="glimpse-line font-serif text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#FFF7F0] font-normal leading-relaxed drop-shadow-[0_4px_20px_rgba(245,200,75,0.3)]">
              {d.intro.lines[3]}
            </p>
          </div>
        </section>

        {/* ==========================================
            2. THE FIRST REVEAL
           ========================================== */}
        <section className="glimpse-prose-block space-y-12 text-center">
          <div className="space-y-4">
            <h3 className="glimpse-line font-serif text-4xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal tracking-tight leading-tight drop-shadow-[0_4px_35px_rgba(245,200,75,0.4)]">
              {d.shift.annoying}
            </h3>
            <p className="glimpse-line font-mono text-base sm:text-lg tracking-[0.25em] uppercase text-[#F5C84B] font-semibold drop-shadow-[0_0_10px_rgba(245,200,75,0.5)]">
              {d.shift.pauseLine}
            </p>
          </div>

          <div className="pt-4 max-w-2xl mx-auto">
            <p className="glimpse-line font-serif text-2xl sm:text-4xl lg:text-5xl text-[#FFF7F0] font-normal leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)]">
              {d.shift.revealLine}
            </p>
          </div>
        </section>

        {/* ==========================================
            3. NICKNAME RECOLLECTION SEQUENCE
           ========================================== */}
        <section id="glimpse-nicknames-container" className="space-y-14 text-center">
          <div className="space-y-3">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F5C84B] font-bold block drop-shadow-[0_0_12px_rgba(245,200,75,0.5)]">
              ✦ RECOLLECTION ✦
            </span>
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#FFF7F0] drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              {d.nicknameReflection.lead}
            </p>
          </div>

          {/* Sequential Vibrant Nickname Badges */}
          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5 max-w-2xl mx-auto px-2">
            {d.nicknames.map((item) => (
              <div
                key={item.id}
                className="glimpse-nickname-card px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0D1330]/95 border-2 border-[#F5C84B]/45 text-base sm:text-xl font-serif text-[#FFF7F0] tracking-wide shadow-[0_0_22px_rgba(245,200,75,0.3)] hover:border-[#F05AA6] hover:shadow-[0_0_28px_rgba(240,90,166,0.35)] transition-all duration-300"
              >
                <span className="text-[#F5C84B] mr-2">✦</span>
                <span className="italic font-normal">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Synthesis */}
          <div className="glimpse-prose-block space-y-5 pt-6 max-w-2xl mx-auto">
            <p className="glimpse-line font-serif italic text-xl sm:text-2xl text-[#E2D9D2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {d.nicknameReflection.closing[0]}
            </p>
            <h4 className="glimpse-line font-serif text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal leading-relaxed drop-shadow-[0_4px_28px_rgba(245,200,75,0.35)]">
              {d.nicknameReflection.closing[1]}
            </h4>
          </div>
        </section>


        {/* ==========================================
            4. PERSONAL OBSERVATIONS
           ========================================== */}
        <section className="glimpse-prose-block space-y-16 text-center max-w-2xl mx-auto">
          <div className="space-y-10">
            {d.observations.map((obs) => (
              <p
                key={obs.id}
                className="glimpse-line font-serif text-xl sm:text-2xl lg:text-3xl text-[#FFF7F0] font-light leading-relaxed drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]"
              >
                &ldquo;{obs.text}&rdquo;
              </p>
            ))}
          </div>

          <div className="pt-12 space-y-5 border-t border-white/15">
            <span className="glimpse-line font-mono text-sm sm:text-base tracking-[0.28em] uppercase text-[#F5C84B] font-bold block drop-shadow-[0_0_12px_rgba(245,200,75,0.5)]">
              {d.observationClimax.lead}
            </span>
            <p className="glimpse-line font-serif text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal leading-snug drop-shadow-[0_4px_30px_rgba(245,200,75,0.4)]">
              {d.observationClimax.line}
            </p>
          </div>
        </section>

        {/* ==========================================
            5. THE DOUBLE MEANING & TINY HEART
           ========================================== */}
        <section id="glimpse-climax-trigger" className="glimpse-prose-block space-y-12 text-center">
          <div className="space-y-6 max-w-xl mx-auto">
            {d.doubleMeaning.lines.map((line, idx) => (
              <p
                key={idx}
                className="glimpse-line font-serif text-xl sm:text-2xl lg:text-3xl text-[#FFF7F0] font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="pt-8 space-y-5">
            <p className="glimpse-line font-mono text-base sm:text-lg tracking-[0.3em] uppercase text-[#F5C84B] font-bold drop-shadow-[0_0_12px_rgba(245,200,75,0.5)]">
              {d.doubleMeaning.orMaybe}
            </p>

            <div className="glimpse-line relative inline-flex items-center justify-center gap-4">
              <h3 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal tracking-tight drop-shadow-[0_4px_40px_rgba(245,200,75,0.45)]">
                {d.doubleMeaning.climax}
              </h3>
              <div ref={tinyHeartRef} className="opacity-0">
                <TinyHeartMotif />
              </div>
            </div>
          </div>

          {/* Playful Tension Break */}
          <div className="pt-6">
            <p className="glimpse-line font-sans text-lg sm:text-xl text-[#E2D9D2] font-normal italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {d.doubleMeaning.playfulReset}
            </p>
          </div>
        </section>

        {/* ==========================================
            6. DHARSHINI'S PORTRAIT & THE IMPORTANT LINE
           ========================================== */}
        <section id="glimpse-photo-container" className="space-y-16">
          <LoveGlimpsePhoto
            src={d.photo.src}
            fallbackSrc={d.photo.fallbackSrc}
            alt={d.photo.alt}
            objectPosition={d.photo.objectPosition}
            imageRef={photoImageRef}
          />

          <div className="glimpse-prose-block space-y-10 text-center max-w-2xl mx-auto">
            <div className="space-y-4">
              {d.importantLine.leadLines.map((lead, idx) => (
                <p
                  key={idx}
                  className="glimpse-line font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#E2D9D2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                >
                  {lead}
                </p>
              ))}
            </div>

            {/* The Emotional Focal Line */}
            <div className="pt-4 p-8 sm:p-12 rounded-3xl bg-[#0D1330]/95 border-2 border-[#F5C84B]/45 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(245,200,75,0.2)]">
              <p className="glimpse-line font-serif text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal leading-relaxed drop-shadow-[0_4px_28px_rgba(245,200,75,0.4)]">
                &ldquo;{d.importantLine.mainStatement}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            7. PLAYFUL RESET & KEEP GOING BUTTON
           ========================================== */}
        <section className="glimpse-prose-block space-y-12 text-center pt-8">
          <div className="space-y-4">
            <p className="glimpse-line font-mono text-sm sm:text-base tracking-[0.25em] uppercase text-[#F5C84B] font-bold drop-shadow-[0_0_12px_rgba(245,200,75,0.5)]">
              {d.closingReset.okay}
            </p>
            <h4 className="glimpse-line font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FFF7F0] font-normal leading-snug drop-shadow-[0_3px_20px_rgba(0,0,0,0.85)]">
              {d.closingReset.sincerity}
            </h4>
            <p className="glimpse-line font-serif italic text-xl sm:text-2xl text-[#E2D9D2]">
              {d.closingReset.dontGetUsedToIt}
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <p className="glimpse-line font-sans text-base sm:text-lg text-[#FFF7F0]">
              {d.closingReset.bridge[0]}
            </p>
            <p className="glimpse-line font-sans text-base sm:text-lg text-[#E2D9D2]">
              {d.closingReset.bridge[1]}
            </p>
          </div>

          {/* KEEP GOING Action Button */}
          <div className="glimpse-line pt-8">
            <button
              type="button"
              id="btn-module-6-continue"
              onClick={onContinue}
              className="inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#F05AA6] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_35px_rgba(245,200,75,0.45)] hover:shadow-[0_0_45px_rgba(240,90,166,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>{d.closingReset.buttonText}</span>
              <Sparkles size={16} />
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
