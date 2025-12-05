import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Zap,
    ShieldCheck,
    MessageSquare,
    Truck,
    Bot,
    ArrowUpRight,
} from 'lucide-react';

// --- Types ---
interface FeatureItem {
    title: string;
    desc: string;
    icon: React.ElementType;
}

// --- Data ---
const visionPoints: FeatureItem[] = [
    { title: "Chat Ordering", desc: "Simple UX for medicine ordering through chat.", icon: MessageSquare },
    { title: "Smart Acceptance", desc: "Fast, decentralized pharmacy acceptance system.", icon: Zap },
    { title: "Local Network", desc: "Hyperlocal reliability with helper delivery.", icon: Truck },
];

// --- Components ---

const SectionHeading = ({ children, align = "center" }: { children: React.ReactNode, align?: "left" | "center" }) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-bold mb-2 text-[#F9D000] tracking-tight ${align === "left" ? "text-left" : "text-center"}`}
        >
            {children}
        </motion.h2>
    );
};

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl backdrop-blur-sm hover:border-[#F9D000]/30 transition-colors duration-500 ${className}`}>
            {children}
        </div>
    );
};

// --- Hero Section ---

const Hero = () => {
    const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'feature'>('mission');

    const content = {
        mission: {
            text: "We’re building MedSync to empower every local pharmacy and make healthcare more human, accessible, and community-driven. Most apps overlook small stores; we connect them.",
            bullets: ["Empowering Local Pharmacies", "Human-Centric Healthcare", "Community Driven"]
        },
        vision: {
            text: "You’re not just making an app — you’re creating a health-tech operating system for every city. Pharmacies become mini health hubs, and helpers provide on-ground logistics.",
            bullets: ["City-wide Health OS", "Decentralized Care", "Hyperlocal Logistics"]
        },
        feature: {
            text: "Our app lets users order medicines through chat, where local pharmacies can accept and deliver. If a pharmacy can’t deliver, our local helper network steps in.",
            bullets: ["Chat-based Ordering", "Smart Order Routing", "Helper Fallback Network"]
        }
    };

    return (
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
                    <span className="text-[#F9D000] italic">Human</span> & Accessible
                </motion.h1>
            </div>

            {/* Main Asymmetric Grid */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

                {/* Row 1, Col 1 (Small Image) - Represents "The Helper/Bee" */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-5 h-[300px] md:h-[400px] bg-gradient-to-br from-[#F9D000] to-amber-700 rounded-[2.5rem] relative overflow-hidden group flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <Truck className="text-black w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl opacity-80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                    <div className="absolute bottom-6 left-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-black font-bold text-sm">
                        Local Delivery Network
                    </div>
                </motion.div>

                {/* Row 1, Col 2 (Wide Image) - Represents "The Mountains/Structure" */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-7 h-[300px] md:h-[400px] bg-neutral-900 rounded-[2.5rem] relative overflow-hidden group border border-neutral-800"
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
                        // Optional: try to autoplay programmatically if needed
                        // onLoadedMetadata={e => (e.currentTarget.play().catch(() => {}))}
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
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 backdrop-blur-sm"
                >
                    {/* Left Side: Buttons */}
                    <div className="flex flex-col gap-3 md:w-1/3 shrink-0">
                        {['mission', 'vision', 'feature'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-4 rounded-full text-left text-sm font-bold transition-all duration-300 border ${activeTab === tab
                                    ? 'bg-[#F9D000] text-black border-[#F9D000]'
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

                        <button className="mt-8 group flex items-center gap-2 text-white border border-neutral-700 rounded-full px-6 py-3 w-fit hover:bg-[#F9D000] hover:text-black hover:border-[#F9D000] transition-all">
                            <span>Explore Now</span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Row 2, Col 2 (Small Image) - Represents "The Robot/AI" */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.5 }}
                    className="md:col-span-5 h-full min-h-[300px] bg-[#CDE8E5] rounded-[2.5rem] relative overflow-hidden group flex items-center justify-center"
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
    );
};

const CoreVision = () => {
    return (
        <section className="px-6 md:px-20 py-24 bg-neutral-900/20">
            <SectionHeading>The Execution Engine</SectionHeading>
            <div className="max-w-2xl mx-auto text-center mb-16 text-neutral-400">
                We are building a solid, defensible foundation.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visionPoints.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="h-full flex flex-col items-center text-center hover:bg-neutral-900 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-[#F9D000]/10 flex items-center justify-center mb-6 text-[#F9D000]">
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-neutral-500 text-sm md:text-xl leading-relaxed">{item.desc}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};




const AboutSection = () => {
    
    return (
        <div id='about' className='w-full bg-black relative z-50 selection:bg-[#F9D000] selection:text-black overflow-hidden'>
            <div className="pt-20 min-h-screen w-full bg-black rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden relative shadow-2xl md:mt-10 mx-auto ">
                <div className='max-w-[95rem] mx-auto'>
                    <CoreVision />
                    <Hero />
                </div>
                <div className="h-10 bg-black" />
            </div>
        </div>
    );
};

export default AboutSection;


{/* {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className="w-full bg-gradient-to-t from-neutral-800 to-[#F9D000]/20 rounded-t-2xl border-t border-[#F9D000]/30"
                            />
                        ))} */}