import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const MultiSelectDropdown: React.FC<{
    options: string[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    label: string;
}> = ({ options, selectedValues, onChange, label }) => {
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
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red text-gray-900 text-left flex justify-between items-center"
            >
                <span className="truncate">{displayLabel}</span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
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

export default MultiSelectDropdown;
