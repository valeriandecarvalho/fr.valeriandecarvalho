import { useState, useEffect } from "react";
import { logo, menu, close } from '../../../assets';

const Top = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navLinks = [
        { id: "#accueil", label: "Accueil" },
        { id: "#a-propos", label: "À propos" },
        { id: "#projets", label: "Projets" },
        { id: "#formations", label: "Formations" },
        { id: "#experiences", label: "Expériences" },
    ];

    useEffect(() => {
        const handleResize = () => window.innerWidth >= 768 && isMobileMenuOpen && setIsMobileMenuOpen(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const handleNavigation = (id) => {
        setIsMobileMenuOpen(false);
        const targetElement = document.querySelector(id);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                window.location.hash = id;
            }, 1000);
        }
    };


    return (
        <>
            <nav className={`fixed top-0 w-full backdrop-blur-sm ${isMobileMenuOpen ? 'border-b-0 bg-primary' : 'border-b-2 border-secondary bg-primary/90'} z-50`}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-14 xl:h-16">
                        <button
                            onClick={() => handleNavigation("#accueil")}
                            className="flex items-center space-x-3 hover:scale-105 transition-all duration-200 text-text hover:text-hover cursor-pointer"
                        >
                            <img src={logo} alt="Logo" className="xl:h-10 xl:w-10 h-9 w-9" />
                            <span className="hidden xl:flex text-xl font-bold">Valérian De Carvalho</span>
                            <span className="flex xl:hidden text-lg font-bold">VDC</span>
                        </button>
                        <div className="hidden md:flex items-center space-x-8 text-sm xl:text-base">
                            {navLinks.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => handleNavigation(id)}
                                    className="text-text hover:text-hover hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                                >
                                    {label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavigation("#contacter")}
                                className="bg-vividviolet text-text px-6 py-2 rounded-lg font-medium hover:text-hover hover:scale-105 transition-all duration-200 cursor-pointer"
                            >
                                📧 Contacter
                            </button>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer"
                        >
                            <img src={isMobileMenuOpen ? close : menu} alt="Menu" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-14 left-0 right-0 z-50 bg-primary border-b-2 border-b-secondary shadow-lg">
                    {navLinks.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => handleNavigation(id)}
                            className="w-full text-center py-3 text-text hover:text-hover hover:bg-secondary/20 transition-all duration-200 font-medium cursor-pointer"
                        >
                            {label}
                        </button>
                    ))}
                    <button
                        onClick={() => handleNavigation("#contacter")}
                        className="mx-12 my-3 w-[calc(100%-6rem)] bg-vividviolet text-text py-2 rounded-lg font-medium hover:text-hover hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                        📧 Contacter
                    </button>
                </div>
            )}
        </>
    );
};

export default Top;