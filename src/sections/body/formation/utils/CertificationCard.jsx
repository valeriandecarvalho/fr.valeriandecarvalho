import { useState, useRef, useEffect } from 'react';

const CertificationCard = ({ title, company, period, description, href }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const titleRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (!titleRef.current) return;
        setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }, [title]);

    return (
        <div className="relative rounded-xl p-4 md:p-6 text-text w-64 md:w-72 xl:w-80 flex-shrink-0 h-full overflow-hidden">
            <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm border border-storm rounded-xl"></div>
            <div className="relative z-10 h-full flex flex-col">
                <div className="relative">
                    <h3
                        ref={titleRef}
                        className="text-hover text-lg md:text-xl mb-2 truncate cursor-pointer"
                        onMouseEnter={() => isTruncated && setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={() => isTruncated && setShowTooltip(!showTooltip)}
                    >
                        {title}
                        {isTruncated && <span className="ml-1 text-secondary text-sm opacity-60">ⓘ</span>}
                    </h3>
                    {showTooltip && (
                        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-primary border border-storm rounded-lg shadow-xl z-50 text-sm">
                            {title}
                            <div className="absolute -top-1 left-4 w-2 h-2 bg-primary border-l border-t border-storm transform rotate-45"></div>
                        </div>
                    )}
                </div>
                <p className="italic text-xs md:text-sm mb-3 md:mb-4 opacity-80">{company} — {period}</p>
                <div className="flex-grow font-sans">
                    {description?.map?.((line, i) => (
                        <p key={i} className="text-xs md:text-sm mb-2">{line}</p>
                    ))}
                </div>
                {href && (
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t-2 border-primary">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-3 bg-secondary text-text hover:text-hover font-normal rounded-xl transition-all duration-300 hover:scale-105 w-full text-sm md:text-base"
                        >
                            Voir le certificat
                            <svg className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificationCard;