import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const SalesforceVisitForm = lazy(() => import('./pages/SalesforceVisitForm'));
const InputFormPage = lazy(() => import('./pages/InputFormPage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const KomplainPage = lazy(() => import('./pages/KomplainPage'));
const MonitoringPopPage = lazy(() => import('./pages/MonitoringPopPage'));
const UserManagementPage = lazy(() => import('./pages/admin/UserManagementPage'));
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettingsPage'));

// New lazy loaded pages
const OutletRegisterPage = lazy(() => import('./pages/OutletRegisterPage'));
const SellthruNotaPage = lazy(() => import('./pages/SellthruNotaPage'));
const SellthruDigiposPage = lazy(() => import('./pages/SellthruDigiposPage'));
const StockOutletPage = lazy(() => import('./pages/StockOutletPage'));
const OmzetOutletPage = lazy(() => import('./pages/OmzetOutletPage'));
const KpiClusterPage = lazy(() => import('./pages/KpiClusterPage'));
const KpiSalesforcePage = lazy(() => import('./pages/KpiSalesforcePage'));
const ManagementFeePage = lazy(() => import('./pages/ManagementFeePage'));
const AktifasiPage = lazy(() => import('./pages/AktifasiPage'));
const SelloutPage = lazy(() => import('./pages/SelloutPage'));
const InjectVoucherFisikPage = lazy(() => import('./pages/InjectVoucherFisikPage'));
const RedeemVoucherFisikPage = lazy(() => import('./pages/RedeemVoucherFisikPage'));
const DoaAlokasiPage = lazy(() => import('./pages/DoaAlokasiPage'));
const DoaListSnPage = lazy(() => import('./pages/DoaListSnPage'));
const DoaStockPage = lazy(() => import('./pages/DoaStockPage'));
const BudgetBusinessPlanPage = lazy(() => import('./pages/BudgetBusinessPlanPage'));
const FeePage = lazy(() => import('./pages/FeePage'));
const SCSPage = lazy(() => import('./pages/SCSPage'));
const TopLinePage = lazy(() => import('./pages/TopLinePage'));


const LoadingFallback: React.FC = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-telkomsel-red"></div>
  </div>
);

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <LoadingFallback />;
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = React.useContext(AuthContext)!;

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* New Routes */}
        <Route path="outlet-register" element={<OutletRegisterPage />} />
        <Route path="sellthru/nota" element={<SellthruNotaPage />} />
        <Route path="sellthru/digipos" element={<SellthruDigiposPage />} />
        <Route path="program-berjalan" element={<Navigate to="/program-berjalan/scs" replace />} />
        <Route path="program-berjalan/scs" element={<SCSPage />} />
        <Route path="stock-outlet" element={<StockOutletPage />} />
        <Route path="omzet-outlet" element={<OmzetOutletPage />} />
        <Route path="kpi" element={<Navigate to="/kpi/cluster" replace />} />
        <Route path="kpi/cluster" element={<KpiClusterPage />} />
        <Route path="kpi/salesforce" element={<KpiSalesforcePage />} />
        <Route path="fee" element={<Navigate to="/fee/fee" replace />} />
        <Route path="fee/fee" element={<FeePage />} />
        <Route path="fee/management-fee" element={<ManagementFeePage />} />
        <Route path="fee/budget-businessplan" element={<BudgetBusinessPlanPage />} />
        <Route path="aktifasi" element={<AktifasiPage />} />
        <Route path="sellout" element={<SelloutPage />} />
        <Route path="inject-voucher-fisik" element={<InjectVoucherFisikPage />} />
        <Route path="redeem-voucher-fisik" element={<RedeemVoucherFisikPage />} />
        <Route path="performansi/top-line" element={<TopLinePage />} />
        <Route path="doa" element={<Navigate to="/doa/alokasi" replace />} />
        <Route path="doa/alokasi" element={<DoaAlokasiPage />} />
        <Route path="doa/list-sn" element={<DoaListSnPage />} />
        <Route path="doa/stock" element={<DoaStockPage />} />
        
        <Route path="dokumentasi" element={<DocumentationPage />} />
        <Route path="dokumentasi/form-salesforce-ids" element={<SalesforceVisitForm />} />
        
        <Route path="input-form" element={<InputFormPage />} />
        <Route path="input-form/*" element={<div>Halaman Detail Form</div>} />
        <Route path="video" element={<VideoPage />} />
        <Route path="komplain" element={<KomplainPage />} />
        <Route path="monitoring-pop" element={<MonitoringPopPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="profile-settings" element={<ProfileSettingsPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;