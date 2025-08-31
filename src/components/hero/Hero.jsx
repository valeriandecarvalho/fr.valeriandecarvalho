import { useRef, useState, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroText from "./HeroText.jsx";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const totalVideos = 6;
    const currentVideoRef = useRef(null);
    const nextVideoRef = useRef(null);
    const backgroundVideoRef = useRef(null);
    const previewContainerRef = useRef(null);
    const getVideoSrc = useCallback((index) => `videos/hero-${index}.mp4`, []);
    const upcomingVideoIndex = useMemo(() => (currentIndex % totalVideos) + 1, [currentIndex]);
    const playNextVideo = useCallback(() => {
        setCurrentIndex(prev => (prev % totalVideos) + 1);
    }, [totalVideos]);

    useGSAP(() => {
        currentVideoRef.current && gsap.fromTo(currentVideoRef.current,
            { scale: 0.25, transformOrigin: 'center center' },
            {
                scale: 1,
                duration: 0.5,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current?.play(),
                immediateRender: false
            }
        );
    }, [currentIndex]);
    useGSAP(() => {
        gsap.fromTo('#video-frame',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', borderRadius: '0 0 0 0' },
            {
                clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
                borderRadius: '0 0 40px 0',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '#video-frame',
                    start: 'center center',
                    end: 'bottom center',
                    scrub: true,
                }
            }
        );
    }, []);

    const handleMouseInteraction = useCallback((e) => {
        if (!previewContainerRef.current) return;
        const container = previewContainerRef.current;
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        if (e.type === 'mousemove') {
            const rotateX = ((e.clientY - centerY) / rect.height) * -30;
            const rotateY = ((e.clientX - centerX) / rect.width) * 30;
            gsap.to(container, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(container, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }, []);

    return (
        <section id="accueil" className="relative h-dvh w-full overflow-x-hidden">
            <div className="relative z-10 h-dvh w-full overflow-hidden" id="video-frame">
                <video
                    ref={backgroundVideoRef}
                    src={getVideoSrc(currentIndex)}
                    muted
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    onLoadedData={() => backgroundVideoRef.current?.pause()}
                />
                <video
                    ref={currentVideoRef}
                    key={currentIndex}
                    src={getVideoSrc(currentIndex)}
                    onEnded={playNextVideo}
                    muted
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover object-center z-10"
                />
                <div
                    className="mask-clip-path abs-center z-30 opacity-0 hover:opacity-100 transition-all duration-500"
                    onMouseMove={handleMouseInteraction}
                    onMouseLeave={handleMouseInteraction}
                >
                    <div ref={previewContainerRef} className="scale-50">
                        <video
                            ref={nextVideoRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            onClick={playNextVideo}
                            loop
                            muted
                            className="size-48 md:size-64 object-cover object-center scale-150 rounded-xl cursor-pointer preview-hover"
                            preload="auto"
                        />
                    </div>
                </div>
                <HeroText />
            </div>
        </section>
    );
};

export default Hero;