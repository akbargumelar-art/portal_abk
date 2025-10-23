import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import { FunnelIcon, XCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon as XCircleSolid, XMarkIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';


// Mock data for DOA allocations
const mockDoaData = [
  { id: 1, tanggal: '2024-07-01', namaProduk: 'Voucher Fisik 5K', kuantiti: 100, harga: 4500 },
  { id: 2, tanggal: '2024-07-02', namaProduk: 'Perdana Super Seru', kuantiti: 50, harga: 12000 },
  { id: 3, tanggal: '2024-07-08', namaProduk: 'Voucher Fisik 10K', kuantiti: 75, harga: 9500 },
  { id: 4, tanggal: '2024-07-10', namaProduk: 'Voucher Fisik 5K', kuantiti: 120, harga: 4500 },
  { id: 5, tanggal: '2024-07-15', namaProduk: 'Perdana Unlimited', kuantiti: 30, harga: 55000 },
  { id: 6, tanggal: '2024-07-18', namaProduk: 'Voucher Fisik 10K', kuantiti: 80, harga: 9500 },
  { id: 7, tanggal: '2024-07-22', namaProduk: 'Perdana Super Seru', kuantiti: 60, harga: 12000 },
  { id: 8, tanggal: '2024-07-25', namaProduk: 'Voucher Fisik 5K', kuantiti: 150, harga: 4500 },
  { id: 9, tanggal: '2024-07-29', namaProduk: 'Perdana Unlimited', kuantiti: 25, harga: 55000 },
  { id: 10, tanggal: '2024-08-01', namaProduk: 'Voucher Fisik 10K', kuantiti: 100, harga: 9500 },
];

const COLORS = ['#EC2028', '#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'];

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

const DoaAlokasiPage: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const productOptions = useMemo(() => {
    return [...new Set(mockDoaData.map(item => item.namaProduk))].sort();
  }, []);

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  const filteredData = useMemo(() => {
    return mockDoaData.filter(item => {
      const itemDate = new Date(item.tanggal);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      if (productFilter && item.namaProduk !== productFilter) return false;

      return true;
    });
  }, [startDate, endDate, productFilter]);
  
  const amountChartData = useMemo(() => {
    const dataByProduct = filteredData.reduce((acc, item) => {
        // FIX: Ensure quantity and price are treated as numbers before multiplication.
        const amount = Number(item.kuantiti) * Number(item.harga);
        if (!acc[item.namaProduk]) {
            acc[item.namaProduk] = 0;
        }
        acc[item.namaProduk] += amount;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(dataByProduct)
        .map(([name, amount]) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount);
  }, [filteredData]);
  
  const quantityChartData = useMemo(() => {
    const dataByProduct = filteredData.reduce((acc, item) => {
        // FIX: Ensure quantity is treated as a number before addition.
        const quantity = Number(item.kuantiti);
        if (!acc[item.namaProduk]) {
            acc[item.namaProduk] = 0;
        }
        acc[item.namaProduk] += quantity;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(dataByProduct)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setProductFilter('');
  };

  const handleExport = () => {
    if (isExporting) return;
    setIsExporting(true);
    setNotification(null);

    // Simulate async operation for better UX
    setTimeout(() => {
      try {
        if (filteredData.length === 0) {
          throw new Error("No data to export for the selected filters.");
        }
        if (filteredData.length > 50000) { // Safety check for large data
          throw new Error("Data set is too large for browser export. Please apply more filters.");
        }
        
        const dataToExport = filteredData.map(item => ({
          Tanggal: item.tanggal,
          Week: getWeekNumber(new Date(item.tanggal)),
          'Nama Produk': item.namaProduk,
          Kuantiti: item.kuantiti,
          Harga: item.harga,
          Amount: item.kuantiti * item.harga
        }));
        
        exportToCsv(dataToExport, 'doa_alokasi_export');
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
        <Card title="Total Alokasi Amount per Produk">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={amountChartData} margin={{ top: 5, right: 20, left: -10, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value as number)} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} cursor={{fill: 'rgba(236, 32, 40, 0.1)'}} />
                <Bar dataKey="amount" fill="#EC2028" name="Total Amount" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Distribusi Kuantiti per Produk">
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={quantityChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {quantityChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${(value as number).toLocaleString('id-ID')} unit`} />
                        <Legend wrapperStyle={{fontSize: '12px'}}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      <Card title="Data Alokasi DOA">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Tanggal Awal</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Tanggal Akhir</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="productFilter" className="block text-sm font-medium text-gray-700">Nama Produk</label>
              <select
                id="productFilter"
                value={productFilter}
                onChange={e => setProductFilter(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              >
                <option value="">Semua Produk</option>
                {productOptions.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Week</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Produk</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Kuantiti</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Harga</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? filteredData.map((item) => {
                  const dateObj = new Date(item.tanggal);
                  const week = getWeekNumber(dateObj);
                  const amount = item.kuantiti * item.harga;

                  return (
                      <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tanggal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{week}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.namaProduk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">{item.kuantiti.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">{formatCurrency(item.harga)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">{formatCurrency(amount)}</td>
                      </tr>
                  );
              }) : (
                  <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-500">
                          Tidak ada data yang cocok dengan filter yang dipilih.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DoaAlokasiPage;