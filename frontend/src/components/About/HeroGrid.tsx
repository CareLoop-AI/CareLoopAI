import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, Activity, Truck, Bot, ArrowUpRight } from "lucide-react";

const HeroGrid = () => {
    const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'feature'>('mission');
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const content = {
        mission: {
            text: "We're building CareLoop to empower every local pharmacy and make healthcare more human, accessible, and community-driven. Most apps overlook small stores; we connect them.",
            bullets: ["Empowering Local Pharmacies", "Human-Centric Healthcare", "Community Driven"]
        },
        vision: {
            text: "You're not just making an app — you're creating a health-tech operating system for every city. Pharmacies become mini health hubs, and helpers provide on-ground logistics.",
            bullets: ["City-wide Health OS", "Decentralized Care", "Hyperlocal Logistics"]
        },
        feature: {
            text: "Our app lets users order medicines through chat, where local pharmacies can accept and deliver. If a pharmacy can't deliver, our local helper network steps in.",
            bullets: ["Chat-based Ordering", "Smart Order Routing", "Helper Fallback Network"]
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cardRefs.current.forEach(card => {
                if (!card) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const relativeX = (x / rect.width) * 100;
                const relativeY = (y / rect.height) * 100;

                // Calculate distance from center
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

                // Proximity detection
                const proximity = 300;
                const fadeDistance = 450;

                let glowIntensity = 0;
                if (distance <= proximity) {
                    glowIntensity = 1;
                } else if (distance <= fadeDistance) {
                    glowIntensity = (fadeDistance - distance) / (fadeDistance - proximity);
                }

                card.style.setProperty('--glow-x', `${relativeX}%`);
                card.style.setProperty('--glow-y', `${relativeY}%`);
                card.style.setProperty('--glow-intensity', glowIntensity.toString());
            });
        };

        const handleMouseLeave = () => {
            cardRefs.current.forEach(card => {
                if (!card) return;
                card.style.setProperty('--glow-intensity', '0');
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <style>
                {`
                    .hero-card-glow {
                        --glow-x: 50%;
                        --glow-y: 50%;
                        --glow-intensity: 0;
                        --glow-radius: 300px;
                        --glow-color: 249, 208, 0;
                        position: relative;
                    }

                    .hero-card-glow::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        padding: 3px;
                        background: radial-gradient(
                            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.9)) 0%,
                            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.5)) 30%,
                            transparent 60%
                        );
                        border-radius: inherit;
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        -webkit-mask-composite: xor;
                        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        mask-composite: exclude;
                        pointer-events: none;
                        opacity: 1;
                        transition: opacity 0.3s ease;
                        z-index: 1;
                    }

                    .hero-card-glow:hover::after {
                        opacity: 1;
                    }

                    .hero-card-glow-green {
                        --glow-color: 168, 255, 120;
                    }

                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }

                    .animate-bounce {
                        animation: bounce 1s infinite;
                    }

                    .delay-75 {
                        animation-delay: 0.075s;
                    }

                    .delay-150 {
                        animation-delay: 0.15s;
                    }
                `}
            </style>

            <div className="relative min-h-screen flex flex-col items-center px-4 md:px-12 pt-20 pb-20">
                {/* Top Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-16 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <Zap size={16} className="text-[#F9D000]" fill="#F9D000" />
                        <span className="text-neutral-400 uppercase tracking-[0.2em] text-xs font-bold">Who We Are</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white leading-tight"
                    >
                        Healthcare That Feels <br />
                        <span className="bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent italic">Human</span> & Accessible
                    </motion.h1>
                </div>

                {/* Main Asymmetric Grid */}
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

                    {/* Row 1, Col 1 (Small Image) - Represents "The Helper/Bee" */}
                    <motion.div
                        ref={el => { cardRefs.current[0] = el; }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 }}
                        className="hero-card-glow md:col-span-5 h-[300px] md:h-[400px] bg-gradient-to-br from-[#F9D000] to-amber-700 rounded-[2.5rem] relative overflow-hidden group flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                        <Truck className="text-black w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl opacity-80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                        <div className="absolute bottom-6 left-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-black font-bold text-sm">
                            Local Delivery Network
                        </div>
                    </motion.div>

                    {/* Row 1, Col 2 (Wide Image) - Represents "The Mountains/Structure" */}
                    <motion.div
                        ref={el => { cardRefs.current[1] = el; }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.3 }}
                        className="hero-card-glow md:col-span-7 h-[300px] md:h-[400px] bg-neutral-900 rounded-[2.5rem] relative overflow-hidden group border border-neutral-800"
                    >
                        {/* VIDEO — fills the card */}
                        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                            <video
                                src="https://res.cloudinary.com/dvkvr88db/video/upload/v1764926005/connections_online-video-cutter.com_gnz15t.mp4"
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>

                        {/* Icon (above video) */}
                        <div className="absolute top-8 right-8 z-10">
                            <Activity className="text-[#F9D000] w-12 h-12" />
                        </div>

                        {/* Text overlay (above video) */}
                        <div className="absolute top-8 left-8 max-w-xs z-10">
                            <h3 className="text-white text-2xl font-bold mb-2">Connected Ecosystem</h3>
                            <p className="text-neutral-400 text-sm">Pharmacies, Helpers, and Doctors in one sync.</p>
                        </div>
                    </motion.div>

                    {/* Row 2, Col 1 (Wide Content/Tabs) - Represents "Mission/Vision Text Area" */}
                    <motion.div
                        ref={el => { cardRefs.current[2] = el; }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.4 }}
                        className="hero-card-glow md:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 backdrop-blur-sm"
                    >
                        {/* Left Side: Buttons */}
                        <div className="flex flex-col gap-3 md:w-1/3 shrink-0">
                            {['mission', 'vision', 'feature'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-6 py-4 rounded-full text-left text-sm font-bold transition-all duration-300 ${activeTab === tab
                                        ? 'bg-gradient-to-r from-[#F9D000] to-[#F2AA00] text-black'
                                        : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                        }`}
                                >
                                    Our {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Right Side: Content */}
                        <div className="flex flex-col justify-between w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-6"
                                >
                                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base font-sans font-bold">
                                        {content[activeTab].text}
                                    </p>
                                    <ul className="space-y-2">
                                        {content[activeTab].bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-[#F9D000] font-medium">
                                                <ShieldCheck size={16} />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>

                            <button className="mt-8 group flex items-center gap-2 text-white border border-neutral-700 rounded-full px-6 py-3 w-fit hover:bg-gradient-to-r hover:from-[#F9D000] hover:to-[#F2AA00] hover:text-black hover:border-[#F9D000] transition-all">
                                <span>Explore Now</span>
                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Row 2, Col 2 (Small Image) - Represents "The Robot/AI" */}
                    <motion.div
                        ref={el => { cardRefs.current[3] = el; }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.5 }}
                        className="hero-card-glow hero-card-glow-green md:col-span-5 h-full min-h-[300px] bg-[#CDE8E5] rounded-[2.5rem] relative overflow-hidden group flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)' }}
                    >
                        <Bot className="text-black/80 w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl group-hover:rotate-12 transition-transform duration-500" strokeWidth={1.5} />
                        <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-black font-bold text-xs shadow-lg">
                            AI Powered
                        </div>
                        {/* Decorative dots */}
                        <div className="absolute bottom-8 left-8 flex gap-2">
                            <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-75" />
                            <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-150" />
                        </div>
                    </motion.div>

                </div>

                {/* Background Ambience */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F9D000] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
            </div>
        </>
    );
};

export default HeroGrid;