import SectionWrapper from "../../SectionWrapper.jsx";
import Card from "./Card.jsx";
import CopyEmailButton from "./CopyEmailButton.jsx";
import {Globe} from "./Globe.jsx";
import {SkillCircle} from "./SkillCircle.jsx";
import { arduino, cplusplus, docker, git, python, raspberry } from "../../../../assets/index.js";
import { useRef } from "react";

const About = () => {
    const containerRef = useRef(null);
    const textStyle = "text-text/70 text-xs font-sans";
    const cards = [
        {
            title: "Comprendre & Construire",
            content: (
                <div>
                    <p className={`${textStyle} mb-2`}>
                        Étudiant passionné par la transformation d'idées en réalités tangibles. Que ce soit à travers le code, des projets concrets ou des défis sportifs, mon moteur est la création.<br /><br />J’allie compréhension théorique et mise en pratique : après avoir assimilé les concepts, j’expérimente activement pour ancrer et valider mes apprentissages.
                    </p>
                    <img src="/assets/about/pcb.webp" alt="Circuit imprimé" className="w-full object-contain mt-auto"/>
                </div>
            ),
            cols: "xl:col-span-6"
        },
        {
            cols: "xl:col-span-4",
            content: (
                <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-hover/50 pointer-events-none select-none">Coder, C'est Créer</span>
                    </div>
                    <Card style={{ rotate: "-120deg", top: "50%", left: "70%" }} image={arduino} containerRef={containerRef} borderColor="#00979c"/>
                    <Card style={{ rotate: "-30deg", top: "60%", left: "10%" }} image={cplusplus} containerRef={containerRef} borderColor="#1a4674"/>
                    <Card style={{ rotate: "145deg", top: "70%", left: "45%" }} image={docker} containerRef={containerRef} borderColor="#37474f"/>
                    <Card style={{ rotate: "30deg", top: "5%", left: "10%" }} image={git} containerRef={containerRef} borderColor="#f03c2e"/>
                    <Card style={{ rotate: "-45deg", top: "10%", left: "60%" }} image={python} containerRef={containerRef} borderColor="#f0c020"/>
                    <Card style={{ rotate: "145deg", top: "30%", left: "35%" }} image={raspberry} containerRef={containerRef} borderColor="#bc1142"/>
                </div>
            )
        },
        {
            cols: "xl:col-span-3",
            bg: "bg-vividviolet",
            content: (
                <div className="h-full flex flex-col items-center justify-center text-center">
                    <p className="text-hover mb-2">Une opportunité ? Discutons ensemble des possibilités !</p>
                    <CopyEmailButton />
                </div>
            )
        },
        {
            title: "Stack Technique",
            cols: "xl:col-span-4",
            content: (
                <div>
                    <p className={`${textStyle} mb-30`}>
                        Formation académique et auto-apprentissage m'ont permis d'acquérir une base technique solide.<br /><br />Du développement logiciel au hardware embarqué, je continue d'élargir mes compétences.
                    </p>
                    <SkillCircle />
                </div>
            )
        },
        {
            title: "Ouverture Internationale",
            cols: "xl:col-span-3",
            bg: "bg-gradient-to-tl from-blackolive via-raisinblack to-blackolive",
            content: (
                <div>
                    <p className={`${textStyle}`}>
                        Basé en France, ma passion pour la découverte m'ouvre aux opportunités européennes et internationales.<br /><br />Prêt à explorer de nouveaux environnements, en remote ou sur site.
                    </p>
                    <Globe />
                </div>
            )
        }
    ];

    return (
        <SectionWrapper id="" className="pt-18 xl:pt-20 mb-[100vh]">
            <p className="text-2xl md:text-3xl xl:text-4xl font-medium text-center mb-10">À propos</p>
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 xl:grid-cols-10 gap-5">
                    {cards.map(({ title, cols, bg = 'bg-storm', content }, index) => (
                        <div key={index} className={`${cols} ${bg} rounded-xl overflow-hidden flex flex-col ${index !== 1 && 'p-6'}`} style={{ height: '300px' }}>
                            {title && <h3 className="text-hover mb-2">{title}</h3>}
                            {content}
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default About;