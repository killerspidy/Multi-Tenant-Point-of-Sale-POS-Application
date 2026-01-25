
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { StoreProvider } from '@/contexts/StoreContext';
import { DataProvider } from '@/contexts/DataContext';
import { POSProvider } from '@/contexts/POSContext';
import { AppRouter } from '@/navigation/AppRouter';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <StoreProvider>
                    <DataProvider>
                        <POSProvider>
                            <ErrorBoundary>
                                <AppRouter />
                            </ErrorBoundary>
                        </POSProvider>
                    </DataProvider>
                </StoreProvider>
                <Toaster richColors position="top-right" />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
