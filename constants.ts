

import type { MenuItem, User, UserRole, Outlet, Complaint, PopRequest, VideoRoleplay, InputFormLink } from './types';
import { UserRole as Roles } from './types';
import {
  HomeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  VideoCameraIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ReceiptPercentIcon,
  CpuChipIcon,
  MegaphoneIcon,
  CubeIcon,
  BanknotesIcon,
  ChartPieIcon,
  ScaleIcon,
  CheckBadgeIcon,
  ShoppingCartIcon,
  TicketIcon,
  GiftIcon,
  ShieldExclamationIcon,
  PresentationChartLineIcon,
  ArchiveBoxArrowDownIcon,
  QueueListIcon,
  DocumentChartBarIcon,
  BriefcaseIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// FIX: Add all missing mock data constants to be exported.
export const MOCK_USERS: { [key: string]: User } = {
  admin_super: {
    id: 'usr-001',
    name: 'Agus Purnomo',
    role: Roles.ADMIN_SUPER,
    avatarUrl: 'https://i.pravatar.cc/150?u=agus',
  },
  admin_input: {
    id: 'usr-002',
    name: 'Budi Santoso',
    role: Roles.ADMIN_INPUT,
    avatarUrl: 'https://i.pravatar.cc/150?u=budi',
  },
  manager: {
    id: 'usr-003',
    name: 'Citra Lestari',
    role: Roles.MANAGER,
    avatarUrl: 'https://i.pravatar.cc/150?u=citra',
  },
  supervisor_ids: {
    id: 'usr-004',
    name: 'Dewi Anggraini',
    role: Roles.SUPERVISOR_IDS,
    avatarUrl: 'https://i.pravatar.cc/150?u=dewi',
  },
  supervisor_d2c: {
    id: 'usr-005',
    name: 'Eka Wijaya',
    role: Roles.SUPERVISOR_D2C,
    avatarUrl: 'https://i.pravatar.cc/150?u=eka',
  },
  salesforce_ids: {
    id: 'usr-006',
    name: 'Fajar Nugraha',
    role: Roles.SALESFORCE_IDS,
    avatarUrl: 'https://i.pravatar.cc/150?u=fajar',
    filterCriteria: {
      salesforce: 'Kuningan',
    },
  },
  direct_sales_d2c: {
    id: 'usr-007',
    name: 'Gita Permata',
    role: Roles.DIRECT_SALES_D2C,
    avatarUrl: 'https://i.pravatar.cc/150?u=gita',
    filterCriteria: {
      tap: 'Pemuda',
    },
  },
};

export const MOCK_OUTLETS: { [key: string]: Outlet } = {
  '2100005843': { name: 'ODONG CELL', address: 'CILAJA, KRAMATMULYA, KUNINGAN' },
  '2100005761': { name: 'DELLA CELL', address: 'CIEURIH, CIDAHU, KUNINGAN' },
  '2100019680': { name: 'SENJA CELL', address: 'KEDUNGDALEM, GEGESIK, CIREBON' },
  '2100004430': { name: 'I CELL', address: 'GINTUNG LOR, SUSUKAN, CIREBON' },
};


export const MENU_ITEMS: MenuItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: HomeIcon,
    allowedRoles: Object.values(Roles),
  },
  {
    path: '/dokumentasi',
    name: 'Dokumentasi',
    icon: DocumentTextIcon,
    allowedRoles: [Roles.SALESFORCE_IDS, Roles.DIRECT_SALES_D2C, Roles.ADMIN_SUPER, Roles.MANAGER, Roles.SUPERVISOR_IDS, Roles.SUPERVISOR_D2C],
  },
  {
    path: '/input-form',
    name: 'Input Form',
    icon: PencilSquareIcon,
    allowedRoles: Object.values(Roles),
  },
  {
    path: '/outlet-register',
    name: 'Outlet Register',
    icon: BuildingStorefrontIcon,
    allowedRoles: Object.values(Roles),
  },
  {
    path: '/sellthru',
    name: 'Sell Thru',
    icon: ReceiptPercentIcon,
    allowedRoles: Object.values(Roles),
    subItems: [
      { path: '/sellthru/nota', name: 'Nota', icon: DocumentTextIcon, allowedRoles: Object.values(Roles) },
      { path: '/sellthru/digipos', name: 'Digipos', icon: CpuChipIcon, allowedRoles: Object.values(Roles) },
    ],
  },
  {
    path: '/program-berjalan',
    name: 'Program Berjalan',
    icon: MegaphoneIcon,
    allowedRoles: Object.values(Roles),
    subItems: [
        { path: '/program-berjalan/scs', name: 'SCS', icon: CheckBadgeIcon, allowedRoles: Object.values(Roles) }
    ]
  },
  { path: '/stock-outlet', name: 'Stock Outlet', icon: CubeIcon, allowedRoles: Object.values(Roles) },
  { path: '/omzet-outlet', name: 'Omzet Outlet', icon: BanknotesIcon, allowedRoles: Object.values(Roles) },
  {
    path: '/kpi',
    name: 'KPI',
    icon: ChartPieIcon,
    allowedRoles: Object.values(Roles),
    subItems: [
      { path: '/kpi/cluster', name: 'KPI Cluster', icon: ChartPieIcon, allowedRoles: Object.values(Roles) },
      { path: '/kpi/salesforce', name: 'KPI Salesforce', icon: UserGroupIcon, allowedRoles: Object.values(Roles) },
    ],
  },
  {
    path: '/fee',
    name: 'Fee',
    icon: ScaleIcon,
    allowedRoles: [Roles.ADMIN_SUPER, Roles.MANAGER],
    subItems: [
      { path: '/fee/fee', name: 'Fee', icon: BanknotesIcon, allowedRoles: [Roles.ADMIN_SUPER, Roles.MANAGER] },
      { path: '/fee/management-fee', name: 'Management Fee', icon: BriefcaseIcon, allowedRoles: [Roles.ADMIN_SUPER, Roles.MANAGER] },
      { path: '/fee/budget-businessplan', name: 'Budget Business Plan', icon: DocumentChartBarIcon, allowedRoles: [Roles.ADMIN_SUPER, Roles.MANAGER] },
    ],
  },
  { path: '/aktifasi', name: 'Aktifasi', icon: CheckBadgeIcon, allowedRoles: Object.values(Roles) },
  { path: '/sellout', name: 'Sellout', icon: ShoppingCartIcon, allowedRoles: Object.values(Roles) },
  { path: '/inject-voucher-fisik', name: 'Inject Voucher Fisik', icon: TicketIcon, allowedRoles: Object.values(Roles) },
  { path: '/redeem-voucher-fisik', name: 'Redeem Voucher Fisik', icon: GiftIcon, allowedRoles: Object.values(Roles) },
  {
      path: '/performansi',
      name: 'Performansi',
      icon: PresentationChartLineIcon,
      allowedRoles: Object.values(Roles),
      subItems: [
          { path: '/performansi/top-line', name: 'Top Line', icon: ArrowTrendingUpIcon, allowedRoles: Object.values(Roles) }
      ]
  },
  {
    path: '/doa',
    name: 'DOA',
    icon: ShieldExclamationIcon,
    allowedRoles: Object.values(Roles),
    subItems: [
      { path: '/doa/alokasi', name: 'Alokasi', icon: ArchiveBoxArrowDownIcon, allowedRoles: Object.values(Roles) },
      { path: '/doa/list-sn', name: 'List SN', icon: QueueListIcon, allowedRoles: Object.values(Roles) },
      { path: '/doa/stock', name: 'Stock', icon: ArchiveBoxIcon, allowedRoles: Object.values(Roles) },
    ],
  },
  {
    path: '/video',
    name: 'Video Roleplay',
    icon: VideoCameraIcon,
    allowedRoles: [Roles.SALESFORCE_IDS, Roles.DIRECT_SALES_D2C, Roles.ADMIN_SUPER, Roles.MANAGER],
  },
  {
    path: '/komplain',
    name: 'Komplain',
    icon: ExclamationTriangleIcon,
    allowedRoles: [Roles.SALESFORCE_IDS, Roles.DIRECT_SALES_D2C, Roles.ADMIN_SUPER, Roles.MANAGER],
  },
  {
    path: '/monitoring-pop',
    name: 'Monitoring POP',
    icon: ChartBarIcon,
    allowedRoles: [Roles.SALESFORCE_IDS, Roles.DIRECT_SALES_D2C, Roles.ADMIN_SUPER, Roles.MANAGER, Roles.SUPERVISOR_D2C, Roles.SUPERVISOR_IDS],
  },
  {
    path: '/user-management',
    name: 'User Management',
    icon: UserGroupIcon,
    allowedRoles: [Roles.ADMIN_SUPER],
  },
];

export const MOCK_DASHBOARD_SALES_TREND = [
  { month: 'Feb', sales: 4500 },
  { month: 'Mar', sales: 4800 },
  { month: 'Apr', sales: 4700 },
  { month: 'Mei', sales: 5100 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 5300 },
];

export const MOCK_INPUT_FORMS: InputFormLink[] = [
  { id: '1', title: 'Laporan Penjualan Harian', description: 'Input data penjualan harian outlet', path: '/input-form/daily-sales' },
  { id: '2', title: 'Request Material Promosi', description: 'Formulir pengajuan material promosi (POP)', path: '/input-form/pop-request' },
  { id: '3', title: 'Laporan Stok Opname', description: 'Input hasil stok opname mingguan', path: '/input-form/stock-opname' },
];

export const MOCK_VIDEOS: VideoRoleplay[] = [
  { id: 'vid1', user: 'Fajar Nugraha', date: '2024-07-20', title: 'Teknik Closing Penjualan Kartu Perdana', videoUrl: '#', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg' },
  { id: 'vid2', user: 'Gita Permata', date: '2024-07-18', title: 'Roleplay Penawaran Paket Internet', videoUrl: '#', thumbnailUrl: 'https://img.youtube.com/vi/o-YBDTqX_ZU/0.jpg' },
  { id: 'vid3', user: 'Fajar Nugraha', date: '2024-07-15', title: 'Cara Mengatasi Keberatan Pelanggan', videoUrl: '#', thumbnailUrl: 'https://img.youtube.com/vi/yPYZpwSpKmA/0.jpg' },
];

export const MOCK_COMPLAINTS: Complaint[] = [
  { id: 'comp1', user: 'Fajar Nugraha', role: Roles.SALESFORCE_IDS, date: '2024-07-21', subject: 'Stok voucher fisik kosong', status: 'Open', details: 'Stok voucher fisik 5rb di gudang Cirebon habis.' },
  { id: 'comp2', user: 'Gita Permata', role: Roles.DIRECT_SALES_D2C, date: '2024-07-20', subject: 'Aplikasi DigiPOS lambat', status: 'In Progress', details: 'Aplikasi DigiPOS sering hang saat transaksi.' },
  { id: 'comp3', user: 'Fajar Nugraha', role: Roles.SALESFORCE_IDS, date: '2024-07-19', subject: 'Pengiriman POP Material terlambat', status: 'Resolved', details: 'Pengiriman spanduk untuk outlet 2100005843 terlambat 3 hari.' },
];

export const MOCK_POP_REQUESTS: PopRequest[] = [
  { id: 'pop1', outletId: '2100005843', outletName: 'ODONG CELL', requester: 'Fajar Nugraha', date: '2024-07-20', items: [{ item: 'Spanduk', qty: 2 }, { item: 'Poster', qty: 5 }], status: 'Diajukan' },
  { id: 'pop2', outletId: '2100005761', outletName: 'DELLA CELL', requester: 'Fajar Nugraha', date: '2024-07-19', items: [{ item: 'Brosur', qty: 100 }], status: 'Diproses' },
  { id: 'pop3', outletId: '2100019680', outletName: 'SENJA CELL', requester: 'Budi Santoso', date: '2024-07-18', items: [{ item: 'Spanduk', qty: 1 }], status: 'Terkirim' },
  { id: 'pop4', outletId: '2100004430', outletName: 'I CELL', requester: 'Fajar Nugraha', date: '2024-07-15', items: [{ item: 'Poster', qty: 10 }], status: 'Terpasang' },
];