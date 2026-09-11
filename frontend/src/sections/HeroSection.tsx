import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, ShieldAlert, Sparkles, Eye, CheckCircle2 } from "lucide-react";
import { heroContent } from "../data/heroContent";
import { siteConfig } from "../data/config";

interface HeroSectionProps {
  onUnlockClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onUnlockClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [avoidanceConfessed, setAvoidanceConfessed] = useState(false);
  const [teaseMessage, setTeaseMessage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          ".hero-title-line",
          {
            y: 40,
            opacity: 0,
            duration: 1.1,
            stagger: 0.18,
          },
          "-=0.4"
        )
        .from(
          ".hero-subtitle",
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".hero-card",
          {
            y: 35,
            opacity: 0,
            scale: 0.98,
            duration: 0.9,
          },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleConfessAvoidance = () => {
    setAvoidanceConfessed(true);
    const messages = [
      "Case closed. Satellite logs confirmed your read receipts.",
      "Admitting it is the first step, Little Bunny.",
      "Penalty for dodging: You have to enjoy this whole website.",
      "Don't worry, your secret is safe with me (and everyone here).",
    ];
    setTeaseMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handleScrollDown = () => {
    if (onUnlockClick) {
      onUnlockClick();
    } else {
      const nextEl = document.getElementById("dossier");
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 z-10 select-none"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
      >
        {/* Eyebrow badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151A3A]/70 border border-[#F05AA6]/30 shadow-lg shadow-[#F05AA6]/5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#F05AA6] animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest uppercase text-[#FFF7F0]/90">
            {heroContent.eyebrow}
          </span>
          <span className="text-[#AEB6CC]/40 text-xs">|</span>
          <span className="font-mono text-[10px] text-[#F5C84B] tracking-wider uppercase">
            TARGET: {siteConfig.primaryNickname}
          </span>
        </div>

        {/* Main Headline */}
        <div className="space-y-2">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FFF7F0] leading-[1.12]">
            <span className="hero-title-line block">
              {heroContent.headlinePrefix}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F05AA6] via-[#f583be] to-[#F5C84B] font-serif">
                {heroContent.headlineHighlight}
              </span>
            </span>
            <span className="hero-title-line block font-light text-[#FFF7F0]/95">
              {heroContent.headlineSuffix}
            </span>
          </h1>
        </div>

        {/* Subtitle with authentic teasing & sincere undertone */}
        <p className="hero-subtitle max-w-2xl text-base sm:text-lg text-[#AEB6CC] font-sans font-light leading-relaxed">
          {heroContent.subtitle}
        </p>

        {/* Interactive Dossier Preview Card */}
        <div className="hero-card w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#0D1330]/75 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50 text-left relative overflow-hidden group">
          {/* Subtle accent corner glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#F05AA6]/10 rounded-full blur-2xl pointer-events-none transition-all duration-500 group-hover:bg-[#F05AA6]/20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F5C84B]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Dossier Card Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-[#F5C84B]">
                <ShieldAlert size={18} />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#AEB6CC]">
                  Subject Inspection Report
                </p>
                <p className="text-sm font-serif font-semibold text-[#FFF7F0]">
                  Dharshini • Known as &ldquo;{siteConfig.secondaryNickname}&rdquo;
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F05AA6]/15 border border-[#F05AA6]/30 text-[10px] font-mono text-[#F05AA6]">
              <Sparkles size={11} />
              <span>UNOFFICIAL FILE</span>
            </div>
          </div>

          {/* Teasing Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
            {heroContent.stats.map((stat) => (
              <div
                key={stat.id}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#F05AA6]/20 transition-all duration-300"
              >
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#AEB6CC] mb-1">
                  {stat.label}
                </div>
                <div className="text-base sm:text-lg font-serif font-semibold text-[#FFF7F0] tracking-tight">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Schoolmate quote footer & avoidance confession button */}
          <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#AEB6CC]">
            <p className="italic font-sans text-xs text-[#AEB6CC]/90">
              {heroContent.teaseQuote}
            </p>

            <button
              onClick={handleConfessAvoidance}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#F05AA6]/20 hover:text-[#FFF7F0] border border-white/10 text-[11px] font-mono transition-all duration-200 cursor-pointer shrink-0"
            >
              {avoidanceConfessed ? (
                <>
                  <CheckCircle2 size={13} className="text-[#F05AA6]" />
                  <span>Confession Logged</span>
                </>
              ) : (
                <>
                  <Eye size={13} className="text-[#F5C84B]" />
                  <span>Confess Avoiding Me</span>
                </>
              )}
            </button>
          </div>

          {teaseMessage && (
            <div className="mt-3 p-2.5 rounded-lg bg-[#F05AA6]/10 border border-[#F05AA6]/30 text-xs font-mono text-[#FFF7F0] animate-fadeIn flex items-center gap-2">
              <span className="text-[#F05AA6]">►</span>
              <span>{teaseMessage}</span>
            </div>
          )}
        </div>

        {/* Action Button & Scroll Prompt */}
        <div className="hero-cta flex flex-col items-center gap-4 pt-4">
          <button
            onClick={handleScrollDown}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F05AA6] to-[#C93984] text-[#FFF7F0] font-sans font-medium text-sm tracking-wide shadow-xl shadow-[#F05AA6]/25 hover:shadow-[#F05AA6]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <Sparkles size={16} className="text-[#F5C84B]" />
            <span>Open Birthday Dossier</span>
            <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>

          <button
            onClick={handleScrollDown}
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#AEB6CC]/70 hover:text-[#FFF7F0] transition-colors pt-2 cursor-pointer"
          >
            <span>{heroContent.scrollPrompt}</span>
            <ArrowDown size={12} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
