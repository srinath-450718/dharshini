import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, Heart } from "lucide-react";
import { cn } from "../../utils/cn";

export interface LetterEnvelopeProps {
  onOpenStart?: () => void;
  onOpenComplete: () => void;
  className?: string;
}

export const LetterEnvelope: React.FC<LetterEnvelopeProps> = ({
  onOpenStart,
  onOpenComplete,
  className,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const envelopeRef = useRef<HTMLDivElement | null>(null);
  const flapRef = useRef<HTMLDivElement | null>(null);
  const ribbonHRef = useRef<HTMLDivElement | null>(null);
  const ribbonVRef = useRef<HTMLDivElement | null>(null);
  const ribbonKnotRef = useRef<HTMLDivElement | null>(null);
  const ribbonTailLeftRef = useRef<HTMLDivElement | null>(null);
  const ribbonTailRightRef = useRef<HTMLDivElement | null>(null);
  const waxSealRef = useRef<HTMLDivElement | null>(null);
  const goldenGlowRef = useRef<HTMLDivElement | null>(null);
  const emergingLetterRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpenStart?.();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onOpenComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onOpenComplete();
      },
    });

    // 1. Button fades away
    if (buttonRef.current) {
      tl.to(buttonRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    // 2. Envelope gently moves forward
    if (envelopeRef.current) {
      tl.to(
        envelopeRef.current,
        {
          scale: 1.05,
          y: -12,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    // 3. Ribbon slightly tightens
    if (ribbonHRef.current && ribbonVRef.current) {
      tl.to(
        [ribbonHRef.current, ribbonVRef.current],
        {
          scale: 0.98,
          duration: 0.25,
          ease: "sine.inOut",
        },
        "-=0.3"
      );
    }

    // 4. Ribbon knot loosens
    if (ribbonKnotRef.current) {
      tl.to(
        ribbonKnotRef.current,
        {
          scale: 1.25,
          opacity: 0.9,
          duration: 0.35,
          ease: "back.out(2)",
        },
        "+=0.05"
      );
    }

    // 5 & 6. Ribbon ends slide away smoothly
    if (ribbonTailLeftRef.current && ribbonTailRightRef.current) {
      tl.to(
        ribbonTailLeftRef.current,
        {
          x: -120,
          y: 40,
          rotation: -35,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
        },
        "-=0.1"
      );
      tl.to(
        ribbonTailRightRef.current,
        {
          x: 120,
          y: 40,
          rotation: 35,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
        },
        "-=0.65"
      );
    }

    // Ribbon horizontal & vertical bands slide off envelope
    if (ribbonHRef.current && ribbonVRef.current) {
      tl.to(
        [ribbonHRef.current, ribbonVRef.current],
        {
          opacity: 0,
          scaleX: 1.15,
          scaleY: 1.15,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.5"
      );
    }

    // 7. Wax seal subtly opens
    if (waxSealRef.current) {
      tl.to(
        waxSealRef.current,
        {
          scale: 1.3,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        "-=0.4"
      );
    }

    // 8. Envelope flap opens
    if (flapRef.current) {
      tl.to(
        flapRef.current,
        {
          rotateX: -170,
          duration: 0.85,
          ease: "power2.inOut",
        },
        "-=0.1"
      );
    }

    // 9. Warm golden light spills from inside
    if (goldenGlowRef.current) {
      tl.to(
        goldenGlowRef.current,
        {
          opacity: 1,
          scale: 1.4,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.6"
      );
    }

    // 10. Letter slowly emerges
    if (emergingLetterRef.current) {
      tl.fromTo(
        emergingLetterRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.94,
        },
        {
          y: -140,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // 11. Envelope moves slightly backward & dissolves
    if (envelopeRef.current) {
      tl.to(
        envelopeRef.current,
        {
          scale: 0.92,
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.in",
        },
        "-=0.4"
      );
    }

    // 12. Final pause to let the transition dissolve into the unfolded continuous letter
    tl.to({}, { duration: 0.25 });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-[85vh] flex flex-col items-center justify-center select-none py-12 px-4",
        className
      )}
    >
      {/* Background Atmosphere: Soft pink glow, tiny stars & hearts */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[650px] sm:h-[800px] rounded-full bg-radial from-[#F05AA6]/10 via-[#F5C84B]/06 to-transparent pointer-events-none -z-10 blur-3xl animate-pulse-aura" />

      {/* Scattered Ambient Particles around envelope */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <span className="absolute top-[20%] left-[18%] text-[#F5C84B]/70 text-xs animate-pulse">✦</span>
        <span className="absolute top-[28%] right-[22%] text-[#FF75A0]/60 text-sm animate-pulse" style={{ animationDelay: "1.2s" }}>♥</span>
        <span className="absolute bottom-[24%] left-[25%] text-[#FF75A0]/50 text-xs animate-pulse" style={{ animationDelay: "2s" }}>♥</span>
        <span className="absolute bottom-[28%] right-[18%] text-[#F5C84B]/70 text-xs animate-pulse" style={{ animationDelay: "0.8s" }}>✦</span>
      </div>

      {/* ENVELOPE 3D STAGE */}
      <div className="relative perspective-[1400px] flex flex-col items-center">
        <div
          ref={envelopeRef}
          className="relative w-[320px] sm:w-[440px] aspect-[16/11] bg-[#FAF6EE] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(245,200,75,0.18)] border border-[#E8DCC0] will-change-transform"
        >
          {/* Subtle Paper Grain & Inner Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl border border-[#D4A82F]/25 pointer-events-none" />

          {/* Golden Interior Light (Hidden initially, emerges on open) */}
          <div
            ref={goldenGlowRef}
            className="absolute -top-12 inset-x-4 h-36 bg-radial from-[#F5C84B]/90 via-[#F05AA6]/40 to-transparent blur-xl opacity-0 pointer-events-none z-20"
          />

          {/* Emerging Letter Tip (Hidden initially, rises up on open) */}
          <div
            ref={emergingLetterRef}
            className="absolute inset-x-4 top-2 h-44 bg-[#FDFBF7] rounded-t-xl border border-[#D4A82F]/30 shadow-2xl p-4 flex flex-col items-center text-center opacity-0 pointer-events-none z-10"
          >
            <div className="w-16 h-[2px] bg-[#D4A82F]/50 mb-3" />
            <p className="font-script text-3xl sm:text-4xl text-[#B8860B] drop-shadow-[0_0_10px_rgba(245,200,75,0.4)]">
              Dharshini
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-[#4A3E31] mt-1">
              I wish all the good things in this world for you...
            </p>
          </div>

          {/* Envelope Pocket (Front Face) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden z-20 pointer-events-none">
            {/* Pocket diagonal folds */}
            <div
              className="absolute inset-0 bg-[#F4EDE0] border-t border-[#DECFA8]/60"
              style={{
                clipPath: "polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)",
              }}
            />
            {/* Soft inner pocket shadow */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5"
              style={{
                clipPath: "polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>

          {/* Envelope Flap (Top Triangular Fold with 3D Flip) */}
          <div
            ref={flapRef}
            className="absolute top-0 inset-x-0 h-1/2 origin-top will-change-transform z-30 pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="w-full h-full bg-[#EFE7D5] border-b border-[#D8C697] shadow-md"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </div>

          {/* PINK SATIN RIBBON — Horizontal Band */}
          <div
            ref={ribbonHRef}
            className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-7 sm:h-8 bg-gradient-to-r from-[#E04D97] via-[#FF75A0] to-[#E04D97] shadow-[0_3px_12px_rgba(224,77,151,0.4)] border-y border-[#FFA5C3]/40 z-30 pointer-events-none will-change-transform"
          >
            {/* Satin Sheen Line */}
            <div className="w-full h-[1.5px] bg-white/40 mt-1" />
          </div>

          {/* PINK SATIN RIBBON — Vertical Band */}
          <div
            ref={ribbonVRef}
            className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-7 sm:w-8 bg-gradient-to-b from-[#E04D97] via-[#FF75A0] to-[#E04D97] shadow-[0_3px_12px_rgba(224,77,151,0.4)] border-x border-[#FFA5C3]/40 z-30 pointer-events-none will-change-transform"
          >
            {/* Satin Sheen Line */}
            <div className="h-full w-[1.5px] bg-white/40 ml-1" />
          </div>

          {/* RIBBON TAILS (Slide away on opening) */}
          <div
            ref={ribbonTailLeftRef}
            className="absolute top-1/2 left-1/2 w-12 sm:w-16 h-4 bg-gradient-to-l from-[#E04D97] to-[#FF75A0] -rotate-45 origin-right rounded-l-sm shadow-md z-30 pointer-events-none will-change-transform"
            style={{ transform: "translate(-100%, 8px) rotate(-35deg)" }}
          />
          <div
            ref={ribbonTailRightRef}
            className="absolute top-1/2 left-1/2 w-12 sm:w-16 h-4 bg-gradient-to-r from-[#E04D97] to-[#FF75A0] rotate-45 origin-left rounded-r-sm shadow-md z-30 pointer-events-none will-change-transform"
            style={{ transform: "translate(0%, 8px) rotate(35deg)" }}
          />

          {/* RIBBON KNOT */}
          <div
            ref={ribbonKnotRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF85BE] to-[#C93984] shadow-[0_4px_16px_rgba(201,57,132,0.5)] z-40 pointer-events-none will-change-transform border border-white/40"
          />

          {/* WAX SEAL (Centered on knot) */}
          <div
            ref={waxSealRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#F5C84B] via-[#D4A82F] to-[#9C7518] border-2 border-[#FFE885] shadow-[0_6px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(245,200,75,0.4)] z-40 flex items-center justify-center will-change-transform pointer-events-none"
          >
            {/* Wax seal ring & initial motif */}
            <div className="w-10 h-10 rounded-full border border-[#8C620B] flex items-center justify-center">
              <span className="font-script text-xl text-[#523A06] font-bold drop-shadow-sm">
                D
              </span>
            </div>
          </div>

          {/* HANDWRITTEN LABEL TAG ("For Dharshini") */}
          <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 bg-[#FBF7EE] px-4 py-2 rounded-lg border border-[#D4A82F]/40 shadow-[0_4px_15px_rgba(0,0,0,0.25)] rotate-[-3deg]">
            <p className="font-script text-xl sm:text-2xl text-[#6B502C] tracking-wide">
              For Dharshini
            </p>
          </div>
        </div>

        {/* BELOW ENVELOPE: "OPEN LETTER" ACTION BUTTON */}
        <div className="pt-10 z-40">
          <button
            ref={buttonRef}
            type="button"
            id="btn-open-letter"
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#F05AA6] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.28em] uppercase font-bold shadow-[0_0_35px_rgba(245,200,75,0.45)] hover:shadow-[0_0_45px_rgba(240,90,166,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#FFF7F0]/40 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Sparkles size={16} className="text-[#080D25] animate-pulse" />
            <span>OPEN LETTER</span>
            <Heart size={15} className="text-[#080D25] fill-[#080D25]" />
          </button>
        </div>
      </div>
    </div>
  );
};
