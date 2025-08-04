import { useState, useRef, useEffect } from 'react';
import CertificationCard from './CertificationCard.jsx';
import NavigationButton from './NavigationButton.jsx';
import ComplementaryFilter from './ComplementaryFilter.js';
import { myCertification } from "../../../../configs/GetCertification.js";

const Complementary = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [scrollState, setScrollState] = useState({ left: false, right: true });
    const carouselRef = useRef(null);
    const filterRef = useRef(null);
    const {
        searchQuery, companyFilter, sortOrder, isInitialized,
        setSearchQuery, setCompanyFilter, setSortOrder,
        companies, filteredCertifications, resetFilters
    } = ComplementaryFilter(myCertification);
    const checkScrollLimits = () => {
        const container = carouselRef.current;
        if (!container) return;
        const scrollLeft = container.scrollLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        setScrollState({
            left: scrollLeft > 5,
            right: scrollLeft < maxScrollLeft - 5
        });
    };
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ left: 0 });
            setScrollState({ left: false, right: true });
        }
    }, [filteredCertifications]);
    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;
        const checkAfterDelay = () => setTimeout(checkScrollLimits, 100);
        const handleResize = () => {
            container.scrollTo({ left: 0 });
            checkAfterDelay();
        };
        window.addEventListener('resize', handleResize);
        container.addEventListener('scroll', checkScrollLimits);
        checkAfterDelay(); // Vérification initiale
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('scroll', checkScrollLimits);
        };
    }, [filteredCertifications]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current?.contains(e.target)) return;
            setIsFilterOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const scrollCarousel = (direction) => {
        const container = carouselRef.current;
        if (!container) return;
        const card = container.querySelector('.cert-card');
        if (!card) return;
        const scrollAmount = card.offsetWidth + 16; // 16px pour le gap
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };
    const handleResetFilters = () => {
        resetFilters();
        setIsFilterOpen(false);
    };
    if (!isInitialized) return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        </div>
    );
    const hasActiveFilters = companyFilter || sortOrder !== 'relevance';
    const activeFilterCount = (companyFilter ? 1 : 0) + (sortOrder !== 'relevance' ? 1 : 0);

    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-4 mb-6 ">
                <input
                    type="text"
                    placeholder="Rechercher par titre, entreprise ou compétence..."
                    className="flex-1 p-3 rounded-lg bg-secondary/70 border border-storm text-hover placeholder-text focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/70 border border-storm text-hover hover:bg-secondary transition-all w-full lg:w-auto ${hasActiveFilters ? 'ring-2 ring-secondary' : ''}`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                        </svg>
                        Filtres
                        {hasActiveFilters && <span className="bg-secondary text-hover text-xs px-2 py-1 rounded-full">{activeFilterCount}</span>}
                        <svg className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-full left-0 lg:right-0 lg:left-auto w-full lg:w-80 mt-2 p-4 bg-secondary/95 border border-storm rounded-lg shadow-xl z-50 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Entreprise</label>
                                <select
                                    value={companyFilter}
                                    onChange={(e) => setCompanyFilter(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-blackolive border border-storm text-hover focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer"
                                >
                                    <option value="">Toutes les entreprises</option>
                                    {companies.map((company) => (
                                        <option key={company} value={company}>{company}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Ordre de tri</label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-blackolive border border-storm text-hover focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer"
                                >
                                    <option value="relevance">Par pertinence</option>
                                    <option value="recent">Plus récent en premier</option>
                                    <option value="oldest">Plus ancien en premier</option>
                                </select>
                            </div>

                            <button
                                onClick={handleResetFilters}
                                className="w-full px-4 py-2 bg-blackolive text-hover rounded-lg transition-all cursor-pointer"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NavigationButton
                    direction="left"
                    onClick={() => scrollCarousel('left')}
                    disabled={!scrollState.left || !filteredCertifications.length}
                    className="hidden sm:flex"
                />

                <div
                    ref={carouselRef}
                    className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
                >
                    <div className="flex gap-4 py-2 px-1">
                        {filteredCertifications.length > 0 ? (
                            filteredCertifications.map((cert) => (
                                <div key={cert.id} className="flex-shrink-0 snap-start cert-card">
                                    <CertificationCard {...cert} />
                                </div>
                            ))
                        ) : (
                            <div className="text-hover italic py-8 text-center w-full">
                                {searchQuery || companyFilter
                                    ? `Aucune certification trouvée${companyFilter ? ` pour ${companyFilter}` : ''}${searchQuery ? ` avec "${searchQuery}"` : ''}.`
                                    : 'Aucune certification disponible.'}
                            </div>
                        )}
                    </div>
                </div>

                <NavigationButton
                    direction="right"
                    onClick={() => scrollCarousel('right')}
                    disabled={!scrollState.right || !filteredCertifications.length}
                    className="hidden sm:flex"
                />
            </div>

            <div className="sm:hidden flex justify-center gap-8 mt-4">
                <NavigationButton
                    direction="left"
                    onClick={() => scrollCarousel('left')}
                    disabled={!scrollState.left || !filteredCertifications.length}
                />
                <NavigationButton
                    direction="right"
                    onClick={() => scrollCarousel('right')}
                    disabled={!scrollState.right || !filteredCertifications.length}
                />
            </div>
        </div>
    );
};

export default Complementary;