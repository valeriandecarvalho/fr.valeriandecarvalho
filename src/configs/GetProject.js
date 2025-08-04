import { reactjs, tailwind, vitejs, javascript, webstorm} from '../assets';

export const myProject = [
    {
        id: 1,
        title: "Portfolio & Espace Personnel",
        description:
            "Site web portfolio moderne avec animations 3D, développé en React et stylisé avec TailwindCSS pour une expérience utilisateur immersive.",
        subDescription: [
            "Interface interactive avec robot 3D animé (Three.js), effets de parallaxe et animations fluides grâce à Motion/Framer Motion.",
            "Architecture modulaire responsive avec navigation par sections, système de filtrage pour les certifications et formulaire de contact fonctionnel via EmailJS.",
        ],
        href: "https://github.com/valeriandecarvalho/portfolio",
        image: "/assets/project/portfolio.webp",
        tags: [
            {
                id: 1,
                name: "React",
                path: reactjs,
            },
            {
                id: 2,
                name: "TailwindCSS",
                path: tailwind,
            },
            {
                id: 3,
                name: "ViteJS",
                path: vitejs,
            },
            {
                id: 4,
                name: "JavaScript",
                path: javascript,
            },

            {
                id: 5,
                name: "WebStorm",
                path: webstorm,
            },
        ],
    },
    {
        id: 2,
        title: "Coming Soon",
        description:
            "Coming Soon",
        subDescription: [
            "Coming Soon",
        ],
        href: "",
        image: "/assets/project/soon.png",
        tags: [],
    }
];