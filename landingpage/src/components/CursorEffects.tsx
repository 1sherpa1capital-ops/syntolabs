import React, { useRef, useEffect, useState } from 'react';

// Magnetic button effect
interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    strength = 20,
    onClick
}) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / strength;
            const deltaY = (e.clientY - centerY) / strength;

            setPosition({ x: deltaX, y: deltaY });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div
            ref={buttonRef}
            className={`magnetic-button ${className}`}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.2s ease-out'
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

// Custom cursor with trail
interface CustomCursorProps {
    color?: string;
    size?: number;
    trailLength?: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
    color = '#6366f1',
    size = 20,
    trailLength = 5
}) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const trailIdRef = useRef(0);

    useEffect(() => {
        let animationFrame: number;
        let lastPos = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            // Add trail point if moved enough
            const distance = Math.sqrt(Math.pow(x - lastPos.x, 2) + Math.pow(y - lastPos.y, 2));
            if (distance > 10) {
                const newTrail = { x, y, id: trailIdRef.current++ };
                setTrails(prev => [...prev.slice(-trailLength), newTrail]);
                lastPos = { x, y };
            }

            setMousePos({ x, y });

            // Check if hovering over clickable
            const target = e.target as HTMLElement;
            const isClickable = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.onclick !== null ||
                target.classList.contains('cursor-pointer');
            setIsHovering(isClickable);
        };

        const animate = () => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${mousePos.x}px`;
                cursorRef.current.style.top = `${mousePos.y}px`;
            }

            // Remove old trails
            setTrails(prev => {
                const now = Date.now();
                return prev.filter(trail => now - trail.id < 500);
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, [trailLength]);

    return (
        <>
            {/* Main cursor */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-50 hidden md:block"
                style={{
                    width: isHovering ? size * 1.5 : size,
                    height: isHovering ? size * 1.5 : size,
                    marginLeft: -(isHovering ? size * 0.75 : size / 2),
                    marginTop: -(isHovering ? size * 0.75 : size / 2),
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    transition: 'width 0.2s, height 0.2s, margin-left 0.2s, margin-top 0.2s',
                    mixBlendMode: 'difference'
                }}
            />

            {/* Inner dot */}
            <div
                className="fixed pointer-events-none z-50 hidden md:block"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: isHovering ? 8 : 4,
                    height: isHovering ? 8 : 4,
                    marginLeft: isHovering ? -4 : -2,
                    marginTop: isHovering ? -4 : -2,
                    borderRadius: '50%',
                    backgroundColor: color,
                    transition: 'width 0.2s, height 0.2s',
                    mixBlendMode: 'difference'
                }}
            />

            {/* Trails */}
            {trails.map((trail, index) => {
                const opacity = (index + 1) / trails.length * 0.5;
                const scale = (index + 1) / trails.length;
                return (
                    <div
                        key={trail.id}
                        className="fixed pointer-events-none z-40 hidden md:block rounded-full"
                        style={{
                            left: trail.x,
                            top: trail.y,
                            width: size * scale,
                            height: size * scale,
                            marginLeft: -(size * scale) / 2,
                            marginTop: -(size * scale) / 2,
                            backgroundColor: color,
                            opacity,
                            mixBlendMode: 'screen'
                        }}
                    />
                );
            })}
        </>
    );
};

// Spotlight effect on hover
interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    spotlightSize?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({
    children,
    className = '',
    spotlightSize = 400
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const handleMouseLeave = () => {
            setMousePos({ x: -1000, y: -1000 });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`spotlight-container relative overflow-hidden ${className}`}
        >
            {/* Spotlight overlay */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle ${spotlightSize}px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
                    opacity: mousePos.x > 0 ? 1 : 0
                }}
            />
            {children}
        </div>
    );
};

// Noise texture overlay for grain effect
export const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.03 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 200;
        canvas.height = 200;

        const generateNoise = () => {
            const imageData = ctx.createImageData(200, 200);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
        };

        generateNoise();

        // Animate noise
        const interval = setInterval(generateNoise, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-overlay"
            style={{ opacity }}
            aria-hidden="true"
        />
    );
};

// Reveal on scroll component
interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
    children,
    className = '',
    delay = 0,
    direction = 'up'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => setIsVisible(true), delay);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const getTransform = () => {
        if (isVisible) return 'translate(0, 0)';

        switch (direction) {
            case 'up':
                return 'translateY(50px)';
            case 'down':
                return 'translateY(-50px)';
            case 'left':
                return 'translateX(50px)';
            case 'right':
                return 'translateX(-50px)';
            default:
                return 'translateY(50px)';
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
            }}
        >
            {children}
        </div>
    );
};

// Distortion text effect
interface DistortTextProps {
    text: string;
    className?: string;
    strength?: number;
}

export const DistortText: React.FC<DistortTextProps> = ({
    text,
    className = '',
    strength = 5
}) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setMousePos({
            x: (e.clientX - centerX) / strength,
            y: (e.clientY - centerY) / strength
        });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {text}
        </div>
    );
};

export default CustomCursor;
