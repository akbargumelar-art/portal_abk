
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
import { type OmzetOutletData, mockOmzetOutletData as allOmzetData } from '../data/omzetOutlet';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, DocumentArrowDownIcon, Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getOmzetData } from '../services/api';

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

    const availableOptions = useMemo(() => {
        const taps = [...new Set(allOmzetData.map(o => o.tap).filter(Boolean))].sort();
        const salesforces = [...new Set(allOmzetData.map(o => o.salesforce).filter(Boolean))].sort();
        const kabupatens = [...new Set(allOmzetData.map(o => o.kabupaten).filter(Boolean))].sort();
        const kecamatans = [...new Set(allOmzetData.map(o => o.kecamatan).filter(Boolean))].sort();
        return { salesforces, taps, kabupatens, kecamatans };
    }, []);

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
