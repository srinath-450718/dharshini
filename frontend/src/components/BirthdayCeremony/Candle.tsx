import React from "react";
import { cn } from "../../utils/cn";

export interface CandleProps {
  index: number;
  isExtinguished: boolean;
  onExtinguish: (index: number) => void;
  disabled?: boolean;
}

export const Candle: React.FC<CandleProps> = ({
  index,
  isExtinguished,
  onExtinguish,
  disabled = false,
}) => {
  // Staggered flame flicker delays (0.2s - 1.4s) so flames flicker naturally
  const flickerDelays = ["0.1s", "0.4s", "0.25s", "0.6s", "0.35s", "0.55s", "0.2s"];
  const delay = flickerDelays[index % flickerDelays.length];

  const handleClick = () => {
    if (!isExtinguished && !disabled) {
      onExtinguish(index);
    }
  };

  return (
    <button
      type="button"
      id={`candle-${index + 1}`}
      onClick={handleClick}
      disabled={isExtinguished || disabled}
      aria-label={
        isExtinguished
          ? `Candle ${index + 1} extinguished`
          : `Blow out candle ${index + 1}`
      }
      className={cn(
        "group relative flex flex-col items-center justify-end focus:outline-none cursor-pointer select-none",
        "min-w-[44px] min-h-[72px] px-1 py-1 rounded-xl transition-transform duration-300",
        !isExtinguished && "hover:-translate-y-1 focus:ring-2 focus:ring-[#F5C84B]/40",
        isExtinguished && "cursor-default opacity-85"
      )}
    >
      {/* 1. Flame & Smoke Area */}
      <div className="relative w-6 h-9 flex items-center justify-center pointer-events-none">
        {/* Active Golden Glowing Flame */}
        <div
          style={{ animationDelay: delay }}
          className={cn(
            "relative w-3.5 h-6 rounded-[50%_50%_20%_20%] bg-gradient-to-t from-[#F05AA6] via-[#F5C84B] to-[#FFF7F0] shadow-[0_0_15px_rgba(245,200,75,0.8),0_0_30px_rgba(240,90,166,0.5)] transition-all duration-700 ease-out origin-bottom",
            !isExtinguished
              ? "opacity-100 scale-100 animate-candleFlicker"
              : "opacity-0 scale-50 -translate-y-2 pointer-events-none"
          )}
        >
          {/* Inner hot white core */}
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-white opacity-85" />
        </div>

        {/* Subtle Smoke Wisps when Extinguished */}
        {isExtinguished && (
          <div className="absolute -top-3 w-4 h-7 pointer-events-none flex flex-col items-center animate-smokeDrift">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 blur-[0.5px]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 blur-[1px] -mt-1" />
          </div>
        )}
      </div>

      {/* 2. Wick */}
      <div className="w-0.5 h-2 bg-[#1A1A1A] rounded-t-sm -mb-0.5 z-10" />

      {/* 3. Candle Body (Elegant Cream & Gold Rim) */}
      <div className="relative w-3 sm:w-3.5 h-12 sm:h-14 rounded-t-sm rounded-b-sm bg-gradient-to-b from-[#FFF7F0] via-[#FFF0E0] to-[#F5C84B]/80 shadow-[0_2px_8px_rgba(0,0,0,0.4)] border-x border-white/20 overflow-hidden">
        {/* Subtle spiral decorative bands */}
        <div className="absolute top-2 left-0 right-0 h-0.5 bg-[#F05AA6]/30 -rotate-12" />
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#F5C84B]/40 -rotate-12" />
        <div className="absolute top-10 left-0 right-0 h-0.5 bg-[#F05AA6]/30 -rotate-12" />
      </div>

      {/* 4. Tiny Number Badge below candle */}
      <span className="mt-1 font-mono text-[9px] text-[#AEB6CC]/70 tracking-widest block">
        0{index + 1}
      </span>
    </button>
  );
};
