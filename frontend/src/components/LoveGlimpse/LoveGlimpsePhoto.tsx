import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface LoveGlimpsePhotoProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  imageRef?: React.RefObject<HTMLImageElement | null>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const LoveGlimpsePhoto: React.FC<LoveGlimpsePhotoProps> = ({
  src,
  fallbackSrc,
  alt,
  objectPosition = "center 20%",
  className,
  imageRef,
  containerRef,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-md sm:max-w-lg aspect-[3/4] sm:aspect-[4/5] mx-auto rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 select-none",
        className
      )}
    >
      {/* Base Photograph */}
      <img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        style={{ objectPosition }}
        className={cn(
          "w-full h-full object-cover will-change-transform transition-all duration-1000",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
      />

      {/* Subtle Gentle Bottom Vignette (Leaves her face and saree bright and clear) */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#080D25]/90 via-[#080D25]/30 to-transparent pointer-events-none" />

      {/* Radiant Warm Gold & Rose Glowing Rim Light Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-[#F5C84B]/45 shadow-[inset_0_0_25px_rgba(245,200,75,0.2),0_0_35px_rgba(240,90,166,0.25)] pointer-events-none" />
    </div>
  );
};

