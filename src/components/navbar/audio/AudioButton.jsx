import { useRef, useState, useEffect, useCallback } from "react";
import clsx from "clsx";

const AudioButton = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasAutoPlayed = useRef(false);

    const toggleAudio = useCallback(() => {
        const nextState = !isPlaying;
        setIsPlaying(nextState);
        nextState ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasAutoPlayed.current) {
                hasAutoPlayed.current = true;
                audioRef.current?.play().then(() => setIsPlaying(true));
            }
        };
        const events = ['click', 'scroll', 'keydown', 'touchstart'];
        events.forEach(e => document.addEventListener(e, handleFirstInteraction, { once: true }));
        return () => events.forEach(e => document.removeEventListener(e, handleFirstInteraction));
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                audioRef.current?.pause();
            } else if (isPlaying) {
                audioRef.current?.play();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isPlaying]);

    return (
        <button
            onClick={toggleAudio}
            title={isPlaying ? "Désactiver la musique" : "Activer la musique"}
            className="ml-5 xl:ml-10 flex items-center space-x-1 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out z-50"
        >
            <audio ref={audioRef} className="hidden" src="/sounds/loop.mp3" loop />
            {[1,2,3,4].map(i => (
                <div
                    key={i}
                    className={clsx("audio-line-vertical", { active: isPlaying })}
                    style={{ animationDelay: `${i*0.1}s` }}
                />
            ))}
        </button>
    );
};

export default AudioButton;