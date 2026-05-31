"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const projects = [
  {
    name: "Nebula UI",
    description: "A modern React component library with fluid animations and design tokens.",
    stars: 1247,
    language: "TypeScript",
    url: "#",
  },
  
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardsRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(80),
              duration: 700,
              easing: "easeOutExpo",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="px-4 md:px-12 py-12 md:py-32 border-b border-[#F5F5F7]/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase mb-4">
            03 / Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F7]">
            Selected Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F5F7]/10">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.url}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-[#030303] p-6 md:p-8 opacity-0 group block hover:bg-[#0a0a0a] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-[#F5F5F7] group-hover:text-[#F59E0B] transition-colors duration-300">
                  {project.name}
                </h3>
                <svg
                  className="w-4 h-4 text-[#F5F5F7]/30 group-hover:text-[#F59E0B] transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>

              <p className="text-sm text-[#F5F5F7]/50 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-center justify-between font-mono text-xs text-[#F5F5F7]/40">
                <span>{project.language}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  {project.stars.toLocaleString()}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/lapseinjudgement"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#F5F5F7]/50 hover:text-[#F59E0B] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
