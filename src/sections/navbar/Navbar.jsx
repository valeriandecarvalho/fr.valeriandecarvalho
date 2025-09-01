import { memo, useCallback, useRef, useState, useEffect, useContext } from "react";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import NexusButton from "./nexus/NexusButton.jsx";
import MobileMenu from "./mobile/MobileMenu.jsx";
import AudioButton from "./audio/AudioButton.jsx";
import { ScrollToSectionContext } from "../../context/ScrollToSectionContext.jsx";
import { AudioContext } from "../../context/AudioContext.jsx";

const navItems = [
    { id: "#accueil", label: "Accueil" },
    { id: "#a-propos", label: "A Propos" },
    { id: "#projets", label: "Projets" },
    { id: "#formations", label: "Formations" },
    { id: "#experiences", label: "Experiences" },
    { id: "#services", label: "Services" },
];

const NavBar = memo(() => {
    const { y: currentScrollY } = useWindowScroll();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNexusOpen, setIsNexusOpen] = useState(false);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const lastScrollY = useRef(0);
    const { triggerScroll, isScrollingFromClick } = useContext(ScrollToSectionContext);
    const { isAudioEnabled } = useContext(AudioContext);
    const isAtTop = currentScrollY < 50;
    const handleMobileMenuToggle = useCallback((newState) => {
        if (newState && isNexusOpen) setIsNexusOpen(false);
        setIsMobileMenuOpen(newState);
    }, [isNexusOpen]);
    const handleNexusToggle = useCallback((newState) => {
        if (newState && isMobileMenuOpen) setIsMobileMenuOpen(false);
        setIsNexusOpen(newState);
    }, [isMobileMenuOpen]);
    const scrollToSection = useCallback((sectionId) => {
        triggerScroll(sectionId);
        setIsMobileMenuOpen(false);
        setIsNexusOpen(false);
    }, [triggerScroll]);
    const shouldShowNavbar = navbarVisible || isMobileMenuOpen || isNexusOpen;
    const hoverSound = useRef(new Audio("/sounds/hover.mp3"));
    const playHoverSound = () => {
        if (isAudioEnabled) {
            hoverSound.current.currentTime = 0;
            hoverSound.current.play();
        }
    }
    useEffect(() => {
        document.body.style.overflow = (isMobileMenuOpen || isNexusOpen) ? 'hidden' : 'unset';
        return () => document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen, isNexusOpen]);
    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingFromClick.current) return;
            const currentY = window.scrollY;
            setNavbarVisible(currentY <= lastScrollY.current || currentY < 50);
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrollingFromClick]);

    return (
        <div className="fixed inset-x-0 top-2 z-50 h-20 transition-transform duration-700 ease-in-out"
             style={{ transform: shouldShowNavbar ? 'translateY(0)' : 'translateY(-150%)' }}>
            <header className="absolute top-1/2 w-full -translate-y-1/2 px-0 md:px-4">
                <nav className={`flex size-full items-center justify-between p-4 rounded-lg
            ${isAtTop ? 'bg-transparent border-transparent' : 'bg-primary border-secondary/20'}`}>
                    <div className="flex items-center gap-7">
                        <img
                            src="/images/logo-light.webp"
                            alt="logo"
                            onClick={() => scrollToSection("#accueil")}
                            className="w-10 cursor-pointer z-50"
                        />
                        <NexusButton
                            id="nexus"
                            title="Nexus"
                            rightIcon={<TiLocationArrow/>}
                            containerClass="bg-secondary flex items-center justify-center gap-1 z-50"
                            isOpen={isNexusOpen}
                            onToggle={handleNexusToggle}
                        />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    onMouseEnter={playHoverSound}
                                    className="nav-btn hover-effect z-50 hover:text-white"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-row-reverse md:flex-row">
                            <MobileMenu
                                navItems={navItems}
                                onNavClick={scrollToSection}
                                isOpen={isMobileMenuOpen}
                                onToggle={handleMobileMenuToggle}
                                isNexusOpen={isNexusOpen}
                                onMouseEnter={playHoverSound}
                            />
                            <AudioButton onMouseEnter={playHoverSound}/>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
});

export default NavBar;