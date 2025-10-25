

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Notification from '../components/ui/Notification';
import { FunnelIcon, XCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
// Fix: Import type from the centralized types.ts file and remove local data import.
import { type DoaAlokasi } from '../types';
import { exportToCsv } from '../utils/export';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
// Fix: Import API functions
import { getDoaAlokasiData, getFilterOptions } from '../services/api';
import { useAuth } from '../hooks/useAuth';


const COLORS = ['#EC2028', '#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'];

const DoaAlokasiPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', namaProduk: '' });
  const [sortConfig, setSortConfig] = useState<any>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
  const [productOptions, setProductOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
        try {
            const options = await getFilterOptions();
            setProductOptions(options.doaAlokasi.namaProduk || []);
        } catch (error) { console.error("Failed to fetch filter options:", error); }
    };
    fetchOptions();
  }, []);

  const fetchData = useCallback(async () => {
      setLoading(true);
      try {
          // We fetch all items for charts, pagination is not needed here.
          const result = await getDoaAlokasiData({ 
              page: 1, limit: 1000, 
              filters: { startDate: filters.startDate, endDate: filters.endDate, productFilter: filters.namaProduk }, 
              searchTerm: '', sortConfig, user
          }) as { data: DoaAlokasi[], total: number };
          const enrichedData = result.data.map(item => ({...item, amount: Number(item.kuantiti) * Number(item.harga)}));
          setData(enrichedData);
      } catch (error) {
          setNotification({ message: 'Failed to fetch DOA Alokasi data.', type: 'error' });
      } finally {
          setLoading(false);
      }
  }, [filters, sortConfig, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFilters(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  const handleSort = (key: any) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
      setSortConfig({ key, direction });
  };

  const amountChartData = useMemo(() => { /* ... chart data logic ... */ return []; }, [data]);
  const quantityChartData = useMemo(() => { /* ... chart data logic ... */ return []; }, [data]);
  
  return (
    <div className="space-y-6">
        {/* ... UI components ... */}
        <Card title="Data Alokasi DOA">
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

export default DoaAlokasiPage;
