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
    const userId = getCookie('userId');
    return userId !== null && userId !== '';
};

export const getUserData = () => {
    return {
        userId: getCookie('userId'),
        name: getCookie('userName'),
        picture: getCookie('userPicture')
    };
};

export const logout = () => {
    // Clear all cookies by calling backend logout endpoint
    fetch('http://localhost:8081/auth/logout', {
        method: 'POST',
        credentials: 'include'
    }).finally(() => {
        // Clear cookies on frontend too
        const cookies = ['userId', 'userName', 'userPicture', 'JSESSIONID'];
        cookies.forEach(cookieName => {
            document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        });

        localStorage.clear();
        window.location.href = '/';
    });
};