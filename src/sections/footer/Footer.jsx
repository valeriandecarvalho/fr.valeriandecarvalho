import { useMemo, useState } from "react";
import { mySocial } from "../../configs/GetSocial.js";
import CGUModal from "./utils/CGUModal.jsx";
import PrivacyModal from "./utils/PrivacyModal.jsx";

const Footer = () => {
    const [showCGU, setShowCGU] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const gitInfo = useMemo(() => {
        const msg = import.meta.env.VITE_GIT_COMMIT_MESSAGE;
        const date = import.meta.env.VITE_GIT_COMMIT_DATE;
        return msg && date ? `${msg} - ${date}` : null;
    }, []);

    return (
        <>
            <div className="bottom-0 left-0 right-0 mb-8 bg-primary/90 backdrop-blur-sm text-hover text-xs text-center py-1 xl:py-2 font-sans">
                {/* Ligne supérieure */}
                <div className="bg-gradient-to-r from-transparent via-secondary to-transparent mb-12 h-[1px] w-2/3 mx-auto" />

                {/* Grille principale */}
                <div className="grid grid-cols-1 xl:grid-cols-3 w-2/3 mx-auto mb-2">
                    {/* Colonne 1 - Copyright */}
                    <div className="text-center xl:col-start-1 xl:row-start-1 mb-10">
                        © 2025 Valérian. Tous droits réservés.
                    </div>

                    {/* Colonne 2 - Réseaux sociaux */}
                    <div className="text-center xl:col-start-2 xl:row-start-1 mb-10 xl:mb-0">
                        <div className="inline-flex flex-col items-center space-y-2">
                            <span className="text-sm">Suivez-moi :</span>
                            <div className="flex justify-center space-x-2">
                                {mySocial.map(({ href, icon, name }, i) => (
                                    <a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visiter mon profil ${name}`}
                                        className="group relative p-2 rounded-lg bg-social/80 hover:bg-social transition-all duration-300 hover:scale-110"
                                    >
                                        <img
                                            src={icon}
                                            alt={name}
                                            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <span className="z-50 absolute top-10 left-1/2 transform -translate-x-1/2 bg-social text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            {name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Colonne 3 - Liens légaux */}
                    <div className="text-center xl:col-start-3 xl:row-start-1">
                        <button
                            onClick={() => setShowCGU(true)}
                            className="hover:underline cursor-pointer transition-colors duration-200"
                        >
                            Conditions générales
                        </button>
                        <span className="mx-2">|</span>
                        <button
                            onClick={() => setShowPrivacy(true)}
                            className="hover:underline cursor-pointer transition-colors duration-200"
                        >
                            Politique de confidentialité
                        </button>
                    </div>
                </div>

                {/* Ligne inférieure */}
                <div className="bg-gradient-to-r from-transparent via-text/50 to-transparent mt-12 mb-8 h-[1px] w-1/4 mx-auto" />

                {/* Crédit + Git info */}
                <div className="italic text-text/75 mb-2">Un site pensé, designé et codé à la main</div>
                {gitInfo && (
                    <a
                        href="https://github.com/valeriandecarvalho/fr.valeriandecarvalho/tree/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block italic text-text/50 px-3 hover:text-text/75 transition-colors duration-200 hover:underline"
                    >
                        {gitInfo}
                    </a>
                )}
            </div>

            {/* Modales */}
            <CGUModal isOpen={showCGU} onClose={() => setShowCGU(false)} />
            <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        </>
    );
};

export default Footer;