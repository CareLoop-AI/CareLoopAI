import { motion, useInView } from "framer-motion";
import { Heart, MessageSquare, Microscope, Stethoscope, Briefcase, Trello, Award } from 'lucide-react';
import { useRef } from 'react';

const FeatureCard = ({ icon: Icon, title, subtitle, description, index } : any) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-lime-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10 group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
        >
            <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center group-hover:bg-lime-400/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#F9D000]" />
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {title}
            </h3>

            <p className="text-sm font-medium text-[#F9D000] mb-4">
                {subtitle}
            </p>

            <p className="text-gray-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
};

const features = [
    {
        icon: MessageSquare,
        title: "AI-DRIVEN CARE CHAT",
        subtitle: "Personalized Health & Care Hub",
        description: "Access instant, chat-based guidance for daily wellness, skin care advice, and routine suggestions (e.g., 'Suggest a daily routine for better sleep.'). Our assistant provides verified care advice and connects you to local specialists when needed.",
    },
    {
        icon: Stethoscope,
        title: "INSTANT DOCTOR CONSULTATION",
        subtitle: "Telemedicine Integration",
        description: "Connect instantly with verified local or online doctors via video, audio, or text chat. Prescriptions are automatically stored and synced in your app, enabling instant ordering and follow-up reminders for checkups or lab tests.",
    },
    {
        icon: Microscope,
        title: "HEALTH TESTS & DIAGNOSTICS",
        subtitle: "Seamless Booking and Reports",
        description: "Book essential blood, urine, and health tests directly through the chat interface. We coordinate sample pickup by our local helper network. Receive digital reports in the app with AI-powered insights that highlight abnormal readings and offer preliminary advice.",
    },
    {
        icon: Briefcase,
        title: "MEDICINE ORDERING & DELIVERY",
        subtitle: "Hyperlocal Execution Engine",
        description: "Order medicines simply through chat. Our smart system instantly routes requests to local pharmacies for fast acceptance and delivery. If a pharmacy cannot deliver, our local helper network steps in to ensure hyperlocal, reliable fulfillment.",
    },
    {
        icon: Trello,
        title: "SMART REMINDER SYSTEM",
        subtitle: "Never Miss a Beat",
        description: "Our AI intelligently tracks and reminds users for critical health actions: timely medicine intake, scheduling reorders, upcoming regular health checkups, or even gentle hydration alerts to keep you proactive about your health.",
    },
    {
        icon: Award,
        title: "HEALTH COMMUNITY & REWARDS",
        subtitle: "Stay Connected and Motivated",
        description: "Earn 'Healthy Points' for positive actions like timely medicine intake and completing health challenges. Access a community feed to share local health camps and receive pharmacy rewards, fostering a connected, community-driven ecosystem.",
    },
];

const featuresContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.15,
        },
    },
};

const ACCENT_COLOR_CLASS = 'text-[#F9D000]';

const Features = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
    const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

    return (
        <div className="min-h-screen bg-gray-950 text-white font-inter overflow-x-hidden relative">
            {/* Subtle Grainy Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJnIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zy4=")',
                backgroundSize: 'cover'
            }} />

            {/* Features Content */}
            <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Header Section */}
                <div ref={headerRef} className="text-center mb-16">
                    <motion.span
                        className={`inline-block py-1 px-4 text-sm font-semibold rounded-full border border-lime-400/30 ${ACCENT_COLOR_CLASS} bg-lime-400/10`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="flex items-center mx-1">
                            <Heart className="w-4 h-4 mr-1.5" />
                            Our Services
                        </div>
                    </motion.span>
                    <motion.h2
                        className="text-5xl sm:text-6xl font-extrabold mt-4 text-white tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        HOW CAN WE HELP?
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        We are building an all-in-one local health ecosystem: Community + AI + Real Humans. Explore the core pillars of CareLoop.
                    </motion.p>
                </div>

                {/* Feature Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            index={index}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Features;