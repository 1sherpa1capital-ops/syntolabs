import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WaitlistSection from '../components/WaitlistSection';
import Services from '../components/Services';
import AgentEcosystem from '../components/AgentEcosystem';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import ROICalculator from '../components/ROICalculator';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import About from '../components/About';
import DemoCards from '../components/DemoCards';
import { useLenis } from '../hooks/useLenis';

const Home: React.FC = () => {
    const [isTeamOpen, setIsTeamOpen] = useState(false);
    const { stop, start } = useLenis();

    // Lock/Unlock scroll when modal is open
    useEffect(() => {
        if (isTeamOpen) {
            stop();
            document.body.style.overflow = 'hidden';
        } else {
            start();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isTeamOpen, stop, start]);

    return (
        <div className="app-root">
            <Header onOpenTeam={() => setIsTeamOpen(true)} />
            <main id="main-content">
                <Hero />

                <WaitlistSection />

                {/* Services Section - 3 core offerings */}
                <Services />

                {/* Agent Ecosystem - 6 Essential Agents */}
                <AgentEcosystem />

                {/* Comparison Section - 3 key differentiators */}
                <Comparison />

                {/* Pricing Section - 3-tier model */}
                <Pricing />

                {/* ROI Calculator - Interactive */}
                <ROICalculator />

                {/* FAQ Section - 5 questions */}
                <FAQ />

                <Footer onOpenTeam={() => setIsTeamOpen(true)} />
            </main>

            {/* Global Team Modal */}
            <About isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} />

            {/* Demo Cards Modal */}
            <DemoCards />
        </div>
    );
};

export default Home;
