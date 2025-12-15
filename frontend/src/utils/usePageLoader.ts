// hooks/usePageLoader.ts
import { useEffect, useState } from "react";

export const usePageLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            const images = Array.from(document.images);

            if (images.length === 0) {
                setLoading(false);
                return;
            }

            let loadedCount = 0;

            const onImageLoad = () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    setTimeout(() => setLoading(false), 300); // small delay for smooth UX
                }
            };

            images.forEach((img) => {
                if (img.complete) {
                    onImageLoad();
                } else {
                    img.addEventListener("load", onImageLoad);
                    img.addEventListener("error", onImageLoad);
                }
            });
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return loading;
};
