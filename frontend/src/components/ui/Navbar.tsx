import React from "react";
import { Sparkles, Compass } from "lucide-react";
import { siteConfig } from "../../data/config";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-full bg-[#0D1330]/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20">
        {/* Brand identifier */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F05AA6]/20 to-[#F5C84B]/20 border border-[#F05AA6]/30 flex items-center justify-center text-[#F05AA6]">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-sm font-semibold uppercase text-[#FFF7F0]">
              {siteConfig.recipientName}
            </span>
            <span className="text-[9px] font-mono tracking-wider text-[#AEB6CC]">
              {siteConfig.primaryNickname} • 09.09
            </span>
          </div>
        </div>

        {/* Playful status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-[#AEB6CC]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F05AA6] animate-ping" />
          <span className="font-mono text-[10px] tracking-wide">
            STATUS: PROBABLY PRETENDING NOT TO CARE
          </span>
        </div>

        {/* Quick Nav / Chapter hint */}
        <div className="flex items-center gap-4">
          <a
            href="#dossier"
            className="flex items-center gap-1.5 text-xs text-[#AEB6CC] hover:text-[#FFF7F0] transition-colors group"
          >
            <Compass size={13} className="text-[#F5C84B] group-hover:rotate-45 transition-transform duration-300" />
            <span className="hidden md:inline font-mono text-[11px] tracking-wider uppercase">
              Enter Dossier
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
