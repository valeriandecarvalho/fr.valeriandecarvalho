import { useState, useEffect } from 'react';
import SectionWrapper from "../SectionWrapper.jsx";
import Academic from "./utils/Academic.jsx";
import Complementary from "./utils/Complementary.jsx";

const Formation = () => {
    const [activeTab, setActiveTab] = useState('academiques');
    const [initialFilters, setInitialFilters] = useState({});
    const parseUrlParams = () => {
        const hash = window.location.hash;
        if (!hash.includes('#formations')) return { tab: null };
        const [hashPart, queryString] = hash.split('?');
        const params = new URLSearchParams(queryString || '');
        if (hashPart !== '#formations') return { tab: null };
        return {
            tab: params.get('tab'),
            search: params.get('search'),
            company: params.get('company'),
            sort: params.get('sort')
        };
    };
    const updateStateFromParams = () => {
        const { tab, ...filters } = parseUrlParams();
        if (tab === null) return;
        setActiveTab(tab === 'complementaires' ? 'complementaires' : 'academiques');
        if (tab === 'complementaires') {
            setInitialFilters({
                search: filters.search || '',
                company: filters.company || '',
                sort: filters.sort || 'relevance'
            });
        } else {
            setInitialFilters({});
        }
        const element = document.getElementById('formations');
        element?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        updateStateFromParams();
        const handleHashChange = () => updateStateFromParams();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        window.history.replaceState(
            null,
            null,
            tab === 'complementaires' ? '#formations?tab=complementaires' : '#formations?tab=academiques',
        );
    };
    const tabButtonClasses = (isActive) =>
        `w-full md:w-auto min-w-[160px] text-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
            isActive ? 'bg-primary text-hover shadow-sm' : 'text-text hover:text-hover hover:bg-storm'
        }`;

    return (
        <SectionWrapper id="formations" className="pt-18 xl:pt-20 mb-[100vh] bg-primary px-5">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium text-center mb-10">
                Mes Formations
            </h2>
            <div className="flex justify-center mb-8">
                <div className="bg-storm rounded-xl p-2 shadow-lg max-w-sm md:max-w-none">
                    <div className="flex flex-col md:flex-row gap-2">
                        <button
                            onClick={() => handleTabChange('academiques')}
                            className={tabButtonClasses(activeTab === 'academiques')}
                        >
                            Académiques
                        </button>
                        <button
                            onClick={() => handleTabChange('complementaires')}
                            className={tabButtonClasses(activeTab === 'complementaires')}
                        >
                            Complémentaires
                        </button>
                    </div>
                </div>
            </div>
            <div className="transition-all duration-300 max-w-screen-2xl mx-auto">
                {activeTab === 'academiques' && <Academic/>}
                {activeTab === 'complementaires' && <Complementary initialFilters={initialFilters} />}
            </div>
        </SectionWrapper>
    );
};

export default Formation;