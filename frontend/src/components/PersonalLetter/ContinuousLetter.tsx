import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalLetterData } from "../../data/personalLetterData";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

export interface ContinuousLetterProps {
  onContinueToNext?: () => void;
  onCloseLetter?: () => void;
  className?: string;
}

export const ContinuousLetter: React.FC<ContinuousLetterProps> = ({
  onContinueToNext,
  onCloseLetter,
  className,
}) => {
  const d = personalLetterData;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const letterSheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current || !letterSheetRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial unfolding entrance of the single physical letter sheet
      if (!prefersReducedMotion) {
        gsap.fromTo(
          letterSheetRef.current,
          { opacity: 0, scaleY: 0.94, y: 30, transformOrigin: "top center" },
          {
            opacity: 1,
            scaleY: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      }

      // 2. Scroll-triggered reveal animations for each letter block down the SAME sheet
      const revealItems = containerRef.current?.querySelectorAll(".letter-scroll-reveal");
      if (revealItems && revealItems.length > 0) {
        revealItems.forEach((item) => {
          if (prefersReducedMotion) {
            gsap.set(item, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            item,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // 3. Staggered reveal for the three shoulder lines
      const shoulderItems = containerRef.current?.querySelectorAll(".shoulder-line-item");
      if (shoulderItems && shoulderItems.length > 0) {
        if (prefersReducedMotion) {
          gsap.set(shoulderItems, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            shoulderItems,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#shoulder-moment-block",
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 4. Subtle handwriting stroke reveal for the final signature
      const signatureEl = containerRef.current?.querySelector(".signature-reveal");
      if (signatureEl) {
        if (prefersReducedMotion) {
          gsap.set(signatureEl, { opacity: 1 });
        } else {
          gsap.fromTo(
            signatureEl,
            { opacity: 0, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: 1.8,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: signatureEl,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full flex flex-col items-center select-none py-16 sm:py-24 px-4 sm:px-6",
        className
      )}
    >
      {/* Surrounding Midnight Navy Atmosphere: soft pink atmospheric glow & tiny stars */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-radial from-[#F05AA6]/08 via-[#F5C84B]/04 to-transparent blur-3xl" />
        <span className="absolute top-[15%] left-[12%] text-[#F5C84B]/60 text-xs animate-pulse">✦</span>
        <span className="absolute top-[40%] right-[10%] text-[#FF75A0]/50 text-xs animate-pulse" style={{ animationDelay: "1.5s" }}>♥</span>
        <span className="absolute top-[65%] left-[8%] text-[#FF75A0]/40 text-xs animate-pulse" style={{ animationDelay: "2.2s" }}>♥</span>
        <span className="absolute top-[85%] right-[14%] text-[#F5C84B]/60 text-xs animate-pulse" style={{ animationDelay: "0.9s" }}>✦</span>
      </div>

      {/* =========================================================================
          THE CONTINUOUS PHYSICAL LETTER SHEET
          - Warm cream paper
          - Real physical handwritten stationery feel
          - Subtle paper texture, soft shadow, elegant gold trim border
          - Approximately 70-80vw max on desktop, 88-92vw on mobile
          - ONE continuous sheet — user simply scrolls naturally
         ========================================================================= */}
      <article
        ref={letterSheetRef}
        className="relative w-[92vw] sm:w-[86vw] md:w-[78vw] max-w-[820px] bg-[#FAF7EE] text-[#1A1F36] rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(245,200,75,0.12)] border border-[#E8DCC0] p-6 sm:p-12 md:p-16 lg:p-20 overflow-hidden will-change-transform"
        style={{
          backgroundImage: `radial-gradient(#DECBA4 0.65px, transparent 0.65px), radial-gradient(#DECBA4 0.65px, #FAF7EE 0.65px)`,
          backgroundSize: "26px 26px",
          backgroundPosition: "0 0, 13px 13px",
        }}
      >
        {/* Subtle Double Gold Foil Border */}
        <div className="absolute inset-3 sm:inset-5 rounded-xl sm:rounded-2xl border border-[#D4A82F]/30 pointer-events-none" />
        <div className="absolute inset-4 sm:inset-6 rounded-lg sm:rounded-xl border border-[#D4A82F]/15 pointer-events-none" />

        {/* Decorative corner flourishes */}
        <span className="absolute top-5 left-5 text-[#D4A82F]/40 text-xs pointer-events-none">✦</span>
        <span className="absolute top-5 right-5 text-[#D4A82F]/40 text-xs pointer-events-none">✦</span>
        <span className="absolute bottom-5 left-5 text-[#D4A82F]/40 text-xs pointer-events-none">✦</span>
        <span className="absolute bottom-5 right-5 text-[#D4A82F]/40 text-xs pointer-events-none">✦</span>

        {/* =====================================================================
            LETTER HEADER: Big Script "Dharshini" + Subline
           ===================================================================== */}
        <header className="letter-scroll-reveal text-center space-y-4 pt-4 pb-12 sm:pb-16 border-b border-[#D4A82F]/20">
          <h1 className="font-script text-[clamp(3.2rem,8vw,6rem)] text-[#B8860B] leading-none tracking-wide drop-shadow-[0_2px_14px_rgba(245,200,75,0.35)]">
            {d.header.salutation}
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#2D354E] font-normal leading-relaxed max-w-xl mx-auto pt-2">
            {d.header.subline}
          </p>
        </header>

        {/* =====================================================================
            LETTER BODY — ONE CONTINUOUS FLOW
           ===================================================================== */}
        <div className="space-y-12 sm:space-y-16 pt-10 sm:pt-14 text-left font-serif text-[18px] sm:text-[21px] md:text-[23px] text-[#242A42] leading-[1.8] sm:leading-[1.85] font-light">
          {/* Paragraph 1 */}
          <div className="letter-scroll-reveal">
            <p>{d.body.p1}</p>
          </div>

          {/* Special Moment 1: "But you know what?" + Large Cream/Gold Callout */}
          <div className="letter-scroll-reveal space-y-4">
            <p className="font-serif italic text-lg sm:text-xl text-[#786D5E] font-normal">
              {d.body.pauseLine}
            </p>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F4EDE0] border border-[#D4A82F]/35 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <p className="font-serif text-2xl sm:text-3xl md:text-[34px] text-[#9A6F09] font-normal leading-snug drop-shadow-[0_1px_8px_rgba(245,200,75,0.25)]">
                &ldquo;{d.body.specialMoment1}&rdquo;
              </p>
            </div>
          </div>

          {/* Paragraph 2 */}
          <div className="letter-scroll-reveal">
            <p>{d.body.p2}</p>
          </div>

          {/* Special Moment 2: "Sometimes I feel like I know something..." + Tiny glowing star beside it */}
          <div className="letter-scroll-reveal flex items-start gap-3.5 sm:gap-4 p-5 sm:p-7 rounded-2xl bg-white/40 border border-[#D4A82F]/20">
            <span className="text-[#B8860B] text-base sm:text-lg mt-1 flex-shrink-0 animate-pulse">
              ✦
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-[26px] text-[#1A2035] font-normal leading-relaxed">
              {d.body.specialMoment2}
            </p>
          </div>

          {/* Caring Observations */}
          <div className="letter-scroll-reveal space-y-4">
            <p>{d.body.p3_1}</p>
            <p>{d.body.p3_2}</p>
          </div>

          {/* Caring Moment: Large script "So please take care of yourself too." + Underneath text */}
          <div className="letter-scroll-reveal space-y-3 pt-2 text-center sm:text-left">
            <p className="font-script text-3xl sm:text-4xl md:text-5xl text-[#C93984] leading-tight drop-shadow-sm">
              {d.body.caringLine1}
            </p>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#523D26] font-normal">
              {d.body.caringLine2}
            </p>
          </div>

          {/* Distance Moment: Emotional focal point */}
          <div className="letter-scroll-reveal space-y-4 p-6 sm:p-8 rounded-2xl bg-[#F5EFE3] border-l-4 border-[#B8860B]">
            <p className="text-lg sm:text-xl text-[#6B5A43] italic">
              {d.body.distanceLine1}
            </p>
            <p className="font-serif text-xl sm:text-2xl md:text-[27px] text-[#1E2548] font-normal leading-relaxed">
              &ldquo;{d.body.distanceLine2}&rdquo;
            </p>
          </div>

          {/* Shoulder Moment: 3 lines revealed one after another with soft warm glow & subtle underline */}
          <div id="shoulder-moment-block" className="space-y-5 pt-4">
            <div className="space-y-4">
              {d.body.shoulderLines.map((line, idx) => (
                <div
                  key={idx}
                  className="shoulder-line-item relative p-4 sm:p-5 rounded-xl bg-[#FFFDF9] border border-[#EADBBD] shadow-sm"
                >
                  <p className="font-serif text-xl sm:text-2xl md:text-[25px] text-[#242C48] font-normal leading-relaxed">
                    {line}
                  </p>
                  {/* Subtle hand-drawn gold line under the 3rd line */}
                  {idx === 2 && (
                    <div className="w-36 h-[2px] bg-gradient-to-r from-[#B8860B]/70 to-transparent mt-3" />
                  )}
                </div>
              ))}
            </div>

            <div className="letter-scroll-reveal pt-4 space-y-2 text-base sm:text-lg text-[#6B5A43]">
              <p>{d.body.careReason1}</p>
              <p className="font-serif text-xl sm:text-2xl text-[#1E2548] font-normal italic">
                {d.body.careReason2}
              </p>
            </div>
          </div>

          {/* Wishes Section */}
          <div className="letter-scroll-reveal space-y-4">
            <p className="font-serif text-xl sm:text-2xl text-[#1E2548] font-medium">
              {d.body.wishesLead}
            </p>
            <div className="space-y-2.5 pl-4 sm:pl-6 border-l-2 border-[#D4A82F]/40">
              {d.body.wishesPoints.map((point, idx) => (
                <p key={idx} className="font-serif text-lg sm:text-xl text-[#2E3650]">
                  ✦ {point}
                </p>
              ))}
            </div>
            <p className="pt-2 italic text-[#4A3E30]">{d.body.wishesClosing}</p>
          </div>

          {/* Lucky Charm Moment: warm gold with subtle pink glow & tiny stars */}
          <div className="letter-scroll-reveal flex items-center gap-2 pt-2">
            <span className="font-serif text-xl sm:text-2xl text-[#242A42]">
              {d.body.luckyCharmLine.lead}
            </span>
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[#B8860B] drop-shadow-[0_0_10px_rgba(245,200,75,0.4)] flex items-center gap-1.5">
              <span>{d.body.luckyCharmLine.nickname}</span>
              <span className="text-xs text-[#F5C84B]">✦</span>
            </span>
          </div>

          {/* Birthday Moment: Brightest point of the letter */}
          <div className="letter-scroll-reveal text-center py-8 sm:py-10 border-y border-[#D4A82F]/30 bg-gradient-to-r from-transparent via-[#F4EADA]/60 to-transparent">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[#FF75A0]/80 text-xs">♥</span>
              <span className="text-[#F5C84B] text-xs">✦</span>
              <span className="text-[#FF75A0]/80 text-xs">♥</span>
            </div>
            <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#9A6F09] leading-tight drop-shadow-[0_2px_15px_rgba(245,200,75,0.3)]">
              {d.body.birthdayGreeting}
            </h2>
          </div>

          {/* Playful Reset Lines */}
          <div className="letter-scroll-reveal space-y-3 text-lg sm:text-xl text-[#3A435E]">
            <p>{d.body.playful1}</p>
            <p className="italic">{d.body.playful2}</p>
            <p className="pt-3">{d.body.playful3}</p>
            <p className="italic text-[#6B5A43]">{d.body.playful4}</p>
          </div>

          {/* ===================================================================
              PHOTO TUCKED INTO THE LETTER (Near bottom right)
              - Looks like an actual physical photograph attached to the paper
              - Subtle tilt, paperclip detail, shadow
             =================================================================== */}
          <div className="letter-scroll-reveal pt-6 flex justify-end">
            <div className="relative w-44 sm:w-56 p-2 sm:p-2.5 bg-white rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.22)] border border-[#E0D5BE] -rotate-3 hover:rotate-0 transition-transform duration-500 group">
              {/* Gold Paperclip Top Corner */}
              <div className="absolute -top-3 left-6 w-5 h-8 border-2 border-[#B8860B] rounded-full z-10 opacity-80" />

              {/* Photo Frame */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF6EE]">
                <img
                  src={d.photo.src}
                  alt={d.photo.alt}
                  style={{ objectPosition: "center 15%" }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Handwritten Note at bottom of polaroid */}
              <p className="font-script text-sm sm:text-base text-[#6B5A43] text-center pt-2">
                {d.photo.caption}
              </p>
            </div>
          </div>

          {/* ===================================================================
              FINAL SIGNATURE — Bottom of the SAME letter
             =================================================================== */}
          <div className="letter-scroll-reveal pt-8 pb-4 text-left border-t border-[#D4A82F]/25">
            <p className="signature-reveal font-script text-2xl sm:text-3xl md:text-4xl text-[#523A06] leading-relaxed">
              {d.body.signature}
            </p>
          </div>

          {/* Single Tiny Handwritten Heart or Star Motif at Letter Bottom */}
          <div className="letter-scroll-reveal pt-2 flex justify-center text-[#B8860B]/70 text-sm">
            ✦
          </div>
        </div>
      </article>

      {/* =========================================================================
          OUTSIDE THE LETTER, BELOW IT:
          - Sits on the midnight navy background
          - "Anyway. That's enough sincerity for one letter. Don't get used to it."
          - CONTINUE → button to next module
         ========================================================================= */}
      <div className="letter-scroll-reveal w-full max-w-xl mx-auto text-center space-y-6 pt-16 sm:pt-24 text-[#FFF7F0]">
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F5C84B] font-bold drop-shadow-[0_0_10px_rgba(245,200,75,0.4)]">
          {d.closing.anyway}
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFF7F0] font-normal">
          {d.closing.enough}
        </h3>

        <p className="font-serif italic text-lg sm:text-xl text-[#E2D9D2] font-light">
          {d.closing.dontGetUsed}
        </p>

        <p className="font-serif text-xl sm:text-2xl text-[#FFF7F0]/95 font-light pt-3">
          {d.closing.journey}
        </p>

        {/* Continue Button leading to Module 10 */}
        <div className="pt-6 flex flex-col items-center gap-4">
          <button
            type="button"
            id="btn-module-9-continue"
            onClick={onContinueToNext}
            className="inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#F05AA6] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_35px_rgba(245,200,75,0.45)] hover:shadow-[0_0_45px_rgba(240,90,166,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>{d.closing.buttonText}</span>
            <Sparkles size={16} />
            <ArrowRight size={16} />
          </button>

          {onCloseLetter && (
            <button
              type="button"
              id="btn-close-letter"
              onClick={onCloseLetter}
              className="text-xs font-mono tracking-[0.22em] uppercase text-[#FFF7F0]/60 hover:text-[#F5C84B] transition-colors py-2 px-4 underline-offset-4 hover:underline cursor-pointer"
            >
              Fold Letter & Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
