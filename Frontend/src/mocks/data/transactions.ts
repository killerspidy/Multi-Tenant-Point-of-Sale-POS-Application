import { Order } from '@/types';

export const mockTransactions: Order[] = [
    {
        id: '1',
        createdAt: '2026-01-23T10:30:00', // Renamed from date
        paymentMethod: 'card',
        status: 'completed',
        tenantId: 'tech_zone',
        items: [
            {
                id: '1', // Added mock ID for CartItem compatibility
                tenantId: 'tech_zone',
                stock: 0, // Added mock stock
                costPrice: 0, // Added mock cost
                sku: 'W-MOUSE', // Added mock SKU
                category: 'Electronics',
                brand: 'Generic',
                barcode: '111',
                image: '',
                unit: 'pcs',
                status: 'active',
                reorderLevel: 5,
                taxRate: 0,
                name: 'Wireless Mouse',
                description: '',
                price: 29.99,
                quantity: 1,
            },
            {
                id: '4',
                tenantId: 'tech_zone',
                stock: 0,
                costPrice: 0,
                sku: 'NOTE-A5',
                category: 'Stationery',
                brand: 'Home',
                barcode: '444',
                image: '',
                unit: 'pcs',
                status: 'active',
                reorderLevel: 5,
                taxRate: 0,
                name: 'Notebook A5',
                description: '',
                price: 4.99,
                quantity: 2,
            },
        ],
        subtotal: 39.97,
        totalTax: 6.60,
        totalDiscount: 0,
        totalFee: 0,
        total: 46.57,
        fees: [],
        discounts: [],
        customer: { id: '1', name: 'John Smith', email: 'john@example.com', phone: '123' },
        notes: ''
    },
    {
        id: '2',
        createdAt: '2026-01-23T11:15:00',
        paymentMethod: 'upi',
        status: 'completed',
        tenantId: 'tech_zone',
        items: [
            {
                id: '3',
                tenantId: 'tech_zone',
                stock: 0,
                costPrice: 0,
                sku: 'BT-SPK',
                category: 'Electronics',
                brand: 'Audio',
                barcode: '333',
                image: '',
                unit: 'pcs',
                status: 'active',
                reorderLevel: 5,
                taxRate: 0,
                name: 'Bluetooth Speaker',
                description: '',
                price: 49.99,
                quantity: 1,
            },
        ],
        subtotal: 49.99,
        totalTax: 9.00,
        totalDiscount: 5.00,
        totalFee: 0,
        total: 53.99,
        fees: [],
        discounts: [],
        customer: { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '456' },
        notes: ''
    },
    {
        id: '3',
        createdAt: '2026-01-23T12:00:00',
        paymentMethod: 'cash',
        status: 'completed',
        tenantId: 'pharma_plus',
        items: [
            {
                id: '8',
                tenantId: 'pharma_plus',
                stock: 0,
                costPrice: 0,
                sku: 'CHIPS',
                category: 'Snacks',
                brand: 'Lays',
                barcode: '888',
                image: '',
                unit: 'pkt',
                status: 'active',
                reorderLevel: 10,
                taxRate: 0,
                name: 'Potato Chips',
                description: '',
                price: 2.99,
                quantity: 3,
            },
            {
                id: '9',
                tenantId: 'pharma_plus',
                stock: 0,
                costPrice: 0,
                sku: 'CHOC',
                category: 'Snacks',
                brand: 'Mars',
                barcode: '999',
                image: '',
                unit: 'bar',
                status: 'active',
                reorderLevel: 20,
                taxRate: 0,
                name: 'Chocolate Bar',
                description: '',
                price: 3.49,
                quantity: 2,
            },
        ],
        subtotal: 15.95,
        totalTax: 1.92,
        totalDiscount: 0,
        totalFee: 0,
        total: 17.87,
        fees: [],
        discounts: [],
        customer: null,
        notes: ''
    },
    {
        id: '4',
        createdAt: '2026-01-22T15:45:00',
        paymentMethod: 'card',
        status: 'completed',
        tenantId: 'pharma_plus',
        items: [
            {
                id: '6',
                tenantId: 'pharma_plus',
                stock: 0,
                costPrice: 0,
                sku: 'COFFEE',
                category: 'Grocery',
                brand: 'Nescafe',
                barcode: '666',
                image: '',
                unit: 'g',
                status: 'active',
                reorderLevel: 5,
                taxRate: 0,
                name: 'Coffee Beans 500g',
                description: '',
                price: 18.99,
                quantity: 2,
            },
            {
                id: '7',
                tenantId: 'pharma_plus',
                stock: 0,
                costPrice: 0,
                sku: 'TEA',
                category: 'Grocery',
                brand: 'Lipton',
                barcode: '777',
                image: '',
                unit: 'box',
                status: 'active',
                reorderLevel: 5,
                taxRate: 0,
                name: 'Green Tea (25 bags)',
                description: '',
                price: 6.99,
                quantity: 1,
            },
        ],
        subtotal: 44.97,
        totalTax: 2.25,
        totalDiscount: 0,
        totalFee: 0,
        total: 47.22,
        fees: [],
        discounts: [],
        customer: { id: '4', name: 'Emily Davis', email: 'emily@example.com', phone: '789' },
        notes: ''
    },
];

export const getTodayTransactions = (): Order[] => {
    const today = new Date().toISOString().split('T')[0];
    return mockTransactions.filter(t => t.createdAt.startsWith(today));
};

export const getTransactionsByDateRange = (startDate: string, endDate: string): Order[] => {
    return mockTransactions.filter(t => {
        const transDate = t.createdAt.split('T')[0];
        return transDate >= startDate && transDate <= endDate;
    });
};

export const getTotalRevenue = (): number => {
    return mockTransactions.reduce((sum, t) => sum + t.total, 0);
};

export const getTotalTransactions = (): number => {
    return mockTransactions.length;
};
