'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface VoiceWaveformProps {
    isSpeaking: boolean;
    barCount?: number;
}

export function VoiceWaveform({
    isSpeaking,
    barCount = 12,
}: VoiceWaveformProps) {
    const container = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Initialize the waveform animation timeline
    useGSAP(() => {
        // Idle breathing animation
        timelineRef.current = gsap.timeline({
            paused: true,
            repeat: -1,
            yoyo: true,
        });

        // Animate bars with stagger from center
        timelineRef.current.to('.waveform-bar', {
            scaleY: 2.5,
            duration: 0.15,
            ease: 'sine.inOut',
            stagger: {
                each: 0.03,
                from: 'center',
                yoyo: true,
                repeat: -1,
            },
        });

        // Start with subtle idle animation
        if (!isSpeaking) {
            gsap.to('.waveform-bar', {
                scaleY: 1.2,
                duration: 1.5,
                ease: 'sine.inOut',
                stagger: {
                    each: 0.1,
                    from: 'random',
                    yoyo: true,
                    repeat: -1,
                },
            });
        }
    }, { scope: container });

    // Control playback based on isSpeaking state
    useEffect(() => {
        if (!timelineRef.current) return;

        if (isSpeaking) {
            timelineRef.current.play();
        } else {
            // Return to idle state
            gsap.to('.waveform-bar', {
                scaleY: 1,
                backgroundColor: 'var(--color-primary)',
                duration: 0.3,
                ease: 'power2.out',
            });
            timelineRef.current.pause();
        }
    }, [isSpeaking]);

    // Generate bar elements
    const bars = Array.from({ length: barCount }, (_, i) => (
        <div
            key={i}
            className="waveform-bar"
            style={{
                width: '4px',
                height: '24px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '2px',
                transformOrigin: 'center center',
            }}
        />
    ));

    return (
        <div
            ref={container}
            className="waveform-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '16px',
                minHeight: '80px',
            }}
        >
            {bars}
        </div>
    );
}

export default VoiceWaveform;
