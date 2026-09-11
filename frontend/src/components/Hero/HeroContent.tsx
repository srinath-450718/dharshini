import React from "react";
import { heroData } from "../../data/heroData";
import { LuckyCharmIcon } from "../LuckyCharmIcon";

export const HeroContent: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mr-auto flex flex-col items-start text-left space-y-6 select-none pl-4 sm:pl-10 md:pl-16 lg:pl-20">
      {/* 1. Grand Headline with Dear Dharshini */}
      <h1 className="flex flex-col items-start tracking-tight font-normal leading-[1.15]">
        <span className="hero-anim-title1 font-serif text-[clamp(2.7rem,6vw,4.8rem)] text-[#FFF7F0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          {heroData.title[0]}
        </span>
        <span className="hero-anim-title2 font-serif text-[clamp(3.2rem,7.5vw,6rem)] italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] drop-shadow-[0_4px_35px_rgba(245,200,75,0.4)]">
          {heroData.title[1]}
        </span>
      </h1>

      {/* 2. Supporting Message */}
      <div className="hero-anim-support space-y-2.5 max-w-xl">
        <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#FFF7F0] font-normal tracking-wide leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          {heroData.subtitle}
        </p>
        <p className="font-sans text-sm sm:text-base text-[#E2D9D2] font-light tracking-wide leading-relaxed">
          {heroData.description}
        </p>
      </div>

      {/* 3. Subtle Personal Detail (Lucky Charm Motif) */}
      <div className="hero-anim-charm inline-flex items-center gap-2.5 pt-1 text-sm sm:text-base text-[#F5C84B] font-mono tracking-wider px-3.5 py-1.5 rounded-full bg-[#0D1330]/80 border border-[#F5C84B]/35 shadow-[0_0_15px_rgba(245,200,75,0.25)]">
        <span className="text-xs text-[#F5C84B]">✦</span>
        <LuckyCharmIcon size={18} glow={true} />
        <span className="text-[#FFF7F0] italic font-sans font-medium">
          {heroData.nickname}
        </span>
        <span className="text-xs text-[#F5C84B]">✦</span>
      </div>
    </div>
  );
};

