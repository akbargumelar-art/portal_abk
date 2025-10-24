
import React, { useMemo, useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { ArrowTrendingUpIcon, UserGroupIcon, CurrencyDollarIcon, PhoneIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useSortableData } from '../hooks/useSortableData';
import SortIcon from '../components/ui/SortIcon';
import { exportToCsv } from '../utils/export';
import Notification from '../components/ui/Notification';
import { getDashboardData } from '../services/api';
import { useAuth } from '../hooks/useAuth';


const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getDashboardData(user);
                setDashboardData(data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setNotification({ message: 'Failed to load dashboard data.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    const { items: sortedTransactions, requestSort, sortConfig } = useSortableData(dashboardData?.recentTransactions || []);

    const handleExport = () => {
        if (isExporting) return;
        setIsExporting(true);
        setNotification(null);
        setTimeout(() => {
            try {
                if (sortedTransactions.length === 0) {
                    throw new Error("No data to export.");
                }
                exportToCsv(sortedTransactions, 'transaksi_terakhir');
                setNotification({ message: 'Export successful!', type: 'success' });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
                setNotification({ message: `Export failed: ${errorMessage}`, type: 'error' });
            } finally {
                setIsExporting(false);
            }
        }, 500);
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-telkomsel-red"></div>
            </div>
        );
    }
    
    if (!dashboardData) {
        return <Card title="Error"><p>Could not load dashboard data.</p></Card>;
    }


  return (
    <div className="space-y-6">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full">
            <ArrowTrendingUpIcon className="h-8 w-8 text-telkomsel-red" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Penjualan</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(dashboardData.stats.totalSales)}</p>
          </div>
        </Card>
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <UserGroupIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Outlet Aktif</p>
            <p className="text-2xl font-bold text-gray-800">{dashboardData.stats.activeOutlets.toLocaleString('id-ID')}</p>
          </div>
        </Card>
         <Card className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Digipos Transaksi</p>
            <p className="text-2xl font-bold text-gray-800">{dashboardData.stats.digiposTransactions.toLocaleString('id-ID')}</p>
          </div>
        </Card>
         <Card className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <PhoneIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Sell Out Perdana</p>
            <p className="text-2xl font-bold text-gray-800">{dashboardData.stats.sellOutPerdana.toLocaleString('id-ID')}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribusi Outlet per PJP">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={dashboardData.pjpChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#EC2028" name="Jumlah Outlet" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Tren Penjualan 6 Bulan Terakhir">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={dashboardData.salesTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                 <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis fontSize={12} tickLine={false} axisLine={false}/>
                 <Tooltip />
                 <Legend />
                 <Line type="monotone" dataKey="sales" name="Penjualan (unit)" stroke="#EC2028" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

       <Card 
        title="Transaksi Terakhir"
        actions={
            <button
                onClick={handleExport}
                disabled={isExporting}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:bg-gray-400"
            >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
            </button>
        }
       >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => requestSort('id')} className="flex items-center group">
                    ID <SortIcon sortConfig={sortConfig} forKey="id" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => requestSort('outlet')} className="flex items-center group">
                    Outlet <SortIcon sortConfig={sortConfig} forKey="outlet" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => requestSort('product')} className="flex items-center group">
                    Produk <SortIcon sortConfig={sortConfig} forKey="product" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => requestSort('amount')} className="flex items-center group">
                    Jumlah <SortIcon sortConfig={sortConfig} forKey="amount" />
                  </button>
                </th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   <button onClick={() => requestSort('date')} className="flex items-center group">
                     Tanggal <SortIcon sortConfig={sortConfig} forKey="date" />
                   </button>
                 </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedTransactions.map((trx, index) => (
                <tr key={trx.id} className={index % 2 === 0 ? 'bg-white' : 'bg-telkomsel-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trx.outlet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(trx.amount)}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default DashboardPage;
