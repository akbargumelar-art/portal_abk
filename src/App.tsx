import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import { UserRole } from './types';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SagalaPage = lazy(() => import('./pages/SagalaPage'));
const DataUploadCenterPage = lazy(() => import('./pages/DataUploadCenterPage'));
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
const StockVoucherOutletPage = lazy(() => import('./pages/StockVoucherOutletPage'));
const OmzetOutletPage = lazy(() => import('./pages/OmzetOutletPage'));
const KpiClusterPage = lazy(() => import('./pages/KpiClusterPage'));
const KpiSalesforcePage = lazy(() => import('./pages/KpiSalesforcePage'));
const KpiD2cPage = lazy(() => import('./pages/KpiD2cPage'));
const PenjualanD2cPage = lazy(() => import('./pages/PenjualanD2cPage'));
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
const RetinaPage = lazy(() => import('./pages/RetinaPage'));
const TopLinePage = lazy(() => import('./pages/TopLinePage'));
const MarketSharePage = lazy(() => import('./pages/MarketSharePage'));
const UploadDatabasePage = lazy(() => import('./pages/UploadDatabasePage'));
const DatabaseSettingsPage = lazy(() => import('./pages/admin/DatabaseSettingsPage'));
const SalesPlanPerdanaPage = lazy(() => import('./pages/SalesPlanPerdanaPage'));
const SalesPlanVoucherFisikPage = lazy(() => import('./pages/SalesPlanVoucherFisikPage'));
const SalesPlanCvmPage = lazy(() => import('./pages/SalesPlanCvmPage'));
const SalesPlanMonitoringVisitPage = lazy(() => import('./pages/SalesPlanMonitoringVisitPage'));


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
  const { user, isAuthenticated, loading } = React.useContext(AuthContext)!;

  if (loading) {
    return <LoadingFallback />;
  }
  
  const DefaultRedirect: React.FC = () => {
    if (!user) return <Navigate to="/login" replace />;
    
    if (user.role === UserRole.ADMIN_INPUT) {
      return <Navigate to="/data-upload-center" replace />;
    }
    
    return <Navigate to="/dashboard" replace />;
  };

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<DefaultRedirect />} />
        
        {/* Routes for Admin Input */}
        {user?.role === UserRole.ADMIN_INPUT && (
          <>
            <Route path="data-upload-center" element={<Navigate to="/data-upload-center/upload-database" replace />} />
            <Route path="data-upload-center/upload-database" element={<UploadDatabasePage />} />
            <Route path="data-upload-center/file-management" element={<DataUploadCenterPage />} />
          </>
        )}

        {/* Routes for other users */}
        {user?.role !== UserRole.ADMIN_INPUT && (
          <>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="sagala" element={<SagalaPage />} />
            <Route path="outlet" element={<Navigate to="/outlet/register" replace />} />
            <Route path="outlet/register" element={<OutletRegisterPage />} />
            <Route path="outlet/stock" element={<StockOutletPage />} />
            <Route path="outlet/stock-voucher" element={<StockVoucherOutletPage />} />
            <Route path="outlet/omzet" element={<OmzetOutletPage />} />
            <Route path="salesplan" element={<Navigate to="/salesplan/perdana" replace />} />
            <Route path="salesplan/perdana" element={<SalesPlanPerdanaPage />} />
            <Route path="salesplan/voucher-fisik" element={<SalesPlanVoucherFisikPage />} />
            <Route path="salesplan/cvm" element={<SalesPlanCvmPage />} />
            <Route path="salesplan/monitoring-visit" element={<SalesPlanMonitoringVisitPage />} />
            <Route path="sellthru/nota" element={<SellthruNotaPage />} />
            <Route path="sellthru/digipos" element={<SellthruDigiposPage />} />
            <Route path="sellthru/penjualan-d2c" element={<PenjualanD2cPage />} />
            <Route path="program" element={<Navigate to="/program/scs" replace />} />
            <Route path="program/scs" element={<SCSPage />} />
            <Route path="program/retina" element={<RetinaPage />} />
            <Route path="kpi" element={<Navigate to="/kpi/cluster" replace />} />
            <Route path="kpi/cluster" element={<KpiClusterPage />} />
            <Route path="kpi/salesforce" element={<KpiSalesforcePage />} />
            <Route path="kpi/d2c" element={<KpiD2cPage />} />
            <Route path="fee" element={<Navigate to="/fee/fee" replace />} />
            <Route path="fee/fee" element={<FeePage />} />
            <Route path="fee/management-fee" element={<ManagementFeePage />} />
            <Route path="fee/budget-businessplan" element={<BudgetBusinessPlanPage />} />
            <Route path="aktifasi" element={<AktifasiPage />} />
            <Route path="sellout" element={<SelloutPage />} />
            <Route path="inject-voucher-fisik" element={<InjectVoucherFisikPage />} />
            <Route path="redeem-voucher-fisik" element={<RedeemVoucherFisikPage />} />
            <Route path="performansi/top-line" element={<TopLinePage />} />
            <Route path="performansi/market-share" element={<MarketSharePage />} />
            <Route path="doa" element={<Navigate to="/doa/alokasi" replace />} />
            <Route path="doa/alokasi" element={<DoaAlokasiPage />} />
            <Route path="doa/list-sn" element={<DoaListSnPage />} />
            <Route path="doa/stock" element={<DoaStockPage />} />
            <Route path="dokumentasi" element={<Navigate to="/dokumentasi/form-kunjungan" replace />} />
            <Route path="dokumentasi/form-kunjungan" element={<DocumentationPage />} />
            <Route path="dokumentasi/form-salesforce-ids" element={<SalesforceVisitForm />} />
            <Route path="dokumentasi/input-form" element={<InputFormPage />} />
            <Route path="dokumentasi/input-form/*" element={<div>Halaman Detail Form</div>} />
            <Route path="dokumentasi/video" element={<VideoPage />} />
            <Route path="dokumentasi/komplain" element={<KomplainPage />} />
            <Route path="monitoring-pop" element={<MonitoringPopPage />} />
            <Route path="data-upload-center" element={<Navigate to="/data-upload-center/upload-database" replace />} />
            <Route path="data-upload-center/upload-database" element={<UploadDatabasePage />} />
            <Route path="data-upload-center/file-management" element={<DataUploadCenterPage />} />
             {user?.role === UserRole.ADMIN_SUPER && (
              <Route path="data-upload-center/database-settings" element={<DatabaseSettingsPage />} />
            )}
            <Route path="user-management" element={<UserManagementPage />} />
          </>
        )}
        
        {/* Common routes */}
        <Route path="profile-settings" element={<ProfileSettingsPage />} />
        
        {/* Fallback redirect */}
        <Route path="*" element={<DefaultRedirect />} />
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
