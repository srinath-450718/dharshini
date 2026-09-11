import React from "react";
import { cn } from "../../utils/cn";

export interface CuteBunnyProps {
  facing?: "left" | "right";
  isSneaking?: boolean;
  isGrabbing?: boolean;
  className?: string;
  earWiggle?: boolean;
}

export const CuteBunny: React.FC<CuteBunnyProps> = ({
  facing = "right",
  isSneaking = false,
  isGrabbing = false,
  className,
  earWiggle = false,
}) => {
  return (
    <div
      className={cn(
        "relative select-none pointer-events-none transition-transform duration-300",
        facing === "left" ? "-scale-x-100" : "scale-x-100",
        className
      )}
      style={{ width: "84px", height: "96px" }}
    >
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
      >
        <defs>
          {/* Body Gradient */}
          <linearGradient id="bunnyBody" x1="50" y1="35" x2="50" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF7F0" />
            <stop offset="1" stopColor="#E9E2D8" />
          </linearGradient>

          {/* Ear Pink Gradient */}
          <linearGradient id="earInner" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#F5A8C8" stopOpacity="0.8" />
            <stop offset="1" stopColor="#F05AA6" stopOpacity="0.4" />
          </linearGradient>

          {/* Cheek Glow */}
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#F05AA6" stopOpacity="0.5" />
            <stop offset="1" stopColor="#F05AA6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Fluffy Bunny Tail */}
        <ellipse cx="20" cy="85" rx="10" ry="9" fill="#FFF7F0" />

        {/* 2. Left Ear (Back) */}
        <g className={cn("transition-transform origin-[42px_38px]", earWiggle ? "animate-bounce" : "")}>
          <ellipse
            cx="42"
            cy="22"
            rx="9"
            ry="20"
            transform="rotate(-8 42 22)"
            fill="url(#bunnyBody)"
          />
          <ellipse
            cx="42"
            cy="23"
            rx="5.5"
            ry="14"
            transform="rotate(-8 42 23)"
            fill="url(#earInner)"
          />
        </g>

        {/* 3. Right Ear (Front) */}
        <g className={cn("transition-transform origin-[62px_38px]", earWiggle ? "animate-pulse" : "")}>
          <ellipse
            cx="62"
            cy="20"
            rx="9"
            ry="21"
            transform="rotate(10 62 20)"
            fill="url(#bunnyBody)"
          />
          <ellipse
            cx="62"
            cy="21"
            rx="5.5"
            ry="15"
            transform="rotate(10 62 21)"
            fill="url(#earInner)"
          />
        </g>

        {/* 4. Chubby Bunny Body */}
        <ellipse
          cx="52"
          cy="78"
          rx="26"
          ry="24"
          fill="url(#bunnyBody)"
        />

        {/* 5. Bunny Head */}
        <ellipse
          cx="54"
          cy="52"
          rx="25"
          ry="22"
          fill="url(#bunnyBody)"
        />

        {/* 6. Soft Rosy Blush Cheeks */}
        <ellipse cx="40" cy="56" rx="6" ry="3.5" fill="url(#cheekGlow)" />
        <ellipse cx="68" cy="56" rx="6" ry="3.5" fill="url(#cheekGlow)" />

        {/* 7. Mischievous Bunny Eyes */}
        <g>
          {/* Left Eye */}
          <ellipse cx="44" cy="49" rx="3.5" ry="4.5" fill="#0D1330" />
          <circle cx="43" cy="47.5" r="1.5" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="64" cy="49" rx="3.5" ry="4.5" fill="#0D1330" />
          <circle cx="63" cy="47.5" r="1.5" fill="#FFFFFF" />
        </g>

        {/* 8. Tiny Nose & Sweet Smug Smile */}
        <ellipse cx="54" cy="54" rx="2.5" ry="1.8" fill="#F05AA6" />
        <path
          d="M 51.5 57 Q 54 59.5 56.5 57"
          stroke="#0D1330"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* 9. Front Paws (Grabbing or Sneaking) */}
        {isGrabbing ? (
          // Reaching forward to hold cake edge
          <g>
            <ellipse cx="68" cy="74" rx="8" ry="5.5" transform="rotate(15 68 74)" fill="#FFF7F0" />
            <ellipse cx="74" cy="72" rx="7" ry="5" transform="rotate(25 74 72)" fill="#FFF7F0" />
          </g>
        ) : isSneaking ? (
          // Sneaking tiptoe paws
          <g>
            <ellipse cx="58" cy="76" rx="7" ry="5" transform="rotate(10 58 76)" fill="#FFF7F0" />
            <ellipse cx="48" cy="77" rx="6.5" ry="5" fill="#FFF7F0" />
          </g>
        ) : (
          // Natural relaxed paws
          <g>
            <ellipse cx="58" cy="76" rx="6.5" ry="5" fill="#FFF7F0" />
            <ellipse cx="46" cy="76" rx="6" ry="5" fill="#FFF7F0" />
          </g>
        )}

        {/* 10. Tiny Feet / Paws at Bottom */}
        <ellipse cx="44" cy="100" rx="9" ry="6" fill="#E9E2D8" />
        <ellipse cx="62" cy="100" rx="10" ry="6.5" fill="#E9E2D8" />
      </svg>
    </div>
  );
};
