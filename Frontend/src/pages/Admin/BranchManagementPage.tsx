import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Phone, Clock } from 'lucide-react';

export default function BranchManagementPage() {
    const branches = [
        {
            id: 1,
            name: 'Main Street Store',
            type: 'Retail Store',
            address: '123 Main St, New York, NY',
            contact: '+1 (555) 010-1234',
            status: 'Active',
            staffCount: 12
        },
        {
            id: 2,
            name: 'Westside Warehouse',
            type: 'Warehouse',
            address: '456 West Ave, New Jersey, NJ',
            contact: '+1 (555) 010-5678',
            status: 'Active',
            staffCount: 5
        },
        {
            id: 3,
            name: 'Downtown Popup',
            type: 'Popup',
            address: '789 Broadway, New York, NY',
            contact: '+1 (555) 010-9012',
            status: 'Closed',
            staffCount: 0
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Branch Management</h1>
                    <p className="text-muted-foreground">Manage your physical store locations and warehouses</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Location
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {branches.map(branch => (
                    <Card key={branch.id} className="relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full ${branch.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{branch.name}</CardTitle>
                                    <CardDescription>{branch.type}</CardDescription>
                                </div>
                                <Badge variant={branch.status === 'Active' ? 'default' : 'secondary'}>
                                    {branch.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm space-y-2">
                                <div className="flex items-start gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>{branch.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{branch.contact}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>9:00 AM - 9:00 PM</span>
                                </div>
                            </div>
                            <div className="pt-4 flex items-center justify-between border-t text-sm">
                                <span className="text-muted-foreground">{branch.staffCount} Staff Members</span>
                                <Button variant="ghost" size="sm">Manage</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
