import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTransactions } from '@/mocks/data/transactions';
import { mockProducts } from '@/mocks/data/products';
import { Search, RotateCcw, DollarSign, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ReturnRefundPage() {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [refundReason, setRefundReason] = useState('');

    const handleInvoiceSearch = () => {
        const transaction = mockTransactions.find(t => t.invoiceNumber === invoiceNumber);
        if (transaction) {
            setSelectedTransaction(transaction);
            toast.success('Invoice found!');
        } else {
            toast.error('Invoice not found');
        }
    };

    const toggleItemSelection = (productId: string) => {
        setSelectedItems(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const calculateRefundAmount = () => {
        if (!selectedTransaction) return 0;
        return selectedTransaction.items
            .filter((item: any) => selectedItems.includes(item.productId))
            .reduce((sum: number, item: any) => sum + item.subtotal + item.tax, 0);
    };

    const processRefund = () => {
        if (selectedItems.length === 0) {
            toast.error('Please select items to return');
            return;
        }
        if (!refundReason) {
            toast.error('Please provide a reason for return');
            return;
        }

        toast.success(`Refund of $${calculateRefundAmount().toFixed(2)} processed successfully!`);
        setSelectedTransaction(null);
        setInvoiceNumber('');
        setSelectedItems([]);
        setRefundReason('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Returns & Refunds</h1>
                <p className="text-muted-foreground">Process customer returns and issue refunds</p>
            </div>

            {/* Invoice Search */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Find Invoice
                    </CardTitle>
                    <CardDescription>Enter invoice number to process return</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="INV-2026-XXXX"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleInvoiceSearch()}
                        />
                        <Button onClick={handleInvoiceSearch}>Search</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Transaction Details */}
            {selectedTransaction && (
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice Details</CardTitle>
                        <CardDescription>
                            {selectedTransaction.invoiceNumber} • {new Date(selectedTransaction.date).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                            <div>
                                <p className="text-sm text-muted-foreground">Customer</p>
                                <p className="font-medium">{selectedTransaction.customerName || 'Walk-in'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="font-medium uppercase">{selectedTransaction.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Amount</p>
                                <p className="font-semibold text-lg">${selectedTransaction.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge>{selectedTransaction.status}</Badge>
                            </div>
                        </div>

                        <Separator />

                        {/* Items Selection */}
                        <div>
                            <h3 className="font-semibold mb-4">Select Items to Return</h3>
                            <div className="space-y-3">
                                {selectedTransaction.items.map((item: any) => (
                                    <div
                                        key={item.productId}
                                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedItems.includes(item.productId) ? 'border-primary bg-primary/5' : ''
                                            }`}
                                        onClick={() => toggleItemSelection(item.productId)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.productId)}
                                                onChange={() => { }}
                                                className="h-4 w-4"
                                            />
                                            <div>
                                                <p className="font-medium">{item.productName}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${(item.subtotal + item.tax).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Return Reason */}
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Return *</Label>
                            <Select value={refundReason} onValueChange={setRefundReason}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="defective">Defective Product</SelectItem>
                                    <SelectItem value="wrong_item">Wrong Item</SelectItem>
                                    <SelectItem value="not_satisfied">Customer Not Satisfied</SelectItem>
                                    <SelectItem value="damaged">Damaged in Transit</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Refund Summary */}
                        {selectedItems.length > 0 && (
                            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Items Selected:</span>
                                    <span className="font-medium">{selectedItems.length}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Refund Amount:</span>
                                    <span className="text-green-600">${calculateRefundAmount().toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setSelectedTransaction(null)}>
                                Cancel
                            </Button>
                            <Button onClick={processRefund} className="gap-2">
                                <RotateCcw className="h-4 w-4" />
                                Process Refund
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
