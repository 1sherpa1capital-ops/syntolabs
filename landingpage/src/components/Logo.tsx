import React from 'react';

/**
 * Logo component with SVG gradient
 * Updated to Obsidian & Silver Theme (Luxury Tech)
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
                <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#a1a1aa" />
                    <stop offset="100%" stopColor="#52525b" />
                </linearGradient>
            </defs>

            {/* Simple Geometric Pipe Shape */}
            <path 
                d="M8 12V28H24V12H8ZM6 4H26V10H6V4Z" 
                fill="url(#silverGradient)" 
                stroke="white" 
                strokeWidth="0.5" 
                strokeOpacity="0.2" 
            />
            
            {/* Minimal High-Light */}
            <rect x="10" y="4" width="1" height="24" fill="white" fillOpacity="0.3" />
        </svg>
    );
};

export default Logo;
