import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, AlertTriangle, TrendingDown, TrendingUp, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '@/contexts/DataContext';

export default function InventoryPage() {
    const { products, updateProductStock } = useData(); // Use Dynamic Data
    const [searchQuery, setSearchQuery] = useState('');

    // Derived state from dynamic products
    const lowStockProducts = products.filter(p => p.stock <= p.reorderLevel);

    const [showTransferDialog, setShowTransferDialog] = useState(false);
    const [showAdjustmentDialog, setShowAdjustmentDialog] = useState(false);
    const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
    const [selectedProductForTransfer, setSelectedProductForTransfer] = useState<string | null>(null);
    const [selectedProductForAdjustment, setSelectedProductForAdjustment] = useState<string | null>(null);
    const [adjustmentQty, setAdjustmentQty] = useState('');

    // Mock Location Data
    const locations = ['Warehouse', 'Main Store', 'Downtown Branch'];
    // Mock Stock Distribution Generator (Visual only for now since we don't have location-stock model yet)
    const getStockByLocation = (totalStock: number) => {
        const warehouse = Math.floor(totalStock * 0.6);
        const mainStore = Math.floor(totalStock * 0.3);
        const downtown = totalStock - warehouse - mainStore;
        return { Warehouse: warehouse, 'Main Store': mainStore, 'Downtown Branch': downtown };
    };

    const totalValue = products.reduce((sum, p) => sum + (p.costPrice * p.stock), 0);
    const totalItems = products.reduce((sum, p) => sum + p.stock, 0);

    const handleStockAdjustment = () => {
        if (!selectedProductForAdjustment) return;

        const qty = parseInt(adjustmentQty);
        if (isNaN(qty) || qty <= 0) {
            toast.error('Invalid quantity');
            return;
        }

        const change = adjustmentType === 'add' ? qty : -qty;
        updateProductStock(selectedProductForAdjustment, change);

        toast.success(`Stock ${adjustmentType === 'add' ? 'added' : 'removed'} successfully`);
        setShowAdjustmentDialog(false);
        setAdjustmentQty('');
    };

    // Filter products for display
    const filteredProducts = products.filter(p => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            p.name.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Inventory Management</h1>
                    <p className="text-muted-foreground">Track and manage your stock levels</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <TrendingDown className="mr-2 h-4 w-4" />
                        Stock Out
                    </Button>
                    <Button>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Stock In
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">At cost price</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalItems}</div>
                        <p className="text-xs text-muted-foreground">Across all products</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</div>
                        <p className="text-xs text-muted-foreground">Need reordering</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Product Categories</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{new Set(products.map(p => p.category)).size}</div>
                        <p className="text-xs text-muted-foreground">Active categories</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Stock</TabsTrigger>
                    <TabsTrigger value="low">Low Stock</TabsTrigger>
                    <TabsTrigger value="all">All Stock</TabsTrigger>
                    <TabsTrigger value="location">Stock by Location</TabsTrigger>
                    <TabsTrigger value="low">Low Stock</TabsTrigger>
                    <TabsTrigger value="movements">Stock Movements</TabsTrigger>
                </TabsList>

                <TabsContent value="location" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stock Distribution</CardTitle>
                            <CardDescription>View inventory levels across all locations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        {locations.map(loc => <TableHead key={loc}>{loc}</TableHead>)}
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => {
                                        const stockDist = getStockByLocation(product.stock);
                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium">
                                                    <div>{product.name}</div>
                                                    <div className="text-xs text-muted-foreground">{product.sku}</div>
                                                </TableCell>
                                                {locations.map(loc => (
                                                    <TableCell key={loc}>
                                                        <Badge variant="outline">{stockDist[loc as keyof typeof stockDist]}</Badge>
                                                    </TableCell>
                                                ))}
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedProductForTransfer(product.id);
                                                            setShowTransferDialog(true);
                                                        }}
                                                    >
                                                        Transfer
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Stock Levels</CardTitle>
                                    <CardDescription>Current inventory across all products</CardDescription>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
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
                                        <TableHead>Product</TableHead>
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Current Stock</TableHead>
                                        <TableHead>Reorder Level</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>
                                                <Badge variant={product.stock <= product.reorderLevel ? 'destructive' : 'default'}>
                                                    {product.stock} {product.unit}(s)
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{product.reorderLevel}</TableCell>
                                            <TableCell className="font-semibold">
                                                ${(product.costPrice * product.stock).toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setSelectedProductForAdjustment(product.id);
                                                            setAdjustmentType('add');
                                                            setShowAdjustmentDialog(true);
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setSelectedProductForAdjustment(product.id);
                                                            setAdjustmentType('remove');
                                                            setShowAdjustmentDialog(true);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="low" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                                Low Stock Alert
                            </CardTitle>
                            <CardDescription>Products that need immediate reordering</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Current Stock</TableHead>
                                        <TableHead>Reorder Level</TableHead>
                                        <TableHead>Suggested Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lowStockProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="destructive">{product.stock}</Badge>
                                            </TableCell>
                                            <TableCell>{product.reorderLevel}</TableCell>
                                            <TableCell className="font-semibold">
                                                {product.reorderLevel * 2} units
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm">Create PO</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="movements" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Stock Movements</CardTitle>
                            <CardDescription>Track all inventory changes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { type: 'in', product: 'Wireless Mouse', qty: 50, date: '2026-01-23', user: 'John Admin' },
                                    { type: 'out', product: 'USB-C Cable', qty: 10, date: '2026-01-23', user: 'Sale' },
                                    { type: 'in', product: 'Bluetooth Speaker', qty: 25, date: '2026-01-22', user: 'Sarah Manager' },
                                    { type: 'adjustment', product: 'Notebook A5', qty: -5, date: '2026-01-22', user: 'Damage' },
                                ].map((movement, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <Badge variant={movement.type === 'in' ? 'default' : movement.type === 'out' ? 'secondary' : 'destructive'}>
                                                {movement.type.toUpperCase()}
                                            </Badge>
                                            <div>
                                                <p className="font-medium">{movement.product}</p>
                                                <p className="text-sm text-muted-foreground">{movement.user} • {movement.date}</p>
                                            </div>
                                        </div>
                                        <div className={`text-lg font-bold ${movement.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {movement.qty > 0 ? '+' : ''}{movement.qty}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            {/* Transfer Dialog */}
            <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Transfer Stock</DialogTitle>
                        <DialogDescription>Move inventory between locations</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>From Location</Label>
                                <Select defaultValue="Warehouse">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>To Location</Label>
                                <Select defaultValue="Main Store">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input type="number" placeholder="Enter quantity" />
                        </div>
                        <div className="space-y-2">
                            <Label>Reason (Optional)</Label>
                            <Input placeholder="e.g. Restock request" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowTransferDialog(false)}>Cancel</Button>
                        <Button onClick={() => {
                            toast.success('Stock transfer initiated successfully');
                            setShowTransferDialog(false);
                        }}>Confirm Transfer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Adjustment Dialog */}
            < Dialog open={showAdjustmentDialog} onOpenChange={setShowAdjustmentDialog} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{adjustmentType === 'add' ? 'Add Stock' : 'Remove Stock'}</DialogTitle>
                        <DialogDescription>
                            {adjustmentType === 'add' ? 'Record incoming inventory' : 'Record inventory write-off or loss'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                placeholder="Enter quantity"
                                value={adjustmentQty}
                                onChange={(e) => setAdjustmentQty(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Reason</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                                <SelectContent>
                                    {adjustmentType === 'add' ? (
                                        <>
                                            <SelectItem value="purchase">Purchase Order</SelectItem>
                                            <SelectItem value="return">Customer Return</SelectItem>
                                            <SelectItem value="found">Inventory Found</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="damage">Damaged/Expired</SelectItem>
                                            <SelectItem value="theft">Theft/Loss</SelectItem>
                                            <SelectItem value="correction">Count Correction</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Notes (Optional)</Label>
                            <Input placeholder="Additional details" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAdjustmentDialog(false)}>Cancel</Button>
                        <Button variant={adjustmentType === 'remove' ? 'destructive' : 'default'} onClick={handleStockAdjustment}>
                            Confirm {adjustmentType === 'add' ? 'Addition' : 'Removal'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div >
    );
}
