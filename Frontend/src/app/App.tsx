import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRouter } from '@/navigation/AppRouter';
import { Toaster } from '@/components/ui/sonner';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppRouter />
                <Toaster richColors position="top-right" />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
