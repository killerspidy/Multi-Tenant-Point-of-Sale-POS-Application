import { Product, CartItem, CartFees, CartDiscount } from '@/types';

// Helper to check stock (ported from helper.js)
export const hasStock = (product: Product, currentQty: number = 0): boolean => {
    if (!product.manage_stock) {
        return product.status === 'active'; // Simplified for now, wepos checks stock_status
    } else {
        if (product.backorders_allowed) {
            return true;
        } else {
            return product.stock > currentQty;
        }
    }
};

// Calculation Logic (ported from Cart.module.js)

export const calculateSubtotal = (items: CartItem[]): number => {
    let subtotal = 0;
    items.forEach(item => {
        // WePOS Logic: use sale price if on sale
        const price = item.onSale && item.salePrice ? item.salePrice : (item.regularPrice || item.price);
        subtotal += item.quantity * price;
    });
    return subtotal;
};

export const calculateLineTax = (item: CartItem): number => {
    // wepos: Math.abs(item.tax_amount * item.quantity)
    // We assume item.taxRate is the percentage
    const taxAmountPerUnit = (item.price * item.taxRate) / 100;
    return taxAmountPerUnit * item.quantity;
};

export const calculateTotalTax = (
    items: CartItem[],
    fees: CartFees[],
    discounts: CartDiscount[],
    subtotal: number,
    settings: any // Placeholder for tax settings
): number => {
    let taxLineTotal = 0;
    let taxFeeTotal = 0;
    let couponTaxDiscount = 0;

    // 1. Line Items Tax
    items.forEach(item => {
        // WePOS uses item.tax_amount * quantity. 
        // Here we simulate it with rate if explicit amount missing.
        // Ideally, item should have taxAmount pre-calculated from backend or context.
        const price = item.onSale && item.salePrice ? item.salePrice : (item.regularPrice || item.price);
        const taxAmountPerUnit = (price * (item.taxRate || 0)) / 100;
        taxLineTotal += Math.abs(taxAmountPerUnit * item.quantity);
    });

    // wepos check: if (state.settings.woo_tax.wc_tax_display_cart == 'incl') { taxLineTotal = 0; }
    if (settings?.woo_tax?.wc_tax_display_cart === 'incl') {
        taxLineTotal = 0;
    }

    // 2. Fees Tax
    fees.forEach(fee => {
        if (fee.taxStatus === 'taxable') {
            const feeTaxRate = 10; // Default or configured
            taxFeeTotal += Math.abs(fee.amount) * feeTaxRate / 100;
        }
    });

    // 3. Discount Tax Adjustment
    // WePOS logic: discountPercentage = item.total / getters.getSubtotal * 100;
    // couponTaxDiscount += discountPercentage / 100 * taxLineTotal;
    // Note: item.total for discount in WePOS is NEGATIVE.

    let totalDiscountVal = 0;
    discounts.forEach(d => {
        const amount = d.type === 'percent' ? (subtotal * d.value) / 100 : d.value;
        totalDiscountVal += amount;
    });

    if (subtotal > 0 && totalDiscountVal > 0) {
        const discountPercentage = (totalDiscountVal / subtotal) * 100;
        couponTaxDiscount = (discountPercentage / 100) * taxLineTotal;
    }

    return taxLineTotal + taxFeeTotal - couponTaxDiscount;
};

export const calculateTotalFee = (fees: CartFees[], subtotal: number): number => {
    let total = 0;
    fees.forEach(fee => {
        if (fee.type === 'percent') {
            total += (subtotal * fee.value) / 100;
        } else {
            total += fee.value;
        }
    });
    return total;
};

export const calculateTotalDiscount = (discounts: CartDiscount[], subtotal: number): number => {
    let total = 0;
    discounts.forEach(discount => {
        if (discount.type === 'percent') {
            total += (subtotal * discount.value) / 100;
        } else {
            total += discount.value;
        }
    });
    return total;
};
