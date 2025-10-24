export interface SellthruNotaData {
  id: string;
  tanggal: string;
  idDigipos: string;
  noRs: string;
  namaOutlet: string;
  kategoriOutlet: 'Retail' | 'Pareto Retail' | 'Big Pareto';
  tap: string;
  salesforce: string;
  kabupaten: string;
  kecamatan: string;
  detailProduk: string;
  kategoriProduk: string;
  merk: 'Simpati' | 'byU';
  type: 'Voucher Fisik' | 'Perdana';
  kuantiti: number;
  harga: number;
}

export const mockSellthruNotaData: SellthruNotaData[] = [
  { id: '1', tanggal: '2024-07-28', idDigipos: 'DIGI001', noRs: '81214011935', namaOutlet: 'SUKSES BERKAH CELL', kategoriOutlet: 'Pareto Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'CIAMIS', kecamatan: 'CIAMIS', detailProduk: 'VF Data 5K 3 Hari', kategoriProduk: 'Voucher 5K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 10, harga: 4800 },
  { id: '2', tanggal: '2024-07-28', idDigipos: 'DIGI002', noRs: '81214011936', namaOutlet: 'ODONG CELL', kategoriOutlet: 'Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'KUNINGAN', kecamatan: 'KRAMATMULYA', detailProduk: 'SP Super Seru 10GB', kategoriProduk: 'SP Super Seru', merk: 'Simpati', type: 'Perdana', kuantiti: 5, harga: 12000 },
  { id: '3', tanggal: '2024-07-27', idDigipos: 'DIGI003', noRs: '81312490344', namaOutlet: 'DELLA CELL', kategoriOutlet: 'Big Pareto', tap: 'KUNINGAN', salesforce: 'Deden Akbarudin', kabupaten: 'KUNINGAN', kecamatan: 'CIDAHU', detailProduk: 'VF Data 10K 5 Hari', kategoriProduk: 'Voucher 10K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 20, harga: 9800 },
  { id: '4', tanggal: '2024-07-27', idDigipos: 'DIGI004', noRs: '81394312092', namaOutlet: 'SENJA CELL', kategoriOutlet: 'Retail', tap: 'PALIMANAN', salesforce: 'Adi Junaedi', kabupaten: 'CIREBON', kecamatan: 'GEGESIK', detailProduk: 'VF Data 5K 3 Hari', kategoriProduk: 'Voucher 5K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 15, harga: 4800 },
  { id: '5', tanggal: '2024-07-26', idDigipos: 'DIGI005', noRs: '81312553341', namaOutlet: 'I CELL', kategoriOutlet: 'Pareto Retail', tap: 'PALIMANAN', salesforce: 'Agus Sarwoedi', kabupaten: 'CIREBON', kecamatan: 'SUSUKAN', detailProduk: 'SP byU Unlimited 1.5Mbps', kategoriProduk: 'SP Unlimited', merk: 'byU', type: 'Perdana', kuantiti: 8, harga: 55000 },
  { id: '6', tanggal: '2024-07-26', idDigipos: 'DIGI006', noRs: '82121110002', namaOutlet: 'CHEFOF CELL 2', kategoriOutlet: 'Retail', tap: 'KUNINGAN', salesforce: 'Hendra Jaya', kabupaten: 'KUNINGAN', kecamatan: 'PANCALANG', detailProduk: 'VF Data 20K 7 Hari', kategoriProduk: 'Voucher 20K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 12, harga: 19500 },
  { id: '7', tanggal: '2024-07-25', idDigipos: 'DIGI007', noRs: '82130303226', namaOutlet: 'NZF 1 CELL', kategoriOutlet: 'Big Pareto', tap: 'KUNINGAN', salesforce: 'Maman Suherman', kabupaten: 'KUNINGAN', kecamatan: 'KUNINGAN', detailProduk: 'SP Super Seru 10GB', kategoriProduk: 'SP Super Seru', merk: 'Simpati', type: 'Perdana', kuantiti: 30, harga: 12000 },
  { id: '8', tanggal: '2024-07-25', idDigipos: 'DIGI008', noRs: '82117771755', namaOutlet: '81RELOAD2', kategoriOutlet: 'Big Pareto', tap: 'PEMUDA', salesforce: 'Arman Farid', kabupaten: 'KOTA CIREBON', kecamatan: 'KEJAKSAN', detailProduk: 'VF Data 50K 30 Hari', kategoriProduk: 'Voucher 50K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 5, harga: 49000 },
  { id: '9', tanggal: '2024-07-24', idDigipos: 'DIGI009', noRs: '81214011935', namaOutlet: 'SUKSES BERKAH CELL', kategoriOutlet: 'Pareto Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'CIAMIS', kecamatan: 'CIAMIS', detailProduk: 'SP Super Seru 10GB', kategoriProduk: 'SP Super Seru', merk: 'Simpati', type: 'Perdana', kuantiti: 3, harga: 12000 },
  { id: '10', tanggal: '2024-07-24', idDigipos: 'DIGI010', noRs: '81312490344', namaOutlet: 'DELLA CELL', kategoriOutlet: 'Big Pareto', tap: 'KUNINGAN', salesforce: 'Deden Akbarudin', kabupaten: 'KUNINGAN', kecamatan: 'CIDAHU', detailProduk: 'VF Data 5K 3 Hari', kategoriProduk: 'Voucher 5K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 50, harga: 4800 },
  { id: '11', tanggal: '2024-05-23', idDigipos: 'DIGI011', noRs: '81394312092', namaOutlet: 'SENJA CELL', kategoriOutlet: 'Retail', tap: 'PALIMANAN', salesforce: 'Adi Junaedi', kabupaten: 'CIREBON', kecamatan: 'GEGESIK', detailProduk: 'SP byU Unlimited 1.5Mbps', kategoriProduk: 'SP Unlimited', merk: 'byU', type: 'Perdana', kuantiti: 2, harga: 55000 },
  { id: '12', tanggal: '2024-06-22', idDigipos: 'DIGI012', noRs: '81312553341', namaOutlet: 'I CELL', kategoriOutlet: 'Pareto Retail', tap: 'PALIMANAN', salesforce: 'Agus Sarwoedi', kabupaten: 'CIREBON', kecamatan: 'SUSUKAN', detailProduk: 'VF Data 10K 5 Hari', kategoriProduk: 'Voucher 10K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 25, harga: 9800 },
  { id: '13', tanggal: '2024-05-21', idDigipos: 'DIGI013', noRs: '82121110002', namaOutlet: 'CHEFOF CELL 2', kategoriOutlet: 'Retail', tap: 'KUNINGAN', salesforce: 'Hendra Jaya', kabupaten: 'KUNINGAN', kecamatan: 'PANCALANG', detailProduk: 'SP Super Seru 10GB', kategoriProduk: 'SP Super Seru', merk: 'Simpati', type: 'Perdana', kuantiti: 10, harga: 12000 },
  { id: '14', tanggal: '2024-06-20', idDigipos: 'DIGI014', noRs: '82130303226', namaOutlet: 'NZF 1 CELL', kategoriOutlet: 'Big Pareto', tap: 'KUNINGAN', salesforce: 'Maman Suherman', kabupaten: 'KUNINGAN', kecamatan: 'KUNINGAN', detailProduk: 'VF Data 5K 3 Hari', kategoriProduk: 'Voucher 5K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 100, harga: 4800 },
  { id: '15', tanggal: '2024-07-19', idDigipos: 'DIGI015', noRs: '82117771755', namaOutlet: '81RELOAD2', kategoriOutlet: 'Big Pareto', tap: 'PEMUDA', salesforce: 'Arman Farid', kabupaten: 'KOTA CIREBON', kecamatan: 'KEJAKSAN', detailProduk: 'SP byU Unlimited 1.5Mbps', kategoriProduk: 'SP Unlimited', merk: 'byU', type: 'Perdana', kuantiti: 15, harga: 55000 },
  { id: '16', tanggal: '2024-05-18', idDigipos: 'DIGI016', noRs: '81214011935', namaOutlet: 'SUKSES BERKAH CELL', kategoriOutlet: 'Pareto Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'CIAMIS', kecamatan: 'CIAMIS', detailProduk: 'VF Data 20K 7 Hari', kategoriProduk: 'Voucher 20K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 8, harga: 19500 },
  { id: '17', tanggal: '2024-06-17', idDigipos: 'DIGI017', noRs: '81214011936', namaOutlet: 'ODONG CELL', kategoriOutlet: 'Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'KUNINGAN', kecamatan: 'KRAMATMULYA', detailProduk: 'VF Data 10K 5 Hari', kategoriProduk: 'Voucher 10K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 30, harga: 9800 },
  { id: '18', tanggal: '2024-07-16', idDigipos: 'DIGI018', noRs: '81312490344', namaOutlet: 'DELLA CELL', kategoriOutlet: 'Big Pareto', tap: 'KUNINGAN', salesforce: 'Deden Akbarudin', kabupaten: 'KUNINGAN', kecamatan: 'CIDAHU', detailProduk: 'SP Super Seru 10GB', kategoriProduk: 'SP Super Seru', merk: 'Simpati', type: 'Perdana', kuantiti: 25, harga: 12000 },
  { id: '19', tanggal: '2024-06-15', idDigipos: 'DIGI019', noRs: '81394312092', namaOutlet: 'SENJA CELL', kategoriOutlet: 'Retail', tap: 'PALIMANAN', salesforce: 'Adi Junaedi', kabupaten: 'CIREBON', kecamatan: 'GEGESIK', detailProduk: 'VF Data 50K 30 Hari', kategoriProduk: 'Voucher 50K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 3, harga: 49000 },
  { id: '20', tanggal: '2024-07-14', idDigipos: 'DIGI020', noRs: '81312553341', namaOutlet: 'I CELL', kategoriOutlet: 'Pareto Retail', tap: 'PALIMANAN', salesforce: 'Agus Sarwoedi', kabupaten: 'CIREBON', kecamatan: 'SUSUKAN', detailProduk: 'VF Data 5K 3 Hari', kategoriProduk: 'Voucher 5K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 40, harga: 4800 },
];