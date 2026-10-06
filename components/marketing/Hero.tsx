"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play, Mouse, Target, BarChart3, FileText, Cpu } from "lucide-react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Setup initial states
      gsap.set(".hero-fade", { opacity: 0, y: 30 });
      gsap.set(".hero-card", { opacity: 0, x: 30 });
      gsap.set(".hero-image", { opacity: 0, x: 40 });

      // Animate left side content
      gsap.to(".hero-fade", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 2.5,
      });

      // Animate right side image
      gsap.to(".hero-image", {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 2.8,
      });

      // Animate floating cards over the image
      gsap.to(".hero-card", {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)",
        delay: 3.2,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full bg-[#fcfcfd] overflow-hidden flex flex-col justify-center pt-32 pb-24"
    >
      {/* Background Soft Glows matching reference */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 blur-[150px] rounded-full opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-0 relative z-10">
        
        {/* LEFT COLUMN: Content */}
        <div className="flex flex-col items-start justify-center pt-4 lg:pr-12 relative z-20">
          
          {/* Top Badge */}
          <div className="hero-fade inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-brand-primary" />
            <span className="text-sm font-bold text-neutral-600 tracking-wide">
              Intelligent Job Application Engine
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-fade text-[3rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black tracking-tight text-neutral-900 mb-6 leading-[1.05]">
            Automate Your <br />
            Job Search <br />
            <span className="text-brand-primary">With AI</span>
          </h1>

          {/* Subtext */}
          <p className="hero-fade text-base sm:text-lg text-neutral-500 max-w-[500px] mb-10 leading-relaxed font-medium">
            ApplyAgent is an AI-powered assistant that scans listings, tailors your resume, and auto-applies to jobs on your behalf, 24/7.
          </p>

          {/* CTAs */}
          <div className="hero-fade flex flex-col sm:flex-row items-center gap-6 mb-16 w-full sm:w-auto">
            <Link
              href="/auth/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brand-primary/20"
            >
              Start Applying Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-brand-primary transition-colors bg-white shadow-sm">
                <Play className="w-4 h-4 text-brand-primary ml-1" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-neutral-900">Watch Our Story</span>
                <span className="text-xs text-neutral-500 font-medium">2 min demo</span>
              </div>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="hero-fade flex flex-wrap items-center gap-10 xl:gap-16 mb-16">
            <div>
              <div className="text-2xl xl:text-3xl font-black text-neutral-900 mb-1">50k+</div>
              <div className="text-[10px] xl:text-xs text-neutral-400 font-medium tracking-wide">Jobs Scanned</div>
            </div>
            <div className="w-px h-10 bg-neutral-200 hidden sm:block" />
            <div>
              <div className="text-2xl xl:text-3xl font-black text-neutral-900 mb-1">24/7</div>
              <div className="text-[10px] xl:text-xs text-neutral-400 font-medium tracking-wide">Agent Uptime</div>
            </div>
            <div className="w-px h-10 bg-neutral-200 hidden sm:block" />
            <div>
              <div className="text-2xl xl:text-3xl font-black text-neutral-900 mb-1">3x</div>
              <div className="text-[10px] xl:text-xs text-neutral-400 font-medium tracking-wide">Interview Rate</div>
            </div>
            <div className="w-px h-10 bg-neutral-200 hidden xl:block" />
            <div>
              <div className="text-2xl xl:text-3xl font-black text-neutral-900 mb-1">98%</div>
              <div className="text-[10px] xl:text-xs text-neutral-400 font-medium tracking-wide">User Satisfaction</div>
            </div>
          </div>

          {/* Bottom Left Card (Live Status) */}
          <div className="hero-fade bg-white/80 backdrop-blur-md border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl p-4 flex items-center gap-4 max-w-sm w-full">
            <div className="w-14 h-14 rounded-xl bg-brand-primary flex items-center justify-center relative overflow-hidden shadow-inner">
               <Cpu className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-neutral-900 mb-0.5">Live Agent Status</h3>
              <p className="text-[10px] text-neutral-500 leading-tight">Actively applying to Software Engineer roles.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Image & Floating Cards */}
        <div className="relative h-[600px] lg:h-auto min-h-[700px] flex items-center justify-end w-full">
          
          {/* Main 3D Image Container */}
          {/* Using object-contain and positioning it to the right so it doesn't zoom in uncomfortably */}
          <div className="hero-image absolute inset-0 lg:-right-[5vw] flex items-center justify-center lg:justify-end z-0">
             <img 
               src="/images/hero-robot.png" 
               alt="AI Assistant" 
               className="w-full h-full object-contain object-center lg:object-right max-w-[700px] xl:max-w-[850px] drop-shadow-2xl"
             />
          </div>

          {/* Floating Cards Container */}
          <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
            
            {/* Top Card */}
            <div className="hero-card absolute top-[15%] right-[2%] bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] p-3.5 flex items-center gap-3 w-[260px]">
               <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-brand-primary" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-neutral-900">Smart Targeting</h4>
                 <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">Finds roles matching your exact skills.</p>
               </div>
               {/* Connector Line */}
               <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-[1.5px] bg-gradient-to-r from-transparent to-brand-primary/20" />
               <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border-[2.5px] border-brand-primary -translate-x-1" />
            </div>

            {/* Middle Card */}
            <div className="hero-card absolute top-[40%] right-[-5%] bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] p-3.5 flex items-center gap-3 w-[260px]">
               <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-orange-500" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-neutral-900">Dynamic Resumes</h4>
                 <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">Tailors your resume for every application.</p>
               </div>
               {/* Connector Line */}
               <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-[1.5px] bg-gradient-to-r from-transparent to-orange-500/20" />
               <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border-[2.5px] border-orange-500 -translate-x-1" />
            </div>

            {/* Bottom Card */}
            <div className="hero-card absolute top-[65%] right-[2%] bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] p-3.5 flex items-center gap-3 w-[260px]">
               <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-neutral-900">Auto-Apply</h4>
                 <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">Submits applications while you sleep.</p>
               </div>
               {/* Connector Line */}
               <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-[1.5px] bg-gradient-to-r from-transparent to-blue-500/20" />
               <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border-[2.5px] border-blue-500 -translate-x-1" />
            </div>
            
          </div>
          
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 right-10 flex flex-col items-center gap-2 hidden lg:flex">
         <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase [writing-mode:vertical-lr]">Scroll Down</span>
         <Mouse className="w-4 h-4 text-neutral-400 mt-2" />
         <div className="w-px h-8 bg-neutral-200 mt-2 relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-1/2 bg-neutral-400 animate-[scrollDown_2s_ease-in-out_infinite]" />
         </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
