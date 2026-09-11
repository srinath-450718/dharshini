import React from "react";
import { BunnyHeistScene } from "../components/BunnyHeist/BunnyHeistScene";

export interface BunnyHeistSectionProps {
  onContinueToNext?: () => void;
}

export const BunnyHeistSection: React.FC<BunnyHeistSectionProps> = ({
  onContinueToNext,
}) => {
  const handleContinue = () => {
    onContinueToNext?.();
    setTimeout(() => {
      const lenis = (window as unknown as {
        __lenis?: {
          scrollTo: (
            target: HTMLElement | string,
            opts?: { immediate?: boolean; offset?: number }
          ) => void;
        };
      }).__lenis;
      const nextAnchor = document.getElementById("personal-letter");
      if (lenis && nextAnchor) {
        lenis.scrollTo(nextAnchor, { immediate: false });
      } else if (nextAnchor) {
        nextAnchor.scrollIntoView({ behavior: "smooth" });
      }
    }, 40);
  };

  return (
    <section
      id="bunny-heist"
      className="relative w-full min-h-screen bg-[#080D25] text-[#FFF7F0] overflow-hidden flex flex-col justify-center"
    >
      {/* Anchor for direct smooth navigation from Module 7 */}
      <div id="module-8-anchor" className="sr-only" aria-hidden="true" />

      {/* Soft Vignette Overlay between Module 7 and Module 8 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Module 8 Main Heist Experience */}
      <BunnyHeistScene onContinueToModule9={handleContinue} />

      {/* Soft Vignette Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Placeholder Anchor for Module 9 (without revealing its content) */}
      <div id="module-9-anchor" className="sr-only" aria-hidden="true" />
    </section>
  );
};
