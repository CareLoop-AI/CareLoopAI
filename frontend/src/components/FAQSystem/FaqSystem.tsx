import {motion} from "framer-motion";
import { HelpCircle,} from "lucide-react";
import { useState } from "react";
import FAQPopover from "./FaqPopover";


const FAQButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-4 right-6 md:right-20 z-50 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white p-3 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
            <HelpCircle className="w-6 h-6" />
        </motion.button>
    );
};



const FAQSystem = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div>
                <FAQButton onClick={() => setIsOpen(true)} />
                <FAQPopover isOpen={isOpen} onClose={() => setIsOpen(false)} />

                {/* Custom Scrollbar Styles */}
                <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                width: 0px;}`}</style>
            </div>
        </>
    );
};

export default FAQSystem;