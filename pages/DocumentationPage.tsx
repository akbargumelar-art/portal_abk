
import React from 'react';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { DocumentPlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const DocumentationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Pilih Form Kunjungan">
        <p className="text-telkomsel-gray-600 mb-6">
          Silakan pilih jenis form dokumentasi yang sesuai dengan tim Anda untuk memulai pengisian data kunjungan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/dokumentasi/form-salesforce-ids" className="block p-6 bg-telkomsel-gray-50 rounded-lg border border-telkomsel-gray-200 hover:bg-red-50 hover:border-telkomsel-red transition-all duration-200">
            <div className="flex items-center mb-3">
              <UserGroupIcon className="h-8 w-8 text-telkomsel-red mr-3"/>
              <h4 className="text-xl font-semibold text-telkomsel-gray-800">Form Kunjungan Salesforce (IDS)</h4>
            </div>
            <p className="text-telkomsel-gray-500">
              Formulir untuk tim Salesforce (Indirect Sales) yang berfokus pada manajemen mitra outlet dan target penjualan.
            </p>
          </Link>
          <Link to="/dokumentasi/form-direct-sales-d2c" className="block p-6 bg-telkomsel-gray-50 rounded-lg border border-telkomsel-gray-200 hover:bg-red-50 hover:border-telkomsel-red transition-all duration-200">
            <div className="flex items-center mb-3">
              <DocumentPlusIcon className="h-8 w-8 text-telkomsel-red mr-3"/>
              <h4 className="text-xl font-semibold text-telkomsel-gray-800">Form Kunjungan Direct Sales (D2C)</h4>
            </div>
            <p className="text-telkomsel-gray-500">
              Formulir untuk tim Direct Sales (D2C) yang berfokus pada penjualan langsung ke end-user dan kerjasama event.
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default DocumentationPage;
