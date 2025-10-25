
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

// Fix: Add missing type definitions
export interface StockOutletDetail {
  id: string;
  outlet_id: string;
  no_rs: string;
  nama_outlet: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  tap: string;
  pjp: string;
  salesforce: string;
  penjualan_perdana_olimpiade: number;
  penjualan_perdana_beli: number;
  sell_out_olimpiade: number;
  sell_out_beli: number;
  stok_akhir_perdana_olimpiade: number;
  stok_akhir_perdana_beli: number;
  penjualan_voucher_olimpiade: number;
  penjualan_voucher_beli: number;
  redeem_olimpiade: number;
  redeem_beli: number;
  stok_akhir_voucher_olimpiade: number;
  stok_akhir_voucher_beli: number;
}

export interface OmzetOutletData {
    id: string;
    outlet_id: string;
    no_rs: string;
    nama_outlet: string;
    salesforce: string;
    tap: string;
    kabupaten: string;
    kecamatan: string;
    flag: string;
    pjp: string;
    transaksi_fm1: number;
    transaksi_m1: number;
    transaksi_m: number;
    revenue_fm1: number;
    revenue_m1: number;
    revenue_m: number;
}

export interface DoaAlokasi {
  id: number;
  tanggal: string;
  namaProduk: string;
  kuantiti: number;
  harga: number;
}

export interface DoaListSn {
  id: number;
  no: number;
  msisdn: string;
  noSeri: string;
  imsi: string;
  paket: string;
  tglKadaluarsa: string;
  lokasi: string;
  kategoriLokasi: string;
  doNum: string;
  kode: string;
  deskripsiBarang: string;
  blokAwal: string;
  blokAkhir: string;
  jml: number;
  tanggalKadaluarsa2: string;
  tanggalDo: string;
}

export interface DoaStock {
  id: number;
  sn: string;
  msisdn: string;
  namaProduk: string;
  paket: string;
  masaAktif: string;
  gudang: string;
  expiredDate: string;
}

export interface SellthruNotaData {
  id: string;
  tanggal: string;
  idDigipos: string;
  noRs: string;
  namaOutlet: string;
  kategoriOutlet: string;
  tap: string;
  salesforce: string;
  kabupaten: string;
  kecamatan: string;
  detailProduk: string;
  kategoriProduk: string;
  merk: string;
  type: 'Perdana' | 'Voucher Fisik';
  kuantiti: number;
  harga: number;
}
