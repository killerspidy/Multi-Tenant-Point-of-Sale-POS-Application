import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockTransactions } from '@/mocks/data/transactions';
import { DollarSign, ShoppingBag, Users, TrendingUp, AlertCircle, Clock } from 'lucide-react';

export default function StoreManagerDashboard() {
    const [period, setPeriod] = useState('Today');

    // Specific Store Data (Mocked for "Downtown Branch")
    const storeStats = {
        dailySales: 4520.50,
        transactionCount: 85,
        activeStaff: 4,
        lowStockItems: 3
    };

    const recentStoreTransactions = mockTransactions.slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Store Manager Dashboard</h1>
                    <p className="text-muted-foreground">Downtown Branch • {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={period === 'Today' ? 'default' : 'outline'} onClick={() => setPeriod('Today')} size="sm">Today</Button>
                    <Button variant={period === 'Week' ? 'default' : 'outline'} onClick={() => setPeriod('Week')} size="sm">This Week</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Store Sales</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${storeStats.dailySales.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1 text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" /> +12% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{storeStats.transactionCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Avg. Ticket: ${(storeStats.dailySales / storeStats.transactionCount).toFixed(2)}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Staff Active</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{storeStats.activeStaff}</div>
                        <p className="text-xs text-muted-foreground mt-1">2 on break</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{storeStats.lowStockItems}</div>
                        <p className="text-xs text-muted-foreground mt-1">Items below reorder level</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Recent Store Activity */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>Latest transactions at this location.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentStoreTransactions.map((tx, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-mono">{tx.invoiceNumber}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell>{tx.items.length}</TableCell>
                                        <TableCell className="font-medium">${tx.total.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Staff Shift Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Staff On Duty</CardTitle>
                        <CardDescription>Current shift status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Mike Cashier', role: 'Counter 1', status: 'Active', time: '09:00 AM' },
                                { name: 'Sarah Sales', role: 'Floor', status: 'Active', time: '09:30 AM' },
                                { name: 'John Stock', role: 'Backroom', status: 'Break', time: '08:00 AM' },
                                { name: 'Emily Lead', role: 'Manager', status: 'Active', time: '08:45 AM' },
                            ].map((staff, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                        <div>
                                            <p className="font-medium text-sm">{staff.name}</p>
                                            <p className="text-xs text-muted-foreground">{staff.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="secondary" className="text-xs">{staff.status}</Badge>
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                                            <Clock className="w-3 h-3" /> {staff.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-4" variant="outline">View Schedule</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
