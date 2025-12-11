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
            className="h-[350px] w-[320px] p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800
                transform transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5"
        >
            <div className="p-3 w-fit rounded-xl mb-5 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/25">
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

    // Track scroll progress of the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        return (
            <section className="relative py-20 px-6 sm:px-8 bg-black font-inter overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
                            The CareLoop
                            <br />
                            <span className="text-gray-400">Difference</span>
                        </h2>
                        <p className="text-[17px] text-gray-500 max-w-md leading-relaxed">
                            Combining AI intelligence with real human support — so you're never alone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {uspData.map((usp, idx) => (
                            <div
                                key={idx}
                                className="h-[350px] w-full max-w-[360px] p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800"
                            >
                                <div className="p-3 w-fit rounded-xl mb-5 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/25">
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
        <section ref={sectionRef} className="relative bg-black font-inter py-32 overflow-visible">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 overflow-visible">
                <div className="grid grid-cols-5 gap-16 items-start overflow-visible">
                    {/* Left: Sticky heading */}
                    <div className="col-span-2 sticky top-24 h-fit">
                        <div className="">
                            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                                What Makes CareLoop 
                                <br />
                                <span className="text-[#F9D000]">Unique</span>
                            </h2>
                            <p className="text-[17px] text-gray-500 font-sans font-bold max-w-md leading-relaxed">
                                Combining AI intelligence with real human support — so you're never alone.
                            </p>

                            <div className="mt-8 w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-700"
                                    style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Scrollable content */}
                    <div className="col-span-3 min-h-[150vh]">
                        <div className="py-8">
                            <div className="grid grid-cols-2 gap-6">
                                {uspData.map((usp, idx) => (
                                    <div key={idx} className={positionClasses[idx]}>
                                        <USP_Card
                                            icon={usp.icon}
                                            title={usp.title}
                                            description={usp.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}