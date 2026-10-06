"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="group relative inline-flex overflow-hidden text-neutral-500 transition-colors">
      <div className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[120%]">
        {children}
        <ArrowUpRight className="w-3 h-3 ml-1" />
      </div>
      <div className="absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-[120%] group-hover:translate-y-0 text-white">
        {children}
        <ArrowUpRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  );
};

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
  </svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor" className={className}>
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className={className}>
    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
  </svg>
);

export function Footer() {
  const container = useRef<HTMLElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);
  const [whiteHeight, setWhiteHeight] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const [isHovering, setIsHovering] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!whiteSectionRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWhiteHeight(entries[0].target.clientHeight);
    });
    observer.observe(whiteSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (whiteSectionRef.current) {
      const rect = whiteSectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useGSAP(() => {
    // Triggered Watermark Text Reveal when spacer comes into view
    gsap.fromTo(watermarkRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-spacer",
          start: "top 90%",
          toggleActions: "play none none reset",
        }
      }
    );
  }, { scope: container });

  return (
    <footer ref={container} className="relative z-0 flex flex-col border-t border-white/5">
      {/* Top Section */}
      <div className="w-full bg-black relative z-10 pt-24 pb-24 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-brand-primary rounded-lg rotate-12 flex items-center justify-center shadow-[0_0_20px_rgba(157,0,255,0.4)]">
              <div className="w-2 h-2 bg-white rounded-sm" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white uppercase">ApplyAgent</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            The agent <br />
            that <span className="text-neutral-600">applies itself.</span>
          </h3>
          <p className="text-neutral-400 text-sm md:text-base max-w-sm font-medium mb-8">
            Autonomous job searching, tailoring, and applying. Welcome to the future of job hunting.
          </p>

          <Link href="/auth/signin" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black hover:border-white">
            <div className="flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[150%]">
              Start Free <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-[150%] group-hover:translate-y-0">
              Start Free <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
        
        {/* Links Grid & Socials */}
        <div className="lg:col-span-6 flex flex-col h-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 pt-4">
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-4">Platform</h4>
              <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-500">
                <li><AnimatedLink href="/#platform">Features</AnimatedLink></li>
                <li><AnimatedLink href="/pricing">Pricing</AnimatedLink></li>
                <li><AnimatedLink href="/changelog">Changelog</AnimatedLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-4">Company</h4>
              <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-500">
                <li><AnimatedLink href="#">About Us</AnimatedLink></li>
                <li><AnimatedLink href="#">Careers</AnimatedLink></li>
                <li><AnimatedLink href="#">Contact</AnimatedLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-4">Legal</h4>
              <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-500">
                <li><AnimatedLink href="#">Privacy Policy</AnimatedLink></li>
                <li><AnimatedLink href="#">Terms of Service</AnimatedLink></li>
              </ul>
            </div>
          </div>

          {/* Social Icons - Right Aligned at Bottom */}
          <div className="flex items-center gap-6 mt-auto pt-16 justify-start sm:justify-end">
            <Link href="#" className="text-neutral-500 hover:text-white hover:-translate-y-1 transition-all">
              <Twitter className="w-[18px] h-[18px]" />
            </Link>
            <Link href="#" className="text-neutral-500 hover:text-white hover:-translate-y-1 transition-all">
              <Github className="w-[18px] h-[18px]" />
            </Link>
            <Link href="#" className="text-neutral-500 hover:text-white hover:-translate-y-1 transition-all">
              <Linkedin className="w-[18px] h-[18px]" />
            </Link>
            <Link href="#" className="text-neutral-500 hover:text-white hover:-translate-y-1 transition-all">
              <Youtube className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
      </div>
      
      {/* Spacer to allow scrolling past black section to reveal fixed white section */}
      <div className="footer-spacer w-full relative z-0 pointer-events-none" style={{ height: whiteHeight }} />

      {/* Revealed White Theme Section (Fixed in background) */}
      <div 
        ref={whiteSectionRef} 
        className="w-full bg-white fixed bottom-0 left-0 right-0 z-0 pt-24 pb-8 border-t border-white/10"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* 1. Base Faint Grid from Hero */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-[0.15]">
          <div 
            className="absolute w-[200vw] h-[200vh]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.8) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.8) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(1000px) rotateX(60deg) translateY(-400px) translateZ(-200px)',
              maskImage: 'linear-gradient(to bottom, transparent 5%, black 35%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 35%, black 80%, transparent 100%)'
            }}
          />
        </div>

        {/* 2. Interactive Spotlight Glowing Grid */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center transition-opacity duration-500"
          style={{
            opacity: isHovering ? 0.8 : 0,
            maskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 100%)`
          }}
        >
          <div 
            className="absolute w-[200vw] h-[200vh]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(100,0,255,0.6) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(100,0,255,0.6) 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(1000px) rotateX(60deg) translateY(-400px) translateZ(-200px)',
            }}
          />
        </div>

        {/* Massive Brand Name Background */}
        <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none mb-12 relative z-10">
          <h1 ref={watermarkRef} className="text-[15vw] font-black uppercase tracking-tighter leading-none text-black whitespace-nowrap pt-4">
            ApplyAgent
          </h1>
        </div>

        {/* Bottom Bar (Light Mode) */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
            &copy; {currentYear} ApplyAgent Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3 bg-black/5 border border-black/10 px-4 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-black text-[10px] font-mono uppercase tracking-widest font-bold">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
