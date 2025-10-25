const express = require('express');
const cors = require('cors');
const path = require('path');

// In a real app, this data would come from a database.
// For now, we import it from the mock data files.
// NOTE: This simple setup requires data files to be in CommonJS format (using module.exports).
// For this project, we've duplicated the data here to avoid module conflicts.
const { MOCK_USERS, MOCK_DASHBOARD_SALES_TREND, MOCK_COMPLAINTS, MOCK_POP_REQUESTS } = require('../constants');
const { outletData } = require('../data/outlets');
const { mockSellthruNotaData } = require('../data/sellthruNota');
const { mockStockOutletDetailData } = require('../data/stockOutlet');
const { mockOmzetOutletData } = require('../data/omzetOutlet');
const { mockDoaAlokasiData, mockListSnData, mockDoaStockData } = require('../data/doa');
const { UserRole } = require('../types');


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
            if (Array.isArray(value) && value.length > 0) {
                return value.includes(item[key]);
            }
            // Add date filtering logic if needed
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
    // In a real app, you would save this to a database and trigger a webhook.
    res.status(200).json({ success: true, message: "Form submitted and webhook triggered successfully!" });
});


app.listen(port, () => {
  console.log(`Backend server for Portal ABK is running on http://localhost:${port}`);
});
