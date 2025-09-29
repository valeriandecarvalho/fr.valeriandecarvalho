import { useRef, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";

const HeroVideo = forwardRef(({ getVideoSrc, onTimeReached, keyTimes }, ref) => {
    const videoRef = useRef(null);
    const triggered = useRef(new Set());
    const nextIndex = useRef(0);
    const hasLooped = useRef(false);
    const isPlaying = useRef(true);
    useImperativeHandle(ref, () => ({
        seekTo: (t) => {
            const v = videoRef.current;
            if (!v) return;
            v.style.transition = "none";
            v.style.transform = "scale(0)";
            v.offsetHeight;
            v.style.transition = "transform 300ms ease-out";
            v.style.transform = "scale(1)";
            v.currentTime = t;
            triggered.current.clear();
            nextIndex.current = 0;
            hasLooped.current = false;
        }
    }), []);
    const handleTimeUpdate = useCallback((e) => {
        if (!isPlaying.current) return;
        const t = e.target.currentTime;
        if (t < 1 && nextIndex.current > 0 && !hasLooped.current) {
            triggered.current.clear();
            nextIndex.current = 0;
            hasLooped.current = true;
        } else if (t > 1) hasLooped.current = false;
        for (let i = nextIndex.current; i < keyTimes.length; i++) {
            if (t < keyTimes[i]) break;
            if (!triggered.current.has(keyTimes[i])) {
                triggered.current.add(keyTimes[i]);
                onTimeReached(keyTimes[i]);
                nextIndex.current = i + 1;
            }
        }
    }, [onTimeReached, keyTimes]);
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const observer = new IntersectionObserver(([entry]) => {
            isPlaying.current = entry.isIntersecting;
            entry.isIntersecting ? v.play().catch(() => {}) : v.pause();
        }, { threshold: 0.1, rootMargin: '20px' });
        observer.observe(v);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src={getVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center z-10"
            onTimeUpdate={handleTimeUpdate}
        />
    );
});

HeroVideo.displayName = "HeroVideo";
export default HeroVideo;