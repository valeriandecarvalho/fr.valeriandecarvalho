import { createContext, useCallback, useState } from 'react';

export const AudioContext = createContext();
export const AudioProvider = ({ children }) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const toggleAudio = useCallback(() => {
        setIsAudioEnabled((prev) => !prev);
    }, []);
    return (
        <AudioContext.Provider value={{ isAudioEnabled, setIsAudioEnabled, toggleAudio }}>
            {children}
        </AudioContext.Provider>
    );
};