import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Truck, Zap } from "lucide-react";

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
        <div className={`p-8 rounded-3xl backdrop-blur-sm ${className}`}>
            {children}
        </div>
    );
};

interface FeatureItem {
    title: string;
    desc: string;
    icon: React.ElementType;
}

const visionPoints: FeatureItem[] = [
    { title: "Chat Ordering", desc: "Simple UX for medicine ordering through chat.", icon: MessageSquare },
    { title: "Smart Acceptance", desc: "Fast, decentralized pharmacy acceptance system.", icon: Zap },
    { title: "Local Network", desc: "Hyperlocal reliability with helper delivery.", icon: Truck },
];


const CoreVision = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
                    .vision-card-glow {
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
                    }

                    .vision-card-glow::after {
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

                    .vision-card-glow:hover {
                        background: rgba(23, 23, 23, 0.7);
                        border-color: rgba(249, 208, 0, 0.3);
                        transform: translateY(-4px);
                        box-shadow: 0 8px 32px rgba(249, 208, 0, 0.15);
                    }

                    .vision-card-glow:hover::after {
                        opacity: 1;
                    }

                    /* Icon pulse animation on hover */
                    .vision-card-glow:hover .icon-wrapper {
                        background: rgba(249, 208, 0, 0.2);
                        box-shadow: 0 0 20px rgba(249, 208, 0, 0.3);
                    }
                `}
            </style>

            <section className="px-6 md:px-20 py-24 bg-neutral-900/20 mt-5 md:mt-20">
                <SectionHeading>The Execution Engine</SectionHeading>
                <div className="max-w-2xl mx-auto text-center mb-16 text-neutral-400">
                    We are building a solid, defensible foundation.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {visionPoints.map((item, idx) => (
                        <motion.div
                            key={idx}
                            ref={el => { cardRefs.current[idx] = el; }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="vision-card-glow"
                        >
                            <Card className="h-full flex flex-col items-center text-center">
                                <div className="icon-wrapper w-16 h-16 rounded-2xl bg-[#F9D000]/10 flex items-center justify-center mb-6 text-[#F9D000] transition-all duration-300">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default CoreVision;