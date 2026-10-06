"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TrendingUp } from "lucide-react";

const creators = [
  { name: "Sarah J.", growth: "Hired at Google", image: "https://i.pravatar.cc/150?u=11" },
  { name: "Michael T.", growth: "Hired at Stripe", image: "https://i.pravatar.cc/150?u=12" },
  { name: "David C.", growth: "Hired at Meta", image: "https://i.pravatar.cc/150?u=13" },
  { name: "Jessica K.", growth: "Hired at Netflix", image: "https://i.pravatar.cc/150?u=14" },
  { name: "Alex M.", growth: "Hired at Amazon", image: "https://i.pravatar.cc/150?u=15" },
  { name: "Emily R.", growth: "Hired at Apple", image: "https://i.pravatar.cc/150?u=16" },
  { name: "Chris L.", growth: "Hired at Spotify", image: "https://i.pravatar.cc/150?u=17" },
  { name: "Daniel H.", growth: "Hired at Tesla", image: "https://i.pravatar.cc/150?u=18" },
];

export function CreatorMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Duplicate array 3 times to create a seamless looping effect
  const marqueeItems = [...creators, ...creators, ...creators];

  useGSAP(() => {
    gsap.to(trackRef.current, {
      xPercent: -33.3333,
      ease: "none",
      duration: 35, // Smooth, slow scroll
      repeat: -1,
    });
  }, { scope: trackRef });

  return (
    <section className="py-24 bg-[#050505] overflow-hidden relative">
      <div className="text-center mb-16 relative z-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Trusted by Top Candidates
        </h2>
        <p className="text-base text-text-mid font-medium">
          Join the network of professionals landing jobs automatically.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Harsher fading edges to blend the scroll */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] via-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] via-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div 
          ref={trackRef} 
          className="flex w-max pt-8 pb-12" 
          onMouseEnter={() => gsap.globalTimeline.pause()}
          onMouseLeave={() => gsap.globalTimeline.play()}
        >
          {marqueeItems.map((creator, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center gap-3 px-8 mx-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              {/* Avatar Image */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden mb-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img 
                  src={creator.image} 
                  alt={creator.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Profile Details */}
              <div className="flex flex-col items-center text-center">
                <div className="text-sm font-bold text-white whitespace-nowrap mb-0.5">
                  {creator.name}
                </div>
                <div className="text-[11px] text-[#A0AEC0] whitespace-nowrap font-medium tracking-wide">
                  {creator.growth}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
