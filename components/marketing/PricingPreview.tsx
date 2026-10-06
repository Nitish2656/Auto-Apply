"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PricingPreview() {
  const container = useRef<HTMLDivElement>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  useGSAP(
    () => {
      // Header Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      });

      headerTl.fromTo(".pricing-badge", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".animate-pricing-line-1 .animate-word",
        { y: 100 },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(".animate-pricing-line-2 .animate-word",
        { y: 100 },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.9"
      )
      .fromTo(".pricing-toggle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=1"
      );

      // Cards Animation
      gsap.fromTo(".pricing-card", 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { 
            trigger: ".pricing-grid", 
            start: "top 80%",
            toggleActions: "play none none reset"
          },
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "expo.out"
        }
      );

      gsap.fromTo(".cta-section", 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { 
            trigger: ".cta-section", 
            start: "top 85%",
            toggleActions: "play none none reset"
          },
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "expo.out"
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="pricing" ref={container} className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="pricing-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 backdrop-blur-md mb-6">
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] flex flex-col items-center">
            <div className="flex gap-[0.25em] overflow-hidden py-1 animate-pricing-line-1">
              {["SCALE", "YOUR"].map((word, i) => (
                <span key={i} className="inline-block animate-word text-white" style={{ transform: "translateY(100px)" }}>
                  {word}
                </span>
              ))}
            </div>
            <div className="flex gap-[0.25em] overflow-hidden py-1 animate-pricing-line-2">
              {["CAREER."].map((word, i) => (
                <span key={i} className="inline-block animate-word text-neutral-600" style={{ transform: "translateY(100px)" }}>
                  {word}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Functional Billing Toggle */}
        <div className="pricing-toggle flex justify-center mb-16 relative z-20">
          
          <div className="relative inline-flex items-center bg-[#050505] border border-white/10 rounded-full p-1.5 shadow-inner">
            
            {/* Floating Badge */}
            <div className="absolute -top-3 -right-6 animate-[pulse_2s_ease-in-out_infinite] z-20 pointer-events-none">
              <span className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(100,0,255,0.5)] border border-brand-primary/50">
                Save 20%
              </span>
            </div>

            {/* Sliding Pill Indicator */}
            <div 
              className="absolute top-1.5 bottom-1.5 w-[140px] bg-white/10 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/5 shadow-md"
              style={{
                transform: billingCycle === "monthly" ? "translateX(0)" : "translateX(140px)"
              }}
            />

            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 w-[140px] py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
                billingCycle === "monthly" ? "text-white drop-shadow-md" : "text-neutral-500 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 w-[140px] py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
                billingCycle === "yearly" ? "text-white drop-shadow-md" : "text-neutral-500 hover:text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center max-w-6xl mx-auto">
          
          {/* Starter */}
          <div className="pricing-card p-[1px] relative rounded-3xl group overflow-hidden">
            {/* Spinning Border Wrap (Visible on Hover) */}
            <div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-50 mix-blend-screen rounded-3xl transition-opacity duration-500"
              style={{
                background: "conic-gradient(from 0deg, transparent 70%, #9D00FF 100%)",
                animation: "spin 3s linear infinite"
              }}
            />

            <div className="relative z-10 p-10 border border-white/10 group-hover:border-white/5 bg-[#050505] rounded-[calc(1.5rem-1px)] flex flex-col h-full transition-colors duration-500">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Starter</h3>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter flex items-end gap-2">
                Free
              </div>
              <div className="text-sm text-neutral-500 mb-8 font-medium">Forever. No credit card required.</div>
              
              <ul className="flex-1 space-y-5 mb-10 text-sm font-medium text-neutral-400">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> 1 Resume Profile</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> 20 auto-applies / month</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> Basic tracker</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> LinkedIn only</li>
              </ul>
              <Link href="/auth/signin" className="w-full py-4 text-center rounded-xl border border-white/20 text-white font-bold group-hover:bg-white group-hover:text-black transition-colors uppercase tracking-widest text-sm">
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Pro */}
          <div className="pricing-card p-[1px] relative rounded-3xl group overflow-hidden">
            {/* Spinning Border Wrap (Visible on Hover) */}
            <div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-50 mix-blend-screen rounded-3xl transition-opacity duration-500"
              style={{
                background: "conic-gradient(from 0deg, transparent 70%, #9D00FF 100%)",
                animation: "spin 3s linear infinite"
              }}
            />

            <div className="relative z-10 p-10 border border-white/10 group-hover:border-white/5 bg-[#050505] rounded-[calc(1.5rem-1px)] flex flex-col h-full transition-colors duration-500">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Pro</h3>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter flex items-end gap-2">
                {billingCycle === "monthly" ? "$49" : "$39"} 
                <span className="text-lg font-medium text-neutral-500 mb-2">/mo</span>
              </div>
              <div className="text-sm text-neutral-500 mb-8 font-medium h-5">
                {billingCycle === "yearly" ? "Billed $468 yearly" : ""}
              </div>

              <ul className="flex-1 space-y-5 mb-10 text-sm font-medium text-neutral-400">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> 5 Resume Profiles</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> 150 auto-applies / month</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> Advanced analytics</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> LinkedIn + Indeed + Workday</li>
              </ul>
              <Link href="/auth/signin" className="w-full py-4 text-center rounded-xl border border-white/20 text-white font-bold group-hover:bg-white group-hover:text-black transition-colors uppercase tracking-widest text-sm">
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Scale */}
          <div className="pricing-card p-[1px] relative rounded-3xl group overflow-hidden">
            {/* Spinning Border Wrap (Visible on Hover) */}
            <div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-50 mix-blend-screen rounded-3xl transition-opacity duration-500"
              style={{
                background: "conic-gradient(from 0deg, transparent 70%, #9D00FF 100%)",
                animation: "spin 3s linear infinite"
              }}
            />

            <div className="relative z-10 p-10 border border-white/10 group-hover:border-white/5 bg-[#050505] rounded-[calc(1.5rem-1px)] flex flex-col h-full transition-colors duration-500">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Scale</h3>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter flex items-end gap-2">
                {billingCycle === "monthly" ? "$199" : "$159"} 
                <span className="text-lg font-medium text-neutral-500 mb-2">/mo</span>
              </div>
              <div className="text-sm text-neutral-500 mb-8 font-medium h-5">
                {billingCycle === "yearly" ? "Billed $1908 yearly" : ""}
              </div>

              <ul className="flex-1 space-y-5 mb-10 text-sm font-medium text-neutral-400">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> Unlimited Profiles</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> Unlimited applies</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> Full analytics suite</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/40" /> Custom ATS Integrations</li>
              </ul>
              <Link href="/pricing" className="w-full py-4 text-center rounded-xl border border-white/20 text-white font-bold group-hover:bg-white group-hover:text-black transition-colors uppercase tracking-widest text-sm">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="cta-section mt-32 text-center bg-black border border-white/10 rounded-[3rem] p-12 md:p-32 relative overflow-hidden group shadow-2xl">
          
          {/* Animated Background Glow (Orb) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/20 blur-[120px] rounded-[100%] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out pointer-events-none" />
          
          {/* Dot Grid Pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-1000"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
          
          {/* Radial Fade out for grid so edges are black */}
          <div className="absolute inset-0 z-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] pointer-events-none" />
          
          {/* Floating Accents */}
          <div className="absolute top-16 left-16 hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">No API Keys Required</span>
          </div>

          <div className="absolute bottom-16 right-16 hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-300">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Cloud Rendering</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter text-white mb-10 leading-[0.85]">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">Automate?</span>
            </h2>
            
            <Link
              href="/auth/signin"
              className="relative inline-flex px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 items-center justify-center gap-3 text-sm overflow-hidden group/btn shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
              
              <span className="relative z-10 flex items-center gap-3">
                Start for Free <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}
