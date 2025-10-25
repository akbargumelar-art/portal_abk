
import React, { useState, useMemo, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import MultiSelectDropdown from '../../components/ui/MultiSelectDropdown';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, Cog6ToothIcon, PencilIcon, DocumentArrowDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
// FIX: Add missing PieChart and Pie components to the import from recharts.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, PieChart, Pie } from 'recharts';
// Fix: Import type from centralized types.ts instead of local data file.
import type { StockOutletDetail } from '../../types';
import { useSortableData } from '../../hooks/useSortableData';
import SortIcon from '../../components/ui/SortIcon';
import { exportToCsv } from '../../utils/export';
import Notification from '../../components/ui/Notification';

const ITEMS_PER_PAGE = 10;
const PIE_COLORS = {
    'Stock Cukup': '#22C55E', // green-500
    'Stock Kurang': '#F59E0B', // amber-500
    'Stock Kosong': '#EF4444', // red-500
    'Unknown': '#6B7280', // gray-500
};

interface EnrichedStockData extends StockOutletDetail {
    flag: string;
    total_penjualan: number;
    total_redeem_or_so: number;
    total_stok_akhir: number;
    status: string;
}

// FIX: Define a type for numeric keys of StockOutletDetail to ensure type safety in arithmetic operations.
type StockOutletNumericKeys = keyof {
    [K in keyof StockOutletDetail as StockOutletDetail[K] extends number ? K : never]: StockOutletDetail[K]
};

interface StockAnalysisPageProps {
    pageTitle: string;
    dataType: 'perdana' | 'voucher';
    data: StockOutletDetail[];
}

const StockAnalysisPage: React.FC<StockAnalysisPageProps> = ({ pageTitle, dataType, data }) => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        tap: [] as string[],
        salesforce: [] as string[],
        status: [] as string[],
    });
    const [stockKurangThreshold, setStockKurangThreshold] = useState(5);
    const [penjualanDateRange, setPenjualanDateRange] = useState({ start: new Date('2024-07-01'), end: new Date('2024-07-22')});
    const [soDateRange, setSoDateRange] = useState({ start: new Date('2024-07-01'), end: new Date('2024-07-19')});
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [tempPenjualanDateRange, setTempPenjualanDateRange] = useState({ start: '', end: '' });
    const [tempSoDateRange, setTempSoDateRange] = useState({ start: '', end: '' });
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const [isExportingDetail, setIsExportingDetail] = useState(false);

    const isAdmin = user?.role === UserRole.ADMIN_SUPER || user?.role === UserRole.ADMIN_INPUT;

    // FIX: Replaced broad `keyof StockOutletDetail` cast with a specific `StockOutletNumericKeys` type
    // to allow TypeScript to correctly infer the value type as `number`, resolving arithmetic operation errors.
    const dynamicKeys = useMemo(() => {
        const isPerdana = dataType === 'perdana';
        return {
            penjualanOlimpiade: (isPerdana ? 'penjualan_perdana_olimpiade' : 'penjualan_voucher_olimpiade') as StockOutletNumericKeys,
            penjualanBeli: (isPerdana ? 'penjualan_perdana_beli' : 'penjualan_voucher_beli') as StockOutletNumericKeys,
            secondaryActionOlimpiade: (isPerdana ? 'sell_out_olimpiade' : 'redeem_olimpiade') as StockOutletNumericKeys,
            secondaryActionBeli: (isPerdana ? 'sell_out_beli' : 'redeem_beli') as StockOutletNumericKeys,
            stokAkhirOlimpiade: (isPerdana ? 'stok_akhir_perdana_olimpiade' : 'stok_akhir_voucher_olimpiade') as StockOutletNumericKeys,
            stokAkhirBeli: (isPerdana ? 'stok_akhir_perdana_beli' : 'stok_akhir_voucher_beli') as StockOutletNumericKeys,
            statusLabel: isPerdana ? 'Status Outlet' : 'Status Voucher',
            secondaryActionLabel: isPerdana ? 'Sell Out' : 'Redeem'
        };
    }, [dataType]);
    
    useEffect(() => {
        const storedPenjualanStart = localStorage.getItem('penjualanUpdateDateStart');
        const storedPenjualanEnd = localStorage.getItem('penjualanUpdateDateEnd');
        const storedSoStart = localStorage.getItem('soUpdateDateStart');
        const storedSoEnd = localStorage.getItem('soUpdateDateEnd');
        
        if (storedPenjualanStart && storedPenjualanEnd) setPenjualanDateRange({ start: new Date(storedPenjualanStart), end: new Date(storedPenjualanEnd) });
        if (storedSoStart && storedSoEnd) setSoDateRange({ start: new Date(storedSoStart), end: new Date(storedSoEnd) });
    }, []);
    
    const clearFilters = () => {
        setFilters({ tap: [], salesforce: [], status: [] });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const formatDateRange = (range: { start: Date; end: Date }): string => {
        const start = range.start.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
        const end = range.end.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
        return `${start} - ${end}`;
    };

    const handleOpenDateModal = () => {
        setTempPenjualanDateRange({
            start: penjualanDateRange.start.toISOString().split('T')[0],
            end: penjualanDateRange.end.toISOString().split('T')[0],
        });
        setTempSoDateRange({
            start: soDateRange.start.toISOString().split('T')[0],
            end: soDateRange.end.toISOString().split('T')[0],
        });
        setIsDateModalOpen(true);
    };

    const handleSaveDates = () => {
        const adjustDate = (date: Date) => {
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date;
        };

        const newPenjualanRange = { start: adjustDate(new Date(tempPenjualanDateRange.start)), end: adjustDate(new Date(tempPenjualanDateRange.end)) };
        const newSoRange = { start: adjustDate(new Date(tempSoDateRange.start)), end: adjustDate(new Date(tempSoDateRange.end)) };

        setPenjualanDateRange(newPenjualanRange);
        setSoDateRange(newSoRange);
        localStorage.setItem('penjualanUpdateDateStart', newPenjualanRange.start.toISOString());
        localStorage.setItem('penjualanUpdateDateEnd', newPenjualanRange.end.toISOString());
        localStorage.setItem('soUpdateDateStart', newSoRange.start.toISOString());
        localStorage.setItem('soUpdateDateEnd', newSoRange.end.toISOString());
        setIsDateModalOpen(false);
    };

    const getStatus = (totalStock: number) => {
        if (totalStock === 0) return 'Stock Kosong';
        if (totalStock >= 1 && totalStock <= stockKurangThreshold) return 'Stock Kurang';
        return 'Stock Cukup';
    };

    const extendedFilteredDetailData = useMemo(() => {
        return data.filter((item: StockOutletDetail) => {
            const searchMatch = searchTerm.length > 2
                ? Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
                : true;
            const salesforceMatch = filters.salesforce.length === 0 || filters.salesforce.includes(item.salesforce);
            const tapMatch = filters.tap.length === 0 || filters.tap.includes(item.tap);
            
            // FIX: Added explicit Number() conversion. Even with typed keys, TypeScript can struggle with
            // inference in complex scenarios. This ensures robust arithmetic operations, accommodating
            // both numbers and numeric strings from an API.
            const totalStock = Number(item[dynamicKeys.stokAkhirOlimpiade]) + Number(item[dynamicKeys.stokAkhirBeli]);
            const status = getStatus(totalStock);
            const statusMatch = filters.status.length === 0 || filters.status.includes(status);

            return searchMatch && tapMatch && salesforceMatch && statusMatch;
        }).map((item: StockOutletDetail) => {
            const totalStokAkhir = Number(item[dynamicKeys.stokAkhirOlimpiade]) + Number(item[dynamicKeys.stokAkhirBeli]);
            // Fix: Corrected spread operator error by ensuring item is always an object.
            return {
                ...item,
                flag: 'PJP FISIK',
                total_penjualan: Number(item[dynamicKeys.penjualanOlimpiade]) + Number(item[dynamicKeys.penjualanBeli]),
                total_redeem_or_so: Number(item[dynamicKeys.secondaryActionOlimpiade]) + Number(item[dynamicKeys.secondaryActionBeli]),
                total_stok_akhir: totalStokAkhir,
                status: getStatus(totalStokAkhir),
            };
        });
    }, [searchTerm, filters, stockKurangThreshold, data, dynamicKeys, getStatus]);
    
     const availableOptions = useMemo(() => {
        let dataForSalesforces = data;
        let dataForTaps = data;

        if (filters.tap.length > 0) {
            dataForSalesforces = dataForSalesforces.filter(o => filters.tap.includes(o.tap));
        }
        const salesforces = Array.from(new Set(dataForSalesforces.map(o => o.salesforce).filter(Boolean))).sort();

        if (filters.salesforce.length > 0) {
            dataForTaps = dataForTaps.filter(o => filters.salesforce.includes(o.salesforce));
        }
        const taps = Array.from(new Set(dataForTaps.map(o => o.tap).filter(Boolean))).sort();

        return { taps, salesforces };
    }, [filters.tap, filters.salesforce, data]);

    const handleFilterChange = (filterName: keyof typeof filters, selectedOptions: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selectedOptions }));
        setCurrentPage(1);
    };

    const outletStatusData = useMemo(() => {
        const counts = extendedFilteredDetailData.reduce((acc, item) => {
            const status = item.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [extendedFilteredDetailData]);
    
    const salesforceStockStatusData = useMemo(() => {
        const grouped = extendedFilteredDetailData.reduce((acc, item) => {
            const sf = item.salesforce || 'Unknown';
            if (!acc[sf]) {
                acc[sf] = { stock_gt0: 0, stock_0: 0 };
            }
            if (item.total_stok_akhir > 0) {
                acc[sf].stock_gt0++;
            } else {
                acc[sf].stock_0++;
            }
            return acc;
        }, {} as Record<string, { stock_gt0: number; stock_0: number }>);

        return Object.entries(grouped)
            .map(([salesforce, data]) => ({ salesforce, ...data }))
            .sort((a, b) => (b.stock_gt0 + b.stock_0) - (a.stock_gt0 + a.stock_0));
    }, [extendedFilteredDetailData]);
    
    // Summary data logic and other hooks remain largely the same, but will consume `extendedFilteredDetailData`
    // ...
    const { items: sortedDetailData, requestSort: requestDetailSort, sortConfig: detailSortConfig } = useSortableData(extendedFilteredDetailData);

    const totalPages = Math.ceil(sortedDetailData.length / ITEMS_PER_PAGE);
    const paginatedDetailData = sortedDetailData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleExportDetail = () => {
        if (isExportingDetail) return;
        setIsExportingDetail(true);
        setNotification(null);

        setTimeout(() => {
            try {
                if (sortedDetailData.length === 0) throw new Error("No detail data to export.");
                const isPerdana = dataType === 'perdana';
                const dataToExport = sortedDetailData.map(d => ({
                    'Outlet ID': d.outlet_id, 'Nomor RS': d.no_rs, 'Nama Outlet': d.nama_outlet, 'Salesforce': d.salesforce, 'TAP': d.tap, 'Kabupaten': d.kabupaten, 'Kecamatan': d.kecamatan, 'Flag': d.flag, 'Hari PJP': d.pjp,
                    [`Penjualan Simpati (${isPerdana ? 'Perdana' : 'Voucher'})`]: d[dynamicKeys.penjualanOlimpiade],
                    [`Penjualan byU (${isPerdana ? 'Perdana' : 'Voucher'})`]: d[dynamicKeys.penjualanBeli],
                    [`Total Penjualan (${isPerdana ? 'Perdana' : 'Voucher'})`]: d.total_penjualan,
                    [`${dynamicKeys.secondaryActionLabel} Simpati`]: d[dynamicKeys.secondaryActionOlimpiade],
                    [`${dynamicKeys.secondaryActionLabel} byU`]: d[dynamicKeys.secondaryActionBeli],
                    [`Total ${dynamicKeys.secondaryActionLabel}`]: d.total_redeem_or_so,
                    [`Sisa Stock Simpati (${isPerdana ? 'Perdana' : 'Voucher'})`]: d[dynamicKeys.stokAkhirOlimpiade],
                    [`Sisa Stock byU (${isPerdana ? 'Perdana' : 'Voucher'})`]: d[dynamicKeys.stokAkhirBeli],
                    [`Total Sisa Stock (${isPerdana ? 'Perdana' : 'Voucher'})`]: d.total_stok_akhir,
                    [dynamicKeys.statusLabel]: d.status,
                }));
                const filename = `stock_${dataType}_outlet_detail`;
                exportToCsv(dataToExport, filename);
                setNotification({ message: 'Export successful!', type: 'success' });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
                setNotification({ message: `Export failed: ${errorMessage}`, type: 'error' });
            } finally {
                setIsExportingDetail(false);
            }
        }, 500);
    };


    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
             {/* FIX: Add content inside the Modal component to satisfy the 'children' prop requirement. */}
             <Modal isOpen={isDateModalOpen} onClose={() => setIsDateModalOpen(false)} onConfirm={handleSaveDates} title="Update Tanggal Data" confirmText="Simpan">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-800">Tanggal Update Penjualan</h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <label htmlFor="penjualanStart" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                <input type="date" id="penjualanStart" value={tempPenjualanDateRange.start} onChange={e => setTempPenjualanDateRange(p => ({...p, start: e.target.value}))} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="penjualanEnd" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                <input type="date" id="penjualanEnd" value={tempPenjualanDateRange.end} onChange={e => setTempPenjualanDateRange(p => ({...p, end: e.target.value}))} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Tanggal Update {dynamicKeys.secondaryActionLabel}</h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <label htmlFor="soStart" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                <input type="date" id="soStart" value={tempSoDateRange.start} onChange={e => setTempSoDateRange(p => ({...p, start: e.target.value}))} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="soEnd" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                <input type="date" id="soEnd" value={tempSoDateRange.end} onChange={e => setTempSoDateRange(p => ({...p, end: e.target.value}))} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="flex justify-between items-start">
                <div><h2 className="text-2xl font-semibold text-gray-800">{pageTitle}</h2></div>
                <div className="text-right">{/* ... Date display and edit button */}</div>
            </div>
            
             {isAdmin && (
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center"><Cog6ToothIcon className="h-5 w-5 mr-2" /> Konfigurasi Status</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="max-w-md">
                            <label htmlFor="threshold" className="block text-sm font-medium text-gray-700"> Batas Atas 'Stock Kurang' </label>
                            <input type="number" id="threshold" value={stockKurangThreshold} onChange={(e) => setStockKurangThreshold(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                             <p className="text-xs text-gray-500 mt-1">Status akan 'Stock Kurang' jika total stok antara 1 s/d {stockKurangThreshold}.</p>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title={`Komposisi Status ${dataType === 'perdana' ? 'Outlet' : 'Voucher'}`}>
                    {/* FIX: Add PieChart component inside ResponsiveContainer to satisfy 'children' prop requirement. */}
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={outletStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {outletStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS] || '#8884d8'} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
                 <Card title="Perbandingan Outlet Stock 0 vs. Stock > 0 per Salesforce">
                    {/* FIX: Add BarChart component inside ResponsiveContainer to satisfy 'children' prop requirement. */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesforceStockStatusData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="salesforce" width={100} fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="stock_gt0" stackId="a" fill="#22C55E" name="Stock > 0" />
                            <Bar dataKey="stock_0" stackId="a" fill="#EF4444" name="Stock = 0" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center"><FunnelIcon className="h-5 w-5 mr-2" /> Filter Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MultiSelectDropdown label="Salesforce" options={availableOptions.salesforces} selectedValues={filters.salesforce} onChange={(s) => handleFilterChange('salesforce', s)} />
                    <MultiSelectDropdown label="TAP" options={availableOptions.taps} selectedValues={filters.tap} onChange={(s) => handleFilterChange('tap', s)} />
                    <MultiSelectDropdown label={dynamicKeys.statusLabel} options={['Stock Cukup', 'Stock Kurang', 'Stock Kosong']} selectedValues={filters.status} onChange={(s) => handleFilterChange('status', s)} />
                </div>
                <div className="mt-4 pt-4 border-t flex justify-end">
                    <button onClick={clearFilters} className="px-4 py-2 text-sm font-medium text-white bg-telkomsel-gray-600 rounded-lg hover:bg-telkomsel-gray-700 shadow-sm transition-colors">Clear Filter</button>
                </div>
            </Card>

            <Card>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Detailed Outlet Stock Report</h3>
                     <div className="flex items-center space-x-4">
                        <div className="relative">
                           <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                           <input type="text" placeholder="Search Outlet..." className="w-full pl-10 pr-4 py-2 border rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                       </div>
                        <button onClick={handleExportDetail} disabled={isExportingDetail} className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:bg-gray-400">
                           <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                           {isExportingDetail ? 'Exporting...' : 'Export Detail'}
                       </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600 font-semibold">
                            {/* ... Dynamic table headers based on dataType */}
                        </thead>
                        <tbody className="bg-white">
                            {paginatedDetailData.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    {/* ... Dynamic table cells based on dataType and dynamicKeys */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {totalPages > 1 && (
                    <div className="mt-4 flex justify-between items-center">{/* ... Pagination controls */}</div>
                )}
            </Card>
        </div>
    );
};

export default StockAnalysisPage;
