'use client';

import React, { useState, useEffect } from 'react';
import { Check, Loader2, Zap, Folder, BarChart3, Palette, Cpu } from 'lucide-react';

export default function DemoProposalCard() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const steps = [
        { label: 'Scanning Website', result: '42 pages indexed', status: 'INDEXING...' },
        { label: 'Analyzing Pain Points', result: '3 gaps identified', status: 'ANALYZING...' },
        { label: 'Calculating ROI', result: '$4,200/mo potential', status: 'CALCULATING...' },
        { label: 'Generating Proposal', result: '12 pages ready', status: 'SYNTHESIZING...' },
    ];

    // Start animation on mount
    useEffect(() => {
        // Start animation immediately on mount
        const startTimer = setTimeout(() => {
            setIsGenerating(true);
            setCurrentStep(0);
            setProgress(0);

            const stepDurations = [2000, 1800, 1500, 2000]; // Slower, more deliberate steps
            let elapsed = 0;
            const totalDuration = stepDurations.reduce((a, b) => a + b, 0);

            const interval = setInterval(() => {
                elapsed += 50;
                const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
                setProgress(newProgress);

                // Determine which step is active based on elapsed time
                let activeIdx = 1; // Default to first step

                // Check if we're in the first step (before any step completes)
                if (elapsed >= stepDurations[0]) {
                    let accumulatedTime = stepDurations[0];
                    for (let i = 1; i < stepDurations.length; i++) {
                        accumulatedTime += stepDurations[i];
                        if (elapsed < accumulatedTime) {
                            activeIdx = i + 1; // Currently in this step
                            break;
                        } else if (i === stepDurations.length - 1) {
                            activeIdx = stepDurations.length + 1; // All steps completed
                        }
                    }
                }

                setCurrentStep(activeIdx);

                if (elapsed >= totalDuration) {
                    setIsGenerating(false);
                    setCurrentStep(steps.length + 1); // All steps completed
                    clearInterval(interval);
                }
            }, 50);

            return () => clearInterval(interval);
        }, 500); // Small delay to ensure component is mounted

        return () => clearTimeout(startTimer);
    }, []); // Only run on mount

    // Handle cycling after completion
    useEffect(() => {
        if (!isGenerating && progress === 100 && currentStep > steps.length) {
            setShowConfetti(true);
            const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);

            // Wait 3 seconds at the 'completed' state, then reset
            const cycleTimer = setTimeout(() => {
                setProgress(0);
                setCurrentStep(0);
                setIsGenerating(false);

                // Restart animation after reset
                const restartTimer = setTimeout(() => {
                    setIsGenerating(true);
                    setCurrentStep(0);
                    setProgress(0);

                    const stepDurations = [2000, 1800, 1500, 2000];
                    let elapsed = 0;
                    const totalDuration = stepDurations.reduce((a, b) => a + b, 0);

                    const interval = setInterval(() => {
                        elapsed += 50;
                        const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
                        setProgress(newProgress);

                        let activeIdx = 1;
                        if (elapsed >= stepDurations[0]) {
                            let accumulatedTime = stepDurations[0];
                            for (let i = 1; i < stepDurations.length; i++) {
                                accumulatedTime += stepDurations[i];
                                if (elapsed < accumulatedTime) {
                                    activeIdx = i + 1;
                                    break;
                                } else if (i === stepDurations.length - 1) {
                                    activeIdx = stepDurations.length + 1;
                                }
                            }
                        }

                        setCurrentStep(activeIdx);

                        if (elapsed >= totalDuration) {
                            setIsGenerating(false);
                            setCurrentStep(steps.length + 1);
                            clearInterval(interval);
                        }
                    }, 50);

                    return () => clearInterval(interval);
                }, 100);

                return () => clearTimeout(restartTimer);
            }, 3000);

            return () => {
                clearTimeout(confettiTimer);
                clearTimeout(cycleTimer);
            };
        }
    }, [isGenerating, progress, currentStep, steps.length]);

    return (
        <div className="proposal-card-container" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            perspective: '2000px',
            margin: '0 auto'
        }}>
            {/* Confetti Delight Effect */}
            {showConfetti && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 100,
                    overflow: 'hidden'
                }}>
                    {[...Array(24)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            top: '-10%',
                            left: `${Math.random() * 100}%`,
                            width: '12px',
                            height: '12px',
                            color: ['var(--color-primary)', 'var(--color-primary-light)', '#000000', 'var(--color-primary-light)'][Math.floor(Math.random() * 4)],
                            animation: `confetti-fall ${1.5 + Math.random() * 2}s cubic-bezier(.22, .61, .36, 1) forwards`,
                            opacity: 1,
                            fontSize: '12px',
                            fontWeight: 900,
                            fontFamily: 'var(--font-geist-mono)'
                        }}>
                            {Math.random() > 0.5 ? '1' : '0'}
                        </div>
                    ))}
                </div>
            )}

            {/* Main Card */}
            <div style={{
                width: '100%',
                borderRadius: '0',
                padding: '40px 48px 48px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '12px 12px 0 var(--color-primary)',
                background: 'white',
                border: '4px solid var(--color-primary)',
                transform: 'rotateY(-6deg) rotateX(4deg)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>

                {/* Scanning Beam Effect */}
                {isGenerating && (
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                        boxShadow: '0 0 15px var(--color-primary-light)',
                        zIndex: 30,
                        animation: 'scan-beam 2s linear infinite',
                        pointerEvents: 'none'
                    }} />
                )}

                {/* Floating Toolbar (Right) */}
                <div style={{
                    position: 'absolute',
                    right: '-25px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '56px',
                    background: 'white',
                    borderRadius: '0',
                    padding: '20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    boxShadow: '6px 6px 0 var(--color-primary)',
                    zIndex: 20,
                    border: '3px solid var(--color-primary)'
                }}>
                    {[
                        { Icon: Zap, idx: 0 },
                        { Icon: Folder, idx: 1 },
                        { Icon: BarChart3, idx: 2 },
                        { Icon: Palette, idx: 3 }
                    ].map(({ Icon, idx }) => {
                        const iconIsActive = currentStep === idx + 1 && isGenerating;
                        const iconIsCompleted = currentStep > idx + 1;
                        return (
                            <div key={idx} style={{
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                padding: '4px',
                                opacity: iconIsCompleted ? 1 : iconIsActive ? 1 : 0.2,
                                transform: iconIsActive ? 'scale(1.3)' : 'scale(1)',
                                filter: iconIsActive ? 'drop-shadow(0 0 8px rgba(13, 92, 77, 0.3))' : 'none',
                                color: 'var(--color-primary)',
                                position: 'relative'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.4) translateX(-5px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = iconIsActive ? 'scale(1.3)' : 'scale(1)';
                                }}
                                className="tool-icon">
                                <Icon size={24} />
                            </div>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div style={{ marginRight: '10px' }}>
                    {/* Proposal Ready Badge - Floating */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '40px',
                        background: isGenerating ? 'white' : 'var(--color-primary)',
                        padding: '12px 24px',
                        borderRadius: '0',
                        boxShadow: '6px 6px 0 ' + (isGenerating ? 'var(--color-primary)' : 'var(--color-primary-light)'),
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        zIndex: 10,
                        border: '3px solid var(--color-primary)',
                        animation: 'floatBadge 4s ease-in-out infinite'
                    }}>
                        <div style={{
                            width: '14px',
                            height: '14px',
                            background: isGenerating ? '#FACC15' : 'var(--color-primary-light)',
                            borderRadius: '50%',
                            border: '2px solid var(--color-primary)',
                            animation: isGenerating ? 'pulse-dot 1s ease-in-out infinite' : 'none'
                        }} />
                        <span style={{
                            fontSize: '1rem',
                            fontWeight: 900,
                            color: isGenerating ? 'var(--color-text-main)' : 'white',
                            letterSpacing: '1px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {isGenerating ? 'PROCESSING...' : '✓ DEMO READY'}
                            {!isGenerating && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                    animation: 'shimmer 1.5s infinite'
                                }} />
                            )}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                        fontFamily: 'var(--font-geist-sans)',
                        fontSize: 'clamp(2.2rem, 5vw, 2.8rem)',
                        lineHeight: 1,
                        marginTop: '32px',
                        marginBottom: '32px',
                        color: 'var(--color-text-main)',
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        textTransform: 'uppercase'
                    }}>
                        Proof-First<br />Pipeline
                    </h2>

                    {/* Pipeline Steps */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px', position: 'relative' }}>
                        {/* Kinetic Vertical Line */}
                        <div style={{
                            position: 'absolute',
                            left: '15px',
                            top: '20px',
                            bottom: '20px',
                            width: '2px',
                            background: '#eee',
                            zIndex: 0,
                            opacity: isGenerating ? 1 : 0,
                            transition: 'opacity 0.3s ease-in'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            left: '15px',
                            top: '20px',
                            height: `${Math.max(0, Math.min(100, ((currentStep - 1) / steps.length) * 100))}%`,
                            width: '2px',
                            background: 'var(--color-primary)',
                            zIndex: 1,
                            transition: 'height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                        }}></div>

                        {steps.map((step, i) => {
                            const isActive = currentStep === i + 1 && isGenerating;
                            const isCompleted = currentStep > i + 1;
                            const isPending = currentStep < i + 1;
                            return (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '20px',
                                    opacity: isCompleted ? 1 : isActive ? 1 : isPending ? 0.3 : 0.3,
                                    transform: isActive ? 'translateX(12px)' : 'translateX(0)',
                                    transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '0',
                                        background: isCompleted ? 'var(--color-primary)' : isActive ? 'var(--color-primary)' : 'white',
                                        border: '2px solid var(--color-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: (isCompleted || isActive) ? 'white' : 'var(--color-primary)',
                                        flexShrink: 0,
                                        fontWeight: 900,
                                        fontSize: '1rem',
                                        boxShadow: isActive ? '0 0 15px var(--color-primary-light)' : isCompleted ? '4px 4px 0 var(--color-primary-light)' : 'none',
                                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}>
                                        {isActive ? (
                                            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite, pulse-loader 1s ease-in-out infinite' }} />
                                        ) : isCompleted ? (
                                            <Check size={20} strokeWidth={4} style={{ animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                                        ) : (
                                            <span>{i + 1}</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, paddingTop: '2px' }}>
                                        <div style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 900,
                                            color: (isCompleted || isActive) ? 'var(--color-text-main)' : '#ccc',
                                            letterSpacing: '-0.01em',
                                            textTransform: 'uppercase',
                                            transition: 'color 0.4s'
                                        }}>
                                            {step.label}
                                        </div>
                                        {isCompleted && (
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: 'var(--color-primary)',
                                                fontWeight: 800,
                                                marginTop: '6px',
                                                padding: '6px 14px',
                                                background: 'var(--color-secondary)',
                                                borderLeft: '4px solid var(--color-primary-light)',
                                                display: 'inline-block',
                                                animation: 'slideInResult 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                                            }}>
                                                {step.result}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* Bottom Floating Element - AI Status Card */}
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '30px',
                    background: isGenerating ? 'white' : 'var(--color-primary)',
                    padding: '20px 32px',
                    borderRadius: '0',
                    boxShadow: '10px 10px 0 ' + (isGenerating ? 'var(--color-primary)' : 'var(--color-primary-light)'),
                    zIndex: 15,
                    minWidth: '240px',
                    border: '3px solid var(--color-primary)',
                    transition: 'all 0.4s'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            background: 'white',
                            borderRadius: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-primary)',
                            border: '3px solid var(--color-primary)',
                            transform: isGenerating ? 'rotate(0)' : 'rotate(360deg)',
                            transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            {isGenerating ? <Cpu size={24} /> : <Zap size={24} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.9rem',
                                fontWeight: 900,
                                color: isGenerating ? 'var(--color-text-main)' : 'white',
                                letterSpacing: '1px'
                            }}>
                                {isGenerating && currentStep > 0 ? (steps[currentStep - 1]?.status || 'PROCESSING...') : isGenerating ? 'PROCESSING...' : 'DEPLOYED'}
                            </div>
                            <div style={{
                                marginTop: '8px',
                                height: '8px',
                                width: '100%',
                                background: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: '0',
                                overflow: 'hidden',
                                border: '1px solid var(--color-primary)'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    background: isGenerating ? 'var(--color-primary)' : 'var(--color-primary-light)',
                                    borderRadius: '0',
                                    transition: 'width 0.1s linear'
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* CSS for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
                }
                @keyframes floatBadge {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.8); }
                }
                @keyframes pulse-loader {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes popIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes slideInResult {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes scan-beam {
                    0% { top: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .tool-icon:hover {
                    transform: scale(1.4) !important;
                }
            `}} />
        </div>
    );
}
