import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import { DocumentPlusIcon, PencilIcon, TrashIcon, EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { exportToCsv } from '../../utils/export';
import Notification from '../../components/ui/Notification';

const existingForms = [
  { id: 'form_kunjungan_ids', name: 'Form Kunjungan Salesforce (IDS)', fields: 12, submissions: 1024 },
  { id: 'form_kunjungan_d2c', name: 'Form Kunjungan Direct Sales (D2C)', fields: 9, submissions: 512 },
  { id: 'form_pop_material', name: 'Data POP Material', fields: 5, submissions: 256 },
];

const FormBuilderPage: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleExport = () => {
    if (isExporting) return;
    setIsExporting(true);
    setNotification(null);
    setTimeout(() => {
        try {
            if (existingForms.length === 0) {
                throw new Error("No forms to export.");
            }
            const dataToExport = existingForms.map(({ id, ...rest }) => rest);
            exportToCsv(dataToExport, 'form_list');
            setNotification({ message: 'Form list exported successfully!', type: 'success' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setNotification({ message: `Export failed: ${errorMessage}`, type: 'error' });
        } finally {
            setIsExporting(false);
        }
    }, 500);
  };

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Card title="Dynamic Form Builder">
        <div className="flex justify-end mb-4 space-x-2">
           <button
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:bg-gray-400"
          >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              {isExporting ? 'Exporting...' : 'Export to Excel'}
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red">
            <DocumentPlusIcon className="h-5 w-5 mr-2" />
            Buat Form Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-telkomsel-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Form</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jumlah Field</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submissions</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {existingForms.map((form, index) => (
                <tr key={form.id} className={index % 2 === 0 ? 'bg-white' : 'bg-telkomsel-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{form.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.fields}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.submissions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <button className="text-gray-500 hover:text-gray-900" title="Preview"><EyeIcon className="h-5 w-5"/></button>
                    <button className="text-blue-600 hover:text-blue-900" title="Edit"><PencilIcon className="h-5 w-5"/></button>
                    <button className="text-red-600 hover:text-red-900" title="Delete"><TrashIcon className="h-5 w-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default FormBuilderPage;