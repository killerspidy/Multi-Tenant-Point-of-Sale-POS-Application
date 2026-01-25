import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StoreConfig } from '@/types';
import { useAuth } from './AuthContext';

// Mock Stores for Demo
const MOCK_STORES: StoreConfig[] = [
    {
        id: 'tech_zone',
        name: 'TechZone Solution',
        type: 'electronics',
        currency: 'INR',
        themeColor: 'blue',
        features: {
            enableExpiry: false,
            enableIMEI: true,
            enableVariants: false,
        }
    },
    {
        id: 'pharma_plus',
        name: 'PharmaPlus Medical',
        type: 'medical',
        currency: 'INR',
        themeColor: 'green',
        features: {
            enableExpiry: true,
            enableIMEI: false,
            enableVariants: false,
            enablePrescription: true,
        }
    },
    {
        id: 'style_hub',
        name: 'StyleHub Fashion',
        type: 'fashion',
        currency: 'INR',
        themeColor: 'purple',
        features: {
            enableExpiry: false,
            enableIMEI: false,
            enableVariants: true,
        }
    }
];

interface StoreContextType {
    currentStore: StoreConfig;
    availableStores: StoreConfig[];
    switchStore: (storeId: string) => void;
    canSwitchStore: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    // Default to first store or user's assigned store type
    const [currentStore, setCurrentStore] = useState<StoreConfig>(MOCK_STORES[0]);

    // Sync store with User's SaaS Plan
    useEffect(() => {
        if (user?.storeType) {
            // Find a mock store that matches the user's plan type
            // In a real app, this would be the user's specific tenant config
            const matchedStore = MOCK_STORES.find(s => s.type === user.storeType);
            if (matchedStore) {
                setCurrentStore(matchedStore);
            }
        }
    }, [user]);

    const switchStore = (storeId: string) => {
        // Only allow switching if Super Admin (or for demo if no user)
        if (user && user.role !== 'super_admin') return;

        const store = MOCK_STORES.find(s => s.id === storeId);
        if (store) {
            setCurrentStore(store);
        }
    };

    return (
        <StoreContext.Provider value={{
            currentStore,
            availableStores: MOCK_STORES,
            switchStore,
            canSwitchStore: user?.role === 'super_admin'
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
