import React from "react";
import { cn } from "../../utils/cn";

export interface TimelineNoteProps {
  note?: string;
  className?: string;
}

export const TimelineNote: React.FC<TimelineNoteProps> = ({ note, className }) => {
  const hasNote = Boolean(note && note.trim().length > 0);

  return (
    <div
      className={cn(
        "relative w-full max-w-[420px] min-h-[140px] sm:min-h-[160px] flex flex-col justify-center transition-all duration-500",
        hasNote
          ? "p-6 sm:p-7 rounded-2xl bg-[#0D1330]/90 border border-[#F5C84B]/35 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(245,200,75,0.15)]"
          : "p-4", // Preserves physical space without collapsing layout
        className
      )}
    >
      {hasNote && (
        <div className="space-y-3">
          {/* Small uppercase NOTE label */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#F5C84B] font-semibold drop-shadow-[0_0_8px_rgba(245,200,75,0.5)]">
              ✦ NOTE
            </span>
            <span className="w-12 h-[1.5px] bg-gradient-to-r from-[#F5C84B]/80 via-[#F05AA6]/60 to-transparent" />
          </div>

          {/* Intimate personal journal text */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#FFF7F0] italic font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            &ldquo;{note}&rdquo;
          </p>
        </div>
      )}

    </div>
  );
};
