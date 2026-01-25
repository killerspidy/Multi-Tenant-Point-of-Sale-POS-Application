import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Barcode, WifiOff, MoreVertical, ClipboardList, RotateCcw, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePOS } from '@/contexts/POSContext';
import { useData } from '@/contexts/DataContext'; // Import Data Hook
import ProductVariationSelector from '@/components/shared/pos/ProductVariationSelector';
import { ProductVariation } from '@/types';
import CartPanel from '@/components/pos/CartPanel';
import PaymentModal from '@/components/pos/PaymentModal';
import ActionDialog from '@/components/pos/ActionDialog';
import CustomerSearchDialog from '@/components/pos/CustomerSearchDialog';

import { formatCurrency } from '@/utils/formatters';

export default function POSPage() {
    const navigate = useNavigate();
    const { products } = useData(); // Get dynamic products
    const {
        addItem,
        processOrder,
        offlineOrders,
        addFee,
        addDiscount,
        setNote,
        setCustomer,
        total,
    } = usePOS();

    const [searchQuery, setSearchQuery] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedVariableProduct, setSelectedVariableProduct] = useState<Product | null>(null);
    const [showVariationSelector, setShowVariationSelector] = useState(false);

    // Dialog States
    const [showFeeDialog, setShowFeeDialog] = useState(false);
    const [showDiscountDialog, setShowDiscountDialog] = useState(false);
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [showCustomerDialog, setShowCustomerDialog] = useState(false);

    // Filter Products based on search (Implementation duplicated from mock utility for dynamic array)
    const filteredProducts = products.filter(p => {
        if (p.status !== 'active') return false;
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            p.name.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query) ||
            p.barcode?.includes(query)
        );
    });

    const displayProducts = filteredProducts.slice(0, 12);

    const handleBarcodeSearch = (barcode: string) => {
        // Use dynamic list search
        const product = products.find(p => p.barcode === barcode);
        if (product) {
            handleAddToCart(product);
            setSearchQuery('');
        } else {
            toast.error('Product not found');
        }
    };

    const handleAddToCart = (product: Product) => {
        if (product.type === 'variable') {
            setSelectedVariableProduct(product);
            setShowVariationSelector(true);
            return;
        }
        addItem(product);
        toast.success(`Added ${product.name} to cart`);
    };

    const handleVariationAddToCart = (product: Product, variation: ProductVariation) => {
        const variantProduct: Product = {
            ...product,
            id: variation.id,
            price: variation.price,
            sku: variation.sku,
            stock: variation.stock,
            image: variation.image || product.image,
            name: `${product.name} - ${Object.values(variation.attributes).join(', ')}`,
            type: 'simple'
        };
        addItem(variantProduct);
        toast.success(`Added ${variantProduct.name} to cart`);
        setShowVariationSelector(false);
    };

    const handleCheckoutComplete = async (method: string, _details?: any) => {
        await processOrder(method);
    };

    return (
        <div className="space-y-6 h-[calc(100vh-6rem)] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <h1 className="text-3xl font-bold">Point of Sale</h1>
                <div className="flex gap-2 items-center">
                    {offlineOrders.length > 0 && (
                        <Badge variant="secondary" className="gap-1 animate-pulse bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <WifiOff className="h-3 w-3" />
                            {offlineOrders.length} Offline
                        </Badge>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>POS Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate('/pos/shift')}>
                                <Clock className="mr-2 h-4 w-4" /> Shift Management
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/pos/returns')}>
                                <RotateCcw className="mr-2 h-4 w-4" /> Returns & Refunds
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/pos/held-orders')}>
                                <ClipboardList className="mr-2 h-4 w-4" /> Held Orders
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
                {/* Products Section */}
                <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
                    {/* Search */}
                    <Card className="shrink-0">
                        <CardContent className="p-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products by name, SKU, or scan barcode..."
                                        className="pl-10 h-10 text-md"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && searchQuery.match(/^\d{13}$/)) {
                                                handleBarcodeSearch(searchQuery);
                                            }
                                        }}
                                    />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Barcode className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto pr-2 pb-2">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {displayProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    className="cursor-pointer hover:shadow-lg transition-all active:scale-95 group"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <CardContent className="p-3">
                                        <div className="relative aspect-square mb-2 overflow-hidden rounded-md bg-muted">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-sm line-clamp-2 h-10 leading-tight mb-1">{product.name}</h3>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-lg font-bold text-primary">{formatCurrency(product.price)}</span>
                                            <div className="flex gap-1">
                                                <Badge variant={product.stock > 10 ? 'secondary' : 'destructive'} className="text-[10px] px-1.5 h-5">
                                                    {product.stock}
                                                </Badge>
                                                {product.expiryDate && (
                                                    <Badge variant="outline" className="text-[10px] px-1.5 h-5 border-orange-200 text-orange-700 bg-orange-50">
                                                        Exp: {product.expiryDate}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cart Section */}
                <div className="h-full overflow-hidden">
                    <CartPanel
                        onCheckout={() => setShowCheckout(true)}
                        onCustomerSelect={() => setShowCustomerDialog(true)}
                        onFee={() => setShowFeeDialog(true)}
                        onDiscount={() => setShowDiscountDialog(true)}
                        onNote={() => setShowNoteDialog(true)}
                    />
                </div>
            </div>

            {/* Modals */}
            <PaymentModal
                open={showCheckout}
                onOpenChange={setShowCheckout}
                total={total}
                onComplete={handleCheckoutComplete}
            />

            <ActionDialog
                open={showFeeDialog}
                onOpenChange={setShowFeeDialog}
                title="Add Fee"
                mode="amount"
                onConfirm={(val, type) => addFee({ name: 'Service Fee', value: val, type: type || 'fixed' })}
            />

            <ActionDialog
                open={showDiscountDialog}
                onOpenChange={setShowDiscountDialog}
                title="Add Discount"
                mode="amount"
                onConfirm={(val, type) => addDiscount({ name: 'Cart Discount', value: val, type: type || 'fixed' })}
            />

            <ActionDialog
                open={showNoteDialog}
                onOpenChange={setShowNoteDialog}
                title="Add Order Note"
                mode="text"
                onConfirm={(val) => setNote(val)}
            />

            <CustomerSearchDialog
                open={showCustomerDialog}
                onOpenChange={setShowCustomerDialog}
                onSelect={(customer) => {
                    setCustomer(customer);
                    toast.success(`Customer set to ${customer.name}`);
                }}
            />

            {/* Variation Selector */}
            {selectedVariableProduct && (
                <ProductVariationSelector
                    open={showVariationSelector}
                    onOpenChange={setShowVariationSelector}
                    product={selectedVariableProduct}
                    onAddToCart={handleVariationAddToCart}
                />
            )}
        </div>
    );
}
