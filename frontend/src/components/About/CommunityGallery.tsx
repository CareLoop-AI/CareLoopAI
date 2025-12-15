import { motion } from "framer-motion";

const CommunityGallery = () => {
    return (
        <section className="px-6 md:px-20 py-24 bg-black relative">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-10 h-auto md:h-[720px] max-w-[85rem] p-8 mx-auto">
                <div className="md:col-span-3 md:row-span-6 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:row-span-3 h-[50%] rounded-2xl overflow-hidden relative group cursor-pointer"
                    >
                        <img
                            src="https://res.cloudinary.com/dvkvr88db/image/upload/v1765631502/1_cihfu5.png"
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
                            src="https://res.cloudinary.com/dvkvr88db/image/upload/v1765631042/2_dtjmzx.png"
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
                            src="https://res.cloudinary.com/dvkvr88db/image/upload/v1765631210/3_yktlgh.png"
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
                            src="https://res.cloudinary.com/dvkvr88db/image/upload/v1765631310/5_uoasdy.png"
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