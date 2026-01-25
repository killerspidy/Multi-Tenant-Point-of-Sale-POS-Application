// Store Configuration Interface
export interface StoreConfig {
    id: string;
    name: string;
    type: 'general' | 'medical' | 'electronics' | 'fashion';
    currency: string;
    features: {
        enableExpiry: boolean; // Tracks Batch & Expiry (Medical)
        enableIMEI: boolean;   // Tracks Serial Numbers (Electronics)
        enableVariants: boolean; // Tracks Size/Color (Fashion)
        enablePrescription?: boolean; // Optional: Require Rx for certain items
    };
    themeColor: string; // Store branding color
}

export interface Product {
    id: string;
    tenantId: string; // Multi-tenant isolation
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
    taxRate: number;
    taxClass?: string;
    taxStatus?: string;
    unit: string;
    status: 'active' | 'inactive' | 'archived';
    image: string;

    // Feature Flags for specific industries
    manage_stock?: boolean;
    backorders_allowed?: boolean;
    type?: 'simple' | 'variable';

    // Fashion
    attributes?: ProductAttribute[];
    variations?: ProductVariation[];

    // Medical
    expiryDate?: string;
    batchNumber?: string;
    requiresPrescription?: boolean;

    // Electronics
    hasSerialNumber?: boolean;
}

export interface ProductAttribute {
    name: string;
    options: string[];
}

export interface ProductVariation {
    id: string;
    parentId: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
    image?: string;
}

export interface CartItem extends Product {
    quantity: number;
    discount?: number;
    // Serial Number for Electronics
    serialNumber?: string;
    // Batch Info for Medical selected at checkout
    selectedBatch?: string;
}

export interface CartFees {
    id: string;
    name: string;
    type: 'fixed' | 'percent';
    value: number;
    amount: number;
    taxStatus?: 'taxable' | 'none';
}

export interface CartDiscount {
    id: string;
    name: string;
    type: 'fixed' | 'percent';
    value: number;
    amount: number;
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
    tenantId?: string; // Track which store performed sale
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
