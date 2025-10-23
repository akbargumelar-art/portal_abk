import React from 'react';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { MOCK_INPUT_FORMS } from '../constants';
import { PencilSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const InputFormPage: React.FC = () => {
  return (
    <Card title="Pilih Form Input">
      <p className="text-telkomsel-gray-600 mb-6">
        Berikut adalah kumpulan form yang tersedia untuk input data operasional harian.
      </p>
      <div className="space-y-4">
        {MOCK_INPUT_FORMS.map((form) => (
          <Link
            key={form.id}
            to={form.path}
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full mr-4">
                    <PencilSquareIcon className="h-6 w-6 text-telkomsel-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-telkomsel-gray-800">{form.title}</h4>
                  <p className="text-sm text-telkomsel-gray-500">{form.description}</p>
                </div>
              </div>
              <ChevronRightIcon className="h-6 w-6 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default InputFormPage;
