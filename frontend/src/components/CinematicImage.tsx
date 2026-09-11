import React, { useState } from "react";
import { cn } from "../utils/cn";

export interface CinematicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  overlayGradient?: "dark" | "pinkGlow" | "goldGlow" | "none";
  aspectRatio?: "auto" | "portrait" | "landscape" | "square" | "banner";
  className?: string;
  containerClassName?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt,
  overlayGradient = "dark",
  aspectRatio = "auto",
  className,
  containerClassName,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const ratioClasses = {
    auto: "",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
    banner: "aspect-[21/9]",
  }[aspectRatio];

  const overlayClasses = {
    none: "",
    dark: "bg-gradient-to-t from-[#080D25] via-[#080D25]/40 to-transparent",
    pinkGlow:
      "bg-gradient-to-t from-[#080D25] via-[#F05AA6]/10 to-transparent",
    goldGlow:
      "bg-gradient-to-t from-[#080D25] via-[#F5C84B]/10 to-transparent",
  }[overlayGradient];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#0D1330] border border-white/10",
        ratioClasses,
        containerClassName
      )}
    >
      {/* Skeleton / Placeholder state */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#121838] animate-pulse" />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          className
        )}
        {...props}
      />

      {/* Cinematic overlay */}
      {overlayGradient !== "none" && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            overlayClasses
          )}
        />
      )}
    </div>
  );
};
