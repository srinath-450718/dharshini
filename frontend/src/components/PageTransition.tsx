import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../utils/cn";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
  delay = 0.1,
  duration = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
      }
    );
  }, [delay, duration]);

  return (
    <div ref={containerRef} className={cn("w-full transition-opacity", className)}>
      {children}
    </div>
  );
};
