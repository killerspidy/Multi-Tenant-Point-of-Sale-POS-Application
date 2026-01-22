import { Customer } from '@/types';

export const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0101',
        loyaltyPoints: 450,
        totalSpent: 1250.50,
        lastPurchase: '2026-01-22',
        joinDate: '2025-06-15',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1-555-0102',
        loyaltyPoints: 820,
        totalSpent: 2340.75,
        lastPurchase: '2026-01-21',
        joinDate: '2025-03-20',
    },
    {
        id: '3',
        name: 'Michael Brown',
        email: 'mbrown@email.com',
        phone: '+1-555-0103',
        loyaltyPoints: 125,
        totalSpent: 450.00,
        lastPurchase: '2026-01-20',
        joinDate: '2025-11-10',
    },
    {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1-555-0104',
        loyaltyPoints: 1200,
        totalSpent: 3890.25,
        lastPurchase: '2026-01-23',
        joinDate: '2025-01-05',
    },
    {
        id: '5',
        name: 'David Wilson',
        email: 'dwilson@email.com',
        phone: '+1-555-0105',
        loyaltyPoints: 350,
        totalSpent: 980.00,
        lastPurchase: '2026-01-19',
        joinDate: '2025-08-12',
    },
];

export const getCustomerById = (id: string): Customer | undefined => {
    return mockCustomers.find(c => c.id === id);
};

export const searchCustomers = (query: string): Customer[] => {
    const lowerQuery = query.toLowerCase();
    return mockCustomers.filter(
        c =>
            c.name.toLowerCase().includes(lowerQuery) ||
            c.email.toLowerCase().includes(lowerQuery) ||
            c.phone.includes(query)
    );
};
