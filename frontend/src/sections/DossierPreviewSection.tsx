import React from "react";
import { Lock, FileQuestion, Calendar, Smile } from "lucide-react";
import { siteConfig } from "../data/config";

export const DossierPreviewSection: React.FC = () => {
  return (
    <section id="dossier" className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151A3A]/80 border border-[#F5C84B]/30 text-xs font-mono text-[#F5C84B]">
          <Lock size={12} />
          <span>CHAPTER 01 • THE TEASING ARCHIVES</span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF7F0] font-normal tracking-tight">
            Curated evidence from someone who actually pays attention.
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#AEB6CC] leading-relaxed">
            You might think school days are ancient history, but some things never changed—like your sudden mood shifts, your habit of vanishing, and your habit of being there for everyone else.
          </p>
        </div>

        {/* Three preview teasers of upcoming modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="p-6 rounded-2xl bg-[#0D1330]/60 border border-white/5 backdrop-blur-md hover:border-[#F05AA6]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#F05AA6]/10 border border-[#F05AA6]/20 flex items-center justify-center text-[#F05AA6] mb-4">
              <Smile size={18} />
            </div>
            <h3 className="font-serif text-lg text-[#FFF7F0] font-medium mb-1">
              Mood Swing Gauge
            </h3>
            <p className="text-xs text-[#AEB6CC] leading-relaxed">
              Real-time calculations of why &ldquo;I&rsquo;m totally fine&rdquo; usually means the opposite.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1330]/60 border border-white/5 backdrop-blur-md hover:border-[#F5C84B]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#F5C84B]/10 border border-[#F5C84B]/20 flex items-center justify-center text-[#F5C84B] mb-4">
              <Calendar size={18} />
            </div>
            <h3 className="font-serif text-lg text-[#FFF7F0] font-medium mb-1">
              The Memory Vault
            </h3>
            <p className="text-xs text-[#AEB6CC] leading-relaxed">
              Every solo frame of {siteConfig.recipientName} that proves she’s always the standout, even when dodging cameras.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1330]/60 border border-white/5 backdrop-blur-md hover:border-[#F05AA6]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFF7F0] mb-4">
              <FileQuestion size={18} />
            </div>
            <h3 className="font-serif text-lg text-[#FFF7F0] font-medium mb-1">
              The Unspoken Letter
            </h3>
            <p className="text-xs text-[#AEB6CC] leading-relaxed">
              Handwritten words, unvarnished memories, and a couple of things I never said out loud in class.
            </p>
          </div>
        </div>

        {/* Teasing footnote */}
        <div className="pt-8 text-xs font-mono text-[#AEB6CC]/60 flex items-center justify-center gap-2">
          <span>CLASSIFIED LEVEL: EYES ONLY FOR {siteConfig.recipientName.toUpperCase()}</span>
          <span>•</span>
          <span className="text-[#F05AA6]">MORE MODULES READY FOR DEPLOYMENT</span>
        </div>
      </div>
    </section>
  );
};
