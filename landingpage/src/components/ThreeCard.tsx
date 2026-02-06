import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

const ThreeCard: React.FC<ThreeCardProps> = ({ children, className = '', intensity = 1 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10 * intensity;
            const rotateY = ((x - centerX) / centerX) * 10 * intensity;

            setRotation({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
            setRotation({ x: 0, y: 0 });
        };

        const element = containerRef.current;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return (
        <div
            ref={containerRef}
            className={`three-card ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    );
};

// Special 3D Icon Component with particle effects
interface ParticleIconProps {
    icon: React.ReactNode;
    color?: string;
}

export const ParticleIcon: React.FC<ParticleIconProps> = ({ icon, color = '#6366f1' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 100;
        canvas.height = 100;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
        }> = [];

        // Create particles
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 30 + Math.random() * 10;
            particles.push({
                x: 50 + Math.cos(angle) * radius,
                y: 50 + Math.sin(angle) * radius,
                vx: Math.cos(angle) * 0.2,
                vy: Math.sin(angle) * 0.2,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Orbit around center
                const dx = p.x - 50;
                const dy = p.y - 50;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 40) {
                    p.vx *= -0.9;
                    p.vy *= -0.9;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });

            // Draw connecting lines
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 20) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = color + Math.floor((1 - dist / 20) * 100).toString(16).padStart(2, '0');
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [color]);

    return (
        <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            />
            <div className="relative z-10 text-white">
                {icon}
            </div>
        </div>
    );
};

// Holographic card effect
interface HoloCardProps {
    children: React.ReactNode;
    className?: string;
}

export const HoloCard: React.FC<HoloCardProps> = ({ children, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
            });
        };

        const element = containerRef.current;
        element.addEventListener('mousemove', handleMouseMove);
        return () => element.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`holo-card relative overflow-hidden rounded-xl ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: isHovered
                    ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.15), transparent 50%), linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))`
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                transition: 'background 0.3s ease'
            }}
        >
            {/* Holographic shimmer effect */}
            {isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)`,
                        backgroundSize: '200% 200%',
                        backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                        animation: 'shimmer 2s ease-in-out infinite'
                    }}
                />
            )}

            {children}

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default ThreeCard;
