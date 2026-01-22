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
import ReportsPage from '@/pages/Reports/ReportsPage';
import SettingsPage from '@/pages/Settings/SettingsPage';
import InventoryPage from '@/pages/Inventory/InventoryPage';
import ProcurementPage from '@/pages/Procurement/ProcurementPage';
import PromotionsPage from '@/pages/Promotions/PromotionsPage';
import StoresPage from '@/pages/Stores/StoresPage';
import AuditLogsPage from '@/pages/AuditLogs/AuditLogsPage';
import UserManagementPage from '@/pages/UserManagement/UserManagementPage';

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
                                <StoresPage />
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

                {/* 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
