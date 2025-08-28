import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import HeroBackground from "./HeroBackground";
import HeroText from "./HeroText";
import { HeroModel } from "./HeroModel";
import SectionWrapper from "../SectionWrapper.jsx";
import Loader from "./Loader.jsx";

const Hero = () => {
    const [isMobileLandscape, setIsMobileLandscape] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            setIsMobileLandscape(aspectRatio > 1 && window.innerHeight < 700);
        };
        checkOrientation();
        window.addEventListener("resize", checkOrientation);
        return () => window.removeEventListener("resize", checkOrientation);
    }, []);

    return (
        <SectionWrapper id="accueil" className="relative h-screen overflow-hidden mb-[50vh]">
            <HeroBackground />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-between">
                <div className="flex items-center justify-center w-full pt-18 md:pt-24">
                    <HeroText hideStatus={isMobileLandscape} />
                </div>

                <div className="w-full flex-grow flex items-start justify-center min-h-[30vh]">
                    <Canvas className="w-full h-full max-h-[100vh]">
                        <Suspense fallback={<Loader />}>
                            <HeroModel
                                position={isMobileLandscape ? [0, -0.225, 4.5] : [0, -0.275, 4.35]}
                                rotation={[0.1, Math.PI, 0]}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Hero;