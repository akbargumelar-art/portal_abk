import React from 'react';

export enum UserRole {
  ADMIN_SUPER = 'Admin Super',
  ADMIN_INPUT = 'Admin Input Data',
  MANAGER = 'Manager',
  SUPERVISOR_IDS = 'Supervisor (IDS)',
  SUPERVISOR_D2C = 'Supervisor Direct Sales (D2C)',
  SALESFORCE_IDS = 'Salesforce (IDS)',
  DIRECT_SALES_D2C = 'Direct Sales (D2C)',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  filterCriteria?: { [key: string]: string };
}

export interface MenuItem {
  path: string;
  name: string;
  // Fix: Changed the type of icon to be a React ComponentType that accepts SVG props.
  // This is compatible with the components exported by @heroicons/react.
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  allowedRoles: UserRole[];
  subItems?: MenuItem[];
}

export interface Outlet {
  name: string;
  address: string;
}

export interface Complaint {
  id: string;
  user: string;
  role: UserRole;
  date: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  details: string;
}

export interface PopRequest {
  id: string;
  outletId: string;
  outletName: string;
  requester: string;
  date: string;
  items: { item: string; qty: number }[];
  status: 'Diajukan' | 'Diproses' | 'Terkirim' | 'Terpasang';
}

export interface VideoRoleplay {
  id: string;
  user: string;
  date: string;
  title: string;
  videoUrl: string; 
  thumbnailUrl: string;
}

export interface InputFormLink {
  id: string;
  title: string;
  description: string;
  path: string;
}

export interface OutletData {
  createAt: string;
  outletId: string;
  namaOutlet: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  cluster: string;
  branch: string;
  regional: string;
  area: string;
  longitude: string;
  lattitude: string;
  noRs: string;
  noKonfirmasi: string;
  kategori: string;
  tipeOutlet: string;
  fisik: string;
  tipeLokasi: string;
  klasifikasi: string;
  sfCode: string;
  pjp: string;
  flag: string;
  tap: string;
  salesforce: string;
}