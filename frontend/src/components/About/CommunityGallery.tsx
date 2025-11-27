import { motion } from "framer-motion";
import { TextReveal } from "../ui/text-reveal";

const CommunityGallery = () => {
    return (
        <section className="px-6 md:px-20 py-24 bg-black relative">
            {/* Text Header Content */}
            <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center mb-20 md:mb-46">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TextReveal className="text-neutral-300 font-sans font-bold capitalize leading-relaxed">
                        With CareLoop AI comprehensive suite of features, your personal health management reaches new heights of efficiency.
                        By integrating chat-based medicine ordering with intelligent helper delegation,
                        we ensure that no prescription goes unfilled and no urgent need goes unmet. From instant doctor consultations to automated
                        substitute suggestions, every tool is designed to streamline your daily wellness journey.
                    </TextReveal>
                </motion.div>
            </div>

            {/* Masonry Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-10 h-auto md:h-[720px]">

                {/* Left Column (2 stacked images, each spans 3 rows) */}
                <div className="md:col-span-3 md:row-span-6 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:row-span-3 h-[50%] rounded-2xl overflow-hidden relative group cursor-pointer"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500"
                            alt="Community"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:row-span-3 h-[50%] rounded-2xl overflow-hidden relative group cursor-pointer"
                    >
                        <img
                            src="https://imgs.search.brave.com/7n-HfCNvClFR9Q6u-qKRWxaQqyr-_rMc9IWb7U-inv8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTIv/MTcwLzA5Ny9zbWFs/bC9tZWRpY2luZS1k/b2N0b3Itb3ItcGhh/cm1hY2lzdC11c2Ut/dGFibGV0LW9yLW1v/YmlsZS1waG9uZS1o/ZWFsdGgtY2FyZS1h/bmQtbWVkaWNhbC1v/ci1oZWFsdGgtaW5z/dXJhbmNlLWNvbmNl/cHQtZnJlZS1waG90/by5qcGc"
                            alt="Doctor Checkup"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                </div>

                {/* Center Column (tall image spanning all rows) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-6 h-[85%] md:row-span-6 rounded-2xl overflow-hidden relative group self-center cursor-pointer"
                >
                    <img
                        src="./grid1.jpg"
                        alt="Happy Patient"
                        className="w-full h-full object-fit object-center transition-transform duration-700 scale-120 group-hover:scale-130"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Right Column (2 stacked images, each spans 3 rows) */}
                <div className="md:col-span-3 md:row-span-6 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:row-span-3 h-[50%] rounded-2xl overflow-hidden relative group cursor-pointer"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=500"
                            alt="Pharmacy"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:row-span-3 h-[50%] md:col-span-3 rounded-2xl overflow-hidden relative group md:mt-auto cursor-pointer"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=500"
                            alt="Active Lifestyle"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


export default CommunityGallery;