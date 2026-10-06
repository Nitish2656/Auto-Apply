"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, BrainCircuit, FileText, Clapperboard, Send } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    title: "Research",
    subtitle: "Finds the Roles",
    desc: "Constantly scans LinkedIn, Indeed, and company boards for roles matching your exact profile.",
    icon: Search,
    visual: (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2 mb-4">
          <span className="text-neutral-500">Role Title</span>
          <span className="text-signal-green">Match %</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-sm border border-brand-primary/30">
          <span className="text-white">&quot;Senior Frontend Engineer&quot;</span>
          <span className="text-signal-green">98%</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono p-2">
          <span className="text-white">&quot;React Developer&quot;</span>
          <span className="text-signal-green">92%</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono p-2 opacity-30">
          <span className="text-white">&quot;Full Stack Engineer&quot;</span>
          <span className="text-signal-red">45%</span>
        </div>
      </div>
    ),
  },
  {
    title: "Analyze",
    subtitle: "ATS Scoring Matrix",
    desc: "Scores job descriptions against your resume to identify missing keywords and predict interview probability.",
    icon: BrainCircuit,
    visual: (
      <div className="flex flex-col h-full justify-center space-y-3 relative">
        <div className="absolute top-0 right-0 text-[10px] font-mono text-brand-primary border border-brand-primary/30 px-2 py-1 rounded-sm bg-brand-primary/10 animate-pulse">
          LOCKED
        </div>
        <div className="text-xs font-mono text-neutral-500 mb-2">TARGET: Senior Frontend Engineer</div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-white/70">
            <span>Match Prediction</span>
            <span>94%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-signal-green w-[94%]" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-white/70">
            <span>Interview Probability</span>
            <span>8.2/10</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-brand-primary w-[82%]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Tailor",
    subtitle: "Writes Cover Letter",
    desc: "Generates a highly-tailored cover letter and optimizes your resume keywords for the specific ATS system.",
    icon: FileText,
    visual: (
      <div className="h-full flex flex-col font-mono text-xs">
        <div className="flex gap-2 border-b border-white/10 pb-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-signal-red" />
          <div className="w-2 h-2 rounded-full bg-signal-yellow" />
          <div className="w-2 h-2 rounded-full bg-signal-green" />
        </div>
        <div className="text-neutral-500 mb-2">{"// cover_letter_gen.ts"}</div>
        <div className="text-brand-primary mb-1">const <span className="text-white">coverLetter</span> = [</div>
        <div className="pl-4 text-white/80 space-y-1">
          <div>&quot;I am writing to express my interest&quot;,</div>
          <div className="bg-white/10 border-l-2 border-brand-primary pl-2">&quot;in the Senior Frontend Engineer position.&quot;,</div>
          <div>&quot;With 5 years of React experience...&quot;</div>
        </div>
        <div className="text-brand-primary mt-1">];</div>
      </div>
    ),
  },
  {
    title: "Fill Forms",
    subtitle: "Navigates Portals",
    desc: "Automatically navigates complex Workday and Greenhouse forms, filling every field with 100% accuracy.",
    icon: Clapperboard,
    visual: (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="flex items-end justify-center gap-1 w-full h-12">
          {[
            34, 65, 23, 87, 45, 92, 12, 54, 76, 33, 88, 41, 
            96, 21, 67, 43, 81, 19, 58, 73, 29, 90, 48, 62
          ].map((h, i) => (
            <div 
              key={i} 
              className="w-1.5 bg-brand-primary rounded-t-sm animate-pulse" 
              style={{ 
                height: `${h}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '1s'
              }} 
            />
          ))}
        </div>
        <div className="w-full flex items-center gap-3">
          <div className="text-[10px] font-mono text-neutral-500">APPLYING</div>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-primary to-purple-400 w-2/3 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <div className="text-[10px] font-mono text-white">67%</div>
        </div>
      </div>
    ),
  },
  {
    title: "Submit",
    subtitle: "Submits Applications",
    desc: "Submits applications instantly and tracks statuses across all platforms (LinkedIn, Workday, Lever).",
    icon: Send,
    visual: (
      <div className="h-full flex flex-col justify-center space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="w-8 h-8 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-500">IN</div>
          <span className="text-neutral-400 flex-1 truncate">LinkedIn_EasyApply</span>
          <span className="font-bold text-signal-green">LIVE</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="w-8 h-8 rounded-md bg-orange-500/20 flex items-center justify-center text-orange-500">WD</div>
          <span className="text-neutral-400 flex-1 truncate">Workday_Application</span>
          <span className="font-bold text-signal-green">LIVE</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="w-8 h-8 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-500">GH</div>
          <span className="text-neutral-400 flex-1 truncate">Greenhouse_Form</span>
          <span className="font-bold text-brand-primary">UPLOADING</span>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Pin the section and draw the progress line
      ScrollTrigger.create({
        trigger: trackContainerRef.current,
        start: "top center",
        end: "bottom center",
        animation: gsap.to(progressRef.current, {
          height: "100%",
          ease: "none",
        }),
        scrub: true,
      });

      // Animate the main header
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".how-it-works-header",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      });

      headerTl.fromTo(".how-it-works-badge", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".animate-line-1 .animate-word",
        { y: 100 },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(".animate-line-2 .animate-word",
        { y: 100 },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.9"
      )
      .fromTo(".how-it-works-subtext",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );

      // Animate each step as it scrolls into view
      const stepElements = gsap.utils.toArray<HTMLElement>(".workflow-step");
      
      stepElements.forEach((step, i) => {
        const textElements = step.querySelectorAll(".reveal-text");
        const iconElement = step.querySelector(".reveal-icon");
        const visualElement = step.querySelector(".reveal-visual");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          }
        });

        tl.to(iconElement, {
          borderColor: "#6400FF",
          color: "#fff",
          boxShadow: "0 0 30px rgba(100,0,255,0.3)",
          scale: 1.1,
          duration: 0.4,
        })
        .to(textElements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out"
        }, "<")
        .to(visualElement, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.5,
          ease: "back.out(1.2)"
        }, "<0.2");
      });
    },
    { scope: container }
  );

  return (
    <section id="platform" ref={container} className="py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-40 flex flex-col items-center justify-center how-it-works-header">
          <div className="inline-block mb-6 how-it-works-badge">
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em] px-4 py-2 border border-brand-primary/30 rounded-full bg-brand-primary/10 backdrop-blur-md">
              System Architecture
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] flex flex-col items-center">
            <div className="flex gap-[0.25em] overflow-hidden py-1 animate-line-1">
              {["ONE", "PIPELINE."].map((word, i) => (
                <span key={i} className="inline-block animate-word text-white" style={{ transform: "translateY(100px)" }}>
                  {word}
                </span>
              ))}
            </div>
            <div className="flex gap-[0.25em] overflow-hidden py-1 animate-line-2">
              {["EVERYTHING", "HANDLED."].map((word, i) => (
                <span key={i} className="inline-block animate-word text-neutral-600" style={{ transform: "translateY(100px)" }}>
                  {word}
                </span>
              ))}
            </div>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl font-medium how-it-works-subtext">
            Stop grinding on job boards. The Autonomous Agent handles the entire application lifecycle, running 24/7 so you can focus on interview prep.
          </p>
        </header>

        <div className="relative" ref={trackContainerRef}>
          {/* Vertical Track Line (Hidden on mobile) */}
          <div ref={trackRef} className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
            {/* Animated Progress Line */}
            <div ref={progressRef} className="w-full bg-gradient-to-b from-brand-primary via-purple-500 to-brand-primary shadow-[0_0_15px_rgba(100,0,255,0.5)] h-0 origin-top" />
          </div>

          <div className="space-y-32 relative pb-20">
            {steps.map((step, i) => {
              const isEven = i % 2 !== 0;
              const Icon = step.icon;

              return (
                <article key={i} className={`workflow-step group flex flex-col items-center gap-12 lg:gap-24 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Text Content */}
                  <div className={`flex-1 w-full md:w-auto flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                    <div className="reveal-text opacity-40 translate-y-4 flex items-center gap-4 mb-4">
                      <span className="font-mono text-xl text-brand-primary font-bold">/0{i + 1}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-800 pb-1">
                        {step.subtitle}
                      </span>
                    </div>
                    <h3 className="reveal-text opacity-40 translate-y-4 text-4xl lg:text-5xl font-black font-heading uppercase mb-4 tracking-tighter">
                      {step.title}
                    </h3>
                    <p className="reveal-text opacity-40 translate-y-4 text-base lg:text-lg text-neutral-400 leading-relaxed max-w-md font-medium">
                      {step.desc}
                    </p>
                  </div>

                  {/* Center Node Icon */}
                  <div className="reveal-icon hidden md:flex relative z-10 w-16 h-16 bg-[#0A0A0A] border-[2px] border-[#222] rounded-full items-center justify-center shrink-0 transition-colors duration-500 shadow-2xl text-neutral-600">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Visual UI Card */}
                  <div className="flex-1 w-full md:w-auto">
                    <div className={`reveal-visual opacity-0 scale-95 ${isEven ? 'translate-x-8' : '-translate-x-8'} w-full max-w-sm mx-auto md:mx-0`}>
                      <div className="w-full h-48 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 relative overflow-hidden hover:border-brand-primary/50 transition-colors duration-500 group-hover:shadow-[0_0_40px_rgba(100,0,255,0.1)]">
                        {step.visual}
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
