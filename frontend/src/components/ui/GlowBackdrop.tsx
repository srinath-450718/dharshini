import React from "react";

export const GlowBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top right extremely subtle blush atmospheric aura (low opacity ~0.045) */}
      <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[#E88AAA]/[0.045] blur-[160px] animate-pulse-aura" />

      {/* Subtle localized romantic radial glow in negative space */}
      <div
        className="absolute top-[20%] left-[15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(232, 138, 170, 0.06) 0%, rgba(217, 120, 152, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* Bottom left warm gold ambient aura */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#F5C84B]/[0.04] blur-[170px] animate-pulse-aura" style={{ animationDelay: "-3s" }} />

      {/* Center midnight illumination for rich deep navy contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-[#111936]/50 blur-[190px]" />
    </div>
  );
};
