const ACCENT_COLOR_CLASS = 'bg-[#F9D000] hover:bg-[#D5E63B] text-black';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navItems = [
        { title: "Technology", links: ["Products", "Software Suite", "Accessories"] },
        { title: "Expertise", links: ["Key Features", "Case Studies", "Our Team"] },
    ];

    // Custom yellow color for the Send button
    const CTA_BUTTON_COLOR = ACCENT_COLOR_CLASS;
    const INPUT_FIELD_COLOR = 'bg-gray-800 text-white focus:ring-0 focus:border-transparent border-none';

    return (
        <footer className="w-full bg-black text-white overflow-hidden relative">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
                {/* Top Section: Navigation and CTA/Newsletter */}
                <div className="flex flex-wrap gap-8 mx-auto justify-between items-center">
                    {/* Column 1 & 2: Navigation Links */}
                    <div className="flex gap-20">
                        <div className="col-span-1 flex justify-between space-x-8 md:space-x-0 md:block">
                            {navItems.slice(0, 1).map((section) => (
                                <div key={section.title} className="space-y-2">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h4>
                                    <ul className="space-y-1 mt-3">
                                        {section.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#"
                                                    className="text-sm text-gray-400 hover:text-white transition duration-150"
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
                                        {section.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#"
                                                    className="text-sm text-gray-400 hover:text-white transition duration-150"
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
                    </div>

                    {/* Column 3 & 4 (Spanning 2 columns): CTA/Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white">Still have questions?</h4>
                        <div className="flex w-full">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`p-4 md:p-4 rounded-l-full outline-none ${INPUT_FIELD_COLOR} border border-gray-700/50`}
                            />
                            <button
                                className={`flex items-center justify-center px-3 md:px-6 py-4 font-semibold rounded-r-full transition duration-300 ${CTA_BUTTON_COLOR}`}
                                onClick={(e) => e.preventDefault()}
                            >
                                Send
                                {/* Arrow icon */}
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Massive Logo/Branding (Adjusted for larger size and 'floor' touch) */}
                {/* We use negative margin (mb-[-5rem] or more) and larger font sizes to push the text down */}
                <div className="mt-10 overflow-hidden p-0 relative">
                    <h1 className="m-0 p-0 text-[20vw] md:text-[15vw] lg:text-[200px] font-extrabold text-white text-center leading-none whitespace-nowrap pointer-events-none relative lg:bottom-[-1.7rem]">
                        CareLooP
                    </h1>
                </div>

                {/* Bottom Section: Copyright and Legal Links */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-gray-400 pt-6 border-t-3 border-gray-500">
                    <p className="text-sm order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {currentYear} CareLoop. All rights reserved.
                    </p>
                    <div className="flex space-x-4 text-sm order-1 md:order-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition duration-150">Privacy Policy</a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition duration-150">Cookies Policy</a>
                        <p className="text-gray-500">Website by <span className="text-white hover:text-[#EBF742] transition duration-150 cursor-pointer">ByteTown</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;