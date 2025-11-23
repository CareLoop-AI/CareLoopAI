import { motion } from "framer-motion";



const ACCENT_COLOR_CLASS = 'text-lime-400';
const ACCENT_BG_CLASS = 'bg-lime-400';

const featureCardVariants : any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

const FeatureCard = ({ icon: Icon, title, subtitle, description } : any) => {
    return (
        <motion.div
            className="bg-black p-6 sm:p-8 rounded-xl border border-gray-800 hover:border-lime-400/50 transition duration-300 shadow-xl flex flex-col justify-start h-full"
            variants={featureCardVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(190, 242, 100, 0.1)" }}
        >
            <div className="flex items-center space-x-4 mb-4">
                {/* Icon with Neon Circle Effect */}
                <div className={`p-3 rounded-full border-2 border-lime-400/50 ${ACCENT_BG_CLASS} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${ACCENT_COLOR_CLASS}`} strokeWidth={2.5} />
                </div>
                <div className={`text-sm font-semibold uppercase tracking-wider text-gray-400`}>
                    {subtitle}
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{title}</h3>
            <p className="text-base text-gray-400 mb-6 flex-grow">{description}</p>

            {/* Footer/Action area */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
                <span className="text-sm font-medium flex items-center text-lime-400 transition-colors duration-300">
                    Learn More
                    <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
            </div>
        </motion.div>
    );
}

export default FeatureCard