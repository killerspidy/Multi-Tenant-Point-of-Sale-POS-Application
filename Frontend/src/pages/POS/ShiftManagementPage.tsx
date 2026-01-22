import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, DollarSign, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ShiftManagementPage() {
    const [shiftStatus, setShiftStatus] = useState<'closed' | 'open'>('closed');
    const [openingCash, setOpeningCash] = useState('');
    const [closingCash, setClosingCash] = useState('');

    const shiftData = {
        cashier: 'Mike Cashier',
        startTime: '2026-01-23 09:00:00',
        endTime: shiftStatus === 'open' ? null : '2026-01-23 17:00:00',
        transactions: 45,
        totalSales: 2340.50,
        cashSales: 1200.00,
        cardSales: 980.50,
        upiSales: 160.00,
        returns: 2,
        refundAmount: 45.00,
        discounts: 125.00,
    };

    const handleOpenShift = () => {
        if (!openingCash || parseFloat(openingCash) < 0) {
            toast.error('Please enter valid opening cash amount');
            return;
        }
        setShiftStatus('open');
        toast.success('Shift opened successfully!');
    };

    const handleCloseShift = () => {
        if (!closingCash || parseFloat(closingCash) < 0) {
            toast.error('Please enter valid closing cash amount');
            return;
        }

        const expected = parseFloat(openingCash) + shiftData.cashSales - shiftData.refundAmount;
        const actual = parseFloat(closingCash);
        const variance = actual - expected;

        setShiftStatus('closed');
        toast.success(`Shift closed! Cash variance: $${variance.toFixed(2)}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Shift Management</h1>
                    <p className="text-muted-foreground">Manage cash drawer and shift operations</p>
                </div>
                <Badge variant={shiftStatus === 'open' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                    {shiftStatus === 'open' ? 'Shift Open' : 'Shift Closed'}
                </Badge>
            </div>

            {/* Shift Status */}
            {shiftStatus === 'closed' ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Open Shift</CardTitle>
                        <CardDescription>Start your shift and declare opening cash</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="openingCash">Opening Cash Amount *</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="openingCash"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-10"
                                    value={openingCash}
                                    onChange={(e) => setOpeningCash(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button onClick={handleOpenShift} className="w-full" size="lg">
                            <Clock className="mr-2 h-4 w-4" />
                            Open Shift
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* Shift Summary */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${shiftData.totalSales.toFixed(2)}</div>
                                <p className="text-xs text-muted-foreground">{shiftData.transactions} transactions</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Cash Sales</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${shiftData.cashSales.toFixed(2)}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Returns</CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{shiftData.returns}</div>
                                <p className="text-xs text-muted-foreground">${shiftData.refundAmount.toFixed(2)} refunded</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Discounts</CardTitle>
                                <TrendingDown className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">${shiftData.discounts.toFixed(2)}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Shift Details</CardTitle>
                            <CardDescription>
                                Started: {shiftData.startTime} • Cashier: {shiftData.cashier}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Opening Cash</p>
                                    <p className="text-2xl font-bold">${parseFloat(openingCash).toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Expected Cash</p>
                                    <p className="text-2xl font-bold">
                                        ${(parseFloat(openingCash) + shiftData.cashSales - shiftData.refundAmount).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <h4 className="font-semibold">Payment Breakdown</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Cash</span>
                                        <span className="font-medium">${shiftData.cashSales.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Card</span>
                                        <span className="font-medium">${shiftData.cardSales.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">UPI</span>
                                        <span className="font-medium">${shiftData.upiSales.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Close Shift */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Close Shift</CardTitle>
                            <CardDescription>Count cash and close your shift</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="closingCash">Actual Cash in Drawer *</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="closingCash"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="pl-10"
                                        value={closingCash}
                                        onChange={(e) => setClosingCash(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleCloseShift} className="w-full" size="lg" variant="destructive">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Close Shift
                            </Button>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
