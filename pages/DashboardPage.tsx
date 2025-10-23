import React, { useMemo } from 'react';
import Card from '../components/ui/Card';
import { ArrowTrendingUpIcon, UserGroupIcon, CurrencyDollarIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_DASHBOARD_SALES_TREND } from '../constants';
import { useRoleBasedData } from '../hooks/useRoleBasedData';
import { outletData } from '../data/outlets';


const DashboardPage: React.FC = () => {
    const roleFilteredData = useRoleBasedData(outletData);

    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    const pjpChartData = useMemo(() => {
        const countsByPjp = roleFilteredData.reduce((acc, outlet) => {
            const pjp = outlet.pjp || 'Unknown';
            acc[pjp] = (acc[pjp] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(countsByPjp)
            .map(([name, count]) => ({ name, count }))
            // Fix: Explicitly cast count properties to numbers to ensure correct sorting.
            .sort((a, b) => Number(b.count) - Number(a.count))
            .slice(0, 10); // Show top 10 for clarity
    }, [roleFilteredData]);

    const recentTransactions = useMemo(() => {
        return roleFilteredData.slice(0, 4).map(outlet => ({
            id: outlet.outletId,
            outlet: outlet.namaOutlet,
            product: outlet.kategori || 'N/A',
            // Simulate an amount for demonstration
            amount: Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000,
            date: new Date(outlet.createAt).toLocaleString('en-CA') // YYYY-MM-DD
        }));
    }, [roleFilteredData]);


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Scorecard Cards */}
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full">
            <ArrowTrendingUpIcon className="h-8 w-8 text-telkomsel-red" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Penjualan</p>
            <p className="text-2xl font-bold text-gray-800">Rp 1.2M</p>
          </div>
        </Card>
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <UserGroupIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Outlet Aktif</p>
            <p className="text-2xl font-bold text-gray-800">{roleFilteredData.length.toLocaleString('id-ID')}</p>
          </div>
        </Card>
         <Card className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Digipos Transaksi</p>
            <p className="text-2xl font-bold text-gray-800">4,890</p>
          </div>
        </Card>
         <Card className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <PhoneIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Sell Out Perdana</p>
            <p className="text-2xl font-bold text-gray-800">12,345</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Cards */}
        <Card title="Distribusi Outlet per PJP">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={pjpChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
              <LineChart data={MOCK_DASHBOARD_SALES_TREND} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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

       <Card title="Transaksi Terakhir">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Outlet</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Produk</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jumlah</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {recentTransactions.map((trx, index) => (
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