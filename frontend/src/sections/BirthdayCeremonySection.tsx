import React from "react";
import { BirthdayCeremony } from "../components/BirthdayCeremony/BirthdayCeremony";

export interface BirthdayCeremonySectionProps {
  onContinueToNext?: () => void;
  onCakeCut?: () => void;
}

export const BirthdayCeremonySection: React.FC<BirthdayCeremonySectionProps> = ({
  onContinueToNext,
  onCakeCut,
}) => {
  const handleContinue = () => {
    onContinueToNext?.();
  };

  return (
    <section
      id="birthday-ceremony"
      className="relative w-full min-h-screen bg-[#080D25] text-[#FFF7F0] overflow-hidden transition-colors duration-700"
    >
      {/* Soft Vignette Overlay between Module 6 and Module 7 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Module 7 Main Ceremony Experience */}
      <div>
        <BirthdayCeremony onCakeCut={onCakeCut} onContinueToNext={handleContinue} />
      </div>

      {/* Soft Vignette Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Placeholder Anchor for Module 8 (without revealing its content) */}
      <div id="module-8-anchor" className="sr-only" aria-hidden="true" />
    </section>
  );
};
