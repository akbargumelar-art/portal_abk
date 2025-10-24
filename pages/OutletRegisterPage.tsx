
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
import SortIcon from '../components/ui/SortIcon';
import type { OutletData } from '../types';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { getOutletRegisterData } from '../services/api';
import { outletData as allOutletData } from '../data/outlets'; // For filter options only

const ITEMS_PER_PAGE = 15;
const COLORS = ['#EC2028', '#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8', '#ff4d4d', '#4CAF50', '#2196F3', '#9C27B0'];

const OutletRegisterPage: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<OutletData[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof OutletData; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState({
        tap: [] as string[],
        salesforce: [] as string[],
        pjp: [] as string[],
        kabupaten: [] as string[],
        kecamatan: [] as string[],
    });
    const [isExporting, setIsExporting] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getOutletRegisterData({
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                filters,
                searchTerm,
                sortConfig,
                user,
            }) as { data: OutletData[], total: number };
            setData(result.data);
            setTotalItems(result.total);
        } catch (error) {
            setNotification({ message: 'Failed to fetch data.', type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, searchTerm, sortConfig, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    // Options should be derived from the full dataset, not the filtered one
    const availableOptions = useMemo(() => {
        const unique = (key: keyof OutletData) => [...new Set(allOutletData.map(o => o[key]).filter(Boolean))].sort();
        return {
            taps: unique('tap'),
            salesforces: unique('salesforce'),
            pjps: unique('pjp'),
            kabupatens: unique('kabupaten'),
            kecamatans: unique('kecamatan'),
        };
    }, []);

    const handleFilterChange = (filterName: keyof typeof filters, selectedOptions: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selectedOptions }));
        setCurrentPage(1);
    };
    
    const handleSort = (key: keyof OutletData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters({ tap: [], salesforce: [], pjp: [], kabupaten: [], kecamatan: [] });
        setCurrentPage(1);
    };

    const handleExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        setNotification(null);
        try {
            // Fetch all data for export
            const result = await getOutletRegisterData({
                page: 1,
                limit: totalItems > 0 ? totalItems : 10000, // Fetch all
                filters,
                searchTerm,
                sortConfig,
                user,
            }) as { data: OutletData[], total: number };

            if (result.data.length === 0) {
                throw new Error("No data to export for the selected filters.");
            }
            exportToCsv(result.data, 'outlet_register_data');
            setNotification({ message: 'Export successful!', type: 'success' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setNotification({ message: `Export failed: ${errorMessage}`, type: 'error' });
        } finally {
            setIsExporting(false);
        }
    };
    
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const columnsToRemove: (keyof OutletData)[] = ['cluster', 'branch', 'regional', 'area'];
    const tableHeaders = (Object.keys(allOutletData[0] || {}) as (keyof OutletData)[]).filter(
        key => !columnsToRemove.includes(key)
    );

    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <Card>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter & Pencarian</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <MultiSelectDropdown label="Salesforce" options={availableOptions.salesforces} selectedValues={filters.salesforce} onChange={(s) => handleFilterChange('salesforce', s)} />
                        <MultiSelectDropdown label="TAP" options={availableOptions.taps} selectedValues={filters.tap} onChange={(s) => handleFilterChange('tap', s)} />
                        <MultiSelectDropdown label="PJP" options={availableOptions.pjps} selectedValues={filters.pjp} onChange={(s) => handleFilterChange('pjp', s)} />
                        <MultiSelectDropdown label="Kabupaten" options={availableOptions.kabupatens} selectedValues={filters.kabupaten} onChange={(s) => handleFilterChange('kabupaten', s)} />
                        <MultiSelectDropdown label="Kecamatan" options={availableOptions.kecamatans} selectedValues={filters.kecamatan} onChange={(s) => handleFilterChange('kecamatan', s)} />
                    </div>
                    <div className="relative mt-4">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search by ID, Name, Address..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <button onClick={clearFilters} className="px-4 py-2 text-sm font-medium text-white bg-telkomsel-gray-600 rounded-lg hover:bg-telkomsel-gray-700 shadow-sm transition-colors">Clear Filter</button>
                            <button onClick={handleExport} disabled={isExporting} className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:bg-gray-400">
                                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                                {isExporting ? 'Exporting...' : 'Export to Excel'}
                            </button>
                        </div>
                        <span className="text-sm text-gray-600">Showing {data.length} of {totalItems} results.</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-telkomsel-red"></div>
                        </div>
                    ) : (
                    <table className="min-w-full text-sm">
                        <thead className="bg-telkomsel-gray-50">
                            <tr>
                                {tableHeaders.map(key => (
                                    <th key={key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                        <button onClick={() => handleSort(key)} className="flex items-center group w-full">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            <SortIcon sortConfig={sortConfig} forKey={key} />
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.length > 0 ? data.map((outlet, index) => (
                                <tr key={outlet.outletId + index} className="hover:bg-gray-50">
                                    {tableHeaders.map(key => (
                                        <td key={key} className="px-4 py-3 whitespace-nowrap text-gray-700 border-b border-gray-200">{outlet[key]}</td>
                                    ))}
                                </tr>
                            )) : (
                            <tr>
                                    <td colSpan={tableHeaders.length} className="text-center py-10 text-gray-500">No data available matching your criteria.</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-6 flex justify-between items-center">
                        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <ChevronLeftIcon className="h-5 w-5 mr-1"/> Previous
                        </button>
                        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            Next <ChevronRightIcon className="h-5 w-5 ml-1"/>
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OutletRegisterPage;
