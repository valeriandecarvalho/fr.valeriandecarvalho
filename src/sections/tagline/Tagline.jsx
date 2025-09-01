import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Tagline = () => {
    const clipRef = useRef(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
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

        clipAnimation
            .fromTo(".mask-clip-path",
                {
                    width: "50%",
                    height: "50%",
                    borderRadius: "50%",
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    clipPath: "polygon(6% 0, 86% 28%, 100% 66%, 0 91%)",
                },
                {
                    width: "100%",
                    height: "100%",
                    borderRadius: "0%",
                    left: "0%",
                    top: "0%",
                    xPercent: 0,
                    yPercent: 0,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.7,
                }
            )
            .to(".mask-clip-path", { duration: 0.3 });

        const handleResize = () => ScrollTrigger.refresh();
        const resizeTimer = setTimeout(handleResize, 250);
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="tagline" className="pt-20 mt-[25vh] min-h-screen w-full overflow-x-hidden">
            <div className="relative mb-8 pt-32 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">Bienvenue dans mon univers</p>
                <h1 className="tagline-heading">Valérian</h1>
                <div className="tagline-subtext">
                    <p>Vos projets, ma quête — je crée vos sites web de A à Z</p>
                </div>
            </div>
            <div className="h-dvh w-full relative" id="clip" ref={clipRef}>
                <div className="mask-clip-path absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <img src="images/tagline.webp" alt="Background" className="w-full h-full object-cover" loading="lazy" />
                </div>
            </div>
        </section>
    );
}

export default Tagline;