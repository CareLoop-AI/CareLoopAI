import { motion } from "framer-motion";
import { useState } from "react";
import LoginModel from "../Header/LoginModel";

const FinalCTA = () => {
    const [isModelOpen, setIsModalOpen] = useState(false);
    return (
        <div className="relative bg-black pt-10 pb-20">
            <div className="relative mx-4 md:mx-12 overflow-hidden rounded-3xl md:rounded-tr-[20rem] md:rounded-bl-[20rem] bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600 border border-neutral-800">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F9D000] opacity-5 blur-[100px] pointer-events-none" />

                <div className="px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Why don't you start today?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-400 max-w-2xl mb-10 text-lg font-sans font-bold"
                    >
                        With the full CareLoop ecosystem, your community health planning can reach new heights of efficiency.
                        Join the network that keeps every delivery local and fast.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                        }}
                        className="bg-[#F9D000] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(249,208,0,0.3)] capitalize cursor-pointer"
                    >
                        Get Started
                    </motion.button>
                </div>
            </div>
            <LoginModel setIsModalOpen={setIsModalOpen} isModalOpen={isModelOpen} />
        </div>
    );
};

export default FinalCTA;