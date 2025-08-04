import { useState } from "react";
import SectionWrapper from "../SectionWrapper.jsx";
import ExperienceCard from "./ExperienceCard.jsx";
import { myExperience } from "../../../configs/GetExperience.js";

const Experience = () => {
    const [expandedCards, setExpandedCards] = useState({});

    const toggleExpanded = (index) => {
        setExpandedCards(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <SectionWrapper id="experiences" className="pt-18 xl:pt-20 mb-[100vh]">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium text-center mb-16">Mes Expériences</h2>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                {/* Desktop Timeline */}
                <div className="hidden lg:block">
                    {/* Ligne centrale */}
                    <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-secondary via-vividviolet to-secondary">
                        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-vividviolet/30 to-transparent"></div>
                    </div>
                    {myExperience.map((exp, index) => (
                        <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            {/* Point timeline - effets supprimés */}
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <div className="w-4 h-4 bg-vividviolet rounded-full border-4 border-primary z-10">
                                </div>
                            </div>
                            {/* Tiret connecteur vers la carte */}
                            <div className={`absolute left-1/2 top-1/2 transform -translate-y-1/2 z-0 ${index % 2 === 0 ? '-translate-x-full' : 'translate-x-0'}`}>
                                <div className={`h-0.5 bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} from-vividviolet to-secondary/60 w-32 opacity-70`}
                                     style={{
                                         backgroundImage: `repeating-linear-gradient(to ${index % 2 === 0 ? 'left' : 'right'}, transparent, transparent 3px, currentColor 3px, currentColor 6px)`,
                                         color: '#9810fa'
                                     }}>
                                </div>
                            </div>
                            {/* Carte */}
                            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                                <ExperienceCard
                                    exp={exp}
                                    index={index}
                                    expandedCards={expandedCards}
                                    toggleExpanded={toggleExpanded}
                                />
                            </div>
                        </div>
                    ))}
                    {/* Point final - effets supprimés */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0">
                        <div className="w-6 h-6 bg-gradient-to-r from-secondary to-vividviolet rounded-full border-4 border-primary">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-hover rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="lg:hidden space-y-8">
                    {myExperience.map((exp, index) => (
                        <ExperienceCard
                            key={index}
                            exp={exp}
                            index={index}
                            isMobile={true}
                            expandedCards={expandedCards}
                            toggleExpanded={toggleExpanded}
                        />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Experience;