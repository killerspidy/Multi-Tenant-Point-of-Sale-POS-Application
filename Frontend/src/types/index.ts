export interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    costPrice: number;
    stock: number;
    reorderLevel: number;
    barcode: string;
    image?: string;
    taxRate: number;
    unit: string;
    status: 'active' | 'inactive' | 'discontinued';
}

export interface Transaction {
    id: string;
    invoiceNumber: string;
    date: string;
    customerId?: string;
    customerName?: string;
    items: TransactionItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    paymentMethod: 'cash' | 'card' | 'upi' | 'wallet';
    status: 'completed' | 'pending' | 'refunded';
    cashierId: string;
    cashierName: string;
}

export interface TransactionItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
    tax: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    loyaltyPoints: number;
    totalSpent: number;
    lastPurchase: string;
    joinDate: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
