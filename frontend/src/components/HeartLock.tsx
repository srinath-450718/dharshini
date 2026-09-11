import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../utils/cn";

export interface HeartLockProps {
  state: "idle" | "error" | "unlocking" | "unlocked" | "transitioning";
  unlockStage: number; // 0: idle, 1: stopped, 2: gold core light, 3: opening halves, 4: light beams & dissolve, 5: opened
  attempts: number;
  className?: string;
}

export const HeartLock: React.FC<HeartLockProps> = ({
  state,
  unlockStage,
  attempts,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftHalfRef = useRef<SVGPathElement | null>(null);
  const rightHalfRef = useRef<SVGPathElement | null>(null);
  const coreLightRef = useRef<HTMLDivElement | null>(null);
  const seamLightRef = useRef<SVGLineElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Heartbeat animation when idle
  useEffect(() => {
    if (!containerRef.current) return;

    if (prefersReducedMotion) {
      // In reduced-motion mode, skip looping pulse and shaking
      return;
    }

    // Faster pulse if several attempts failed
    const duration = attempts >= 3 ? 0.9 : 1.6;

    if (state === "idle") {
      const pulseTl = gsap.timeline({ repeat: -1, repeatDelay: duration * 0.4 });
      pulseTl
        .to(containerRef.current, {
          scale: 1.025,
          duration: 0.18,
          ease: "power1.inOut",
        })
        .to(containerRef.current, {
          scale: 1,
          duration: 0.22,
          ease: "power1.inOut",
        })
        .to(containerRef.current, {
          scale: 1.015,
          duration: 0.14,
          ease: "power1.inOut",
        })
        .to(containerRef.current, {
          scale: 1,
          duration: 0.28,
          ease: "power1.inOut",
        });

      return () => {
        pulseTl.kill();
      };
    } else if (state === "error") {
      // Gentle shake and glow flare on wrong password
      gsap.fromTo(
        containerRef.current,
        { x: -6 },
        {
          x: 6,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(containerRef.current, { x: 0, duration: 0.1 });
          },
        }
      );
    } else if (state === "unlocking" || state === "unlocked") {
      // Immediately stop heartbeat and freeze scale
      gsap.killTweensOf(containerRef.current);
      gsap.to(containerRef.current, { scale: 1, duration: 0.2 });
    }
  }, [state, attempts, prefersReducedMotion]);

  // Choreographed Unlock Sequence
  useEffect(() => {
    if (unlockStage === 2) {
      // Step 5 & 6: Tiny warm-gold light appears in the center of the heart and slowly expands
      if (coreLightRef.current) {
        gsap.fromTo(
          coreLightRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1.8, opacity: 1, duration: 0.7, ease: "power2.out" }
        );
      }
    } else if (unlockStage === 3) {
      // Step 7 & 8: Glowing seam line and heart halves gently opening
      if (seamLightRef.current) {
        gsap.to(seamLightRef.current, {
          opacity: 1,
          strokeWidth: prefersReducedMotion ? 1.5 : 3,
          duration: prefersReducedMotion ? 0.2 : 0.4,
        });
      }

      if (leftHalfRef.current && rightHalfRef.current) {
        if (prefersReducedMotion) {
          gsap.to([leftHalfRef.current, rightHalfRef.current], {
            opacity: 0.3,
            duration: 0.5,
            ease: "power1.out",
          });
        } else {
          gsap.to(leftHalfRef.current, {
            x: -32,
            rotation: -5,
            transformOrigin: "bottom center",
            duration: 1.1,
            ease: "power2.inOut",
          });

          gsap.to(rightHalfRef.current, {
            x: 32,
            rotation: 5,
            transformOrigin: "bottom center",
            duration: 1.1,
            ease: "power2.inOut",
          });
        }
      }
    } else if (unlockStage === 4) {
      // Step 9-14: Warm inner cream/gold light shines, particles travel outward, halves dissolve
      if (leftHalfRef.current && rightHalfRef.current) {
        gsap.to([leftHalfRef.current, rightHalfRef.current], {
          opacity: 0,
          scale: prefersReducedMotion ? 1 : 0.9,
          duration: prefersReducedMotion ? 0.4 : 0.9,
          ease: "power2.out",
        });
      }

      if (particlesRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          particlesRef.current.children,
          { scale: 0.2, opacity: 1, x: 0, y: 0 },
          {
            scale: (i) => 1 + (i % 3) * 0.4,
            opacity: 0,
            x: () => (Math.random() - 0.5) * 450,
            y: () => (Math.random() - 0.5) * 450,
            duration: 1.4,
            stagger: 0.04,
            ease: "power2.out",
          }
        );
      }
    }
  }, [unlockStage, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center select-none cursor-default transition-all w-[190px] h-[180px] sm:w-[220px] sm:h-[210px]",
        className
      )}
    >
      {/* Outer Soft Pink Glow Aura */}
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-[45px] transition-all duration-700 pointer-events-none",
          state === "error"
            ? "bg-[#F05AA6]/40 scale-125"
            : unlockStage >= 2
            ? "bg-[#F5C84B]/35 scale-140"
            : "bg-[#F05AA6]/20 scale-100"
        )}
      />

      {/* Warm Golden Core Light (Appears in center during unlock) */}
      <div
        ref={coreLightRef}
        className={cn(
          "absolute w-24 h-24 rounded-full bg-gradient-to-r from-[#F5C84B] to-[#FFF7F0] blur-xl pointer-events-none opacity-0 transition-opacity duration-500",
          unlockStage >= 3 && "w-36 h-36 blur-2xl opacity-90"
        )}
      />

      {/* SVG Heart Lock */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(240,90,166,0.4)]"
      >
        <defs>
          {/* Main Vivid Pink / Magenta Body Gradient */}
          <linearGradient id="heartPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6BB5" />
            <stop offset="45%" stopColor="#F05AA6" />
            <stop offset="100%" stopColor="#B32570" />
          </linearGradient>

          {/* Golden Edge Highlight Gradient */}
          <linearGradient id="goldEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5C84B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F05AA6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F5C84B" stopOpacity="0.8" />
          </linearGradient>

          {/* Inner Light Radial Glow */}
          <radialGradient id="innerGlow" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFF7F0" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#F05AA6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#080D25" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* LEFT HALF OF HEART LOCK */}
        <g>
          <path
            ref={leftHalfRef}
            d="M 100 48 C 94 20 64 -2 34 24 C 6 54 8 96 38 126 C 60 148 85 168 100 180 L 100 48 Z"
            fill="url(#heartPinkGrad)"
            stroke="url(#goldEdgeGrad)"
            strokeWidth="1.6"
            className="transition-opacity duration-300"
          />
        </g>

        {/* RIGHT HALF OF HEART LOCK */}
        <g>
          <path
            ref={rightHalfRef}
            d="M 100 48 C 106 20 136 -2 166 24 C 194 54 192 96 162 126 C 140 148 115 168 100 180 L 100 48 Z"
            fill="url(#heartPinkGrad)"
            stroke="url(#goldEdgeGrad)"
            strokeWidth="1.6"
            className="transition-opacity duration-300"
          />
        </g>

        {/* INNER LIGHT OVERLAY (When intact) */}
        {unlockStage < 3 && (
          <path
            d="M 100 48 C 94 20 64 -2 34 24 C 6 54 8 96 38 126 C 60 148 85 168 100 180 C 115 168 140 148 162 126 C 192 96 194 54 166 24 C 136 -2 106 20 100 48 Z"
            fill="url(#innerGlow)"
            pointerEvents="none"
          />
        )}

        {/* VERTICAL CENTER SEAM LIGHT (Appears in step 7 before opening) */}
        <line
          ref={seamLightRef}
          x1="100"
          y1="48"
          x2="100"
          y2="180"
          stroke="#FFF7F0"
          strokeWidth="1.5"
          className="opacity-0"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #F5C84B)"
        />

        {/* TINY GOLD KEYHOLE EMBOSS IN CENTER (Subtle lock indicator before unlock) */}
        {unlockStage < 2 && (
          <g className="opacity-70 transition-opacity duration-300">
            <circle
              cx="100"
              cy="98"
              r="4.5"
              fill="#080D25"
              stroke="#F5C84B"
              strokeWidth="1.2"
            />
            <polygon
              points="97.5,100 102.5,100 101.5,110 98.5,110"
              fill="#080D25"
              stroke="#F5C84B"
              strokeWidth="1.2"
            />
          </g>
        )}
      </svg>

      {/* Outward Burst Particles (Emerge in step 10 & 11) */}
      <div
        ref={particlesRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 18 }).map((_, i) => {
          const isGold = i % 2 === 0;
          const isHeart = i % 4 === 0;
          return (
            <span
              key={i}
              className={cn(
                "absolute opacity-0 transition-transform",
                isHeart
                  ? "text-[#F05AA6] text-[10px]"
                  : isGold
                  ? "w-1.5 h-1.5 rounded-full bg-[#F5C84B] shadow-[0_0_6px_#F5C84B]"
                  : "w-1 h-1 rounded-full bg-[#FFF7F0] shadow-[0_0_4px_#FFF7F0]"
              )}
            >
              {isHeart ? "♥" : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};
