import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Phone, Copy, Check, X } from 'lucide-react';
import { SUPPORT_PHONE_NUMBER } from '../config/constants';

interface TryNowModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const TryNowModalContext = createContext<TryNowModalContextType | undefined>(undefined);

export const useTryNowModal = () => {
    const context = useContext(TryNowModalContext);
    if (!context) {
        throw new Error('useTryNowModal must be used within a TryNowModalProvider');
    }
    return context;
};

interface TryNowModalProviderProps {
    children: React.ReactNode;
}

export const TryNowModalProvider: React.FC<TryNowModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const phoneNumber = SUPPORT_PHONE_NUMBER;

    const openModal = useCallback(() => {
        previousActiveElement.current = document.activeElement as HTMLElement;
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Return focus to the element that opened the modal
        setTimeout(() => {
            previousActiveElement.current?.focus();
        }, 0);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber.replace(/\s+/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        // Analytics Event
        (window as any).gtag?.('event', 'cta_try_now_copy', {
            page: window.location.pathname,
            number: phoneNumber
        });
    };

    const handleCall = () => {
        // Analytics Event
        (window as any).gtag?.('event', 'cta_try_now_call', {
            page: window.location.pathname,
            number: phoneNumber
        });
    };

    // Close on escape key and handle focus trap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                closeModal();
                return;
            }

            // Focus trap
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            // Focus the modal on open
            setTimeout(() => {
                const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                firstFocusable?.focus();
            }, 0);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeModal]);

    return (
        <TryNowModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}

            {/* Global Modal */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[3000] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="try-now-modal-title"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
                        onClick={closeModal}
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div 
                        ref={modalRef}
                        className="relative bg-surface-elevated rounded-3xl shadow-2xl p-8 max-w-md w-full animate-scaleIn"
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text-default hover:bg-muted-bg transition-all"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        {/* Content */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                                <Phone className="w-8 h-8 text-accent" aria-hidden="true" />
                            </div>
                            <h3 
                                id="try-now-modal-title" 
                                className="text-2xl font-black text-primary tracking-tight mb-2"
                            >
                                Book a Consultation
                            </h3>
                            <p className="text-text-muted">
                                Call our AI agent now and experience it firsthand
                            </p>
                        </div>

                        {/* Phone Number Display */}
                        <div className="flex items-center gap-2 mb-6">
                            <a
                                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                                onClick={handleCall}
                                className="flex-1 flex items-center justify-center gap-3 bg-accent text-cta-text py-4 px-6 rounded-full font-bold text-lg hover:bg-cta-hover transition-colors"
                                aria-label={`Call ${phoneNumber}`}
                            >
                                <Phone size={20} strokeWidth={2.5} aria-hidden="true" />
                                {phoneNumber}
                            </a>
                            <button
                                onClick={handleCopy}
                                className="flex-shrink-0 w-14 h-14 rounded-full bg-muted-bg hover:bg-dark/10 flex items-center justify-center text-text-default transition-all"
                                aria-label={copied ? 'Number copied' : 'Copy phone number'}
                            >
                                {copied ? <Check size={20} className="text-accent" aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
                            </button>
                        </div>

                        {/* Additional info */}
                        <p className="text-center text-xs text-text-muted">
                            Available 24/7 - No credit card required
                        </p>
                    </div>
                </div>
            )}
        </TryNowModalContext.Provider>
    );
};

export default TryNowModalProvider;
