"use client";

import { useEffect, useRef } from "react";

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space base
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, "#020812");
      bgGrad.addColorStop(0.4, "#050D1A");
      bgGrad.addColorStop(1, "#0B2240");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Aurora waves
      const waves = [
        { color: "rgba(11,34,64,0.8)", speed: 0.4, amplitude: 120, yOffset: 0.3 },
        { color: "rgba(56,189,248,0.06)", speed: 0.5, amplitude: 80, yOffset: 0.35 },
        { color: "rgba(99,102,241,0.07)", speed: 0.3, amplitude: 100, yOffset: 0.4 },
        { color: "rgba(225,69,4,0.04)", speed: 0.6, amplitude: 60, yOffset: 0.5 },
        { color: "rgba(56,189,248,0.04)", speed: 0.35, amplitude: 140, yOffset: 0.25 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        const y = canvas.height * wave.yOffset;

        ctx.moveTo(0, y);
        for (let x = 0; x <= canvas.width; x += 2) {
          const sinVal = Math.sin((x / canvas.width) * Math.PI * 3 + time * wave.speed) * wave.amplitude;
          const cosVal = Math.cos((x / canvas.width) * Math.PI * 2 + time * wave.speed * 0.7) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y + sinVal + cosVal);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, y - wave.amplitude, 0, y + wave.amplitude * 2);
        waveGrad.addColorStop(0, "transparent");
        waveGrad.addColorStop(0.5, wave.color);
        waveGrad.addColorStop(1, "transparent");
        ctx.fillStyle = waveGrad;
        ctx.fill();
      });

      // Glowing orbs
      const orbs = [
        { x: 0.15, y: 0.3, r: 250, color: "rgba(11,34,64,0.6)" },
        { x: 0.85, y: 0.4, r: 200, color: "rgba(11,34,64,0.5)" },
        { x: 0.5, y: 0.15, r: 180, color: "rgba(56,189,248,0.04)" },
        { x: 0.2, y: 0.7, r: 150, color: "rgba(99,102,241,0.04)" },
        { x: 0.8, y: 0.65, r: 130, color: "rgba(225,69,4,0.025)" },
      ];

      orbs.forEach((orb) => {
        const cx = canvas.width * orb.x + Math.sin(time * 0.3 + orb.x * 10) * 30;
        const cy = canvas.height * orb.y + Math.cos(time * 0.25 + orb.y * 10) * 20;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.008;
      animationId = requestAnimationFrame(drawAurora);
    };

    drawAurora();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
