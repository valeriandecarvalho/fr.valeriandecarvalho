import { useState, useRef, useCallback } from "react";
import { useWindowScroll } from "react-use";

export const useScrollNavigation = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const isNavigatingRef = useRef(false);
    const { y: currentScrollY } = useWindowScroll();

    const detectUserScroll = useCallback(() => {
        if (!isNavigatingRef.current) {
            setIsUserScrolling(true);
            setTimeout(() => setIsUserScrolling(false), 150);
        }
    }, []);

    const handleNavigation = useCallback((id, callback) => {
        const target = document.querySelector(id);
        if (!target) return;

        isNavigatingRef.current = true;
        setIsUserScrolling(false);
        target.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
            isNavigatingRef.current = false;
            if (callback) callback();
        }, 1500);
    }, []);

    return {
        currentScrollY,
        lastScrollY,
        isUserScrolling,
        setLastScrollY,
        detectUserScroll,
        handleNavigation
    };
};