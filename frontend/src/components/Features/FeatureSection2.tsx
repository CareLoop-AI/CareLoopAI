import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/utils/FaqUtil";
import { MoveLeft, MoveRight } from "lucide-react";



export default function FeatureSection2() {
    const autoPlayMs = 10000;
    const [index, setIndex] = useState(0);
    const length = projects.length;
    const timerRef = useRef<number | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef(false);

    // Advance slide
    const next = () => setIndex((i) => (i + 1) % length);
    const prev = () => setIndex((i) => (i - 1 + length) % length);
    const goTo = (n :any) => setIndex(() => ((n % length) + length) % length);

    useEffect(() => {
        // autoplay
        if (!autoPlayMs) return;
        function tick() {
            if (!isHoveredRef.current) next();
        }
        timerRef.current = setInterval(tick, autoPlayMs);
        return () => clearInterval(timerRef.current);
    }, [autoPlayMs, length]);

    // pause on hover
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onEnter = () => { isHoveredRef.current = true; };
        const onLeave = () => { isHoveredRef.current = false; };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    // keyboard navigation
    useEffect(() => {
        const onKey = (e : any) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // framer motion variants
    const imgVariants = {
        enter: { opacity: 0, x: 30 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 }
    };

    const contentVariants = {
        enter: { opacity: 0, y: 12 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 }
    };

    return (
        <div ref={containerRef} className="w-full max-w-7xl mx-auto bg-gradient-to-br from-black/60 to-black/40 rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* LEFT: Image panel */}
                <div className="relative h-64 md:h-[560px] rounded-xl overflow-hidden shadow-lg">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={projects[index].title}
                            src={projects[index].link}
                            alt={projects[index].title}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={imgVariants}
                            transition={{ duration: 0.55 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>

                {/* RIGHT: Content panel (prev/next controls moved here) */}
                <div className="relative min-h-[220px] md:min-h-[560px] rounded-xl p-6 md:p-12 bg-gradient-to-b from-white/4 to-white/2 ">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={projects[index].title}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={contentVariants}
                            transition={{ duration: 0.45 }}
                            className="h-full flex flex-col justify-between gap-6 md:gap-40 lg:gap-60"
                        >
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-neutral-300">Featured</h3>
                                <h2 className="mt-2 text-2xl md:text-3xl font-semibold leading-tight bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent">{projects[index].title}</h2>
                                <p className="mt-2 text-neutral-400 font-sans font-bold">{projects[index].description}</p>
                            </div>

                            <div className="mt-6   flex items-center justify-between ">
                                <button disabled className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black border-2 border-[#F9D000] hover:bg-gradient-to-r hover:from-[#F9D000] hover:to-[#F2AA00] text-white hover:text-black font-medium shadow-sm hover:scale-[1.01] transition-transform cursor-not-allowed">
                                    {projects[index].cta.label}
                                </button>

                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-neutral-400">{index + 1} / {length}</div>

                                    {/* Prev / Next moved here for right-side controls */}
                                    <div className="flex items-center gap-2">
                                        <button onClick={prev} aria-label="Previous" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">
                                            <MoveLeft />
                                        </button>
                                        <button onClick={next} aria-label="Next" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">
                                            <MoveRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* small navigation for mobile: dots placed inside content on small screens */}
                    <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 bottom-2 flex gap-2">
                        {projects.map((_, i) => (
                            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
