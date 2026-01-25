import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Share2, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ReceiptPreviewProps {
    order: any; // Using any for flexibility with Order type
    onPrint?: () => void;
    onEmail?: () => void;
}

export default function ReceiptPreview({ order, onPrint, onEmail }: ReceiptPreviewProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (onPrint) {
            onPrint();
        } else {
            // Simple window print as fallback or implementation detail
            const printContent = receiptRef.current;
            if (printContent) {
                const originalContents = document.body.innerHTML;
                document.body.innerHTML = printContent.innerHTML;
                window.print();
                document.body.innerHTML = originalContents;
                window.location.reload(); // Reload to restore event listeners/state (crude but effective for simple mock)
                // In a real app we'd use a print-specific window or iframe
            }
        }
    };

    if (!order) return null;

    return (
        <div className="flex flex-col gap-4">
            <div
                ref={receiptRef}
                className="bg-white text-black p-6 rounded-lg shadow-sm border text-sm font-mono max-w-[350px] mx-auto receipt-container"
                style={{ fontFamily: "'Courier Prime', monospace" }}
            >
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold mb-1">STORE NAME</h2>
                    <p>123 Main Street</p>
                    <p>Cityville, ST 12345</p>
                    <p>Tel: (555) 123-4567</p>
                </div>

                <Separator className="my-2 bg-black/20" />

                {/* Info */}
                <div className="flex justify-between mb-1">
                    <span>Date: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                    <span>Time: {new Date(order.createdAt || Date.now()).toLocaleTimeString()}</span>
                </div>
                <div className="mb-4">
                    <p>Order: #{order.id}</p>
                    <p>Cashier: Admin</p>
                    {order.customer && <p>Customer: {order.customer.name}</p>}
                </div>

                <Separator className="my-2 bg-black/20" />

                {/* Items */}
                <div className="space-y-2 mb-4">
                    {order.items.map((item: any, i: number) => (
                        <div key={i}>
                            <div className="flex justify-between">
                                <span>{item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            {(item.quantity > 1 || item.discount) && (
                                <div className="text-xs text-gray-500 pl-2">
                                    {item.quantity} x @${item.price.toFixed(2)}
                                    {item.discount ? ` (-$${item.discount})` : ''}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Separator className="my-2 bg-black/20" />

                {/* Totals */}
                <div className="space-y-1 mb-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.totalDiscount > 0 && (
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-${order.totalDiscount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${order.totalTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fees</span>
                        <span>${order.totalFee?.toFixed(2) || '0.00'}</span>
                    </div>
                    <Separator className="my-2 border-dashed bg-black/20" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>TOTAL</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="mb-6">
                    <div className="flex justify-between">
                        <span className="uppercase">{order.paymentMethod}</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                    {order.details?.cashTendered && (
                        <div className="flex justify-between text-xs mt-1">
                            <span>Cash Tendered</span>
                            <span>${order.details.cashTendered.toFixed(2)}</span>
                        </div>
                    )}
                    {order.details?.changeDue > 0 && (
                        <div className="flex justify-between text-xs">
                            <span>Change Due</span>
                            <span>${order.details.changeDue.toFixed(2)}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center text-xs space-y-2">
                    <p>Thank you for shopping with us!</p>
                    <p>Please keep this receipt for returns.</p>
                    <div className="pt-2">
                        <p className="font-bold">www.storename.com</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline" className="gap-2" onClick={handlePrint}>
                    <Printer className="h-4 w-4" /> Print
                </Button>
                <Button size="sm" variant="outline" className="gap-2" onClick={onEmail}>
                    <Mail className="h-4 w-4" /> Email
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" /> Share
                </Button>
            </div>
        </div>
    );
}
