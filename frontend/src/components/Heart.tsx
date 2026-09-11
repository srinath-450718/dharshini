import React from "react";
import { cn } from "../utils/cn";

export interface HeartProps {
  color?: "pink" | "gold" | "muted";
  size?: "xs" | "sm" | "md";
  filled?: boolean;
  className?: string;
}

/**
 * Delicate, subtle heart accent.
 * Note: Per master design guidelines, hearts are kept minimal and refined (never overloaded).
 */
export const Heart: React.FC<HeartProps> = ({
  color = "pink",
  size = "sm",
  filled = false,
  className,
}) => {
  const sizeValue = {
    xs: 12,
    sm: 15,
    md: 18,
  }[size];

  const colorClasses = {
    pink: filled ? "text-[#F05AA6] fill-[#F05AA6]" : "text-[#F05AA6]",
    gold: filled ? "text-[#F5C84B] fill-[#F5C84B]" : "text-[#F5C84B]",
    muted: filled ? "text-[#AEB6CC] fill-[#AEB6CC]" : "text-[#AEB6CC]",
  }[color];

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "inline-block shrink-0 transition-all duration-300 opacity-80 hover:opacity-100",
        colorClasses,
        className
      )}
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
};
