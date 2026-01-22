import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function NotificationCenter() {
    const [notifications] = useState([
        {
            id: '1',
            title: 'Low Stock Alert',
            message: 'Phone Charger is running low on stock (3 units remaining)',
            time: '5 minutes ago',
            read: false,
            type: 'warning',
        },
        {
            id: '2',
            title: 'New Order',
            message: 'Order #INV-2026-005 has been placed',
            time: '15 minutes ago',
            read: false,
            type: 'info',
        },
        {
            id: '3',
            title: 'Payment Received',
            message: 'Payment of $250.00 received from John Doe',
            time: '1 hour ago',
            read: true,
            type: 'success',
        },
        {
            id: '4',
            title: 'Shift Closed',
            message: 'Evening shift closed with $50 variance',
            time: '2 hours ago',
            read: true,
            type: 'info',
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            warning: 'text-orange-600',
            info: 'text-blue-600',
            success: 'text-green-600',
            error: 'text-red-600',
        };
        return colors[type] || 'text-gray-600';
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                            <Badge variant="secondary">{unreadCount} new</Badge>
                        )}
                    </div>
                </div>
                <Separator />
                <ScrollArea className="h-[400px]">
                    <div className="p-2">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors ${!notification.read ? 'bg-muted/50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                                                <Bell className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm">{notification.title}</p>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <Separator />
                <div className="p-2">
                    <Button variant="ghost" className="w-full text-sm">
                        View All Notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
