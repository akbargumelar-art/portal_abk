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

export const mockOmzetOutletData: OmzetOutletData[] = [
  // Data for Ahmad Gunawan (PEMUDA)
  { id: '1', outlet_id: '2201002014', no_rs: '81214011935', nama_outlet: 'SUKSES BERKAH CELL', salesforce: 'Ahmad Gunawan', tap: 'PEMUDA', kabupaten: 'CIAMIS', kecamatan: 'CIAMIS', flag: 'PJP FISIK', pjp: 'KAMIS', transaksi_fm1: 13, transaksi_m1: 15, transaksi_m: 13, revenue_fm1: 130000, revenue_m1: 150000, revenue_m: 130000 },
  { id: '2', outlet_id: '2100005843', no_rs: '81214011936', nama_outlet: 'ODONG CELL', salesforce: 'Ahmad Gunawan', tap: 'PEMUDA', kabupaten: 'KUNINGAN', kecamatan: 'KRAMATMULYA', flag: 'PJP FISIK', pjp: 'SELASA', transaksi_fm1: 20, transaksi_m1: 18, transaksi_m: 22, revenue_fm1: 200000, revenue_m1: 180000, revenue_m: 220000 },

  // Data for Deden Akbarudin (KUNINGAN)
  { id: '3', outlet_id: '2100005761', no_rs: '81312490344', nama_outlet: 'DELLA CELL', salesforce: 'Deden Akbarudin', tap: 'KUNINGAN', kabupaten: 'KUNINGAN', kecamatan: 'CIDAHU', flag: 'PJP FISIK', pjp: 'RABU', transaksi_fm1: 25, transaksi_m1: 30, transaksi_m: 28, revenue_fm1: 250000, revenue_m1: 300000, revenue_m: 280000 },
  { id: '6', outlet_id: '2201003369', no_rs: '82121110002', nama_outlet: 'CHEFOF CELL 2', salesforce: 'Deden Akbarudin', tap: 'KUNINGAN', kabupaten: 'KUNINGAN', kecamatan: 'PANCALANG', flag: 'PJP FISIK', pjp: 'KAMIS', transaksi_fm1: 18, transaksi_m1: 20, transaksi_m: 19, revenue_fm1: 180000, revenue_m1: 200000, revenue_m: 190000 },

  // Data for Adi Junaedi (PALIMANAN)
  { id: '4', outlet_id: '2100019680', no_rs: '81394312092', nama_outlet: 'SENJA CELL', salesforce: 'Adi Junaedi', tap: 'PALIMANAN', kabupaten: 'CIREBON', kecamatan: 'GEGESIK', flag: 'PJP FISIK', pjp: 'JUMAT', transaksi_fm1: 40, transaksi_m1: 45, transaksi_m: 50, revenue_fm1: 400000, revenue_m1: 450000, revenue_m: 500000 },
  { id: '5', outlet_id: '2100004430', no_rs: '81312553341', nama_outlet: 'I CELL', salesforce: 'Adi Junaedi', tap: 'PALIMANAN', kabupaten: 'CIREBON', kecamatan: 'SUSUKAN', flag: 'PJP FISIK', pjp: 'SENIN', transaksi_fm1: 35, transaksi_m1: 32, transaksi_m: 38, revenue_fm1: 350000, revenue_m1: 320000, revenue_m: 380000 },
  
  // More data for variety
  { id: '7', outlet_id: '2100030547', no_rs: '82117771755', nama_outlet: '81RELOAD2', salesforce: 'Arman Farid', tap: 'PEMUDA', kabupaten: 'KOTA CIREBON', kecamatan: 'KEJAKSAN', flag: 'PJP FISIK', pjp: 'RABU', transaksi_fm1: 100, transaksi_m1: 110, transaksi_m: 95, revenue_fm1: 1000000, revenue_m1: 1100000, revenue_m: 950000 },
  { id: '8', outlet_id: '2100004875', no_rs: '81214599185', nama_outlet: 'SHANDI CELL', salesforce: 'Agus Sarwoedi', tap: 'PALIMANAN', kabupaten: 'CIREBON', kecamatan: 'WERU', flag: 'PJP FISIK', pjp: 'SENIN', transaksi_fm1: 22, transaksi_m1: 24, transaksi_m: 25, revenue_fm1: 220000, revenue_m1: 240000, revenue_m: 250000 },
];
