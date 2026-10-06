"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users, Play, DollarSign, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const niches = [
  {
    id: "tech",
    name: "Software Eng",
    rpm: "$120k",
    avgViews: "7 Days",
    topics: ["Frontend", "Backend", "Full Stack"],
  },
  {
    id: "design",
    name: "Product Design",
    rpm: "$105k",
    avgViews: "14 Days",
    topics: ["UI/UX", "UX Research", "Web Design"],
  },
  {
    id: "marketing",
    name: "Marketing",
    rpm: "$85k",
    avgViews: "10 Days",
    topics: ["Growth", "Content", "SEO"],
  },
  {
    id: "sales",
    name: "Sales",
    rpm: "$95k",
    avgViews: "5 Days",
    topics: ["SDR", "Account Executive", "RevOps"],
  },
  {
    id: "data",
    name: "Data Science",
    rpm: "$130k",
    avgViews: "12 Days",
    topics: ["Machine Learning", "Data Analyst", "Data Engineer"],
  },
];

export function CategoryShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const activeNiche = niches[activeIndex];

  useGSAP(
    () => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      });

      headerTl.fromTo(".niche-badge", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".animate-niche-line-1 .animate-word",
        { y: 100 },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(".animate-niche-line-2 .animate-word",
        { y: 100 },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.9"
      );

      gsap.fromTo(".niche-nav-item", 
        { x: -20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".niche-container",
            start: "top 80%",
          },
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(".niche-active-card", 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".niche-container",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          delay: 0.3,
        }
      );
    },
    { scope: container }
  );

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % niches.length);
    }, 4000); // Switch every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Animate card content when active index changes
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section ref={container} className="py-24 lg:py-32 bg-black overflow-hidden border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="niche-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 backdrop-blur-md mb-6">
            <Activity className="w-3 h-3 text-brand-primary animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest">
              Universal Adaptation
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] flex flex-col items-center">
            <div className="flex gap-[0.25em] overflow-hidden py-1 animate-niche-line-1">
              {["DOMINATE"].map((word, i) => (
                <span key={i} className="inline-block animate-word text-white" style={{ transform: "translateY(100px)" }}>
                  {word}
                </span>
              ))}
            </div>
            <div className="flex gap-[0.25em] overflow-hidden py-1 animate-niche-line-2">
              {["ANY", "INDUSTRY."].map((word, i) => (
                <span key={i} className="inline-block animate-word text-neutral-600" style={{ transform: "translateY(100px)" }}>
                  {word}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Interactive Tabs Layout */}
        <div 
          className="niche-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          
          {/* Left Column: Sleek Navigation */}
          <div className="lg:col-span-5 flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 snap-x hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            {niches.map((niche, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={niche.id}
                  onClick={() => setActiveIndex(i)}
                  className={`niche-nav-item relative cursor-pointer flex flex-col justify-center text-left py-5 px-6 rounded-none lg:rounded-xl transition-all duration-300 snap-center shrink-0 w-[200px] lg:w-full overflow-hidden group border-l-2 lg:border-l-4
                    ${isActive ? "border-brand-primary bg-brand-primary/5" : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"}
                  `}
                >
                  <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-600 group-hover:text-neutral-400"}`}>
                    {niche.name}
                  </h3>
                  
                  {/* Progress bar for auto-play */}
                  {isActive && isAutoPlaying && (
                    <div className="absolute bottom-0 left-0 h-[2px] bg-brand-primary/50 animate-[progress_4s_linear]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Premium Active Card with Looping Animation */}
          <div className="lg:col-span-7 niche-active-card w-full">
            {/* Spinning Border Wrapper */}
            <div className="relative rounded-3xl p-[1px] overflow-hidden group">
              {/* Looping Spinning Gradient */}
              <div 
                className="absolute inset-0 z-0 opacity-50 mix-blend-screen"
                style={{
                  background: "conic-gradient(from 0deg, transparent 70%, #9D00FF 100%)",
                  animation: "spin 3s linear infinite"
                }}
              />
              {/* Outer Glow */}
              <div 
                className="absolute inset-0 z-0 opacity-30 blur-xl"
                style={{
                  background: "conic-gradient(from 0deg, transparent 70%, #9D00FF 100%)",
                  animation: "spin 3s linear infinite"
                }}
              />

              <div 
                ref={cardRef}
                className="w-full h-full bg-black/90 backdrop-blur-3xl relative z-10 rounded-[calc(1.5rem-1px)] p-8 sm:p-10 flex flex-col gap-10 border border-white/5 shadow-2xl"
              >
                
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
                  <div>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/10 text-white uppercase tracking-widest">
                        High Salary
                      </span>
                      <span className="text-[10px] font-mono px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary uppercase tracking-widest">
                        Evergreen
                      </span>
                    </div>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                      {activeNiche.name}
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-8 h-8 text-brand-primary" />
                  </div>
                </div>

                {/* Topics - Ultra minimalist */}
                <div>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
                    Top Matched Roles
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activeNiche.topics.map((topic, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-tight bg-white/5 border border-white/10 px-4 py-2 rounded-none">
                        <Play className="w-3 h-3 text-brand-primary shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats Grid - High Contrast */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-transparent border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-brand-primary" />
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Avg. Salary</span>
                    </div>
                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{activeNiche.rpm}</div>
                  </div>
                  <div className="bg-transparent border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-brand-primary" />
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Time to Hire</span>
                    </div>
                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{activeNiche.avgViews}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Required styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </section>
  );
}
