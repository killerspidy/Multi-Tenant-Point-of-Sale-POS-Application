import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { mockCustomers, searchCustomers } from '@/mocks/data/customers';
import { Search, Plus, Mail, Phone, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CustomersPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);

    const filteredCustomers = searchQuery
        ? searchCustomers(searchQuery)
        : mockCustomers;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Customers</h1>
                    <p className="text-muted-foreground">Manage your customer database</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/customers/loyalty')}>
                        <Award className="mr-2 h-4 w-4" />
                        Loyalty Program
                    </Button>
                    <Button onClick={() => setShowAddCustomerDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Customer
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockCustomers.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Loyalty Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockCustomers.reduce((sum, c) => sum + c.loyaltyPoints, 0).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Spend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / mockCustomers.length).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, email, or phone..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Customers Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Loyalty Points</TableHead>
                                <TableHead>Total Spent</TableHead>
                                <TableHead>Last Purchase</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                        No customers found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{customer.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Member since {new Date(customer.joinDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                                    {customer.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Award className="h-4 w-4 text-yellow-600" />
                                                <span className="font-semibold">{customer.loyaltyPoints}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            ${customer.totalSpent.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(customer.lastPurchase).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => navigate(`/customers/${customer.id}`)}>
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {/* Add Customer Dialog */}
            <Dialog open={showAddCustomerDialog} onOpenChange={setShowAddCustomerDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Customer</DialogTitle>
                        <DialogDescription>Create a new customer profile</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Full Name *</Label>
                            <Input placeholder="e.g. Alice Smith" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input placeholder="+1..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="alice@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input placeholder="Mailing address" />
                        </div>
                        <div className="space-y-2">
                            <Label>Initial Loyalty Points</Label>
                            <Input type="number" placeholder="0" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddCustomerDialog(false)}>Cancel</Button>
                        <Button onClick={() => {
                            toast.success('Customer added successfully');
                            setShowAddCustomerDialog(false);
                        }}>Create Customer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
