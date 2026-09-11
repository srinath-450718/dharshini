import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { birthdayWishData } from "../../data/birthdayWishData";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BubuDuduHintProps {
  onContinue?: () => void;
  className?: string;
}

export const BubuDuduHint: React.FC<BubuDuduHintProps> = ({
  onContinue,
  className,
}) => {
  const d = birthdayWishData.gifHint;

  const [imgSrc, setImgSrc] = useState<string>(d.gifSrc);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const gifBoxRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleError = () => {
    if (imgSrc !== d.fallbackSrc) {
      setImgSrc(d.fallbackSrc);
    } else {
      // If even remote fails, hide gracefully without blocking ceremony
      setLoadFailed(true);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!isLoaded && !loadFailed) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (gifBoxRef.current) gsap.set(gifBoxRef.current, { opacity: 1, scale: 1, y: 0 });
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    if (gifBoxRef.current && !loadFailed) {
      tl.fromTo(
        gifBoxRef.current,
        { opacity: 0, scale: 0.85, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "power2.out" }
      );
    }

    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "+=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isLoaded, loadFailed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-xl mx-auto text-center space-y-10 select-none py-12 px-4",
        className
      )}
    >
      {/* 1. Large Bubu Dudu GIF with soft pink/gold ambient glow */}
      {!loadFailed && (
        <div
          ref={gifBoxRef}
          className="relative inline-flex items-center justify-center opacity-0 will-change-transform"
        >
          {/* Enhanced Ambient Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#F05AA6]/25 via-[#F5C84B]/20 to-transparent blur-xl -z-10 scale-110" />

          <img
            src={imgSrc}
            alt={d.alt}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className="w-[240px] sm:w-[320px] md:w-[380px] h-auto rounded-3xl object-cover shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-white/15"
          />
        </div>
      )}

      {/* 2. Ambiguous Playful Text */}
      <div ref={textRef} className="space-y-2 opacity-0">
        <p className="font-serif italic text-base sm:text-lg text-[#FFF7F0]/90">
          {d.line1}
        </p>
        <p className="font-sans text-xs sm:text-sm text-[#AEB6CC]/70 tracking-wide font-light">
          {d.line2}
        </p>

        {/* 3. Final Continue Button */}
        <div className="pt-8">
          <button
            type="button"
            id="btn-module-7-continue"
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-10 sm:px-12 py-4 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#F05AA6] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_30px_rgba(245,200,75,0.4)] hover:shadow-[0_0_40px_rgba(240,90,166,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>{d.buttonText}</span>
            <Sparkles size={16} />
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
