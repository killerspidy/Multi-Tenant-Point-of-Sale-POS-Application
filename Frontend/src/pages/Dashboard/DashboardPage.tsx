import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import {
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Package,
    Users,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';

export default function DashboardPage() {
    const { user } = useAuth();
    const { transactions, products, getDashboardStats } = useData();
    const dashboardStats = getDashboardStats();

    // Calculate Sales Data for Chart (Last 7 Days)
    const salesData = Array.from({ length: 7 }).map((_, i) => {
        const date = subDays(new Date(), 6 - i);
        const dailyRevenue = transactions
            .filter(t => isSameDay(new Date(t.createdAt), date))
            .reduce((sum, t) => sum + t.total, 0);
        return {
            date: format(date, 'EEE'),
            revenue: dailyRevenue
        };
    });

    const stats = [
        {
            title: 'Total Revenue',
            value: `$${dashboardStats.totalRevenue.toFixed(2)}`,
            change: '+20.1%', // Pending historical comparison logic
            trend: 'up',
            icon: DollarSign,
        },
        {
            title: 'Transactions',
            value: dashboardStats.totalOrders.toString(),
            change: '+180',
            trend: 'up',
            icon: ShoppingCart,
        },
        {
            title: 'Products',
            value: products.length.toString(),
            change: '+12',
            trend: 'up',
            icon: Package,
        },
        {
            title: 'Low Stock Items',
            value: dashboardStats.lowStockCount.toString(),
            change: '-3',
            trend: 'down',
            icon: Users, // Should ideally switch icon to alert, but keeping structure for now
        },
    ];

    const recentActivity = transactions.slice(0, 5).map(t => ({
        id: t.id,
        action: 'New sale',
        amount: `$${t.total.toFixed(2)}`,
        time: format(new Date(t.createdAt), 'h:mm a')
    }));

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening with your business today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const isPositive = stat.trend === 'up';

                    return (
                        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Icon className="h-4 w-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    {isPositive ? (
                                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                                    ) : (
                                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                                    )}
                                    <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                                        {stat.change}
                                    </span>
                                    <span>from last month</span>
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts and Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Sales Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                        <CardDescription>
                            Your sales performance for the last 7 days
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="date"
                                    className="text-xs"
                                    tick={{ fill: 'currentColor' }}
                                />
                                <YAxis className="text-xs" tick={{ fill: 'currentColor' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ fill: 'hsl(var(--primary))' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your store</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.time}
                                        </p>
                                    </div>
                                    <div className="text-sm font-semibold">{activity.amount}</div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            View All Activity
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                            <ShoppingCart className="h-6 w-6" />
                            <span>New Sale</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                            <Package className="h-6 w-6" />
                            <span>Add Product</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                            <Users className="h-6 w-6" />
                            <span>New Customer</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                            <TrendingUp className="h-6 w-6" />
                            <span>View Reports</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
