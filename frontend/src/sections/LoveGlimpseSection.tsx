import React from "react";
import { LoveGlimpse } from "../components/LoveGlimpse/LoveGlimpse";

export interface LoveGlimpseSectionProps {
  onContinueToNext?: () => void;
}

export const LoveGlimpseSection: React.FC<LoveGlimpseSectionProps> = ({
  onContinueToNext,
}) => {
  const handleContinue = () => {
    onContinueToNext?.();
    const nextAnchor = document.getElementById("module-7-anchor");
    if (nextAnchor) {
      nextAnchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="love-glimpse"
      className="relative w-full min-h-screen bg-[#080D25] text-[#FFF7F0] overflow-hidden"
    >
      {/* Soft Vignette Overlay between Module 5 and Module 6 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Module 6 Main Experience */}
      <LoveGlimpse onContinue={handleContinue} />

      {/* Soft Vignette Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Placeholder Anchor for Module 7 (without revealing its content) */}
      <div id="module-7-anchor" className="sr-only" aria-hidden="true" />
    </section>
  );
};
