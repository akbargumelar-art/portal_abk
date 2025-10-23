import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import { FunnelIcon, XCircleIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon as XCircleSolid, XMarkIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data based on the provided image for DOA Serial Numbers
const mockListSnData = [
  { id: 1, no: 1, msisdn: '08139878901', noSeri: '0850000193987523', imsi: '510101234567890', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 2, no: 2, msisdn: '08139878902', noSeri: '0850000193987524', imsi: '510101234567891', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 3, no: 3, msisdn: '08139878903', noSeri: '0850000193987525', imsi: '510101234567892', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 4, no: 4, msisdn: '08139878904', noSeri: '0850000193987526', imsi: '510101234567893', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 5, no: 5, msisdn: '08139878905', noSeri: '0850000193987527', imsi: '510101234567894', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 6, no: 6, msisdn: '08139878906', noSeri: '0850000193987528', imsi: '510101234567895', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 7, no: 7, msisdn: '08139878907', noSeri: '0850000193987529', imsi: '510101234567896', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 8, no: 8, msisdn: '08139878908', noSeri: '0850000193987530', imsi: '510101234567897', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 9, no: 9, msisdn: '08139878909', noSeri: '0850000193987531', imsi: '510101234567898', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 10, no: 10, msisdn: '08139878910', noSeri: '0850000193987532', imsi: '510101234567899', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 11, no: 11, msisdn: '08123456789', noSeri: '0850000200000001', imsi: '510102345678900', paket: 'Paket Super Cepat', tglKadaluarsa: '2027-01-01', lokasi: 'DEALER BARU', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202511-0010', kode: 'S300', deskripsiBarang: 'Perdana Super Cepat', blokAwal: '850000200000001', blokAkhir: '0850000200001000', jml: 1000, tanggalKadaluarsa2: '2027-01-01', tanggalDo: '2025-11-01' },
  { id: 12, no: 12, msisdn: '08123456790', noSeri: '0850000200000002', imsi: '510102345678901', paket: 'Paket Super Cepat', tglKadaluarsa: '2027-01-01', lokasi: 'DEALER BARU', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202511-0010', kode: 'S300', deskripsiBarang: 'Perdana Super Cepat', blokAwal: '850000200000001', blokAkhir: '0850000200001000', jml: 1000, tanggalKadaluarsa2: '2027-01-01', tanggalDo: '2025-11-01' },
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

const DoaListSnPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lokasiFilter, setLokasiFilter] = useState('');
  const [paketFilter, setPaketFilter] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const filterOptions = useMemo(() => {
    const lokasi = [...new Set(mockListSnData.map(item => item.lokasi))].sort();
    const paket = [...new Set(mockListSnData.map(item => item.paket))].sort();
    return { lokasi, paket };
  }, []);

  const filteredData = useMemo(() => {
    return mockListSnData.filter(item => {
      const itemDate = new Date(item.tanggalDo);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      const searchLower = searchTerm.toLowerCase();

      const searchMatch = searchTerm
        ? item.msisdn.toLowerCase().includes(searchLower) ||
          item.noSeri.toLowerCase().includes(searchLower) ||
          item.imsi.toLowerCase().includes(searchLower) ||
          item.lokasi.toLowerCase().includes(searchLower) ||
          item.doNum.toLowerCase().includes(searchLower)
        : true;

      const dateMatch = (!start || itemDate >= start) && (!end || itemDate <= end);
      const lokasiMatch = !lokasiFilter || item.lokasi === lokasiFilter;
      const paketMatch = !paketFilter || item.paket === paketFilter;

      return searchMatch && dateMatch && lokasiMatch && paketMatch;
    });
  }, [searchTerm, startDate, endDate, lokasiFilter, paketFilter]);
  
  const lokasiChartData = useMemo(() => {
    const countsByLokasi = filteredData.reduce((acc, item) => {
        const lokasi = item.lokasi || 'Unknown';
        // FIX: Ensure the count for a location is initialized before incrementing.
        acc[lokasi] = (acc[lokasi] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(countsByLokasi)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
  }, [filteredData]);

  const paketChartData = useMemo(() => {
    const countsByPaket = filteredData.reduce((acc, item) => {
        const paket = item.paket || 'Unknown';
        // FIX: Ensure the count for a paket is initialized before incrementing.
        acc[paket] = (acc[paket] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(countsByPaket)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const clearFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setLokasiFilter('');
    setPaketFilter('');
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
        
        // Remove the internal 'id' field before exporting
        const dataToExport = filteredData.map(({ id, ...rest }) => rest);
        
        exportToCsv(dataToExport, 'doa_list_sn_export');
        setNotification({ message: 'Export successful!', type: 'success' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during export.";
        setNotification({ message: `Export failed: ${errorMessage}`, type: 'error' });
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };
  
  const tableHeaders = [
    'No', 'MSISDN', 'No. Seri', 'IMSI', 'Paket', 'Tgl Kadaluarsa', 'Lokasi',
    'Kategori Lokasi', 'DO#', 'Kode', 'Deskripsi Barang', 'Blok Awal',
    'Blok Akhir', 'Jml', 'Tanggal Kadaluarsa', 'Tanggal DO'
  ];

  return (
    <div className="space-y-6">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Jumlah Serial Number per Lokasi">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={lokasiChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip cursor={{fill: 'rgba(236, 32, 40, 0.1)'}} />
                <Bar dataKey="count" fill="#EC2028" name="Jumlah SN" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Distribusi Serial Number per Paket">
          <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                  <PieChart>
                      <Pie
                          data={paketChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                      >
                          {paketChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${(value as number).toLocaleString('id-ID')} SN`} />
                      <Legend wrapperStyle={{fontSize: '12px'}}/>
                  </PieChart>
              </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Data List SN DOA">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-3">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                      type="text"
                      id="search"
                      placeholder="Search by MSISDN, No. Seri, IMSI, Location, DO#..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red"
                  />
              </div>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Tanggal DO Awal</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Tanggal DO Akhir</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="paketFilter" className="block text-sm font-medium text-gray-700">Paket</label>
              <select
                id="paketFilter"
                value={paketFilter}
                onChange={e => setPaketFilter(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              >
                <option value="">Semua Paket</option>
                {filterOptions.paket.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="lokasiFilter" className="block text-sm font-medium text-gray-700">Lokasi</label>
              <select
                id="lokasiFilter"
                value={lokasiFilter}
                onChange={e => setLokasiFilter(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
              >
                <option value="">Semua Lokasi</option>
                {filterOptions.lokasi.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
          <table className="min-w-full text-sm">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                {tableHeaders.map(header => (
                  <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.no}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.msisdn}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.noSeri}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.imsi}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.paket}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.tglKadaluarsa}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.lokasi}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.kategoriLokasi}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.doNum}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.kode}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.deskripsiBarang}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.blokAwal}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.blokAkhir}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.jml}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.tanggalKadaluarsa2}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.tanggalDo}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={tableHeaders.length} className="text-center py-10 text-gray-500">
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

export default DoaListSnPage;