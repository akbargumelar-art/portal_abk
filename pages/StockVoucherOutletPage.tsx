
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, Cog6ToothIcon, PencilIcon, DocumentArrowDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { type StockOutletDetail } from '../data/stockOutlet';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { getStockVoucherData } from '../services/api';
import { mockStockOutletDetailData as allStockData } from '../data/stockOutlet';


const ITEMS_PER_PAGE = 10;
const PIE_COLORS = { 'Stock Cukup': '#22C55E', 'Stock Kurang': '#F59E0B', 'Stock Kosong': '#EF4444', 'Unknown': '#6B7280' };

interface EnrichedStockData extends StockOutletDetail {
    flag: string; total_penjualan: number; total_redeem_or_so: number; total_stok_akhir: number; status: string;
}

const StockVoucherOutletPage: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<EnrichedStockData[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ tap: [] as string[], salesforce: [] as string[], status: [] as string[] });
    const [sortConfig, setSortConfig] = useState<any>(null);
    const [stockKurangThreshold, setStockKurangThreshold] = useState(5);
    const [penjualanDateRange, setPenjualanDateRange] = useState({ start: new Date('2024-07-01'), end: new Date('2024-07-22')});
    const [soDateRange, setSoDateRange] = useState({ start: new Date('2024-07-01'), end: new Date('2024-07-19')});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

    const getStatus = useCallback((totalStock: number) => {
        if (totalStock === 0) return 'Stock Kosong';
        if (totalStock >= 1 && totalStock <= stockKurangThreshold) return 'Stock Kurang';
        return 'Stock Cukup';
    }, [stockKurangThreshold]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getStockVoucherData({ page: currentPage, limit: ITEMS_PER_PAGE, filters, searchTerm, sortConfig, user }) as { data: StockOutletDetail[], total: number };
            
            const enrichedData = result.data.map(item => {
                const totalStokAkhir = Number(item.stok_akhir_voucher_olimpiade) + Number(item.stok_akhir_voucher_beli);
                return {
                    ...item,
                    flag: 'PJP FISIK',
                    total_penjualan: Number(item.penjualan_voucher_olimpiade) + Number(item.penjualan_voucher_beli),
                    total_redeem_or_so: Number(item.redeem_olimpiade) + Number(item.redeem_beli),
                    total_stok_akhir: totalStokAkhir,
                    status: getStatus(totalStokAkhir),
                };
            });

            setData(enrichedData);
            setTotalItems(result.total);
        } catch (error) {
            setNotification({ message: 'Failed to fetch stock data.', type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, searchTerm, sortConfig, user, getStatus]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const availableOptions = useMemo(() => {
        const salesforces = [...new Set(allStockData.map(o => o.salesforce).filter(Boolean))].sort();
        const taps = [...new Set(allStockData.map(o => o.tap).filter(Boolean))].sort();
        return { taps, salesforces };
    }, []);

    const handleFilterChange = (filterName: keyof typeof filters, selectedOptions: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selectedOptions }));
        setCurrentPage(1);
    };
    
    return (
         <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            {/* ... UI components ... */}
            <Card>
                {/* ... Filters ... */}
                <div className="overflow-x-auto">
                   {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <table className="min-w-full text-xs">
                           {/* ... Table Headers ... */}
                            <tbody className="bg-white">
                                {data.map(item => (
                                    <tr key={item.id}>{/* ... Table cells */}</tr>
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

export default StockVoucherOutletPage;
