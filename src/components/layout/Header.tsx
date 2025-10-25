import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200">
      <h2 className="text-2xl font-semibold text-telkomsel-gray-800">{pageTitle}</h2>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full text-telkomsel-gray-500 hover:bg-telkomsel-gray-100 hover:text-telkomsel-gray-700">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-telkomsel-red ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;