import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { mockCustomers } from '@/mocks/data/customers';
import { mockTransactions } from '@/mocks/data/transactions';
import { ArrowLeft, Mail, Phone, Award, DollarSign, ShoppingCart, Calendar } from 'lucide-react';

export default function CustomerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const customer = mockCustomers.find(c => c.id === id) || mockCustomers[0];

    const customerTransactions = mockTransactions.filter(t => t.customerId === customer.id);
    const totalSpent = customerTransactions.reduce((sum, t) => sum + t.total, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/customers')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">{customer.name}</h1>
                        <p className="text-muted-foreground">Customer Profile</p>
                    </div>
                </div>
                <Button>Edit Profile</Button>
            </div>

            {/* Customer Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                        <Award className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{customer.loyaltyPoints}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${customer.totalSpent.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customerTransactions.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Date(customer.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="info" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="info">Contact Info</TabsTrigger>
                    <TabsTrigger value="history">Purchase History</TabsTrigger>
                    <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Customer contact details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{customer.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{customer.phone}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Last Purchase</p>
                                    <p className="font-medium">{new Date(customer.lastPurchase).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Customer ID</p>
                                    <p className="font-mono font-medium">{customer.id}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Purchase History</CardTitle>
                            <CardDescription>{customerTransactions.length} transactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customerTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-mono text-sm">{transaction.invoiceNumber}</TableCell>
                                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{transaction.items.length} items</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{transaction.paymentMethod.toUpperCase()}</Badge>
                                            </TableCell>
                                            <TableCell className="font-semibold">${transaction.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge>{transaction.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="loyalty" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Loyalty Program</CardTitle>
                            <CardDescription>Points and rewards</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Points</p>
                                        <p className="text-4xl font-bold text-yellow-600">{customer.loyaltyPoints}</p>
                                    </div>
                                    <Award className="h-16 w-16 text-yellow-600" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">Gold Member</Badge>
                                    <p className="text-sm text-muted-foreground">Next tier: Platinum (500 points needed)</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-semibold mb-4">Points History</h4>
                                <div className="space-y-3">
                                    {[
                                        { date: '2026-01-23', action: 'Purchase', points: 45, type: 'earned' },
                                        { date: '2026-01-20', action: 'Redeemed', points: -100, type: 'redeemed' },
                                        { date: '2026-01-18', action: 'Purchase', points: 32, type: 'earned' },
                                        { date: '2026-01-15', action: 'Birthday Bonus', points: 50, type: 'bonus' },
                                    ].map((entry, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{entry.action}</p>
                                                <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className={`text-lg font-bold ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {entry.points > 0 ? '+' : ''}{entry.points}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
