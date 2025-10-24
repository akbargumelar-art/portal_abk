// data/stockOutlet.ts

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

export const mockStockOutletDetailData: StockOutletDetail[] = [
  { id: '1', outlet_id: '2201002014', no_rs: '81214011935', nama_outlet: 'SUKSES BERKAH CELL', kelurahan: 'SUKADANA', kecamatan: 'CIAMIS', kabupaten: 'CIAMIS', tap: 'PEMUDA', pjp: 'PJP KAMIS', salesforce: 'Ahmad Gunawan', penjualan_perdana_olimpiade: 10, penjualan_perdana_beli: 10, sell_out_olimpiade: 9, sell_out_beli: 0, stok_akhir_perdana_olimpiade: 9, stok_akhir_perdana_beli: 4, penjualan_voucher_olimpiade: 0, penjualan_voucher_beli: 13, redeem_olimpiade: 9, redeem_beli: 0, stok_akhir_voucher_olimpiade: 9, stok_akhir_voucher_beli: 4 },
  { id: '2', outlet_id: '2100005843', no_rs: '81214011936', nama_outlet: 'ODONG CELL', kelurahan: 'CILAJA', kecamatan: 'KRAMATMULYA', kabupaten: 'KUNINGAN', tap: 'PEMUDA', pjp: 'PJP SELASA', salesforce: 'Ahmad Gunawan', penjualan_perdana_olimpiade: 15, penjualan_perdana_beli: 5, sell_out_olimpiade: 12, sell_out_beli: 3, stok_akhir_perdana_olimpiade: 8, stok_akhir_perdana_beli: 2, penjualan_voucher_olimpiade: 5, penjualan_voucher_beli: 10, redeem_olimpiade: 8, redeem_beli: 2, stok_akhir_voucher_olimpiade: 7, stok_akhir_voucher_beli: 3 },
  { id: '3', outlet_id: '2100005761', no_rs: '81312490344', nama_outlet: 'DELLA CELL', kelurahan: 'CIEURIH', kecamatan: 'CIDAHU', kabupaten: 'KUNINGAN', tap: 'KUNINGAN', pjp: 'PJP RABU', salesforce: 'Deden Akbarudin', penjualan_perdana_olimpiade: 8, penjualan_perdana_beli: 12, sell_out_olimpiade: 7, sell_out_beli: 10, stok_akhir_perdana_olimpiade: 5, stok_akhir_perdana_beli: 6, penjualan_voucher_olimpiade: 2, penjualan_voucher_beli: 15, redeem_olimpiade: 5, redeem_beli: 8, stok_akhir_voucher_olimpiade: 3, stok_akhir_voucher_beli: 9 },
  { id: '4', outlet_id: '2100019680', no_rs: '81394312092', nama_outlet: 'SENJA CELL', kelurahan: 'KEDUNGDALEM', kecamatan: 'GEGESIK', kabupaten: 'CIREBON', tap: 'PALIMANAN', pjp: 'PJP JUMAT', salesforce: 'Adi Junaedi', penjualan_perdana_olimpiade: 20, penjualan_perdana_beli: 2, sell_out_olimpiade: 18, sell_out_beli: 1, stok_akhir_perdana_olimpiade: 4, stok_akhir_perdana_beli: 1, penjualan_voucher_olimpiade: 10, penjualan_voucher_beli: 5, redeem_olimpiade: 12, redeem_beli: 3, stok_akhir_voucher_olimpiade: 8, stok_akhir_voucher_beli: 2 },
  { id: '5', outlet_id: '2100004430', no_rs: '81312553341', nama_outlet: 'I CELL', kelurahan: 'GINTUNG LOR', kecamatan: 'SUSUKAN', kabupaten: 'CIREBON', tap: 'PALIMANAN', pjp: 'PJP SENIN', salesforce: 'Agus Sarwoedi', penjualan_perdana_olimpiade: 5, penjualan_perdana_beli: 15, sell_out_olimpiade: 4, sell_out_beli: 14, stok_akhir_perdana_olimpiade: 0, stok_akhir_perdana_beli: 0, penjualan_voucher_olimpiade: 1, penjualan_voucher_beli: 20, redeem_olimpiade: 2, redeem_beli: 18, stok_akhir_voucher_olimpiade: 1, stok_akhir_voucher_beli: 10 },
  { id: '6', outlet_id: '2201003369', no_rs: '82121110002', nama_outlet: 'CHEFOF CELL 2', kelurahan: 'SILEBU', kecamatan: 'PANCALANG', kabupaten: 'KUNINGAN', tap: 'KUNINGAN', pjp: 'PJP KAMIS', salesforce: 'Hendra Jaya', penjualan_perdana_olimpiade: 11, penjualan_perdana_beli: 12, sell_out_olimpiade: 10, sell_out_beli: 10, stok_akhir_perdana_olimpiade: 1, stok_akhir_perdana_beli: 2, penjualan_voucher_olimpiade: 5, penjualan_voucher_beli: 5, redeem_olimpiade: 4, redeem_beli: 4, stok_akhir_voucher_olimpiade: 1, stok_akhir_voucher_beli: 1 },
  { id: '7', outlet_id: '2201046711', no_rs: '82130303226', nama_outlet: 'NZF 1 CELL', kelurahan: 'CIPORANG', kecamatan: 'KUNINGAN', kabupaten: 'KUNINGAN', tap: 'KUNINGAN', pjp: 'PJP SELASA', salesforce: 'Maman Suherman', penjualan_perdana_olimpiade: 25, penjualan_perdana_beli: 25, sell_out_olimpiade: 25, sell_out_beli: 25, stok_akhir_perdana_olimpiade: 0, stok_akhir_perdana_beli: 0, penjualan_voucher_olimpiade: 10, penjualan_voucher_beli: 10, redeem_olimpiade: 10, redeem_beli: 10, stok_akhir_voucher_olimpiade: 0, stok_akhir_voucher_beli: 0 },
  { id: '8', outlet_id: '2100030547', no_rs: '82117771755', nama_outlet: '81RELOAD2', kelurahan: 'KEJAKSAN', kecamatan: 'KEJAKSAN', kabupaten: 'KOTA CIREBON', tap: 'PEMUDA', pjp: 'PJP RABU', salesforce: 'Arman Farid', penjualan_perdana_olimpiade: 50, penjualan_perdana_beli: 50, sell_out_olimpiade: 45, sell_out_beli: 48, stok_akhir_perdana_olimpiade: 5, stok_akhir_perdana_beli: 2, penjualan_voucher_olimpiade: 20, penjualan_voucher_beli: 20, redeem_olimpiade: 18, redeem_beli: 19, stok_akhir_voucher_olimpiade: 2, stok_akhir_voucher_beli: 15 },
];