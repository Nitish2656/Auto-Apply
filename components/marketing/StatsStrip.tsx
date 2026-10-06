"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsStrip() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });

      // Borders sweeping in
      tl.fromTo(".stat-border-x", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 0.8, ease: "expo.inOut" }
      )
      .fromTo(".stat-border-y", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 0.8, ease: "expo.inOut", stagger: 0.1 },
        "<0.2"
      )
      // Numbers sliding up from mask
      .fromTo(".stat-number .animate-word",
        { y: 100 },
        { y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" },
        "<0.1"
      )
      // Labels fading in
      .fromTo(".stat-label",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "<0.2"
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-black py-16 relative">
      {/* Top and Bottom Borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 stat-border-x origin-left" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 stat-border-x origin-right" />

      <div className="max-w-7xl mx-auto px-6 relative flex flex-col md:flex-row items-stretch justify-between">
        
        {/* Stat 1 */}
        <div className="flex-1 flex flex-col items-center text-center py-8 relative">
          <div className="stat-number overflow-hidden mb-2">
            <span className="inline-block animate-word text-4xl md:text-5xl lg:text-6xl font-black font-mono text-white tracking-tighter" style={{ transform: "translateY(100px)" }}>1.2M+</span>
          </div>
          <span className="stat-label text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-bold opacity-0">Applications Sent</span>
          
          {/* Right Divider (hidden on mobile) */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-white/10 stat-border-y origin-top" />
        </div>

        {/* Stat 2 */}
        <div className="flex-1 flex flex-col items-center text-center py-8 relative">
          <div className="stat-number overflow-hidden mb-2">
            <span className="inline-block animate-word text-4xl md:text-5xl lg:text-6xl font-black font-mono text-white tracking-tighter" style={{ transform: "translateY(100px)" }}>85K+</span>
          </div>
          <span className="stat-label text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-bold opacity-0">Interviews Landed</span>
          
          {/* Right Divider (hidden on mobile) */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-white/10 stat-border-y origin-bottom" />
        </div>

        {/* Stat 3 */}
        <div className="flex-1 flex flex-col items-center text-center py-8 relative">
          <div className="stat-number overflow-hidden mb-2">
            <span className="inline-block animate-word text-4xl md:text-5xl lg:text-6xl font-black font-mono text-white tracking-tighter" style={{ transform: "translateY(100px)" }}>99.9%</span>
          </div>
          <span className="stat-label text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-bold opacity-0">Success Rate</span>
          
          {/* Right Divider (hidden on mobile) */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-white/10 stat-border-y origin-top" />
        </div>

        {/* Stat 4 */}
        <div className="flex-1 flex flex-col items-center text-center py-8 relative">
          <div className="stat-number overflow-hidden mb-2">
            <span className="inline-block animate-word text-4xl md:text-5xl lg:text-6xl font-black font-mono text-brand-primary tracking-tighter" style={{ transform: "translateY(100px)" }}>~1m</span>
          </div>
          <span className="stat-label text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-bold opacity-0">Time per Application</span>
        </div>

      </div>
    </section>
  );
}
