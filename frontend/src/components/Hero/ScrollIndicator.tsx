import React from "react";
import { cn } from "../../utils/cn";

export interface ScrollIndicatorProps {
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3.5 select-none pointer-events-none",
        className
      )}
    >
      <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#AEB6CC]/75 uppercase font-light">
        SCROLL TO BEGIN
      </span>

      {/* Thin vertical line with moving glow beam */}
      <div className="relative w-[1.5px] h-11 bg-white/15 overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-transparent via-[#F5C84B] to-[#F05AA6] animate-scroll-glow"
        />
      </div>
    </div>
  );
};
