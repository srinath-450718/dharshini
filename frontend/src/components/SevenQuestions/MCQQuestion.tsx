import React from "react";
import type { QuestionOption } from "../../data/personalQuestions";
import { cn } from "../../utils/cn";

export interface MCQQuestionProps {
  question: string;
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (optionId: string) => void;
  className?: string;
}

export const MCQQuestion: React.FC<MCQQuestionProps> = ({
  question,
  options,
  selectedValue,
  onSelect,
  className,
}) => {
  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-8 select-none", className)}>
      {/* Question Heading */}
      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFF7F0] font-normal tracking-tight text-center leading-snug drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
        {question}
      </h3>

      {/* 4 Interactive Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" role="radiogroup" aria-label={question}>
        {options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          const letter = opt.id.toUpperCase();

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "group relative w-full p-5 sm:p-6 text-left rounded-2xl transition-all duration-300 cursor-pointer border flex flex-col justify-between min-h-[110px] sm:min-h-[125px]",
                isSelected
                  ? "bg-[#151A3A]/90 border-[#F5C84B] shadow-[0_0_25px_rgba(245,200,75,0.25)] scale-[1.02]"
                  : "bg-[#0D1330]/70 border-white/10 hover:border-white/25 hover:bg-[#0D1330]/90 hover:scale-[1.01]"
              )}
            >
              {/* Option Letter Tag */}
              <div className="flex items-center justify-between w-full pb-2">
                <span
                  className={cn(
                    "w-7 h-7 rounded-lg font-mono text-xs font-semibold flex items-center justify-center transition-colors",
                    isSelected
                      ? "bg-[#F5C84B] text-[#080D25] shadow-[0_0_8px_rgba(245,200,75,0.6)]"
                      : "bg-white/[0.06] text-[#AEB6CC] group-hover:text-[#FFF7F0]"
                  )}
                >
                  {letter}
                </span>

                {/* Subtle Radio Indicator */}
                <div
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border transition-all flex items-center justify-center",
                    isSelected ? "border-[#F5C84B] bg-[#F5C84B]" : "border-white/20"
                  )}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#080D25]" />}
                </div>
              </div>

              {/* Option Label */}
              <p
                className={cn(
                  "font-sans text-base sm:text-lg font-normal leading-relaxed transition-colors",
                  isSelected ? "text-[#FFF7F0] font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" : "text-[#E2D9D2] group-hover:text-[#FFF7F0]"
                )}
              >
                {opt.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

