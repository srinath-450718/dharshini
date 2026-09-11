import React from "react";
import { cn } from "../utils/cn";

export interface GlowProps {
  color?: "pink" | "gold" | "dual" | "navy";
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

export const Glow: React.FC<GlowProps> = ({
  color = "pink",
  size = "md",
  animated = true,
  className,
}) => {
  const sizeClasses = {
    sm: "w-48 h-48 blur-[80px]",
    md: "w-80 h-80 blur-[120px]",
    lg: "w-[500px] h-[500px] blur-[160px]",
    xl: "w-[750px] h-[750px] blur-[200px]",
  }[size];

  const colorClasses = {
    pink: "bg-[#F05AA6]/15",
    gold: "bg-[#F5C84B]/12",
    navy: "bg-[#151A3A]/60",
    dual: "bg-gradient-to-br from-[#F05AA6]/15 to-[#F5C84B]/12",
  }[color];

  return (
    <div
      className={cn(
        "rounded-full pointer-events-none -z-10",
        sizeClasses,
        colorClasses,
        animated && "animate-pulse-aura",
        className
      )}
      aria-hidden="true"
    />
  );
};
