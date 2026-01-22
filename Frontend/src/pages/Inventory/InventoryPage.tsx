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
import { mockProducts, getLowStockProducts } from '@/mocks/data/products';
import { Search, Plus, AlertTriangle, TrendingDown, TrendingUp, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const lowStockProducts = getLowStockProducts();

    const totalValue = mockProducts.reduce((sum, p) => sum + (p.costPrice * p.stock), 0);
    const totalItems = mockProducts.reduce((sum, p) => sum + p.stock, 0);

    const handleStockAdjustment = (productId: string, type: 'add' | 'remove') => {
        toast.success(`Stock ${type === 'add' ? 'added' : 'removed'} successfully`);
    };

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
                        <div className="text-2xl font-bold">{new Set(mockProducts.map(p => p.category)).size}</div>
                        <p className="text-xs text-muted-foreground">Active categories</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Stock</TabsTrigger>
                    <TabsTrigger value="low">Low Stock</TabsTrigger>
                    <TabsTrigger value="movements">Stock Movements</TabsTrigger>
                </TabsList>

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
                                    {mockProducts.map((product) => (
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
                                                        onClick={() => handleStockAdjustment(product.id, 'add')}
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleStockAdjustment(product.id, 'remove')}
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
        </div>
    );
}
