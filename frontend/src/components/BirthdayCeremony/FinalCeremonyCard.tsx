import React, { useState } from "react";
import { birthdayWishData } from "../../data/birthdayWishData";
import { TinyHeartMotif } from "../LoveGlimpse/TinyHeartMotif";
import { cn } from "../../utils/cn";

export interface FinalCeremonyCardProps {
  className?: string;
}

export const FinalCeremonyCard: React.FC<FinalCeremonyCardProps> = ({
  className,
}) => {
  const d = birthdayWishData.finalCard;
  const [photoSrc, setPhotoSrc] = useState(d.photo.src);

  return (
    <div
      className={cn(
        "relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-[#F5C84B]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-8 sm:p-12 text-center select-none",
        className
      )}
    >
      {/* 1. Subtle Background Portrait with Deep Midnight Navy Overlays */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={photoSrc}
          alt={d.photo.alt}
          onError={() => setPhotoSrc(d.photo.fallbackSrc)}
          style={{ objectPosition: d.photo.objectPosition }}
          className="w-full h-full object-cover opacity-25 scale-105 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D25] via-[#0D1330]/90 to-[#080D25]/95" />
      </div>

      {/* 2. Content */}
      <div className="relative z-10 space-y-8">
        {/* Eyebrow */}
        <div className="space-y-1">
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F5C84B] font-semibold drop-shadow-[0_0_12px_rgba(245,200,75,0.5)]">
            {d.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FFF7F0] pt-1">
            {d.headline}
          </h2>
          <h1 className="font-serif text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal tracking-tight drop-shadow-[0_4px_30px_rgba(245,200,75,0.4)]">
            {d.name}
          </h1>
        </div>

        {/* Wishes */}
        <div className="pt-4 space-y-3 max-w-md mx-auto">
          {d.wishes.map((line, idx) => (
            <p
              key={idx}
              className={cn(
                "leading-relaxed",
                idx === 0
                  ? "font-serif italic text-lg sm:text-xl text-[#F5C84B] pb-1 drop-shadow-[0_0_8px_rgba(245,200,75,0.3)]"
                  : "font-sans text-base sm:text-lg text-[#FFF7F0]/95 font-light"
              )}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Single Tiny Glowing Heart Accent */}
        <div className="pt-4 flex items-center justify-center">
          <TinyHeartMotif />
        </div>
      </div>
    </div>
  );
};
