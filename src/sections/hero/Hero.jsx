import { useCallback, useRef, useState, useMemo } from "react";
import HeroVideo from "./HeroVideo.jsx";
import HeroPreview from "./HeroPreview.jsx";
import HeroBackground from "./HeroBackground.jsx";
import HeroText from "./HeroText.jsx";

const keyTimes = [0, 3.6, 7.6, 11.2, 19.4, 21.9];
const VIDEO_URL = "https://fr-valeriandecarvalho.b-cdn.net/videos/webm/vp9/hero.vp9.webm";
const Hero = () => {
    const [previewStart, setPreviewStart] = useState(keyTimes[1]);
    const videoRef = useRef(null);
    const memoizedKeyTimes = useMemo(() => keyTimes, []);
    const handleTimeReached = useCallback((time) => {
        const idx = memoizedKeyTimes.indexOf(time);
        if (idx !== -1) {
            setPreviewStart(memoizedKeyTimes[(idx + 1) % memoizedKeyTimes.length]);
        }
    }, [memoizedKeyTimes]);
    const handlePreviewClick = useCallback(() => {
        const currentIdx = memoizedKeyTimes.indexOf(previewStart);
        if (currentIdx !== -1) {
            const nextTime = memoizedKeyTimes[(currentIdx + 1) % memoizedKeyTimes.length];
            setPreviewStart(nextTime);
            videoRef.current?.seekTo?.(memoizedKeyTimes[currentIdx]);
        }
    }, [previewStart, memoizedKeyTimes]);

    return (
        <section id="accueil" className="relative h-dvh w-full overflow-x-hidden">
            <HeroBackground getVideoSrc={VIDEO_URL} />
            <HeroVideo
                ref={videoRef}
                getVideoSrc={VIDEO_URL}
                onTimeReached={handleTimeReached}
                keyTimes={memoizedKeyTimes}
            />
            <HeroText />
            <HeroPreview
                getVideoSrc={VIDEO_URL}
                start={previewStart}
                onClick={handlePreviewClick}
            />
        </section>
    );
};

export default Hero;