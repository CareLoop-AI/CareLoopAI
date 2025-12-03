import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { type Message } from "./ChatbotPopover";

interface ChatMessageProps {
    message: Message;
    isBot: boolean;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
    const [displayedText, setDisplayedText] = useState<string>('');
    const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

    useEffect(() => {
        if (!isBot || !message.isTyping) {
            setDisplayedText(message.text);
            setIsTypingComplete(true);
            return;
        }

        // Typing effect for bot messages
        let currentIndex = 0;
        setDisplayedText('');
        setIsTypingComplete(false);

        const typingInterval = setInterval(() => {
            if (currentIndex < message.text.length) {
                setDisplayedText(message.text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typingInterval);
            }
        }, 20);

        return () => clearInterval(typingInterval);
    }, [message.text, isBot, message.isTyping]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}
        >
            <Avatar className={`flex-shrink-0 h-8 w-8 ${isBot
                    ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500'
                    : 'bg-gradient-to-br from-[#F9D000] to-yellow-500'
                }`}>
                <AvatarFallback className="bg-transparent">
                    {isBot ? <Bot className="h-5 w-5 text-white" /> : <User className="h-5 w-5 text-gray-800" />}
                </AvatarFallback>
            </Avatar>

            <div className={`flex flex-col max-w-[75%] ${isBot ? '' : 'items-end'}`}>
                <div className={`px-4 py-3 rounded-2xl shadow-md ${isBot
                        ? 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                        : 'bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white rounded-tr-none'
                    }`}>
                    <p className="text-sm leading-relaxed">
                        {displayedText}
                        {!isTypingComplete && isBot && (
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block ml-1"
                            >
                                |
                            </motion.span>
                        )}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatMessage;