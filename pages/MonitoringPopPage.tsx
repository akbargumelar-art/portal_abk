
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import type { PopRequest } from '../types';
import SortIcon from '../components/ui/SortIcon';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { getPopRequests } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const StatusBadge: React.FC<{ status: PopRequest['status'] }> = ({ status }) => {
  const baseClasses = 'inline-block px-2 py-1 text-xs font-semibold rounded-full';
  const statusClasses = {
    'Diajukan': 'bg-blue-100 text-blue-800', 'Diproses': 'bg-yellow-100 text-yellow-800',
    'Terkirim': 'bg-purple-100 text-purple-800', 'Terpasang': 'bg-green-100 text-green-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const MonitoringPopPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<PopRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPopRequests({ page: 1, limit: 100, filters: {}, searchTerm: '', sortConfig, user }) as { data: PopRequest[] };
        setRequests(result.data);
      } catch (error) {
        setNotification({ message: 'Failed to load POP requests.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortConfig, user]);

  const requestSort = (key: keyof PopRequest) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleExport = () => { /* ... */ };

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Card title="Monitoring Pengajuan POP Material" actions={ <button onClick={handleExport}>...</button> }>
        <div className="overflow-x-auto">
          {loading ? <div className="text-center py-10">Loading...</div> : (
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              {/* ... Table headers with sort buttons ... */}
            </thead>
            <tbody className="bg-white">
              {requests.map((req, index) => (
                <tr key={req.id}>
                    {/* ... table cells ... */}
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </Card>
    </>
  );
};

export default MonitoringPopPage;
