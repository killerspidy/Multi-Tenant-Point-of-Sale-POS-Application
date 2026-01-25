// Reconcile exports from POSContext
import { createContext, useContext, useState, useEffect, ReactNode, useReducer } from 'react';
import { Product, CartItem, CartFees, CartDiscount, Customer, Order } from '@/types';
import {
    calculateSubtotal,
    calculateTotalTax,
    calculateTotalFee,
    calculateTotalDiscount
} from '@/utils/posUtils';
import { toast } from 'sonner';
import { useData } from '@/contexts/DataContext';

// Define the State Shape
interface POSState {
    cart: CartItem[];
    fees: CartFees[];
    discounts: CartDiscount[];
    customer: Customer | null;
    customerNote: string;
    activeOrder: Order | null;
    settings: any; // Placeholder
}

// Define Actions
type POSAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'SET_CUSTOMER'; payload: Customer | null }
    | { type: 'ADD_FEE'; payload: CartFees }
    | { type: 'REMOVE_FEE'; payload: string }
    | { type: 'ADD_DISCOUNT'; payload: CartDiscount }
    | { type: 'REMOVE_DISCOUNT'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'SET_NOTE'; payload: string };

// Initial State
const initialState: POSState = {
    cart: [],
    fees: [],
    discounts: [],
    customer: null,
    customerNote: '',
    activeOrder: null,
    settings: {}
};

// Reducer
function posReducer(state: POSState, action: POSAction): POSState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const product = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Item exists, increment quantity
                const updatedCart = [...state.cart];
                const currentQty = updatedCart[existingItemIndex].quantity;

                // Checking stock inside reducer is tricky if products state is external.
                // We'll trust the caller (addItem) has verified stock, or verify here if we passed products in action.
                // For simplicity, we assume generic stock valid check or optimistic UI.
                // NOTE: Real stock check moved to addItem action wrapper.

                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: currentQty + 1
                };
                return { ...state, cart: updatedCart };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...product, quantity: 1 }]
                };
            }
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== id)
                };
            }
            return {
                ...state,
                cart: state.cart.map(item => item.id === id ? { ...item, quantity } : item)
            };
        }
        case 'SET_CUSTOMER':
            return { ...state, customer: action.payload };

        case 'ADD_FEE':
            return { ...state, fees: [...state.fees, action.payload] };

        case 'REMOVE_FEE':
            return { ...state, fees: state.fees.filter(f => f.id !== action.payload) };

        case 'ADD_DISCOUNT':
            return { ...state, discounts: [...state.discounts, action.payload] };

        case 'REMOVE_DISCOUNT':
            return { ...state, discounts: state.discounts.filter(d => d.id !== action.payload) };

        case 'CLEAR_CART':
            return { ...state, cart: [], fees: [], discounts: [], customer: null, customerNote: '' };

        case 'SET_NOTE':
            return { ...state, customerNote: action.payload };

        default:
            return state;
    }
}

// Context Interface
interface POSContextType extends POSState {
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    setCustomer: (customer: Customer | null) => void;
    addFee: (fee: Omit<CartFees, 'id' | 'amount'>) => void;
    removeFee: (id: string) => void;
    addDiscount: (discount: Omit<CartDiscount, 'id' | 'amount'>) => void;
    removeDiscount: (id: string) => void;
    clearCart: () => void;
    setNote: (note: string) => void;

    // Computed Values
    subtotal: number;
    totalTax: number;
    totalDiscountAmount: number;
    totalFeeAmount: number;
    total: number;

    processOrder: (paymentMethod: string) => Promise<string>;
    offlineOrders: Order[];
    retryOfflineOrders: () => Promise<void>;
}

const POSContext = createContext<POSContextType | undefined>(undefined);

export function POSProvider({ children }: { children: ReactNode }) {
    const { addTransaction, products } = useData(); // Access Data Layer

    // Persist to localStorage (like wepos Home.vue)
    const storedData = localStorage.getItem('wepos_state');
    const params = storedData ? JSON.parse(storedData) : initialState;

    const [state, dispatch] = useReducer(posReducer, params);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('wepos_state', JSON.stringify(state));
    }, [state]);

    // Offline Queue
    const [offlineOrders, setOfflineOrders] = useState<Order[]>(() => {
        const stored = localStorage.getItem('wepos_offline_orders');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('wepos_offline_orders', JSON.stringify(offlineOrders));
    }, [offlineOrders]);

    // Computed Values
    const subtotal = calculateSubtotal(state.cart);
    const totalDiscountAmount = calculateTotalDiscount(state.discounts, subtotal);
    const totalFeeAmount = calculateTotalFee(state.fees, subtotal);

    // Tax needs to be calculated AFTER discount conceptually for 'total' tax, but line tax depends on line items.
    // The utility function handles the logic based on wepos Cart.module.js
    const totalTax = calculateTotalTax(state.cart, state.fees, state.discounts, subtotal, state.settings);

    const total = subtotal + totalTax + totalFeeAmount - totalDiscountAmount;

    // Actions
    const addItem = (product: Product) => {
        // Find current stock from Live Data
        const liveProduct = products.find(p => p.id === product.id);
        const currentCartItem = state.cart.find(item => item.id === product.id);
        const currentQtyInCart = currentCartItem ? currentCartItem.quantity : 0;

        if (!liveProduct) {
            toast.error('Product data unavailable');
            return;
        }

        if (liveProduct.stock <= currentQtyInCart) {
            toast.error(`Out of Stock! Only ${liveProduct.stock} available.`);
            return;
        }

        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const updateQuantity = (id: string, quantity: number) => {
        // Stock Check Logic can be added here similar to addItem
        const liveProduct = products.find(p => p.id === id);
        if (liveProduct && liveProduct.stock < quantity) {
            toast.error(`Cannot add more. Max stock is ${liveProduct.stock}`);
            return;
        }
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const setCustomer = (customer: Customer | null) => dispatch({ type: 'SET_CUSTOMER', payload: customer });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });
    const setNote = (note: string) => dispatch({ type: 'SET_NOTE', payload: note });

    const addFee = (feeData: Omit<CartFees, 'id' | 'amount'>) => {
        const id = Date.now().toString();
        // Recalculate subtotal for the action scope or relies on state which might be stale in closure? 
        // Better to calculate in reducer or pass current subtotal. 
        // For now, using the computed subtotal from this render cycle.
        const amount = feeData.type === 'percent' ? (subtotal * feeData.value) / 100 : feeData.value;
        dispatch({ type: 'ADD_FEE', payload: { ...feeData, id, amount } });
    };

    const removeFee = (id: string) => dispatch({ type: 'REMOVE_FEE', payload: id });

    const addDiscount = (discountData: Omit<CartDiscount, 'id' | 'amount'>) => {
        const id = Date.now().toString();
        const amount = discountData.type === 'percent' ? (subtotal * discountData.value) / 100 : discountData.value;
        dispatch({ type: 'ADD_DISCOUNT', payload: { ...discountData, id, amount } });
    };

    const removeDiscount = (id: string) => dispatch({ type: 'REMOVE_DISCOUNT', payload: id });

    const processOrder = async (paymentMethod: string): Promise<string> => {
        const orderId = `ORD-${Date.now()}`;
        const newOrder: Order = {
            id: orderId,
            customer: state.customer,
            items: state.cart,
            fees: state.fees,
            discounts: state.discounts,
            subtotal,
            totalTax,
            totalDiscount: totalDiscountAmount,
            totalFee: totalFeeAmount,
            total,
            status: 'completed',
            paymentMethod,
            createdAt: new Date().toISOString(),
            notes: state.customerNote
        };

        // Simulate API call
        const isOnline = navigator.onLine; // Simple browser check

        if (isOnline) {
            try {
                // Update Central Data Layer (which updates Dashboard & Inventory)
                addTransaction(newOrder);

                toast.success('Order processed successfully!');
            } catch (error) {
                console.error('Online sync failed, saving offline:', error);
                setOfflineOrders(prev => [...prev, { ...newOrder, status: 'pending' }]); // Pending sync
                toast.warning('Order processed locally (Offline)');
            }
        } else {
            setOfflineOrders(prev => [...prev, { ...newOrder, status: 'pending' }]);
            toast.warning('Order processed locally (Offline)');
        }

        clearCart();
        return orderId;
    };

    const retryOfflineOrders = async () => {
        if (offlineOrders.length === 0) return;

        const remainingOrders: Order[] = [];

        for (const order of offlineOrders) {
            try {
                // await api.saveOrder(order);
                addTransaction(order); // Sync to context
                console.log('Synced offline order:', order.id);
            } catch (error) {
                remainingOrders.push(order);
            }
        }

        if (remainingOrders.length < offlineOrders.length) {
            toast.success(`Synced ${offlineOrders.length - remainingOrders.length} offline orders`);
        }

        setOfflineOrders(remainingOrders);
    };

    return (
        <POSContext.Provider value={{
            ...state,
            addItem,
            removeItem,
            updateQuantity,
            setCustomer,
            addFee,
            removeFee,
            addDiscount,
            removeDiscount,
            clearCart,
            setNote,
            subtotal,
            totalTax,
            totalDiscountAmount,
            totalFeeAmount,
            total,
            processOrder, // New action
            offlineOrders, // Expose queue for UI
            retryOfflineOrders // Expose retry function
        }}>
            {children}
        </POSContext.Provider>
    );
}

export function usePOS() {
    const context = useContext(POSContext);
    if (!context) {
        throw new Error('usePOS must be used within a POSProvider');
    }
    return context;
}
