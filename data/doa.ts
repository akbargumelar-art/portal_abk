// Add explicit interfaces for mock data to ensure correct type inference downstream.
export interface DoaAlokasi {
  id: number;
  tanggal: string;
  namaProduk: string;
  kuantiti: number;
  harga: number;
}

// Mock data for DOA allocations
export const mockDoaAlokasiData: DoaAlokasi[] = [
  { id: 1, tanggal: '2024-07-01', namaProduk: 'Voucher Fisik 5K', kuantiti: 100, harga: 4500 },
  { id: 2, tanggal: '2024-07-02', namaProduk: 'Perdana Super Seru', kuantiti: 50, harga: 12000 },
  { id: 3, tanggal: '2024-07-08', namaProduk: 'Voucher Fisik 10K', kuantiti: 75, harga: 9500 },
  { id: 4, tanggal: '2024-07-10', namaProduk: 'Voucher Fisik 5K', kuantiti: 120, harga: 4500 },
  { id: 5, tanggal: '2024-07-15', namaProduk: 'Perdana Unlimited', kuantiti: 30, harga: 55000 },
  { id: 6, tanggal: '2024-07-18', namaProduk: 'Voucher Fisik 10K', kuantiti: 80, harga: 9500 },
  { id: 7, tanggal: '2024-07-22', namaProduk: 'Perdana Super Seru', kuantiti: 60, harga: 12000 },
  { id: 8, tanggal: '2024-07-25', namaProduk: 'Voucher Fisik 5K', kuantiti: 150, harga: 4500 },
  { id: 9, tanggal: '2024-07-29', namaProduk: 'Perdana Unlimited', kuantiti: 25, harga: 55000 },
  { id: 10, tanggal: '2024-08-01', namaProduk: 'Voucher Fisik 10K', kuantiti: 100, harga: 9500 },
];

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

// Mock data based on the provided image for DOA Serial Numbers
export const mockListSnData: DoaListSn[] = [
  { id: 1, no: 1, msisdn: '08139878901', noSeri: '0850000193987523', imsi: '510101234567890', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 2, no: 2, msisdn: '08139878902', noSeri: '0850000193987524', imsi: '510101234567891', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 3, no: 3, msisdn: '08139878903', noSeri: '0850000193987525', imsi: '510101234567892', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 4, no: 4, msisdn: '08139878904', noSeri: '0850000193987526', imsi: '510101234567893', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 5, no: 5, msisdn: '08139878905', noSeri: '0850000193987527', imsi: '510101234567894', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 6, no: 6, msisdn: '08139878906', noSeri: '0850000193987528', imsi: '510101234567895', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 7, no: 7, msisdn: '08139878907', noSeri: '0850000193987529', imsi: '510101234567896', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 8, no: 8, msisdn: '08139878908', noSeri: '0850000193987530', imsi: '510101234567897', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 9, no: 9, msisdn: '08139878909', noSeri: '0850000193987531', imsi: '510101234567898', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 10, no: 10, msisdn: '08139878910', noSeri: '0850000193987532', imsi: '510101234567899', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  { id: 11, no: 11, msisdn: '08123456789', noSeri: '0850000200000001', imsi: '510102345678900', paket: 'Paket Super Cepat', tglKadaluarsa: '2027-01-01', lokasi: 'DEALER BARU', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202511-0010', kode: 'S300', deskripsiBarang: 'Perdana Super Cepat', blokAwal: '850000200000001', blokAkhir: '0850000200001000', jml: 1000, tanggalKadaluarsa2: '2027-01-01', tanggalDo: '2025-11-01' },
  { id: 12, no: 12, msisdn: '08123456790', noSeri: '0850000200000002', imsi: '510102345678901', paket: 'Paket Super Cepat', tglKadaluarsa: '2027-01-01', lokasi: 'DEALER BARU', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202511-0010', kode: 'S300', deskripsiBarang: 'Perdana Super Cepat', blokAwal: '850000200000001', blokAkhir: '0850000200001000', jml: 1000, tanggalKadaluarsa2: '2027-01-01', tanggalDo: '2025-11-01' },
];

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

export const mockDoaStockData: DoaStock[] = [
  { id: 1, sn: '0850000193987523', msisdn: '08139878901', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2026-05-31' },
  { id: 2, sn: '0850000193987524', msisdn: '08139878902', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Indramayu', expiredDate: '2025-08-15' },
  { id: 3, sn: '0850000193987525', msisdn: '08139878903', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Kuningan', expiredDate: '2024-09-01' },
  { id: 4, sn: '0850000193987526', msisdn: '08139878904', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-08-10' },
  { id: 5, sn: '0850000193987527', msisdn: '08139878905', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Majalengka', expiredDate: '2024-07-20' },
  { id: 6, sn: '0850000193987528', msisdn: '08139878906', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Indramayu', expiredDate: '2026-05-31' },
  { id: 7, sn: '0850000193987529', msisdn: '08139878907', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-08-15' },
  { id: 8, sn: '0850000193987530', msisdn: '08139878908', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Kuningan', expiredDate: '2026-05-31' },
  { id: 9, sn: '0850000193987531', msisdn: '08139878909', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2025-01-01' },
  { id: 10, sn: '0850000193987532', msisdn: '08139878910', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Majalengka', expiredDate: '2025-02-10' },
  { id: 11, sn: '0850000200000001', msisdn: '08123456789', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Cirebon', expiredDate: '2027-01-01' },
  { id: 12, sn: '0850000200000002', msisdn: '08123456790', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Indramayu', expiredDate: '2027-01-01' },
  { id: 13, sn: '0850000200000003', msisdn: '08123456791', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-10-10' },
  { id: 14, sn: '0850000200000004', msisdn: '08123456792', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Kuningan', expiredDate: '2024-07-01' },
  { id: 15, sn: '0850000200000005', msisdn: '08123456793', namaProduk: 'Perdana Super Cepat', paket: 'Paket Super Cepat 60 Hari', masaAktif: '60 Hari', gudang: 'Gudang Cirebon', expiredDate: '2024-08-25' },
];
