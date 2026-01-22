import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockProducts, searchProducts, getProductByBarcode } from '@/mocks/data/products';
import { CartItem, Product } from '@/types';
import { Search, Barcode, Plus, Minus, Trash2, ShoppingCart, CreditCard, Wallet, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function POSPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'card' | 'upi' | 'wallet'>('cash');

    const displayProducts = searchQuery
        ? searchProducts(searchQuery)
        : mockProducts.filter(p => p.status === 'active').slice(0, 12);

    const handleBarcodeSearch = (barcode: string) => {
        const product = getProductByBarcode(barcode);
        if (product) {
            addToCart(product);
            setSearchQuery('');
        } else {
            toast.error('Product not found');
        }
    };

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.product.id === product.id);

        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                toast.error('Insufficient stock');
                return;
            }
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            if (product.stock === 0) {
                toast.error('Product out of stock');
                return;
            }
            setCart([...cart, { product, quantity: 1 }]);
        }
        toast.success(`Added ${product.name} to cart`);
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        const item = cart.find(i => i.product.id === productId);
        if (!item) return;

        if (newQuantity === 0) {
            removeFromCart(productId);
            return;
        }

        if (newQuantity > item.product.stock) {
            toast.error('Insufficient stock');
            return;
        }

        setCart(cart.map(item =>
            item.product.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter(item => item.product.id !== productId));
        toast.info('Item removed from cart');
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return cart.reduce((sum, item) => {
            const itemTotal = item.product.price * item.quantity;
            return sum + (itemTotal * item.product.taxRate / 100);
        }, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error('Cart is empty');
            return;
        }
        setShowCheckout(true);
    };

    const completeTransaction = () => {
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

        toast.success(`Transaction completed! Invoice: ${invoiceNumber}`);
        setCart([]);
        setShowCheckout(false);
        setSearchQuery('');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Point of Sale</h1>
                <Button variant="outline" onClick={() => setCart([])}>
                    Clear Cart
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products by name, SKU, or scan barcode..."
                                        className="pl-10"
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {displayProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => addToCart(product)}
                            >
                                <CardContent className="p-4">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-32 object-cover rounded-md mb-3"
                                        />
                                    )}
                                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                                    <p className="text-xs text-muted-foreground mb-2">{product.sku}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                                        <Badge variant={product.stock > 10 ? 'default' : 'destructive'}>
                                            {product.stock} left
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Cart Section */}
                <div className="space-y-4">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5" />
                                Cart ({cart.length} items)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ScrollArea className="h-[400px] pr-4">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>Cart is empty</p>
                                        <p className="text-sm">Add products to get started</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {cart.map((item) => (
                                            <div key={item.product.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                                                    <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-6 w-6"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-6 w-6"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-6 w-6 ml-auto"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>

                            {cart.length > 0 && (
                                <>
                                    <Separator />
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal:</span>
                                            <span>${calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Tax:</span>
                                            <span>${calculateTax().toFixed(2)}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Checkout
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Checkout Dialog */}
            <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Payment</DialogTitle>
                        <DialogDescription>
                            Total Amount: ${calculateTotal().toFixed(2)}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <p className="text-sm font-medium">Select Payment Method:</p>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant={selectedPaymentMethod === 'cash' ? 'default' : 'outline'}
                                className="h-20 flex-col gap-2"
                                onClick={() => setSelectedPaymentMethod('cash')}
                            >
                                <Banknote className="h-6 w-6" />
                                Cash
                            </Button>
                            <Button
                                variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                                className="h-20 flex-col gap-2"
                                onClick={() => setSelectedPaymentMethod('card')}
                            >
                                <CreditCard className="h-6 w-6" />
                                Card
                            </Button>
                            <Button
                                variant={selectedPaymentMethod === 'upi' ? 'default' : 'outline'}
                                className="h-20 flex-col gap-2"
                                onClick={() => setSelectedPaymentMethod('upi')}
                            >
                                <Wallet className="h-6 w-6" />
                                UPI
                            </Button>
                            <Button
                                variant={selectedPaymentMethod === 'wallet' ? 'default' : 'outline'}
                                className="h-20 flex-col gap-2"
                                onClick={() => setSelectedPaymentMethod('wallet')}
                            >
                                <Wallet className="h-6 w-6" />
                                Wallet
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCheckout(false)}>
                            Cancel
                        </Button>
                        <Button onClick={completeTransaction}>
                            Complete Transaction
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
