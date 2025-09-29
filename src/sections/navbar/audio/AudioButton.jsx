import {useRef, useState, useEffect, useCallback, useContext, memo} from "react";
import clsx from "clsx";
import { AudioContext } from "../../../context/AudioContext.jsx";

const AudioButton = memo(({ onMouseEnter }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasAutoPlayed = useRef(false);
    const { setIsAudioEnabled } = useContext(AudioContext);

    const toggleAudio = useCallback(() => {
        const nextState = !isPlaying;
        setIsPlaying(nextState);
        setIsAudioEnabled(nextState);
        nextState ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasAutoPlayed.current) {
                hasAutoPlayed.current = true;
                audioRef.current?.play().then(() => {
                    setIsPlaying(true);
                    setIsAudioEnabled(true);
                });
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
            onMouseEnter={onMouseEnter}
            title={isPlaying ? "Désactiver la musique" : "Activer la musique"}
            className="ml-5 xl:ml-10 flex items-center space-x-1 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out z-50 audio-button"
        >
            <audio ref={audioRef} className="hidden" src="https://fr-valeriandecarvalho.b-cdn.net/sounds/loop.mp3" loop />
            {[1,2,3,4].map(i => (
                <div
                    key={i}
                    className={clsx("audio-line-vertical", { active: isPlaying })}
                    style={{ animationDelay: `${i*0.1}s` }}
                />
            ))}
        </button>
    );
});

export default AudioButton;