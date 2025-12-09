import CoreVision from './CoreVision';
import HeroGrid from './HeroGrid';
import { motion } from 'framer-motion';


const AboutSection = () => {
    return (
        <div id='about' className='w-full bg-black relative z-50 selection:bg-[#F9D000] selection:text-black overflow-visible'>
            <div className="pt-20 min-h-screen w-full bg-black rounded-t-[3rem] md:rounded-t-[4rem] relative shadow-2xl md:mt-10 mx-auto">
                {/* Gradient Container - must be separate from overflow-hidden parent */}
                <div className="absolute inset-0 rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden pointer-events-none">
                    {/* Top Left Gradient - Yellow to Purple - Floating Animation */}
                    <motion.div
                        className="absolute -top-32 -left-32 w-[800px] h-[800px]"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(249, 208, 0, 0.35) 0%, rgba(249, 208, 0, 0.2) 25%, rgba(132, 0, 255, 0.15) 50%, transparent 75%)',
                            filter: 'blur(100px)',
                            mixBlendMode: 'screen'
                        }}
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -40, 20, 0],
                            scale: [1, 1.1, 0.95, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    {/* Top Right Gradient - Purple to Cyan/Teal - Floating Animation */}
                    <motion.div
                        className="absolute -top-40 -right-32 w-[900px] h-[900px]"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(132, 0, 255, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(120, 255, 214, 0.15) 55%, transparent 75%)',
                            filter: 'blur(110px)',
                            mixBlendMode: 'screen'
                        }}
                        animate={{
                            x: [0, -40, 25, 0],
                            y: [0, 30, -35, 0],
                            scale: [1, 0.9, 1.15, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />
                    {/* Right Side Teal Accent - Gentle Drift */}
                    <motion.div
                        className="absolute top-20 right-0 w-[500px] h-[700px]"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(120, 255, 214, 0.2) 0%, rgba(78, 255, 214, 0.12) 40%, transparent 55%)',
                            filter: 'blur(90px)',
                            mixBlendMode: 'screen'
                        }}
                        animate={{
                            x: [0, -35, 20, 0],
                            y: [0, 35, -25, 0],
                            scale: [1, 0.95, 1.1, 1],
                        }}
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                        }}
                    />
                </div>

                {/* Content Container */}
                <div className='max-w-[90rem] mx-auto relative z-10'>
                    <HeroGrid />
                    <CoreVision />
                </div>
            </div>
        </div>
    );
};

export default AboutSection;