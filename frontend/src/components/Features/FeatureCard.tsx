import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cardVariants:any = {
    hidden: (direction: "left" | "right") => ({
        opacity: 0,
        y: 40,
        x: direction === "left" ? -60 : 60,
        scale: 0.9,
    }),
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 0.61, 0.36, 1], // smooth easeOut curve
        },
    },
};

const FeatureCard = ({ icon: Icon, title, subtitle, description, index }: any) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Scroll-based parallax for the image
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"], // when card enters & leaves
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);  // up on scroll
    const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

    const direction: "left" | "right" = index % 2 === 0 ? "left" : "right";

    return (
        <motion.div
            ref={cardRef}
            className={`relative p-8 rounded-2xl bg-black border border-gray-800 
        hover:border-lime-400/50 transition-all duration-300 
        hover:shadow-xl hover:shadow-lime-400/10 group flex flex-col 
        md:flex-row ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}
        gap-6 justify-between`}
            variants={cardVariants}
            custom={direction}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.4, once: true }}   // triggers like in the video
            transition={{
                duration: 0.7,
                delay: index * 0.12,
            }}
        >
            {/* Text side */}
            <div className="w-full lg:w-[50%]">
                <div className="mb-6">
                    <div
                        className="w-14 h-14 rounded-xl bg-lime-400/10 border border-lime-400/30 
              flex items-center justify-center 
              group-hover:bg-lime-400/20 transition-colors duration-300"
                    >
                        <Icon className="w-7 h-7 text-[#F9D000]" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {title}
                </h3>

                <p className="text-sm font-medium text-[#F9D000] mb-4">
                    {subtitle}
                </p>

                <p className="text-gray-500 leading-relaxed font-sans font-semibold">
                    {description}
                </p>
            </div>

            {/* Parallax image side */}
            <motion.div
                className="hidden lg:block"
                style={{ y: imageY, scale: imageScale }}
            >
                <img
                    src="./are_you_doctor.webp"
                    alt=""
                    className="rounded-2xl pointer-events-none select-none"
                />
            </motion.div>
        </motion.div>
    );
};

export default FeatureCard;
