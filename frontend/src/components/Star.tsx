import React from "react";
import { cn } from "../utils/cn";

export interface StarProps {
  color?: "gold" | "pink" | "cream";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  twinkle?: boolean;
}

export const Star: React.FC<StarProps> = ({
  color = "gold",
  size = "sm",
  className,
  twinkle = true,
}) => {
  const sizeValue = {
    xs: 10,
    sm: 14,
    md: 20,
    lg: 28,
  }[size];

  const colorClasses = {
    gold: "text-[#F5C84B] drop-shadow-[0_0_8px_rgba(245,200,75,0.6)]",
    pink: "text-[#F05AA6] drop-shadow-[0_0_8px_rgba(240,90,166,0.6)]",
    cream: "text-[#FFF7F0] drop-shadow-[0_0_8px_rgba(255,247,240,0.5)]",
  }[color];

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        "inline-block shrink-0 transition-transform duration-300",
        colorClasses,
        twinkle && "animate-pulse",
        className
      )}
      style={twinkle ? { animationDuration: "2.4s" } : undefined}
      aria-hidden="true"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
};
