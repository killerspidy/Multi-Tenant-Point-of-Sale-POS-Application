import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Webhook, RefreshCw, Plus } from 'lucide-react';

export default function IntegrationSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Integrations & API</h1>
                    <p className="text-muted-foreground">Manage external connections and developer settings</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Integration
                </Button>
            </div>

            <Tabs defaultValue="api" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="api">API Keys</TabsTrigger>
                    <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                    <TabsTrigger value="apps">Connected Apps</TabsTrigger>
                </TabsList>

                <TabsContent value="api">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Access Tokens</CardTitle>
                            <CardDescription>Manage keys for accessing the POS API</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Key Prefix</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Last Used</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Production Mobile App</TableCell>
                                        <TableCell className="font-mono text-xs">pk_live_...</TableCell>
                                        <TableCell>Jan 15, 2026</TableCell>
                                        <TableCell>Just now</TableCell>
                                        <TableCell><Badge>Active</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <RefreshCw className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Development Test</TableCell>
                                        <TableCell className="font-mono text-xs">pk_test_...</TableCell>
                                        <TableCell>Jan 20, 2026</TableCell>
                                        <TableCell>2 days ago</TableCell>
                                        <TableCell><Badge variant="outline">Test</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <RefreshCw className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Generate New Key</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="webhooks">
                    <Card>
                        <CardHeader>
                            <CardTitle>Webhook Endpoints</CardTitle>
                            <CardDescription>Receive real-time updates for system events</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Webhook className="h-4 w-4 text-purple-500" />
                                        <h3 className="font-medium">Order Created</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">https://api.mystore.com/webhooks/orders</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Webhook className="h-4 w-4 text-purple-500" />
                                        <h3 className="font-medium">Inventory Low</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">https://api.mystore.com/webhooks/inventory</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
