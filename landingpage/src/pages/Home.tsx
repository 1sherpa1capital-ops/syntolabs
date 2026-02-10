import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import PlayfulFeatureCards from '../components/PlayfulFeatureCards';
import FAQ from '../components/FAQ';
import DemoCards from '../components/DemoCards';
import Problem from '../components/Problem';
import Comparison from '../components/Comparison';
import AdSpendProtection from '../components/AdSpendProtection';
import ROICalculator from '../components/ROICalculator';
import About from '../components/About';
import Footer from '../components/Footer';
import AdditionalFeatures from '../components/AdditionalFeatures';
import Pricing from '../components/Pricing';
import CaseStudies from '../components/CaseStudies';
import AgentEcosystem from '../components/AgentEcosystem';
import WhyUs from '../components/WhyUs';
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
                
                {/* Services Section - Agent-N inspired with visual mockups */}
                <Services />

                {/* Stats Section - Bold numbers */}
                <Stats />

                {/* The "Why" - Problem/Emotional Hook */}
                <Problem />

                {/* The "How" - Process/Features */}
                <PlayfulFeatureCards />
                
                <AdSpendProtection />
                <CaseStudies />

                {/* Agent Ecosystem - 8 Core Agents */}
                <AgentEcosystem />

                {/* Why Us - Competitive Positioning */}
                <WhyUs />

                <AdditionalFeatures />
                <Comparison />
                
                {/* Pricing Section - 3-tier Agent-N model */}
                <Pricing />
                
                <ROICalculator />
                
                {/* FAQ Section - Accordion style */}
                <FAQ />
                
                <Footer onOpenTeam={() => setIsTeamOpen(true)} />
            </main>

            {/* Global Team Modal */}
            <About isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} />
        </div>
    );
};

export default Home;
