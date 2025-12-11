import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { AlarmCheck, Banknote, Cpu, Lock, Smile, Store } from "lucide-react";

const uspData = [
    {
        icon: Cpu,
        title: "Real Help, Not Just Chatbots",
        description:
            "24/7 AI assistance paired with real human experts for health guidance, medicine support, and quick resolutions.",
    },
    {
        icon: Store,
        title: "Your Neighborhood Pharmacies, Digitized",
        description:
            "Order medicines from trusted, verified local pharmacies around you — fast, safe, and reliable delivery.",
    },
    {
        icon: AlarmCheck,
        title: "Never Miss a Dose or Refill Again",
        description:
            "Get intelligent reminders, refill alerts, and personalized medication tracking — all in one place.",
    },
    {
        icon: Banknote,
        title: "Know What's in Stock — and at What Price",
        description:
            "Get real-time availability and transparent pricing across multiple pharmacies before placing an order.",
    },
    {
        icon: Lock,
        title: "Your Data, Fully Protected",
        description:
            "Bank-grade encryption, secure storage, and compliance with health data standards — your health information stays yours.",
    },
    {
        icon: Smile,
        title: "Simple, Friendly, and Designed for Everyone",
        description:
            "No confusing interfaces — CareLoop is built to be effortless for seniors, busy parents, and everyday users.",
    },
];

const positionClasses = ["mt-0", "mt-12", "mt-0", "mt-12", "mt-0", "mt-12"];

const USP_Card = ({ icon: Icon, title, description }: any) => {
    return (
        <motion.div
            className="h-[350px] w-full lg:w-[320px] p-8 rounded-3xl bg-[linear-gradient(to_bottom,rgba(60,60,60,0.55)_0%,rgba(20,20,20,1)_100%)] transform transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5"
        >
            <div className="icon-wrapper w-16 h-16 rounded-2xl bg-[#F9D000]/10 flex items-center justify-center mb-6 text-[#F9D000] transition-all duration-300">
                <Icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed font-sans">{description}</p>
        </motion.div>
    );
};


export default function CareLoopUsp() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    // Track scroll progress of the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 625);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            refs.current.forEach(card => {
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
            refs.current.forEach(card => {
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

    if (isMobile) {
        return (
            <section className="relative py-20 px-6 sm:px-8 bg-black font-inter overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
                            What Makes CareLoop
                            <br />
                            <span className="bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent">Unique</span>
                        </h2>
                        <p className="text-[17px] text-gray-500 max-w-md leading-relaxed">
                            Combining AI intelligence with real human support — so you're never alone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {uspData.map((usp, idx) => (
                            <div
                                key={idx}
                                className="h-[300px] w-full max-w-[360px] p-8 rounded-2xl bg-[linear-gradient(to_bottom,rgba(60,60,60,0.55)_0%,rgba(20,20,20,1)_100%)]"
                            >
                                <div className="icon-wrapper w-16 h-16 rounded-2xl bg-[#F9D000]/10 flex items-center justify-center mb-6 text-[#F9D000] transition-all duration-300">
                                    <usp.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{usp.title}</h3>
                                <p className="text-gray-400 text-[15px] leading-relaxed font-sans">{usp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <style>
                {`
                    .vision-card-glow-usp {
                        --glow-x: 50%;
                        --glow-y: 50%;
                        --glow-intensity: 0;
                        --glow-radius: 300px;
                        --glow-color: 249, 208, 0;
                        position: relative;
                        background: rgba(23, 23, 23, 0.5);
                        border: 1px solid rgba(64, 64, 64, 0.5);
                        border-radius: 1.5rem;
                        transition: all 0.3s ease;
                        width: 320px;
                        height: 350px;
                    }

                    .vision-card-glow-usp::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        padding: 2px;
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

                    .vision-card-glow-usp:hover {
                        background: rgba(23, 23, 23, 0.7);
                        border-color: rgba(249, 208, 0, 0.3);
                        transform: translateY(-4px);
                        box-shadow: 0 8px 32px rgba(249, 208, 0, 0.15);
                    }

                    .vision-card-glow-usp:hover::after {
                        opacity: 1;
                    }

                    /* Icon pulse animation on hover */
                    .vision-card-glow-usp:hover .icon-wrapper {
                        background: rgba(249, 208, 0, 0.2);
                        box-shadow: 0 0 20px rgba(249, 208, 0, 0.3);
                    }
                `}
            </style>
            <section ref={sectionRef} className="relative bg-black font-inter py-32 overflow-visible">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 overflow-visible">
                    <div className="grid grid-cols-5 gap-16 items-start overflow-visible">
                        {/* Left: Sticky heading */}
                        <div className="col-span-2 sticky top-24 h-fit">
                            <div className="">
                                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-18 mb-4">
                                    What Makes CareLoop
                                    <br />
                                    <span className="bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent">Unique</span>
                                </h2>
                                <p className="text-[17px] text-gray-500 font-sans font-bold max-w-md leading-relaxed">
                                    Combining AI intelligence with real human support — so you're never alone.
                                </p>

                                <div className="mt-8 w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#F9D000] to-[#F2AA00]"
                                        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Scrollable content */}
                        <div className="col-span-3 min-h-[150vh]">
                            <div className="py-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                                    {uspData.map((usp, idx) => (
                                        <motion.div
                                            key={idx}
                                            ref={el => { refs.current[idx] = el; }}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className={`${positionClasses[idx]} vision-card-glow-usp justify-center items-center mx-auto` }
                                        >
                                            <USP_Card
                                                icon={usp.icon}
                                                title={usp.title}
                                                description={usp.description}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}