import React, { useState, useMemo, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import { outletData } from '../data/outlets';
import { useRoleBasedData } from '../hooks/useRoleBasedData';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ITEMS_PER_PAGE = 15;
const COLORS = ['#EC2028', '#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8', '#ff4d4d', '#4CAF50', '#2196F3', '#9C27B0'];

// Custom Multi-Select Dropdown Component
const MultiSelectDropdown: React.FC<{
    options: string[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    label: string;
    disabled?: boolean;
}> = ({ options, selectedValues, onChange, label, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

    const isAllSelected = options.length > 0 && selectedValues.length === options.length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (selectAllCheckboxRef.current) {
            const isIndeterminate = selectedValues.length > 0 && !isAllSelected;
            selectAllCheckboxRef.current.indeterminate = isIndeterminate;
        }
    }, [selectedValues, isAllSelected]);

    const handleSelect = (option: string) => {
        if (selectedValues.includes(option)) {
            onChange(selectedValues.filter(item => item !== option));
        } else {
            onChange([...selectedValues, option]);
        }
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            onChange([]);
        } else {
            onChange(options);
        }
    };
    
    const displayLabel = selectedValues.length === 0 
        ? `All ${label}s`
        : selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues.length} ${label}s Selected`;

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red text-gray-900 text-left flex justify-between items-center disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                <span className="truncate">{disabled ? selectedValues[0] || `All ${label}s` : displayLabel}</span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && !disabled && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    <ul className="py-1">
                        <li className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center border-b" onClick={handleSelectAll}>
                           <input
                                type="checkbox"
                                ref={selectAllCheckboxRef}
                                readOnly
                                checked={isAllSelected}
                                className="h-4 w-4 rounded border-gray-300 text-telkomsel-red focus:ring-telkomsel-red cursor-pointer"
                            />
                            <span className="ml-3 select-none cursor-pointer font-semibold">Select All</span>
                        </li>
                        {options.map(option => (
                            <li key={option} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => handleSelect(option)}>
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={selectedValues.includes(option)}
                                    className="h-4 w-4 rounded border-gray-300 text-telkomsel-red focus:ring-telkomsel-red cursor-pointer"
                                />
                                <span className="ml-3 select-none cursor-pointer">{option}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


const OutletRegisterPage: React.FC = () => {
    const { user } = useAuth();
    const roleFilteredData = useRoleBasedData(outletData);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filters, setFilters] = useState({
        tap: [] as string[],
        salesforce: [] as string[],
        pjp: [] as string[],
        kabupaten: [] as string[],
        kecamatan: [] as string[],
    });

    const availableOptions = useMemo(() => {
        let currentData = roleFilteredData;
        
        const taps = Array.from(new Set(currentData.map(o => o.tap).filter(Boolean))).sort();

        if (filters.tap.length > 0) {
            currentData = currentData.filter(o => filters.tap.includes(o.tap));
        }
        const salesforces = Array.from(new Set(currentData.map(o => o.salesforce).filter(Boolean))).sort();

        if (filters.salesforce.length > 0) {
            currentData = currentData.filter(o => filters.salesforce.includes(o.salesforce));
        }
        const pjps = Array.from(new Set(currentData.map(o => o.pjp).filter(Boolean))).sort();

        if (filters.pjp.length > 0) {
            currentData = currentData.filter(o => filters.pjp.includes(o.pjp));
        }
        const kabupatens = Array.from(new Set(currentData.map(o => o.kabupaten).filter(Boolean))).sort();

        if (filters.kabupaten.length > 0) {
            currentData = currentData.filter(o => filters.kabupaten.includes(o.kabupaten));
        }
        const kecamatans = Array.from(new Set(currentData.map(o => o.kecamatan).filter(Boolean))).sort();

        return { taps, salesforces, pjps, kabupatens, kecamatans };
    }, [roleFilteredData, filters.tap, filters.salesforce, filters.pjp, filters.kabupaten]);


    const handleFilterChange = (filterName: keyof typeof filters, selectedOptions: string[]) => {
        const newFilters = { ...filters, [filterName]: selectedOptions };

        if (filterName === 'tap') {
            newFilters.salesforce = [];
            newFilters.pjp = [];
            newFilters.kabupaten = [];
            newFilters.kecamatan = [];
        } else if (filterName === 'salesforce') {
            newFilters.pjp = [];
            newFilters.kabupaten = [];
            newFilters.kecamatan = [];
        } else if (filterName === 'pjp') {
            newFilters.kabupaten = [];
            newFilters.kecamatan = [];
        } else if (filterName === 'kabupaten') {
            newFilters.kecamatan = [];
        }
        
        setFilters(newFilters);
        setCurrentPage(1);
    };
    
    const resetFilters = () => {
        setSearchTerm('');
        setFilters({ tap: [], salesforce: [], pjp: [], kabupaten: [], kecamatan: [] });
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        return roleFilteredData.filter(outlet => {
            const searchMatch = searchTerm.length > 2 
                ? outlet.outletId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  outlet.namaOutlet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  outlet.kelurahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  outlet.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  outlet.kabupaten.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            const tapMatch = filters.tap.length === 0 ? true : filters.tap.includes(outlet.tap);
            const salesforceMatch = filters.salesforce.length === 0 ? true : filters.salesforce.includes(outlet.salesforce);
            const pjpMatch = filters.pjp.length === 0 ? true : filters.pjp.includes(outlet.pjp);
            const kabupatenMatch = filters.kabupaten.length === 0 ? true : filters.kabupaten.includes(outlet.kabupaten);
            const kecamatanMatch = filters.kecamatan.length === 0 ? true : filters.kecamatan.includes(outlet.kecamatan);
            
            return searchMatch && tapMatch && salesforceMatch && pjpMatch && kabupatenMatch && kecamatanMatch;
        });
    }, [searchTerm, filters, roleFilteredData]);

    const kabupatenChartData = useMemo(() => {
        const countsByKabupaten = filteredData.reduce((acc, outlet) => {
            const kabupaten = outlet.kabupaten || 'Unknown';
            if (kabupaten.trim() !== '') {
                acc[kabupaten] = (acc[kabupaten] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(countsByKabupaten)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [filteredData]);
    
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number; cy: number; midAngle: number; innerRadius: number | string; outerRadius: number | string; percent: number; }) => {
        const RADIAN = Math.PI / 180;
        // FIX: The innerRadius and outerRadius props from recharts can be strings.
        // Cast them to numbers before performing arithmetic operations.
        const numInnerRadius = parseFloat(String(innerRadius));
        const numOuterRadius = parseFloat(String(outerRadius));
        const radius = numInnerRadius + (numOuterRadius - numInnerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent * 100 < 5) return null;

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px" fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const tapChartData = useMemo(() => {
        const countsByTap = filteredData.reduce((acc, outlet) => {
            const tap = outlet.tap || 'Unknown';
             if (tap.trim() !== '') {
                acc[tap] = (acc[tap] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(countsByTap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [filteredData]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    // FIX: Ensure currentPage is handled as a number for pagination calculations to avoid type errors.
    const startIndex = (Number(currentPage) - 1) * ITEMS_PER_PAGE;
    const endIndex = Number(currentPage) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const paginate = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };
    
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Distribusi Outlet per Kabupaten">
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={kabupatenChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {kabupatenChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{fontSize: '12px', paddingTop: '20px'}}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Distribusi Outlet per TAP">
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={tapChartData} margin={{ top: 5, right: 20, left: -10, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'rgba(236, 32, 40, 0.1)'}}/>
                                <Bar dataKey="count" name="Jumlah Outlet" fill="#EC2028" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter & Pencarian</h3>
                    <div className="relative mb-4">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by ID, Name, Address..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red"
                            value={searchTerm}
                            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <MultiSelectDropdown
                            label="TAP"
                            options={availableOptions.taps}
                            selectedValues={filters.tap}
                            onChange={(selected) => handleFilterChange('tap', selected)}
                            disabled={user?.role === UserRole.DIRECT_SALES_D2C}
                        />
                         <MultiSelectDropdown
                            label="Salesforce"
                            options={availableOptions.salesforces}
                            selectedValues={filters.salesforce}
                            onChange={(selected) => handleFilterChange('salesforce', selected)}
                            disabled={user?.role === UserRole.SALESFORCE_IDS}
                        />
                        <MultiSelectDropdown
                            label="PJP"
                            options={availableOptions.pjps}
                            selectedValues={filters.pjp}
                            onChange={(selected) => handleFilterChange('pjp', selected)}
                        />
                         <MultiSelectDropdown
                            label="Kabupaten"
                            options={availableOptions.kabupatens}
                            selectedValues={filters.kabupaten}
                            onChange={(selected) => handleFilterChange('kabupaten', selected)}
                        />
                        <MultiSelectDropdown
                            label="Kecamatan"
                            options={availableOptions.kecamatans}
                            selectedValues={filters.kecamatan}
                            onChange={(selected) => handleFilterChange('kecamatan', selected)}
                        />
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <button onClick={resetFilters} className="px-4 py-2 text-sm font-medium text-white bg-telkomsel-gray-600 rounded-lg hover:bg-telkomsel-gray-700 shadow-sm transition-colors">
                            Reset Filters
                        </button>
                        <span className="text-sm text-gray-600">Showing {paginatedData.length} of {filteredData.length} results.</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-telkomsel-gray-50">
                            <tr>
                                {Object.keys(outletData[0] || {}).map(key => (
                                    <th key={key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {paginatedData.length > 0 ? paginatedData.map((outlet, index) => (
                                <tr key={outlet.outletId + index} className="hover:bg-gray-50">
                                    {Object.values(outlet).map((value, i) => (
                                        <td key={i} className="px-4 py-3 whitespace-nowrap text-gray-700 border-b border-gray-200">{value}</td>
                                    ))}
                                </tr>
                            )) : (
                            <tr>
                                    <td colSpan={Object.keys(outletData[0] || {}).length} className="text-center py-10 text-gray-500">No data available matching your criteria.</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="mt-6 flex justify-between items-center">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        <ChevronLeftIcon className="h-5 w-5 mr-1"/> Previous
                        </button>
                        <nav className="hidden md:flex items-center space-x-2">
                            {pageNumbers.map(number => {
                                if (number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
                                    return (
                                        <button key={number} onClick={() => paginate(number)} className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === number ? 'bg-telkomsel-red text-white' : 'text-gray-700 bg-white hover:bg-gray-50'}`}>
                                            {number}
                                        </button>
                                    );
                                }
                                if (number === currentPage - 3 || number === currentPage + 3) {
                                    return <span key={number} className="px-4 py-2 text-sm font-medium text-gray-500">...</span>;
                                }
                                return null;
                            })}
                        </nav>
                        <div className="md:hidden text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </div>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRightIcon className="h-5 w-5 ml-1"/>
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OutletRegisterPage;