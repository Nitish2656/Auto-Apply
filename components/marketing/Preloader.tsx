"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const innerWrapper = useRef<HTMLDivElement>(null);
  const logoPath = useRef<SVGPathElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Setup SVG stroke
      if (logoPath.current) {
        const length = logoPath.current.getTotalLength();
        gsap.set(logoPath.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });

        // 2. Animate stroke drawing
        tl.to(logoPath.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power3.inOut",
        });

        // 3. Fill and glow
        tl.to(
          logoPath.current,
          {
            fill: "#6400FF",
            duration: 0.4,
          },
          "-=0.2"
        );
        tl.to(
          glow.current,
          {
            opacity: 1,
            scale: 1.5,
            duration: 0.5,
          },
          "<"
        );
      }

      // 4. Zoom the logo past the camera and fade the background
      tl.to(innerWrapper.current, {
        scale: 25,
        opacity: 0,
        duration: 1.2,
        ease: "power4.in",
        delay: 0.2, // hold briefly after drawing
      });
      
      // Fade out the glow instantly so it doesn't flood the screen with blue
      tl.to(glow.current, {
        opacity: 0,
        duration: 0.4,
      }, "<");

      // Fade out the black background smoothly
      tl.to(container.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "<0.4");

      // Hide completely after animation
      tl.set(container.current, { display: "none" });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-base overflow-hidden"
    >
      {/* Background Grid Pattern (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Crosshairs (like Trionn) */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border-t border-l border-white/20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-1/4 w-4 h-4 border-t border-r border-white/20 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 border-b border-l border-white/20 -translate-x-1/2 translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-b border-r border-white/20 translate-x-1/2 translate-y-1/2" />

      <div ref={innerWrapper} className="relative flex items-center justify-center">
        {/* Glow Effect */}
        <div 
          ref={glow}
          className="absolute inset-0 bg-brand-primary rounded-full blur-[60px] opacity-0 pointer-events-none"
        />

        {/* Animated Logo SVG (Geometric Hexagon Spiral) */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <path
            ref={logoPath}
            d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 L 50 10 L 75 25 L 75 60 L 50 75 L 25 60 L 25 35 L 50 20 L 60 27 L 60 48 L 50 55"
            stroke="#6400FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0"
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
}
