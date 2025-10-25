

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Notification from '../components/ui/Notification';
import { FunnelIcon, XCircleIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
// Fix: Import type from centralized types.ts and remove local data import
import { type DoaStock } from '../types';
import { exportToCsv } from '../utils/export';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
// Fix: Import API functions
import { getDoaStockData, getFilterOptions } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const DoaStockPage: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<DoaStock[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ gudang: '' });
    const [sortConfig, setSortConfig] = useState<any>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const [gudangOptions, setGudangOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const options = await getFilterOptions();
                setGudangOptions(options.doaStock.gudang || []);
            } catch (error) { console.error("Failed to fetch filter options:", error); }
        };
        fetchOptions();
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getDoaStockData({ page: 1, limit: 1000, filters, searchTerm, sortConfig, user }) as { data: DoaStock[] };
            setData(result.data);
        } catch (error) {
            setNotification({ message: 'Failed to fetch DOA stock data.', type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [filters, searchTerm, sortConfig, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="space-y-6">
            {/* ... UI Components ... */}
            <Card title="Data Stock DOA">
                {/* ... Filters ... */}
                <div className="overflow-x-auto">
                    {loading ? <div className="text-center py-10">Loading...</div> : (
                        <table className="min-w-full">
                            {/* ... table ... */}
                        </table>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default DoaStockPage;
