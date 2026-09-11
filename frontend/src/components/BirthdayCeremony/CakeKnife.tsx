import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";

export interface CakeKnifeProps {
  isCutting: boolean;
  onCutComplete?: () => void;
  className?: string;
}

export const CakeKnife: React.FC<CakeKnifeProps> = ({
  isCutting,
  onCutComplete,
  className,
}) => {
  const knifeRef = useRef<HTMLDivElement | null>(null);
  const crumbsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isCutting || !knifeRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onCutComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onCutComplete?.();
      },
    });

    // 1. Knife enters from the right, hovering above the cake center
    tl.fromTo(
      knifeRef.current,
      {
        x: 140,
        y: -40,
        rotation: 35,
        opacity: 0,
      },
      {
        x: 0,
        y: 5,
        rotation: 15,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    // 2. Knife slices gently straight downward through the cake
    tl.to(knifeRef.current, {
      y: 110,
      rotation: 0,
      duration: 0.9,
      ease: "power2.inOut",
    });

    // 3. Crumbs appear along cut seam
    if (crumbsRef.current) {
      tl.fromTo(
        crumbsRef.current.children,
        { opacity: 0, scale: 0 },
        {
          opacity: 0.8,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(2)",
        },
        "-=0.5"
      );
    }

    // 4. Knife gracefully lifts away to the left and dissolves
    tl.to(knifeRef.current, {
      x: -40,
      y: 80,
      opacity: 0,
      duration: 0.4,
      ease: "power1.in",
    });

    return () => {
      tl.kill();
    };
  }, [isCutting, onCutComplete]);

  if (!isCutting) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Animated Knife SVG */}
      <div
        ref={knifeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      >
        <svg
          width="48"
          height="140"
          viewBox="0 0 48 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blade (Polished Silver with Light Sheen) */}
          <path
            d="M24 10C24 10 26 50 26 95L22 95C22 50 24 10 24 10Z"
            fill="url(#knife-blade-grad)"
            stroke="#FFF7F0"
            strokeWidth="0.75"
          />
          {/* Blade Edge Highlight */}
          <line
            x1="24"
            y1="12"
            x2="24"
            y2="92"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Handle Bolster (Warm Gold) */}
          <rect
            x="20"
            y="94"
            width="8"
            height="6"
            rx="1.5"
            fill="#F5C84B"
            stroke="#080D25"
            strokeWidth="0.5"
          />
          {/* Handle Grip (Midnight Navy with Gold Rivets) */}
          <rect
            x="21"
            y="100"
            width="6"
            height="32"
            rx="3"
            fill="#0D1330"
            stroke="#F5C84B"
            strokeWidth="0.75"
          />
          <circle cx="24" cy="108" r="1" fill="#F5C84B" />
          <circle cx="24" cy="116" r="1" fill="#F5C84B" />
          <circle cx="24" cy="124" r="1" fill="#F5C84B" />

          <defs>
            <linearGradient id="knife-blade-grad" x1="22" y1="10" x2="26" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. Tiny Golden Crumb Particles */}
      <div
        ref={crumbsRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <span className="absolute -left-2 -top-4 w-1.5 h-1.5 rounded-full bg-[#F5C84B]/80 shadow-[0_0_4px_#F5C84B]" />
        <span className="absolute left-2.5 top-1 w-1 h-1 rounded-full bg-[#FFF7F0] opacity-80" />
        <span className="absolute -left-3 top-8 w-1 h-1 rounded-full bg-[#F05AA6]/75" />
        <span className="absolute left-3.5 top-12 w-1.5 h-1.5 rounded-full bg-[#F5C84B]/70" />
      </div>
    </div>
  );
};
