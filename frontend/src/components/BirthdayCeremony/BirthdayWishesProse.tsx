import React from "react";
import { birthdayWishData } from "../../data/birthdayWishData";
import { cn } from "../../utils/cn";

export interface BirthdayWishesProseProps {
  className?: string;
}

export const BirthdayWishesProse: React.FC<BirthdayWishesProseProps> = ({
  className,
}) => {
  const d = birthdayWishData.wishProse;

  return (
    <div
      className={cn(
        "w-full max-w-[850px] mx-auto text-center space-y-20 select-none py-14 px-4 sm:px-6",
        className
      )}
    >
      {/* 1. Primary Wish Lead */}
      <div className="space-y-6">
        <h3 className="font-serif text-[clamp(1.8rem,4vw,3.6rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#E88AAA] font-normal leading-[1.25] tracking-tight drop-shadow-[0_4px_30px_rgba(245,200,75,0.3)]">
          &ldquo;{d.lead}&rdquo;
        </h3>
      </div>

      {/* 2. Sincere Thoughtful Points */}
      <div className="space-y-6 max-w-xl mx-auto">
        {d.points.map((point, idx) => {
          const isCarePoint = idx === d.points.length - 1;
          return (
            <p
              key={idx}
              className={cn(
                "leading-relaxed transition-colors",
                isCarePoint
                  ? "font-serif text-[clamp(1.2rem,2.2vw,1.8rem)] text-[#FFF7F0] font-normal pt-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
                  : "font-sans text-[clamp(1rem,1.5vw,1.3rem)] text-[#AEB6CC] font-light"
              )}
            >
              {point}
            </p>
          );
        })}
      </div>

      {/* 3. Small Pause & Personal Closing Note */}
      <div className="pt-8 space-y-4 max-w-lg mx-auto">
        <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F5C84B] font-bold block drop-shadow-[0_0_10px_rgba(245,200,75,0.4)]">
          {d.closingCallout}
        </span>
        <p className="font-serif italic text-[clamp(1.1rem,1.8vw,1.5rem)] text-[#FFF7F0]/90 leading-relaxed">
          {d.closingHope}
        </p>
        <p className="font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#FFF7F0] font-normal leading-snug drop-shadow-[0_2px_18px_rgba(245,200,75,0.3)]">
          &ldquo;{d.closingDeserve}&rdquo;
        </p>
      </div>
    </div>
  );
};
