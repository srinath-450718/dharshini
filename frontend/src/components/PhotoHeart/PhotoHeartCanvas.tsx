import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { photoHeartList, photoHeartCopy } from "../../data/photoHeartData";
import { PhotoHeartItem } from "./PhotoHeartItem";
import { FinalBirthdayNote } from "./FinalBirthdayNote";
import { Heart } from "../Heart";
import { Star } from "../Star";
import { cn } from "../../utils/cn";

export interface PhotoHeartCanvasProps {
  className?: string;
}

export const PhotoHeartCanvas: React.FC<PhotoHeartCanvasProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heartWrapperRef = useRef<HTMLDivElement | null>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isFormed, setIsFormed] = useState<boolean>(false);
  const [showNote, setShowNote] = useState<boolean>(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!containerRef.current || !heartWrapperRef.current) return;

    if (prefersReducedMotion) {
      // Reduced motion: skip scattered animation, display directly formed
      setIsFormed(true);
      setShowNote(true);
      return;
    }

    const ctx = gsap.context(() => {
      const validPhotoElements = photosRef.current.filter(Boolean) as HTMLDivElement[];

      // 1. Initial State: photos scattered gently around dark space
      validPhotoElements.forEach((el, idx) => {
        const item = photoHeartList[idx];
        if (!item) return;

        // Calculate scatter pixel offset based on item.scatterX / scatterY
        const scatterOffsetX = (item.scatterX - item.x) * 4;
        const scatterOffsetY = (item.scatterY - item.y) * 4;

        gsap.set(el, {
          x: scatterOffsetX,
          y: scatterOffsetY,
          rotation: item.scatterRotation,
          opacity: 0,
          scale: 0.85,
        });
      });

      // 2. Assembly Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setIsFormed(true);

          // Gentle pulse of the entire formed heart once
          gsap.to(heartWrapperRef.current, {
            scale: 1.03,
            duration: 0.8,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          });

          // Wait ~1 second before gracefully revealing the final message
          setTimeout(() => {
            setShowNote(true);
          }, 1000);
        },
      });

      // Subtle entrance fade for title and glowing outline
      tl.to(".photo-heart-ambient-outline", {
        opacity: 0.7,
        duration: 1.5,
        ease: "power1.inOut",
      });

      // Photos slowly appear in scattered state
      tl.to(
        validPhotoElements,
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "power1.out",
        },
        "-=1.0"
      );

      // Photos glide smoothly into their heart coordinates over 3.2 seconds
      validPhotoElements.forEach((el, idx) => {
        const item = photoHeartList[idx];
        if (!item) return;

        tl.to(
          el,
          {
            x: 0,
            y: 0,
            rotation: item.rotation,
            scale: item.scale,
            duration: 3.2,
            ease: "power3.inOut",
          },
          "assemble"
        );
      });

      // Continuous subtle independent floating micro-animation once formed
      validPhotoElements.forEach((el, idx) => {
        const driftDuration = 3 + (idx % 4) * 0.8;
        const driftY = (idx % 2 === 0 ? 3 : -3);

        gsap.to(el, {
          y: `+=${driftY}`,
          duration: driftDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 4.5 + idx * 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-24 pb-20 px-4 sm:px-6 bg-[#080D25] text-[#FFF7F0] overflow-hidden select-none",
        className
      )}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Soft volumetric pink/gold ambient cloud */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[700px] sm:h-[850px] rounded-full bg-radial from-[#F05AA6]/08 via-[#F5C84B]/04 to-transparent blur-3xl" />

        {/* Scattered tiny twinkling stars */}
        <span className="absolute top-[12%] left-[10%] text-[#F5C84B]/60 text-xs animate-pulse">✦</span>
        <span className="absolute top-[28%] right-[8%] text-[#FF75A0]/50 text-xs animate-pulse" style={{ animationDelay: "1.3s" }}>♥</span>
        <span className="absolute top-[60%] left-[6%] text-[#F5C84B]/50 text-xs animate-pulse" style={{ animationDelay: "0.8s" }}>✦</span>
        <span className="absolute top-[75%] right-[12%] text-[#FF75A0]/60 text-xs animate-pulse" style={{ animationDelay: "2.1s" }}>♥</span>
      </div>

      {/* =====================================================================
          TITLE: "A Heart Full of Memories" + Elegant SVG Heart Accent
         ===================================================================== */}
      <header className="relative z-10 text-center space-y-3 mb-10 sm:mb-14 max-w-xl">
        <div className="inline-flex items-center justify-center gap-2.5">
          <Star size="xs" color="gold" />
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#FCE4EC] to-[#F5C84B] tracking-wide font-normal drop-shadow-sm">
            {photoHeartCopy.title}
          </h1>
          <Heart size="sm" color="pink" filled className="animate-pulse" />
        </div>
        <p className="font-serif italic text-xs sm:text-sm text-[#AEB6CC] font-light">
          Every moment, kept in place.
        </p>
      </header>

      {/* =====================================================================
          THE BIG PHOTO HEART CONTAINER
          - Desktop: 60-70vw width, 55-70vh height
          - Mobile: 88-94vw width, 55-65vh height
          - Coordinates mathematically define a crisp heart silhouette:
            Two rounded lobes, top indentation, side curve, and bottom point!
         ===================================================================== */}
      <div
        ref={heartWrapperRef}
        className="relative w-[92vw] sm:w-[82vw] md:w-[70vw] max-w-[860px] aspect-[1/0.92] mx-auto flex items-center justify-center transition-all duration-700"
      >
        {/* Subtle Ambient SVG Heart Outline in Background */}
        <div className="photo-heart-ambient-outline absolute inset-4 pointer-events-none opacity-40 transition-opacity duration-1000 -z-10">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full filter blur-[1px]">
            <path
              d="M 50 26 C 40 10, 15 12, 14 36 C 13 54, 30 70, 50 88 C 70 70, 87 54, 86 36 C 85 12, 60 10, 50 26 Z"
              stroke="url(#heartOutlineGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="heartOutlineGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5C84B" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#F05AA6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F5C84B" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Soft Pink & Gold Atmospheric Core Glow behind the assembled photos */}
        <div
          className={cn(
            "absolute w-[75%] h-[75%] rounded-full bg-[radial-gradient(circle,rgba(240,90,166,0.18)_0%,rgba(245,200,75,0.1)_45%,transparent_75%)] pointer-events-none filter blur-2xl transition-opacity duration-1000",
            isFormed ? "opacity-100" : "opacity-30"
          )}
        />

        {/* ===================================================================
            17 INDIVIDUAL PHOTOS FORMING THE HEART SILHOUETTE
           =================================================================== */}
        {photoHeartList.map((item, index) => {
          // Responsive photo size: ~105-135px on desktop, ~52-72px on mobile
          return (
            <div
              key={item.id}
              ref={(el) => {
                photosRef.current[index] = el;
              }}
              className="absolute will-change-transform z-20"
              style={{
                left: `calc(50% + ${item.x * 0.9}%)`,
                top: `calc(50% + ${item.y * 0.88}%)`,
                transform: "translate(-50%, -50%)",
                width: "clamp(54px, 12vw, 130px)",
                height: "clamp(54px, 12vw, 130px)",
              }}
            >
              <PhotoHeartItem item={item} isFormed={isFormed} />
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          FINAL SINCERE MESSAGE & CARD (Appears beneath the heart)
          The Heart stays permanently in view as the visual centerpiece!
         ===================================================================== */}
      {showNote && <FinalBirthdayNote />}
    </div>
  );
};
