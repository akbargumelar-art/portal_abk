const express = require('express');
const cors = require('cors');
const path = require('path');

// All data is now sourced from a self-contained JS file, making the backend independent.
const { 
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
    UserRole
} = require('./data-provider');


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- Helper Functions ---
const sortData = (data, sortConfig) => {
  if (!sortConfig) return data;
  const sorted = [...data];
  sorted.sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });
  return sorted;
};

const paginateData = (data, page, limit) => {
  return data.slice((page - 1) * limit, page * limit);
};

// --- API Endpoints ---

// Auth
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  const user = MOCK_USERS[username];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Dashboard
app.post('/api/dashboard', (req, res) => {
    const { user } = req.body;
    let data = outletData;
    if (user?.role === UserRole.SALESFORCE_IDS && user.filterCriteria?.salesforce) {
        data = outletData.filter(o => o.salesforce === user.filterCriteria?.salesforce);
    }
    const stats = { totalSales: 1200000000, activeOutlets: data.length, digiposTransactions: 4890, sellOutPerdana: 12345 };
    const pjpChartData = Object.entries(data.reduce((acc, outlet) => {
        const pjp = outlet.pjp || 'Unknown';
        acc[pjp] = (acc[pjp] || 0) + 1;
        return acc;
    }, {})).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);
    const recentTransactions = data.slice(0, 4).map(outlet => ({ id: outlet.outletId, outlet: outlet.namaOutlet, product: outlet.kategori || 'N/A', amount: Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000, date: new Date(outlet.createAt).toLocaleString('en-CA') }));
    res.json({ stats, pjpChartData, salesTrend: MOCK_DASHBOARD_SALES_TREND, recentTransactions });
});

// NEW Endpoint for dynamic filter options
app.get('/api/filter-options', (req, res) => {
    const getUnique = (data, key) => [...new Set(data.map(item => item[key]).filter(Boolean))].sort();

    const options = {
        outletRegister: {
            taps: getUnique(outletData, 'tap'),
            salesforces: getUnique(outletData, 'salesforce'),
            pjps: getUnique(outletData, 'pjp'),
            kabupatens: getUnique(outletData, 'kabupaten'),
            kecamatans: getUnique(outletData, 'kecamatan'),
        },
        sellthruNota: {
            taps: getUnique(mockSellthruNotaData, 'tap'),
            salesforces: getUnique(mockSellthruNotaData, 'salesforce'),
            kategoriOutlet: getUnique(mockSellthruNotaData, 'kategoriOutlet'),
            kategoriProduk: getUnique(mockSellthruNotaData, 'kategoriProduk'),
        },
        stock: {
            taps: getUnique(mockStockOutletDetailData, 'tap'),
            salesforces: getUnique(mockStockOutletDetailData, 'salesforce'),
        },
        omzet: {
            taps: getUnique(mockOmzetOutletData, 'tap'),
            salesforces: getUnique(mockOmzetOutletData, 'salesforce'),
            kabupatens: getUnique(mockOmzetOutletData, 'kabupaten'),
            kecamatans: getUnique(mockOmzetOutletData, 'kecamatan'),
        },
        doaAlokasi: {
            namaProduk: getUnique(mockDoaAlokasiData, 'namaProduk'),
        },
        doaListSn: {
            lokasi: getUnique(mockListSnData, 'lokasi'),
            paket: getUnique(mockListSnData, 'paket'),
        },
        doaStock: {
            gudang: getUnique(mockDoaStockData, 'gudang'),
        }
    };
    res.json(options);
});


// Generic Handler for most pages
const createGenericHandler = (mockData) => (req, res) => {
    const { page = 1, limit = 15, filters = {}, searchTerm = '', sortConfig = null, user = null } = req.body;
    
    let data = mockData;
    
    // Role based filtering (example for outlets)
    if (user?.role === UserRole.SALESFORCE_IDS && user.filterCriteria?.salesforce && data[0]?.salesforce) {
        data = data.filter(o => o.salesforce === user.filterCriteria?.salesforce);
    }

    // General filtering
    const filtered = data.filter(item => {
        const searchMatch = !searchTerm || Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()));
        
        const filterMatch = Object.entries(filters).every(([key, value]) => {
            if (!value) return true; // Skip empty filters like empty strings
            
            // Handle array filters from MultiSelect
            if (Array.isArray(value)) {
                return value.length === 0 || value.includes(item[key]);
            }
            
            // Handle date range filters
            if (key === 'startDate' && item.tanggal) {
                return new Date(item.tanggal) >= new Date(value);
            }
            if (key === 'endDate' && item.tanggal) {
                return new Date(item.tanggal) <= new Date(value);
            }
            
            // Handle simple string filters
            if (typeof value === 'string' && value.length > 0) {
                 return item[key] === value;
            }

            return true;
        });
        return searchMatch && filterMatch;
    });

    const sorted = sortData(filtered, sortConfig);
    const paginated = paginateData(sorted, page, limit);

    res.json({
        data: paginated,
        total: sorted.length,
        fullFilteredData: sorted // For summary calculations on client
    });
};

// Create endpoints
app.post('/api/outlet-register', createGenericHandler(outletData));
app.post('/api/sellthru-nota', createGenericHandler(mockSellthruNotaData));
app.post('/api/stock-outlet', createGenericHandler(mockStockOutletDetailData));
app.post('/api/stock-voucher', createGenericHandler(mockStockOutletDetailData));
app.post('/api/omzet', createGenericHandler(mockOmzetOutletData));
app.post('/api/doa-alokasi', createGenericHandler(mockDoaAlokasiData));
app.post('/api/doa-list-sn', createGenericHandler(mockListSnData));
app.post('/api/doa-stock', createGenericHandler(mockDoaStockData));
app.post('/api/complaints', createGenericHandler(MOCK_COMPLAINTS));
app.post('/api/pop-requests', createGenericHandler(MOCK_POP_REQUESTS));
app.post('/api/users', createGenericHandler(Object.values(MOCK_USERS)));

// Form submission endpoint
app.post('/api/submit-visit', (req, res) => {
    console.log("Received visit form data:", req.body);
    // In a real app, you would save this to a database.
    res.status(200).json({ success: true, message: "Form submitted successfully!" });
});


app.listen(port, () => {
  console.log(`Backend server for Portal ABK is running on http://localhost:${port}`);
});