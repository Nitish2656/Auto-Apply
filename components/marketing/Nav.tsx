"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Nav() {
  const container = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll Progress Bar logic (Performant native DOM update)
  useEffect(() => {
    const handleScroll = () => {
      if (!progressBarRef.current) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBarRef.current.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      // Nav drops down after preloader on home page, normal on others
      gsap.from(container.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out",
        delay: pathname === "/" ? 2.5 : 0.2,
      });
    },
    { scope: container, dependencies: [pathname] }
  );

  return (
    <header 
      ref={container} 
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-b-white/5"
    >
      {/* Scroll Progress Bar */}
      <div 
        ref={progressBarRef} 
        className="absolute top-0 left-0 h-[3px] bg-brand-primary z-50 w-0" 
      />
      
      <div className="w-full px-8 h-[72px] flex items-center justify-between mt-[3px]">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Mygomseo style square logo */}
            <div className="w-3.5 h-3.5 bg-brand-primary group-hover:scale-110 transition-transform" />
            <span className="font-heading font-black text-xl tracking-tighter text-white uppercase">ApplyAgent</span>
          </Link>
        </div>
        
        {/* Center Links (Mygomseo style: uppercase, wide tracking, small text) */}
        <nav className="hidden md:flex items-center gap-10">
          <Link 
            href="/#platform" 
            className="group relative text-[10px] font-bold tracking-[0.2em] uppercase transition-colors py-2 text-neutral-400 hover:text-white"
          >
            Platform
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary transition-transform origin-left scale-x-0 group-hover:scale-x-100" />
          </Link>
          
          <Link 
            href="/#pricing" 
            className="group relative text-[10px] font-bold tracking-[0.2em] uppercase transition-colors py-2 text-neutral-400 hover:text-white"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary transition-transform origin-left scale-x-0 group-hover:scale-x-100" />
          </Link>
          
          <Link 
            href="/docs" 
            className={`group relative text-[10px] font-bold tracking-[0.2em] uppercase transition-colors py-2 ${pathname === "/docs" ? "text-white" : "text-text-mid hover:text-white"}`}
          >
            Docs
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary transition-transform origin-left ${pathname === "/docs" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </Link>
          
          <Link 
            href="/changelog" 
            className={`group relative text-[10px] font-bold tracking-[0.2em] uppercase transition-colors py-2 ${pathname === "/changelog" ? "text-white" : "text-text-mid hover:text-white"}`}
          >
            Changelog
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary transition-transform origin-left ${pathname === "/changelog" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </Link>
        </nav>

        {/* Right CTA (Mygomseo style: sharp edges, bright colors) */}
        <div className="flex items-center gap-8">
          <Link 
            href="/auth/signin" 
            className="text-[10px] font-bold tracking-[0.2em] text-text-mid hover:text-white uppercase transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/signin" 
            className="text-[11px] font-bold tracking-[0.15em] bg-brand-primary text-white px-7 py-4 uppercase hover:bg-white hover:text-black transition-colors"
          >
            Start Free
          </Link>
        </div>
      </div>
    </header>
  );
}
