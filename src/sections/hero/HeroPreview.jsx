import { useRef, useEffect, useCallback, useState } from "react";

const HeroPreview = ({ getVideoSrc, start, onClick }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const lastClickRef = useRef(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleTimeUpdate = useCallback(() => {
        if (!isHovered || !videoRef.current?.currentTime) return;
        if (videoRef.current.currentTime >= start + 2) {
            videoRef.current.currentTime = start;
        }
    }, [start, isHovered]);

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current || isMobile) return;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        const clampedX = Math.max(-1, Math.min(1, x));
        const clampedY = Math.max(-1, Math.min(1, y));
        const rotateY = clampedX * 20;
        const rotateX = -clampedY * 20;
        container.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.5)`;
    }, [isMobile]);

    const resetTransform = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.5)';
        }
    }, []);

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
        if (isMobile) return;
        setIsHovered(true);
        videoRef.current?.play?.().catch(() => {});
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        videoRef.current?.pause?.();
        resetTransform();
    }, [resetTransform]);

    const handleClick = useCallback(() => {
        if (isMobile) return;
        const now = Date.now();
        if (now - lastClickRef.current < 300) return;
        lastClickRef.current = now;
        onClick?.();
    }, [onClick, isMobile]);
    if (isMobile) {
        return null;
    }

    return (
        <div
            className="hero-preview abs-center z-30 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div
                ref={containerRef}
                className="transition-transform duration-100 ease-out"
                style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.5)' }}
            >
                <video
                    ref={videoRef}
                    src={getVideoSrc}
                    muted
                    preload="metadata"
                    onClick={handleClick}
                    className={` size-48 md:size-64 object-cover object-center scale-150 
                    rounded-xl z-20 cursor-pointer preview-hover`}
                />
            </div>
        </div>
    );
};

export default HeroPreview;