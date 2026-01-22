import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShoppingCart } from 'lucide-react';

export default function SplashScreenPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) return;

            if (isAuthenticated) {
                navigate('/dashboard');
            } else {
                navigate('/welcome');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate, isAuthenticated, isLoading]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
            <div className="text-center space-y-8 animate-fade-in">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                        <div className="relative bg-primary text-primary-foreground p-6 rounded-3xl shadow-2xl">
                            <ShoppingCart className="w-16 h-16" />
                        </div>
                    </div>
                </div>

                {/* App Name */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        POS Master
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Multi-Tenant Point of Sale System
                    </p>
                </div>

                {/* Loading Indicator */}
                <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </div>
        </div>
    );
}
