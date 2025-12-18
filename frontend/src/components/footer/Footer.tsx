import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, X } from "lucide-react";


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, // delay between each word
        },
    },
};

const wordVariants: any = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut" },
    },
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navItems = [
        { title: "Technology", links: ["Products", "Software Suite", "Accessories"] },
        { title: "Expertise", links: ["Key Features", "Case Studies", "Our Team"] },
    ];

    const text = "C a r e L o o p";
    const words = text.split(" ");

    return (
        <footer className="bg-black text-white overflow-hidden relative inset-0 z-50">
            <div className=" px-4 sm:px-6 lg:px-8 py-12 md:py-14 relative max-w-[90rem] mx-auto">
                {/* Top Section: Navigation and CTA/Newsletter */}
                <div className="flex flex-wrap gap-8 mx-auto justify-between items-center mb-20">
                    {/* Column 1 & 2: Navigation Links */}
                    <div className="flex gap-30">
                        <div className="col-span-1 flex justify-between space-x-8 md:space-x-0 md:block">
                            {navItems.slice(0, 1).map((section) => (
                                <div key={section.title} className="space-y-2">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h4>
                                    <ul className="space-y-1 mt-3">
                                        {section.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#"
                                                    className={`text-sm text-gray-400 hover:text-white transition duration-150 cursor-not-allowed`}
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="col-span-1 flex justify-between space-x-8 md:space-x-0 md:block">
                            {navItems.slice(1, 2).map((section) => (
                                <div key={section.title} className="space-y-2">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h4>
                                    <ul className="space-y-1 mt-3">
                                        {section.links.map((link, index) => (
                                            <li key={link}>
                                                <a
                                                    href={index === 0 ? "#features" : "#"}
                                                    className={`text-sm transition duration-150 text-gray-400 hover:text-white
        ${index === 0
                                                            ? " cursor-pointer"
                                                            : " cursor-not-allowed"}`}
                                                    onClick={(e) => {
                                                        if (index !== 0) e.preventDefault();
                                                    }}
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3 & 4 (Spanning 2 columns): SOCIAL LINKS (replaced email section) */}
                    {/* Column 3 & 4 (Spanning 2 columns): SOCIAL LINKS (replacing email section) */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white">Still have questions?</h4>
                        <div className="flex items-center gap-4">
                            {[
                                {
                                    name: "Twitter", url: "https://x.com/CareLoopAI", icon: X
                                },
                                {
                                    name: "LinkedIn", url: "https://www.linkedin.com/in/careloop-ai-67766b392/", icon: Linkedin
                                },
                                {
                                    name: "Instagram", url: "https://instagram.com/", icon: Instagram
                                },
                                {
                                    name: "Email", url: "mailto:contact@careloopai.co.in", icon: Mail
                                },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.name}
                                    className="w-12 h-12 flex items-center justify-center rounded-2xl 
                           bg-black text-white hover:text-black hover:bg-gradient-to-r hover:from-[#F9D000] hover:to-[#F2AA00] 
                           transition duration-300 shadow-md"
                                >
                                    <item.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Section: Massive Logo/Branding (Adjusted for larger size and 'floor' touch) */}
                <div className=" overflow-hidden p-0 relative">
                    <motion.h1
                        className="m-0 p-0 text-[18vw] md:text-[15vw] lg:text-[250px] 2xl:text-[300px] font-extrabold text-white text-center leading-none whitespace-nowrap pointer-events-none relative lg:bottom-[-1.7rem]"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.4 }} // trigger when in view
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                variants={wordVariants}
                                className={`inline-block ${i > 0 ? "ml-2" : ""} ${i > 3 ? "text-[#F9D000]" : ""}`} // Highlight last letters
                                aria-hidden
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>

                {/* Bottom Section: Copyright and Legal Links */}
                <div className="relative mt-[-18px] md:mt-[-40px] bg-black z-10 flex flex-col md:flex-row items-center justify-between text-gray-400 pt-6 border-t-3 border-gray-500">
                    <p className="text-sm order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {currentYear} CareLoop. All rights reserved.
                    </p>
                    <div className="flex space-x-4 text-sm order-1 md:order-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition duration-150 cursor-not-allowed">Privacy Policy</a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition duration-150 cursor-not-allowed">Cookies Policy</a>
                        <p className="text-gray-500">Website by <span className="text-white hover:text-[#EBF742] transition duration-150 cursor-pointer">- CareLoopAI</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
