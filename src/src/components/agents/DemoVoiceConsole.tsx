'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
// import { useConversation } from '@elevenlabs/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import VoiceWaveform from './VoiceWaveform';
import { Mic, Phone, PhoneOff, MicOff, Volume2, AlertCircle, X } from 'lucide-react';

gsap.registerPlugin(useGSAP);

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';
type PermissionState = 'prompt' | 'granted' | 'denied' | 'error';

// Analytics helper for voice demo tracking
const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (type: string, event: string, params?: Record<string, unknown>) => void }).gtag('event', eventName, properties);
    }
    // Development logging
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${eventName}`, properties);
    }
};

export function DemoVoiceConsole() {
    const container = useRef<HTMLDivElement>(null);
    const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const sessionStartTime = useRef<number | null>(null);

    // ElevenLabs conversation hook disabled for now to avoid extra dependencies
    /*
    const conversation = useConversation({
        onConnect: () => {
            setErrorMessage(null);
            sessionStartTime.current = Date.now();
            trackEvent('voice_demo_started', { source: 'landing_page' });
            if (navigator.vibrate) navigator.vibrate(50);
        },
        onDisconnect: () => {
            const duration = sessionStartTime.current
                ? Math.round((Date.now() - sessionStartTime.current) / 1000)
                : 0;
            trackEvent('voice_demo_ended', { duration_seconds: duration });
            sessionStartTime.current = null;
            if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
        },
        onError: (error) => {
            console.error('Voice conversation error:', error);
            trackEvent('voice_demo_error', { error_type: 'connection_lost' });
            setErrorMessage('Connection lost. Please try again.');
        },
    });
    */
    const conversation = { status: 'disconnected', isSpeaking: false } as any;

    // --- MOCK MODE LOGIC ---
    const [isMock, setIsMock] = useState(true); // Defaulting to true as per user request
    const [mockStatus, setMockStatus] = useState<ConnectionStatus>('disconnected');
    const [mockIsSpeaking, setMockIsSpeaking] = useState(false);
    const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startMockSession = useCallback(() => {
        setMockStatus('connecting');
        setTimeout(() => {
            setMockStatus('connected');
            trackEvent('voice_demo_started', { source: 'mock_demo' });

            // Start speaking simulation
            mockIntervalRef.current = setInterval(() => {
                setMockIsSpeaking(prev => !prev);
            }, 3000);
        }, 1500);
    }, []);

    const endMockSession = useCallback(() => {
        setMockStatus('disconnected');
        setMockIsSpeaking(false);
        if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
        trackEvent('voice_demo_ended', { source: 'mock_demo' });
    }, []);

    // --- END MOCK MODE LOGIC ---

    const status: ConnectionStatus = isMock ? mockStatus : (
        conversation.status === 'connected'
            ? 'connected'
            : conversation.status === 'connecting'
                ? 'connecting'
                : 'disconnected'
    );

    const isSpeaking = isMock ? mockIsSpeaking : conversation.isSpeaking;

    // Animate console entry
    useGSAP(() => {
        gsap.from('.voice-console', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
        });
    }, { scope: container });

    // Check for microphone permission
    const checkMicPermission = useCallback(async () => {
        try {
            const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
            setPermissionState(result.state as PermissionState);
            return result.state;
        } catch {
            return 'prompt';
        }
    }, []);

    // Request microphone and start conversation
    const startConversation = useCallback(async () => {
        setErrorMessage(null);

        try {
            // Request microphone access
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermissionState('granted');
            setShowPermissionModal(false);

            if (isMock) {
                startMockSession();
                return;
            }

            // Start ElevenLabs conversation
            const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

            if (!agentId) {
                setErrorMessage('Demo mode: Agent ID not configured. Switching to Mock.');
                setIsMock(true);
                startMockSession();
                return;
            }

            await conversation.startSession({ agentId, connectionType: 'webrtc' });
        } catch (error) {
            if ((error as Error).name === 'NotAllowedError') {
                setPermissionState('denied');
                setErrorMessage('Microphone access denied. Please allow access in your browser settings.');
            } else {
                setPermissionState('error');
                setErrorMessage('Could not connect. Please try again or call us directly.');
            }
        }
    }, [conversation, isMock, startMockSession]);

    // Handle start button click
    const handleStartClick = useCallback(async () => {
        const permission = await checkMicPermission();

        if (permission === 'prompt') {
            setShowPermissionModal(true);
        } else if (permission === 'granted') {
            startConversation();
        } else {
            setShowPermissionModal(true);
        }
    }, [checkMicPermission, startConversation]);

    // End conversation
    const endConversation = useCallback(async () => {
        if (isMock) {
            endMockSession();
        } else {
            await conversation.endSession();
        }
    }, [conversation, isMock, endMockSession]);

    // Cleanup effects
    useEffect(() => {
        return () => {
            if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
        };
    }, []);

    // Status dot animation
    const statusDotStyle = {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: status === 'connected'
            ? 'var(--color-primary-light)'
            : status === 'connecting'
                ? '#FACC15'
                : 'rgba(255,255,255,0.3)',
        animation: status === 'connecting' ? 'pulse 1s infinite' : status === 'connected' ? 'pulse 2s infinite' : 'none',
    };

    return (
        <div ref={container}>
            {/* Pre-Permission Modal */}
            {showPermissionModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.85)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                    }}
                    onClick={() => setShowPermissionModal(false)}
                >
                    <div
                        style={{
                            background: 'white',
                            maxWidth: '420px',
                            width: '100%',
                            padding: '40px',
                            border: '3px solid var(--color-primary)',
                            boxShadow: '12px 12px 0 var(--color-primary)',
                            textAlign: 'center',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowPermissionModal(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'var(--color-secondary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}>
                            <Mic size={32} color="var(--color-primary)" />
                        </div>

                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            marginBottom: '16px',
                            color: 'var(--color-text-main)',
                        }}>
                            Microphone Access Needed
                        </h3>

                        <p style={{
                            color: 'var(--color-text-muted)',
                            marginBottom: '8px',
                            lineHeight: 1.6,
                        }}>
                            To talk with our AI agent, we need access to your microphone.
                        </p>

                        <p style={{
                            color: 'var(--color-text-muted)',
                            marginBottom: '32px',
                            fontSize: '0.9rem',
                            opacity: 0.8,
                        }}>
                            Your audio is processed in real-time and never stored.
                        </p>

                        {permissionState === 'denied' && (
                            <div style={{
                                background: '#FEF2F2',
                                border: '2px solid #FCA5A5',
                                padding: '12px',
                                marginBottom: '24px',
                                fontSize: '0.85rem',
                                color: '#9B1C1C',
                            }}>
                                <AlertCircle size={16} style={{ display: 'inline', marginRight: '8px' }} />
                                Microphone blocked. Please enable it in your browser settings.
                            </div>
                        )}

                        <button
                            onClick={startConversation}
                            style={{
                                width: '100%',
                                padding: '16px 24px',
                                background: 'var(--color-primary)',
                                color: 'white',
                                border: '3px solid var(--color-primary)',
                                fontSize: '1rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                boxShadow: '6px 6px 0 var(--color-primary-light)',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                            }}
                        >
                            <Mic size={20} />
                            ALLOW MICROPHONE ACCESS
                        </button>

                        <a
                            href="tel:+14165551234"
                            style={{
                                display: 'block',
                                color: 'var(--color-primary)',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            <Phone size={16} style={{ display: 'inline', marginRight: '8px' }} />
                            Call Us Instead: +1 (416) 555-1234
                        </a>
                    </div>
                </div>
            )}

            {/* Voice Console */}
            <div
                className="voice-console"
                style={{
                    background: 'var(--color-primary)',
                    border: '3px solid var(--color-secondary)',
                    boxShadow: '12px 12px 0 var(--color-secondary)',
                    padding: '0',
                    overflow: 'hidden',
                }}
            >
                {/* Console Header */}
                <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={statusDotStyle} />
                        <span style={{
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            letterSpacing: '1px',
                            fontFamily: 'var(--font-geist-mono)',
                        }}>
                            {status === 'connected' ? 'CONNECTED' : status === 'connecting' ? 'CONNECTING...' : 'READY'}
                        </span>
                    </div>
                    <span style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-geist-mono)',
                    }}>
                        LIVE DEMO
                    </span>
                </div>

                {/* Main Console Body */}
                <div style={{
                    padding: '48px 40px',
                    textAlign: 'center',
                }}>
                    {/* Waveform Visualization */}
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '0',
                        padding: '24px',
                        marginBottom: '32px',
                    }}>
                        <VoiceWaveform
                            isSpeaking={isSpeaking}
                            barCount={16}
                        />
                        <p style={{
                            color: 'var(--color-secondary)',
                            fontSize: '0.9rem',
                            marginTop: '16px',
                            fontWeight: 600,
                        }}>
                            {status === 'connected'
                                ? (conversation.isSpeaking ? '🗣️ Speaking to you...' : '👂 I\'m listening...')
                                : status === 'connecting'
                                    ? '✨ Waking up the AI...'
                                    : 'Try it — ask me anything about Synto'
                            }
                        </p>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '2px solid rgba(239, 68, 68, 0.5)',
                            padding: '12px 16px',
                            marginBottom: '24px',
                            fontSize: '0.85rem',
                            color: '#FEE2E2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}>
                            <AlertCircle size={16} />
                            {errorMessage}
                        </div>
                    )}

                    {/* Control Buttons */}
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        {status === 'disconnected' ? (
                            <button
                                onClick={handleStartClick}
                                style={{
                                    padding: '20px 48px',
                                    background: 'white',
                                    color: 'var(--color-primary)',
                                    border: '3px solid white',
                                    fontSize: '1.1rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Mic size={24} />
                                TALK TO ME
                            </button>
                        ) : (
                            <button
                                onClick={endConversation}
                                disabled={status === 'connecting'}
                                style={{
                                    padding: '20px 48px',
                                    background: status === 'connecting' ? 'rgba(255,255,255,0.3)' : '#EF4444',
                                    color: 'white',
                                    border: '3px solid',
                                    borderColor: status === 'connecting' ? 'rgba(255,255,255,0.3)' : '#EF4444',
                                    fontSize: '1.1rem',
                                    fontWeight: 800,
                                    cursor: status === 'connecting' ? 'not-allowed' : 'pointer',
                                    boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <PhoneOff size={24} />
                                END CALL
                            </button>
                        )}
                    </div>

                    {/* Mobile Fallback */}
                    <div style={{ marginTop: '32px' }}>
                        <a
                            href="tel:+14165551234"
                            style={{
                                color: 'var(--color-secondary)',
                                fontSize: '0.85rem',
                                opacity: 0.8,
                            }}
                        >
                            <Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            Prefer to call? Dial +1 (416) 555-1234
                        </a>
                    </div>
                </div>

                {/* Screen Reader Announcements */}
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                    style={{ position: 'absolute', left: '-9999px' }}
                >
                    {status === 'connected' ? 'Connected to Synto AI agent. Speak when ready.' : ''}
                    {status === 'disconnected' ? 'Call ended. Thank you for trying Synto.' : ''}
                    {conversation.isSpeaking ? 'AI agent is speaking.' : ''}
                </div>
            </div>
        </div>
    );
}

export default DemoVoiceConsole;
