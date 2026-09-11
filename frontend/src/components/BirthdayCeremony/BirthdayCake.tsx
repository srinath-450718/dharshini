import React from "react";
import { Candle } from "./Candle";
import { cn } from "../../utils/cn";

export interface BirthdayCakeProps {
  candleStates: boolean[]; // 7 booleans: true if extinguished
  onExtinguishCandle: (index: number) => void;
  isCut?: boolean;
  className?: string;
  cakeRef?: React.RefObject<HTMLDivElement | null>;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  candleStates,
  onExtinguishCandle,
  isCut = false,
  className,
  cakeRef,
}) => {
  return (
    <div
      ref={cakeRef}
      className={cn(
        "relative w-full max-w-[340px] sm:max-w-[420px] mx-auto flex flex-col items-center select-none pt-4 transition-transform duration-700",
        className
      )}
    >
      {/* 1. Seven Candles Row positioned across the top */}
      <div className="relative z-20 flex items-end justify-center gap-1 sm:gap-2 px-4 -mb-1 w-full max-w-[320px] sm:max-w-[380px]">
        {candleStates.map((isExtinguished, idx) => (
          <Candle
            key={idx}
            index={idx}
            isExtinguished={isExtinguished}
            onExtinguish={onExtinguishCandle}
          />
        ))}
      </div>

      {/* 2. The Cake Body with Left & Right Cut Physics */}
      <div className="relative flex items-center justify-center w-full">
        {/* LEFT HALF */}
        <div
          className={cn(
            "flex flex-col items-end overflow-hidden transition-transform duration-1000 ease-out will-change-transform",
            isCut ? "-translate-x-1 sm:-translate-x-1.5" : "translate-x-0"
          )}
        >
          {/* Top Tier Left */}
          <div className="w-[120px] sm:w-[145px] h-[55px] sm:h-[65px] rounded-tl-2xl bg-gradient-to-b from-[#151A3A] to-[#0D1330] border-t border-l border-[#F5C84B]/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
            {/* Scalloped Frosting Drips */}
            <div className="w-full flex items-start justify-end gap-1 px-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 sm:w-6 h-3 sm:h-3.5 rounded-b-full bg-gradient-to-b from-[#FFF7F0] to-[#F5C84B]/80 shadow-[0_2px_6px_rgba(245,200,75,0.3)]"
                />
              ))}
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent to-[#F5C84B]/50 my-auto" />
            <div className="w-full h-2 bg-[#080D25]/80 border-t border-white/10" />
          </div>

          {/* Bottom Tier Left */}
          <div className="w-[150px] sm:w-[185px] h-[75px] sm:h-[90px] rounded-tl-xl bg-gradient-to-b from-[#111634] to-[#080D25] border-t border-l border-[#F5C84B]/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden">
            <div className="w-full flex items-start justify-end gap-1 px-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 sm:w-6 h-3.5 sm:h-4 rounded-b-full bg-gradient-to-b from-[#FFF7F0] to-[#F05AA6]/60 shadow-[0_2px_6px_rgba(240,90,166,0.3)]"
                />
              ))}
            </div>
            {/* Clean Gold Filigree Center Stripe */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent to-[#F5C84B]/40 my-auto" />
            <div className="w-full h-3 bg-[#080D25] border-t border-white/15" />
          </div>
        </div>

        {/* Subtle Cut Seam Light when cut */}
        {isCut && (
          <div className="w-0.5 h-[130px] sm:h-[155px] bg-gradient-to-b from-[#FFF7F0] via-[#F5C84B] to-transparent opacity-75 shadow-[0_0_8px_#F5C84B] z-10 animate-pulse pointer-events-none" />
        )}

        {/* RIGHT HALF */}
        <div
          className={cn(
            "flex flex-col items-start overflow-hidden transition-transform duration-1000 ease-out will-change-transform",
            isCut ? "translate-x-1 sm:translate-x-1.5" : "translate-x-0"
          )}
        >
          {/* Top Tier Right */}
          <div className="w-[120px] sm:w-[145px] h-[55px] sm:h-[65px] rounded-tr-2xl bg-gradient-to-b from-[#151A3A] to-[#0D1330] border-t border-r border-[#F5C84B]/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
            {/* Scalloped Frosting Drips */}
            <div className="w-full flex items-start justify-start gap-1 px-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 sm:w-6 h-3 sm:h-3.5 rounded-b-full bg-gradient-to-b from-[#FFF7F0] to-[#F5C84B]/80 shadow-[0_2px_6px_rgba(245,200,75,0.3)]"
                />
              ))}
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-[#F5C84B]/50 to-transparent my-auto" />
            <div className="w-full h-2 bg-[#080D25]/80 border-t border-white/10" />
          </div>

          {/* Bottom Tier Right */}
          <div className="w-[150px] sm:w-[185px] h-[75px] sm:h-[90px] rounded-tr-xl bg-gradient-to-b from-[#111634] to-[#080D25] border-t border-r border-[#F5C84B]/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden">
            <div className="w-full flex items-start justify-start gap-1 px-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 sm:w-6 h-3.5 sm:h-4 rounded-b-full bg-gradient-to-b from-[#FFF7F0] to-[#F05AA6]/60 shadow-[0_2px_6px_rgba(240,90,166,0.3)]"
                />
              ))}
            </div>
            {/* Clean Gold Filigree Center Stripe */}
            <div className="w-full h-1 bg-gradient-to-r from-[#F5C84B]/40 to-transparent my-auto" />
            <div className="w-full h-3 bg-[#080D25] border-t border-white/15" />
          </div>
        </div>
      </div>

      {/* 3. Elegant Cake Stand / Plate */}
      <div className="relative w-[340px] sm:w-[420px] h-4 rounded-full bg-gradient-to-r from-transparent via-[#F5C84B]/40 to-transparent shadow-[0_0_30px_rgba(245,200,75,0.2)] flex items-center justify-center">
        <div className="w-[320px] sm:w-[390px] h-2 rounded-full bg-[#FFF7F0]/30 border-b border-[#F5C84B]/40" />
      </div>

      {/* 4. Ambient Golden Pedestal Glow */}
      <div className="w-48 sm:w-64 h-8 rounded-full bg-[#F5C84B]/15 blur-xl pointer-events-none -mt-3" />
    </div>
  );
};
