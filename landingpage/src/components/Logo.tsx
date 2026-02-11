import React from 'react';

/**
 * Logo component with SVG gradient
 * Updated to Deep Tech Enterprise Theme (Cosmic Blue)
 */
const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
            role="img"
        >
            <defs>
                <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="30%" stopColor="#6366f1" />
                    <stop offset="60%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
            </defs>

            {/* Pipe Body with Gradient */}
            <rect x="6" y="12" width="20" height="20" fill="url(#pipeGradient)" stroke="#000" strokeWidth="0.5" strokeOpacity="0.1" />

            {/* Pipe Top with Gradient */}
            <rect x="4" y="4" width="24" height="8" fill="url(#pipeGradient)" stroke="#000" strokeWidth="0.5" strokeOpacity="0.1" />

            {/* Specular High-Light (The "Shiny" line) */}
            <rect x="8" y="4" width="3" height="28" fill="white" fillOpacity="0.4" />
            <rect x="13" y="4" width="1" height="28" fill="white" fillOpacity="0.15" />

            {/* Core Shadow for Depth */}
            <rect x="22" y="4" width="4" height="28" fill="black" fillOpacity="0.15" />

            {/* Top Rim Highlight */}
            <rect x="4" y="4" width="24" height="1.5" fill="white" fillOpacity="0.3" />

            {/* Bottom Edge Shadow for the Top Part */}
            <rect x="4" y="11" width="24" height="1" fill="black" fillOpacity="0.2" />

            {/* Connecting Shadow */}
            <rect x="6" y="12" width="20" height="1.5" fill="black" fillOpacity="0.3" />
        </svg>
    );
};

export default Logo;
