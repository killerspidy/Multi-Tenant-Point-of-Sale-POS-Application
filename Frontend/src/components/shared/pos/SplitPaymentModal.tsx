import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Banknote, Smartphone, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SplitPaymentModalProps {
    totalAmount: number;
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export default function SplitPaymentModal({ totalAmount, isOpen, onClose, onComplete }: SplitPaymentModalProps) {
    const [payments, setPayments] = useState<{ method: string; amount: number }[]>([]);
    const [currentAmount, setCurrentAmount] = useState<string>('');
    const [currentMethod, setCurrentMethod] = useState<string>('cash');

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const remaining = totalAmount - totalPaid;

    const handleAddPayment = () => {
        const amount = parseFloat(currentAmount);
        if (!amount || amount <= 0) return;
        if (amount > remaining) {
            toast.error('Amount exceeds remaining balance');
            return;
        }

        setPayments([...payments, { method: currentMethod, amount }]);
        setCurrentAmount('');

        if (amount === remaining) {
            // Payment complete logic could go here or user clicks "Finalize"
        }
    };

    const handleRemovePayment = (index: number) => {
        const newPayments = [...payments];
        newPayments.splice(index, 1);
        setPayments(newPayments);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Split Payment</DialogTitle>
                    <DialogDescription>Divide the total amount across multiple payment methods.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Summary Box */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-muted p-3 rounded-lg">
                            <p className="text-xs text-muted-foreground uppercase">Total</p>
                            <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <p className="text-xs text-green-700 uppercase">Paid</p>
                            <p className="text-xl font-bold text-green-700">${totalPaid.toFixed(2)}</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <p className="text-xs text-orange-700 uppercase">Remaining</p>
                            <p className="text-xl font-bold text-orange-700">${remaining.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Payment Entry */}
                    {remaining > 0 && (
                        <div className="space-y-4">
                            <Tabs defaultValue="cash" value={currentMethod} onValueChange={setCurrentMethod} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="cash"><Banknote className="w-4 h-4 mr-2" />Cash</TabsTrigger>
                                    <TabsTrigger value="card"><CreditCard className="w-4 h-4 mr-2" />Card</TabsTrigger>
                                    <TabsTrigger value="upi"><Smartphone className="w-4 h-4 mr-2" />UPI</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            <div className="flex gap-2">
                                <div className="space-y-1 flex-1">
                                    <Label>Amount to Pay</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                        <Input
                                            type="number"
                                            className="pl-6 text-lg font-bold"
                                            placeholder={remaining.toFixed(2)}
                                            max={remaining}
                                            value={currentAmount}
                                            onChange={(e) => setCurrentAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button className="mt-7" onClick={handleAddPayment} disabled={!currentAmount}>Add</Button>
                            </div>
                        </div>
                    )}

                    {/* Payments List */}
                    <div className="space-y-2">
                        <Label className="text-xs uppercase text-muted-foreground">Payment Breakdown</Label>
                        {payments.length === 0 && (
                            <div className="text-center py-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                                No payments recorded yet.
                            </div>
                        )}
                        {payments.map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border rounded-lg bg-card">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="uppercase">{p.method}</Badge>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold">${p.amount.toFixed(2)}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleRemovePayment(i)}>
                                        ✕
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={onComplete} disabled={remaining > 0} className="w-full sm:w-auto">
                        {remaining === 0 ? <><Check className="mr-2 h-4 w-4" /> Complete Transaction</> : `Pay remaining $${remaining.toFixed(2)}`}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
