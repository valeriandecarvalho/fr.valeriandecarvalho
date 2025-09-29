import { useRef, useEffect } from "react";

const HeroBackground = ({ getVideoSrc, currentTime = 0 }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = currentTime;
    }, [currentTime]);

    return (
        <video
            ref={videoRef}
            src={getVideoSrc}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
    );
};

export default HeroBackground;