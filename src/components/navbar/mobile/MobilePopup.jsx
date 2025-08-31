import { memo, useEffect } from "react";

const MobilePopup = memo(({ isOpen, onClose, navItems, onNavClick }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleResize = () => window.innerWidth >= 768 && onClose();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, onClose]);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 bg-primary h-[calc(100vh+1rem)] sm:-inset-x-6 -top-4">
            <nav className="flex flex-col space-y-6 py-20 overflow-y-auto overflow-x-hidden h-full px-4"
                 style={{
                     scrollbarWidth: 'none',
                     msOverflowStyle: 'none',
                 }}
            >
                {navItems?.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavClick(item.id)}
                        className="hover-effect cursor-pointer select-none"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
});

export default MobilePopup;