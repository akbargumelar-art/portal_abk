// This file consolidates all mock data into a single, backend-friendly (CommonJS) module.
// This decouples the backend from the frontend's TypeScript source files.

const UserRole = {
  ADMIN_SUPER: 'Admin Super',
  ADMIN_INPUT: 'Admin Input Data',
  MANAGER: 'Manager',
  SUPERVISOR_IDS: 'Supervisor (IDS)',
  SUPERVISOR_D2C: 'Supervisor Direct Sales (D2C)',
  SALESFORCE_IDS: 'Salesforce (IDS)',
  DIRECT_SALES_D2C: 'Direct Sales (D2C)',
};

const MOCK_USERS = {
  admin_super: { id: 'usr-001', name: 'Agus Purnomo', role: UserRole.ADMIN_SUPER, avatarUrl: 'https://i.pravatar.cc/150?u=agus' },
  admin_input: { id: 'usr-002', name: 'Budi Santoso', role: UserRole.ADMIN_INPUT, avatarUrl: 'https://i.pravatar.cc/150?u=budi' },
  manager: { id: 'usr-003', name: 'Citra Lestari', role: UserRole.MANAGER, avatarUrl: 'https://i.pravatar.cc/150?u=citra' },
  supervisor_ids: { id: 'usr-004', name: 'Dewi Anggraini', role: UserRole.SUPERVISOR_IDS, avatarUrl: 'https://i.pravatar.cc/150?u=dewi' },
  supervisor_d2c: { id: 'usr-005', name: 'Eka Wijaya', role: UserRole.SUPERVISOR_D2C, avatarUrl: 'https://i.pravatar.cc/150?u=eka' },
  salesforce_ids: { id: 'usr-006', name: 'Fajar Nugraha', role: UserRole.SALESFORCE_IDS, avatarUrl: 'https://i.pravatar.cc/150?u=fajar', filterCriteria: { salesforce: 'Kuningan' } },
  direct_sales_d2c: { id: 'usr-007', name: 'Gita Permata', role: UserRole.DIRECT_SALES_D2C, avatarUrl: 'https://i.pravatar.cc/150?u=gita', filterCriteria: { tap: 'Pemuda' } },
};

const MOCK_DASHBOARD_SALES_TREND = [
  { month: 'Feb', sales: 4500 }, { month: 'Mar', sales: 4800 }, { month: 'Apr', sales: 4700 },
  { month: 'Mei', sales: 5100 }, { month: 'Jun', sales: 5500 }, { month: 'Jul', sales: 5300 },
];

const MOCK_COMPLAINTS = [
  { id: 'comp1', user: 'Fajar Nugraha', role: UserRole.SALESFORCE_IDS, date: '2024-07-21', subject: 'Stok voucher fisik kosong', status: 'Open', details: 'Stok voucher fisik 5rb di gudang Cirebon habis.' },
  { id: 'comp2', user: 'Gita Permata', role: UserRole.DIRECT_SALES_D2C, date: '2024-07-20', subject: 'Aplikasi DigiPOS lambat', status: 'In Progress', details: 'Aplikasi DigiPOS sering hang saat transaksi.' },
  { id: 'comp3', user: 'Fajar Nugraha', role: UserRole.SALESFORCE_IDS, date: '2024-07-19', subject: 'Pengiriman POP Material terlambat', status: 'Resolved', details: 'Pengiriman spanduk untuk outlet 2100005843 terlambat 3 hari.' },
];

const MOCK_POP_REQUESTS = [
  { id: 'pop1', outletId: '2100005843', outletName: 'ODONG CELL', requester: 'Fajar Nugraha', date: '2024-07-20', items: [{ item: 'Spanduk', qty: 2 }, { item: 'Poster', qty: 5 }], status: 'Diajukan' },
  { id: 'pop2', outletId: '2100005761', outletName: 'DELLA CELL', requester: 'Fajar Nugraha', date: '2024-07-19', items: [{ item: 'Brosur', qty: 100 }], status: 'Diproses' },
  { id: 'pop3', outletId: '2100019680', outletName: 'SENJA CELL', requester: 'Budi Santoso', date: '2024-07-18', items: [{ item: 'Spanduk', qty: 1 }], status: 'Terkirim' },
  { id: 'pop4', outletId: '2100004430', outletName: 'I CELL', requester: 'Fajar Nugraha', date: '2024-07-15', items: [{ item: 'Poster', qty: 10 }], status: 'Terpasang' },
];

// Data from data/outlets.ts
const outletCsvData = `CREATE_AT,OUTLET_ID,NAMA_OUTLET,KELURAHAN,KECAMATAN,KABUPATEN,CLUSTER,BRANCH,REGIONAL,AREA,LONGITUDE,LATTITUDE,NO_RS,NO_KONFIRMASI,KATEGORI,TIPE_OUTLET,FISIK,TIPE_LOKASI,KLASIFIKASI,SF_CODE,PJP,FLAG,TAP,Salesforce
2011-05-19,2100005843,ODONG CELL,CILAJA,KRAMATMULYA,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4677467,-6.985545,81214011935,81214011935,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-33,PJP,PJP FISIK,Kuningan,
2011-05-19,2100005761,DELLA CELL,CIEURIH,CIDAHU,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.6392547,-7.0185773,81312490344,81312490344,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-36,PJP,PJP FISIK,Kuningan,
2017-10-06,2100019680,SENJA CELL ,KEDUNGDALEM,GEGESIK,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4222798,-6.59140735,81394312092,81394312092,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-13,PJP,PJP FISIK,Palimanan,
2013-08-26,2100004430,I CELL,GINTUNG LOR,SUSUKAN,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4206303,-6.6791706,81312553341,81312553341,TELCO,Counter Pulsa,FISIK,Perumahan,BRONZE,SF-CRB-RAYA-14,PJP,PJP FISIK,Palimanan,
2020-06-03,2201003369,chefoh cell 2,SILEBU,PANCALANG,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4788208,-6.8210812,82121110002,82121110002,TELCO,Counter Pulsa,FISIK,Perumahan,BRONZE,SF-CRB-RAYA-31,PJP,PJP FISIK,Kuningan,
2024-11-29,2201046711,NZF 1 Cell,KEL. CIPORANG,KUNINGAN,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4859903,-6.9725542,82130303226,82130303226,,,FISIK,,,SF-CRB-RAYA-30,PJP,PJP FISIK,Kuningan,
2018-09-25,2100030547,81RELOAD2,KEL. KEJAKSAN,KEJAKSAN,KOTA CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5564646,-6.7052008,82117771755,82117771755,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-06,PJP,PJP FISIK,Pemuda,
2024-12-23,2201049199,N konter,GEGESIK WETAN,GEGESIK,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4427698,-6.70879228,81222155287,81222155287,,,FISIK,,,SF-CRB-RAYA-13,PJP,PJP FISIK,Palimanan,
2015-11-05,2100005023,YATHIE CELL,PANEMBAHAN,PLERED,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5137267,-6.701395,81322859912,81322859912,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-17,PJP,PJP FISIK,Palimanan,
2017-09-18,2100017683,BY 18 CELL 2,KARANGWARENG,KARANGWARENG,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.64378,-6.867128333,81220832068,81220832068,TELCO,Counter Pulsa,FISIK,,SILVER,SF-CRB-RAYA-22,PJP,PJP FISIK,Palimanan,
2024-02-01,2201038327,ASIA COMUNIKA,CIKULAK,WALED,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.6188964,-6.8249933,85150545728,85150545728,,,FISIK,,,SF-CRB-RAYA-21,PJP,PJP FISIK,Palimanan,
2020-03-14,2201001958,anscell3,LURAGUNG LANDEUH,LURAGUNG,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.6392817,-7.018553333,82216934132,82216934132,NON_TELCO,TOKO,FISIK,Pertokoan,BRONZE,SF-CRB-RAYA-34,PJP,PJP FISIK,Kuningan,
2014-12-23,2100004812,fauzan cell,TAMBELANG,KARANGSEMBUNG,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.6406833,-6.846788333,81220811467,81220811467,NON_TELCO,Warung,FISIK,,BRONZE,SF-CRB-RAYA-19,PJP,PJP FISIK,Palimanan,
2024-12-14,2201047464,KUOTA cell,KEL. KEJAKSAN,KEJAKSAN,KOTA CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5257119,-6.72585482,85147721378,85147721378,,,FISIK,,,SF-CRB-RAYA-06,PJP,PJP FISIK,Pemuda,
2024-12-26,2201049256,monti cell,LEUWIDINGDING,LEMAHABANG,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.618944,-6.8249796,81324173801,81324173801,,,FISIK,,,SF-CRB-RAYA-20,PJP,PJP FISIK,Palimanan,
2024-12-26,2201049247,Putracel,CIPASUNG,DARMA,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4237342,-7.0940636,82114239937,82114239937,,,FISIK,,,SF-CRB-RAYA-32,PJP,PJP FISIK,Kuningan,
2015-04-11,2100004875,SHANDI CELL,KERTASARI,WERU,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5477405,-6.7290944,81214599185,81214599185,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-02,PJP,PJP FISIK,Palimanan,
2025-03-19,2201051474,AZKIA CELL,PASAYANGAN,LEBAKWANGI,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5943624,-7.0211244,85129933404,85129933404,,,FISIK,,,SF-CRB-RAYA-38,PJP,PJP FISIK,Kuningan,
2023-11-15,2201036969,RATU CELL,MERTAPADA KULON,ASTANAJAPURA,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.618895,-6.824955,85320215657,85320215657,,,FISIK,,,SF-CRBN-RAYA-24,PJP,PJP FISIK,Palimanan,
2021-01-26,2201008644,G-KING 2 Cell,KEL. KEJAKSAN,KEJAKSAN,KOTA CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5564726,-6.705103,81223078438,81223078438,,,FISIK,,,SF-CRB-RAYA-06,PJP,PJP FISIK,Pemuda,
2024-08-23,2201044879,DJARUM 76 CELL,GEBANG KULON,GEBANG,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.6190123,-6.824920066,82317024466,82317024466,,,FISIK,,,SF-CRB-RAYA-23,PJP,PJP FISIK,Palimanan,
2015-10-21,2100004923,RESTU DEPOK,WARUKAWUNG,DEPOK,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4259355,-6.6983318,82118905393,82118905393,TELCO,Counter Pulsa,FISIK,Sekolah,PLATINUM,SF-CRB-RAYA-11,PJP,PJP FISIK,Palimanan,
2017-05-26,2100007195,81320267321-W ARYA,CIDAHU,PASAWAHAN,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.6097382,-6.966568,81320267321,81320267321,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-36,PJP,PJP FISIK,Kuningan,
2021-11-04,2201016261,JOKER CELL,MAYUNG,GUNUNG JATI,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5325117,-6.723576667,85329292029,85329292029,,,FISIK,,,SF-CRB-RAYA-04,PJP,PJP FISIK,Palimanan,
2025-02-21,2201050903,AGUS CELL 2,SELAJAMBE,SELAJAMBE,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4631827,-7.11878,85324001904,85324001904,,,FISIK,,,SF-CRB-RAYA-32,PJP,PJP FISIK,Kuningan,
2023-03-09,2201031167,VENUS CELL,KEL. KALIJAGA,HARJAMUKTI,KOTA CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5553793,-6.7611829,82317499037,82317499037,,,FISIK,,,SF-CRB-RAYA-10,PJP,PJP FISIK,Pemuda,
2018-04-11,2100029912,Ar Cell,PAMIJAHAN,PLUMBON,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4778867,-6.7019317,82117772129,82117772129,TELCO,Counter Pulsa,FISIK,,BRONZE,SF-CRB-RAYA-15,PJP,PJP FISIK,Palimanan,
2025-03-26,2201051590,acc cell,PURWASARI,GARAWANGI,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.52768,-6.8232783,82123674909,82123674909,,,FISIK,,,SF-CRB-RAYA-26,PJP,PJP FISIK,Kuningan,
2023-04-03,2201031896,Cahaya Cell,LEBAKSIUH,CIAWIGEBANG,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5804621,-6.9836907,82315095251,82315095251,,,FISIK,,,SF-CRB-RAYA-40,PJP,PJP FISIK,Kuningan,
2011-05-24,2100003896,ONAL CELL,KALIKOA,KEDAWUNG,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.4763829,-6.7065999,82118782940,82118782940,TELCO,Counter Pulsa,FISIK,Universitas,PLATINUM,SF-CRB-RAYA-08,PJP,PJP FISIK,Palimanan,
2017-07-28,2100005642,KHOERUL CELL,GEBANG KULON,GEBANG,CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.7216737,-6.8181525,81220811874,81220811874,TELCO,Counter Pulsa,FISIK,Sekolah,BRONZE,SF-CRB-RAYA-23,PJP,PJP FISIK,Palimanan,
2025-03-26,2201051589,ZR cell,GARAWANGI,GARAWANGI,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.559685,-7.0054067,82114124107,82114124107,,,FISIK,,,SF-CRB-RAYA-26,PJP,PJP FISIK,Kuningan,
2024-12-07,2201046925,GHIGHA CELL,KEL. JAGASATRU,PEKALIPAN,KOTA CIREBON,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5719588,-6.7253464,85324710576,85324710576,,,FISIK,,,SF-CRB-RAYA-09,PJP,PJP FISIK,Pemuda,
2011-12-14,2100006216,82126180200-RED STAR,MALEBER,MALEBER,KUNINGAN,CIREBON RAYA,CIREBON,JABAR,JABOTABEK & JABAR,108.5596517,-7.0053983,82126180200,82126180200,TELCO,Counter Pulsa,FISIK,Sekolah,GOLD,SF-CRB-RAYA-26,PJP,PJP FISIK,Kuningan`;
function parseCSV(csv) {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const headerMap = { 'CREATE_AT': 'createAt', 'OUTLET_ID': 'outletId', 'NAMA_OUTLET': 'namaOutlet', 'KELURAHAN': 'kelurahan', 'KECAMATAN': 'kecamatan', 'KABUPATEN': 'kabupaten', 'CLUSTER': 'cluster', 'BRANCH': 'branch', 'REGIONAL': 'regional', 'AREA': 'area', 'LONGITUDE': 'longitude', 'LATTITUDE': 'lattitude', 'NO_RS': 'noRs', 'NO_KONFIRMASI': 'noKonfirmasi', 'KATEGORI': 'kategori', 'TIPE_OUTLET': 'tipeOutlet', 'FISIK': 'fisik', 'TIPE_LOKASI': 'tipeLokasi', 'KLASIFIKASI': 'klasifikasi', 'SF_CODE': 'sfCode', 'PJP': 'pjp', 'FLAG': 'flag', 'TAP': 'tap', 'Salesforce': 'salesforce' };
  const camelCaseHeaders = headers.map(h => headerMap[h] || h.toLowerCase());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    camelCaseHeaders.forEach((key, index) => { obj[key] = values[index]?.trim() || ''; });
    return obj;
  });
}
const outletData = parseCSV(outletCsvData);

// Data from data/sellthruNota.ts
const mockSellthruNotaData = [
  { id: '1', tanggal: '2024-07-28', idDigipos: 'DIGI001', noRs: '81214011935', namaOutlet: 'SUKSES BERKAH CELL', kategoriOutlet: 'Pareto Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'CIAMIS', kecamatan: 'CIAMIS', detailProduk: 'VF Data 5K 3 Hari', kategoriProduk: 'Voucher 5K', merk: 'Simpati', type: 'Voucher Fisik', kuantiti: 10, harga: 4800 },
  { id: '2', tanggal: '2024-07-28', idDigipos: 'DIGI002', noRs: '81214011936', namaOutlet: 'ODONG CELL', kategoriOutlet: 'Retail', tap: 'PEMUDA', salesforce: 'Ahmad Gunawan', kabupaten: 'KUNINGAN', kecamatan: 'KRAMATMULYA', detailProduk: 'SP Super Seru 10GB', kategoriProduk: 'SP Super Seru', merk: 'Simpati', type: 'Perdana', kuantiti: 5, harga: 12000 },
  // ... more data
];

// Data from data/stockOutlet.ts
const mockStockOutletDetailData = [
  { id: '1', outlet_id: '2201002014', no_rs: '81214011935', nama_outlet: 'SUKSES BERKAH CELL', kelurahan: 'SUKADANA', kecamatan: 'CIAMIS', kabupaten: 'CIAMIS', tap: 'PEMUDA', pjp: 'PJP KAMIS', salesforce: 'Ahmad Gunawan', penjualan_perdana_olimpiade: 10, penjualan_perdana_beli: 10, sell_out_olimpiade: 9, sell_out_beli: 0, stok_akhir_perdana_olimpiade: 9, stok_akhir_perdana_beli: 4, penjualan_voucher_olimpiade: 0, penjualan_voucher_beli: 13, redeem_olimpiade: 9, redeem_beli: 0, stok_akhir_voucher_olimpiade: 9, stok_akhir_voucher_beli: 4 },
  // ... more data
];

// Data from data/omzetOutlet.ts
const mockOmzetOutletData = [
  { id: '1', outlet_id: '2201002014', no_rs: '81214011935', nama_outlet: 'SUKSES BERKAH CELL', salesforce: 'Ahmad Gunawan', tap: 'PEMUDA', kabupaten: 'CIAMIS', kecamatan: 'CIAMIS', flag: 'PJP FISIK', pjp: 'KAMIS', transaksi_fm1: 13, transaksi_m1: 15, transaksi_m: 13, revenue_fm1: 130000, revenue_m1: 150000, revenue_m: 130000 },
  // ... more data
];

// Data from data/doa.ts
const mockDoaAlokasiData = [
  { id: 1, tanggal: '2024-07-01', namaProduk: 'Voucher Fisik 5K', kuantiti: 100, harga: 4500 },
  // ... more data
];
const mockListSnData = [
  { id: 1, no: 1, msisdn: '08139878901', noSeri: '0850000193987523', imsi: '510101234567890', paket: 'ISP Preload 30 Hari', tglKadaluarsa: '2026-05-31', lokasi: 'PT. AGRABUDI KOMUNIKA', kategoriLokasi: 'DEALER', doNum: 'DO-222000RG-202510-0068', kode: 'S276', deskripsiBarang: 'Perdana Preload Indirect Territory', blokAwal: '850000193987523', blokAkhir: '0850000193988610', jml: 1088, tanggalKadaluarsa2: '2026-05-31', tanggalDo: '2025-10-14' },
  // ... more data
];
const mockDoaStockData = [
  { id: 1, sn: '0850000193987523', msisdn: '08139878901', namaProduk: 'Perdana Preload', paket: 'ISP Preload 30 Hari', masaAktif: '30 Hari', gudang: 'Gudang Cirebon', expiredDate: '2026-05-31' },
  // ... more data
];


module.exports = {
    UserRole,
    MOCK_USERS,
    MOCK_DASHBOARD_SALES_TREND,
    MOCK_COMPLAINTS,
    MOCK_POP_REQUESTS,
    outletData,
    mockSellthruNotaData,
    mockStockOutletDetailData,
    mockOmzetOutletData,
    mockDoaAlokasiData,
    mockListSnData,
    mockDoaStockData,
};
