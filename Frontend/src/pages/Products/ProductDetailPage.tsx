import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { mockProducts, getCategories } from '@/mocks/data/products';
import { ArrowLeft, Save, Plus, Trash2, Package, DollarSign, Barcode } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = mockProducts.find(p => p.id === id) || mockProducts[0];

    const [formData, setFormData] = useState({
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        category: product.category,
        brand: product.brand,
        description: product.description,
        price: product.price.toString(),
        costPrice: product.costPrice.toString(),
        taxRate: product.taxRate.toString(),
        stock: product.stock.toString(),
        reorderLevel: product.reorderLevel.toString(),
        unit: product.unit,
        status: product.status,
    });

    const [variants, setVariants] = useState([
        { id: '1', name: 'Small', sku: 'ELEC-001-S', price: 27.99, stock: 15 },
        { id: '2', name: 'Medium', sku: 'ELEC-001-M', price: 29.99, stock: 25 },
        { id: '3', name: 'Large', sku: 'ELEC-001-L', price: 32.99, stock: 10 },
    ]);

    const handleSave = () => {
        toast.success('Product updated successfully!');
    };

    const addVariant = () => {
        const newVariant = {
            id: Date.now().toString(),
            name: 'New Variant',
            sku: `${formData.sku}-V${variants.length + 1}`,
            price: parseFloat(formData.price),
            stock: 0,
        };
        setVariants([...variants, newVariant]);
    };

    const removeVariant = (id: string) => {
        setVariants(variants.filter(v => v.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/products')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Product Details</h1>
                        <p className="text-muted-foreground">Edit product information and variants</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Delete</Button>
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General Info</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing & Tax</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="variants">Variants</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Product name, SKU, and category</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU *</Label>
                                    <Input
                                        id="sku"
                                        value={formData.sku}
                                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="barcode">Barcode</Label>
                                    <div className="relative">
                                        <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="barcode"
                                            className="pl-10"
                                            value={formData.barcode}
                                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getCategories().map((cat) => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand</Label>
                                    <Input
                                        id="brand"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="discontinued">Discontinued</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing & Taxation</CardTitle>
                            <CardDescription>Set product prices and tax rates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="costPrice">Cost Price *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="costPrice"
                                            type="number"
                                            step="0.01"
                                            className="pl-10"
                                            value={formData.costPrice}
                                            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Selling Price *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            className="pl-10"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                                    <Input
                                        id="taxRate"
                                        type="number"
                                        step="0.01"
                                        value={formData.taxRate}
                                        onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Profit Margin:</span>
                                    <span className="font-semibold">
                                        ${(parseFloat(formData.price) - parseFloat(formData.costPrice)).toFixed(2)} (
                                        {(((parseFloat(formData.price) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice)) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Price with Tax:</span>
                                    <span className="font-semibold">
                                        ${(parseFloat(formData.price) * (1 + parseFloat(formData.taxRate) / 100)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stock Management</CardTitle>
                            <CardDescription>Current stock levels and reorder settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Current Stock *</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                                    <Input
                                        id="reorderLevel"
                                        type="number"
                                        value={formData.reorderLevel}
                                        onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unit</Label>
                                    <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="piece">Piece</SelectItem>
                                            <SelectItem value="pack">Pack</SelectItem>
                                            <SelectItem value="box">Box</SelectItem>
                                            <SelectItem value="bottle">Bottle</SelectItem>
                                            <SelectItem value="kg">Kilogram</SelectItem>
                                            <SelectItem value="liter">Liter</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {parseInt(formData.stock) <= parseInt(formData.reorderLevel) && (
                                <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 rounded-lg">
                                    <p className="text-sm text-orange-800 dark:text-orange-200 font-medium">
                                        ⚠️ Stock is below reorder level. Consider creating a purchase order.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="variants" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Product Variants</CardTitle>
                                    <CardDescription>Manage size, color, or other variations</CardDescription>
                                </div>
                                <Button onClick={addVariant} size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Variant
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {variants.map((variant) => (
                                    <div key={variant.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="flex-1 grid grid-cols-4 gap-4">
                                            <Input placeholder="Variant Name" defaultValue={variant.name} />
                                            <Input placeholder="SKU" defaultValue={variant.sku} />
                                            <Input type="number" step="0.01" placeholder="Price" defaultValue={variant.price} />
                                            <Input type="number" placeholder="Stock" defaultValue={variant.stock} />
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeVariant(variant.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
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
