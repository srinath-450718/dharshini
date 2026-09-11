import React from "react";
import { cn } from "../../utils/cn";

export interface TimelineIconProps {
  className?: string;
  size?: number;
}

/**
 * Subtle, minimal bunny line contour for Event 04 (Round Two / Little Bunny).
 * Minimalist and elegant—never cartoonish.
 */
export const BunnyIcon: React.FC<TimelineIconProps> = ({ className, size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-[#F5C84B] drop-shadow-[0_0_8px_rgba(245,200,75,0.4)]", className)}
      aria-hidden="true"
    >
      {/* Left ear */}
      <path d="M8 2.5C7 4.5 7.5 9 9 10" />
      {/* Right ear */}
      <path d="M16 2.5C17 4.5 16.5 9 15 10" />
      {/* Head contour */}
      <path d="M9 10C6.5 11 5.5 14 6.5 17C7.5 20 10 21 12 21C14 21 16.5 20 17.5 17C18.5 14 17.5 11 15 10" />
      {/* Tiny nose & whisker dots */}
      <circle cx="12" cy="15.5" r="0.8" fill="currentColor" />
    </svg>
  );
};

/**
 * Tiny glowing four-leaf charm icon for Event 03 (The Nickname / Lucky Charm).
 */
export const CharmIcon: React.FC<TimelineIconProps> = ({ className, size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("text-[#F5C84B] drop-shadow-[0_0_10px_rgba(245,200,75,0.5)]", className)}
      aria-hidden="true"
    >
      {/* Four clover petals */}
      <circle cx="9" cy="9" r="4.2" fillOpacity="0.75" />
      <circle cx="15" cy="9" r="4.2" fillOpacity="0.75" />
      <circle cx="9" cy="15" r="4.2" fillOpacity="0.75" />
      <circle cx="15" cy="15" r="4.2" fillOpacity="0.75" />
      {/* Stem */}
      <path
        d="M12 12C12 15 11 19 9.5 20.5"
        stroke="#F5C84B"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Center diamond spark */}
      <circle cx="12" cy="12" r="1.2" fill="#FFF7F0" />
    </svg>
  );
};

/**
 * Single tiny glowing heart for Event 08 (Now) and the timeline backward easter egg.
 */
export const TinyGlowingHeart: React.FC<TimelineIconProps & { pulse?: boolean }> = ({
  className,
  size = 14,
  pulse = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#F05AA6"
      stroke="#F5C84B"
      strokeWidth="0.8"
      className={cn(
        "text-[#F05AA6] drop-shadow-[0_0_10px_rgba(240,90,166,0.7)]",
        pulse && "animate-pulse",
        className
      )}
      style={pulse ? { animationDuration: "2.4s" } : undefined}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};
