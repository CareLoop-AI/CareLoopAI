// Optional: still keep this for local/dev fallback
export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === name) {
            return cookieValue ? decodeURIComponent(cookieValue) : null;
        }
    }
    return null;
};

export const isAuthenticated = (): boolean => {
    // 1. Prefer localStorage (production flow)
    const userIdFromStorage = typeof window !== 'undefined'
        ? localStorage.getItem('userId')
        : null;

    if (userIdFromStorage && userIdFromStorage !== '') {
        return true;
    }

    // 2. Fallback to cookies (local dev where you still have cookie-based login)
    const userIdFromCookie = getCookie('userId');
    return !!(userIdFromCookie && userIdFromCookie !== '');
};

export const getUserData = () => {
    // 1. Prefer localStorage
    const storedUserId = typeof window !== 'undefined'
        ? localStorage.getItem('userId')
        : null;
    const storedName = typeof window !== 'undefined'
        ? localStorage.getItem('userName')
        : null;
    const storedPicture = typeof window !== 'undefined'
        ? localStorage.getItem('userPicture')
        : null;

    if (storedUserId || storedName || storedPicture) {
        return {
            userId: storedUserId,
            name: storedName,
            picture: storedPicture
        };
    }

    // 2. Fallback to cookies (dev)
    return {
        userId: getCookie('userId'),
        name: getCookie('userName'),
        picture: getCookie('userPicture')
    };
};

export const logout = () => {
    const API_BASE_URL =
        import.meta.env.VITE_BACKEND_URL ||
        'https://careloopai-production.up.railway.app';

    fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    }).finally(() => {
        // Clear relevant cookies (for local/dev)
        const cookies = ['userId', 'userName', 'userPicture', 'JSESSIONID'];
        cookies.forEach(cookieName => {
            document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        });

        // Clear localStorage values (production)
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userPicture');
        }

        window.location.href = '/';
    });
};
