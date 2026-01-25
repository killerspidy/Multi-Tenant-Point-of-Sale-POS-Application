import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
} from 'lucide-react';
import { StoreSwitcher } from './StoreSwitcher';

interface SidebarProps {
    isOpen: boolean;
    isDesktopOpen?: boolean;
    onClose: () => void;
}

// ... existing NavItem interface ...
// The rest of the file content until the component definition...

// NOTE: Please ensure the imports and NavItem defs above are preserved by using context matching or ensure this chunk includes them if needed. 
// Since replace_file_content replaces the chunk, I will include the interface and component start.

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
    // ... items ...
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

export default function Sidebar({ isOpen, isDesktopOpen = true, onClose }: SidebarProps) {
    const location = useLocation();
    const { user } = useAuth();

    // ... existing logic ...

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
                    'fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 md:sticky flex flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                    'md:translate-x-0',
                    isDesktopOpen ? 'w-64' : 'w-64 md:w-20'
                )}
            >
                {/* Logo/Brand Header - Aligned with Main Header */}
                <div className={cn(
                    "h-16 flex items-center border-b transition-all duration-300",
                    isDesktopOpen ? "px-6" : "justify-center px-2"
                )}>
                    <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg flex-shrink-0">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                        <div className={cn(
                            "transition-all duration-300",
                            isDesktopOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                        )}>
                            <h2 className="text-lg font-bold">POS Master</h2>
                            <p className="text-xs text-muted-foreground">Multi-Tenant POS</p>
                        </div>
                    </Link>
                </div>

                <ScrollArea className="flex-1 py-4">

                    {/* Navigation */}
                    <nav className={cn("space-y-1 transition-all duration-300", isDesktopOpen ? "px-3" : "px-2")}>
                        {filteredNavItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} to={item.href}>
                                    <Button
                                        variant={isActive ? 'secondary' : 'ghost'}
                                        className={cn(
                                            'w-full gap-3 transition-all duration-300 mb-1',
                                            isDesktopOpen ? "justify-start" : "justify-center px-2",
                                            isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                                        )}
                                        title={!isDesktopOpen ? item.title : undefined}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        <span className={cn(
                                            "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                            isDesktopOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                                        )}>
                                            {item.title}
                                        </span>
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Info / Store Switcher */}
                    <div className={cn(
                        "absolute bottom-4 left-0 right-0 px-6 transition-all duration-300",
                        isDesktopOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}>
                        <StoreSwitcher />
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
}
