import React, { useState } from "react";
import type { HeartPhotoItem } from "../../data/photoHeartData";
import { cn } from "../../utils/cn";

export interface PhotoHeartItemProps {
  item: HeartPhotoItem;
  className?: string;
  isFormed?: boolean;
}

/**
 * Individual circular glowing photograph for the Big Photo Heart.
 * Styled with a thin gold/pink rim, subtle volumetric pink aura,
 * and calibrated objectPosition to ensure Dharshini's face is clearly framed.
 */
export const PhotoHeartItem: React.FC<PhotoHeartItemProps> = ({
  item,
  className,
  isFormed = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(item.src);

  const handleError = () => {
    if (imgSrc !== item.fallbackSrc) {
      setImgSrc(item.fallbackSrc);
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-full p-[2px] sm:p-[2.5px] transition-all duration-700 select-none",
        "bg-gradient-to-tr from-[#F05AA6]/70 via-[#F5C84B]/80 to-[#F05AA6]/90",
        "shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_18px_rgba(240,90,166,0.35)]",
        "hover:shadow-[0_0_30px_rgba(245,200,75,0.6),0_0_40px_rgba(240,90,166,0.5)] hover:scale-110 hover:z-30",
        className
      )}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Outer subtle pink aura behind the photo */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-radial from-[#F05AA6]/30 via-[#F5C84B]/15 to-transparent filter blur-md pointer-events-none transition-opacity duration-1000",
          isFormed ? "opacity-90" : "opacity-40"
        )}
      />

      {/* Circular Photo Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0D1330]">
        <img
          src={imgSrc}
          alt={item.alt}
          onError={handleError}
          loading="lazy"
          className="w-full h-full object-cover brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105"
          style={{
            objectPosition: item.objectPosition,
          }}
        />

        {/* Soft edge vignette to integrate with midnight navy space */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#F5C84B]/30 pointer-events-none" />
      </div>
    </div>
  );
};
