import React, { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FeatureSection2 from "./FeatureSection2";

const ACCENT_COLOR_CLASS = "text-[var(--accent-2)]";

const FeatureSection: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);

    return (
        <ReactLenis root>
            <main
                id="features"
                className="z-50 relative bg-black text-white"
                ref={container}
            >
                <section className="h-[70vh] w-full grid place-content-center overflow-hidden relative">
                    <motion.span
                        className={`py-1 px-4 text-sm font-semibold rounded-full border border-lime-400/30 ${ACCENT_COLOR_CLASS} bg-lime-400/10 mb-6 w-[150px] text-center flex mx-auto`}
                    >
                        <div className="flex items-center mx-1 ">
                            <Heart className="w-4 h-4 mr-1.5" />
                            <span className="bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent">Our Services</span>
                        </div>
                    </motion.span>

                    <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
                        HOW CAN WE <span className="bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent">HELP?</span> <br />{" "}
                        <span className="bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent">core pillars</span> of CareLoop.👇
                    </h1>
                </section>

                <section className="max-w-[90rem] mx-auto relative z-10 pb-20 border-none">
                    <FeatureSection2 />
                </section>
            </main>
        </ReactLenis>
    );
};

export default FeatureSection;
