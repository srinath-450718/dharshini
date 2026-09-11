import React, { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

export const HeroParticles: React.FC = () => {
  // Low visual density: 24 tiny subtle particles across the 100vh hero
  const particles = useMemo<Particle[]>(() => {
    const colors = ["#FFF7F0", "#FFF7F0", "#F5C84B", "#E88AAA", "#AEB6CC"];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: colors[i % colors.length],
      opacity: Math.random() * 0.45 + 0.15,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 5,
    }));
  }, []);

  // 3 tiny floating hearts in the negative space of the Hero section
  const heroHearts = useMemo(() => [
    { id: "h1", x: 18, y: 32, size: 7, delay: 0, duration: 9 },
    { id: "h2", x: 78, y: 22, size: 8, delay: 2.5, duration: 11 },
    { id: "h3", x: 62, y: 76, size: 6.5, delay: 4, duration: 8 },
  ], []);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Tiny subtle particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow:
              p.size > 2 ? `0 0 6px ${p.color}` : undefined,
          }}
        />
      ))}

      {/* 2-3 Tiny floating SVG hearts */}
      {heroHearts.map((h) => (
        <svg
          key={h.id}
          viewBox="0 0 24 24"
          className="absolute fill-[#E88AAA] animate-soft-float pointer-events-none"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            opacity: 0.28,
            filter: "drop-shadow(0 0 6px rgba(232, 138, 170, 0.35))",
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
};
