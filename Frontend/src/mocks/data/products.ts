import { Product } from '@/types';

export const mockProducts: Product[] = [
    // --- TechZone (Electronics) ---
    {
        id: '1',
        tenantId: 'tech_zone',
        sku: 'ELEC-001',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with 2.4GHz connectivity',
        category: 'Electronics',
        brand: 'TechPro',
        price: 29.99,
        costPrice: 15.00,
        stock: 45,
        reorderLevel: 10,
        barcode: '1234567890123',
        taxRate: 18,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200',
        hasSerialNumber: true // Electronics Feature
    },
    {
        id: '12',
        tenantId: 'tech_zone',
        sku: 'ELEC-004',
        name: 'Phone Charger',
        description: 'Fast charging adapter 20W',
        category: 'Electronics',
        brand: 'TechPro',
        price: 19.99,
        costPrice: 10.00,
        stock: 3,
        reorderLevel: 10,
        barcode: '1234567890134',
        taxRate: 18,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1591290619762-c588f0e8e23f?w=200',
    },
    {
        id: '3',
        tenantId: 'tech_zone',
        sku: 'ELEC-003',
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker',
        category: 'Electronics',
        brand: 'SoundMax',
        price: 49.99,
        costPrice: 25.00,
        stock: 28,
        reorderLevel: 5,
        barcode: '1234567890125',
        taxRate: 18,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200',
        hasSerialNumber: true
    },

    // --- PharmaPlus (Medical) ---
    {
        id: '101',
        tenantId: 'pharma_plus',
        sku: 'MED-001',
        name: 'Paracetamol 500mg',
        description: 'Pain reliever and fever reducer',
        category: 'Medicine',
        brand: 'HealthCare',
        price: 5.00,
        costPrice: 2.00,
        stock: 500,
        reorderLevel: 100,
        barcode: '999888777001',
        taxRate: 5,
        unit: 'strip',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
        expiryDate: '2026-12-31',
        batchNumber: 'BATCH-X123'
    },
    {
        id: '102',
        tenantId: 'pharma_plus',
        sku: 'MED-002',
        name: 'Amoxicillin 250mg',
        description: 'Antibiotic capsules',
        category: 'Medicine',
        brand: 'PharmaCorp',
        price: 12.50,
        costPrice: 6.00,
        stock: 200,
        reorderLevel: 50,
        barcode: '999888777002',
        taxRate: 5,
        unit: 'strip',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200',
        expiryDate: '2025-06-30',
        batchNumber: 'BATCH-Y456',
        requiresPrescription: true
    },
    {
        id: '10', // Shared item example (Hand Sanitizer could be in both)
        tenantId: 'pharma_plus',
        sku: 'PC-001',
        name: 'Hand Sanitizer 500ml',
        description: 'Antibacterial hand sanitizer',
        category: 'Personal Care',
        brand: 'CleanHands',
        price: 7.99,
        costPrice: 3.50,
        stock: 60,
        reorderLevel: 15,
        barcode: '1234567890132',
        taxRate: 18,
        unit: 'bottle',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1584305574647-0cc949a6f7f1?w=200',
    },

    // --- StyleHub (Fashion) ---
    {
        id: '14',
        tenantId: 'style_hub',
        sku: 'CLOTH-001',
        name: 'Cotton T-Shirt',
        description: 'Premium cotton t-shirt',
        category: 'Clothing',
        brand: 'FashionHub',
        price: 19.99,
        costPrice: 8.00,
        stock: 100,
        reorderLevel: 10,
        barcode: '1234567890136',
        taxRate: 5,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
        type: 'variable',
        attributes: [
            { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
            { name: 'Color', options: ['Black', 'White'] }
        ],
        variations: [
            {
                id: '14-S-BLK',
                parentId: '14',
                sku: 'CLOTH-001-S-BLK',
                price: 19.99,
                stock: 20,
                attributes: { 'Size': 'S', 'Color': 'Black' }
            },
            {
                id: '14-M-BLK',
                parentId: '14',
                sku: 'CLOTH-001-M-BLK',
                price: 19.99,
                stock: 30,
                attributes: { 'Size': 'M', 'Color': 'Black' }
            },
        ]
    }
];

export const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(p => p.id === id);
};

export const getProductByBarcode = (barcode: string): Product | undefined => {
    return mockProducts.find(p => p.barcode === barcode);
};

export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(
        p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.sku.toLowerCase().includes(lowerQuery) ||
            p.barcode.includes(query) ||
            p.category.toLowerCase().includes(lowerQuery)
    );
};

export const getProductsByCategory = (category: string): Product[] => {
    return mockProducts.filter(p => p.category === category);
};

export const getLowStockProducts = (): Product[] => {
    return mockProducts.filter(p => p.stock <= p.reorderLevel);
};

export const getCategories = (): string[] => {
    return Array.from(new Set(mockProducts.map(p => p.category)));
};
