import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { UserRole } from '../types';
import type { OutletData } from '../types';

export const useRoleBasedData = (data: OutletData[]) => {
  const { user } = useAuth();

  const roleFilteredData = useMemo(() => {
    if (!user) {
      return [];
    }

    const rolesToFilter: string[] = [UserRole.SALESFORCE_IDS, UserRole.DIRECT_SALES_D2C];

    if (rolesToFilter.includes(user.role) && user.filterCriteria) {
      return data.filter(item => {
        return Object.entries(user.filterCriteria!).every(([key, value]) => {
          return item[key as keyof OutletData] === value;
        });
      });
    }

    // For admins, managers, etc., return all data
    return data;
  }, [user, data]);

  return roleFilteredData;
};
