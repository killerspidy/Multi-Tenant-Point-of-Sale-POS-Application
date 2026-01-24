import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Send, Trash2 } from 'lucide-react';

export default function PurchaseRequisitionPage() {
    const [items, setItems] = useState([{ id: 1, product: '', qty: 1, reason: '' }]);

    const addItem = () => {
        setItems([...items, { id: Date.now(), product: '', qty: 1, reason: '' }]);
    };

    const removeItem = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Purchase Requisition</h1>
                    <p className="text-muted-foreground">Request stock or new items for your department.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Requisition Form</CardTitle>
                    <CardDescription>Submitted requests will be reviewed by the Procurement Manager.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Requested By</Label>
                            <Input value="Mike Cashier" disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Input value="Front of House" disabled className="bg-muted" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Priority</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Normal</option>
                            <option>Urgent</option>
                            <option>Critical (Stock Out)</option>
                        </select>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%]">Product / Item Name</TableHead>
                                    <TableHead className="w-[15%]">Quantity</TableHead>
                                    <TableHead>Reason / Notes</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Input placeholder="e.g. Receipt Paper Rolls" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" min="1" placeholder="1" />
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Running low..." />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="p-2 bg-muted/50 border-t">
                            <Button variant="ghost" size="sm" onClick={addItem} className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> Add Item Line
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Additional Comments</Label>
                        <Textarea placeholder="Any specific requirements regarding brands or suppliers..." />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline">Save Draft</Button>
                        <Button>
                            <Send className="mr-2 h-4 w-4" /> Submit Request
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
