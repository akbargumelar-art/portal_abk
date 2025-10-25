
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import type { PopRequest } from '../types';
import Notification from '../components/ui/Notification';
import { getPopRequests } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const MonitoringPopPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<PopRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPopRequests({ user }) as { data: PopRequest[] };
        setRequests(result.data);
      } catch (error) {
        setNotification({ message: 'Failed to load POP requests.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Card title="Monitoring Pengajuan POP Material">
        <div className="overflow-x-auto">
          {loading ? <div className="text-center py-10">Loading...</div> : (
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th className="px-6 py-3">Outlet</th>
                <th className="px-6 py-3">Requester</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {requests.map((req) => (
                <tr key={req.id}>
                    <td className="px-6 py-4">{req.outletName}</td>
                    <td className="px-6 py-4">{req.requester}</td>
                    <td className="px-6 py-4">{req.status}</td>
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