import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Reusable animation utility functions for cinematic effects
 */

// Smooth fade-up reveal for elements
export function animateFadeUp(
  target: string | Element | (string | Element)[],
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const { delay = 0, duration = 0.9, y = 30, stagger = 0.1, scrollTrigger } = options;

  return gsap.from(target, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: "power3.out",
    scrollTrigger,
  });
}

// Gentle scale reveal for cards and frames
export function animateScaleReveal(
  target: string | Element,
  options: {
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const { delay = 0, duration = 1, scrollTrigger } = options;

  return gsap.from(target, {
    scale: 0.95,
    opacity: 0,
    duration,
    delay,
    ease: "power2.out",
    scrollTrigger,
  });
}

// Subtle atmospheric float
export function animateFloating(
  target: string | Element,
  options: { y?: number; duration?: number; delay?: number } = {}
) {
  const { y = 10, duration = 4, delay = 0 } = options;

  return gsap.to(target, {
    y: -y,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}
