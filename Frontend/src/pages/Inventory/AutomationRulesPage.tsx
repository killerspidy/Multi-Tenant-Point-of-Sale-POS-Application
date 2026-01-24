import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Zap, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function AutomationRulesPage() {
    const [rules, setRules] = useState([
        { id: 1, name: 'Global Low Stock', condition: 'Stock < 10', action: 'Create Draft PO', status: true },
        { id: 2, name: 'Electronics Restock', condition: 'Category == Electronics AND Stock < 5', action: 'Email Manager', status: true },
        { id: 3, name: 'Expiry Warning', condition: 'DaysToExpiry < 14', action: 'Discount 20%', status: false },
    ]);

    const toggleRule = (id: number) => {
        setRules(rules.map(r => r.id === id ? { ...r, status: !r.status } : r));
        toast.success('Rule status updated');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Automation Rules</h1>
                    <p className="text-muted-foreground">Configure "If This, Then That" rules for your inventory.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Rule
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Active Rules</CardTitle>
                        <CardDescription>Manage your currently configured automation logic.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rule Name</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rules.map((rule) => (
                                    <TableRow key={rule.id}>
                                        <TableCell className="font-medium">{rule.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono">{rule.condition}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                                {rule.action}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Switch checked={rule.status} onCheckedChange={() => toggleRule(rule.id)} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-600" />
                            Quick Builder
                        </CardTitle>
                        <CardDescription>Create a simple reorder rule.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>When product category is...</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="groceries">Groceries</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>And stock level drops below...</Label>
                            <Input type="number" placeholder="10" />
                        </div>
                        <div className="space-y-2">
                            <Label>Automatically...</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select Action" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="po">Create Purchase Order</SelectItem>
                                    <SelectItem value="email">Send Email Alert</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full mt-4">Save Rule</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
