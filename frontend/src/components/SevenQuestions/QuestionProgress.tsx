import React from "react";
import { cn } from "../../utils/cn";

export interface QuestionProgressProps {
  current: number; // 1-indexed
  total?: number;
  className?: string;
}

export const QuestionProgress: React.FC<QuestionProgressProps> = ({
  current,
  total = 7,
  className,
}) => {
  const currentFormatted = String(current).padStart(2, "0");
  const totalFormatted = String(total).padStart(2, "0");
  const progressPercent = Math.min(100, Math.max(0, ((current - 1) / (total - 1)) * 100));

  return (
    <div className={cn("w-full max-w-xl mx-auto flex flex-col items-center space-y-3 select-none", className)}>
      {/* Label: QUESTION 01 / 07 */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.28em] text-[#F5C84B] uppercase font-medium drop-shadow-[0_0_8px_rgba(245,200,75,0.4)]">
          QUESTION {currentFormatted} / {totalFormatted}
        </span>
      </div>

      {/* Progress Track: 01 ─────── 07 */}
      <div className="w-full flex items-center gap-3">
        <span className="font-mono text-[11px] text-[#AEB6CC]/70 font-light">01</span>

        <div className="relative flex-1 h-[2px] bg-[#151A3A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,200,75,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <span className="font-mono text-[11px] text-[#AEB6CC]/70 font-light">{totalFormatted}</span>
      </div>
    </div>
  );
};
