import { Product } from '@/types';

export const mockProducts: Product[] = [
    // Electronics
    {
        id: '1',
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
    },
    {
        id: '2',
        sku: 'ELEC-002',
        name: 'USB-C Cable',
        description: 'Fast charging USB-C to USB-C cable, 2m length',
        category: 'Electronics',
        brand: 'TechPro',
        price: 12.99,
        costPrice: 5.00,
        stock: 120,
        reorderLevel: 20,
        barcode: '1234567890124',
        taxRate: 18,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200',
    },
    {
        id: '3',
        sku: 'ELEC-003',
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with 10-hour battery',
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
    },

    // Office Supplies
    {
        id: '4',
        sku: 'OFF-001',
        name: 'Notebook A5',
        description: 'Ruled notebook, 200 pages',
        category: 'Office Supplies',
        brand: 'PaperCo',
        price: 4.99,
        costPrice: 2.00,
        stock: 200,
        reorderLevel: 50,
        barcode: '1234567890126',
        taxRate: 12,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=200',
    },
    {
        id: '5',
        sku: 'OFF-002',
        name: 'Ballpoint Pen (Pack of 10)',
        description: 'Blue ink ballpoint pens',
        category: 'Office Supplies',
        brand: 'WritePro',
        price: 8.99,
        costPrice: 3.50,
        stock: 150,
        reorderLevel: 30,
        barcode: '1234567890127',
        taxRate: 12,
        unit: 'pack',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200',
    },

    // Beverages
    {
        id: '6',
        sku: 'BEV-001',
        name: 'Coffee Beans 500g',
        description: 'Premium Arabica coffee beans',
        category: 'Beverages',
        brand: 'CafeMaster',
        price: 18.99,
        costPrice: 9.00,
        stock: 35,
        reorderLevel: 10,
        barcode: '1234567890128',
        taxRate: 5,
        unit: 'pack',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200',
    },
    {
        id: '7',
        sku: 'BEV-002',
        name: 'Green Tea (25 bags)',
        description: 'Organic green tea bags',
        category: 'Beverages',
        brand: 'TeaTime',
        price: 6.99,
        costPrice: 3.00,
        stock: 80,
        reorderLevel: 15,
        barcode: '1234567890129',
        taxRate: 5,
        unit: 'box',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200',
    },

    // Snacks
    {
        id: '8',
        sku: 'SNK-001',
        name: 'Potato Chips',
        description: 'Classic salted potato chips, 150g',
        category: 'Snacks',
        brand: 'CrunchTime',
        price: 2.99,
        costPrice: 1.20,
        stock: 180,
        reorderLevel: 40,
        barcode: '1234567890130',
        taxRate: 12,
        unit: 'pack',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200',
    },
    {
        id: '9',
        sku: 'SNK-002',
        name: 'Chocolate Bar',
        description: 'Milk chocolate bar, 100g',
        category: 'Snacks',
        brand: 'ChocoDelight',
        price: 3.49,
        costPrice: 1.50,
        stock: 95,
        reorderLevel: 25,
        barcode: '1234567890131',
        taxRate: 12,
        unit: 'piece',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200',
    },

    // Personal Care
    {
        id: '10',
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
    {
        id: '11',
        sku: 'PC-002',
        name: 'Face Mask (Pack of 50)',
        description: 'Disposable 3-ply face masks',
        category: 'Personal Care',
        brand: 'SafeGuard',
        price: 15.99,
        costPrice: 7.00,
        stock: 42,
        reorderLevel: 10,
        barcode: '1234567890133',
        taxRate: 12,
        unit: 'pack',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200',
    },

    // Low stock items
    {
        id: '12',
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
        id: '13',
        sku: 'OFF-003',
        name: 'Sticky Notes',
        description: 'Colorful sticky notes, 100 sheets',
        category: 'Office Supplies',
        brand: 'PaperCo',
        price: 3.99,
        costPrice: 1.50,
        stock: 2,
        reorderLevel: 20,
        barcode: '1234567890135',
        taxRate: 12,
        unit: 'pack',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200',
        type: 'simple'
    },
    // Variable Product
    {
        id: '14',
        sku: 'CLOTH-001',
        name: 'Cotton T-Shirt',
        description: 'Premium cotton t-shirt in various sizes',
        category: 'Clothing',
        brand: 'FashionHub',
        price: 19.99,
        costPrice: 8.00,
        stock: 100, // Total stock
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
            {
                id: '14-L-BLK',
                parentId: '14',
                sku: 'CLOTH-001-L-BLK',
                price: 21.99, // Large is more expensive
                stock: 25,
                attributes: { 'Size': 'L', 'Color': 'Black' }
            },
            {
                id: '14-S-WHT',
                parentId: '14',
                sku: 'CLOTH-001-S-WHT',
                price: 19.99,
                stock: 15,
                attributes: { 'Size': 'S', 'Color': 'White' },
                image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200'
            }
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
