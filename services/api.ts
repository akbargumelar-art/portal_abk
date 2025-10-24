// This is a mock API service to simulate backend interactions.
// In a real application, these functions would make HTTP requests to a real server.

import { UserRole, type User } from '../types';
import { MOCK_USERS, MOCK_DASHBOARD_SALES_TREND, MOCK_COMPLAINTS, MOCK_POP_REQUESTS } from '../constants';
import { outletData } from '../data/outlets';
import { mockSellthruNotaData } from '../data/sellthruNota';
import { mockStockOutletDetailData } from '../data/stockOutlet';
import { mockOmzetOutletData } from '../data/omzetOutlet';
import { mockDoaAlokasiData, mockListSnData, mockDoaStockData } from '../data/doa';

const SIMULATED_DELAY = 500;

// Helper for sorting
const sortData = <T extends Record<string, any>>(data: T[], sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null) => {
  if (!sortConfig) return data;
  
  const sorted = [...data];
  sorted.sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    
    const isNumericA = valA !== null && valA !== '' && !isNaN(Number(valA));
    const isNumericB = valB !== null && valB !== '' && !isNaN(Number(valB));

    if (isNumericA && isNumericB) {
      if (Number(valA) < Number(valB)) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (Number(valA) > Number(valB)) return sortConfig.direction === 'ascending' ? 1 : -1;
    } else {
      if (String(valA).toLowerCase() < String(valB).toLowerCase()) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (String(valA).toLowerCase() > String(valB).toLowerCase()) return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  return sorted;
};


// === Auth ===
export const login = async (username: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = MOCK_USERS[username];
            if (user) {
                resolve(user);
            } else {
                reject(new Error("User not found"));
            }
        }, SIMULATED_DELAY);
    });
};

// === Dashboard ===
export const getDashboardData = async (user: User | null) => {
    return new Promise(resolve => {
        setTimeout(() => {
            let data = outletData;
            if (user?.role === UserRole.SALESFORCE_IDS && user.filterCriteria?.salesforce) {
                data = outletData.filter(o => o.salesforce === user.filterCriteria?.salesforce);
            }

            const stats = {
                totalSales: 1200000000,
                activeOutlets: data.length,
                digiposTransactions: 4890,
                sellOutPerdana: 12345,
            };

            const pjpChartData = Object.entries(data.reduce((acc, outlet) => {
                const pjp = outlet.pjp || 'Unknown';
                acc[pjp] = (acc[pjp] || 0) + 1;
                return acc;
            }, {} as Record<string, number>))
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => Number(b.count) - Number(a.count))
            .slice(0, 10);
            
            const recentTransactions = data.slice(0, 4).map(outlet => ({
                id: outlet.outletId,
                outlet: outlet.namaOutlet,
                product: outlet.kategori || 'N/A',
                amount: Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000,
                date: new Date(outlet.createAt).toLocaleString('en-CA')
            }));

            resolve({
                stats,
                pjpChartData,
                salesTrend: MOCK_DASHBOARD_SALES_TREND,
                recentTransactions
            });
        }, SIMULATED_DELAY);
    });
};

// === Outlet Register ===
export const getOutletRegisterData = async (params: { 
    page: number, 
    limit: number, 
    filters: any, 
    searchTerm: string,
    sortConfig: any,
    user: User | null 
}) => {
    const { page, limit, filters, searchTerm, sortConfig, user } = params;

    return new Promise(resolve => {
        setTimeout(() => {
            let data = outletData;
            // Role based filtering
            if (user?.role === UserRole.SALESFORCE_IDS && user.filterCriteria?.salesforce) {
                data = data.filter(o => o.salesforce === user.filterCriteria?.salesforce);
            }

            // General filters
            let filtered = data.filter(outlet => {
                 const searchMatch = searchTerm.length > 2 
                    ? Object.values(outlet).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
                    : true;

                const filterMatch = Object.entries(filters).every(([key, value]) => {
                    if (Array.isArray(value) && value.length > 0) {
                        return value.includes(outlet[key as keyof typeof outlet]);
                    }
                    return true;
                });
                return searchMatch && filterMatch;
            });

            // Sorting
            const sorted = sortData(filtered, sortConfig);
            
            // Pagination
            const total = sorted.length;
            const paginated = sorted.slice((page - 1) * limit, page * limit);

            resolve({ data: paginated, total });

        }, SIMULATED_DELAY);
    });
};


// === All other data fetching functions ===
const createGenericFetcher = (mockData: any[]) => async (params: { 
    page: number, 
    limit: number, 
    filters: any, 
    searchTerm: string,
    sortConfig: any,
    user: User | null 
}) => {
    const { page, limit, filters, searchTerm, sortConfig, user } = params;

    return new Promise(resolve => {
        setTimeout(() => {
            let data = mockData;
            
            // Generic filtering (can be enhanced)
            let filtered = data.filter(item => {
                const searchMatch = searchTerm.length > 2 
                    ? Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
                    : true;

                const filterMatch = Object.entries(filters).every(([key, value]) => {
                    if (Array.isArray(value) && value.length > 0) {
                        return value.includes(item[key as keyof typeof item]);
                    }
                    if (typeof value === 'string' && value.length > 0) {
                        if (key === 'startDate' && item.tanggal) return new Date(item.tanggal) >= new Date(value);
                        if (key === 'endDate' && item.tanggal) return new Date(item.tanggal) <= new Date(value);
                         if (key === 'startDate' && item.tanggalDo) return new Date(item.tanggalDo) >= new Date(value);
                        if (key === 'endDate' && item.tanggalDo) return new Date(item.tanggalDo) <= new Date(value);
                    }
                    return true;
                });
                return searchMatch && filterMatch;
            });

            const sorted = sortData(filtered, sortConfig);
            const total = sorted.length;
            const paginated = sorted.slice((page - 1) * limit, page * limit);
            
            resolve({ data: paginated, total, fullFilteredData: sorted });

        }, SIMULATED_DELAY);
    });
};

export const getSellthruNotaData = createGenericFetcher(mockSellthruNotaData);
export const getStockOutletData = createGenericFetcher(mockStockOutletDetailData);
export const getStockVoucherData = createGenericFetcher(mockStockOutletDetailData);
export const getOmzetData = createGenericFetcher(mockOmzetOutletData);
export const getDoaAlokasiData = createGenericFetcher(mockDoaAlokasiData);
export const getDoaListSnData = createGenericFetcher(mockListSnData);
export const getDoaStockData = createGenericFetcher(mockDoaStockData);
export const getComplaints = createGenericFetcher(MOCK_COMPLAINTS);
export const getPopRequests = createGenericFetcher(MOCK_POP_REQUESTS);
export const getUsers = createGenericFetcher(Object.values(MOCK_USERS));


// Form submission
export const submitVisitForm = async (formData: any): Promise<{ success: boolean; message: string }> => {
  console.log("Submitting form data to backend:", formData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Form submitted and webhook triggered successfully!" };
};
