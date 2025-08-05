import { useState } from 'react';

const Bottom = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        { id: 'portfolio', label: 'Portfolio', href: 'https://valeriandecarvalho.fr/' },
        { id: 'dashboard', label: 'Dashboard', href: 'https://dashboard.valeriandecarvalho.fr/' },
        { id: 'blog', label: 'Blog', href: 'https://blog.valeriandecarvalho.fr/' },
    ];

    return (
        <div className="fixed bottom-6 md:bottom-9 xl:bottom-12 left-3 z-40">
            {isMenuOpen && (
                <div className="mb-3 bg-primary rounded-lg shadow-xl border-2 border-secondary/30 overflow-hidden">
                    {menuItems.map(({ id, label, href }) => (
                        <button
                            key={id}
                            onClick={() => {
                                if (id === 'portfolio' || id === 'dashboard') window.location.href = href;
                                setIsMenuOpen(false);
                            }}
                            title={href}
                            className={`w-full px-4 py-2 text-left transition-all duration-200 cursor-pointer ${
                                id === 'blog'
                                    ? 'text-vividviolet font-semibold bg-vividviolet/10 hover:bg-vividviolet/20'
                                    : 'text-text hover:text-hover hover:bg-secondary/20'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-secondary/80 hover:bg-secondary text-hover rounded-full w-10 h-10 shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            </button>
        </div>
    );
};

export default Bottom;