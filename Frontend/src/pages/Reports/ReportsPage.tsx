import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { mockTransactions } from '@/mocks/data/transactions';
import { FileText, Download, Calendar, TrendingUp, ShoppingCart, Banknote, CreditCard, Smartphone, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ReportsPage() {
    const [reportType, setReportType] = useState('sales');
    const [timeRange, setTimeRange] = useState('7days');

    const totalRevenue = mockTransactions.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = mockTransactions.length;
    const avgTransaction = totalRevenue / totalTransactions;

    // Payment Method Breakdown
    const paymentBreakdown = mockTransactions.reduce((acc, t) => {
        acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + t.total;
        return acc;
    }, {} as Record<string, number>);

    // Category Breakdown
    const categoryBreakdown = mockTransactions.reduce((acc, t) => {
        t.items.forEach(item => {
            const cat = item.category || 'General';
            acc[cat] = (acc[cat] || 0) + (item.price * item.quantity);
        });
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }));
    const CHART_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

    const handleExport = (format: string) => {
        toast.success(`Exporting report as ${format.toUpperCase()}...`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Generate and export business reports</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('pdf')}>
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleExport('excel')}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Excel
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Analytics */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold uppercase text-muted-foreground">Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip
                                    formatter={(value: number) => [formatCurrency(value), 'Sales']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {/* Main Stats */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <TrendingUp className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                            <p className="text-xs text-muted-foreground">From {totalTransactions} transactions</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                            <PieChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(avgTransaction)}</div>
                            <p className="text-xs text-muted-foreground">Per sale</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalTransactions}</div>
                            <p className="text-xs text-muted-foreground">Completed sales</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Payment Method Analytics */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Cash Payments</CardTitle>
                        <Banknote className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{formatCurrency(paymentBreakdown['cash'] || 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium uppercase text-muted-foreground">UPI / QR</CardTitle>
                        <Smartphone className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{formatCurrency(paymentBreakdown['upi'] || 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Card Terminal</CardTitle>
                        <CreditCard className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{formatCurrency(paymentBreakdown['card'] || 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Other / Wallet</CardTitle>
                        <FileText className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{formatCurrency(paymentBreakdown['wallet'] || 0)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Select value={reportType} onValueChange={setReportType}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Report Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sales">Sales Report</SelectItem>
                                <SelectItem value="inventory">Inventory Report</SelectItem>
                                <SelectItem value="customer">Customer Report</SelectItem>
                                <SelectItem value="tax">Tax Report</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Time Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="7days">Last 7 Days</SelectItem>
                                <SelectItem value="30days">Last 30 Days</SelectItem>
                                <SelectItem value="90days">Last 90 Days</SelectItem>
                                <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="w-full md:w-auto">
                            <Calendar className="mr-2 h-4 w-4" />
                            Custom Date
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Report Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
                    </CardTitle>
                    <CardDescription>Detailed breakdown for selected category</CardDescription>
                </CardHeader>
                <CardContent>
                    {reportType === 'sales' && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-mono text-sm">
                                            #{transaction.id?.slice(-6).toUpperCase() || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{transaction.customer?.name || 'Walk-in'}</TableCell>
                                        <TableCell>{transaction.items.length} items</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{transaction.paymentMethod.toUpperCase()}</Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {formatCurrency(transaction.total)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                                                {transaction.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {reportType === 'inventory' && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Stock Level</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Wireless Mouse</TableCell>
                                    <TableCell className="font-mono text-sm">WM-001</TableCell>
                                    <TableCell>Electronics</TableCell>
                                    <TableCell>45</TableCell>
                                    <TableCell>{formatCurrency(1125.00)}</TableCell>
                                    <TableCell><Badge>In Stock</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Bluetooth Speaker</TableCell>
                                    <TableCell className="font-mono text-sm">BS-002</TableCell>
                                    <TableCell>Electronics</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>{formatCurrency(600.00)}</TableCell>
                                    <TableCell><Badge variant="secondary">Low Stock</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>USB-C Cable</TableCell>
                                    <TableCell className="font-mono text-sm">CB-003</TableCell>
                                    <TableCell>Accessories</TableCell>
                                    <TableCell>120</TableCell>
                                    <TableCell>{formatCurrency(600.00)}</TableCell>
                                    <TableCell><Badge>In Stock</Badge></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}

                    {reportType === 'customer' && (
                        <div className="p-8 text-center text-muted-foreground">
                            <p>Customer acquisition and behavior report generation...</p>
                        </div>
                    )}

                    {reportType === 'tax' && (
                        <div className="p-8 text-center text-muted-foreground">
                            <p>Tax liability and collection report generation...</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
