import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, PlayCircle, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function HeldOrdersPage() {
    const [heldOrders] = useState([
        { id: 'HOLD-101', customer: 'John Doe', items: 3, total: 45.50, time: '10:30 AM', notes: 'Forgot wallet' },
        { id: 'HOLD-102', customer: 'Walk-in', items: 8, total: 124.00, time: '11:15 AM', notes: 'Adding more items' },
        { id: 'HOLD-103', customer: 'Sarah Smith', items: 1, total: 12.99, time: '11:45 AM', notes: 'Phone call' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Held Orders</h1>
                    <p className="text-muted-foreground">Resume or discard parked transactions.</p>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search orders..." className="pl-10" />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hold ID</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {heldOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        {order.time}
                                    </TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.items}</TableCell>
                                    <TableCell className="font-bold">${order.total.toFixed(2)}</TableCell>
                                    <TableCell className="text-muted-foreground italic text-sm">{order.notes}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4 mr-1" /> Discard
                                            </Button>
                                            <Button size="sm">
                                                <PlayCircle className="h-4 w-4 mr-1" /> Resume
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
