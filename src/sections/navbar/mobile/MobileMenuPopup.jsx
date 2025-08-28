import clsx from "clsx";
import AudioPlayer from "../audio/AudioPlayer";

const MobileMenuPopup = ({
                             isOpen,
                             onClose,
                             onNavigate,
                             navItems,
                             isIndicatorActive,
                             toggleAudio,
                             audioRef,
                             isCloseButtonActive
                         }) => {
    return (
        <div
            className={clsx(
                "fixed inset-0 z-60 bg-gradient-to-b from-primary/95 via-primary/90 to-primary text-white transition-transform duration-300 ease-in-out transform overflow-y-auto",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div
                className="min-h-full bg-primary flex flex-col items-center pt-[4rem] md:pt-20 px-2 xs:px-4"
                onClick={onClose}
            >
                {/* Header avec boutons audio et fermeture */}
                <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
                    <div
                        className="flex items-center gap-4"
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture
                    >
                        <AudioPlayer
                            isIndicatorActive={isIndicatorActive}
                            toggleAudio={toggleAudio}
                            audioRef={audioRef}
                        />
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className={clsx(
                            "ml-4 cursor-pointer transition-all duration-300 transform hover:scale-110 close-button-animated",
                            { active: isCloseButtonActive }
                        )}
                        aria-label="Fermer le menu"
                    >
                        {/* La croix est créée par les pseudo-éléments CSS ::before et ::after */}
                    </div>
                </div>

                <div
                    className="relative flex flex-col items-center w-full max-w-[300px] xs:max-w-[350px] sm:max-w-md md:max-w-lg lg:max-w-xl space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mt-4 xs:mt-6 sm:mt-8 md:mt-10 lg:mt-12 pb-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    {navItems.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => onNavigate(id)}
                            className="cursor-pointer w-full px-4 py-3 xs:px-5 xs:py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-10 lg:py-8 text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium rounded-lg xs:rounded-xl md:rounded-2xl hover:bg-white/20 active:bg-white/30 transition-colors duration-300 border border-white/10 hover:border-white/30 leading-tight"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileMenuPopup;