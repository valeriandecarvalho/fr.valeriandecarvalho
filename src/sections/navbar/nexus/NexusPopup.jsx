import { memo, useEffect } from "react";

const NexusPopup = memo(({ isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleNavbarClick = (e) => {
            if (e.target.closest('.nav-btn, img[alt="logo"], .menu-line-horizontal, button[title*="menu"]')) onClose();
        };
        document.addEventListener('click', handleNavbarClick);
        return () => {
            document.removeEventListener('click', handleNavbarClick);
        };
    }, [isOpen, onClose]);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 bg-primary h-[calc(100vh+1rem)] sm:-inset-x-6 -top-4">
            <nav
                className="flex flex-col items-center space-y-6 py-20 overflow-y-auto overflow-x-hidden h-full px-4"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <a className="text-secondary/50 cursor-not-allowed">Portfolio</a>
                <a href="https://blog.valeriandecarvalho.fr" className="hover-effect cursor-pointer select-none hover:text-white">Blog</a>
            </nav>
        </div>
    );
});

export default NexusPopup;