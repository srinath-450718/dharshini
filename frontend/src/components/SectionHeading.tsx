import React from "react";
import { cn } from "../utils/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  eyebrowColor?: "pink" | "gold" | "muted";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  eyebrowColor = "pink",
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  const eyebrowColorClasses = {
    pink: "text-[#F05AA6] bg-[#F05AA6]/10 border-[#F05AA6]/20",
    gold: "text-[#F5C84B] bg-[#F5C84B]/10 border-[#F5C84B]/20",
    muted: "text-[#AEB6CC] bg-white/5 border-white/10",
  }[eyebrowColor];

  return (
    <div className={cn("flex flex-col space-y-3 max-w-3xl", alignClasses, className)}>
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase mb-1 backdrop-blur-md",
            eyebrowColorClasses
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              eyebrowColor === "gold" ? "bg-[#F5C84B]" : "bg-[#F05AA6]"
            )}
          />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FFF7F0] leading-[1.18]">
        {title}
        {highlight && (
          <span className="italic block sm:inline sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-[#F05AA6] via-[#F37BB9] to-[#F5C84B]">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-[#AEB6CC] font-sans font-light max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
