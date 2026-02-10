import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
    value: string;
    label: string;
    suffix?: string;
}

const stats: StatItem[] = [
    { value: '48', suffix: 'h', label: 'Delivery Time' },
    { value: '15', suffix: '+', label: 'Hours Saved Weekly' },
    { value: '$4.2', suffix: 'K', label: 'Projected Monthly Savings' },
    { value: '100', suffix: '%', label: 'Custom Built' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1] as const,
        },
    },
};

const Stats: React.FC = () => {
    return (
        <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-surface-elevated border border-border p-6 md:p-8 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-baseline justify-center gap-0.5 mb-2">
                                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-accent tracking-[-0.04em] leading-none">
                                            {stat.value}
                                        </span>
                                        {stat.suffix && (
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-accent tracking-[-0.04em]">
                                                {stat.suffix}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                                        {stat.label}
                                    </p>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
