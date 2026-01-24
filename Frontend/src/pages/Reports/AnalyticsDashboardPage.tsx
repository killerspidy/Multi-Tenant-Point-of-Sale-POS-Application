import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboardPage() {
    const inventoryData = [
        { name: 'Electronics', value: 40000, color: '#8884d8' },
        { name: 'Groceries', value: 15000, color: '#82ca9d' },
        { name: 'Clothing', value: 25000, color: '#ffc658' },
        { name: 'Home', value: 10000, color: '#ff8042' },
    ];

    const turnoverData = [
        { month: 'Jan', turnover: 4.2 },
        { month: 'Feb', turnover: 3.8 },
        { month: 'Mar', turnover: 5.1 },
        { month: 'Apr', turnover: 4.5 },
        { month: 'May', turnover: 6.0 },
    ];

    const customerData = [
        { name: 'New', value: 30, color: '#0088FE' },
        { name: 'Returning', value: 45, color: '#00C49F' },
        { name: 'VIP', value: 25, color: '#FFBB28' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Advanced Analytics</h1>
                    <p className="text-muted-foreground">Deep dive into inventory health and customer behavior.</p>
                </div>
            </div>

            <Tabs defaultValue="inventory">
                <TabsList>
                    <TabsTrigger value="inventory">Inventory Health</TabsTrigger>
                    <TabsTrigger value="customers">Customer Insights</TabsTrigger>
                    <TabsTrigger value="performance">Staff Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="inventory" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory Valuation by Category</CardTitle>
                                <CardDescription>Total value of stock on hand.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={inventoryData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={100} />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory Turnover Rate</CardTitle>
                                <CardDescription>Monthly efficiency of stock usage.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={turnoverData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="turnover" fill="#82ca9d" unit="x" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Segmentation</CardTitle>
                                <CardDescription>Distribution of customer base.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] flex justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={customerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                            {customerData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cohort Retention Analysis</CardTitle>
                                <CardDescription>Customer retention over last 6 months.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center h-[250px] text-muted-foreground border-2 border-dashed rounded-lg">
                                    Advanced Cohort Grid Visualization Coming Soon
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
