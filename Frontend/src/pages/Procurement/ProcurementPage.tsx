import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ProcurementPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const purchaseOrders = [
        { id: 'PO-001', supplier: 'Tech Supplies Inc', items: 5, total: 1250.00, status: 'pending', date: '2026-01-23' },
        { id: 'PO-002', supplier: 'Office Depot', items: 12, total: 450.00, status: 'approved', date: '2026-01-22' },
        { id: 'PO-003', supplier: 'Beverage Wholesale', items: 8, total: 890.00, status: 'received', date: '2026-01-20' },
        { id: 'PO-004', supplier: 'Snack Distributors', items: 15, total: 320.00, status: 'received', date: '2026-01-19' },
    ];

    const suppliers = [
        { id: '1', name: 'Tech Supplies Inc', contact: 'John Smith', email: 'john@techsupplies.com', phone: '+1-555-0101', orders: 12 },
        { id: '2', name: 'Office Depot', contact: 'Sarah Johnson', email: 'sarah@officedepot.com', phone: '+1-555-0102', orders: 8 },
        { id: '3', name: 'Beverage Wholesale', contact: 'Mike Brown', email: 'mike@bevwholesale.com', phone: '+1-555-0103', orders: 15 },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            pending: { variant: 'secondary', icon: Clock },
            approved: { variant: 'default', icon: CheckCircle },
            received: { variant: 'default', icon: Package },
        };
        const { variant, icon: Icon } = variants[status] || variants.pending;
        return (
            <Badge variant={variant} className="gap-1">
                <Icon className="h-3 w-3" />
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Procurement</h1>
                    <p className="text-muted-foreground">Manage suppliers and purchase orders</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Supplier
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Purchase Order
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total POs</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{purchaseOrders.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {purchaseOrders.filter(po => po.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{suppliers.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${purchaseOrders.reduce((sum, po) => sum + po.total, 0).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
                    <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Purchase Orders</CardTitle>
                                    <CardDescription>Track and manage your purchase orders</CardDescription>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search POs..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>PO Number</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {purchaseOrders.map((po) => (
                                        <TableRow key={po.id}>
                                            <TableCell className="font-mono font-semibold">{po.id}</TableCell>
                                            <TableCell>{po.supplier}</TableCell>
                                            <TableCell>{new Date(po.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{po.items} items</TableCell>
                                            <TableCell className="font-semibold">${po.total.toFixed(2)}</TableCell>
                                            <TableCell>{getStatusBadge(po.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="ghost">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="suppliers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Supplier Directory</CardTitle>
                            <CardDescription>Manage your supplier relationships</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Supplier Name</TableHead>
                                        <TableHead>Contact Person</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Total Orders</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {suppliers.map((supplier) => (
                                        <TableRow key={supplier.id}>
                                            <TableCell className="font-medium">{supplier.name}</TableCell>
                                            <TableCell>{supplier.contact}</TableCell>
                                            <TableCell>{supplier.email}</TableCell>
                                            <TableCell>{supplier.phone}</TableCell>
                                            <TableCell>
                                                <Badge>{supplier.orders} orders</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="ghost">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
