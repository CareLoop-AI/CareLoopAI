import { motion } from "framer-motion"
import { TextReveal } from "../ui/text-reveal"

const TextShowcase = () => {
    return (
        <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <TextReveal className="text-neutral-300 capitalize leading-relaxed">
                    With CareLoop AI comprehensive suite of features, your personal health management reaches new heights of efficiency.
                    By integrating chat-based medicine ordering with intelligent helper delegation,
                    we ensure that no prescription goes unfilled and no urgent need goes unmet. From instant doctor consultations to automated
                    substitute suggestions, every tool is designed to streamline your daily wellness journey.
                </TextReveal>
            </motion.div>
        </div>
    )
}

export default TextShowcase