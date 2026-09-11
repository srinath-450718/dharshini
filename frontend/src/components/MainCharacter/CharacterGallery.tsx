import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mainCharacterPhotos } from "../../data/mainCharacterPhotos";
import type { MainCharacterPhotoItem } from "../../data/mainCharacterPhotos";
import { CharacterPhotoCard } from "./CharacterPhotoCard";
import { PhotoDetailModal } from "./PhotoDetailModal";

gsap.registerPlugin(ScrollTrigger);

export const CharacterGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MainCharacterPhotoItem | null>(null);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const col3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !galleryRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Staggered Entrance Animation for Gallery Photos
      const cards = galleryRef.current?.querySelectorAll(".gallery-card-item");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Subtle Multi-layer Parallax on Desktop (10-25px)
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        if (col1Ref.current) {
          gsap.fromTo(
            col1Ref.current,
            { y: -15 },
            {
              y: 18,
              ease: "none",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            }
          );
        }

        if (col2Ref.current) {
          gsap.fromTo(
            col2Ref.current,
            { y: 20 },
            {
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2.2,
              },
            }
          );
        }

        if (col3Ref.current) {
          gsap.fromTo(
            col3Ref.current,
            { y: -10 },
            {
              y: 22,
              ease: "none",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6,
              },
            }
          );
        }
      }
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // Split the 12 photos into 3 balanced, art-directed editorial columns for desktop (4 photos each):
  // Col 1 (Left): Photos 01, 04, 07, 11
  // Col 2 (Center): Photos 02, 05, 08, 10
  // Col 3 (Right): Photos 03, 06, 09, 12
  const col1Photos = [
    mainCharacterPhotos[0],
    mainCharacterPhotos[3],
    mainCharacterPhotos[6],
    mainCharacterPhotos[10],
  ];
  const col2Photos = [
    mainCharacterPhotos[1],
    mainCharacterPhotos[4],
    mainCharacterPhotos[7],
    mainCharacterPhotos[9],
  ];
  const col3Photos = [
    mainCharacterPhotos[2],
    mainCharacterPhotos[5],
    mainCharacterPhotos[8],
    mainCharacterPhotos[11],
  ];

  return (
    <div ref={galleryRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* DESKTOP ART-DIRECTED EDITORIAL WALL (Hidden on mobile) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 items-start py-8">
        {/* Column 1 (Left Column - slightly offset downward) */}
        <div ref={col1Ref} className="flex flex-col gap-12 xl:gap-16 pt-12 will-change-transform">
          {col1Photos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-card-item flex justify-center"
              style={{
                transform: `translate(${photo.x ?? 0}px, ${photo.y ?? 0}px)`,
              }}
            >
              <CharacterPhotoCard
                photo={photo}
                onSelect={setSelectedPhoto}
                isDimmed={hoveredPhotoId !== null && hoveredPhotoId !== photo.id}
                onHoverChange={(hovered) => setHoveredPhotoId(hovered ? photo.id : null)}
              />
            </div>
          ))}
        </div>

        {/* Column 2 (Center Column - featuring focal points and Photo 10) */}
        <div ref={col2Ref} className="flex flex-col gap-12 xl:gap-16 will-change-transform">
          {col2Photos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-card-item flex justify-center"
              style={{
                transform: `translate(${photo.x ?? 0}px, ${photo.y ?? 0}px)`,
              }}
            >
              <CharacterPhotoCard
                photo={photo}
                onSelect={setSelectedPhoto}
                isDimmed={hoveredPhotoId !== null && hoveredPhotoId !== photo.id}
                onHoverChange={(hovered) => setHoveredPhotoId(hovered ? photo.id : null)}
              />
            </div>
          ))}
        </div>

        {/* Column 3 (Right Column - offset for rhythmic depth) */}
        <div ref={col3Ref} className="flex flex-col gap-12 xl:gap-16 pt-20 will-change-transform">
          {col3Photos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-card-item flex justify-center"
              style={{
                transform: `translate(${photo.x ?? 0}px, ${photo.y ?? 0}px)`,
              }}
            >
              <CharacterPhotoCard
                photo={photo}
                onSelect={setSelectedPhoto}
                isDimmed={hoveredPhotoId !== null && hoveredPhotoId !== photo.id}
                onHoverChange={(hovered) => setHoveredPhotoId(hovered ? photo.id : null)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* TABLET EDITORIAL GRID (2 Columns for 768px-1023px) */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 items-start py-8">
        <div className="flex flex-col gap-10">
          {mainCharacterPhotos
            .filter((_, i) => i % 2 === 0)
            .map((photo) => (
              <div key={photo.id} className="gallery-card-item flex justify-center">
                <CharacterPhotoCard
                  photo={photo}
                  onSelect={setSelectedPhoto}
                  isDimmed={hoveredPhotoId !== null && hoveredPhotoId !== photo.id}
                  onHoverChange={(hovered) => setHoveredPhotoId(hovered ? photo.id : null)}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-10 pt-12">
          {mainCharacterPhotos
            .filter((_, i) => i % 2 === 1)
            .map((photo) => (
              <div key={photo.id} className="gallery-card-item flex justify-center">
                <CharacterPhotoCard
                  photo={photo}
                  onSelect={setSelectedPhoto}
                  isDimmed={hoveredPhotoId !== null && hoveredPhotoId !== photo.id}
                  onHoverChange={(hovered) => setHoveredPhotoId(hovered ? photo.id : null)}
                />
              </div>
            ))}
        </div>
      </div>

      {/* MOBILE STACKED EDITORIAL FLOW (< 768px) */}
      {/* Carefully composed overlapping stream: perfectly centered 290-340px width portraits */}
      <div className="flex md:hidden flex-col items-center space-y-12 py-6 w-full max-w-full overflow-hidden">
        {mainCharacterPhotos.map((photo, index) => {
          const isShiftedLeft = index % 2 === 0;
          return (
            <div
              key={photo.id}
              className="gallery-card-item w-full flex justify-center px-3"
              style={{
                transform: `translateX(${isShiftedLeft ? -4 : 4}px)`,
              }}
            >
              <CharacterPhotoCard
                photo={photo}
                onSelect={setSelectedPhoto}
                isDimmed={hoveredPhotoId !== null && hoveredPhotoId !== photo.id}
                onHoverChange={(hovered) => setHoveredPhotoId(hovered ? photo.id : null)}
                className="w-full max-w-[320px]"
              />
            </div>
          );
        })}
      </div>


      {/* Photo Inspection Detail Modal */}
      <PhotoDetailModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};
