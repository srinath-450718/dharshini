import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { MainCharacterPhotoItem } from "../../data/mainCharacterPhotos";
import { TinyGlowingHeart, BunnyIcon, CharmIcon } from "../Timeline/TimelineIcons";
import { X, Image as ImageIcon } from "lucide-react";

export interface PhotoDetailModalProps {
  photo: MainCharacterPhotoItem | null;
  onClose: () => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({ photo, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // GSAP Modal Entrance
    if (modalRef.current && contentRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.05 }
      );
    }

    // Photo 10 Backward Heart animation inside modal
    if (photo.isEmotionalFocus && heartRef.current) {
      gsap.fromTo(
        heartRef.current,
        { opacity: 0, y: 20, scale: 0.5 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
      );
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#080D25]/92 backdrop-blur-xl select-none"
      onClick={onClose}
    >
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Modal Content Container */}
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0D1330]/95 border border-[#F5C84B]/25 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-[#FFF7F0] flex flex-col md:flex-row items-center gap-8 md:gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-[#AEB6CC] hover:text-[#FFF7F0] transition-colors flex items-center justify-center cursor-pointer z-30"
          aria-label="Close photo details"
        >
          <X size={18} />
        </button>

        {/* Photo View */}
        <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#080D25] border border-white/15 shadow-2xl flex-shrink-0">
          <img
            src={photo.src}
            alt={photo.alt}
            style={{ objectPosition: photo.objectPosition }}
            onError={(e) => {
              // Graceful placeholder fallback
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const placeholder = parent.querySelector(".modal-placeholder");
                if (placeholder) placeholder.classList.remove("hidden");
              }
            }}
            className="w-full h-full object-cover"
          />

          <div className="modal-placeholder hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#080D25] text-[#AEB6CC]/50 space-y-3">
            <ImageIcon size={32} className="text-[#AEB6CC]/30" />
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#FFF7F0]/60">
              PHOTO SPACE
            </p>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D25]/70 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Text & Nickname Information */}
        <div className="w-full flex-1 flex flex-col justify-center space-y-5 text-left">
          {/* Nickname Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151A3A] border border-[#F5C84B]/30 self-start">
            {photo.nickname === "Bunny" || photo.nickname === "Little Bunny" ? (
              <BunnyIcon size={15} />
            ) : photo.nickname === "Lucky Charm" ? (
              <CharmIcon size={15} />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C84B] shadow-[0_0_8px_rgba(245,200,75,0.8)]" />
            )}
            <span className="font-mono text-xs tracking-[0.28em] text-[#F5C84B] uppercase font-semibold">
              {photo.nickname}
            </span>
          </div>

          {/* Photo 10 Emotional Sequence vs Standard Caption */}
          {photo.isEmotionalFocus ? (
            <div className="space-y-4">
              <p className="font-serif italic text-lg sm:text-xl text-[#AEB6CC]">Okay...</p>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal tracking-tight drop-shadow-[0_4px_24px_rgba(245,200,75,0.35)]">
                This one.
              </h3>
              <div className="space-y-2.5 pt-2">
                <p className="font-sans text-base sm:text-lg text-[#E2D9D2] font-light leading-relaxed">
                  Some pictures are just pictures.
                </p>
                <p className="font-serif text-2xl sm:text-3xl text-[#FFF7F0] font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  &ldquo;And then there are the ones you keep coming back to.&rdquo;
                </p>
              </div>
              <div ref={heartRef} className="pt-2 flex items-center gap-2.5">
                <TinyGlowingHeart size={18} pulse={true} />
                <span className="font-mono text-xs tracking-[0.25em] text-[#F05AA6] uppercase font-bold">
                  LOOKING BACK
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F0] via-[#F5C84B] to-[#F05AA6] font-normal tracking-tight leading-snug drop-shadow-[0_4px_24px_rgba(245,200,75,0.35)]">
                {photo.caption}
              </h3>

              {/* Gold Divider Rule */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F5C84B] via-[#F05AA6] to-transparent" />

              {/* Personal Note */}
              <div className="space-y-2.5 pt-1">
                <span className="block font-mono text-xs tracking-[0.28em] text-[#F5C84B] uppercase font-semibold">
                  ✦ PERSONAL NOTE
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#FFF7F0] italic font-normal leading-relaxed whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  &ldquo;{photo.note}&rdquo;
                </p>
              </div>
            </div>
          )}

          <p className="font-mono text-xs text-[#AEB6CC]/70 tracking-wider pt-4">
            CLICK ANYWHERE OUTSIDE OR PRESS ESC TO RETURN
          </p>

        </div>
      </div>
    </div>
  );
};
