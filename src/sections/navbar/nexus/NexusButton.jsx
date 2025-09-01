import { memo } from "react";
import clsx from "clsx";
import NexusPopup from "./NexusPopup.jsx";

const NexusButton = memo(({ id, title, rightIcon, leftIcon, containerClass, isOpen, onToggle }) => {
    return (
        <>
            <button
                id={id}
                onClick={() => onToggle?.(!isOpen)}
                className={clsx(
                    "group relative z-50 w-fit cursor-pointer overflow-hidden rounded-full bg-secondary px-5 py-3 text-primary transition-all duration-300 ease-in-out hover:scale-105",
                    containerClass
                )}
                aria-expanded={isOpen}
            >
                {leftIcon}
                <span className="relative inline-block overflow-hidden font-general text-xs uppercase">
                    <div className="relative transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {title}
                    </div>
                    <div className="absolute top-full left-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full select-none">
                        {title}
                    </div>
                </span>
                <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {rightIcon}
                </div>
            </button>
            <NexusPopup isOpen={isOpen} onClose={() => onToggle?.(false)} />
        </>
    );
});

export default NexusButton;