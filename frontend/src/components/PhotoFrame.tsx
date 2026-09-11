import React, { useState } from "react";
import { cn } from "../utils/cn";
import { Sparkles } from "lucide-react";

export interface PhotoFrameProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  tag?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  className?: string;
  accent?: "pink" | "gold";
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  title,
  caption,
  tag,
  aspectRatio = "portrait",
  className,
  accent = "pink",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const ratioClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  }[aspectRatio];

  const accentTagClasses = {
    pink: "bg-[#F05AA6]/15 text-[#F05AA6] border-[#F05AA6]/30",
    gold: "bg-[#F5C84B]/15 text-[#F5C84B] border-[#F5C84B]/30",
  }[accent];

  return (
    <figure
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-[#0D1330] border border-white/10 shadow-2xl shadow-black/50 transition-all duration-500 hover:border-white/25",
        className
      )}
    >
      <div className={cn("relative w-full overflow-hidden", ratioClasses)}>
        {/* Skeleton placeholder before load */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#151A3A] animate-pulse flex items-center justify-center text-[#AEB6CC]/30">
            <Sparkles size={24} />
          </div>
        )}

        {/* The photo */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Cinematic dark gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D25] via-[#080D25]/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

        {/* Tag badge in top right */}
        {tag && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border backdrop-blur-md",
                accentTagClasses
              )}
            >
              {tag}
            </span>
          </div>
        )}

        {/* Title and caption at bottom */}
        {(title || caption) && (
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-1">
            {title && (
              <h4 className="font-serif text-lg sm:text-xl text-[#FFF7F0] font-medium leading-snug">
                {title}
              </h4>
            )}
            {caption && (
              <p className="text-xs text-[#AEB6CC] font-sans font-light leading-relaxed">
                {caption}
              </p>
            )}
          </div>
        )}
      </div>
    </figure>
  );
};
