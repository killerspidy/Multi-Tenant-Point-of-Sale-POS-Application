export interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    regularPrice?: number;
    salePrice?: number;
    onSale?: boolean;
    costPrice: number;
    stock: number;
    reorderLevel: number;
    barcode: string;
    taxRate: number; // Placeholder for simple tax, WePOS uses complex tax classes
    taxClass?: string;
    taxStatus?: string;
    unit: string;
    status: 'active' | 'inactive' | 'archived';
    image: string;
    manage_stock?: boolean;
    backorders_allowed?: boolean;
    type?: 'simple' | 'variable';
    attributes?: ProductAttribute[];
    variations?: ProductVariation[];
    parent_id?: string | number; // For variations
}

export interface ProductAttribute {
    name: string;
    options: string[];
}

export interface ProductVariation {
    id: string;
    parentId: string; // Link back to parent
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>; // e.g., { "Size": "M", "Color": "Blue" }
    image?: string;
}

export interface CartItem extends Product {
    quantity: number;
    discount?: number;
}

export interface CartFees {
    id: string;
    name: string;
    type: 'fixed' | 'percent';
    value: number; // The input value
    amount: number; // The calculated absolute amount
    taxStatus?: 'taxable' | 'none';
}

export interface CartDiscount {
    id: string;
    name: string;
    type: 'fixed' | 'percent';
    value: number; // The input value
    amount: number; // The calculated absolute amount
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
}

export interface Order {
    id?: string;
    customer?: Customer | null;
    items: CartItem[];
    fees: CartFees[];
    discounts: CartDiscount[];
    subtotal: number;
    totalTax: number;
    totalDiscount: number;
    totalFee: number;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    paymentMethod: string;
    createdAt: string;
    notes?: string;
}
