import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Palette, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function TenantSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Tenant Settings</h1>
                    <p className="text-muted-foreground">Manage your business configuration</p>
                </div>
                <Button onClick={() => toast.success('Settings saved successfully')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General Info</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
                    <TabsTrigger value="tax">Tax & Currency</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Your public business profile</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Company Name</Label>
                                    <Input defaultValue="Retail Pro Solutions" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Industry</Label>
                                    <Input defaultValue="Retail & E-commerce" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Primary Email</Label>
                                    <Input defaultValue="contact@retailpro.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input defaultValue="+1 (555) 123-4567" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Address</Label>
                                    <Input defaultValue="123 Commerce St, Business District, NY 10001" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="branding">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of your POS</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="h-24 w-24 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-dashed">
                                    <Palette className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Logo</Label>
                                    <p className="text-sm text-muted-foreground">Recommended size: 512x512px (PNG, SVG)</p>
                                    <Button variant="outline" size="sm">Upload New Logo</Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded border bg-blue-600" />
                                        <Input defaultValue="#2563EB" className="font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Accent Color</Label>
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded border bg-orange-500" />
                                        <Input defaultValue="#F97316" className="font-mono" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscription Plan</CardTitle>
                            <CardDescription>Manage your current plan and payment methods</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-4 bg-primary/5 dark:bg-primary/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">Professional Plan</h3>
                                        <p className="text-sm text-muted-foreground">$49/month • Billed monthly</p>
                                    </div>
                                    <Button variant="secondary">Upgrade Plan</Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-medium">Payment Methods</h4>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Visa ending in 4242</p>
                                            <p className="text-xs text-muted-foreground">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tax">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tax & Currency</CardTitle>
                            <CardDescription>Regional settings for financial calculations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Currency</Label>
                                    <Input defaultValue="USD ($)" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Default Tax Rate (%)</Label>
                                    <Input type="number" defaultValue="8.875" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tax ID Number</Label>
                                    <Input placeholder="e.g. EIN or VAT Number" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
