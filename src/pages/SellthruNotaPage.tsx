
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import MultiSelectDropdown from '../components/ui/MultiSelectDropdown';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Notification from '../components/ui/Notification';
import { useAuth } from '../hooks/useAuth';
import { getSellthruNotaData, getFilterOptions } from '../services/api';

const ITEMS_PER_PAGE = 10;

const SellthruNotaPage: React.FC = () => {
    const { user } = useAuth();
    const [detailData, setDetailData] = useState<any[]>([]);
    const [summaryData, setSummaryData] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [detailSearchTerm, setDetailSearchTerm] = useState('');
    const [summarySearchTerm, setSummarySearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const [filters, setFilters] = useState({
        tap: [] as string[], salesforce: [] as string[], kategoriOutlet: [] as string[], kategoriProduk: [] as string[], startDate: '', endDate: '',
    });
    
    const [availableOptions, setAvailableOptions] = useState<any>({});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

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
                page: currentPage, limit: ITEMS_PER_PAGE, filters, searchTerm: detailSearchTerm, sortConfig: null, user
            }) as { data: any[], total: number, fullFilteredData: any[] };

            setDetailData(result.data.map(item => ({...item, total: item.kuantiti * item.harga })));
            setTotalItems(result.total);
            // In a real app, summary might be a separate API call or calculated on the backend
            setSummaryData(result.fullFilteredData);
        } catch (error) {
            setNotification({ message: "Failed to fetch data", type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, detailSearchTerm, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = (filterName: keyof Omit<typeof filters, 'startDate' | 'endDate'>, selected: string[]) => {
        setFilters(prev => ({ ...prev, [filterName]: selected }));
        setCurrentPage(1);
    };
    
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <Card>
                <details open>
                    <summary className="cursor-pointer text-xl font-semibold text-gray-800">ST Nota Summary per Outlet</summary>
                    <div className="mt-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                           {/* Filter controls could go here */}
                           <p>Summary Table</p>
                        </div>
                        {/* Summary table would be here */}
                    </div>
                </details>
            </Card>

            <Card>
                <details>
                    <summary className="cursor-pointer text-xl font-semibold text-gray-800">Detail ST Nota</summary>
                    <div className="mt-4">
                         <div className="p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200">
                           {/* Date and Search filters */}
                        </div>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="text-center py-10">Loading...</div>
                            ) : (
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2">Tanggal</th>
                                            <th className="px-4 py-2">Nama Outlet</th>
                                            <th className="px-4 py-2">Detail Produk</th>
                                            <th className="px-4 py-2">Kuantiti</th>
                                            <th className="px-4 py-2">Harga</th>
                                            <th className="px-4 py-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">{detailData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{item.tanggal}</td>
                                            <td className="border px-4 py-2">{item.namaOutlet}</td>
                                            <td className="border px-4 py-2">{item.detailProduk}</td>
                                            <td className="border px-4 py-2">{item.kuantiti}</td>
                                            <td className="border px-4 py-2">{item.harga}</td>
                                            <td className="border px-4 py-2">{item.total}</td>
                                        </tr>
                                    ))}</tbody>
                                </table>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-between items-center">
                                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</button>
                            </div>
                        )}
                    </div>
                </details>
            </Card>
        </div>
    );
};

export default SellthruNotaPage;