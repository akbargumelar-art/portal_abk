

import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
import { useAuth } from '../hooks/useAuth';
import { FunnelIcon } from '@heroicons/react/24/solid';
import Notification from '../components/ui/Notification';
import { getStockVoucherData, getFilterOptions } from '../services/api';
// Fix: Import StockOutletDetail from the centralized types file.
import { StockOutletDetail } from '../types'; 

const ITEMS_PER_PAGE = 10;

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
    const [availableOptions, setAvailableOptions] = useState<any>({});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const stockKurangThreshold = 5; // Example threshold

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const options = await getFilterOptions();
                setAvailableOptions(options.stock || {});
            } catch (error) { console.error("Failed to fetch filter options:", error); }
        };
        fetchOptions();
    }, []);

    const getStatus = useCallback((totalStock: number) => {
        if (totalStock === 0) return 'Stock Kosong';
        if (totalStock >= 1 && totalStock <= stockKurangThreshold) return 'Stock Kurang';
        return 'Stock Cukup';
    }, [stockKurangThreshold]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getStockVoucherData({ page: currentPage, limit: ITEMS_PER_PAGE, filters, searchTerm, user }) as { data: StockOutletDetail[], total: number };
            
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
    }, [currentPage, filters, searchTerm, user, getStatus]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = (filterName: keyof typeof filters, selectedOptions: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selectedOptions }));
        setCurrentPage(1);
    };
    
    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <Card>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center"><FunnelIcon className="h-5 w-5 mr-2" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <MultiSelectDropdown label="Salesforce" options={availableOptions.salesforces || []} selectedValues={filters.salesforce} onChange={(s) => handleFilterChange('salesforce', s)} />
                        <MultiSelectDropdown label="TAP" options={availableOptions.taps || []} selectedValues={filters.tap} onChange={(s) => handleFilterChange('tap', s)} />
                        <MultiSelectDropdown label="Status Outlet" options={['Stock Cukup', 'Stock Kurang', 'Stock Kosong']} selectedValues={filters.status} onChange={(s) => handleFilterChange('status', s)} />
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4 pt-4 border-t">
                    <h3 className="text-xl font-semibold text-gray-800">Detailed Outlet Stock Report (Voucher)</h3>
                </div>
                
                <div className="overflow-x-auto">
                   {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <table className="min-w-full text-xs">
                           <thead className="bg-gray-50">
                                <tr>
                                    <th>Outlet</th>
                                    <th>Salesforce</th>
                                    <th>Total Stok Akhir</th>
                                    <th>Status</th>
                                </tr>
                           </thead>
                            <tbody className="bg-white">
                                {/* Fix: Use correctly typed properties like `nama_outlet` and `salesforce` */}
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nama_outlet}</td>
                                        <td>{item.salesforce}</td>
                                        <td>{item.total_stok_akhir}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   )}
                </div>
            </Card>
        </div>
    );
};

export default StockVoucherOutletPage;
