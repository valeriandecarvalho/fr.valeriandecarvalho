import { useRef } from "react";

const HeroVideo = ({ getVideoSrc, onTimeReached }) => {
    const triggeredRef = useRef(new Set());
    const keyTimes = [3.6, 7.4, 11];

    return (
        <video
            src={getVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center z-10"
            onTimeUpdate={(e) => {
                const t = e.currentTarget.currentTime;
                if (triggeredRef.current.size === keyTimes.length) {
                    triggeredRef.current.clear();
                }
                keyTimes.forEach((time) => {
                    if (!triggeredRef.current.has(time) && t >= time) {
                        triggeredRef.current.add(time);
                        onTimeReached?.(time);
                    }
                });
            }}
        />
    );
};

export default HeroVideo;