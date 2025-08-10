import { reactjs, tailwind, vitejs, javascript, webstorm} from '../assets';

export const myProject = [
    {
        id: 1,
        title: "valeriandecarvalho.fr",
        subtitle: "Espace Professionnel",
        description:
            "Site web personnel complet avec animations 3D, blog, interface d’administration et gestion dynamique du contenu. Développé en React avec Vite et stylisé avec TailwindCSS.",
        subDescription: [
            "Interface principale (branche `portfolio`) : portfolio responsive avec robot 3D animé (Three.js), navigation fluide (Framer Motion), système de filtres pour projets et formulaire de contact fonctionnel via EmailJS.",
            "Branche `dashboard` : panneau d’administration (en développement) permettant d’éditer le contenu du site sans passer par un IDE.",
            "Branche `blog` : système de gestion et de publication d’articles personnels (en développement).",
        ],
        href: "https://github.com/valeriandecarvalho/fr.valeriandecarvalho",
        image: "/assets/project/fr.valeriandecarvalho.webp",
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
        title: "À venir",
        subtitle: "À venir",
        description:
            "À venir",
        subDescription: [
            "À venir",
        ],
        href: "",
        image: "/assets/project/a-venir.webp",
        tags: [],
    }
];