import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharacterGallery } from "../components/MainCharacter/CharacterGallery";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface MainCharacterSectionProps {
  onContinue?: () => void;
}

export const MainCharacterSection: React.FC<MainCharacterSectionProps> = ({ onContinue }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const outroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Intro Reveal Sequence
      if (introRef.current) {
        const introItems = introRef.current.querySelectorAll(".intro-animate-item");
        gsap.fromTo(
          introItems,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Outro Reveal Sequence
      if (outroRef.current) {
        const outroLines = outroRef.current.querySelectorAll(".outro-animate-line");
        gsap.fromTo(
          outroLines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: outroRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="main-character"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 bg-[#080D25] text-[#FFF7F0] overflow-hidden"
    >
      {/* Soft Ambient Radial Glow behind Section Intro */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(13,19,48,0.75)_0%,transparent_75%)] pointer-events-none -z-10" />

      {/* SECTION INTRO */}
      <div
        ref={introRef}
        className="max-w-3xl mx-auto text-center space-y-6 mb-20 sm:mb-28 pt-8 sm:pt-12"
      >
        {/* Eyebrow Badge */}
        <div className="intro-animate-item inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D1330]/90 border border-[#E88AAA]/30 backdrop-blur-md shadow-lg shadow-black/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E88AAA] shadow-[0_0_8px_rgba(232,138,170,0.7)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#E88AAA] uppercase font-medium">
            THE MAIN CHARACTER
          </span>
        </div>

        {/* Grand Serif Heading */}
        <h2 className="intro-animate-item font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#E88AAA] drop-shadow-[0_4px_30px_rgba(245,200,75,0.3)]">
          Unfortunately, yes.
        </h2>

        {/* Supporting Lines with playful teasing tone */}
        <div className="space-y-3 max-w-xl mx-auto">
          <p className="intro-animate-item font-serif italic text-2xl sm:text-3xl text-[#FFF7F0] font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            It&rsquo;s you.
          </p>
          <p className="intro-animate-item font-sans text-sm sm:text-base text-[#AEB6CC] font-light tracking-wide">
            Don&rsquo;t let that go to your head.
          </p>
          <div className="intro-animate-item pt-2 space-y-1">
            <p className="font-sans text-xs sm:text-sm text-[#AEB6CC]/90 font-light italic">
              Apparently, I had quite a few pictures of you.
            </p>
            <p className="font-mono text-xs sm:text-sm text-[#F5C84B] tracking-wider uppercase font-medium">
              So... here we are.
            </p>
          </div>
        </div>
      </div>

      {/* CINEMATIC STRETCHED PHOTO GALLERY (12 photos visible across gallery) */}
      <CharacterGallery />

      {/* SECTION END */}
      <div
        ref={outroRef}
        className="max-w-xl mx-auto text-center space-y-5 pt-32 sm:pt-48 pb-16 sm:pb-24 border-t border-white/[0.05]"
      >
        <p className="outro-animate-line font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F5C84B] font-medium drop-shadow-[0_0_8px_rgba(245,200,75,0.4)]">
          Okay.
        </p>
        <p className="outro-animate-line font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7F0] font-normal tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
          Enough staring.
        </p>
        <p className="outro-animate-line font-serif italic text-base sm:text-lg text-[#AEB6CC] font-light">
          You&rsquo;re still going to blame me for this, aren&rsquo;t you?
        </p>
        <p className="outro-animate-line font-mono text-xs sm:text-sm text-[#AEB6CC]/70 tracking-[0.25em] uppercase font-light pt-2">
          There&rsquo;s still more.
        </p>

        {/* Continue to Questions Button */}
        <div className="outro-animate-line pt-6">
          <button
            type="button"
            id="btn-gallery-continue"
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-10 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>CONTINUE TO QUESTIONS</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
