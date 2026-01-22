import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbNameMap: Record<string, string> = {
        dashboard: 'Dashboard',
        pos: 'Point of Sale',
        products: 'Products',
        customers: 'Customers',
        inventory: 'Inventory',
        procurement: 'Procurement',
        promotions: 'Promotions',
        stores: 'Stores',
        reports: 'Reports',
        settings: 'Settings',
        users: 'User Management',
        'audit-logs': 'Audit Logs',
        returns: 'Returns & Refunds',
        shift: 'Shift Management',
        'goods-receipt': 'Goods Receipt',
    };

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link
                to="/dashboard"
                className="flex items-center hover:text-foreground transition-colors"
            >
                <Home className="h-4 w-4" />
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const displayName = breadcrumbNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

                return (
                    <div key={name} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        {isLast ? (
                            <span className="font-medium text-foreground">{displayName}</span>
                        ) : (
                            <Link
                                to={routeTo}
                                className="hover:text-foreground transition-colors"
                            >
                                {displayName}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
