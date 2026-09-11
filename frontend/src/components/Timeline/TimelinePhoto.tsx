import React, { useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";
import { Image as ImageIcon } from "lucide-react";

export interface TimelinePhotoProps {
  src: string;
  alt: string;
  objectPosition?: string;
  isAvoiderEvent?: boolean;
  className?: string;
}

export const TimelinePhoto: React.FC<TimelinePhotoProps> = ({
  src,
  alt,
  objectPosition = "center 25%",
  isAvoiderEvent = false,
  className,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Event 05: Professional Avoider playful shift
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAvoiderEvent || prefersReducedMotion || !photoContainerRef.current) return;

    const rect = photoContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Shift in opposite direction away from cursor (max 14px)
    const shiftX = -Math.sign(deltaX) * Math.min(14, Math.abs(deltaX) * 0.1);
    const shiftY = -Math.sign(deltaY) * Math.min(12, Math.abs(deltaY) * 0.1);

    gsap.to(photoContainerRef.current, {
      x: shiftX,
      y: shiftY,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!isAvoiderEvent || prefersReducedMotion || !photoContainerRef.current) return;
    gsap.to(photoContainerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMobileTap = () => {
    if (!isAvoiderEvent || prefersReducedMotion || !photoContainerRef.current) return;
    // Playful wiggle on tap for mobile
    gsap.fromTo(
      photoContainerRef.current,
      { x: -10 },
      {
        x: 10,
        duration: 0.08,
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
        "group relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[500px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#0D1330] border border-white/10 shadow-2xl shadow-black/50 transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] select-none",
        isAvoiderEvent && "cursor-pointer",
        className
      )}
    >
      {/* Subtle Frame Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_25px_rgba(240,90,166,0.15)] z-20" />

      {/* Cinematic dark gradient vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D25]/75 via-transparent to-[#080D25]/20 pointer-events-none z-10" />

      {/* Avoider Era playful tooltip badge */}
      {isAvoiderEvent && (
        <div className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-full bg-[#0D1330]/85 border border-[#F05AA6]/30 text-[10px] font-mono tracking-wider text-[#F05AA6] backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
          AVOIDING IN PROGRESS
        </div>
      )}

      {/* If photo is not yet available, show elegant dark navy placeholder */}
      {hasError || !src ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0D1330] text-[#AEB6CC]/50 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#AEB6CC]/40">
            <ImageIcon size={22} />
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#FFF7F0]/60">
              PHOTO SPACE
            </p>
            <p className="text-[10px] text-[#AEB6CC]/40 font-sans">
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
