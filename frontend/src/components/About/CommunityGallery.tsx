import { motion } from "framer-motion";

const CommunityGallery = () => {
    return (
        <section className="px-6 md:px-20 py-24 bg-black relative">
            {/* Masonry Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-10 h-auto md:h-[720px] max-w-[90rem] mx-auto">
                {/* Left Column (2 stacked images, each spans 3 rows) */}
                <div className="md:col-span-3 md:row-span-6 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:row-span-3 h-[50%] rounded-2xl overflow-hidden relative group cursor-pointer"
                    >
                        <img
                            src="https://res.cloudinary.com/dvkvr88db/image/upload/v1764499167/Gemini_Generated_Image_1xgsjz1xgsjz1xgs_jojfkr_c_crop_ar_3_4_zb5jwk.png"
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
                        src="https://res.cloudinary.com/dvkvr88db/image/upload/v1764308693/grid1_bgjcvk.jpg"
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