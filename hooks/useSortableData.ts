import { useState, useMemo } from 'react';

type SortDirection = 'ascending' | 'descending';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export const useSortableData = <T extends Record<string, any>>(
  items: T[],
  initialConfig: SortConfig<T> | null = null
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(initialConfig);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        const isNumericA = valA !== null && valA !== '' && !isNaN(Number(valA));
        const isNumericB = valB !== null && valB !== '' && !isNaN(Number(valB));

        if (isNumericA && isNumericB) {
          if (Number(valA) < Number(valB)) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (Number(valA) > Number(valB)) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        } else {
          // String comparison
          if (String(valA).toLowerCase() < String(valB).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (String(valA).toLowerCase() > String(valB).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
