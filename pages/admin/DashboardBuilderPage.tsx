
import React from 'react';
import Card from '../../components/ui/Card';
import { ChartBarIcon, TableCellsIcon, DocumentChartBarIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const DashboardBuilderPage: React.FC = () => {
  return (
    <div className="flex h-full space-x-6">
      {/* Widget Panel */}
      <div className="w-1/4">
        <Card title="Widgets">
          <div className="space-y-4">
            <div className="p-3 border rounded-lg flex items-center cursor-grab hover:bg-gray-100">
              <DocumentChartBarIcon className="h-6 w-6 mr-3 text-telkomsel-red" />
              <div>
                <p className="font-semibold">Scorecard</p>
                <p className="text-sm text-gray-500">Single metric display</p>
              </div>
            </div>
            <div className="p-3 border rounded-lg flex items-center cursor-grab hover:bg-gray-100">
              <ChartBarIcon className="h-6 w-6 mr-3 text-telkomsel-red" />
              <div>
                <p className="font-semibold">Bar Chart</p>
                <p className="text-sm text-gray-500">Categorical data</p>
              </div>
            </div>
            <div className="p-3 border rounded-lg flex items-center cursor-grab hover:bg-gray-100">
              <TableCellsIcon className="h-6 w-6 mr-3 text-telkomsel-red" />
              <div>
                <p className="font-semibold">Data Table</p>
                <p className="text-sm text-gray-500">Tabular data</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Canvas */}
      <div className="w-3/4">
        <Card title="Dashboard Canvas">
          <div className="h-[600px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-3 gap-4">
              {/* Placeholder for dropped widgets */}
              <div className="h-40 bg-white border rounded-md shadow-sm flex items-center justify-center text-gray-500">
                Scorecard Widget
              </div>
              <div className="col-span-2 h-40 bg-white border rounded-md shadow-sm flex items-center justify-center text-gray-500">
                Bar Chart Widget
              </div>
              <div className="col-span-3 h-60 bg-white border rounded-md shadow-sm flex items-center justify-center text-gray-500">
                Data Table Widget
              </div>
              <div className="h-40 border border-dashed rounded-md flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer">
                <PlusCircleIcon className="h-8 w-8" />
                <span>Add Widget</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardBuilderPage;
