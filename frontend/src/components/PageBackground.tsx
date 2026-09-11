import React from "react";
import { AmbientStars } from "./ui/AmbientStars";
import { GlowBackdrop } from "./ui/GlowBackdrop";
import { GrainOverlay } from "./ui/GrainOverlay";

export const PageBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#080D25]">
      {/* Dynamic twinkling starfield canvas */}
      <AmbientStars />

      {/* Volumetric pink and gold ambient auras */}
      <GlowBackdrop />

      {/* Analog film grain overlay */}
      <GrainOverlay />
    </div>
  );
};
