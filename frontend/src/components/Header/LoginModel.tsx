import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const LoginModel = ({ setIsModalOpen, isModalOpen, onLoginSuccess }: {
    setIsModalOpen: (isOpen: boolean) => void,
    isModalOpen: boolean,
    onLoginSuccess?: () => void
}) => {
    const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Confetti function
    const triggerConfetti = () => {
        const duration = 3 * 1000; // 3 seconds
        const end = Date.now() + duration;
        const colors = ["#F9D000", "#FFD700", "#FFA500", "#FF6347"]; // Your brand colors

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const loginParam = urlParams.get('login');

        if (loginParam === 'success') {
            setLoginStatus('success');

            // Trigger confetti celebration! 🎉
            triggerConfetti();

            // Store userId in localStorage from cookie
            const userId = getCookie('userId');
            if (userId) {
                localStorage.setItem('userId', userId);
            }

            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);

            // Trigger parent component refresh
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            // Auto-close modal after 3 seconds (to match confetti duration)
            setTimeout(() => {
                setIsModalOpen(false);
                setLoginStatus('idle');
                window.location.reload();
            }, 3000); // Changed to 3 seconds
        }
    }, [setIsModalOpen, onLoginSuccess]);

    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    const handleGoogleLogin = () => {
        setLoginStatus('loading');
        window.location.href = 'http://localhost:8081/oauth2/authorization/google';
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300`}
            onClick={() => setIsModalOpen(false)}
        >
            <div
                className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-sm relative transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {loginStatus === 'success' ? (
                    <div className="text-center">
                        {/* Animated checkmark */}
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 animate-bounce">
                            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">
                            Welcome Back! 🎉
                        </h3>
                        <p className="text-gray-600">
                            Login successful. Preparing your dashboard...
                        </p>

                        {/* Loading animation */}
                        <div className="mt-4 flex justify-center">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-[#F9D000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-[#F9D000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-[#F9D000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-3xl font-bold mb-3 text-center text-gray-800">
                            Step Into the Future of Health!
                        </h3>
                        <p className="text-gray-600 mb-8 text-center">
                            Sign in to preview features and stay connected as we prepare for full launch.
                        </p>

                        <button
                            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out hover:shadow-lg active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleGoogleLogin}
                            disabled={loginStatus === 'loading'}
                        >
                            {loginStatus === 'loading' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Redirecting...
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 48 48" className="h-5 w-5 mr-3">
                                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.765-6.08 8.307-11.303 8.307-8.841 0-16-7.159-16-16s7.159-16 16-16c3.159 0 6.096 1.199 8.304 3.176l5.95-5.95C34.426 1.83 29.355 0 24 0 10.745 0 0 10.745 0 24s10.745 24 24 24c12.318 0 22.146-8.529 23.64-20.083z"></path>
                                        <path fill="#FF3D00" d="M43.611 20.083L42 20H24v8h11.303a12.872 12.872 0 00-1.745 3.394l5.95 5.95c3.085-2.887 5.02-7.147 5.02-11.454 0-1.179-.199-2.314-.492-3.376z"></path>
                                        <path fill="#4CAF50" d="M24 48c6.489 0 11.936-2.131 16.326-5.748L34.025 36.88c-1.572 1.41-3.791 2.22-6.025 2.22-4.994 0-9.255-3.359-10.78-7.915l-5.95 5.95c3.483 3.342 8.169 5.378 13.085 5.378z"></path>
                                        <path fill="#1976D2" d="M24 0c4.787 0 9.297 1.439 12.628 4.192L31.841 10.04C29.68 8.89 26.969 8 24 8c-4.994 0-9.255 3.359-10.78 7.915l-5.95-5.95C7.818 2.158 15.112 0 24 0z"></path>
                                    </svg>
                                    Sign in with Google
                                </>
                            )}
                        </button>
                    </>
                )}

                {loginStatus !== 'success' && (
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default LoginModel;