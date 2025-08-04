import HeroBackground from "./HeroBackground";
import HeroText from "./HeroText";
import { HeroModel } from "./HeroModel";
import SectionWrapper from "../SectionWrapper.jsx";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader.jsx";
import { Suspense, useState, useEffect } from 'react';

const Hero = () => {
    const [isMobileLandscape, setIsMobileLandscape] = useState(false);
    useEffect(() => {
        const checkOrientation = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const isLandscape = aspectRatio > 1;
            const isMobileSize = window.innerHeight < 700;
            setIsMobileLandscape(isLandscape && isMobileSize);
        };
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    return (
        <SectionWrapper id="accueil" className="pt-14 xl:pt-16 relative h-screen overflow-hidden mb-[50vh]">
            <HeroBackground />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-between">
                <div className="flex items-center justify-center w-full pt-21 xl:pt-24">
                    <HeroText />
                </div>

                <div className="w-full flex-grow flex items-start justify-center min-h-[30vh]">
                    <div className="w-full h-full max-h-[100vh]">
                        <Canvas className="w-full h-full">
                            <Suspense fallback={<Loader/>}>
                                <HeroModel
                                    position={isMobileLandscape ? [0, -0.275 , 4.55] : [0, -0.4, 4.4]}
                                    rotation={isMobileLandscape ? [0.1, Math.PI, 0] : [-0.1, Math.PI, 0]}
                                />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Hero;