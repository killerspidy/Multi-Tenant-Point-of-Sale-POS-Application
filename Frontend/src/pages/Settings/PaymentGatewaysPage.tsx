import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

export default function PaymentGatewaysPage() {
    const [stripeEnabled, setStripeEnabled] = useState(true);
    const [paypalEnabled, setPaypalEnabled] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Payment Gateways</h1>
                    <p className="text-muted-foreground">Configure payment methods for your store</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Stripe */}
                <Card className={stripeEnabled ? 'border-primary' : ''}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Stripe
                            </CardTitle>
                            <Switch checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
                        </div>
                        <CardDescription>Accept credit cards, Apple Pay, and Google Pay</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Publishable Key</Label>
                            <div className="relative">
                                <Input defaultValue="pk_test_..." type="password" />
                                <Badge variant="outline" className="absolute right-2 top-2">Test Mode</Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <Check className="h-4 w-4" />
                            Connected to Stripe Account
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Manage Configuration</Button>
                    </CardFooter>
                </Card>

                {/* PayPal */}
                <Card className={paypalEnabled ? 'border-primary' : ''}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                                PayPal
                            </CardTitle>
                            <Switch checked={paypalEnabled} onCheckedChange={setPaypalEnabled} />
                        </div>
                        <CardDescription>Accept PayPal payments and subscriptions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {paypalEnabled ? (
                            <div className="space-y-2">
                                <Label>Client ID</Label>
                                <Input placeholder="Enter PayPal Client ID" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4" />
                                Enable to configure PayPal
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" disabled={!paypalEnabled}>Connect PayPal</Button>
                    </CardFooter>
                </Card>

                {/* Square */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-slate-800" />
                                Square
                            </CardTitle>
                            <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <CardDescription>In-person and online payments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Sync your Square POS transactions and inventory.</p>
                    </CardContent>
                </Card>

                {/* Custom */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-green-600" />
                                Cash / Manual
                            </CardTitle>
                            <Badge>Active</Badge>
                        </div>
                        <CardDescription>Track cash and external payments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Manual payment recording is always enabled.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
