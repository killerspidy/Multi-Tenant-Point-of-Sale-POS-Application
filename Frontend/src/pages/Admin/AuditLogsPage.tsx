import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Activity, User, Clock } from 'lucide-react';

export default function AuditLogsPage() {
    const logs = [
        { id: 1, action: 'User Login', user: 'Admin User', ip: '192.168.1.1', timestamp: '2026-01-25 10:30:00', status: 'Success' },
        { id: 2, action: 'Update Product', user: 'Manager Jane', ip: '192.168.1.15', timestamp: '2026-01-25 11:15:23', status: 'Success' },
        { id: 3, action: 'Delete Order', user: 'Supervisor Bob', ip: '192.168.1.20', timestamp: '2026-01-25 12:45:10', status: 'Warning' },
        { id: 4, action: 'Failed Login', user: 'unknown', ip: '203.0.113.45', timestamp: '2026-01-25 13:02:55', status: 'Failure' },
        { id: 5, action: 'Stock Adjustment', user: 'Manager Jane', ip: '192.168.1.15', timestamp: '2026-01-25 14:20:00', status: 'Success' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Audit Logs</h1>
                    <p className="text-muted-foreground">System security and activity monitoring</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Recent Activity
                        </CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search logs..." className="pl-10" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                            {log.timestamp}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-3 w-3 text-muted-foreground" />
                                            {log.user}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            log.status === 'Success' ? 'outline' :
                                                log.status === 'Failure' ? 'destructive' : 'secondary'
                                        }>
                                            {log.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
