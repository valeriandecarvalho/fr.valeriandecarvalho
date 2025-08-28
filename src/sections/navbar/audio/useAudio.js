import { useState, useRef, useCallback, useEffect } from "react";

export const useAudio = (audioSrc) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const audioRef = useRef(null);

    const toggleAudio = useCallback(() => {
        if (!audioRef.current) return;

        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
            setIsIndicatorActive(false);
            localStorage.setItem("musicOn", "false");
        } else {
            audioRef.current.muted = false;
            audioRef.current.play().then(() => {
                setIsAudioPlaying(true);
                setIsIndicatorActive(true);
                localStorage.setItem("musicOn", "true");
            }).catch(err => console.warn("Lecture bloquée :", err));
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if (!audioRef.current) return;
        const musicOn = localStorage.getItem("musicOn") === "true";
        audioRef.current.muted = !musicOn;

        if (musicOn) {
            audioRef.current.play().catch(() => {});
            setIsAudioPlaying(true);
            setIsIndicatorActive(true);
        }
    }, []);

    return {
        audioRef,
        isAudioPlaying,
        isIndicatorActive,
        toggleAudio
    };
};