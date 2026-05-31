"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const singularityRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && formRef.current) {
            anime({
              targets: formRef.current.querySelectorAll('.form-field'),
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: "easeOutExpo",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    // Disable all inputs during animation
    inputRefs.current.forEach((input) => {
      if (input) input.disabled = true;
    });

    // Create the black hole animation timeline
    const timeline = anime.timeline({
      easing: "easeInExpo",
    });

    // Step 1: Spawn the singularity (black hole)
    timeline.add({
      targets: singularityRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutExpo",
    });

    // Step 2: Stagger form elements inward with random offsets
    timeline.add({
      targets: formRef.current?.querySelectorAll('.form-field'),
      translateY: [0, 80],
      translateX: () => anime.random(-50, 50),
      opacity: [1, 0],
      scale: [1, 0.5],
      rotate: () => anime.random(-15, 15),
      delay: anime.stagger(80, { from: 'last' }),
      duration: 400,
      easing: "easeInQuad",
    }, "-=200");

    // Step 3: The implosion - form wrapper collapses into black hole
    timeline.add({
      targets: formWrapperRef.current,
      scale: [1, 0],
      rotate: '4turn',
      opacity: [1, 0],
      duration: 800,
      easing: "easeInExpo",
    }, "-=150");

    // Step 4: Singularity grows, pulses bright, then collapses
    timeline.add({
      targets: singularityRef.current,
      scale: [1, 2, 2.5, 0],
      boxShadow: [
        '0 0 60px 30px rgba(245, 158, 11, 0.6)',
        '0 0 120px 60px rgba(245, 158, 11, 0.9)',
        '0 0 200px 100px rgba(245, 158, 11, 1)',
        '0 0 0px 0px rgba(245, 158, 11, 0)'
      ],
      duration: 800,
      easing: "easeInOutQuad",
    }, "-=400");

    await timeline.finished;
    
    // Show success message
    setShowSuccess(true);

    // Wait 2 seconds then bring everything back
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form values
    if (formRef.current) {
      formRef.current.reset();
    }

    // Re-enable inputs
    inputRefs.current.forEach((input) => {
      if (input) input.disabled = false;
    });

    // Hide success, prepare for reappearance
    setShowSuccess(false);

    // Reset form wrapper styles
    if (formWrapperRef.current) {
      formWrapperRef.current.style.transform = 'scale(1) rotate(0deg)';
      formWrapperRef.current.style.opacity = '1';
    }

    // Reset form field styles
    const formFields = formRef.current?.querySelectorAll('.form-field');
    formFields?.forEach((field) => {
      const el = field as HTMLElement;
      el.style.transform = 'translateY(40px) translateX(0) scale(0.8) rotate(0deg)';
      el.style.opacity = '0';
    });

    // Animate form reappearing from the void
    const reappearTimeline = anime.timeline({
      easing: "easeOutExpo",
    });

    // Singularity reappears as a small spark
    reappearTimeline.add({
      targets: singularityRef.current,
      scale: [0, 0.5, 0],
      opacity: [0, 0.8, 0],
      boxShadow: [
        '0 0 0px 0px rgba(245, 158, 11, 0)',
        '0 0 40px 20px rgba(245, 158, 11, 0.6)',
        '0 0 0px 0px rgba(245, 158, 11, 0)'
      ],
      duration: 600,
    });

    // Form fields cascade back in
    reappearTimeline.add({
      targets: formRef.current?.querySelectorAll('.form-field'),
      translateY: [40, 0],
      translateX: [0, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [0, 0],
      delay: anime.stagger(100, { from: 'first' }),
      duration: 600,
      easing: "easeOutExpo",
    }, "-=300");

    await reappearTimeline.finished;
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-4 md:px-12 py-12 md:py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Singularity element - positioned behind form */}
      <div
        ref={singularityRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#000000] rounded-full opacity-0 pointer-events-none z-0"
        style={{
          boxShadow: '0 0 60px 30px rgba(245, 158, 11, 0.6)',
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 w-full">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase mb-4">
            04 / Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F7]">
            Get in Touch
          </h2>
        </div>

        {/* Success message overlay */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <div className="w-px h-16 bg-[#F59E0B] mx-auto mb-8 animate-pulse" />
              <p className="font-mono text-sm text-[#F5F5F7]/70 tracking-wide">
                Transmission encoded into the singularity.
              </p>
              <p className="font-mono text-xs text-[#F5F5F7]/40 mt-4">
                Reconstituting form...
              </p>
            </div>
          </div>
        )}

        <div ref={formWrapperRef} className={showSuccess ? 'invisible' : ''}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="form-field opacity-0">
              <label
                htmlFor="name"
                className="block font-mono text-xs text-[#F5F5F7]/40 tracking-widest uppercase mb-3"
              >
                Name
              </label>
              <input
                ref={(el) => { inputRefs.current[0] = el; }}
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-transparent border-b border-[#F5F5F7]/20 text-[#F5F5F7] py-3 focus:outline-none focus:border-[#F59E0B] transition-colors duration-300 placeholder:text-[#F5F5F7]/20"
                placeholder="Your name"
              />
            </div>

            <div className="form-field opacity-0">
              <label
                htmlFor="email"
                className="block font-mono text-xs text-[#F5F5F7]/40 tracking-widest uppercase mb-3"
              >
                Email
              </label>
              <input
                ref={(el) => { inputRefs.current[1] = el; }}
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-transparent border-b border-[#F5F5F7]/20 text-[#F5F5F7] py-3 focus:outline-none focus:border-[#F59E0B] transition-colors duration-300 placeholder:text-[#F5F5F7]/20"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-field opacity-0">
              <label
                htmlFor="message"
                className="block font-mono text-xs text-[#F5F5F7]/40 tracking-widest uppercase mb-3"
              >
                Message
              </label>
              <textarea
                ref={(el) => { inputRefs.current[2] = el; }}
                id="message"
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-[#F5F5F7]/20 text-[#F5F5F7] py-3 focus:outline-none focus:border-[#F59E0B] transition-colors duration-300 placeholder:text-[#F5F5F7]/20 resize-none"
                placeholder="Your message..."
              />
            </div>

            <div className="form-field opacity-0 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-mono text-xs uppercase tracking-widest text-[#030303] bg-[#F5F5F7] py-4 hover:bg-[#F59E0B] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Transmitting..." : "Send Transmission"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 pt-16 border-t border-[#F5F5F7]/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex gap-6">
              <a
                href="https://github.com/lapseinjudgement"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#F5F5F7]/40 hover:text-[#F59E0B] transition-colors duration-300"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/lapseinjudgement"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#F5F5F7]/40 hover:text-[#F59E0B] transition-colors duration-300"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/ahmadkawkab"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#F5F5F7]/40 hover:text-[#F59E0B] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>

            <p className="font-mono text-xs text-[#F5F5F7]/20">
              {new Date().getFullYear()} Ahmad Kawkab
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
