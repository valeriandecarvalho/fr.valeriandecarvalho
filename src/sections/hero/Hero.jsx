import { useCallback, useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVideo from "./HeroVideo.jsx";
import HeroPreview from "./HeroPreview.jsx";
import HeroBackground from "./HeroBackground.jsx";
import HeroText from "./HeroText.jsx";
import { getVideoSrc } from "../../components/getVideoSrc.jsx";
gsap.registerPlugin(ScrollTrigger);

const keyTimes = [0, 3, 11, 15, 19, 27];
const VIDEO_URL = getVideoSrc(
    "https://fr-valeriandecarvalho.b-cdn.net/videos/webm/hero_av1.webm",
    "https://fr-valeriandecarvalho.b-cdn.net/videos/mp4/hero_h264.mp4"
);
const Hero = () => {
    const [previewStart, setPreviewStart] = useState(keyTimes[1]);
    const [backgroundTime, setBackgroundTime] = useState(keyTimes[0]);
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
            const seekTime = memoizedKeyTimes[currentIdx];
            const nextTime = memoizedKeyTimes[(currentIdx + 1) % memoizedKeyTimes.length];
            setBackgroundTime(seekTime);
            setPreviewStart(nextTime);
            videoRef.current?.seekTo?.(seekTime);
        }
    }, [previewStart, memoizedKeyTimes]);
    useGSAP(() => {
        if (videoRef.current) {
            gsap.fromTo(videoRef.current,
                { scale: 0.25 },
                {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power1.inOut'
                }
            );
        }
        gsap.fromTo('#accueil',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
            {
                clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
                borderRadius: '0 0 40px 0',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '#accueil',
                    start: 'center center',
                    end: 'bottom center',
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            }
        );
    }, { dependencies: [previewStart, backgroundTime] });

    return (
        <section id="accueil" className="relative h-dvh w-full overflow-x-hidden">
            <HeroBackground getVideoSrc={VIDEO_URL} currentTime={backgroundTime} />
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