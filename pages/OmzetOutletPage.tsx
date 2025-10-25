

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
// Fix: Import type from the centralized types.ts and remove local data import
import { type OmzetOutletData, UserRole } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, DocumentArrowDownIcon, Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { useAuth } from '../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// Fix: Import API functions
import { getOmzetData, getFilterOptions } from '../services/api';

const ITEMS_PER_PAGE = 10;

const OmzetOutletPage: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [fullFilteredData, setFullFilteredData] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<any>(null);
    const [filters, setFilters] = useState({
        salesforce: [] as string[], tap: [] as string[], kabupaten: [] as string[], kecamatan: [] as string[],
    });
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const [availableOptions, setAvailableOptions] = useState<any>({});

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const options = await getFilterOptions();
                setAvailableOptions(options.omzet || {});
            } catch (error) { console.error("Failed to fetch filter options:", error); }
        };
        fetchOptions();
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getOmzetData({ page: currentPage, limit: ITEMS_PER_PAGE, filters, searchTerm, sortConfig, user }) as { data: any[], total: number, fullFilteredData: any[] };
            
            const enriched = result.data.map((item: OmzetOutletData) => ({
                ...item,
                trx_growth: calculateGrowthValue(item.transaksi_m, item.transaksi_m1),
                rev_growth: calculateGrowthValue(item.revenue_m, item.revenue_m1)
            }));
            
            setData(enriched);
            setTotalItems(result.total);
            setFullFilteredData(result.fullFilteredData);
        } catch (error) {
            setNotification({ message: "Failed to fetch omzet data", type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, searchTerm, sortConfig, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const calculateGrowthValue = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? Infinity : 0;
        return (current - previous) / previous;
    };

    const handleFilterChange = (filterName: keyof typeof filters, selected: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selected }));
        setCurrentPage(1);
    };

    const handleSort = (key: any) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            {/* ... Other UI components ... */}
            <Card title="Detail Laporan Omzet Outlet">
                <div className="p-4 bg-gray-50 rounded-lg border mb-4">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <MultiSelectDropdown label="Salesforce" options={availableOptions.salesforces || []} selectedValues={filters.salesforce} onChange={(s) => handleFilterChange('salesforce', s)} />
                        <MultiSelectDropdown label="TAP" options={availableOptions.taps || []} selectedValues={filters.tap} onChange={(s) => handleFilterChange('tap', s)} />
                        <MultiSelectDropdown label="Kabupaten" options={availableOptions.kabupatens || []} selectedValues={filters.kabupaten} onChange={(s) => handleFilterChange('kabupaten', s)} />
                        <MultiSelectDropdown label="Kecamatan" options={availableOptions.kecamatans || []} selectedValues={filters.kecamatan} onChange={(s) => handleFilterChange('kecamatan', s)} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <table className="min-w-full text-xs border-collapse">
                            {/* ... table header ... */}
                            <tbody className="bg-white text-center">
                                {data.map(item => (
                                    <tr key={item.id}>
                                        {/* ... table cells ... */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                 {/* ... Pagination ... */}
            </Card>
        </div>
    );
};

export default OmzetOutletPage;
