import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroBackground } from "../components/Hero/HeroBackground";
import { HeroContent } from "../components/Hero/HeroContent";
import { HeroParticles } from "../components/Hero/HeroParticles";
import { ScrollIndicator } from "../components/Hero/ScrollIndicator";
import { ArrowRight } from "lucide-react";

export interface CinematicHeroProps {
  onContinue?: () => void;
  onSequenceComplete?: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onContinue,
  onSequenceComplete,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const transitionLineRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      // Simple immediate fade in for reduced motion
      gsap.to(sectionRef.current, { opacity: 1, duration: 0.6 });
      if (onSequenceComplete) onSequenceComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          if (onSequenceComplete) onSequenceComplete();
        },
      });

      // 1 & 2: Screen starts dark navy
      gsap.set(sectionRef.current, { opacity: 1 });
      gsap.set(".hero-anim-title1, .hero-anim-title2, .hero-anim-support, .hero-anim-charm", {
        opacity: 0,
      });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // 3: A very thin vertical warm-gold light line appears in the center
      if (transitionLineRef.current) {
        tl.fromTo(
          transitionLineRef.current,
          { scaleY: 0, opacity: 0, display: "block" },
          { scaleY: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
        )
          // 4: The line expands softly and fades out completely
          .to(transitionLineRef.current, {
            scaleX: 140,
            opacity: 0,
            duration: 0.7,
            ease: "power1.inOut",
            onComplete: () => {
              if (transitionLineRef.current) {
                transitionLineRef.current.style.display = "none";
              }
            },
          });
      }

      // 5 & 6: Hero photograph fades in and scales from 1.08 to 1.00
      tl.fromTo(
        ".will-change-transform",
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1.00, duration: 1.6, ease: "power2.out" },
        "-=0.4"
      );

      // 7: "Happy Birthday," fades upward
      tl.fromTo(
        ".hero-anim-title1",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      );

      // 10: "Dharshini." appears slightly after it
      tl.fromTo(
        ".hero-anim-title2",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.0 },
        "-=0.6"
      );

      // 11: Supporting text fades in
      tl.fromTo(
        ".hero-anim-support",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // 12: "Yes, you. Lucky Charm." appears last
      tl.fromTo(
        ".hero-anim-charm",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

      // Scroll indicator fades in at the bottom
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [onSequenceComplete, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100svh] min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-24 sm:pt-28 pb-10 sm:pb-12 z-10 overflow-hidden"
    >
      {/* Cinematic Background Image with Dark Vignettes & Parallax */}
      <HeroBackground />

      {/* Subtle Star Particles */}
      <HeroParticles />

      {/* Center Cinematic Transition Golden Light Line (Step 3 & 4) */}
      <div
        ref={transitionLineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-44 bg-[#F5C84B] shadow-[0_0_20px_#F5C84B] pointer-events-none z-30 opacity-0 will-change-transform"
        aria-hidden="true"
      />

      {/* Spacer to push content to natural optical center */}
      <div className="w-full h-4 sm:h-8" />

      {/* Main Content (Title, Eyebrow, Supporting, Lucky Charm Motif) */}
      <div ref={contentWrapperRef} className="relative z-20 w-full my-auto">
        <HeroContent />
      </div>

      {/* Interactive Continue Action leading to Module 3: Timeline */}
      <div ref={scrollIndicatorRef} className="relative z-20 pt-8 sm:pt-10 flex flex-col items-center gap-4 select-none">
        <button
          type="button"
          id="btn-hero-continue"
          onClick={onContinue}
          className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#F5C84B] to-[#E88AAA] text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.35)] hover:scale-105 hover:shadow-[0_0_35px_rgba(232,138,170,0.45)] transition-all duration-300 cursor-pointer"
        >
          <span>BEGIN OUR STORY</span>
          <ArrowRight size={16} />
        </button>
        <div onClick={onContinue} className="cursor-pointer" role="button" aria-label="Scroll or click to begin story">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
};
