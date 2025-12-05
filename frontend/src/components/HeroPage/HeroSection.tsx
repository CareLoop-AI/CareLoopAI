import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../Header/Navbar';
import LoginModel, { triggerConfetti } from '../Header/LoginModel';
import ChatbotPopover from '../chatBot/ChatbotPopover';
import { Loader2 } from 'lucide-react';
import { isAuthenticated } from '@/utils/auth';


const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

const HeroSection = () => {
    const [isModelOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [logedinUser, setLogedinUser] = useState<boolean>(false);

    const handleEmailLogin = async () => {
        // For now, just log the email to console
        console.log('Email submitted for early access:', email);
        setIsLoading(true);
        try {
            const url = baseUrl+"auth/user/login/email";
            console.log("Calling:", url);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            //console.log("Fetch response status:", response.status, response.statusText);
            const text = await response.text();
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status} ${response.statusText}`);
            }
            triggerConfetti();
            const data = JSON.parse(text);
            //console.log("Server response:", data);
            const userIdFromQuery = data?.userId;
            const nameFromQuery = data?.username;
            const jwtFromQuery = data?.jwt;
            if (userIdFromQuery) {
                localStorage.setItem('userId', userIdFromQuery);
            }

            if (nameFromQuery) {
                localStorage.setItem('userName', decodeURIComponent(nameFromQuery));
            }

            if (jwtFromQuery) {
                localStorage.setItem('jwt', jwtFromQuery);
            }

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error('Error fetching answer:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            setLogedinUser(true);
        }
    }, [handleEmailLogin, logedinUser])

    return (
        <div className="relative h-screen text-white font-sans overflow-hidden">

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 z-0 w-full"/>

            <Navbar setIsModalOpen={setIsModalOpen} />
            <LoginModel setIsModalOpen={setIsModalOpen} isModalOpen={isModelOpen} />

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto pt-8">

                {/* Main Headline */}
                <motion.h1
                    className="text-4xl sm:text-5xl lg:text-5xl xl:text-[4rem] font-black mb-2 mt-20 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
                >
                    <span className="text-white">Your Local </span>
                    <span className="text-[#F9D000]">Health Companion:</span>
                    <span className="text-white"> Access Care,Medicine, and Human Help </span>
                    <span className="text-white">—</span>
                    <span className="text-[#F9D000]"> Effortlessly.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 max-w-4xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                >
                    Chat instantly to order from local pharmacies. Our community helper network ensures
                    <br className="hidden sm:block" />
                    fast delivery, while AI helps you stay proactive with daily wellness.
                </motion.p>

                <motion.div
                    className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-2 md:px-5 md:py-3 rounded-full border border-white/20 shadow-xl">
                        <div className="text-2xl">📋</div>
                        <div className="text-left">
                            <div className="text-orange-400 font-bold text-sm">AI Prescription</div>
                            <div className="text-gray-300 text-xs font-medium">Validation</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-2 md:px-5 md:py-3 rounded-full border border-white/20 shadow-xl">
                        <div className="text-2xl">📍</div>
                        <div className="text-left">
                            <div className="text-pink-400 font-bold text-sm">Local Helper</div>
                            <div className="text-gray-300 text-xs font-medium">Network</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-2 md:px-5 md:py-3 rounded-full border border-white/20 shadow-xl">
                        <div className="text-2xl">💜</div>
                        <div className="text-left">
                            <div className="text-purple-400 font-bold text-sm">Personalized</div>
                            <div className="text-gray-300 text-xs font-medium">Wellness Tips</div>
                        </div>
                    </div>
                </motion.div>

                {
                    !logedinUser ? (
                        <motion.div
                            className="flex flex-col sm:flex-row items-stretch gap-2 md:gap-0 w-full max-w-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-6 py-4 bg-black/50 backdrop-blur-sm border-2 border-yellow-500/70 rounded-full sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
                            />
                            {
                                !isLoading ? (
                                    <button onClick={handleEmailLogin} className="px-6 sm:px-8 py-4 bg-gradient-to-r from-[#005C9E]  to-[#F9D000]  text-white font-bold rounded-full sm:rounded-l-none transition transform hover:scale-[1.02] shadow-lg whitespace-nowrap">
                                        Join the Waitlist for Early Access
                                    </button>
                                ) : (
                                    <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-[#005C9E]  to-[#F9D000]  text-white font-bold rounded-full sm:rounded-l-none transition transform hover:scale-[1.02] shadow-lg whitespace-nowrap">
                                        <Loader2 className="animate-spin text-indigo-600" />
                                    </div>
                                )
                            }
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex flex-col sm:flex-row items-stretch gap-0 w-full max-w-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <div
                                className="flex-1 px-6 py-4 
        bg-gradient-to-r from-[#005C9E] to-[#F9D000] 
        text-white font-semibold rounded-full
        shadow-[0_0_20px_rgba(249,208,0,0.35)] 
        backdrop-blur-sm border-2 border-yellow-300/50
        text-center"
                            >
                                🎉 You're logged in! Thank you for joining us.
                            </div>
                        </motion.div>

                    )
                }
            </main>
            <ChatbotPopover />
        </div>
    );
};

export default HeroSection;