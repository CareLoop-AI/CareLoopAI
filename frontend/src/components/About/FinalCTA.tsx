import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoginModel from "../Header/LoginModel";
import { isAuthenticated } from "@/utils/auth";

const FinalCTA = () => {
    const [isModelOpen, setIsModalOpen] = useState(false);
    const [logedinUser, setLogedinUser] = useState(false);


    useEffect(() => {
        if (isAuthenticated()) {
            setLogedinUser(true);
        }
    }, []);

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="max-w-[85rem] mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.15 }}
                    className=" relative rounded-[3.5rem] bg-[#ffdd31b9] px-10 md:px-20 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-16"
                >
                    {/* LEFT CONTENT */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -140 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1], 
                                },
                            },
                        }}
                        className="max-w-2xl"
                    >
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
                            className="text-neutral-300 max-w-xl mb-10 text-lg font-sans font-bold"
                        >
                            With the full CareLoop ecosystem, your community health planning can reach new heights of efficiency.
                            Join the network that keeps every delivery local and fast.
                        </motion.p>

                        {!logedinUser ? (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsModalOpen(true);
                                }}
                                className="bg-black hover:bg-gradient-to-r from-[#F9D000] to-[#F2AA00] text-white hover:text-black px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(249,208,0,0.3)] cursor-pointer"
                            >
                                Get Started
                            </motion.button>
                        ) : (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = "/";
                                }}
                                className="
                                    bg-gradient-to-r
                                    from-[#F9D000]
                                    to-[#F2AA00]
                                    text-black
                                    px-10
                                    py-4
                                    rounded-xl
                                    font-bold
                                    text-lg
                                    transition-all
                                    duration-300
                                    hover:scale-105
                                    shadow-[0_0_20px_rgba(249,208,0,0.3)]
                                "
                            >
                                Go to Home Page
                            </motion.button>
                        )}
                    </motion.div>
                    {/* RIGHT IMAGE */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 140 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className="w-full max-w-md"
                    >
                        <img
                            src="https://res.cloudinary.com/dvkvr88db/image/upload/v1765785856/gettyimages-1386963076-612x612_casu0g.jpg"
                            alt=""
                            className="w-full h-full object-cover rounded-[2.5rem] shadow-xl"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <LoginModel setIsModalOpen={setIsModalOpen} isModalOpen={isModelOpen} />
        </section>
    );
};

export default FinalCTA;
