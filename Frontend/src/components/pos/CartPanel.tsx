import { ShoppingCart, Plus, Minus, Trash2, CreditCard, User, Tag, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { usePOS } from '@/contexts/POSContext';
import { formatCurrency } from '@/utils/formatters'; // Assuming we'll create this or use intl

export default function CartPanel({ onCheckout, onCustomerSelect, onDiscount, onFee, onNote }: any) {
    const { cart, updateQuantity, removeItem, subtotal, totalTax, total, customer, totalDiscountAmount, totalFeeAmount } = usePOS();

    return (
        <Card className="h-[calc(100vh-8rem)] flex flex-col">
            <CardHeader className="py-3 px-4 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <ShoppingCart className="h-5 w-5" />
                        Current Sale
                    </CardTitle>
                    <Badge variant="outline" className="font-mono">
                        {cart.length} items
                    </Badge>
                </div>
                {/* Customer Section */}
                <div
                    className="flex items-center justify-between mt-2 p-2 bg-background rounded-md border cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={onCustomerSelect}
                >
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {customer ? (
                            <span className="font-medium text-primary">{customer.name}</span>
                        ) : (
                            <span className="text-muted-foreground italic">Walk-in Customer</span>
                        )}
                    </div>
                    <Button variant="ghost" size="xs" className="h-6 text-xs">Change</Button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 py-12">
                            <div className="p-4 bg-muted rounded-full">
                                <ShoppingCart className="h-8 w-8 opacity-50" />
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Cart is empty</p>
                                <p className="text-xs">Scan barcode or search products</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-3 p-3 bg-muted/40 hover:bg-muted/60 transition-colors rounded-lg border group">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded bg-background"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-sm truncate pr-2">{item.name}</h4>
                                            <p className="font-semibold text-sm">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-xs text-muted-foreground font-mono">
                                                ${item.price.toFixed(2)} x {item.quantity}
                                            </p>

                                            <div className="flex items-center gap-1 bg-background rounded-md border px-1 shadow-sm">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6 hover:text-destructive"
                                                    onClick={() => {
                                                        if (item.quantity === 1) removeItem(item.id);
                                                        else updateQuantity(item.id, item.quantity - 1);
                                                    }}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm font-medium w-6 text-center tabular-nums">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6 hover:text-primary"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {/* Actions & Totals */}
                <div className="border-t bg-background p-4 space-y-4 shadow-sm">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="text-xs gap-1" onClick={onDiscount}>
                            <Tag className="h-3 w-3" />
                            Discount
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs gap-1" onClick={onFee}>
                            <CreditCard className="h-3 w-3" />
                            Fee
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs gap-1" onClick={onNote}>
                            <FileText className="h-3 w-3" />
                            Note
                        </Button>
                    </div>

                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {totalDiscountAmount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-${totalDiscountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        {totalFeeAmount > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                                <span>Fees</span>
                                <span>+${totalFeeAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-muted-foreground">
                            <span>Tax</span>
                            <span>${totalTax.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        className="w-full h-12 text-lg font-semibold shadow-md active:scale-[0.99] transition-transform"
                        size="lg"
                        onClick={onCheckout}
                        disabled={cart.length === 0}
                    >
                        <div className="flex items-center justify-between w-full px-2">
                            <span>Checkout</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
