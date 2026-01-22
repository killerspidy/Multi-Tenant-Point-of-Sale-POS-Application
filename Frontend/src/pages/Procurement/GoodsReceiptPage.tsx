import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Package, CheckCircle, AlertTriangle, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function GoodsReceiptPage() {
    const [selectedPO, setSelectedPO] = useState<any>(null);
    const [receivedQuantities, setReceivedQuantities] = useState<Record<string, number>>({});
    const [qualityNotes, setQualityNotes] = useState('');

    const purchaseOrders = [
        {
            id: 'PO-001',
            supplier: 'Tech Supplies Inc',
            date: '2026-01-20',
            items: [
                { id: '1', product: 'Wireless Mouse', ordered: 50, unit: 'piece', price: 15.00 },
                { id: '2', product: 'USB-C Cable', ordered: 100, unit: 'piece', price: 5.00 },
            ],
        },
    ];

    const handleSelectPO = (po: any) => {
        setSelectedPO(po);
        const initialQuantities: Record<string, number> = {};
        po.items.forEach((item: any) => {
            initialQuantities[item.id] = item.ordered;
        });
        setReceivedQuantities(initialQuantities);
    };

    const updateReceivedQuantity = (itemId: string, quantity: number) => {
        setReceivedQuantities(prev => ({ ...prev, [itemId]: quantity }));
    };

    const getVarianceStatus = (ordered: number, received: number) => {
        if (received === ordered) return { status: 'exact', color: 'text-green-600' };
        if (received < ordered) return { status: 'short', color: 'text-orange-600' };
        return { status: 'excess', color: 'text-blue-600' };
    };

    const processGRN = () => {
        toast.success('Goods Receipt Note created successfully!');
        setSelectedPO(null);
        setReceivedQuantities({});
        setQualityNotes('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Goods Receipt</h1>
                <p className="text-muted-foreground">Receive and verify incoming stock</p>
            </div>

            {/* PO Selection */}
            {!selectedPO ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Select Purchase Order</CardTitle>
                        <CardDescription>Choose a PO to create goods receipt</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {purchaseOrders.map((po) => (
                                <div
                                    key={po.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer"
                                    onClick={() => handleSelectPO(po)}
                                >
                                    <div>
                                        <p className="font-semibold">{po.id}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {po.supplier} • {po.items.length} items • {new Date(po.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Button size="sm">Select</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* GRN Form */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Goods Receipt Note</CardTitle>
                                    <CardDescription>
                                        PO: {selectedPO.id} • Supplier: {selectedPO.supplier}
                                    </CardDescription>
                                </div>
                                <Button variant="outline" onClick={() => setSelectedPO(null)}>
                                    Change PO
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Items Verification */}
                            <div>
                                <h3 className="font-semibold mb-4">Verify Received Items</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Ordered</TableHead>
                                            <TableHead>Received</TableHead>
                                            <TableHead>Variance</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedPO.items.map((item: any) => {
                                            const received = receivedQuantities[item.id] || 0;
                                            const variance = received - item.ordered;
                                            const { status, color } = getVarianceStatus(item.ordered, received);

                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.product}</TableCell>
                                                    <TableCell>{item.ordered} {item.unit}(s)</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            className="w-24"
                                                            value={received}
                                                            onChange={(e) => updateReceivedQuantity(item.id, parseInt(e.target.value) || 0)}
                                                        />
                                                    </TableCell>
                                                    <TableCell className={color}>
                                                        {variance > 0 ? '+' : ''}{variance}
                                                    </TableCell>
                                                    <TableCell>
                                                        {status === 'exact' && <Badge variant="default">Exact</Badge>}
                                                        {status === 'short' && <Badge variant="secondary">Short</Badge>}
                                                        {status === 'excess' && <Badge variant="outline">Excess</Badge>}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Quality Inspection */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Quality Inspection</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Accepted Quantity</Label>
                                        <Input type="number" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Rejected Quantity</Label>
                                        <Input type="number" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Damaged Quantity</Label>
                                        <Input type="number" placeholder="0" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Quality Notes</Label>
                                    <Textarea
                                        id="notes"
                                        rows={3}
                                        placeholder="Enter any quality issues or observations..."
                                        value={qualityNotes}
                                        onChange={(e) => setQualityNotes(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" className="w-full">
                                    <Camera className="mr-2 h-4 w-4" />
                                    Upload Photos
                                </Button>
                            </div>

                            {/* Summary */}
                            <div className="p-4 bg-muted rounded-lg space-y-2">
                                <h4 className="font-semibold">Receipt Summary</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span>Total Items Ordered:</span>
                                    <span className="font-medium">
                                        {selectedPO.items.reduce((sum: number, item: any) => sum + item.ordered, 0)}
                                    </span>
                                    <span>Total Items Received:</span>
                                    <span className="font-medium">
                                        {Object.values(receivedQuantities).reduce((sum: number, qty: number) => sum + qty, 0)}
                                    </span>
                                    <span>Total Value:</span>
                                    <span className="font-medium">
                                        ${selectedPO.items.reduce((sum: number, item: any) => sum + (item.ordered * item.price), 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline">Save as Draft</Button>
                                <Button onClick={processGRN}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Complete Receipt
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
