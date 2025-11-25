// App.tsx (or StackingCards.tsx)
import React, { useRef } from "react";
import { ReactLenis } from "lenis/react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
} from "framer-motion";
import { Heart } from "lucide-react";

interface Project {
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
}

const ACCENT_COLOR_CLASS = "text-[var(--accent-2)]";

const projects: Project[] = [
    {
        title: "AI-DRIVEN CARE CHAT",
        description:
            "Access instant, chat-based guidance for daily wellness, skin care advice, and routine suggestions (e.g., 'Suggest a daily routine for better sleep.'). Our assistant provides verified care advice and connects you to local specialists when needed.",
        src: "./are_you_doctor.webp",
        link: "https://imgs.search.brave.com/CPJGjOcuwnf_mtDxB3c7bcdzbY0QOSaHXFINX72oMXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIz/MzA5NzEyMC9waG90/by9haS10aGVyYXB5/LWNoYXQtYXBwLW9u/LXNtYXJ0cGhvbmUt/Zm9yLW1lbnRhbC1o/ZWFsdGgtc3VwcG9y/dC1lbW90aW9uYWwt/d2VsbGJlaW5nLWFz/c2lzdGFudC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9am1X/SDBjWERqazdTMWNK/UV85ZWw5c0J2ZzVN/RVh1Mmx1MnYtbm1S/TjJGdz0",
        color: "#5196fd",
    },
    {
        title: "INSTANT DOCTOR CONSULTATION",
        description:
            "Connect instantly with verified local or online doctors via video, audio, or text chat. Prescriptions are automatically stored and synced in your app, enabling instant ordering and follow-up reminders for checkups or lab tests.",
        src: "tree.jpg",
        link: "./are_you_doctor.webp",
        color: "#8f89ff",
    },
    {
        title: "HEALTH TESTS & DIAGNOSTICS",
        description:
            "Book essential blood, urine, and health tests directly through the chat interface. We coordinate sample pickup by our local helper network. Receive digital reports in the app with AI-powered insights that highlight abnormal readings and offer preliminary advice.",
        src: "water.jpg",
        link: "https://imgs.search.brave.com/wd68U8yWGrx1tYSps4l9980lIAeR47D_TPfcLMa1mpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYmxvb2QtdGVz/dF83NzMxODYtMTQx/MC5qcGc_c2VtdD1h/aXNfaW5jb21pbmcm/dz03NDAmcT04MA",
        color: "#13006c",
    },
    {
        title: "MEDICINE ORDERING & DELIVERY",
        description:
            "Order medicines simply through chat. Our smart system instantly routes requests to local pharmacies for fast acceptance and delivery. If a pharmacy cannot deliver, our local helper network steps in to ensure hyperlocal, reliable fulfillment.",
        src: "house.jpg",
        link: "https://imgs.search.brave.com/_HWMQ1TkVleVSuteOhNJjtdstv4zEsy7zgiYy13SxRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/NDc3MDk2Ni9waG90/by9kZWxpdmVyeS1w/ZXJzb24tZGVsaXZl/cmluZy1tZWRpY2lu/ZS10by13b21hbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QWJqRV9Ydmt0cjRN/RUNaQXFIcmpkU2hW/aVJYUHphUXZFSDdj/bkpCVHhVMD0",
        color: "#ed649e",
    },
    {
        title: "SMART REMINDER SYSTEM",
        description:
            "Our AI intelligently tracks and reminds users for critical health actions: timely medicine intake, scheduling reorders, upcoming regular health checkups, or even gentle hydration alerts to keep you proactive about your health.",
        src: "cactus.jpg",
        link: "./unnamed.jpg",
        color: "#fd521a",
    },
    {
        title: "HEALTH COMMUNITY & REWARDS",
        description:
            "Earn 'Healthy Points' for positive actions like timely medicine intake and completing health challenges. Access a community feed to share local health camps and receive pharmacy rewards, fostering a connected, community-driven ecosystem.",
        src: "cactus.jpg",
        link: "./community_rewards.jpg",
        color: "#fd521a",
    },
];

const ScrollTriggerBoxes: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <ReactLenis root>
            <main className="z-50 relative bg-amber-50 rounded-t-[4rem]" ref={container}>
                <section className="h-[70vh] w-full grid place-content-center overflow-hidden relative">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_100%_at_50%_0%,#000_50%,transparent_100%)]" />
                    <motion.span
                        className={`py-1 px-4 text-sm font-semibold rounded-full border border-lime-400/30 ${ACCENT_COLOR_CLASS} bg-lime-400/10  mb-6 w-[150px] text-center flex mx-auto`}
                    >
                        <div className="flex items-center mx-1">
                            <Heart className="w-4 h-4 mr-1.5" />
                            Our Services
                        </div>
                    </motion.span>
                    <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] ">
                        HOW CAN WE <span className="text-[#F9D000]">HELP?</span> <br /> <span className="text-[#F9D000]">core pillars</span> of CareLoop.👇
                    </h1>
                </section>

                <section className="w-full relative z-10 mb-20">
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
        <div
            ref={container}
            className="h-[80vh] flex items-center justify-center sticky top-0"
        >
            <motion.div
                style={{
                    scale,
                    // keep overlap effect, but only apply large negative top on md+
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className={`relative
                    w-[90%] md:w-[85%] lg:w-[80%]
                    md:-top-[25%] text-white bg-white
                    rounded-3xl
                    shadow-lg
                    flex flex-col md:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
                {/* Info block: on mobile this is first (text then image), on md+ width is 2/5 */}
                <div
                    className={`w-full md:w-3/5 flex flex-col justify-center order-1 md:order-1 px-2 md:px-20
                    pt-2 md:pt-0 bg-black  ${isEven ? "md:rounded-l-3xl" : " md:rounded-r-3xl"}`}
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-[var(--accent-2)]">
                        {title}
                    </h2>

                    <p className="mt-4 text-base md:text-lg font-light leading-relaxed">
                        {description}
                    </p>

                    <span className="flex items-center gap-2 pt-4 text-[var(--accent-2)]">
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="underline cursor-pointer"
                        >
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

                {/* Image block: on mobile appears after info, on md+ width is 3/5 and position is controlled by parent flex direction */}
                <div className={`relative w-full md:w-3/5 flex items-center justify-center order-2 md:order-2 md:mt-0
                    overflow-hidden ${isEven ? " md:rounded-r-3xl" : " md:rounded-l-3xl"}
                    `}>
                    <motion.div className="w-full h-full" style={{ scale: imageScale }}>
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
