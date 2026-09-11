import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";

export interface StarTransformationProps {
  active: boolean;
  onComplete?: () => void;
  className?: string;
}

export const StarTransformation: React.FC<StarTransformationProps> = ({
  active,
  onComplete,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const stars = containerRef.current.querySelectorAll(".transformation-star");
    if (!stars || stars.length === 0) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(stars, { opacity: 1, y: -250, scale: 1 });
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // 1. Initial burst at candle positions
    tl.fromTo(
      stars,
      {
        opacity: 0,
        y: 0,
        scale: 0.4,
      },
      {
        opacity: 1,
        scale: 1.4,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(2)",
      }
    );

    // 2. Rising upward into the night sky, transforming into permanent stars
    tl.to(
      stars,
      {
        y: -320,
        scale: 1,
        stagger: 0.1,
        duration: 1.8,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // 3. Gentle twinkling pulsation once settled
    tl.to(
      stars,
      {
        opacity: 0.85,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        stagger: 0.15,
        ease: "sine.inOut",
      },
      "+=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [active, onComplete]);

  if (!active) return null;

  // 7 Star elements spaced symmetrically matching candle positions
  const starOffsets = [-120, -80, -40, 0, 40, 80, 120];

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-30",
        className
      )}
      aria-hidden="true"
    >
      {starOffsets.map((offsetX, i) => (
        <div
          key={i}
          className="transformation-star absolute will-change-transform flex items-center justify-center"
          style={{ transform: `translateX(${offsetX}px)` }}
        >
          {/* Radiant 4-point SVG Star */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_0_12px_rgba(245,200,75,0.9)]"
          >
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
              fill="url(#star-gold-gradient)"
            />
            <defs>
              <linearGradient id="star-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7F0" />
                <stop offset="50%" stopColor="#F5C84B" />
                <stop offset="100%" stopColor="#F05AA6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
