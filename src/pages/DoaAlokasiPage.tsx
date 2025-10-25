

import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Notification from '../components/ui/Notification';
import { getDoaAlokasiData, getFilterOptions } from '../services/api';
import { useAuth } from '../hooks/useAuth';
// Fix: Import DoaAlokasi from the centralized types file.
import { DoaAlokasi } from '../types'; 

const DoaAlokasiPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', namaProduk: '' });
  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

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
          const result = await getDoaAlokasiData({ filters, user }) as { data: DoaAlokasi[] };
          const enrichedData = result.data.map(item => ({...item, amount: Number(item.kuantiti) * Number(item.harga)}));
          setData(enrichedData);
      } catch (error) {
          setNotification({ message: 'Failed to fetch DOA Alokasi data.', type: 'error' });
      } finally {
          setLoading(false);
      }
  }, [filters, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div className="space-y-6">
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <Card title="Data Alokasi DOA">
            <p className='mb-4'>Filter and data display for DOA Alokasi.</p>
            <div className="overflow-x-auto">
                {loading ? <div className="text-center py-10">Loading...</div> : (
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Tanggal</th>
                                <th>Nama Produk</th>
                                <th>Kuantiti</th>
                                <th>Harga</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.tanggal}</td>
                                    <td>{item.namaProduk}</td>
                                    <td>{item.kuantiti}</td>
                                    <td>{item.harga}</td>
                                    <td>{item.amount}</td>
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

export default DoaAlokasiPage;
