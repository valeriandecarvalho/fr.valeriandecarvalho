import { useEffect, useState } from "react";
import HeroVideo from "./HeroVideo.jsx";
import HeroPreview from "./HeroPreview.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "./HeroBackground.jsx";
import HeroText from "./HeroText.jsx";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const handleTimeReached = (time) => {
        console.log("Time reached:", time);
    };
    useEffect(() => {
        let blobUrl;
        const loadVideo = async () => {
            const response = await fetch("videos/mp4/hero.h264.mp4");
            const blob = await response.blob();
            blobUrl = URL.createObjectURL(blob);
            setVideoSrc(blobUrl);
        };
        loadVideo();
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, []);

    return (
        <section id="accueil" className="relative h-dvh w-full overflow-x-hidden">
            <HeroBackground getVideoSrc={videoSrc} />
            <HeroVideo getVideoSrc={videoSrc} onTimeReached={handleTimeReached} />
            <HeroText />
            <HeroPreview getVideoSrc={videoSrc} />
        </section>
    );
};

export default Hero;