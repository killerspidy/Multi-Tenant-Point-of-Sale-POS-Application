import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

// Pages - will be created
import SplashScreenPage from '@/pages/Splash/SplashScreenPage';
import WelcomePage from '@/pages/Welcome/WelcomePage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage';
import PageNotFound from '@/pages/PageNotFound';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import POSPage from '@/pages/POS/POSPage';
import ProductsPage from '@/pages/Products/ProductsPage';
import CustomersPage from '@/pages/Customers/CustomersPage';
import CustomerDetailPage from '@/pages/Customers/CustomerDetailPage';
import LoyaltyProgramPage from '@/pages/Customers/LoyaltyProgramPage';
import ReportsPage from '@/pages/Reports/ReportsPage';
import SettingsPage from '@/pages/Settings/SettingsPage';
import InventoryPage from '@/pages/Inventory/InventoryPage';
import ProcurementPage from '@/pages/Procurement/ProcurementPage';
import PromotionsPage from '@/pages/Promotions/PromotionsPage';

import AuditLogsPage from '@/pages/AuditLogs/AuditLogsPage';
import UserManagementPage from '@/pages/UserManagement/UserManagementPage';
import SubscriptionPage from '@/pages/Subscription/SubscriptionPage';
import BrandingPage from '@/pages/Settings/BrandingPage';
import AutomationRulesPage from '@/pages/Inventory/AutomationRulesPage';
import AnalyticsDashboardPage from '@/pages/Reports/AnalyticsDashboardPage';
import UserProfilePage from '@/pages/Settings/UserProfilePage';
import StoreManagerDashboard from '@/pages/Dashboard/StoreManagerDashboard';
import HRManagementPage from '@/pages/HR/HRManagementPage';
import BranchManagementPage from '@/pages/Admin/BranchManagementPage';
import TenantSettingsPage from '@/pages/Admin/TenantSettingsPage';
import PaymentGatewaysPage from '@/pages/Settings/PaymentGatewaysPage';
import IntegrationSettingsPage from '@/pages/Settings/IntegrationSettingsPage';
import HeldOrdersPage from '@/pages/POS/HeldOrdersPage';
import LabelPrinterPage from '@/pages/Inventory/LabelPrinterPage';
import PurchaseRequisitionPage from '@/pages/Procurement/PurchaseRequisitionPage';
import GoodsReceiptPage from '@/pages/Procurement/GoodsReceiptPage';
import ShiftManagementPage from '@/pages/POS/ShiftManagementPage';
import ReturnRefundPage from '@/pages/POS/ReturnRefundPage';

// Main app layout
import MainAppLayout from '@/components/layouts/app/MainAppLayout';

// Protected route wrapper
function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <SplashScreenPage />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

// Public route wrapper (redirect to dashboard if already authenticated)
function PublicRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <SplashScreenPage />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<SplashScreenPage />} />
                <Route
                    path="/welcome"
                    element={
                        <PublicRoute>
                            <WelcomePage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPasswordPage />
                        </PublicRoute>
                    }
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <DashboardPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pos"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <POSPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <ProductsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customers/loyalty"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <LoyaltyProgramPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <CustomersPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customers/:id"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <CustomerDetailPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <ReportsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings/payments"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <PaymentGatewaysPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings/integrations"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <IntegrationSettingsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <SettingsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <InventoryPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/procurement"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <ProcurementPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/promotions"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <PromotionsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/stores"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <BranchManagementPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/audit-logs"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <AuditLogsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <UserManagementPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings/tenant"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <TenantSettingsPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/subscription"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <SubscriptionPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/branding"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <BrandingPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/automation-rules"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <AutomationRulesPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <AnalyticsDashboardPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <UserProfilePage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Advanced POS Features */}
                <Route
                    path="/pos/shift"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <ShiftManagementPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pos/returns"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <ReturnRefundPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pos/held-orders"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <HeldOrdersPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Advanced Inventory */}
                <Route
                    path="/inventory/labels"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <LabelPrinterPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Advanced Procurement */}
                <Route
                    path="/procurement/requisition"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <PurchaseRequisitionPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/procurement/goods-receipt"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <GoodsReceiptPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Advanced Dashboards */}
                <Route
                    path="/dashboard/store-manager"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <StoreManagerDashboard />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* HR & Payroll */}
                <Route
                    path="/hr"
                    element={
                        <ProtectedRoute>
                            <MainAppLayout>
                                <HRManagementPage />
                            </MainAppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
