import { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2026-001',
        date: '2026-01-23T10:30:00',
        customerId: '1',
        customerName: 'John Smith',
        items: [
            {
                productId: '1',
                productName: 'Wireless Mouse',
                quantity: 1,
                price: 29.99,
                subtotal: 29.99,
                tax: 5.40,
            },
            {
                productId: '4',
                productName: 'Notebook A5',
                quantity: 2,
                price: 4.99,
                subtotal: 9.98,
                tax: 1.20,
            },
        ],
        subtotal: 39.97,
        tax: 6.60,
        discount: 0,
        total: 46.57,
        paymentMethod: 'card',
        status: 'completed',
        cashierId: '3',
        cashierName: 'Mike Cashier',
    },
    {
        id: '2',
        invoiceNumber: 'INV-2026-002',
        date: '2026-01-23T11:15:00',
        customerId: '2',
        customerName: 'Sarah Johnson',
        items: [
            {
                productId: '3',
                productName: 'Bluetooth Speaker',
                quantity: 1,
                price: 49.99,
                subtotal: 49.99,
                tax: 9.00,
            },
        ],
        subtotal: 49.99,
        tax: 9.00,
        discount: 5.00,
        total: 53.99,
        paymentMethod: 'upi',
        status: 'completed',
        cashierId: '3',
        cashierName: 'Mike Cashier',
    },
    {
        id: '3',
        invoiceNumber: 'INV-2026-003',
        date: '2026-01-23T12:00:00',
        items: [
            {
                productId: '8',
                productName: 'Potato Chips',
                quantity: 3,
                price: 2.99,
                subtotal: 8.97,
                tax: 1.08,
            },
            {
                productId: '9',
                productName: 'Chocolate Bar',
                quantity: 2,
                price: 3.49,
                subtotal: 6.98,
                tax: 0.84,
            },
        ],
        subtotal: 15.95,
        tax: 1.92,
        discount: 0,
        total: 17.87,
        paymentMethod: 'cash',
        status: 'completed',
        cashierId: '3',
        cashierName: 'Mike Cashier',
    },
    {
        id: '4',
        invoiceNumber: 'INV-2026-004',
        date: '2026-01-22T15:45:00',
        customerId: '4',
        customerName: 'Emily Davis',
        items: [
            {
                productId: '6',
                productName: 'Coffee Beans 500g',
                quantity: 2,
                price: 18.99,
                subtotal: 37.98,
                tax: 1.90,
            },
            {
                productId: '7',
                productName: 'Green Tea (25 bags)',
                quantity: 1,
                price: 6.99,
                subtotal: 6.99,
                tax: 0.35,
            },
        ],
        subtotal: 44.97,
        tax: 2.25,
        discount: 0,
        total: 47.22,
        paymentMethod: 'card',
        status: 'completed',
        cashierId: '2',
        cashierName: 'Sarah Manager',
    },
];

export const getTodayTransactions = (): Transaction[] => {
    const today = new Date().toISOString().split('T')[0];
    return mockTransactions.filter(t => t.date.startsWith(today));
};

export const getTransactionsByDateRange = (startDate: string, endDate: string): Transaction[] => {
    return mockTransactions.filter(t => {
        const transDate = t.date.split('T')[0];
        return transDate >= startDate && transDate <= endDate;
    });
};

export const getTotalRevenue = (): number => {
    return mockTransactions.reduce((sum, t) => sum + t.total, 0);
};

export const getTotalTransactions = (): number => {
    return mockTransactions.length;
};
