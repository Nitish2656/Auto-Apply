"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className = "", delay = 0 }: BlurTextProps) {
  const container = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".blur-char",
        { 
          filter: "blur(24px)", 
          opacity: 0, 
          scale: 1.2,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
          delay: delay,
        }
      );
    },
    { scope: container }
  );

  return (
    <span ref={container} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="blur-char inline-block whitespace-pre"
          style={{ willChange: "filter, opacity, transform" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
