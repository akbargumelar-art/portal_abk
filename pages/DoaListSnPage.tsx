
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Notification from '../components/ui/Notification';
import { FunnelIcon, XCircleIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { mockListSnData as allSnData, type DoaListSn } from '../data/doa';
import { exportToCsv } from '../utils/export';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
import { getDoaListSnData } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const DoaListSnPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DoaListSn[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ startDate: '', endDate: '', lokasi: '', paket: '' });
  const [sortConfig, setSortConfig] = useState<any>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchData = useCallback(async () => {
      setLoading(true);
      try {
          const result = await getDoaListSnData({ page: 1, limit: 500, filters, searchTerm, sortConfig, user }) as { data: DoaListSn[], total: number };
          setData(result.data);
          setTotalItems(result.total);
      } catch (error) {
          setNotification({ message: 'Failed to fetch DOA SN data.', type: 'error' });
      } finally {
          setLoading(false);
      }
  }, [filters, searchTerm, sortConfig, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const filterOptions = useMemo(() => {
    const lokasi = [...new Set(allSnData.map(item => item.lokasi))].sort();
    const paket = [...new Set(allSnData.map(item => item.paket))].sort();
    return { lokasi, paket };
  }, []);

  return (
    <div className="space-y-6">
       {/* ... UI components ... */}
       <Card title="Data List SN DOA">
          {/* ... Filters ... */}
          <div className="overflow-x-auto">
             {loading ? <div className="text-center py-10">Loading...</div> : (
              <table className="min-w-full text-sm">
                {/* ... table ... */}
              </table>
             )}
          </div>
       </Card>
    </div>
  );
};

export default DoaListSnPage;
