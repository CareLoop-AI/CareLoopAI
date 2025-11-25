import { AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight, MessageSquare, Mail, AlertCircle } from "lucide-react";
import { FAQ_DATA } from "@/utils/FaqUtil";
import axios from "axios";


const API_BASE_URL = 'http://localhost:8081/api/v1/faq';

const FAQPopover = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    const [showAskForm, setShowAskForm] = useState(false);
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Prevent background (body) scrolling when popover is open
    useEffect(() => {
        if (isOpen) {
            // lock body scroll
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = prev || '';
            };
        }

        // cleanup when component unmounts or isOpen becomes false
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleQuestionClick = (id: number) => {
        setSelectedQuestion(selectedQuestion === id ? null : id);
        setShowAskForm(false);
    };

    const handleAskClick = () => {
        setShowAskForm(true);
        setSelectedQuestion(null);
        setError(null);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async () => {
        // Reset error
        setError(null);

        // Validation
        if (!email || !question) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (question.length < 10) {
            setError('Question must be at least 10 characters long');
            return;
        }

        if (question.length > 1000) {
            setError('Question must be less than 1000 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8081/api/v1/faq/questions",
                {
                    email: email.trim(),
                    question: question.trim()
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;

            if (response.status < 200 || response.status >= 300) {
                // Handle error response
                throw new Error(data.message || 'Failed to submit question');
            }

            // Success
            console.log('Question submitted successfully:', data);
            setSubmitted(true);

            setTimeout(() => {
                setEmail('');
                setQuestion('');
                setSubmitted(false);
                setShowAskForm(false);
                setError(null);
            }, 3000);

        } catch (err: any) {
            console.error('Error submitting question:', err);
            setError(err.message || 'Failed to submit question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToFAQ = () => {
        setShowAskForm(false);
        setSelectedQuestion(null);
        setError(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    {/* Popover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-8 z-50 w-[90vw] max-w-md bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {showAskForm ? 'Ask Us Anything' : 'How Can We Help?'}
                            </h2>
                            <p className="text-white/90 text-sm">
                                {showAskForm
                                    ? 'Send us your question and we\'ll get back to you soon'
                                    : 'Find quick answers to common questions about CareLoop'
                                }
                            </p>
                        </div>

                        {/* Content */}
                        <div
                            className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar"
                            // Stop propagation so parent scroll handlers (e.g. Lenis) don't scroll the page
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            style={{ touchAction: 'pan-y' }}
                        >
                            {!showAskForm ? (
                                <>
                                    {/* FAQ Questions */}
                                    <div className="space-y-3">
                                        {FAQ_DATA.map((faq) => (
                                            <div key={faq.id} className="border border-gray-800 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => handleQuestionClick(faq.id)}
                                                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors group"
                                                >
                                                    <div className="flex-1">
                                                        <span className="text-xs text-[#F9D000] font-medium mb-1 block">
                                                            {faq.category}
                                                        </span>
                                                        <span className="text-white font-medium text-sm group-hover:text-[#F9D000] transition-colors">
                                                            {faq.question}
                                                        </span>
                                                    </div>
                                                    <ChevronRight
                                                        className={`w-5 h-5 text-gray-400 transition-transform ${selectedQuestion === faq.id ? 'rotate-90' : ''
                                                            }`}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {selectedQuestion === faq.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-4 pt-0 text-gray-300 text-sm leading-relaxed border-t border-gray-800">
                                                                {faq.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Ask Question Button */}
                                    <motion.button
                                        onClick={handleAskClick}
                                        className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-fuchsia-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        Ask a Question
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    {/* Ask Question Form */}
                                    {!submitted ? (
                                        <div className="space-y-4">
                                            {/* Error Message */}
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2"
                                                >
                                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                    <p className="text-red-400 text-sm">{error}</p>
                                                </motion.div>
                                            )}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    disabled={loading}
                                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4" />
                                                    Your Question
                                                </label>
                                                <textarea
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                    placeholder="What would you like to know about CareLoop?"
                                                    rows={4}
                                                    disabled={loading}
                                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {question.length}/1000 characters
                                                </p>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={handleBackToFAQ}
                                                    disabled={loading}
                                                    className="flex-1 py-3 px-6 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-fuchsia-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Question Submitted!</h3>
                                            <p className="text-gray-400 text-sm">
                                                We've received your question and sent you a confirmation email.
                                                Our team will respond within 24-48 hours.
                                            </p>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};


export default FAQPopover;