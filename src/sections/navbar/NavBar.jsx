import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";
import NexusButton from "./nexus/NexusButton.jsx";
import NexusPopup from "./nexus/NexusPopup.jsx";
import MobileMenuPopup from "./mobile/MobileMenuPopup";
import AudioPlayer from "./audio/AudioPlayer";
import MobileMenuButton from "./mobile/MobileMenuButton";
import { navItems } from "./utils/navItems";

const NavBar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [isCloseButtonActive, setIsCloseButtonActive] = useState(false);

    const audioRef = useRef(null);
    const navRef = useRef(null);
    const isNavigatingRef = useRef(false);
    const scrollTimeoutRef = useRef(null);
    const navTimeoutRef = useRef(null);
    const userScrollTimeoutRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();

    const handleNavigation = useCallback((id) => {
        const target = document.querySelector(id);
        if (!target) return;
        [navTimeoutRef, scrollTimeoutRef, userScrollTimeoutRef].forEach(ref => ref.current && clearTimeout(ref.current));
        isNavigatingRef.current = true;
        setIsUserScrolling(false);
        setIsNavVisible(true);
        target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => window.location.hash = id, 600);
        setTimeout(() => {
            if (!navRef.current) return;
            if (!isMobileMenuOpen) {
                if (target.offsetTop <= 50) navRef.current.classList.remove("floating-nav");
                else navRef.current.classList.add("floating-nav");
            }
        }, 800);
        navTimeoutRef.current = setTimeout(() => isNavigatingRef.current = false, 1500);
        setIsMobileMenuOpen(false);
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => {
            const newState = !prev;
            if (newState) {
                setTimeout(() => setIsCloseButtonActive(true), 300);
            } else {
                setIsCloseButtonActive(false);
            }
            return newState;
        });
    }, []);

    const togglePortfolio = useCallback(() => {
        setIsPortfolioOpen(prev => {
            const newState = !prev;
            if (newState) {
                setTimeout(() => setIsCloseButtonActive(true), 300);
            } else {
                setIsCloseButtonActive(false);
            }
            return newState;
        });
    }, []);

    const toggleAudio = useCallback(() => {
        if (!audioRef.current) return;
        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
            setIsIndicatorActive(false);
            localStorage.setItem("musicOn", "false");
        } else {
            audioRef.current.muted = false;
            audioRef.current.play().then(() => {
                setIsAudioPlaying(true);
                setIsIndicatorActive(true);
                localStorage.setItem("musicOn", "true");
            }).catch(err => console.warn("Lecture bloquée :", err));
        }
    }, [isAudioPlaying]);

    const detectUserScroll = useCallback(() => {
        if (!isNavigatingRef.current) {
            setIsUserScrolling(true);
            if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
            userScrollTimeoutRef.current = setTimeout(() => setIsUserScrolling(false), 150);
        }
    }, []);

    useEffect(() => {
        if (!navRef.current) return;
        const diff = currentScrollY - lastScrollY;
        if (isNavigatingRef.current || Math.abs(diff) < 3) return;
        detectUserScroll();

        if (isMobileMenuOpen) {
            navRef.current.classList.remove("floating-nav");
        } else {
            if (currentScrollY <= 50) navRef.current.classList.remove("floating-nav");
            else navRef.current.classList.add("floating-nav");
        }

        if (isUserScrolling) {
            if (currentScrollY <= 50) setIsNavVisible(true);
            else if (diff > 15) setIsNavVisible(false);
            else if (diff < -15) setIsNavVisible(true);
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY, isUserScrolling, detectUserScroll, isMobileMenuOpen]);

    useEffect(() => {
        if (!navRef.current) return;
        if (isMobileMenuOpen) {
            navRef.current.classList.add("floating-nav");
        } else {
            if (currentScrollY <= 50) {
                navRef.current.classList.remove("floating-nav");
            } else {
                navRef.current.classList.add("floating-nav");
            }
        }
    }, [isMobileMenuOpen, currentScrollY]);

    useEffect(() => {
        if (!navRef.current) return;
        gsap.to(navRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
        });
    }, [isNavVisible]);

    useEffect(() => {
        if (!audioRef.current) return;
        const musicOn = localStorage.getItem("musicOn") === "true";
        audioRef.current.muted = !musicOn;
        audioRef.current.play().catch(() => {});
        if (musicOn) setIsAudioPlaying(true), setIsIndicatorActive(true);
        const unlockAudio = () => {
            if (audioRef.current && audioRef.current.muted) {
                audioRef.current.muted = false;
                audioRef.current.play().then(() => {
                    setIsAudioPlaying(true);
                    setIsIndicatorActive(true);
                    localStorage.setItem("musicOn", "true");
                }).catch(() => {});
            }
            ['click','keydown','touchstart'].forEach(e => window.removeEventListener(e, unlockAudio));
        };
        ['click','keydown','touchstart'].forEach(e => window.addEventListener(e, unlockAudio));
        return () => ['click','keydown','touchstart'].forEach(e => window.removeEventListener(e, unlockAudio));
    }, []);

    useEffect(() => {
        const handleVisibility = () => {
            if (!audioRef.current) return;
            if (document.hidden) audioRef.current.pause();
            else if (isAudioPlaying) audioRef.current.play().catch(() => {});
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, [isAudioPlaying]);

    useEffect(() => {
        document.body.style.overflow = (isPortfolioOpen || isMobileMenuOpen) ? "hidden" : "auto";
    }, [isPortfolioOpen, isMobileMenuOpen]);

    useEffect(() => () => [navTimeoutRef, scrollTimeoutRef, userScrollTimeoutRef].forEach(r => r.current && clearTimeout(r.current)), []);

    return (
        <>
            <div ref={navRef} className="fixed inset-x-0 top-2 md:top-4 z-50 h-14 md:h-16 border-none transition-all duration-700 md:inset-x-6">
                <header className="absolute top-1/2 w-full -translate-y-1/2">
                    <nav className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4 lg:gap-6 xl:gap-10">
                            <img src="/assets/logo2.webp" alt="logo"
                                 className="w-10 cursor-pointer hover:scale-110 transition-all duration-700"
                                 onClick={() => handleNavigation("#accueil")} />
                            <NexusButton title="Portfolio" rightIcon={<TiLocationArrow />}
                                         containerClass="bg-blue-50 flex items-center justify-center gap-1"
                                         onClick={togglePortfolio} />
                        </div>

                        <div className="flex items-center h-full">
                            {!isPortfolioOpen &&
                                <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-10">
                                    {navItems.map(({ id, label }) => (
                                        <button key={id} onClick={() => handleNavigation(id)}
                                                className="nav-hover-btn !ms-0 whitespace-nowrap tracking-tight normal-case xl:uppercase text-xs lg:text-sm">
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            }
                            <AudioPlayer
                                isIndicatorActive={isIndicatorActive}
                                toggleAudio={toggleAudio}
                                audioRef={audioRef}
                            />
                            {isPortfolioOpen ? (
                                <button onClick={togglePortfolio}
                                        className={clsx("ml-4 cursor-pointer transition-all duration-300 transform hover:scale-110 close-button-animated", { active: isCloseButtonActive })}>
                                </button>
                            ) : (
                                <MobileMenuButton
                                    isMobileMenuOpen={isMobileMenuOpen}
                                    toggleMobileMenu={toggleMobileMenu}
                                />
                            )}
                        </div>
                    </nav>
                </header>
            </div>
            <MobileMenuPopup
                isOpen={isMobileMenuOpen}
                onClose={toggleMobileMenu}
                onNavigate={handleNavigation}
                navItems={navItems}
                isIndicatorActive={isIndicatorActive}
                toggleAudio={toggleAudio}
                audioRef={audioRef}
                isCloseButtonActive={isCloseButtonActive}
            />
            <NexusPopup isOpen={isPortfolioOpen} onClose={togglePortfolio} />
        </>
    );
};

export default NavBar;