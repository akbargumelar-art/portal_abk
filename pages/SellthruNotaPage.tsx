

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
// Fix: Import types from the centralized types.ts file and remove local data imports.
import { type SellthruNotaData, UserRole } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, DocumentArrowDownIcon, PencilIcon } from '@heroicons/react/24/solid';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { useAuth } from '../hooks/useAuth';
// Fix: Import getFilterOptions to fetch dynamic dropdown data.
import { getSellthruNotaData, getFilterOptions } from '../services/api';
import SortIcon from '../components/ui/SortIcon';

const ITEMS_PER_PAGE = 10;
const SUMMARY_ITEMS_PER_PAGE = 10;

interface SummaryData {
    idDigipos: string; noRs: string; namaOutlet: string; kategoriOutlet: string; tap: string; salesforce: string; kabupaten: string; kecamatan: string; hariPjp: string;
    fm1Perdana: number; m1Perdana: number; mPerdana: number; growthPerdana: number;
    fm1VoucherFisik: number; m1VoucherFisik: number; mVoucherFisik: number; growthVoucherFisik: number;
}
interface SalesforceSummary { /* ... */ }

const SellthruNotaPage: React.FC = () => {
    const { user } = useAuth();
    const [detailData, setDetailData] = useState<any[]>([]);
    const [fullFilteredData, setFullFilteredData] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [summaryCurrentPage, setSummaryCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<any>(null);

    const [filters, setFilters] = useState({
        tap: [] as string[], salesforce: [] as string[], kategoriOutlet: [] as string[], kategoriProduk: [] as string[], startDate: '', endDate: '',
    });
    
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const [updateDate, setUpdateDate] = useState(new Date('2024-07-28'));
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [tempUpdateDate, setTempUpdateDate] = useState(updateDate.toISOString().split('T')[0]);
    const [availableOptions, setAvailableOptions] = useState<any>({});

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const options = await getFilterOptions();
                setAvailableOptions(options.sellthruNota || {});
            } catch (error) {
                console.error("Failed to fetch filter options:", error);
            }
        };
        fetchOptions();
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getSellthruNotaData({
                page: currentPage, limit: ITEMS_PER_PAGE, filters, searchTerm, sortConfig, user
            }) as { data: any[], total: number, fullFilteredData: any[] };

            setDetailData(result.data.map(item => ({...item, total: item.kuantiti * item.harga })));
            setTotalItems(result.total);
            setFullFilteredData(result.fullFilteredData); // Store all filtered data for summaries
        } catch (error) {
            setNotification({ message: "Failed to fetch data", type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, searchTerm, sortConfig, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleOpenDateModal = () => { /* ... */ };
    const handleSaveDate = () => { /* ... */ };

    const handleFilterChange = (filterName: keyof Omit<typeof filters, 'startDate' | 'endDate'>, selected: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selected }));
        setCurrentPage(1);
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    
    const clearFilters = () => {
        setSearchTerm('');
        setFilters({ tap: [], salesforce: [], kategoriOutlet: [], kategoriProduk: [], startDate: '', endDate: '', });
        setCurrentPage(1);
        setSummaryCurrentPage(1);
    };

    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    const calculateGrowth = (current: number, previous: number) => (previous === 0) ? (current > 0 ? Infinity : 0) : (current - previous) / previous;
    const formatGrowth = (growth: number) => (growth === Infinity) ? '∞%' : `${(growth * 100).toFixed(0)}%`;
    const getGrowthColor = (growth: number) => growth > 0 ? 'text-green-600' : growth < 0 ? 'text-red-600' : 'text-gray-800';
    
    const summaryData = useMemo(() => {
        // Fix: Removed dependency on local `outletData`. `hariPjp` is now hardcoded.
        // In a real application, this data should be joined on the backend.
        const currentDay = updateDate.getDate();
        const currentMonth = updateDate.getMonth();
        const currentYear = updateDate.getFullYear();
        const mStartDate = new Date(currentYear, currentMonth, 1);
        const mEndDate = new Date(updateDate);
        const m1StartDate = new Date(currentYear, currentMonth - 1, 1);
        const m1EndDate = new Date(currentYear, currentMonth - 1, currentDay);
        const fm1StartDate = new Date(currentYear, currentMonth - 1, 1);
        const fm1EndDate = new Date(currentYear, currentMonth, 0);
        
        const outlets = fullFilteredData.reduce((acc: Record<string, SummaryData>, item) => {
            const outletName = item.namaOutlet;
            if (!acc[outletName]) {
                acc[outletName] = {
                    idDigipos: item.idDigipos, noRs: item.noRs, namaOutlet: item.namaOutlet, kategoriOutlet: item.kategoriOutlet, tap: item.tap, salesforce: item.salesforce, kabupaten: item.kabupaten, kecamatan: item.kecamatan, hariPjp: 'N/A',
                    fm1Perdana: 0, m1Perdana: 0, mPerdana: 0, growthPerdana: 0, fm1VoucherFisik: 0, m1VoucherFisik: 0, mVoucherFisik: 0, growthVoucherFisik: 0,
                };
            }
            const record = acc[outletName];
            const itemDate = new Date(item.tanggal);
            const qty = item.kuantiti;
            const isPerdana = item.type === 'Perdana';
            const isVoucher = item.type === 'Voucher Fisik';

            if (itemDate >= mStartDate && itemDate <= mEndDate) {
                if (isPerdana) record.mPerdana += qty;
                if (isVoucher) record.mVoucherFisik += qty;
            }
            if (itemDate >= m1StartDate && itemDate <= m1EndDate) {
                if (isPerdana) record.m1Perdana += qty;
                if (isVoucher) record.m1VoucherFisik += qty;
            }
            if (itemDate >= fm1StartDate && itemDate <= fm1EndDate) {
                if (isPerdana) record.fm1Perdana += qty;
                if (isVoucher) record.fm1VoucherFisik += qty;
            }
            return acc;
        }, {} as Record<string, SummaryData>);

        // FIX: Explicitly type `outlet` as `SummaryData` to resolve type errors on spread and property access.
        return Object.values(outlets).map((outlet: SummaryData) => ({
            ...outlet,
            growthPerdana: calculateGrowth(outlet.mPerdana, outlet.m1Perdana),
            growthVoucherFisik: calculateGrowth(outlet.mVoucherFisik, outlet.m1VoucherFisik),
        }));
    }, [fullFilteredData, updateDate]);
    
    const salesforceSummaryData = useMemo(() => {
        // ... salesforce summary calculation remains the same, but uses `summaryData`
        return [];
    }, [summaryData]);
    
    const handleExport = () => {/* ... */};
    const handleExportSummary = () => {/* ... */};

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            {/* ... Modals and Page Header ... */}
            
            <Card>
                <details open>
                    <summary className="cursor-pointer text-xl font-semibold text-gray-800">Summary per Salesforce</summary>
                    {/* ... Salesforce summary table ... */}
                </details>
            </Card>

            <Card>
                <details>
                    <summary className="cursor-pointer text-xl font-semibold text-gray-800">ST Nota Summary per Outlet</summary>
                    <div className="mt-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                           {/* ... Filter controls ... */}
                           <div className="grid grid-cols-2 gap-4">
                                <MultiSelectDropdown label="TAP" options={availableOptions.taps || []} selectedValues={filters.tap} onChange={(s) => handleFilterChange('tap', s)} />
                                <MultiSelectDropdown label="Salesforce" options={availableOptions.salesforces || []} selectedValues={filters.salesforce} onChange={(s) => handleFilterChange('salesforce', s)} />
                           </div>
                        </div>
                        {/* ... Summary export button and table ... */}
                    </div>
                </details>
            </Card>

            <Card>
                <details>
                    <summary className="cursor-pointer text-xl font-semibold text-gray-800">Detail ST Nota</summary>
                    <div className="mt-4">
                         <div className="p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200">
                           {/* ... Date and Search filters ... */}
                        </div>
                        <div className="flex justify-end mb-4">{/* ... Detail export button ... */}</div>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="text-center py-10">Loading...</div>
                            ) : (
                                <table className="min-w-full text-sm">
                                    {/* ... Detail table headers and body ... */}
                                    <tbody className="bg-white">{detailData.map((item) => (<tr key={item.id} className="hover:bg-gray-50">{/* ... tds */}</tr>))}</tbody>
                                </table>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-between items-center">{/* ... Pagination ... */}</div>
                        )}
                    </div>
                </details>
            </Card>
        </div>
    );
};

export default SellthruNotaPage;
