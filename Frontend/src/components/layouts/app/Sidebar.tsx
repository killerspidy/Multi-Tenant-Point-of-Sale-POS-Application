import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    ShoppingCart,
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    BarChart3,
    Settings,
    Store,
    Truck,
    Gift,
    FileText,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    roles?: string[];
}

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'POS',
        href: '/pos',
        icon: ShoppingCart,
        roles: ['cashier', 'store_manager', 'tenant_admin'],
    },
    {
        title: 'Products',
        href: '/products',
        icon: Package,
        roles: ['inventory_manager', 'store_manager', 'tenant_admin'],
    },
    {
        title: 'Inventory',
        href: '/inventory',
        icon: ShoppingBag,
        roles: ['inventory_manager', 'store_manager', 'tenant_admin'],
    },
    {
        title: 'Procurement',
        href: '/procurement',
        icon: Truck,
        roles: ['inventory_manager', 'tenant_admin'],
    },
    {
        title: 'Customers',
        href: '/customers',
        icon: Users,
        roles: ['cashier', 'store_manager', 'tenant_admin'],
    },
    {
        title: 'Promotions',
        href: '/promotions',
        icon: Gift,
        roles: ['store_manager', 'tenant_admin'],
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart3,
        roles: ['report_analyst', 'store_manager', 'tenant_admin'],
    },
    {
        title: 'Stores',
        href: '/stores',
        icon: Store,
        roles: ['tenant_admin'],
    },
    {
        title: 'Audit Logs',
        href: '/audit-logs',
        icon: FileText,
        roles: ['tenant_admin'],
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { user } = useAuth();

    const hasAccess = (item: NavItem) => {
        if (!item.roles) return true;
        return item.roles.includes(user?.role || '');
    };

    const filteredNavItems = navItems.filter(hasAccess);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 md:sticky md:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <ScrollArea className="h-full py-6">
                    {/* Logo/Brand */}
                    <div className="px-6 mb-6">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                <ShoppingCart className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">POS Master</h2>
                                <p className="text-xs text-muted-foreground">Multi-Tenant POS</p>
                            </div>
                        </Link>
                    </div>

                    <Separator className="mb-4" />

                    {/* Navigation */}
                    <nav className="space-y-1 px-3">
                        {filteredNavItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} to={item.href}>
                                    <Button
                                        variant={isActive ? 'secondary' : 'ghost'}
                                        className={cn(
                                            'w-full justify-start gap-3',
                                            isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Info */}
                    <div className="absolute bottom-4 left-0 right-0 px-6">
                        <div className="bg-muted rounded-lg p-3 text-xs">
                            <p className="font-semibold mb-1">Tenant ID</p>
                            <p className="text-muted-foreground truncate">{user?.tenantId}</p>
                        </div>
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
}
