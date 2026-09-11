import React from "react";
import { PhotoHeartCanvas } from "../components/PhotoHeart/PhotoHeartCanvas";

/**
 * Module 10: The Final Big Photo Heart
 * The grand visual finale forming a large heart from Dharshini's real photos,
 * followed by the sincere final birthday card.
 */
export const PhotoHeartSection: React.FC = () => {
  return (
    <section
      id="photo-heart"
      className="relative w-full min-h-screen bg-[#080D25] text-[#FFF7F0] overflow-hidden"
    >
      {/* Anchor for direct smooth navigation from Module 9 */}
      <div id="module-10-anchor" className="sr-only" aria-hidden="true" />

      {/* Soft Vignette Overlay between Module 9 and Module 10 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080D25] to-transparent pointer-events-none z-10" />

      {/* Main Big Photo Heart Experience */}
      <PhotoHeartCanvas />

      {/* Soft Vignette Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080D25] to-transparent pointer-events-none z-10" />
    </section>
  );
};
