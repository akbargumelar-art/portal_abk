import React from 'react';
import Card from '../components/ui/Card';
import { MOCK_POP_REQUESTS } from '../constants';
import type { PopRequest } from '../types';

const StatusBadge: React.FC<{ status: PopRequest['status'] }> = ({ status }) => {
  const baseClasses = 'inline-block px-2 py-1 text-xs font-semibold rounded-full';
  const statusClasses = {
    'Diajukan': 'bg-blue-100 text-blue-800',
    'Diproses': 'bg-yellow-100 text-yellow-800',
    'Terkirim': 'bg-purple-100 text-purple-800',
    'Terpasang': 'bg-green-100 text-green-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const MonitoringPopPage: React.FC = () => {
  return (
    <Card title="Monitoring Pengajuan POP Material">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-telkomsel-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID Request</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Outlet</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {MOCK_POP_REQUESTS.map((req, index) => (
              <tr key={req.id} className={index % 2 === 0 ? 'bg-white' : 'bg-telkomsel-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.outletName} ({req.outletId})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {req.items.map(i => `${i.item} (x${i.qty})`).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={req.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MonitoringPopPage;