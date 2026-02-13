"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; direction: number }[] = [];
    const dotCount = 50;

    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.005;

      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 600
      );
      gradient.addColorStop(0, `hsla(160, 80%, 15%, 0.4)`);
      gradient.addColorStop(0.5, `hsla(160, 80%, 8%, 0.2)`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot, i) => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          dot.x += (dx / dist) * force * 2;
          dot.y += (dy / dist) * force * 2;
        }

        dot.opacity = 0.1 + Math.sin(time * 2 + i) * 0.15 + 0.1;

        const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size + pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${dot.opacity})`;
        ctx.fill();

        if (i % 5 === 0) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 2 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${dot.opacity * 0.2})`;
          ctx.fill();
        }
      });

      dots.forEach((dot1, i) => {
        dots.slice(i + 1).forEach((dot2) => {
          const dx = dot1.x - dot2.x;
          const dy = dot1.y - dot2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - dist / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)",
        }}
      />
    </>
  );
}
