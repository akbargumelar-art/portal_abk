// This service now makes real fetch calls to the backend server.
import type { User } from '../types';

const API_BASE_URL = '/api'; // Uses a relative path to work with the Nginx reverse proxy

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
};

// === Auth ===
export const login = async (username: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
    return handleResponse(response);
};

// === Generic Fetcher for Paginated Data ===
const fetchPaginatedData = async (endpoint: string, params: any) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    return handleResponse(response);
}

// === Dashboard ===
export const getDashboardData = async (user: User | null) => {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
    });
    return handleResponse(response);
};

// === Dynamic Filter Options ===
export const getFilterOptions = async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/filter-options`);
    return handleResponse(response);
};

// === Page-specific Data Fetchers ===
export const getOutletRegisterData = (params: any) => fetchPaginatedData('outlet-register', params);
export const getSellthruNotaData = (params: any) => fetchPaginatedData('sellthru-nota', params);
export const getStockOutletData = (params: any) => fetchPaginatedData('stock-outlet', params);
export const getStockVoucherData = (params: any) => fetchPaginatedData('stock-voucher', params);
export const getOmzetData = (params: any) => fetchPaginatedData('omzet', params);
export const getDoaAlokasiData = (params: any) => fetchPaginatedData('doa-alokasi', params);
export const getDoaListSnData = (params: any) => fetchPaginatedData('doa-list-sn', params);
export const getDoaStockData = (params: any) => fetchPaginatedData('doa-stock', params);
export const getComplaints = (params: any) => fetchPaginatedData('complaints', params);
export const getPopRequests = (params: any) => fetchPaginatedData('pop-requests', params);
export const getUsers = (params: any) => fetchPaginatedData('users', params);


// Form submission
export const submitVisitForm = async (formData: any): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/submit-visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};