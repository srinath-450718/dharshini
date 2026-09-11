import React from "react";
import { cn } from "../../utils/cn";

export interface BubuDuduCakeCompanionProps {
  className?: string;
}

export const BubuDuduCakeCompanion: React.FC<BubuDuduCakeCompanionProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative select-none transition-all duration-300",
        "w-24 sm:w-32 md:w-36",
        className
      )}
    >
      {/* Soft Ambient Gold Backglow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#F5C84B]/20 via-[#F05AA6]/15 to-transparent blur-md opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />

      {/* Small Photo Card Frame */}
      <div className="relative rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-[#0D1330]/95 backdrop-blur-md border border-[#F5C84B]/30 group-hover:border-[#F5C84B]/60 shadow-[0_8px_25px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:scale-105">
        {/* Cute Micro Header */}
        <div className="flex items-center justify-center gap-1 pb-1">
          <span className="text-[10px]">🎂</span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-[#F5C84B] font-medium truncate">
            Bubu &amp; Dudu
          </span>
        </div>

        {/* Small Image */}
        <div className="relative rounded-lg sm:rounded-xl overflow-hidden aspect-[2/3] bg-[#080D25]">
          <img
            src="/assets/bubu-dudu-cake.jpg"
            alt="Bubu and Dudu standing behind a birthday cake with strawberries and candle"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D25]/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
