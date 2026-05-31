"use client";

import { useEffect, useRef, useCallback } from "react";
import anime from "animejs";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  distance: number;
}

interface CosmicBackgroundProps {
  activeSection: number;
}

export function CosmicBackground({ activeSection }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const phaseRef = useRef(0);
  const transitionProgressRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.min(400, Math.floor((width * height) / 4000));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 50,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Phase transition animation
    const targetPhase = activeSection;
    if (phaseRef.current !== targetPhase) {
      anime({
        targets: transitionProgressRef,
        current: 1,
        duration: 1500,
        easing: "easeInOutQuad",
        update: () => {
          phaseRef.current = targetPhase;
        },
      });
    }

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;

      // Draw Milky Way nebula for phase 0 (hero)
      if (phaseRef.current === 0) {
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          canvas.width * 0.6
        );
        gradient.addColorStop(0, "rgba(245, 158, 11, 0.03)");
        gradient.addColorStop(0.5, "rgba(245, 158, 11, 0.01)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw vortex glow for phases 2-3
      if (phaseRef.current >= 2) {
        const glowIntensity = phaseRef.current === 3 ? 0.15 : 0.08;
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          300
        );
        gradient.addColorStop(0, `rgba(245, 158, 11, ${glowIntensity})`);
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${glowIntensity * 0.3})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Event horizon ring for phase 3
        if (phaseRef.current === 3) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 80 + Math.sin(time * 2) * 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.3 + Math.sin(time * 3) * 0.1})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Inner black hole
          const blackHoleGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            60
          );
          blackHoleGradient.addColorStop(0, "#000000");
          blackHoleGradient.addColorStop(0.8, "#000000");
          blackHoleGradient.addColorStop(1, "transparent");
          ctx.fillStyle = blackHoleGradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render particles based on phase
      particlesRef.current.forEach((particle) => {
        let x = particle.baseX;
        let y = particle.baseY;
        let opacity = particle.opacity;
        let size = particle.size;

        const dx = centerX - particle.baseX;
        const dy = centerY - particle.baseY;
        const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        switch (phaseRef.current) {
          case 0: // Space - gentle twinkling
            opacity = particle.opacity * (0.5 + Math.sin(time * particle.speed + particle.angle) * 0.5);
            break;

          case 1: // Warp - stretch toward center
            const warpStrength = Math.max(0, 1 - distanceToCenter / (canvas.width * 0.5));
            x = particle.baseX + Math.cos(angle) * warpStrength * 100;
            y = particle.baseY + Math.sin(angle) * warpStrength * 150;
            size = particle.size * (1 + warpStrength * 2);
            break;

          case 2: // Vortex - swirl around center
            const swirlSpeed = time * 0.5 + distanceToCenter * 0.005;
            const swirlRadius = distanceToCenter * 0.8;
            x = centerX + Math.cos(angle + swirlSpeed) * swirlRadius;
            y = centerY + Math.sin(angle + swirlSpeed) * swirlRadius;
            opacity = particle.opacity * Math.min(1, distanceToCenter / 200);
            break;

          case 3: // Collapse - pull into center
            const collapseStrength = Math.min(1, 150 / distanceToCenter);
            const targetX = centerX + Math.cos(angle + time) * 100;
            const targetY = centerY + Math.sin(angle + time) * 100;
            x = particle.baseX + (targetX - particle.baseX) * collapseStrength;
            y = particle.baseY + (targetY - particle.baseY) * collapseStrength;
            opacity = particle.opacity * (1 - collapseStrength * 0.8);
            if (distanceToCenter < 100) opacity = 0;
            break;
        }

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 247, 245, ${opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeSection, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
