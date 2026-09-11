import React from "react";
import { cn } from "../utils/cn";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowEffect?: "none" | "pink" | "gold";
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowEffect = "none",
  hoverable = true,
  padding = "md",
  ...props
}) => {
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
  }[padding];

  const glowClasses = {
    none: "",
    pink: "hover:border-[#F05AA6]/40 hover:shadow-[0_0_30px_rgba(240,90,166,0.18)]",
    gold: "hover:border-[#F5C84B]/40 hover:shadow-[0_0_30px_rgba(245,200,75,0.18)]",
  }[glowEffect];

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-[#0D1330]/70 backdrop-blur-xl border border-white/10 text-[#FFF7F0] shadow-xl shadow-black/40 overflow-hidden transition-all duration-400",
        hoverable && "hover:-translate-y-1 hover:bg-[#151A3A]/80",
        glowClasses,
        paddingClasses,
        className
      )}
      {...props}
    >
      {/* Subtle corner aura */}
      {glowEffect === "pink" && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#F05AA6]/10 rounded-full blur-2xl pointer-events-none" />
      )}
      {glowEffect === "gold" && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#F5C84B]/10 rounded-full blur-2xl pointer-events-none" />
      )}
      {children}
    </div>
  );
};
