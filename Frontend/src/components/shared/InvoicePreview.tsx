import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Transaction } from '@/types';
import { Printer, Download, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface InvoicePreviewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: Transaction | null;
}

export default function InvoicePreview({ open, onOpenChange, transaction }: InvoicePreviewProps) {
    if (!transaction) return null;

    const handlePrint = () => {
        window.print();
        toast.success('Printing invoice...');
    };

    const handleDownload = () => {
        toast.success('Downloading invoice as PDF...');
    };

    const handleEmail = () => {
        toast.success('Invoice sent via email!');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Invoice Preview</DialogTitle>
                </DialogHeader>

                {/* Invoice Content */}
                <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-lg" id="invoice-content">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">POS Master</h2>
                            <p className="text-sm text-muted-foreground">Multi-Tenant POS System</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                123 Business Street<br />
                                City, State 12345<br />
                                Phone: (555) 123-4567
                            </p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-xl font-bold">INVOICE</h3>
                            <p className="text-sm font-mono">{transaction.invoiceNumber}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Customer Info */}
                    <div>
                        <h4 className="font-semibold mb-2">Bill To:</h4>
                        <p className="text-sm">{transaction.customerName || 'Walk-in Customer'}</p>
                        <p className="text-sm text-muted-foreground">
                            Cashier: {transaction.cashierName}
                        </p>
                    </div>

                    <Separator />

                    {/* Items Table */}
                    <div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Item</th>
                                    <th className="text-right py-2">Qty</th>
                                    <th className="text-right py-2">Price</th>
                                    <th className="text-right py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.items.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2">{item.productName}</td>
                                        <td className="text-right">{item.quantity}</td>
                                        <td className="text-right">${item.price.toFixed(2)}</td>
                                        <td className="text-right font-semibold">${item.subtotal.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>${transaction.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax:</span>
                                <span>${transaction.tax.toFixed(2)}</span>
                            </div>
                            {transaction.discount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount:</span>
                                    <span>-${transaction.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>${transaction.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Payment Method:</span>
                                <span className="uppercase">{transaction.paymentMethod}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <Separator />
                    <div className="text-center text-sm text-muted-foreground">
                        <p>Thank you for your business!</p>
                        <p className="mt-2">For support, contact: support@posmaster.com</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={handleEmail}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
