import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Star } from "../Star";
import { Heart } from "../Heart";
import { photoHeartCopy } from "../../data/photoHeartData";
import { cn } from "../../utils/cn";

export interface FinalBirthdayNoteProps {
  className?: string;
}

/**
 * Final Birthday Note & Card displayed beneath the Big Photo Heart.
 * The Heart remains prominently visible as the visual centerpiece.
 */
export const FinalBirthdayNote: React.FC<FinalBirthdayNoteProps> = ({ className }) => {
  const d = photoHeartCopy;
  const signatureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!signatureRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(signatureRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Set initial hidden state before animation
    gsap.set(signatureRef.current, {
      opacity: 0,
      y: 15,
      scale: 0.96,
    });

    // Animate smoothly after a brief pause
    const ctx = gsap.context(() => {
      gsap.to(signatureRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        delay: 0.8,
        ease: "power2.out",
      });
    }, signatureRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 select-none space-y-12 animate-fadeIn",
        className
      )}
    >
      {/* 1. Leading Reflection Line */}
      <div className="space-y-3 max-w-xl mx-auto">
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#E88AAA] font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(232,138,170,0.3)]">
          &ldquo;{d.postFormation.line1}&rdquo;
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF7F0] font-normal tracking-wide">
          {d.postFormation.line2}
        </h2>
      </div>

      {/* Decorative Gold & Star Divider */}
      <div className="flex items-center justify-center gap-4 text-[#F5C84B]/60">
        <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5C84B]/50" />
        <Star size="sm" color="gold" />
        <Heart size="xs" color="pink" filled />
        <Star size="sm" color="gold" />
        <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5C84B]/50" />
      </div>

      {/* 2. Sincere Final Card (Beneath the Heart, keeping the Heart in view) */}
      <article className="relative w-full max-w-lg p-8 sm:p-12 rounded-3xl bg-[#0D1330]/85 border border-[#F5C84B]/35 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(245,200,75,0.12)] backdrop-blur-md overflow-hidden">
        {/* Subtle Double Gold Foil Inset Borders */}
        <div className="absolute inset-3 rounded-2xl border border-[#F5C84B]/20 pointer-events-none" />
        <div className="absolute inset-4 rounded-xl border border-[#F5C84B]/10 pointer-events-none" />

        {/* Decorative corner stars */}
        <span className="absolute top-4 left-4 text-[#F5C84B]/40 text-xs pointer-events-none">✦</span>
        <span className="absolute top-4 right-4 text-[#F5C84B]/40 text-xs pointer-events-none">✦</span>
        <span className="absolute bottom-4 left-4 text-[#F5C84B]/40 text-xs pointer-events-none">✦</span>
        <span className="absolute bottom-4 right-4 text-[#F5C84B]/40 text-xs pointer-events-none">✦</span>

        {/* Card Header */}
        <div className="space-y-2 mb-6">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#F5C84B] font-bold">
            SEPTEMBER 11
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FFF7F0] font-normal tracking-wide">
            Happy Birthday,
          </h3>
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#E88AAA] drop-shadow-[0_2px_15px_rgba(240,90,166,0.35)]">
            Dharshini.
          </h1>
        </div>

        {/* Final Message */}
        <div className="space-y-4 font-serif text-base sm:text-lg md:text-xl text-[#E2D9D2] leading-relaxed font-light">
          <p className="text-[#FFF7F0]/95">
            {d.finalCard.wish}
          </p>
          <p className="italic text-[#AEB6CC]">
            Keep smiling. Keep being you. And take care of yourself.
          </p>
          <p className="font-serif font-medium text-lg sm:text-xl md:text-2xl text-[#F5C84B] pt-2 drop-shadow-[0_0_12px_rgba(245,200,75,0.35)]">
            {d.finalCard.closing2}
          </p>
        </div>

        {/* Quiet Closing Accents */}
        <div className="mt-8 pt-6 border-t border-[#F5C84B]/20 flex justify-center items-center gap-2 text-[#AEB6CC] font-mono text-[11px] uppercase tracking-widest">
          <span>Always cheering for you</span>
          <span className="text-[#F05AA6] text-xs">♥</span>
        </div>

        {/* ===================================================================
            FINAL HANDWRITTEN SIGNATURE — Srinath
            The absolute last personal element on the website.
            Warm gold em-dash, soft pink initial 'S', and warm cream/gold 'rinath'.
           =================================================================== */}
        <div
          ref={signatureRef}
          className="pt-6 sm:pt-8 flex items-center justify-center select-none will-change-transform"
        >
          <p
            className="font-script text-[32px] sm:text-[44px] md:text-[52px] tracking-wide leading-tight filter drop-shadow-[0_2px_18px_rgba(245,200,75,0.3)] flex items-center justify-center gap-1"
            style={{ fontFamily: "var(--font-script, 'Great Vibes', 'Dancing Script', cursive)" }}
          >
            <span className="text-[#F5C84B] drop-shadow-[0_0_10px_rgba(245,200,75,0.6)]">—</span>
            <span className="ml-1 text-[#E88AAA] drop-shadow-[0_0_12px_rgba(232,138,170,0.5)]">S</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#E88AAA] drop-shadow-[0_0_12px_rgba(245,200,75,0.35)]">
              rinath
            </span>
          </p>
        </div>
      </article>
    </div>
  );
};
