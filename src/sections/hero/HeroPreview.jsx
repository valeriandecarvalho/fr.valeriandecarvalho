import { useRef, useEffect, useCallback, useState } from "react";

const HeroPreview = ({ getVideoSrc, start, onClick }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const handleTimeUpdate = useCallback(() => {
        if (!isHovered || !videoRef.current?.currentTime) return;
        if (videoRef.current.currentTime >= start + 2) {
            videoRef.current.currentTime = start;
        }
    }, [start, isHovered]);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (Math.abs(video.currentTime - start) > 0.1) {
            video.currentTime = start;
        }
        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, [start, handleTimeUpdate]);
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        videoRef.current?.play?.().catch(() => {});
    }, []);
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        videoRef.current?.pause?.();
    }, []);

    return (
        <div
            className="hero-preview abs-center z-30 opacity-0 hover:opacity-100 transition-all duration-500"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="scale-50">
                <video
                    ref={videoRef}
                    src={getVideoSrc}
                    muted
                    playsInline
                    preload="none"
                    onClick={onClick}
                    className="size-48 md:size-64 object-cover object-center scale-150 rounded-xl cursor-pointer z-20 hover:scale-[1.6] transition-transform duration-200"
                />
            </div>
        </div>
    );
};

export default HeroPreview;