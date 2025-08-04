import { useState, useEffect, useMemo } from 'react';

export default function ComplementaryFilter(certifications) {
    const [filters, setFilters] = useState({
        search: '',
        company: '',
        sort: 'relevance'
    });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
        setFilters({
            search: params.get('search') || '',
            company: params.get('company') || '',
            sort: params.get('sort') || 'relevance'
        });
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        const params = new URLSearchParams();
        params.set('tab', 'complementaires');
        if (filters.search) params.set('search', filters.search);
        if (filters.company) params.set('company', filters.company);
        if (filters.sort !== 'relevance') params.set('sort', filters.sort);
        const newHash = `#formations?${params.toString()}`;
        if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
        }
    }, [filters, isInitialized]);

    // Filtrage et tri
    const { filteredCertifications, companies } = useMemo(() => {
        if (!certifications?.length) return { filteredCertifications: [], companies: [] };
        let result = [...certifications];
        const { search, company, sort } = filters;
        const query = search.toLowerCase().trim();
        if (query) {
            result = result.filter(cert =>
                cert.title?.toLowerCase().includes(query) ||
                cert.company?.toLowerCase().includes(query) ||
                cert.period?.toLowerCase().includes(query) ||
                cert.description?.some?.(line => line.toLowerCase().includes(query))
            );
        }
        if (company) {
            result = result.filter(cert => cert.company === company);
        }
        if (sort === 'recent') result.sort((a, b) => b.id - a.id);
        else if (sort === 'oldest') result.sort((a, b) => a.id - b.id);
        else result.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
        const companies = [...new Set(certifications.map(c => c.company))].sort();
        return { filteredCertifications: result, companies };
    }, [certifications, filters]);

    return {
        searchQuery: filters.search,
        companyFilter: filters.company,
        sortOrder: filters.sort,
        isInitialized,
        companies,
        filteredCertifications,
        setSearchQuery: (search) => setFilters(prev => ({ ...prev, search })),
        setCompanyFilter: (company) => setFilters(prev => ({ ...prev, company })),
        setSortOrder: (sort) => setFilters(prev => ({ ...prev, sort })),
        resetFilters: () => setFilters({ search: '', company: '', sort: 'relevance' })
    };
}