import { useRef, useEffect } from "react";

const HeroPreview = ({ getVideoSrc, start = 3.6, end = 7.54 }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.onloadedmetadata = () => {
            video.currentTime = start;
        };
        video.ontimeupdate = () => {
            if (video.currentTime >= end) {
                video.currentTime = start;
            }
        };
    }, [start, end]);

    return (
        <div className="hero-preview abs-center z-30 opacity-0 hover:opacity-100 transition-all duration-500">
            <div className="scale-50">
                <video
                    ref={videoRef}
                    src={getVideoSrc}
                    autoPlay
                    muted
                    playsInline
                    className="size-48 md:size-64 object-cover object-center scale-150 rounded-xl cursor-pointer z-20"
                />
            </div>
        </div>
    );
};

export default HeroPreview;
