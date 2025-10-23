import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import { FunnelIcon, XCircleIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon as XCircleSolid, XMarkIcon } from '@heroicons/react/24/solid';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const mockStockData = [
  { id: 1, sn: '0850000193987523', msisdn: '08139878901', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2026-05-31' },
  { id: 2, sn: '0850000193987524', msisdn: '08139878902', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Indramayu', expiredDate: '2025-08-15' },
  { id: 3, sn: '0850000193987525', msisdn: '08139878903', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Kuningan', expiredDate: '2024-09-01' },
  { id: 4, sn: '0850000193987526', msisdn: '08139878904', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-08-10' },
  { id: 5, sn: '0850000193987527', msisdn: '08139878905', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Majalengka', expiredDate: '2024-07-20' },
  { id: 6, sn: '0850000193987528', msisdn: '08139878906', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Indramayu', expiredDate: '2026-05-31' },
  { id: 7, sn: '0850000193987529', msisdn: '08139878907', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-08-15' },
  { id: 8, sn: '0850000193987530', msisdn: '08139878908', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Kuningan', expiredDate: '2026-05-31' },
  { id: 9, sn: '0850000193987531', msisdn: '08139878909', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2025-01-01' },
  { id: 10, sn: '0850000193987532', msisdn: '08139878910', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Majalengka', expiredDate: '2025-02-10' },
  { id: 11, sn: '0850000200000001', msisdn: '08123456789', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Cirebon', expiredDate: '2027-01-01' },
  { id: 12, sn: '0850000200000002', msisdn: '08123456790', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Indramayu', expiredDate: '2027-01-01' },
  { id: 13, sn: '0850000200000003', msisdn: '08123456791', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-10-10' },
  { id: 14, sn: '0850000200000004', msisdn: '08123456792', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Kuningan', expiredDate: '2024-07-01' },
  { id: 15, sn: '0850000200000005', msisdn: '08123456793', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-08-25' },
];

const COLORS = ['#EC2028', '#FF8042', '#FFBB28', '#00C49F', '#0088FE'];
const EXPIRATION_COLORS = {
    'Expired': '#718096', // gray
    'Segera Expired (< 30 hari)': '#EF4444', // red
    'Expired dalam 90 hari': '#F59E0B', // amber
    'Aman (> 90 hari)': '#22C55E', // green
};

// Inlined Notification Component
const Notification: React.FC<{
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-20 right-5 z-50 animate-fade-in-down">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg text-white ${
          isSuccess ? 'bg-green-500' : 'bg-red-600'
        }`}
      >
        {isSuccess ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleSolid className="h-6 w-6 mr-3" />
        )}
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 -mr-2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Inlined CSV Export utility
const exportToCsv = (data: Record<string, any>[], filename: string) => {
  if (!data || data.length === 0) {
    throw new Error("No data available to export.");
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


const DoaStockPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gudangFilter, setGudangFilter] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const gudangOptions = useMemo(() => {
    return [...new Set(mockStockData.map(item => item.gudang))].sort();
  }, []);

  const filteredData = useMemo(() => {
    return mockStockData.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      const searchMatch = searchTerm
        ? item.sn.toLowerCase().includes(searchLower) ||
          item.msisdn.toLowerCase().includes(searchLower) ||
          item.namaProduk.toLowerCase().includes(searchLower) ||
          item.paket.toLowerCase().includes(searchLower)
        : true;
      const gudangMatch = !gudangFilter || item.gudang === gudangFilter;
      return searchMatch && gudangMatch;
    });
  }, [searchTerm, gudangFilter]);
  
  const gudangChartData = useMemo(() => {
    const countsByGudang = filteredData.reduce((acc, item) => {
        // FIX: Ensure the count for a warehouse is initialized before incrementing.
        acc[item.gudang] = (acc[item.gudang] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(countsByGudang)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const expirationChartData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const ninetyDaysFromNow = new Date(today);
    ninetyDaysFromNow.setDate(today.getDate() + 90);

    const counts: Record<string, number> = {
        'Expired': 0,
        'Segera Expired (< 30 hari)': 0,
        'Expired dalam 90 hari': 0,
        'Aman (> 90 hari)': 0,
    };

    filteredData.forEach(item => {
        const expiryDate = new Date(item.expiredDate);
        if (expiryDate < today) {
            counts['Expired']++;
        } else if (expiryDate < thirtyDaysFromNow) {
            counts['Segera Expired (< 30 hari)']++;
        } else if (expiryDate < ninetyDaysFromNow) {
            counts['Expired dalam 90 hari']++;
        } else {
            counts['Aman (> 90 hari)']++;
        }
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const clearFilters = () => {
    setSearchTerm('');
    setGudangFilter('');
  };

  const handleExport = () => {
    if (isExporting) return;
    setIsExporting(true);
    setNotification(null);

    setTimeout(() => {
      try {
        if (filteredData.length === 0) {
          throw new Error("No data to export for the selected filters.");
        }
        if (filteredData.length > 50000) {
          throw new Error("Data set is too large for browser export. Please apply more filters.");
        }
        
        const dataToExport = filteredData.map(({ id, ...rest }) => rest);
        
        exportToCsv(dataToExport, 'doa_stock_export');
        setNotification({ message: 'Export successful!', type: 'success' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during export.";
        setNotification({ message: `Export failed: ${errorMessage}`, type: 'error' });
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribusi Stock DOA per Gudang">
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={gudangChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {gudangChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px', paddingTop: '20px'}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Status Kadaluarsa Stock">
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <BarChart data={expirationChartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" fontSize={12} allowDecimals={false} />
                        <YAxis type="category" dataKey="name" width={150} fontSize={12} interval={0} />
                        <Tooltip formatter={(value) => `${value} unit`} cursor={{fill: 'rgba(236, 32, 40, 0.1)'}}/>
                        <Legend wrapperStyle={{fontSize: '12px'}}/>
                        <Bar dataKey="value" name="Jumlah SN" radius={[0, 4, 4, 0]}>
                            {expirationChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={EXPIRATION_COLORS[entry.name as keyof typeof EXPIRATION_COLORS]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
      
      <Card title="Data Stock DOA">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  placeholder="Search by SN, MSISDN, Produk, Paket..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red"
                />
              </div>
            </div>
            <div>
              <select
                value={gudangFilter}
                onChange={e => setGudangFilter(e.target.value)}
                className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              >
                <option value="">Semua Gudang</option>
                {gudangOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
           <div className="mt-4 pt-4 border-t flex justify-between items-center">
             <span className="text-sm text-gray-600">{filteredData.length} records found.</span>
             <div className="flex items-center space-x-2">
                <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-telkomsel-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-gray-700"
                >
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Clear Filter
                </button>
                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:bg-gray-400"
                >
                    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export to Excel'}
                </button>
             </div>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SN</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MSISDN</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Produk</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Paket</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Masa Aktif</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gudang</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expired Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.msisdn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.namaProduk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.paket}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.masaAktif}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.gudang}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.expiredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DoaStockPage;