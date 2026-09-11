import React, { useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";
import { Image as ImageIcon } from "lucide-react";

export interface CharacterPhotoProps {
  src: string;
  alt: string;
  objectPosition?: string;
  isAvoider?: boolean;
  aspectRatio?: "3/4" | "4/5";
  className?: string;
}

export const CharacterPhoto: React.FC<CharacterPhotoProps> = ({
  src,
  alt,
  objectPosition = "center 20%",
  isAvoider = false,
  aspectRatio = "4/5",
  className,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scene 05: Professional Avoider desktop cursor evasion (max 10px)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAvoider || prefersReducedMotion || !photoContainerRef.current) return;

    const rect = photoContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Shift up to 10px away in the opposite direction
    const shiftX = -Math.sign(deltaX) * Math.min(10, Math.abs(deltaX) * 0.08);
    const shiftY = -Math.sign(deltaY) * Math.min(10, Math.abs(deltaY) * 0.08);

    gsap.to(photoContainerRef.current, {
      x: shiftX,
      y: shiftY,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!isAvoider || prefersReducedMotion || !photoContainerRef.current) return;
    gsap.to(photoContainerRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMobileTap = () => {
    if (!isAvoider || prefersReducedMotion || !photoContainerRef.current) return;
    // Playful gentle wiggle on tap for mobile
    gsap.fromTo(
      photoContainerRef.current,
      { x: -8 },
      {
        x: 8,
        duration: 0.07,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(photoContainerRef.current, { x: 0, duration: 0.15 });
        },
      }
    );
  };

  return (
    <div
      ref={photoContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileTap}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-[#0D1330] border border-white/10 shadow-2xl shadow-black/60 transition-all duration-700 hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] select-none",
        aspectRatio === "3/4" ? "aspect-[3/4]" : "aspect-[4/5]",
        isAvoider && "cursor-pointer",
        className
      )}
    >
      {/* Subtle Frame Glow on hover */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_30px_rgba(232,138,170,0.14)] z-20" />

      {/* Cinematic dark gradient vignette overlay (top and bottom) for natural text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D25]/80 via-transparent to-[#080D25]/25 pointer-events-none z-10" />

      {/* Subtle local film grain texture inside photo frame */}
      <div
        className="absolute inset-0 pointer-events-none z-15 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Avoider Era playful badge */}
      {isAvoider && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#080D25]/90 border border-[#F05AA6]/40 text-[10px] font-mono tracking-widest text-[#F05AA6] backdrop-blur-md opacity-85 group-hover:opacity-100 transition-opacity shadow-lg shadow-black/40">
          STILL UNDEFEATED
        </div>
      )}

      {/* Tasteful Dark Navy Placeholder if photo is missing or errors */}
      {hasError || !src ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#0D1330] text-[#AEB6CC]/50 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#AEB6CC]/40">
            <ImageIcon size={26} />
          </div>
          <div className="space-y-1.5">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#FFF7F0]/70 font-semibold">
              PHOTO SPACE
            </p>
            <p className="text-[11px] text-[#AEB6CC]/40 font-sans tracking-wide">
              Drop photo in public/photos/
            </p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ objectPosition }}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};
