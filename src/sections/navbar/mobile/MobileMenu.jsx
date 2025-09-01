import { memo } from "react";
import clsx from "clsx";
import MobilePopup from "./MobilePopup.jsx";

const MobileMenu = memo(({ onToggle, navItems, onNavClick, isOpen, isNexusOpen, onMouseEnter }) => {
    const handleNavClick = (sectionId) => {
        onNavClick(sectionId);
        onToggle?.(false);
    };

    return (
        <>
            <button
                onClick={() => onToggle?.(!isOpen)}
                onMouseEnter={onMouseEnter}
                title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                className={clsx(
                    "md:hidden ml-5 flex flex-col space-y-1 cursor-pointer hover-effect relative z-50 mobile-button",
                    { "mr-4": isOpen || isNexusOpen }
                )}
                aria-expanded={isOpen}
            >
                {Array.from({length: 4}, (_, i) => (
                    <div
                        key={i}
                        className={clsx("mobile-line-horizontal", { active: isOpen })}
                        style={{ animationDelay: `${i*0.1}s` }}
                    />
                ))}
            </button>
            <MobilePopup
                isOpen={isOpen}
                onClose={() => onToggle?.(false)}
                navItems={navItems}
                onNavClick={handleNavClick}
            />
        </>
    );
});

export default MobileMenu;