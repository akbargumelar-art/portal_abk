
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import type { Complaint } from '../types';
import SortIcon from '../components/ui/SortIcon';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { getComplaints } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const StatusBadge: React.FC<{ status: Complaint['status'] }> = ({ status }) => {
  const baseClasses = 'inline-block px-2 py-1 text-xs font-semibold rounded-full';
  const statusClasses = {
    Open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-green-100 text-green-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const KomplainPage: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
  
   useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getComplaints({ page: 1, limit: 100, filters: {}, searchTerm: '', sortConfig, user }) as { data: Complaint[] };
                setComplaints(result.data);
            } catch (error) {
                setNotification({ message: 'Failed to load complaints.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sortConfig, user]);

  const requestSort = (key: keyof Complaint) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleExport = () => { /* ... */ };

  return (
     <div className="space-y-6">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Card title="Buat Komplain Baru">
        {/* FIX: Add content to satisfy the 'children' prop requirement for the Card component. */}
        <div className="p-4 text-center text-gray-500">
            Fitur untuk membuat komplain baru akan ditambahkan di sini.
        </div>
      </Card>
      <Card 
        title="Histori Komplain"
        actions={ <button onClick={handleExport}>...</button> }
      >
        <div className="overflow-x-auto">
          {loading ? <div className="text-center py-10">Loading...</div> : (
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   <button onClick={() => requestSort('date')} className="flex items-center group">Tanggal <SortIcon sortConfig={sortConfig} forKey="date" /></button>
                </th>
                {/* ... other headers ... */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {complaints.map((complaint, index) => (
                <tr key={complaint.id}>
                    {/* ... table cells ... */}
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

export default KomplainPage;