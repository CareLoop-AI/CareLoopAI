// ChatbotPopover.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ChatMessage from './ChatMessage';

// Types
export interface Message {
    text: string;
    isBot: boolean;
    confidence?: number;
    topic?: string | null;
    isTyping?: boolean;
}

interface BotButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

interface ApiResponse {
    answer: string;
    confidence: number;
    matchedQuestion: string;
    topic: string | null;
}

// Bot Button Component
const BotButton: React.FC<BotButtonProps> = ({ onClick, isOpen }) => {
    return (
        <motion.div
            className="fixed bottom-4 right-6 md:right-20 z-50"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
            <Button
                onClick={onClick}
                size="icon"
                className="h-12 w-12 rounded-full relative overflow-hidden 
bg-gradient-to-b from-[#00B6C7]  to-[#F9D000] 
transition-all duration-300 text-white hover:shadow-indigo-500/50"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-full w-full" />}
            </Button>
        </motion.div>
    );
};

const ChatbotPopover: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasInitialized, setHasInitialized] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize welcome message only once per session
    useEffect(() => {
        if (isOpen && !hasInitialized) {
            setMessages([{
                text: "Hi there! 👋 You're speaking with your Personal AI Assistance. I'm well trained and ready to assist you today but you can ask for the team at any time.",
                isBot: true,
                confidence: 1.0,
                isTyping: true
            }]);
            setHasInitialized(true);
        }
    }, [isOpen, hasInitialized]);

    // Prevent scroll propagation when chatbot is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSendMessage = async (questionText?: string): Promise<void> => {
        const question = questionText || input.trim();
        if (!question) return;

        const userMessage: Message = { text: question, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_API_BASE_URL + "api/v1/chatbot/ask", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: ApiResponse = await response.json();

            const botMessage: Message = {
                text: data.answer,
                isBot: true,
                confidence: data.confidence,
                topic: data.topic,
                isTyping: true
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error fetching answer:', error);
            const errorMessage: Message = {
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                isBot: true,
                confidence: 0,
                isTyping: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Handle wheel event to stop propagation
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <>
            <BotButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-20 right-6 md:right-20 z-50 w-[380px]"
                        onWheel={handleWheel}
                    >
                        <Card className="h-[500px] p-0 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl rounded-3xl overflow-hidden border-none">
                            {/* Header */}
                            <CardHeader className="bg-gradient-to-r from-[#005C9E]  to-[#F9D000] p-5 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                                            <AvatarFallback className="bg-transparent">
                                                <Bot className="h-7 w-7 text-white" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-[#F9D000] font-bold text-lg">CareLoop AI</h3>
                                            <p className="text-indigo-100 text-xs">Always here to help</p>
                                        </div>
                                    </div>
                                    <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
                                        <Button
                                            onClick={() => setIsOpen(false)}
                                            variant="ghost"
                                            size="icon"
                                            className="text-white/80 hover:text-white hover:bg-white/10"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </CardHeader>

                            {/* Messages Area */}
                            <CardContent
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-5 scroll-hide"
                                onWheel={handleWheel}
                            >
                                {messages.map((msg, idx) => (
                                    <ChatMessage key={idx} message={msg} isBot={msg.isBot} />
                                ))}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-3 mb-4"
                                    >
                                        <Avatar className="h-8 w-8 bg-gradient-to-r from-[#005C9E]  to-[#F9D000]">
                                            <AvatarFallback className="bg-transparent">
                                                <Bot className="h-5 w-5 text-white" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-md border border-gray-200">
                                            <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </CardContent>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-200" onWheel={handleWheel}>
                                <div className="flex gap-2 items-end">
                                    <Textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your question..."
                                        disabled={isLoading}
                                        rows={1}
                                        className="flex-1 resize-none bg-gray-200 border-2 border-transparent focus:border-indigo-400 rounded-2xl text-sm disabled:opacity-50 max-h-[80px]"
                                    />
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            onClick={() => handleSendMessage()}
                                            disabled={!input.trim() || isLoading}
                                            size="icon"
                                            className="bg-gradient-to-r from-[#005C9E]  to-[#F9D000] text-white rounded-xl shadow-lg hover:shadow-indigo-500/50 transition-all duration-200"
                                        >
                                            <Send className="h-5 w-5" />
                                        </Button>
                                    </motion.div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 text-center">
                                    Powered by AI • Responses may vary
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotPopover;