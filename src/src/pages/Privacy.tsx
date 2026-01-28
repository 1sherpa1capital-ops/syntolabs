import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

const Privacy: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg">
            {/* Header */}
            <header className="px-6 md:px-12 py-6 border-b border-border">
                <div className="container-wide flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Logo className="w-8 h-8 text-primary" />
                        <div className="flex flex-col -gap-0.5">
                            <span className="text-2xl font-black tracking-tighter text-primary leading-none">SyntoLabs</span>
                            <span className="text-[9px] font-black tracking-[0.2em] text-accent uppercase leading-none mt-1">by synto labs</span>
                        </div>
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main id="main-content" className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text mb-4">Privacy Policy</h1>
                    <p className="text-text-muted mb-12">Last updated: January 2026</p>

                    <div className="space-y-8 text-text-secondary">
                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">1. Information We Collect</h2>
                            <p className="mb-4">We collect information you provide directly to us, including:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Name, email address, and contact information</li>
                                <li>Business information and practice details</li>
                                <li>Call recordings and transcripts (with consent)</li>
                                <li>Usage data and interaction logs</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">2. How We Use Your Information</h2>
                            <p className="mb-4">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide, maintain, and improve our AI voice services</li>
                                <li>Process appointments and manage customer communications</li>
                                <li>Send you technical notices and support messages</li>
                                <li>Analyze usage patterns to enhance our services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">3. Data Security</h2>
                            <p>We implement industry-standard security measures to protect your data. All communications are encrypted in transit and at rest. We maintain strict access controls and regularly audit our security practices.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">4. HIPAA Compliance</h2>
                            <p>For clients in regulated industries (healthcare, finance, etc.), we adhere to applicable compliance requirements including HIPAA for protected health information (PHI). We sign Business Associate Agreements (BAAs) where required and maintain appropriate safeguards for handling sensitive data.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">5. Data Retention</h2>
                            <p>We retain your data only as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by contacting us.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">6. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access your personal data</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">7. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy, please contact us at:</p>
                            <p className="mt-4">
                                <a href="mailto:rhigden@syntolabs.xyz" className="text-primary hover:text-accent transition-colors font-medium">
                                    rhigden@syntolabs.xyz
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Privacy;
