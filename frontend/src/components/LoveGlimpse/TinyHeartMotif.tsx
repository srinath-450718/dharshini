import React from "react";
import { cn } from "../../utils/cn";

export interface TinyHeartMotifProps {
  className?: string;
  glow?: boolean;
}

/**
 * TinyHeartMotif:
 * An extremely subtle, tiny (14px) glowing heart icon.
 * Moves slightly backward and gently fades out as user scrolls.
 * Strictly avoids bouncing, explosions, or Valentine's aesthetic.
 */
export const TinyHeartMotif: React.FC<TinyHeartMotifProps> = ({
  className,
  glow = true,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center select-none pointer-events-none transition-transform duration-1000",
        className
      )}
      aria-hidden="true"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="url(#glimpse-heart-grad)"
        className={cn(
          "w-3.5 h-3.5",
          glow && "drop-shadow-[0_0_8px_rgba(232,138,170,0.45)]"
        )}
      >
        <defs>
          <linearGradient id="glimpse-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5C84B" />
            <stop offset="100%" stopColor="#E88AAA" />
          </linearGradient>
        </defs>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};
