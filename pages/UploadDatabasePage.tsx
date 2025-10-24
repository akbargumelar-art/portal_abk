import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import Notification from '../components/ui/Notification';
import { ArrowUpOnSquareIcon, CircleStackIcon, Cog6ToothIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const UploadDatabasePage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [targetTable, setTargetTable] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [isConfigured, setIsConfigured] = useState(false);
    const [tableOptions, setTableOptions] = useState<string[]>([]);
    const [connectionConfig, setConnectionConfig] = useState<{ host: string; dbName: string } | null>(null);

    useEffect(() => {
        try {
            const savedConfigStr = localStorage.getItem('dbConnectionConfig');
            const savedTablesStr = localStorage.getItem('dbTableList');

            if (savedConfigStr) {
                const savedConfig = JSON.parse(savedConfigStr);
                if (savedConfig.status === 'connected' && savedConfig.dbName) {
                    setIsConfigured(true);
                    setConnectionConfig({ host: savedConfig.host, dbName: savedConfig.dbName });
                    
                    if (savedTablesStr) {
                        const savedTables = JSON.parse(savedTablesStr);
                        setTableOptions(savedTables);
                        if (savedTables.length > 0) {
                            setTargetTable(savedTables[0]);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Failed to load connection config for upload page", error);
            setIsConfigured(false);
        }
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setNotification({ message: 'Silakan pilih file terlebih dahulu.', type: 'error' });
            return;
        }
        setIsUploading(true);
        setNotification(null);

        // ================= PENTING =================
        // Ganti URL ini dengan alamat API backend Anda yang sebenarnya.
        // URL ini adalah endpoint yang akan menerima dan memproses file.
        const uploadUrl = 'https://api.server-anda.com/upload-database';
        // ===========================================

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('targetTable', targetTable);

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                // Jika API Anda memerlukan otentikasi (misalnya, token), tambahkan di sini.
                // headers: { 'Authorization': 'Bearer YOUR_API_TOKEN' }
            });

            if (!response.ok) {
                // Mencoba membaca pesan error dari server jika ada.
                const errorData = await response.json().catch(() => null);
                const serverMessage = errorData?.message;
                // Pesan error default yang ramah untuk pengguna awam.
                throw new Error(serverMessage || 'Gagal terhubung ke server. Mohon coba lagi.');
            }

            const result = await response.json();

            setNotification({
                message: result.message || `File "${selectedFile.name}" berhasil diunggah!`,
                type: 'success'
            });

            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error('An error occurred during upload:', error);
            const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
            setNotification({
                message: `Upload gagal. ${errorMessage} Pastikan koneksi internet stabil. Jika masalah berlanjut, hubungi administrator.`,
                type: 'error'
            });
        } finally {
            setIsUploading(false);
        }
    };

    if (!isConfigured) {
        return (
             <Card>
                <div className="text-center py-10">
                    <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-yellow-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Koneksi Database Belum Diatur</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Fungsionalitas upload tidak dapat digunakan sebelum koneksi ke server database diatur dengan benar.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/data-upload-center/database-settings"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-telkomsel-red hover:bg-telkomsel-dark-red"
                        >
                            <Cog6ToothIcon className="h-5 w-5 mr-2" />
                            Buka Halaman Pengaturan
                        </Link>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            <Card title="Upload File Excel ke Database">
                <p className="text-gray-600 mb-2">
                    Gunakan halaman ini untuk mengunggah data baru dari file Excel (.xlsx, .xls) atau CSV (.csv).
                </p>
                 <div className="text-sm p-3 bg-blue-50 border border-blue-200 rounded-lg mb-6 text-blue-800">
                    Terhubung ke: <span className="font-semibold">{connectionConfig?.host}</span> | 
                    Database: <span className="font-semibold">{connectionConfig?.dbName}</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="table-select" className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih Tabel Tujuan
                        </label>
                        <select
                            id="table-select"
                            value={targetTable}
                            onChange={(e) => setTargetTable(e.target.value)}
                            className="w-full max-w-sm p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red"
                            disabled={tableOptions.length === 0}
                        >
                            {tableOptions.length > 0 ? (
                                tableOptions.map(table => <option key={table} value={table}>{table}</option>)
                            ) : (
                                <option value="">Tidak ada tabel tersedia</option>
                            )}
                        </select>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih File untuk Diunggah
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <CircleStackIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-telkomsel-red hover:text-telkomsel-dark-red focus-within:outline-none">
                                        <span>Pilih file</span>
                                        <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">atau seret dan lepas</p>
                                </div>
                                <p className="text-xs text-gray-500">XLSX, XLS, CSV up to 10MB</p>
                            </div>
                        </div>
                        {selectedFile && (
                             <div className="mt-4 text-sm text-gray-700">
                                <p>File terpilih: <span className="font-semibold">{selectedFile.name}</span> ({(selectedFile.size / 1024).toFixed(2)} KB)</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end">
                     <button
                        onClick={handleUpload}
                        disabled={isUploading || !selectedFile || tableOptions.length === 0}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red disabled:bg-gray-400"
                    >
                        <ArrowUpOnSquareIcon className="h-5 w-5 mr-2" />
                        {isUploading ? 'Mengunggah...' : 'Proses & Upload'}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default UploadDatabasePage;