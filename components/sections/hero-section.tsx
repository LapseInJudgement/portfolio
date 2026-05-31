"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const aliasRef = useRef<HTMLParagraphElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline
      .add({
        targets: lineRef.current,
        scaleX: [0, 1],
        duration: 800,
      })
      .add(
        {
          targets: titleRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
        },
        "-=400"
      )
      .add(
        {
          targets: aliasRef.current,
          opacity: [0, 1],
          duration: 800,
        },
        "-=600"
      )
      .add(
        {
          targets: aboutRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 1000,
        },
        "-=400"
      );

    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-4 md:px-12 py-12 md:py-32 border-b border-[#F5F5F7]/10"
    >
      <div className="max-w-4xl">
        <div
          ref={lineRef}
          className="w-16 h-px bg-[#F59E0B] mb-8 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
        
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight text-[#F5F5F7] opacity-0"
        >
          Ahmad Kawkab
        </h1>

        <p
          ref={aliasRef}
          className="font-mono text-xs md:text-sm text-[#F5F5F7]/40 tracking-widest uppercase mb-12 md:mb-16 opacity-0"
        >
          @lapseinjudgement
        </p>

        <div
          ref={aboutRef}
          className="max-w-2xl opacity-0"
        >
          <p className="text-[#F5F5F7]/70 leading-relaxed text-base md:text-lg mb-6">
            I build things for the web. A developer navigating the infinite expanse 
            of code and creativity, crafting elegant solutions that bridge complex 
            problems with intuitive experiences.
          </p>
          <p className="text-[#F5F5F7]/50 leading-relaxed text-sm md:text-base">
            Currently focused on full-stack development, open source contributions, 
            and turning caffeine into production-ready code.
          </p>
        </div>

        <div className="mt-12 md:mt-16 flex gap-6">
          <a
            href="#projects"
            className="font-mono text-xs uppercase tracking-widest text-[#030303] bg-[#F5F5F7] px-6 py-3 hover:bg-[#F59E0B] transition-colors duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest text-[#F5F5F7]/70 border border-[#F5F5F7]/20 px-6 py-3 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
