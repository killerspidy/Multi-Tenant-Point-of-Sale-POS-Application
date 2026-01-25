import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'super_admin' | 'tenant_admin' | 'store_manager' | 'cashier' | 'inventory_manager' | 'report_analyst';
    tenantId: string;
    storeType: 'general' | 'medical' | 'electronics' | 'fashion'; // SaaS Plan
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
    companyName: string;
    storeType: 'general' | 'medical' | 'electronics' | 'fashion';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS: User[] = [
    {
        id: '1',
        email: 'admin@example.com',
        name: 'John Admin',
        role: 'tenant_admin',
        tenantId: 'tenant-1',
        storeType: 'electronics',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    {
        id: '2',
        email: 'manager@example.com',
        name: 'Sarah Manager',
        role: 'store_manager',
        tenantId: 'tenant-1',
        storeType: 'electronics',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
        id: '3',
        email: 'cashier@example.com',
        name: 'Mike Cashier',
        role: 'cashier',
        tenantId: 'tenant-1',
        storeType: 'electronics',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock authentication - accept any password for demo users
        const foundUser = MOCK_USERS.find(u => u.email === email);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('user', JSON.stringify(foundUser));
        } else {
            throw new Error('Invalid credentials');
        }

        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create new mock user
        const newUser: User = {
            id: Date.now().toString(),
            email: data.email,
            name: data.name,
            role: 'tenant_admin',
            tenantId: `tenant-${Date.now()}`,
            storeType: data.storeType,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        };

        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
