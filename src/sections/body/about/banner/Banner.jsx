import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle.jsx";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        // état initial
        gsap.set(".mask-clip-path", {
            width: "50%", // ou la valeur que tu avais au départ
            height: "50%",
            borderRadius: "5%"
        });

        clipAnimation.to(".mask-clip-path", {
            width: "100%",
            height: () => `${window.innerHeight}px`,
            borderRadius: 0,
        });

        const resetOnResize = () => {
            // réappliquer état initial avant refresh
            gsap.set(".mask-clip-path", {
                width: "50%",
                height: "50%",
                borderRadius: "50%"
            });
            clipAnimation.invalidate();
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", resetOnResize);
        window.addEventListener("orientationchange", resetOnResize);

        return () => {
            window.removeEventListener("resize", resetOnResize);
            window.removeEventListener("orientationchange", resetOnResize);
            clipAnimation.scrollTrigger?.kill();
            clipAnimation.kill();
        };
    });


    return (
        <div id="a-propos" className="min-h-screen w-full overflow-x-hidden">
            <div className="relative mb-8 pt-32 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">Bienvenue dans mon univers</p>
                <AnimatedTitle
                    title="Valérian &nbsp; de &nbsp; carvalho<br />Développeur  &nbsp; full-stack"
                    containerClass="mt-5 !text-white text-center font-sans"
                />
                <div className="about-subtext">
                    <p>Vos projets, ma quête — je crée vos sites web de A à Z</p>
                    <p className="text-gray-500">Pas seulement freelance : stages, projets et missions sont les bienvenus. Pour les missions, direction Malt ; pour le reste, utilisez le formulaire de contact.</p>
                </div>
            </div>
            <div className="h-dvh w-full" id="clip">
                {/* mask-clip-path doit être relative et overflow-hidden */}
                <div className="mask-clip-path about-image relative w-full h-full overflow-hidden">
                    <img
                        src="assets/about/about.webp"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;