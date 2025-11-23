import { useState, useEffect, useRef } from 'react';
import { isAuthenticated, getUserData, logout } from '../../utils/auth';
import { motion } from 'framer-motion';


export const Navbar = ({ setIsModalOpen }: { setIsModalOpen: (isOpen: boolean) => void }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<{ userId: string | null; name: string | null; picture: string | null }>({
        userId: null,
        name: null,
        picture: null
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const checkAuthState = () => {
        const loggedIn = isAuthenticated();
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const data = getUserData();
            setUserData(data);
        }
    };

    useEffect(() => {
        checkAuthState();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="fixed top-0 left-0 right-0 p-4 md:p-8 z-50">
            <div className="max-w-400 mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Care<span className="text-[#F9D000]">Loop</span> AI
                    </h1>
                </div>

                {isLoggedIn ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-2 hover:opacity-80 transition duration-200"
                        >
                            <img
                                src={userData.picture ? decodeURIComponent(userData.picture) : undefined}
                                alt={userData.name || 'User'}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 transition duration-200 object-cover"
                            />
                        </button>
                        

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={userData.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=F9D000&color=000`}
                                            alt={userData.name || 'User'}
                                            className="w-12 h-12 rounded-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=F9D000&color=000`;
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                {userData.name || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                ID: {userData.userId}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150 font-medium"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-[#F9D000] text-white transition-colors duration-300 hover:bg-[#F9D000] hover:text-gray-950"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(190, 242, 100, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </motion.div>
                )}
            </div>
        </header>
    );
};