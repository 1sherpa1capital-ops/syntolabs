import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

const Terms: React.FC = () => {
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
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text mb-4">Terms of Service</h1>
                    <p className="text-text-muted mb-12">Last updated: January 2026</p>

                    <div className="space-y-8 text-text-secondary">
                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">1. Acceptance of Terms</h2>
                            <p>By accessing or using SyntoLabs AI services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">2. Description of Services</h2>
                            <p className="mb-4">SyntoLabs provides AI-powered automation services for businesses, including:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Automated call handling and lead qualification</li>
                                <li>Appointment scheduling and management</li>
                                <li>Customer inquiry responses</li>
                                <li>SMS notifications and confirmations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">3. User Responsibilities</h2>
                            <p className="mb-4">As a user of our services, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the confidentiality of your account credentials</li>
                                <li>Use the services in compliance with all applicable laws</li>
                                <li>Obtain necessary consents for call recording and data collection</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">4. Service Availability</h2>
                            <p>We strive to maintain 99.9% uptime for our services. However, we do not guarantee uninterrupted service and are not liable for any downtime or service interruptions.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">5. Pricing and Payment</h2>
                            <p className="mb-4">Our service tiers include:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Starter:</strong> $500 setup + $299/month (200 min/mo)</li>
                                <li><strong>Starter+:</strong> $1,000 setup + $500/month (500 min/mo)</li>
                                <li><strong>Standard:</strong> $2,000 setup + $1,000/month (1,500 min/mo)</li>
                                <li><strong>Premium:</strong> $3,500 setup + $1,800/month (Unlimited)</li>
                            </ul>
                            <p className="mt-4">All fees are non-refundable unless otherwise specified.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">6. Intellectual Property</h2>
                            <p>All content, software, and technology used in our services remain the property of Synto Labs. You are granted a limited, non-exclusive license to use our services for their intended purpose.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">7. Limitation of Liability</h2>
                            <p>Synto Labs shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability is limited to the amount you paid for services in the preceding 12 months.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">8. Termination</h2>
                            <p>Either party may terminate this agreement with 30 days written notice. We reserve the right to suspend or terminate services immediately for violations of these terms.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">9. Changes to Terms</h2>
                            <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text mb-4">10. Contact</h2>
                            <p>For questions about these Terms of Service:</p>
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

export default Terms;
