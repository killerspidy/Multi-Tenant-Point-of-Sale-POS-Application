import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order } from '@/types';
import { mockProducts } from '@/mocks/data/products';
import { mockTransactions } from '@/mocks/data/transactions';
import { useStore } from './StoreContext'; // Import Store Context

// Define Data Context State Interface
interface DataContextType {
    // Inventory & Products
    products: Product[];
    updateProductStock: (productId: string, quantityChange: number) => void;
    addProduct: (product: Product) => void;

    // Sales & Transactions
    transactions: Order[];
    addTransaction: (transaction: Order) => void;

    // Dashboard Stats (Calculated on the fly usually, but good to have accessors)
    getDashboardStats: () => {
        totalRevenue: number;
        totalOrders: number;
        lowStockCount: number;
    };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const { currentStore } = useStore(); // Get current store config

    // Initialize state with mock data
    // In a real app, these would be fetched via API passing `tenantId`
    const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
    const [allTransactions, setAllTransactions] = useState<Order[]>(mockTransactions);

    // Filtered State based on Current Store
    const [products, setProducts] = useState<Product[]>([]);
    const [transactions, setTransactions] = useState<Order[]>([]);

    useEffect(() => {
        // Filter products for the current tenant
        const storeProducts = allProducts.filter(p => p.tenantId === currentStore.id);
        const storeTransactions = allTransactions.filter(t => t.tenantId === currentStore.id);

        setProducts(storeProducts);
        setTransactions(storeTransactions);
    }, [currentStore.id, allProducts, allTransactions]);

    // Update stock level (handles both increase and decrease)
    // We update the GLOBAL list, which triggers re-filtering
    const updateProductStock = (productId: string, quantityChange: number) => {
        setAllProducts(prev => prev.map(p => {
            if (p.id === productId) {
                const newStock = Math.max(0, p.stock + quantityChange);
                return { ...p, stock: newStock };
            }
            return p;
        }));
    };

    const addProduct = (product: Product) => {
        // Ensure new product gets the current tenantId
        const newProduct = { ...product, tenantId: currentStore.id };
        setAllProducts(prev => [...prev, newProduct]);
    };

    const addTransaction = (transaction: Order) => {
        // Ensure transaction is tagged with tenantId
        const newTransaction = { ...transaction, tenantId: currentStore.id };
        setAllTransactions(prev => [newTransaction, ...prev]);

        // Update stock based on transaction items
        transaction.items.forEach((item) => {
            updateProductStock(item.id, -item.quantity);
        });
    };

    const getDashboardStats = () => {
        const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
        const totalOrders = transactions.length;
        const lowStockCount = products.filter(p => p.stock <= p.reorderLevel).length;

        return {
            totalRevenue,
            totalOrders,
            lowStockCount
        };
    };

    return (
        <DataContext.Provider value={{
            products,
            updateProductStock,
            addProduct,
            transactions,
            addTransaction,
            getDashboardStats
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
