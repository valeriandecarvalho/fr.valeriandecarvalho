import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { FlipWords } from "./FlipWords";
import { getImageSrc } from "../../components/getImageSrc.jsx";

const WORDS = ["Développeur Full-Stack", "Etudiant en Informatique", "Développeur de SaaS", "Créateur de plateformes"];
const Tagline = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        })
            .fromTo(".mask-clip-path", {
                width: "50%",
                height: "50%",
                borderRadius: "50%",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                clipPath: "polygon(6% 0, 86% 28%, 100% 66%, 0 91%)",
            }, {
                width: "100%",
                height: "100%",
                borderRadius: "0%",
                left: "0%",
                top: "0%",
                xPercent: 0,
                yPercent: 0,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.7,
            })
            .to(".mask-clip-path", { duration: 0.3 });
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);
    const taglineImg = getImageSrc(
        "https://fr-valeriandecarvalho.b-cdn.net/images/webp/tagline.webp",
        "https://fr-valeriandecarvalho.b-cdn.net/images/png/tagline.png"
    );
    return (
        <section id="tagline" className="pt-20 mt-[25vh] min-h-screen w-full overflow-x-hidden">
            <div className="relative flex flex-col items-center gap-5 text-center">
                <p className="font-general text-sm uppercase text-[10px] sm:text-[12px] md:text-[14px]">
                    Bienvenue dans mon univers
                </p>
                <h1 className="tagline-heading">
                    Valérian De Carvalho<br/><FlipWords words={WORDS}/>
                </h1>
                <div className="tagline-subtext">
                    <p className="text-base md:text-xl">
                        Vos projets, mes opportunités – je développe vos plateformes de A à Z
                    </p>
                    <p className="text-secondary/50 text-xs md:text-sm">
                        Étudiant et freelance : je recherche aussi des stages, projets et expériences en plus des missions.<br/>
                        Contactez-moi via le formulaire, ou retrouvez mes missions sur Malt.
                    </p>
                </div>
            </div>
            <div className="h-dvh w-full relative flex justify-center items-center" id="clip">
                <div className="mask-clip-path absolute overflow-hidden">
                    <img
                        src={taglineImg}
                        alt="Tagline"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
}

export default Tagline;