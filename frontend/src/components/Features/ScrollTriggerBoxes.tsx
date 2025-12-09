// ScrollTriggerBoxes.tsx (or App.tsx)
import React, { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Heart } from "lucide-react";
import { projects } from "@/utils/FaqUtil";

const ACCENT_COLOR_CLASS = "text-[var(--accent-2)]";

const ScrollTriggerBoxes: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

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
                        <div className="flex items-center mx-1">
                            <Heart className="w-4 h-4 mr-1.5" />
                            Our Services
                        </div>
                    </motion.span>

                    <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
                        HOW CAN WE <span className="text-[#F9D000]">HELP?</span> <br />{" "}
                        <span className="text-[#F9D000]">core pillars</span> of CareLoop.👇
                    </h1>
                </section>

                <section className="max-w-[90rem] mx-auto relative z-10 pb-20 border-none">
                    {projects.map((project, i) => {
                        const targetScale = 1 - (projects.length - i) * 0.05;
                        return (
                            <Card
                                key={`p_${i}`}
                                i={i}
                                url={project.link}
                                src={project.src}
                                title={project.title}
                                color={project.color}
                                description={project.description}
                                progress={scrollYProgress}
                                range={[i * 0.25, 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </section>
            </main>
        </ReactLenis>
    );
};

interface CardProps {
    i: number;
    title: string;
    description: string;
    src: string;
    url: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card: React.FC<CardProps> = ({
    i,
    title,
    description,
    src,
    url,
    progress,
    range,
    targetScale,
}) => {
    const container = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    const isEven = i % 2 === 0;

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className={`relative
                    w-[90%] md:w-[85%] lg:w-[80%]
                    text-white bg-white
                    rounded-3xl
                    overflow-hidden
                    shadow-lg
                    flex  flex-col md:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
                {/* Info block: on mobile this is first (text then image), on md+ width is 2/5 */}
                <div
                    className={`w-full md:w-2/5 flex flex-col justify-center order-1 md:order-1 px-4 md:px-20
                pt-3 md:pt-0 bg-black ${isEven ? "md:rounded-l-3xl" : " md:rounded-r-3xl"}`}
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-[var(--accent-2)]">
                        {title}
                    </h2>

                    <p className="mt-4 text-base md:text-lg font-sans font-bold text-gray-400 leading-relaxed">
                        {description}
                    </p>

                    <span className="flex items-center gap-2 pt-4 mb-2 md:mb-0 text-[var(--accent-2)]">
                        <a href="#" target="_blank" rel="noreferrer" className="underline cursor-pointer">
                            See more
                        </a>
                        <svg
                            width="22"
                            height="12"
                            viewBox="0 0 22 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                                fill="currentColor"
                            />
                        </svg>
                    </span>
                </div>

                {/* Image block: on mobile appears after info, on md+ width is 3/5 */}
                <div
                    className={`relative w-full md:w-3/5 flex items-center justify-center order-2 md:order-2 md:mt-0
                overflow-hidden ${isEven ? " md:rounded-r-3xl" : " md:rounded-l-3xl"}`}
                >
                    {/* extra wrapper to clip the scaling image */}
                    <motion.div
                        className="w-full h-full rounded-3xl overflow-hidden will-change-transform"
                        style={{ scale: imageScale }}
                    >
                        <img
                            src={url}
                            alt={src ?? title}
                            className="w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] object-cover relative"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ScrollTriggerBoxes;
