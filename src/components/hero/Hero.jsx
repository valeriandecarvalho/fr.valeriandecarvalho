import { useRef, useState, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const totalVideos = 6;
    const currentVideoRef = useRef(null);
    const nextVideoRef = useRef(null);
    const backgroundVideoRef = useRef(null);
    const getVideoSrc = useCallback((index) => `videos/hero-${index}.mp4`, []);
    const upcomingVideoIndex = useMemo(() => (currentIndex % totalVideos) + 1, [currentIndex]);
    const playNextVideo = useCallback(() => {
        setCurrentIndex(prev => (prev % totalVideos) + 1);
    }, []);

    useGSAP(() => {
        if (currentVideoRef.current) {
            gsap.fromTo(currentVideoRef.current,
                { scale: 0.5, transformOrigin: 'center center' },
                {
                    scale: 1,
                    duration: 1,
                    ease: 'power1.inOut',
                    onStart: () => nextVideoRef.current?.play(),
                    immediateRender: false
                }
            );
        }
    }, [currentIndex]);
    useGSAP(() => {
        gsap.fromTo('#video-frame',
            {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                borderRadius: '0 0 0 0'
            },
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

    return (
        <section id="accueil" className="relative h-dvh w-full overflow-x-hidden">
            <div className="relative z-10 h-dvh w-full overflow-hidden" id="video-frame">
                <video
                    ref={backgroundVideoRef}
                    src={getVideoSrc(currentIndex)}
                    muted
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    onLoadedData={() => {
                        if (backgroundVideoRef.current) {
                            backgroundVideoRef.current.currentTime = 0;
                            backgroundVideoRef.current.pause();
                        }
                    }}
                />
                <div
                    className="mask-clip-path abs-center z-30 cursor-pointer opacity-0 hover:opacity-100 transition-all duration-500"
                    onClick={playNextVideo}
                >
                    <div className="scale-50">
                        <video
                            ref={nextVideoRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            className="size-48 md:size-64 object-cover object-center scale-150 rounded-xl"
                        />
                    </div>
                </div>

                <video
                    ref={currentVideoRef}
                    key={currentIndex}
                    src={getVideoSrc(currentIndex)}
                    onEnded={playNextVideo}
                    muted
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            </div>
        </section>
    );
};

export default Hero;