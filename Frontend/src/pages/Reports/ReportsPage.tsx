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
import { FileText, Download, Calendar, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function ReportsPage() {
    const [reportType, setReportType] = useState('sales');
    const [timeRange, setTimeRange] = useState('7days');

    const totalRevenue = mockTransactions.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = mockTransactions.length;
    const avgTransaction = totalRevenue / totalTransactions;

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

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">From {totalTransactions} transactions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${avgTransaction.toFixed(2)}</div>
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
                                            {transaction.invoiceNumber}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{transaction.customerName || 'Walk-in'}</TableCell>
                                        <TableCell>{transaction.items.length} items</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{transaction.paymentMethod.toUpperCase()}</Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            ${transaction.total.toFixed(2)}
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
                                    <TableCell>$1,125.00</TableCell>
                                    <TableCell><Badge>In Stock</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Bluetooth Speaker</TableCell>
                                    <TableCell className="font-mono text-sm">BS-002</TableCell>
                                    <TableCell>Electronics</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>$600.00</TableCell>
                                    <TableCell><Badge variant="secondary">Low Stock</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>USB-C Cable</TableCell>
                                    <TableCell className="font-mono text-sm">CB-003</TableCell>
                                    <TableCell>Accessories</TableCell>
                                    <TableCell>120</TableCell>
                                    <TableCell>$600.00</TableCell>
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
