import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TimelineItem } from "../../data/timeline";
import { TimelinePhoto } from "./TimelinePhoto";
import { TimelineNote } from "./TimelineNote";
import { TimelineNode } from "./TimelineNode";
import { CharmIcon, BunnyIcon, TinyGlowingHeart } from "./TimelineIcons";
import { cn } from "../../utils/cn";

export interface TimelineEventProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  item,
  index,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const photoColRef = useRef<HTMLDivElement | null>(null);

  const isEven = index % 2 === 1; // Alternating flag for desktop: even index has note/text on left, photo on right

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered reveal of event elements
      const targets = [
        textColRef.current?.querySelector(".timeline-label"),
        textColRef.current?.querySelector(".timeline-title"),
        textColRef.current?.querySelector(".timeline-desc"),
        textColRef.current?.querySelector(".timeline-delayed"),
        photoColRef.current,
        textColRef.current?.querySelector(".timeline-note-wrapper"),
      ].filter(Boolean);

      gsap.from(targets, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 1.0,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id={`timeline-event-${item.id}`}
      className="relative w-full py-12 sm:py-16 md:py-24 my-6 sm:my-8"
    >
      {/* DESKTOP LAYOUT (2 Columns + Center Timeline Node) */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-10 lg:gap-20 max-w-6xl mx-auto px-6">
        {/* Left Column */}
        <div
          ref={!isEven ? photoColRef : textColRef}
          className={cn(
            "flex flex-col justify-center",
            !isEven ? "items-end text-right" : "items-end text-right"
          )}
        >
          {!isEven ? (
            /* Photo on Left (Odd items: 1, 3, 5, 7) */
            <TimelinePhoto
              src={item.image}
              alt={item.imageAlt}
              objectPosition={item.objectPosition}
              isAvoiderEvent={item.isAvoiderEvent}
            />
          ) : (
            /* Text & Note on Left (Even items: 2, 4, 6, 8) */
            <div className="w-full max-w-lg flex flex-col items-end text-right space-y-5">
              {/* Label */}
              <div className="timeline-label inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm tracking-[0.28em] text-[#F5C84B] uppercase font-medium drop-shadow-[0_0_8px_rgba(245,200,75,0.4)]">
                {item.specialIcon === "bunny" && <BunnyIcon size={18} />}
                {item.specialIcon === "charm" && <CharmIcon size={18} />}
                {item.specialIcon === "heart" && <TinyGlowingHeart size={16} />}
                <span>{item.label}</span>
              </div>

              {/* Title with Hero-inspired radiant gradient */}
              <h3 className="timeline-title font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] drop-shadow-[0_4px_28px_rgba(245,200,75,0.35)]">
                {item.title}
              </h3>

              {/* Description: large, bright, crisp, readable */}
              <p className="timeline-desc font-sans text-base sm:text-lg lg:text-xl text-[#FFF7F0] font-normal leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {item.description}
              </p>

              {/* Delayed Text for Event 08 */}
              {item.delayedText && (
                <p className="timeline-delayed font-serif text-lg sm:text-xl md:text-2xl text-[#F5C84B] italic pt-1 drop-shadow-[0_0_15px_rgba(245,200,75,0.55)]">
                  &ldquo;{item.delayedText}&rdquo;
                </p>
              )}

              {/* Personal Note */}
              <div className="timeline-note-wrapper w-full flex justify-end pt-2">
                <TimelineNote note={item.note} />
              </div>
            </div>
          )}
        </div>

        {/* Center Node */}
        <div className="relative flex justify-center">
          <TimelineNode isActive={isActive} />
        </div>

        {/* Right Column */}
        <div
          ref={!isEven ? textColRef : photoColRef}
          className={cn(
            "flex flex-col justify-center",
            !isEven ? "items-start text-left" : "items-start text-left"
          )}
        >
          {!isEven ? (
            /* Text & Note on Right (Odd items: 1, 3, 5, 7) */
            <div className="w-full max-w-lg flex flex-col items-start text-left space-y-5">
              {/* Label */}
              <div className="timeline-label inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm tracking-[0.28em] text-[#F5C84B] uppercase font-medium drop-shadow-[0_0_8px_rgba(245,200,75,0.4)]">
                <span>{item.label}</span>
                {item.specialIcon === "charm" && <CharmIcon size={18} />}
                {item.specialIcon === "bunny" && <BunnyIcon size={18} />}
                {item.specialIcon === "heart" && <TinyGlowingHeart size={16} />}
              </div>

              {/* Title with Hero-inspired radiant gradient */}
              <h3 className="timeline-title font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] drop-shadow-[0_4px_28px_rgba(245,200,75,0.35)]">
                {item.title}
              </h3>

              {/* Description: large, bright, crisp, readable */}
              <p className="timeline-desc font-sans text-base sm:text-lg lg:text-xl text-[#FFF7F0] font-normal leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {item.description}
              </p>

              {/* Delayed Text for Event 08 */}
              {item.delayedText && (
                <p className="timeline-delayed font-serif text-lg sm:text-xl md:text-2xl text-[#F5C84B] italic pt-1 drop-shadow-[0_0_15px_rgba(245,200,75,0.55)]">
                  &ldquo;{item.delayedText}&rdquo;
                </p>
              )}

              {/* Personal Note */}
              <div className="timeline-note-wrapper w-full flex justify-start pt-2">
                <TimelineNote note={item.note} />
              </div>
            </div>
          ) : (
            /* Photo on Right (Even items: 2, 4, 6, 8) */
            <TimelinePhoto
              src={item.image}
              alt={item.imageAlt}
              objectPosition={item.objectPosition}
              isAvoiderEvent={item.isAvoiderEvent}
            />
          )}
        </div>
      </div>

      {/* MOBILE LAYOUT (Single Column Stack) */}
      <div className="flex md:hidden flex-col items-center text-center space-y-7 px-4 max-w-sm sm:max-w-md mx-auto w-full">
        {/* Mobile Node */}
        <TimelineNode isActive={isActive} />

        {/* Mobile Photo */}
        <TimelinePhoto
          src={item.image}
          alt={item.imageAlt}
          objectPosition={item.objectPosition}
          isAvoiderEvent={item.isAvoiderEvent}
        />

        {/* Mobile Content Block */}
        <div className="space-y-4 pt-2 w-full">
          <div className="inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-sm tracking-[0.25em] text-[#F5C84B] uppercase font-semibold drop-shadow-[0_0_8px_rgba(245,200,75,0.45)]">
            <span>{item.label}</span>
            {item.specialIcon === "charm" && <CharmIcon size={16} />}
            {item.specialIcon === "bunny" && <BunnyIcon size={16} />}
            {item.specialIcon === "heart" && <TinyGlowingHeart size={15} />}
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] drop-shadow-[0_4px_22px_rgba(245,200,75,0.35)]">
            {item.title}
          </h3>

          <p className="font-sans text-base sm:text-lg text-[#FFF7F0] font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {item.description}
          </p>

          {item.delayedText && (
            <p className="font-serif text-lg sm:text-xl text-[#F5C84B] italic pt-1 drop-shadow-[0_0_12px_rgba(245,200,75,0.55)]">
              &ldquo;{item.delayedText}&rdquo;
            </p>
          )}

          {/* Personal Note on Mobile */}
          <div className="pt-2 w-full flex justify-center">
            <TimelineNote note={item.note} />
          </div>
        </div>
      </div>

    </div>
  );
};
