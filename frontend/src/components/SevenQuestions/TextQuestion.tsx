import React from "react";
import { cn } from "../../utils/cn";

export interface TextQuestionProps {
  question: string;
  subtitle?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  isEmotionalFocalPoint?: boolean;
  className?: string;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  subtitle,
  value,
  onChange,
  placeholder = "Be honest...",
  maxLength = 1000,
  isEmotionalFocalPoint = false,
  className,
}) => {
  const currentLength = value.length;
  const isNearLimit = currentLength > maxLength * 0.9;

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto space-y-6",
        isEmotionalFocalPoint && "space-y-8",
        className
      )}
    >
      {/* Optional Subtitle transition (e.g. for Q4: "Okay... now the real questions.") */}
      {subtitle && (
        <p className="font-serif italic text-base sm:text-lg text-[#F5C84B] text-center drop-shadow-[0_0_8px_rgba(245,200,75,0.5)]">
          {subtitle}
        </p>
      )}

      {/* Question Heading */}
      <h3
        className={cn(
          "font-serif font-normal tracking-tight text-center leading-snug drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]",
          isEmotionalFocalPoint
            ? "text-2xl sm:text-3xl lg:text-4xl text-[#FFF7F0]"
            : "text-2xl sm:text-3xl lg:text-4xl text-[#FFF7F0]"
        )}
      >
        {question}
      </h3>

      {/* Large Refined Textarea */}
      <div className="relative w-full">
        <textarea
          rows={isEmotionalFocalPoint ? 6 : 5}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/20 text-[#FFF7F0] placeholder-[#AEB6CC]/50 font-sans text-base sm:text-lg leading-relaxed focus:outline-none transition-all duration-300 resize-none shadow-inner",
            isEmotionalFocalPoint
              ? "focus:border-[#F5C84B] focus:shadow-[0_0_25px_rgba(245,200,75,0.3)] focus:bg-white/[0.06]"
              : "focus:border-[#F05AA6] focus:shadow-[0_0_22px_rgba(240,90,166,0.3)] focus:bg-white/[0.05]"
          )}
          aria-label={question}
        />

        {/* Character Count Indicator */}
        <div className="flex justify-end pt-2 px-1">
          <span
            className={cn(
              "font-mono text-xs tracking-wider",
              isNearLimit ? "text-[#F05AA6] font-semibold" : "text-[#AEB6CC]/70"
            )}
          >
            {currentLength} / {maxLength}
          </span>
        </div>
      </div>

    </div>
  );
};
