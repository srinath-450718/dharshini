import React from "react";
import { cn } from "../utils/cn";

export interface LuckyCharmIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const LuckyCharmIcon: React.FC<LuckyCharmIconProps> = ({
  className,
  size = 24,
  glow = true,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center transition-all duration-700",
        glow && "drop-shadow-[0_0_12px_rgba(245,200,75,0.7)]",
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#F5C84B]"
      >
        {/* Four-leaf lucky charm clover petals */}
        <g stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.85">
          {/* Top leaf */}
          <path d="M12 11.5C12 8.5 9.8 6 7.5 7.5C5.8 8.6 7 11.5 11.5 11.8" />
          {/* Right leaf */}
          <path d="M12.5 12C15.5 12 18 9.8 16.5 7.5C15.4 5.8 12.5 7 12.2 11.5" />
          {/* Bottom leaf */}
          <path d="M12 12.5C12 15.5 14.2 18 16.5 16.5C18.2 15.4 17 12.5 12.5 12.2" />
          {/* Left leaf */}
          <path d="M11.5 12C8.5 12 6 14.2 7.5 16.5C8.6 18.2 11.5 17 11.8 12.5" />
        </g>
        {/* Delicate stem */}
        <path
          d="M12 12.5C11.5 15.5 9.5 19 8.5 20.5"
          stroke="#F5C84B"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Core highlight dot */}
        <circle cx="12" cy="12" r="1.2" fill="#FFF7F0" />
      </svg>
    </span>
  );
};
