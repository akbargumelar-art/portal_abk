import React, { useState, useRef } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Notification from '../components/ui/Notification';
import { DocumentArrowDownIcon, DocumentArrowUpIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { exportToCsv } from '../utils/export';
import { outletData } from '../data/outlets';
import { mockDoaAlokasiData, mockListSnData, mockDoaStockData } from '../data/doa';
import { mockStockOutletDetailData } from '../data/stockOutlet';
import { mockOmzetOutletData } from '../data/omzetOutlet';


interface UploadCardProps {
  title: string;
  lastUpdated: string;
  templateUrl: string;
  onFileUpload: (file: File) => void;
  onDownloadData: () => void;
  isDownloading: boolean;
}

const UploadCard: React.FC<UploadCardProps> = ({ title, lastUpdated, templateUrl, onFileUpload, onDownloadData, isDownloading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = () => {
    // In a real app, this would point to an actual file URL
    alert(`Downloading template for ${title}... (from ${templateUrl})`);
    // Example: window.location.href = templateUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
    // Reset file input to allow re-uploading the same file
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="flex flex-col">
      <div className="flex items-start mb-4">
        <div className="p-2 bg-red-100 rounded-full mr-4">
          <TableCellsIcon className="h-6 w-6 text-telkomsel-red" />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-telkomsel-gray-800">{title}</h4>
          <p className="text-sm text-telkomsel-gray-500">Last updated: {lastUpdated}</p>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200 flex flex-col space-y-2">
         <div className="flex space-x-2">
            <button
                onClick={handleDownloadTemplate}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Template
            </button>
             <button
                onClick={onDownloadData}
                disabled={isDownloading}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download Data'}
            </button>
        </div>
        <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-telkomsel-red hover:bg-telkomsel-dark-red">
          <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
          Upload File
          <input ref={fileInputRef} type="file" className="sr-only" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFileChange} />
        </label>
      </div>
    </Card>
  );
};


const DataUploadCenterPage: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; file: File | null }>({
    isOpen: false,
    title: '',
    file: null,
  });
  const [isDownloading, setIsDownloading] = useState<string | null>(null);


  const uploadSections = [
    { title: 'Data Outlet Register', lastUpdated: '2024-07-25', templateUrl: '/templates/outlet_register.csv' },
    { title: 'Data Stock Perdana', lastUpdated: '2024-07-26', templateUrl: '/templates/stock_perdana.csv' },
    { title: 'Data Stock Voucher', lastUpdated: '2024-07-26', templateUrl: '/templates/stock_voucher.csv' },
    { title: 'Data Omzet Outlet', lastUpdated: '2024-07-25', templateUrl: '/templates/omzet_outlet.csv' },
    { title: 'Data Alokasi DOA', lastUpdated: '2024-07-24', templateUrl: '/templates/doa_alokasi.csv' },
    { title: 'Data List SN DOA', lastUpdated: '2024-07-24', templateUrl: '/templates/doa_list_sn.csv' },
    { title: 'Data Stock DOA', lastUpdated: '2024-07-25', templateUrl: '/templates/doa_stock.csv' },
    { title: 'Data KPI', lastUpdated: '2024-07-01', templateUrl: '/templates/kpi.csv' },
  ];
  
  const handleFileUpload = (file: File, title: string) => {
    // Simulate checking for existing data. 50% chance of conflict for demonstration.
    const hasConflict = Math.random() > 0.5;

    if (hasConflict) {
        setModalState({ isOpen: true, title, file });
    } else {
        // No conflict, proceed with upload
        console.log(`Uploading ${file.name} for ${title} without conflict.`);
        setNotification({ message: `File "${file.name}" berhasil diunggah!`, type: 'success' });
    }
  };

  const handleConfirmReplace = () => {
    if (modalState.file) {
        console.log(`Replacing data with ${modalState.file.name} for ${modalState.title}.`);
        setNotification({ message: `Data berhasil digantikan dengan file "${modalState.file.name}"!`, type: 'success' });
    }
    closeModal();
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', file: null });
  };

  const handleDownloadData = (title: string) => {
    if (isDownloading) return;
    setIsDownloading(title);
    setNotification(null);

    // Simulate async operation for UX
    setTimeout(() => {
        try {
            let dataToExport: Record<string, any>[] = [];
            let filename = 'download';

            switch (title) {
                case 'Data Outlet Register':
                    dataToExport = outletData;
                    filename = 'outlet_register_data';
                    break;
                case 'Data Stock Perdana':
                    dataToExport = mockStockOutletDetailData.map(d => ({
                        'outlet_id': d.outlet_id, 'no_rs': d.no_rs, 'nama_outlet': d.nama_outlet, 'kelurahan': d.kelurahan, 'kecamatan': d.kecamatan, 'kabupaten': d.kabupaten, 'tap': d.tap, 'pjp': d.pjp, 'salesforce': d.salesforce, 'penjualan_perdana_olimpiade': d.penjualan_perdana_olimpiade, 'penjualan_perdana_beli': d.penjualan_perdana_beli, 'sell_out_olimpiade': d.sell_out_olimpiade, 'sell_out_beli': d.sell_out_beli, 'stok_akhir_perdana_olimpiade': d.stok_akhir_perdana_olimpiade, 'stok_akhir_perdana_beli': d.stok_akhir_perdana_beli,
                    }));
                    filename = 'stock_perdana_data';
                    break;
                case 'Data Stock Voucher':
                     dataToExport = mockStockOutletDetailData.map(d => ({
                        'outlet_id': d.outlet_id, 'no_rs': d.no_rs, 'nama_outlet': d.nama_outlet, 'kelurahan': d.kelurahan, 'kecamatan': d.kecamatan, 'kabupaten': d.kabupaten, 'tap': d.tap, 'pjp': d.pjp, 'salesforce': d.salesforce, 'penjualan_voucher_olimpiade': d.penjualan_voucher_olimpiade, 'penjualan_voucher_beli': d.penjualan_voucher_beli, 'redeem_olimpiade': d.redeem_olimpiade, 'redeem_beli': d.redeem_beli, 'stok_akhir_voucher_olimpiade': d.stok_akhir_voucher_olimpiade, 'stok_akhir_voucher_beli': d.stok_akhir_voucher_beli,
                    }));
                    filename = 'stock_voucher_data';
                    break;
                case 'Data Omzet Outlet':
                    dataToExport = mockOmzetOutletData.map(({ id, ...rest }) => rest);
                    filename = 'omzet_outlet_data';
                    break;
                case 'Data Alokasi DOA':
                    dataToExport = mockDoaAlokasiData.map(({ id, ...rest }) => rest);
                    filename = 'doa_alokasi_data';
                    break;
                case 'Data List SN DOA':
                    dataToExport = mockListSnData.map(({ id, ...rest }) => rest);
                    filename = 'doa_list_sn_data';
                    break;
                case 'Data Stock DOA':
                    dataToExport = mockDoaStockData.map(({ id, ...rest }) => rest);
                    filename = 'doa_stock_data';
                    break;
                case 'Data KPI':
                    // Mock data for demonstration
                    dataToExport = [{ kpi: 'Sales Target', value: '95%', month: 'July' }];
                    filename = 'kpi_data';
                    break;
                default:
                    throw new Error('No data source configured for this section.');
            }
            
            if (dataToExport.length === 0) {
                throw new Error("No data available to download.");
            }

            exportToCsv(dataToExport, filename);
            setNotification({ message: 'Download successful!', type: 'success' });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during download.";
            setNotification({ message: `Download failed: ${errorMessage}`, type: 'error' });
        } finally {
            setIsDownloading(null);
        }
    }, 500);
  };


  return (
    <div className="space-y-6">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmReplace}
        title="Peringatan Duplikasi Data"
        confirmText="Ya, Gantikan"
        cancelText="Tidak, Batalkan"
      >
        <p className="text-sm text-gray-600">
            Data untuk <span className="font-semibold">{modalState.title}</span> sepertinya sudah ada. Apakah Anda ingin mengganti data yang ada dengan file <span className="font-semibold">{modalState.file?.name}</span>?
        </p>
      </Modal>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Pusat Upload Data</h2>
        <p className="text-gray-600 mt-1">Silakan unduh template, isi, dan unggah file data terbaru untuk setiap tabel.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploadSections.map(section => (
          <UploadCard 
            key={section.title} 
            {...section} 
            onFileUpload={(file) => handleFileUpload(file, section.title)}
            onDownloadData={() => handleDownloadData(section.title)}
            isDownloading={isDownloading === section.title}
          />
        ))}
      </div>
    </div>
  );
};

export default DataUploadCenterPage;