import { createContext, useRef, useCallback } from "react";

export const ScrollToSectionContext = createContext();
export const ScrollToSectionProvider = ({ children }) => {
    const isScrollingFromClick = useRef(false);
    const triggerScroll = useCallback((sectionId) => {
        isScrollingFromClick.current = true;
        document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            isScrollingFromClick.current = false;
        }, 1000);
    }, []);
    return (
        <ScrollToSectionContext.Provider value={{ triggerScroll, isScrollingFromClick }}>
            {children}
        </ScrollToSectionContext.Provider>
    );
};