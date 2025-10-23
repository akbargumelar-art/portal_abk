import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { MENU_ITEMS } from '../../constants';
import type { MenuItem } from '../../types';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Flatten menu items to correctly find the most specific route for the page title
  const flattenedMenuItems = MENU_ITEMS.reduce((acc, item) => {
    acc.push(item);
    if (item.subItems) {
      acc.push(...item.subItems);
    }
    return acc;
  }, [] as MenuItem[]);
  
  const currentRoute = flattenedMenuItems
    .slice()
    .sort((a, b) => b.path.length - a.path.length) // Sort by path length to match specific routes first
    .find(item => location.pathname.startsWith(item.path));

  const pageTitle = currentRoute ? currentRoute.name : "Dashboard";

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-telkomsel-gray-100">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-telkomsel-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;