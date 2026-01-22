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
import { Plus, Store, MapPin, Users, DollarSign } from 'lucide-react';

export default function StoresPage() {
    const stores = [
        { id: '1', name: 'Main Store', address: '123 Main St, New York, NY 10001', manager: 'John Doe', employees: 12, revenue: 125000, status: 'active' },
        { id: '2', name: 'Downtown Branch', address: '456 Market St, San Francisco, CA 94102', manager: 'Sarah Smith', employees: 8, revenue: 98000, status: 'active' },
        { id: '3', name: 'Westside Outlet', address: '789 West Ave, Los Angeles, CA 90001', manager: 'Mike Johnson', employees: 6, revenue: 67000, status: 'active' },
    ];

    const totalRevenue = stores.reduce((sum, s) => sum + s.revenue, 0);
    const totalEmployees = stores.reduce((sum, s) => sum + s.employees, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Store Management</h1>
                    <p className="text-muted-foreground">Manage your retail locations</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Store
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                        <Store className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stores.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEmployees}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Combined Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. per Store</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(totalRevenue / stores.length / 1000).toFixed(0)}K</div>
                    </CardContent>
                </Card>
            </div>

            {/* Stores Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stores.map((store) => (
                    <Card key={store.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Store className="h-5 w-5" />
                                        {store.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1 mt-2">
                                        <MapPin className="h-3 w-3" />
                                        {store.address}
                                    </CardDescription>
                                </div>
                                <Badge>{store.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Manager:</span>
                                    <span className="font-medium">{store.manager}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Employees:</span>
                                    <span className="font-medium">{store.employees}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Revenue:</span>
                                    <span className="font-semibold text-green-600">${store.revenue.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                                <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
