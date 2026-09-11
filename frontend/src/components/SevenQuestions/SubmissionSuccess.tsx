import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "../../utils/cn";

export interface SubmissionSuccessProps {
  onContinue: () => void;
  className?: string;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  onContinue,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && containerRef.current) {
      const ctx = gsap.context(() => {
        const items = containerRef.current?.querySelectorAll(".success-anim-item");
        if (items && items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.35,
              ease: "power2.out",
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-xl mx-auto py-12 sm:py-16 text-center space-y-7 select-none",
        className
      )}
    >
      {/* Icon Badge */}
      <div className="success-anim-item inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0D1330] border border-[#F5C84B]/30 shadow-[0_0_25px_rgba(245,200,75,0.25)] text-[#F5C84B] mx-auto">
        <CheckCircle2 size={28} />
      </div>

      {/* Sequence of lines */}
      <div className="space-y-4">
        <p className="success-anim-item font-mono text-xs tracking-[0.3em] uppercase text-[#F5C84B] font-medium">
          Okay.
        </p>

        <h3 className="success-anim-item font-serif text-3xl sm:text-4xl text-[#FFF7F0] font-normal tracking-tight leading-tight">
          You survived all seven.
        </h3>

        <p className="success-anim-item font-serif italic text-lg sm:text-xl text-[#FFF7F0]/90">
          Thank you for being honest.
        </p>

        <div className="success-anim-item pt-2 space-y-1 text-sm sm:text-base text-[#AEB6CC] font-light">
          <p>Your answers are safely tucked away.</p>
          <p className="text-[#FFF7F0]/80">Let&rsquo;s continue.</p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="success-anim-item pt-6">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5C84B] to-[#E88AAA] text-[#080D25] font-mono text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.35)] hover:scale-105 hover:shadow-[0_0_30px_rgba(232,138,170,0.35)] transition-all duration-300 cursor-pointer"
        >
          <span>CONTINUE</span>
          <Sparkles size={15} />
        </button>
      </div>
    </div>
  );
};
