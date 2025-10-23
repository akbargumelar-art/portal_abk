import React from 'react';
import Card from '../components/ui/Card';
import { MOCK_COMPLAINTS } from '../constants';
import type { Complaint } from '../types';

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
  return (
     <div className="space-y-6">
      <Card title="Buat Komplain Baru">
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subjek</label>
                <input type="text" id="subject" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2" />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detail Komplain</label>
                <textarea id="details" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"></textarea>
            </div>
             <div className="md:col-span-2 text-right">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red focus:outline-none focus:ring-2 focus:ring-telkomsel-red focus:ring-offset-2">
                    Kirim Komplain
                </button>
            </div>
        </form>
      </Card>
      <Card title="Histori Komplain">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subjek</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Detail</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {MOCK_COMPLAINTS.map((complaint, index) => (
                <tr key={complaint.id} className={index % 2 === 0 ? 'bg-white' : 'bg-telkomsel-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={complaint.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-telkomsel-red hover:text-telkomsel-dark-red">Detail</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default KomplainPage;