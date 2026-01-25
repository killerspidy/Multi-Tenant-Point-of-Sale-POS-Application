import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order } from '@/types';
import { mockProducts } from '@/mocks/data/products';
import { mockTransactions } from '@/mocks/data/transactions';

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
    // Initialize state with mock data
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [transactions, setTransactions] = useState<Order[]>(mockTransactions);

    // Update stock level (handles both increase and decrease)
    const updateProductStock = (productId: string, quantityChange: number) => {
        setProducts(prev => prev.map(p => {
            if (p.id === productId) {
                const newStock = Math.max(0, p.stock + quantityChange);
                return { ...p, stock: newStock };
            }
            return p;
        }));
    };

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    const addTransaction = (transaction: Order) => {
        setTransactions(prev => [transaction, ...prev]);

        // Update stock based on transaction items
        transaction.items.forEach((item) => {
            // Deduct stock for sold items
            // Access item.id NOT item.productId because CartItem extends Product
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
