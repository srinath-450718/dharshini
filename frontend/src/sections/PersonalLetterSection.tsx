import React from "react";
import { PersonalLetter } from "../components/PersonalLetter/PersonalLetter";

export interface PersonalLetterSectionProps {
  onContinueToNext?: () => void;
}

export const PersonalLetterSection: React.FC<PersonalLetterSectionProps> = ({
  onContinueToNext,
}) => {
  const handleContinue = () => {
    onContinueToNext?.();
    const nextAnchor = document.getElementById("module-10-anchor");
    if (nextAnchor) {
      nextAnchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="personal-letter"
      className="relative w-full min-h-screen bg-[#080D25] text-[#FFF7F0] overflow-hidden"
    >
      {/* Anchor for direct smooth navigation from Module 8 */}
      <div id="module-9-anchor" className="sr-only" aria-hidden="true" />

      {/* Soft Vignette Overlay between Module 8 and Module 9 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Module 9 Main Personal Letter Experience */}
      <PersonalLetter onContinueToNext={handleContinue} />

      {/* Soft Vignette Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Placeholder Anchor for Module 10 (without revealing its content) */}
      <div id="module-10-anchor" className="sr-only" aria-hidden="true" />
    </section>
  );
};
