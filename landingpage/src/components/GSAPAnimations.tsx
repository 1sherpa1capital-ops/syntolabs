'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SECTION_ANIMATIONS: Record<string, gsap.TweenVars> = {
    fadeUp: { y: 50, opacity: 0 },
    fadeIn: { opacity: 0 },
    slideLeft: { x: -80, opacity: 0 },
    slideRight: { x: 80, opacity: 0 },
    scale: { scale: 0.9, opacity: 0 },
    stagger: { y: 30, opacity: 0 },
};

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
    delay?: number;
    duration?: number;
    staggerDelay?: number;
}

/**
 * AnimatedSection - GSAP ScrollTrigger wrapper for scroll-based reveals
 * 
 * Usage:
 * <AnimatedSection animation="fadeUp">
 *   <div>Content that animates on scroll</div>
 * </AnimatedSection>
 */
export function AnimatedSection({
    children,
    className = '',
    animation = 'fadeUp',
    delay = 0,
    duration = 0.8,
    staggerDelay = 0.1,
}: AnimatedSectionProps) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current) return;

        const element = container.current;
        const children = element.querySelectorAll('.gsap-stagger-child');

        const fromVars = SECTION_ANIMATIONS[animation] || SECTION_ANIMATIONS.fadeUp;

        if (animation === 'stagger' && children.length > 0) {
            // Staggered animation for child elements
            gsap.from(children, {
                ...fromVars,
                duration,
                stagger: staggerDelay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        } else {
            // Single element animation
            gsap.from(element, {
                ...fromVars,
                duration,
                delay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        }
    }, { scope: container });

    return (
        <div ref={container} className={className}>
            {children}
        </div>
    );
}

interface AnimatedNumberProps {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}

/**
 * AnimatedNumber - Counts up to a value when scrolled into view
 * 
 * Usage:
 * <AnimatedNumber value={12847} prefix="$" suffix="/mo" />
 */
export function AnimatedNumber({
    value,
    prefix = '',
    suffix = '',
    duration = 2,
    className = '',
}: AnimatedNumberProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!elementRef.current || hasAnimated.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;

                        const target = { value: 0 };
                        gsap.to(target, {
                            value,
                            duration,
                            ease: 'power2.out',
                            onUpdate: () => {
                                if (elementRef.current) {
                                    elementRef.current.textContent =
                                        `${prefix}${Math.round(target.value).toLocaleString()}${suffix}`;
                                }
                            },
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, [value, prefix, suffix, duration]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

/**
 * MagneticButton - Button that follows cursor on hover
 * 
 * Usage:
 * <MagneticButton>
 *   <button>Click Me</button>
 * </MagneticButton>
 */
export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={buttonRef} className={className} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
}

/**
 * TextReveal - Character-by-character text reveal animation
 */
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll('.char');

        gsap.from(chars, {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.03,
            duration: 0.5,
            delay,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
        });
    }, { scope: containerRef });

    return (
        <span ref={containerRef} className={className} style={{ display: 'inline-block' }}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className="char"
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

export default AnimatedSection;
