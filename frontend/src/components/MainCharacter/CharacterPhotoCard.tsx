import React, { useState, useRef } from "react";
import gsap from "gsap";
import type { MainCharacterPhotoItem } from "../../data/mainCharacterPhotos";
import { BunnyIcon, CharmIcon, TinyGlowingHeart } from "../Timeline/TimelineIcons";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "../../utils/cn";

export interface CharacterPhotoCardProps {
  photo: MainCharacterPhotoItem;
  onSelect: (photo: MainCharacterPhotoItem) => void;
  isDimmed?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export const CharacterPhotoCard: React.FC<CharacterPhotoCardProps> = ({
  photo,
  onSelect,
  isDimmed = false,
  onHoverChange,
  className,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Photo 07 (Professional Avoider) cursor evasion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photo.isAvoider || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const shiftX = -Math.sign(deltaX) * Math.min(10, Math.abs(deltaX) * 0.08);
    const shiftY = -Math.sign(deltaY) * Math.min(10, Math.abs(deltaY) * 0.08);

    gsap.to(cardRef.current, {
      x: shiftX,
      y: shiftY,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    onHoverChange?.(false);
    if (!photo.isAvoider || prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    onHoverChange?.(true);
  };

  // Dimension classes based on size
  const sizeClasses = {
    large: "w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] aspect-[4/5]",
    medium: "w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] aspect-[4/5]",
    small: "w-full max-w-[240px] sm:max-w-[270px] md:max-w-[300px] aspect-[4/5]",
  }[photo.size];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(photo)}
      style={{
        transform: `rotate(${photo.rotation ?? 0}deg)`,
        zIndex: photo.zIndex ?? 1,
      }}
      className={cn(
        "group relative cursor-pointer select-none transition-all duration-500 will-change-transform",
        isDimmed && "opacity-45 filter grayscale-[30%] scale-[0.98]",
        className
      )}
    >
      {/* Editorial Outer Frame */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0D1330] border border-white/15 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-[#F5C84B]/40 group-hover:scale-[1.03] group-hover:shadow-[0_25px_65px_rgba(240,90,166,0.25)] group-hover:z-40",
          sizeClasses
        )}
      >
        {/* Inner Photo Container */}
        <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl bg-[#080D25]">
          {/* Subtle Frame Glow on hover */}
          <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(245,200,75,0.18)] z-20" />

          {/* Vignette Gradient for natural photo contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D25]/85 via-transparent to-[#080D25]/20 pointer-events-none z-10" />

          {/* Fallback Dark Navy Placeholder */}
          {hasError || !photo.src ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0D1330] text-[#AEB6CC]/50 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#AEB6CC]/40">
                <ImageIcon size={22} />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#FFF7F0]/70 font-semibold">
                  PHOTO SPACE
                </p>
                <p className="text-[10px] text-[#AEB6CC]/40 font-sans tracking-wide">
                  {photo.caption}
                </p>
              </div>
            </div>
          ) : (
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              style={{ objectPosition: photo.objectPosition }}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {/* Nickname Floating Badge (Natural Discovery across photos) */}
          <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080D25]/90 border border-[#F5C84B]/45 backdrop-blur-md shadow-[0_0_12px_rgba(245,200,75,0.25)] transition-transform duration-300 group-hover:scale-105">
            {photo.nickname === "Bunny" || photo.nickname === "Little Bunny" ? (
              <BunnyIcon size={14} />
            ) : photo.nickname === "Lucky Charm" ? (
              <CharmIcon size={14} />
            ) : photo.isEmotionalFocus ? (
              <TinyGlowingHeart size={14} pulse={true} />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C84B] shadow-[0_0_6px_rgba(245,200,75,0.8)]" />
            )}
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.24em] text-[#F5C84B] uppercase font-bold">
              {photo.nickname}
            </span>
          </div>

          {/* Bottom Caption & Note Peek */}
          <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-20 flex flex-col justify-end text-left space-y-1 bg-gradient-to-t from-[#080D25]/95 via-[#080D25]/70 to-transparent">
            <h4 className="font-serif text-base sm:text-lg text-[#FFF7F0] font-normal tracking-tight line-clamp-1 group-hover:text-[#F5C84B] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {photo.caption}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#E2D9D2] line-clamp-1 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {photo.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

