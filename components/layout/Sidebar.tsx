import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MENU_ITEMS } from '../../constants';
import { ArrowRightOnRectangleIcon, SparklesIcon, UserCircleIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, Cog6ToothIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsProfileMenuOpen(false);
        }
    };

    if (isProfileMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);
  
  useEffect(() => {
    const activeParent = MENU_ITEMS.find(item => 
        item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.path))
    );
    if (activeParent && !isCollapsed) {
        setOpenSubmenu(activeParent.path);
    } else if (isCollapsed) {
        setOpenSubmenu(null);
    }
  }, [location.pathname, isCollapsed]);

  const handleSubMenuToggle = (path: string) => {
    setOpenSubmenu(prev => (prev === path ? null : path));
  };


  if (!user) return null;

  const accessibleMenuItems = MENU_ITEMS.map(item => {
    // If item has sub-items, filter them first
    if (item.subItems) {
      const accessibleSubItems = item.subItems.filter(sub => sub.allowedRoles.includes(user.role));
      // If there are accessible sub-items AND the parent is allowed, return the parent with only those sub-items
      if (accessibleSubItems.length > 0 && item.allowedRoles.includes(user.role)) {
        return { ...item, subItems: accessibleSubItems };
      }
      return null;
    }
    // If it's a regular item, check its roles
    return item.allowedRoles.includes(user.role) ? item : null;
  }).filter(Boolean);

  const NavItem: React.FC<{ item: typeof accessibleMenuItems[number] }> = ({ item }) => {
    const isSubMenuOpen = openSubmenu === item.path && !isCollapsed;
    const hasActiveSubItem = item.subItems?.some(sub => location.pathname.startsWith(sub.path)) ?? false;

    if (item.subItems) {
      return (
        <div className="relative group">
          <button
            onClick={() => !isCollapsed && handleSubMenuToggle(item.path)}
            className={`w-full flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : 'justify-between'
            } ${
              hasActiveSubItem && !isCollapsed
                ? 'text-telkomsel-red bg-red-50'
                : 'text-telkomsel-gray-600 hover:bg-telkomsel-gray-200 hover:text-telkomsel-gray-800'
            }`}
          >
            <div className="flex items-center">
              <item.icon className={`h-6 w-6 shrink-0 ${hasActiveSubItem ? 'text-telkomsel-red' : 'text-telkomsel-gray-500 group-hover:text-telkomsel-gray-700'}`} />
              <span className={`ml-4 font-medium truncate transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{item.name}</span>
            </div>
            {!isCollapsed && <ChevronDownIcon className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`} />}
          </button>

          {isCollapsed && (
            <div className="absolute left-full top-0 ml-2 hidden group-hover:block bg-white shadow-lg rounded-md border py-1 w-52 z-50">
              <div className="px-4 py-2">
                <span className="font-semibold text-sm text-telkomsel-gray-800">{item.name}</span>
              </div>
              <ul className="border-t border-gray-200">
                {item.subItems.map(subItem => (
                  <li key={subItem.path}>
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive
                            ? 'bg-red-50 text-telkomsel-red font-semibold'
                            : 'text-telkomsel-gray-600 hover:bg-telkomsel-gray-100 hover:text-telkomsel-gray-800'
                        }`
                      }
                    >
                      <subItem.icon className="h-5 w-5 mr-3 text-telkomsel-gray-400" />
                      <span className="truncate">{subItem.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {!isCollapsed && isSubMenuOpen && (
            <ul className="pl-8 py-1 transition-all duration-300">
              {item.subItems.map(subItem => (
                <li key={subItem.path}>
                   <NavLink
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center p-2 my-1 rounded-md text-sm transition-colors duration-200 ${
                          isActive
                            ? 'bg-red-50 text-telkomsel-red font-semibold'
                            : 'text-telkomsel-gray-500 hover:bg-telkomsel-gray-200 hover:text-telkomsel-gray-700'
                        }`
                      }
                    >
                        <subItem.icon className="h-5 w-5 mr-3 text-telkomsel-gray-400" />
                        <span className="truncate">{subItem.name}</span>
                    </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    // Regular Nav Item
    return (
      <div className="relative group">
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-red-50 text-telkomsel-red'
                  : 'text-telkomsel-gray-600 hover:bg-telkomsel-gray-200 hover:text-telkomsel-gray-800'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
          >
              {({ isActive }) => (
                  <>
                      {isActive && !isCollapsed && <div className="absolute left-0 top-2 bottom-2 w-1 bg-telkomsel-red rounded-r-full"></div>}
                      <item.icon className={`h-6 w-6 shrink-0 ${isActive ? 'text-telkomsel-red' : 'text-telkomsel-gray-500 group-hover:text-telkomsel-gray-700'}`} />
                      <span className={`ml-4 font-medium truncate transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{item.name}</span>
                  </>
              )}
          </NavLink>
          {isCollapsed && (
              <div className="absolute left-full ml-3 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-50 whitespace-nowrap shadow-lg">
                  {item.name}
              </div>
          )}
      </div>
    );
  };

  return (
    <aside className={`relative bg-white h-screen flex flex-col shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button 
            onClick={onToggle}
            className="absolute top-16 -right-3.5 z-10 bg-white h-7 w-7 rounded-full border-2 border-telkomsel-gray-300 text-telkomsel-gray-600 hover:bg-red-50 hover:border-telkomsel-red hover:text-telkomsel-red flex items-center justify-center transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronDoubleRightIcon className="h-4 w-4" /> : <ChevronDoubleLeftIcon className="h-4 w-4" />}
      </button>

      <div className={`flex items-center gap-3 p-4 border-b h-16 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="bg-telkomsel-red p-2 rounded-lg">
            <SparklesIcon className="h-6 w-6 text-white"/>
        </div>
        <h1 className={`text-xl font-bold text-telkomsel-red whitespace-nowrap transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Portal Cirebon Raya</h1>
      </div>

      {/* FIX: Removed overflow-y-auto which was clipping the absolutely positioned pop-up menu on hover */}
      <nav className="flex-1 px-2 py-3">
        <ul>
          {accessibleMenuItems.map(item => (
            <li key={item.path}>
              <NavItem item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-2 border-t mt-auto relative" ref={menuRef}>
        <button
          onClick={() => setIsProfileMenuOpen(prev => !prev)}
          className={`w-full flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100 ${isCollapsed ? 'justify-center' : ''}`}
        >
          {user.avatarUrl ? (
             <img src={user.avatarUrl} alt="Profile" className="h-10 w-10 rounded-full object-cover shrink-0" />
          ) : (
            <UserCircleIcon className="h-10 w-10 text-telkomsel-gray-400 shrink-0" />
          )}
          <div className={`ml-3 flex-1 overflow-hidden transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <p className="font-semibold text-telkomsel-gray-800 text-sm truncate text-left">{user.name}</p>
            <p className="text-xs text-telkomsel-gray-500 truncate text-left">{user.role}</p>
          </div>
        </button>
        
        {isProfileMenuOpen && (
          <div className="absolute bottom-full mb-2 left-2 right-2 z-20 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
            <Link
              to="/profile-settings"
              onClick={() => setIsProfileMenuOpen(false)}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span>Settings</span>
            </Link>
            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                logout();
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;