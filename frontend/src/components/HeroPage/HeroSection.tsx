import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../Header/Navbar';
import LoginModel from '../Header/LoginModel';
import FAQSystem from '../FAQSystem/FaqSystem';

// --- Constants ---
const ACCENT_COLOR = 'text-[#F9D000]';
const GRADIENT_BUTTON = 'bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5,
        },
    },
};

const primaryText = "CareLoop (Your AI-Driven Healthcare Ecosystem)";
const highlightedTagline = "One platform where people can access care, medicine, and human help — effortlessly.";

const HighlightedTagline = ({ text } : any) => {
    const parts = text.split('—');
    const mainPart = parts[0].trim().split(' ');
    const secondaryPart = parts.length > 1 ? parts[1].trim() : '';

    // Custom stagger container for the headline
    const headlineContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const word = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.div
            className="text-white text-4xl sm:text-6xl lg:text-[5.5rem] font-extrabold"
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-wrap justify-center items-baseline">
                {mainPart.map((wordText : any, index : any) => (
                    <motion.span
                        key={index}
                        variants={word}
                        className={`mr-2 ${index % 2 === 0 ? ACCENT_COLOR : 'text-white'}`} // Alternating color for high contrast
                    >
                        {wordText}
                    </motion.span>
                ))}
            </div>
            {secondaryPart && (
                <motion.p
                    className="mt-4 text-lg sm:text-2xl tracking-tight  text-gray-300 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    — effortlessly. ❤️
                </motion.p>
            )}
        </motion.div>
    );
};

// Main App Component
const HeroSection = () => {
    const [isModelOpen, setIsModalOpen] = useState(false);

    return (
        // Make the outer div a flex column container to manage screen height
        <div className="text-white h-screen font-inter overflow-x-hidden flex flex-col absolute inset-0">
            {/* Subtle Grainy Texture Overlay for the dark aesthetic */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJnIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zy4=")',
                backgroundSize: 'cover'
            }} />
            <Navbar setIsModalOpen={setIsModalOpen} />
            <LoginModel setIsModalOpen={setIsModalOpen} isModalOpen={isModelOpen} />
            {/* Hero Section - flex-grow ensures it takes up all remaining vertical space */}
            <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto w-full">

                {/* Subtitle/Primary Text */}
                <motion.h1
                    className="text-xl sm:text-2xl font-medium mb-4 tracking-wider text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    {primaryText}
                </motion.h1>

                {/* Highlighted Tagline */}
                <HighlightedTagline text={highlightedTagline} />

                <motion.div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.button
                        //onClick={() => handleAction('Features')}
                        className={`relative py-3 px-8 rounded-xl font-bold text-white transition duration-300 ease-in-out transform shadow-lg ${GRADIENT_BUTTON}`}
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Features
                    </motion.button>

                    <motion.button
                        //onClick={() => handleAction('About')}
                        className="relative py-3 px-8 rounded-xl font-bold text-white border-2 border-[#F9D000] transition duration-300 ease-in-out hover:bg-white/10"
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        About Us
                    </motion.button>
                </motion.div>
            </main>
            <FAQSystem />
        </div>
    );
};

export default HeroSection;