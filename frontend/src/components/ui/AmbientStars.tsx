import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  vx: number;
  vy: number;
  hasGlow: boolean;
}

interface AtmosphericHeart {
  x: number;
  y: number;
  baseY: number;
  size: number;
  color: string;
  isOutline: boolean;
  phase: number;
  bobSpeed: number;
  bobAmplitude: number;
  fadeSpeed: number;
  baseOpacity: number;
  vx: number;
}

// Symmetrical, refined tiny heart SVG path on 2D canvas
function drawHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  isOutline: boolean
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 20;
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(0, 7);
  ctx.bezierCurveTo(-7, 0, -12, -7, -6, -13);
  ctx.bezierCurveTo(-2, -17, 0, -13, 0, -10);
  ctx.bezierCurveTo(0, -13, 2, -17, 6, -13);
  ctx.bezierCurveTo(12, -7, 7, 0, 0, 7);
  ctx.closePath();
  if (isOutline) {
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else {
    ctx.fill();
  }
  ctx.restore();
}

export const AmbientStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;

    // Palette: Midnight Navy Dominance with warm gold & soft subtle pink accents
    // ~75% cream/white, ~15% gold, ~10% subtle pink
    const starColors = [
      "#FFF7F0",
      "#FFF7F0",
      "#FFF7F0",
      "#FFF7F0",
      "#FFF7F0",
      "#F5C84B",
      "#E88AAA",
    ];

    const heartColors = ["#E88AAA", "#D97898", "#E88AAA"];

    // 1. Starfield Setup (mostly 1–2.5px calm stars, rare 3.5–4.5px glowing stars)
    const starCount = Math.floor((width * height) / (isMobile ? 12000 : 9000));
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const isRareGlow = Math.random() < 0.04;
      const size = isRareGlow ? Math.random() * 1.5 + 3.2 : Math.random() * 1.6 + 0.8;
      const baseOpacity = isRareGlow
        ? Math.random() * 0.35 + 0.35
        : Math.random() * 0.45 + 0.18;
      // 3 to 7 seconds twinkle cycle
      const twinkleSeconds = Math.random() * 4 + 3;
      const twinkleSpeed = (Math.PI * 2) / (twinkleSeconds * 60);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        opacity: baseOpacity,
        baseOpacity,
        twinkleSpeed,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        hasGlow: isRareGlow,
      };
    });

    // 2. Atmospheric Tiny Floating Hearts Setup (6–14 desktop, 4–6 mobile)
    const heartCount = isMobile ? 5 : 12;
    const hearts: AtmosphericHeart[] = Array.from({ length: heartCount }, () => {
      const initialY = Math.random() * height;
      const bobSeconds = Math.random() * 5 + 7; // 7–12s
      const fadeSeconds = Math.random() * 4 + 6; // 6–10s

      return {
        x: Math.random() * width,
        y: initialY,
        baseY: initialY,
        size: Math.random() * 3.5 + 5.5, // 5.5px to 9px (small & subtle)
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        isOutline: Math.random() > 0.45,
        phase: Math.random() * Math.PI * 2,
        bobSpeed: (Math.PI * 2) / (bobSeconds * 60),
        bobAmplitude: Math.random() * 6 + 6, // 6–12px gentle bob
        fadeSpeed: (Math.PI * 2) / (fadeSeconds * 60),
        baseOpacity: Math.random() * 0.15 + 0.15, // 0.15–0.30
        vx: (Math.random() - 0.5) * 0.03, // slow gentle drift
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let frame = 0;

    const render = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      // --- RENDER STARS ---
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Slow calm drift
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Smooth sinusoidal twinkle
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.phase);
        const currentOpacity = star.baseOpacity + twinkle * 0.22;
        const clampedOpacity = Math.max(0.1, Math.min(0.85, currentOpacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedOpacity;
        ctx.fill();

        // Very soft subtle halo for select glowing stars
        if (star.hasGlow) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = clampedOpacity * 0.16;
          ctx.fill();
        }
      }

      // --- RENDER ATMOSPHERIC TINY HEARTS ---
      for (let j = 0; j < hearts.length; j++) {
        const h = hearts[j];

        // Gentle horizontal drift
        h.x += h.vx;
        if (h.x < 0) h.x = width;
        if (h.x > width) h.x = 0;

        // Slow vertical sinusoidal bobbing (5–12px)
        h.y = h.baseY + Math.sin(frame * h.bobSpeed + h.phase) * h.bobAmplitude;

        // Slow soft fading (0.12 to 0.40)
        const fade = (Math.sin(frame * h.fadeSpeed + h.phase) + 1) * 0.5;
        const heartOpacity = 0.12 + fade * (h.baseOpacity + 0.1);

        ctx.fillStyle = h.color;
        ctx.strokeStyle = h.color;
        ctx.globalAlpha = heartOpacity;
        ctx.shadowColor = "rgba(232, 138, 170, 0.25)";
        ctx.shadowBlur = 3;

        drawHeart(ctx, h.x, h.y, h.size, h.isOutline);

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
      aria-hidden="true"
    />
  );
};
