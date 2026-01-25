import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Banknote, CreditCard, Wallet, Smartphone, ArrowRight, Printer, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    total: number;
    onComplete: (method: string, details?: any) => Promise<void>;
}

export default function PaymentModal({ open, onOpenChange, total, onComplete }: PaymentModalProps) {
    const [step, setStep] = useState<'method' | 'process' | 'receipt'>('method');
    const [method, setMethod] = useState<string>('');
    const [cashTendered, setCashTendered] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        if (open) {
            setStep('method'); // Reset on open
            setMethod('');
            setCashTendered('');
            setOrderSuccess(false);
        }
    }, [open]);

    // Format helpers
    const formatMoney = (val: number) => `$${val.toFixed(2)}`;
    const changeDue = Math.max(0, (parseFloat(cashTendered) || 0) - total);
    const remainingDue = Math.max(0, total - (parseFloat(cashTendered) || 0));

    const handleMethodSelect = (selected: string) => {
        setMethod(selected);
        setStep('process');
    };

    const handleProcess = async () => {
        if (method === 'cash' && remainingDue > 0) {
            toast.error('Insufficient cash tendered');
            return;
        }

        setIsProcessing(true);
        try {
            await onComplete(method, { cashTendered: parseFloat(cashTendered) || 0, changeDue });
            setStep('receipt');
            setOrderSuccess(true);
        } catch (error) {
            toast.error('Payment failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        {step === 'receipt' ? 'Payment Successful' : 'Complete Payment'}
                        {step !== 'receipt' && <span className="text-xl font-bold text-primary">{formatMoney(total)}</span>}
                    </DialogTitle>
                    {step === 'receipt' && <DialogDescription>Order #ORD-123456 completed successfully</DialogDescription>}
                </DialogHeader>

                <div className="py-4">
                    {/* Step 1: Select Method */}
                    {step === 'method' && (
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'cash', label: 'Cash', icon: Banknote },
                                { id: 'card', label: 'Card Terminal', icon: CreditCard },
                                { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                                { id: 'wallet', label: 'Wallet', icon: Wallet },
                            ].map((m) => (
                                <Button
                                    key={m.id}
                                    variant="outline"
                                    className="h-24 flex flex-col gap-3 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all"
                                    onClick={() => handleMethodSelect(m.id)}
                                >
                                    <m.icon className="h-8 w-8" />
                                    <span className="font-semibold text-lg">{m.label}</span>
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Process (Cash or Other) */}
                    {step === 'process' && (
                        <div className="space-y-6">
                            {method === 'cash' ? (
                                <div className="space-y-4">
                                    <div className="bg-muted p-4 rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground mb-1">Total Due</p>
                                        <p className="text-3xl font-bold">{formatMoney(total)}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-base">Amount Tendered</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                autoFocus
                                                type="number"
                                                className="pl-7 h-12 text-lg"
                                                value={cashTendered}
                                                onChange={(e) => setCashTendered(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleProcess()}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        {[1, 5, 10, 20, 50, 100].map((amt) => (
                                            <Button
                                                key={amt}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCashTendered((prev) => (parseFloat(prev || '0') + amt).toString())}
                                            >
                                                +${amt}
                                            </Button>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => setCashTendered(total.toString())}>
                                            Exact
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setCashTendered('')}>
                                            Clear
                                        </Button>
                                    </div>

                                    {parseFloat(cashTendered) > total && (
                                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex justify-between items-center text-green-700 dark:text-green-400">
                                            <span className="font-semibold">Change Due</span>
                                            <span className="text-xl font-bold">{formatMoney(changeDue)}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 space-y-4">
                                    <div className="animate-pulse bg-primary/10 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                                        {method === 'card' && <CreditCard className="h-10 w-10 text-primary" />}
                                        {method === 'upi' && <Smartphone className="h-10 w-10 text-primary" />}
                                        {method === 'wallet' && <Wallet className="h-10 w-10 text-primary" />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium">Waiting for payment...</h3>
                                        <p className="text-sm text-muted-foreground">Follow instructions on the terminal</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Receipt */}
                    {step === 'receipt' && (
                        <div className="text-center space-y-6 py-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Transaction Complete</h3>
                                <p className="text-muted-foreground">A receipt has been sent to email.</p>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" className="flex gap-2">
                                    <Printer className="h-4 w-4" /> Print Receipt
                                </Button>
                                <Button onClick={handleClose}>
                                    New Sale
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="sm:justify-between">
                    {step !== 'receipt' && (
                        <Button
                            variant="ghost"
                            onClick={() => step === 'method' ? handleClose() : setStep('method')}
                            disabled={isProcessing}
                        >
                            {step === 'method' ? 'Cancel' : 'Back'}
                        </Button>
                    )}
                    {step === 'process' && (
                        <Button
                            onClick={handleProcess}
                            disabled={isProcessing || (method === 'cash' && remainingDue > 0)}
                            className="ml-auto"
                        >
                            {isProcessing ? 'Processing...' : `Charge ${formatMoney(total)}`} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
