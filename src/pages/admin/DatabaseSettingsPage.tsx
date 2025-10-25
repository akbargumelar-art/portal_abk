import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Notification from '../../components/ui/Notification';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ServerIcon } from '@heroicons/react/24/outline';

type ConnectionStatus = 'not-connected' | 'testing' | 'connected' | 'failed';

interface DbConfig {
    host: string;
    port: string;
    user: string;
    dbName: string;
}

const DatabaseSettingsPage: React.FC = () => {
    const [config, setConfig] = useState<DbConfig>({ host: '', port: '3306', user: '', dbName: '' });
    const [status, setStatus] = useState<ConnectionStatus>('not-connected');
    const [statusMessage, setStatusMessage] = useState('Belum ada koneksi yang diatur.');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const [databases, setDatabases] = useState<string[]>([]);
    const [tables, setTables] = useState<string[]>([]);

    useEffect(() => {
        // Load saved configuration on component mount
        try {
            const savedConfig = localStorage.getItem('dbConnectionConfig');
            if (savedConfig) {
                const parsedConfig = JSON.parse(savedConfig);
                setConfig(parsedConfig);
                setStatus(parsedConfig.status || 'not-connected');
                if (parsedConfig.status === 'connected') {
                    setStatusMessage(`Terhubung ke database: ${parsedConfig.dbName}`);
                    fetchDatabases(parsedConfig);
                    if(parsedConfig.dbName) {
                        fetchTables(parsedConfig, parsedConfig.dbName);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to load DB config from localStorage", error);
        }
    }, []);

    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const saveConfigToLocalStorage = (newStatus: ConnectionStatus, newDbName?: string) => {
        const configToSave = { ...config, dbName: newDbName || config.dbName, status: newStatus };
        localStorage.setItem('dbConnectionConfig', JSON.stringify(configToSave));
        
        // Also save table list if available
        if (newStatus === 'connected') {
             localStorage.setItem('dbTableList', JSON.stringify(tables));
        } else {
             localStorage.removeItem('dbTableList');
        }
    };
    
    // Simulate API call to test connection
    const handleTestAndSaveConnection = async () => {
        setStatus('testing');
        setStatusMessage('Mencoba menghubungkan ke server...');
        setNotification(null);

        // --- SIMULASI BACKEND ---
        // Di aplikasi nyata, Anda akan mengirim `config` ke backend di sini.
        // Backend akan mencoba terhubung ke MySQL dengan kredensial yang aman.
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (config.host && config.user) { // Simulasi sukses jika host & user diisi
            setStatus('connected');
            const message = `Koneksi ke host "${config.host}" berhasil!`;
            setStatusMessage(message);
            setNotification({ message, type: 'success' });
            saveConfigToLocalStorage('connected');
            fetchDatabases(config);
        } else {
            setStatus('failed');
            const message = 'Koneksi gagal. Periksa kembali detail host dan user.';
            setStatusMessage(message);
            setNotification({ message, type: 'error' });
            saveConfigToLocalStorage('failed');
            setDatabases([]);
            setTables([]);
        }
        // --- AKHIR SIMULASI BACKEND ---
    };

    // Simulate API call to get list of databases
    const fetchDatabases = async (currentConfig: DbConfig) => {
        console.log("Fetching databases from:", currentConfig.host);
        // --- SIMULASI BACKEND ---
        await new Promise(resolve => setTimeout(resolve, 500));
        setDatabases(['db_cirebon_prod', 'db_cirebon_dev', 'db_inventory']);
        // --- AKHIR SIMULASI BACKEND ---
    };

    // Simulate API call to get tables from a specific database
    const fetchTables = async (currentConfig: DbConfig, db: string) => {
        console.log(`Fetching tables for database "${db}" from:`, currentConfig.host);
        // --- SIMULASI BACKEND ---
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockTables = {
            'db_cirebon_prod': ['outlets', 'stock_perdana', 'stock_voucher', 'omzet', 'doa_alokasi', 'users'],
            'db_cirebon_dev': ['outlets_test', 'stock_test', 'users_test'],
            'db_inventory': ['products', 'warehouses', 'stock_levels']
        };
        setTables(mockTables[db as keyof typeof mockTables] || []);
        saveConfigToLocalStorage('connected', db);
        // --- AKHIR SIMULASI BACKEND ---
    };
    
    const handleDatabaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDbName = e.target.value;
        setConfig({...config, dbName: newDbName});
        if (newDbName) {
            fetchTables(config, newDbName);
        } else {
            setTables([]);
        }
    }

    const StatusIndicator: React.FC = () => {
        switch (status) {
            case 'connected': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'failed': return <XCircleIcon className="h-5 w-5 text-red-500" />;
            case 'testing': return <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
            default: return <InformationCircleIcon className="h-5 w-5 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <Card title="Pengaturan Koneksi Database Eksternal">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Halaman ini ditujukan untuk Admin Super. Pengaturan yang salah dapat mengganggu fungsionalitas upload data.
                                <span className="font-bold"> Kata sandi database tidak disimpan di sini</span> dan harus dikonfigurasi secara aman di server backend.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-100 rounded-lg border">
                    <StatusIndicator />
                    <p className="text-sm font-medium text-gray-700">Status: <span className="font-bold">{statusMessage}</span></p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Host Server</label>
                            <input type="text" name="host" value={config.host} onChange={handleConfigChange} className="mt-1 p-2 w-full border rounded-md" placeholder="e.g., 127.0.0.1 atau db.domain.com"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Port</label>
                            <input type="text" name="port" value={config.port} onChange={handleConfigChange} className="mt-1 p-2 w-full border rounded-md" placeholder="e.g., 3306"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username Database</label>
                        <input type="text" name="user" value={config.user} onChange={handleConfigChange} className="mt-1 p-2 w-full border rounded-md" placeholder="e.g., admin_upload"/>
                    </div>
                </div>
                 <div className="mt-6 pt-4 border-t flex justify-end">
                    <button onClick={handleTestAndSaveConnection} disabled={status === 'testing'} className="inline-flex items-center justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red disabled:bg-gray-400">
                        <ServerIcon className="h-5 w-5 mr-2" />
                        {status === 'testing' ? 'Mengetes...' : 'Test & Simpan Koneksi'}
                    </button>
                </div>
            </Card>

            {status === 'connected' && (
                <Card title="Pemilihan Database dan Tabel">
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="dbName" className="block text-sm font-medium text-gray-900">Pilih Database</label>
                            <select id="dbName" name="dbName" value={config.dbName} onChange={handleDatabaseChange} className="mt-1 p-2 w-full border rounded-md bg-white text-black">
                                <option value="">-- Pilih Database --</option>
                                {databases.map(db => <option key={db} value={db}>{db}</option>)}
                            </select>
                        </div>
                        {tables.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Daftar Tabel yang Tersedia</label>
                                <div className="mt-2 p-4 bg-gray-50 border rounded-md max-h-48 overflow-y-auto">
                                    <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                                        {tables.map(table => <li key={table}><code>{table}</code></li>)}
                                    </ul>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Daftar tabel ini akan muncul secara otomatis di halaman "Upload Database".</p>
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default DatabaseSettingsPage;