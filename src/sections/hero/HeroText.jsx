import { TiLocationArrow } from "react-icons/ti";
import { ScrollToSectionContext } from "../../context/ScrollToSectionContext.jsx";
import {useCallback, useContext} from "react";

const HeroText = () => {
    const { triggerScroll } = useContext(ScrollToSectionContext);

    const handleGoServices = useCallback(() => {
        triggerScroll("#services");
    }, [triggerScroll]);
    return (
        <div className="select-none relative size-full">
            <div className="absolute left-0 top-0 z-40 w-full pointer-events-none">
                <div className="mt-24 px-5">
                    <p className="hero-heading mb-2">Valerian</p>
                    <p className="max-w-64 mb-2 text-xs ml-1">
                        Un Site Web À Réaliser ?<br/>Je Suis Là Pour En Parler !
                    </p>
                    <button id="go-services" onClick={handleGoServices} className="button-hero group relative pointer-events-auto transition-all duration-300 ease-in-out hover:scale-105">
                        <TiLocationArrow className="w-5 h-5 mr-1" />
                        <span className="relative inline-block overflow-hidden">
                            <div className="relative transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                Mes Services
                            </div>
                            <div className="absolute top-full left-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full select-none">
                                Mes Services
                            </div>
                        </span>
                    </button>
                </div>
            </div>
            <p className="hero-heading absolute right-5 bottom-5 z-40 pointer-events-none">De Carvalho</p>
        </div>
    );
};

export default HeroText;