
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Notification from '../components/ui/Notification';
import { useAuth } from '../hooks/useAuth';
import { getOmzetData, getFilterOptions } from '../services/api';

const ITEMS_PER_PAGE = 10;

const OmzetOutletPage: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        salesforce: [] as string[], tap: [] as string[], kabupaten: [] as string[], kecamatan: [] as string[],
    });
    const [availableOptions, setAvailableOptions] = useState<any>({});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

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
            const result = await getOmzetData({ page: currentPage, limit: ITEMS_PER_PAGE, filters, user }) as { data: any[], total: number };
            setData(result.data);
            setTotalItems(result.total);
        } catch (error) {
            setNotification({ message: "Failed to fetch omzet data", type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <Card title="Detail Laporan Omzet Outlet">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <table className="min-w-full text-xs border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 border">Outlet</th>
                                    <th className="p-2 border">Salesforce</th>
                                    <th className="p-2 border">Transaksi M</th>
                                    <th className="p-2 border">Revenue M</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-center">
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td className="p-2 border">{item.nama_outlet}</td>
                                        <td className="p-2 border">{item.salesforce}</td>
                                        <td className="p-2 border">{item.transaksi_m}</td>
                                        <td className="p-2 border">{item.revenue_m}</td>
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

export default OmzetOutletPage;