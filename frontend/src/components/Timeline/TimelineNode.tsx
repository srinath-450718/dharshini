import React from "react";
import { cn } from "../../utils/cn";

export interface TimelineNodeProps {
  isActive?: boolean;
  className?: string;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  isActive = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 transition-all duration-500 z-20 select-none",
        className
      )}
    >
      {/* Outer Pulse Halo when active with subtle romantic pink touch */}
      <div
        className={cn(
          "absolute w-8 h-8 rounded-full transition-all duration-500 pointer-events-none",
          isActive
            ? "bg-[#E88AAA]/20 animate-ping opacity-75"
            : "opacity-0 scale-50"
        )}
      />

      {/* Main Node Dot */}
      <div
        className={cn(
          "rounded-full transition-all duration-500 border",
          isActive
            ? "w-4 h-4 bg-[#F5C84B] border-[#FFF7F0] shadow-[0_0_15px_rgba(245,200,75,0.7),0_0_25px_rgba(232,138,170,0.35)] scale-110"
            : "w-2.5 h-2.5 bg-[#151A3A] border-[#AEB6CC]/40 hover:border-[#E88AAA]/60"
        )}
      />
    </div>
  );
};
