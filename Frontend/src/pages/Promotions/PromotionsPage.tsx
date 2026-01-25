import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Gift, Percent, Calendar, Users } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function PromotionsPage() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const promotions = [
        { id: '1', name: 'Summer Sale', type: 'percentage', value: 20, startDate: '2026-06-01', endDate: '2026-08-31', status: 'scheduled', uses: 0 },
        { id: '2', name: 'Buy 2 Get 1 Free', type: 'bogo', value: 100, startDate: '2026-01-15', endDate: '2026-02-15', status: 'active', uses: 45 },
        { id: '3', name: 'New Customer Discount', type: 'fixed', value: 10, startDate: '2026-01-01', endDate: '2026-12-31', status: 'active', uses: 128 },
        { id: '4', name: 'Holiday Special', type: 'percentage', value: 15, startDate: '2025-12-20', endDate: '2026-01-05', status: 'expired', uses: 234 },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: 'default',
            scheduled: 'secondary',
            expired: 'outline',
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
    };

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            percentage: 'Percentage Off',
            fixed: 'Fixed Amount',
            bogo: 'Buy One Get One',
        };
        return labels[type] || type;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Promotions & Discounts</h1>
                    <p className="text-muted-foreground">Create and manage promotional campaigns</p>
                </div>
                <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Promotion
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
                        <Gift className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{promotions.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {promotions.filter(p => p.status === 'active').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Uses</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {promotions.reduce((sum, p) => sum + p.uses, 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(promotions.reduce((sum, p) => sum + p.value, 0) / promotions.length).toFixed(0)}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Promotions Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Promotions</CardTitle>
                    <CardDescription>Manage your promotional campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Promotion Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Uses</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {promotions.map((promo) => (
                                <TableRow key={promo.id}>
                                    <TableCell className="font-medium">{promo.name}</TableCell>
                                    <TableCell>{getTypeLabel(promo.type)}</TableCell>
                                    <TableCell className="font-semibold">
                                        {promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`}
                                    </TableCell>
                                    <TableCell>{new Date(promo.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(promo.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{promo.uses} times</Badge>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(promo.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button size="sm" variant="ghost">Edit</Button>
                                            <Button size="sm" variant="ghost">Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {/* Create Promotion Dialog */}
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Create New Promotion</DialogTitle>
                        <DialogDescription>Set up a new discount or offer</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Promotion Name</Label>
                            <Input placeholder="e.g. Summer Sale 2026" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select defaultValue="percentage">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">Percentage Off</SelectItem>
                                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                                        <SelectItem value="bogo">Buy X Get Y</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Value</Label>
                                <Input type="number" placeholder="20" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="date" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Minimum Spend (Optional)</Label>
                            <Input type="number" placeholder="0.00" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                        <Button onClick={() => {
                            toast.success('Promotion created successfully');
                            setShowCreateDialog(false);
                        }}>Create Campaign</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
