import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timelineEvents } from "../data/timeline";
import { TimelineEvent } from "../components/Timeline/TimelineEvent";
import { TinyGlowingHeart } from "../components/Timeline/TimelineIcons";
import { ArrowRight } from "lucide-react";

export interface TimelineSectionProps {
  onContinue?: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onContinue }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const heartTrackerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Central Timeline Line Progress Animation
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Active Node tracking for each event
      timelineEvents.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: `#timeline-event-${item.id}`,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });

      // 3. Backward Heart Motif Easter Egg
      // Heart moves along the timeline with backward pauses at Event 02 and Event 08
      if (heartTrackerRef.current && !prefersReducedMotion) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 85%",
            scrub: 1.2,
          },
        });

        // Progresses down to Event 02 (~20%)
        tl.to(heartTrackerRef.current, { yPercent: 20, ease: "none" })
          // At Event 02: gently moves backward ~1 event
          .to(heartTrackerRef.current, { yPercent: 12, duration: 0.4, ease: "power1.inOut" })
          // Returns forward
          .to(heartTrackerRef.current, { yPercent: 25, duration: 0.4, ease: "power1.inOut" })
          // Progresses to Event 08 (~88%)
          .to(heartTrackerRef.current, { yPercent: 88, ease: "none" })
          // At Event 08: pauses and moves backward slightly
          .to(heartTrackerRef.current, { yPercent: 82, duration: 0.5, ease: "power1.inOut" })
          // Continues down to Section End
          .to(heartTrackerRef.current, { yPercent: 100, ease: "power1.in" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 bg-[#080D25] text-[#FFF7F0] overflow-hidden"
    >
      {/* SECTION INTRO */}
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-24 sm:mb-32">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D1330]/90 border border-[#F5C84B]/20 backdrop-blur-md shadow-lg shadow-black/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C84B] shadow-[0_0_8px_rgba(245,200,75,0.8)]" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.28em] text-[#F5C84B] uppercase font-medium">
            THE STORY SO FAR
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#E88AAA] drop-shadow-[0_4px_30px_rgba(245,200,75,0.3)]">
          Somewhere Along the Way
        </h2>

        <div className="space-y-2 max-w-xl mx-auto text-base sm:text-lg lg:text-xl text-[#FFF7F0]/95 font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          <p>We didn&rsquo;t exactly have a dramatic story.</p>
          <p className="text-[#FFF7F0] italic font-serif font-normal text-lg sm:text-2xl pt-1">
            We just slowly became part of each other&rsquo;s little universe.
          </p>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* Continuous Center Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1.5px] bg-[#151A3A] pointer-events-none">
          {/* Active Glowing Illuminated Line */}
          <div
            ref={lineFillRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] shadow-[0_0_12px_rgba(245,200,75,0.5)] origin-top will-change-transform"
          />

          {/* Backward Heart Easter Egg Tracker */}
          <div
            ref={heartTrackerRef}
            className="absolute -left-[7px] top-0 will-change-transform pointer-events-none z-30"
          >
            <TinyGlowingHeart size={16} pulse={false} />
          </div>
        </div>

        {/* 8 Chronological Timeline Events */}
        <div className="space-y-4 sm:space-y-8">
          {timelineEvents.map((item, index) => (
            <TimelineEvent
              key={item.id}
              item={item}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>

      {/* SECTION END */}
      <div className="max-w-xl mx-auto text-center space-y-6 pt-24 sm:pt-36 pb-12">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#F5C84B]/60 to-transparent mx-auto" />

        <div className="space-y-3 font-serif">
          <p className="text-xl sm:text-2xl text-[#F5C84B] font-light italic drop-shadow-[0_0_10px_rgba(245,200,75,0.4)]">
            Anyway...
          </p>
          <p className="text-3xl sm:text-4xl lg:text-5xl text-[#FFF7F0] font-normal tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            Maybe some things don&rsquo;t need an explanation.
          </p>
          <p className="text-xs sm:text-sm font-mono text-[#AEB6CC] tracking-[0.28em] uppercase font-light pt-2">
            Let&rsquo;s keep going.
          </p>
        </div>

        {/* Continue to Gallery Button */}
        <div className="pt-6">
          <button
            type="button"
            id="btn-timeline-continue"
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-10 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>CONTINUE TO GALLERY</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Tiny Heart Travelling Forward Disappearing Below */}
        <div className="pt-4 flex justify-center">
          <span className="w-1 h-1 rounded-full bg-[#E88AAA] animate-ping" />
        </div>
      </div>
    </section>
  );
};
