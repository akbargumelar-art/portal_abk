import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface SortIconProps<T> {
  sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null;
  forKey: keyof T;
  className?: string;
}

const SortIcon = <T extends Record<string, any>>({ sortConfig, forKey, className = "h-4 w-4 inline-block ml-1 text-gray-400 group-hover:text-gray-600" }: SortIconProps<T>) => {
  if (!sortConfig || sortConfig.key !== forKey) {
    return <ChevronUpDownIcon className={className} />;
  }
  if (sortConfig.direction === 'ascending') {
    return <ChevronUpIcon className={`${className} text-telkomsel-red`} />;
  }
  return <ChevronDownIcon className={`${className} text-telkomsel-red`} />;
};

export default SortIcon;