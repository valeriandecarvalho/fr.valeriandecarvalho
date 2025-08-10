const ExperienceCard = ({ exp, index, isMobile = false, expandedCards, toggleExpanded }) => {
    const isExpanded = expandedCards[index];
    const truncateText = (text, limit = 80) => {
        return text.length <= limit ? text : text.substring(0, limit) + "...";
    };
    const shouldShowToggle = exp.contents.length > 2 ||
        (isMobile && exp.contents.some(content => content.length > 100));

    return (
        <div className="bg-storm p-4 sm:p-6 rounded-lg border border-secondary/20 hover:border-vividviolet transition-all duration-300 group relative overflow-hidden hover-animation">
            {/* Effet brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hover/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {/* Badge */}
            <div className="absolute top-3 right-3 w-7 h-7 bg-hover/20 rounded-full flex items-center justify-center text-xs font-bold text-hover border border-hover/40">
                {String(index + 1).padStart(2, '0')}
            </div>
            {/* Navbar */}
            <div className="mb-4 relative z-10 pr-10">
                <div className="flex items-center space-x-2 mb-2">
                    <div className="w-1.5 h-5 bg-gradient-to-b from-hover to-secondary rounded-full"></div>
                    <h3 className="text-lg sm:text-xl font-bold text-hover transition-colors duration-300">{exp.title}</h3>
                </div>
                <p className="text-text text-sm font-medium ml-3.5">{exp.job}</p>
                <p className="text-text/70 text-xs mt-1 ml-3.5">{exp.date}</p>
            </div>
            {/* Contenu */}
            <div className="space-y-2.5 relative z-10">
                {exp.contents.slice(0, isExpanded ? exp.contents.length : 2).map((content, contentIndex) => (
                    <div key={contentIndex} className="flex items-start space-x-2.5 opacity-90 hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1 h-1 bg-hover rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-text text-sm leading-relaxed">
                            {isMobile && !isExpanded ? truncateText(content, 100) : content}
                        </p>
                    </div>
                ))}
                {/* Toggle button */}
                {shouldShowToggle && (
                    <button
                        onClick={() => toggleExpanded(index)}
                        className="text-hover text-xs font-medium  ml-4 mt-3 flex items-center space-x-2 transition-transform hover:scale-110 cursor-pointer"
                    >
                        <span>{isExpanded ? 'Voir moins' : 'Voir plus'}</span>
                        <div className={`w-2.5 h-2.5 border-l-2 border-b-2 border-current ${isExpanded ? 'rotate-135 mt-1.5' : '-rotate-45 mb-1.5'}`}></div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExperienceCard;