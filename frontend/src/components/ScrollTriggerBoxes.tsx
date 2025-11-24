// App.tsx (or StackingCards.tsx)
import React, { useRef } from "react";
import { ReactLenis } from "lenis/react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
    useInView,
} from "framer-motion";
import { Heart } from "lucide-react";

interface Project {
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
}

const ACCENT_COLOR_CLASS = "text-[#F9D000]";

const projects: Project[] = [
    {
        title: "AI-DRIVEN CARE CHAT",
        description:
            "Access instant, chat-based guidance for daily wellness, skin care advice, and routine suggestions (e.g., 'Suggest a daily routine for better sleep.'). Our assistant provides verified care advice and connects you to local specialists when needed.",
        src: "./are_you_doctor.webp",
        link: "./are_you_doctor.webp",
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
        link: "https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop",
        color: "#13006c",
    },
    {
        title: "MEDICINE ORDERING & DELIVERY",
        description:
            "Order medicines simply through chat. Our smart system instantly routes requests to local pharmacies for fast acceptance and delivery. If a pharmacy cannot deliver, our local helper network steps in to ensure hyperlocal, reliable fulfillment.",
        src: "house.jpg",
        link: "https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60",
        color: "#ed649e",
    },
    {
        title: "SMART REMINDER SYSTEM",
        description:
            "Our AI intelligently tracks and reminds users for critical health actions: timely medicine intake, scheduling reorders, upcoming regular health checkups, or even gentle hydration alerts to keep you proactive about your health.",
        src: "cactus.jpg",
        link: "https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop",
        color: "#fd521a",
    },
    {
        title: "HEALTH COMMUNITY & REWARDS",
        description:
            "Earn 'Healthy Points' for positive actions like timely medicine intake and completing health challenges. Access a community feed to share local health camps and receive pharmacy rewards, fostering a connected, community-driven ecosystem.",
        src: "cactus.jpg",
        link: "https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop",
        color: "#fd521a",
    },
];

const ScrollTriggerBoxes: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <ReactLenis root>
            <main className="bg-black" ref={container}>
                <section className="text-white h-[70vh] w-full bg-slate-950 grid place-content-center relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                    <motion.span
                        className={`py-1 px-4 text-sm font-semibold rounded-full border border-lime-400/30 ${ACCENT_COLOR_CLASS} bg-lime-400/10  mb-6 w-[150px] text-center flex mx-auto`}
                    >
                        <div className="flex items-center mx-1">
                            <Heart className="w-4 h-4 mr-1.5" />
                            Our Services
                        </div>
                    </motion.span>
                    <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
                        HOW CAN WE HELP? <br /> core pillars of CareLoop.👇
                    </h1>
                </section>

                <section className="text-white w-full bg-slate-950">
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

                <footer className="group bg-slate-950">
                    <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-linear-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear">
                        CareLoop AI
                    </h1>
                    <div className="bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full" />
                </footer>
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
    color,
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

    return (
        <div
            ref={container}
            className="h-screen flex items-center justify-center sticky top-0"
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className="flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-md lg:p-10 sm:p-4 p-2 origin-top border border-dashed border-gray-700"
            >
                <h2 className="text-3xl text-[#F9D000] font-semibold">{title}</h2>

                <div className="flex h-full mt-5 gap-10">
                    <div className="w-[40%] relative top-[10%]">
                        <p className="text-lg font-light">{description}</p>
                        <span className="flex items-center gap-2 pt-2 text-[#F9D000]">
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
                                    fill="#F9D000"
                                />
                            </svg>
                        </span>
                    </div>

                    <div className="relative w-[60%] h-full rounded-lg overflow-hidden">
                        <motion.div
                            className="w-full h-full"
                            style={{ scale: imageScale }}
                        >
                            <img
                                src={url}
                                alt={src}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ScrollTriggerBoxes;
