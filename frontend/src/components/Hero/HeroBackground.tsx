import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { heroData } from "../../data/heroData";

export const HeroBackground: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string>(heroData.heroPhoto);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Gentle continuous breathing scale (1.00 -> 1.02 over 18s)
  useEffect(() => {
    if (!imageWrapperRef.current || prefersReducedMotion) return;

    const tween = gsap.to(imageWrapperRef.current, {
      scale: 1.02,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [prefersReducedMotion]);

  // Subtle mouse parallax (desktop only, max ±6px x, ±4px y)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!imageWrapperRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(imageWrapperRef.current, {
        x: xPercent * 6,
        y: yPercent * 4,
        duration: 1.4,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReducedMotion]);

  const handleImageError = () => {
    if (photoSrc !== heroData.fallbackPhoto) {
      setPhotoSrc(heroData.fallbackPhoto);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10"
      aria-hidden="true"
    >
      {/* Full-Screen Edge-to-Edge Picture with Right-side Alignment for Dharshini */}
      <div
        ref={imageWrapperRef}
        className="w-full h-full will-change-transform scale-[1.01]"
      >
        <img
          src={photoSrc}
          alt={heroData.photoAlt}
          onError={handleImageError}
          className="w-full h-full object-cover object-[72%_center] sm:object-[78%_center] transition-opacity duration-1000 brightness-[0.92]"
        />
      </div>

      {/* 1. Left Vignette Gradient: gives pristine readability to text on the left while keeping Dharshini open */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#080D25]/90 via-[#080D25]/45 to-transparent"
        aria-hidden="true"
      />

      {/* 2. Primary Subtle Top/Bottom Ambient Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#080D25]/30 via-transparent to-[#080D25]/90"
        aria-hidden="true"
      />

      {/* 3. Subtle Warm Aura Highlight centered around Dharshini's portrait on the right */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(245,200,75,0.08)_0%,rgba(240,90,166,0.06)_40%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. Bottom Deep Navy Fade to smoothly transition to next sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#080D25] via-[#080D25]/90 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};
