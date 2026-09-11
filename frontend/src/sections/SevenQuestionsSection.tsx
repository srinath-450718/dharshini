import React from "react";
import { SevenQuestions } from "../components/SevenQuestions/SevenQuestions";

export interface SevenQuestionsSectionProps {
  onModuleComplete?: () => void;
}

export const SevenQuestionsSection: React.FC<SevenQuestionsSectionProps> = ({
  onModuleComplete,
}) => {
  return (
    <section
      id="seven-questions"
      className="relative w-full min-h-screen py-20 sm:py-28 px-4 sm:px-8 bg-[#080D25] text-[#FFF7F0] overflow-hidden flex flex-col justify-center"
    >
      {/* Soft Ambient Radial Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(13,19,48,0.85)_0%,transparent_75%)] pointer-events-none -z-10" />

      {/* Main Interactive Questionnaire Container */}
      <div className="relative z-10 w-full">
        <SevenQuestions onUnlockNext={onModuleComplete} />
      </div>
    </section>
  );
};

export default SevenQuestionsSection;
