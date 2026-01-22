import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FileText, User, ShoppingCart, Package, Settings } from 'lucide-react';

export default function AuditLogsPage() {
    const auditLogs = [
        { id: '1', action: 'User Login', user: 'john@example.com', timestamp: '2026-01-23 10:30:15', ip: '192.168.1.100', type: 'auth' },
        { id: '2', action: 'Product Created', user: 'sarah@example.com', timestamp: '2026-01-23 10:25:42', ip: '192.168.1.101', type: 'product' },
        { id: '3', action: 'Sale Completed', user: 'mike@example.com', timestamp: '2026-01-23 10:20:33', ip: '192.168.1.102', type: 'transaction' },
        { id: '4', action: 'Stock Adjusted', user: 'sarah@example.com', timestamp: '2026-01-23 10:15:18', ip: '192.168.1.101', type: 'inventory' },
        { id: '5', action: 'Settings Updated', user: 'john@example.com', timestamp: '2026-01-23 10:10:05', ip: '192.168.1.100', type: 'settings' },
        { id: '6', action: 'User Logout', user: 'mike@example.com', timestamp: '2026-01-23 10:05:22', ip: '192.168.1.102', type: 'auth' },
        { id: '7', action: 'Customer Added', user: 'sarah@example.com', timestamp: '2026-01-23 10:00:47', ip: '192.168.1.101', type: 'customer' },
        { id: '8', action: 'Product Updated', user: 'john@example.com', timestamp: '2026-01-23 09:55:31', ip: '192.168.1.100', type: 'product' },
    ];

    const getTypeIcon = (type: string) => {
        const icons: Record<string, any> = {
            auth: User,
            product: Package,
            transaction: ShoppingCart,
            inventory: Package,
            settings: Settings,
            customer: User,
        };
        const Icon = icons[type] || FileText;
        return <Icon className="h-4 w-4" />;
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, any> = {
            auth: 'default',
            product: 'secondary',
            transaction: 'default',
            inventory: 'secondary',
            settings: 'outline',
            customer: 'secondary',
        };
        return (
            <Badge variant={variants[type]} className="gap-1">
                {getTypeIcon(type)}
                {type}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Audit Logs</h1>
                <p className="text-muted-foreground">Track all system activities and changes</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{auditLogs.length}</div>
                        <p className="text-xs text-muted-foreground">Last 24 hours</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Auth Events</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {auditLogs.filter(l => l.type === 'auth').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {auditLogs.filter(l => l.type === 'transaction').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Product Changes</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {auditLogs.filter(l => l.type === 'product').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Audit Log Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>Chronological record of all system events</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell>{log.user}</TableCell>
                                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                                    <TableCell>{getTypeBadge(log.type)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
