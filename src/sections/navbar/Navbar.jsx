import { memo, useCallback, useRef, useState, useEffect, useContext } from "react";
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNexusOpen, setIsNexusOpen] = useState(false);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef(null);
    const navRef = useRef(null);
    const { triggerScroll, isScrollingFromClick } = useContext(ScrollToSectionContext);
    const { isAudioEnabled } = useContext(AudioContext);
    const handleMenuToggle = useCallback((type, newState) => {
        if (type === 'mobile') {
            if (newState && isNexusOpen) setIsNexusOpen(false);
            setIsMobileMenuOpen(newState);
        } else {
            if (newState && isMobileMenuOpen) setIsMobileMenuOpen(false);
            setIsNexusOpen(newState);
        }
    }, [isMobileMenuOpen, isNexusOpen]);
    const scrollToSection = useCallback((sectionId) => {
        triggerScroll(sectionId);
        setIsMobileMenuOpen(false);
        setIsNexusOpen(false);
    }, [triggerScroll]);
    const hoverSound = useRef(new Audio("/sounds/hover.mp3")).current;
    const playHoverSound = useCallback(() => {
        if (isAudioEnabled) {
            hoverSound.currentTime = 0;
            hoverSound.play();
        }
    }, [isAudioEnabled, hoverSound]);
    useEffect(() => {
        document.body.style.overflow = (isMobileMenuOpen || isNexusOpen) ? 'hidden' : 'unset';
        return () => document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen, isNexusOpen]);
    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingFromClick.current) return;
            const currentY = window.scrollY;
            const atTop = currentY < 50;
            if (navRef.current) {
                const action = atTop ? 'remove' : 'add';
                navRef.current.classList[action]('bg-primary', 'border-secondary/20');
                navRef.current.classList[action === 'remove' ? 'add' : 'remove']('bg-transparent', 'border-transparent');
            }
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setNavbarVisible(currentY <= lastScrollY.current || atTop);
                lastScrollY.current = currentY;
            }, 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, [isScrollingFromClick]);
    const shouldShowNavbar = navbarVisible || isMobileMenuOpen || isNexusOpen;

    return (
        <div className="fixed inset-x-0 top-2 z-50 h-20 transition-transform duration-700 ease-in-out"
             style={{ transform: shouldShowNavbar ? 'translateY(0)' : 'translateY(-150%)' }}>
            <header className="absolute top-1/2 w-full -translate-y-1/2 px-0 md:px-4">
                <nav ref={navRef} className="flex size-full items-center justify-between p-4 rounded-lg transition-all duration-300 bg-transparent border-transparent">
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
                            onToggle={(newState) => handleMenuToggle('nexus', newState)}
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
                                onToggle={(newState) => handleMenuToggle('mobile', newState)}
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