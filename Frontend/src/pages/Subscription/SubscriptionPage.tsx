import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Zap, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function SubscriptionPage() {
    const [currentPlan, setCurrentPlan] = useState('pro');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            price: billingCycle === 'monthly' ? 29 : 290,
            description: 'Perfect for small shops just getting started.',
            features: ['1 Store Location', '2 User Accounts', 'Basic Inventory', 'Standard Support'],
        },
        {
            id: 'pro',
            name: 'Professional',
            price: billingCycle === 'monthly' ? 79 : 790,
            description: 'For growing businesses with multiple staff.',
            features: ['3 Store Locations', '10 User Accounts', 'Advanced Inventory', 'Priority Support', 'Analytics Dashboard'],
            popular: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: billingCycle === 'monthly' ? 199 : 1990,
            description: 'Full-scale solution for retail chains.',
            features: ['Unlimited Locations', 'Unlimited Users', 'API Access', 'Dedicated Account Manager', 'Custom Reports', 'White-labeling'],
        },
    ];

    const handleUpgrade = (planId: string) => {
        toast.success(`Redirecting to payment gateway for ${planId} plan upgrade...`);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Subscription & Billing</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Manage your plan, view billing history, and unlock more features for your business.
                </p>

                <div className="flex justify-center items-center gap-4 mt-6">
                    <span className={billingCycle === 'monthly' ? 'font-bold' : 'text-muted-foreground'}>Monthly</span>
                    <div
                        className="bg-muted p-1 rounded-full cursor-pointer w-14 flex items-center transition-all"
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                    >
                        <div className={`w-6 h-6 rounded-full bg-primary shadow transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : ''}`} />
                    </div>
                    <span className={billingCycle === 'yearly' ? 'font-bold' : 'text-muted-foreground'}>
                        Yearly <Badge variant="secondary" className="ml-1 text-xs text-green-600">Save 20%</Badge>
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <Badge className="bg-primary text-primary-foreground hover:bg-primary px-4 py-1">Most Popular</Badge>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="text-4xl font-bold">
                                ${plan.price}
                                <span className="text-base font-normal text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={currentPlan === plan.id ? "outline" : "default"}
                                onClick={() => handleUpgrade(plan.id)}
                                disabled={currentPlan === plan.id}
                            >
                                {currentPlan === plan.id ? 'Current Plan' : 'Upgrade Plan'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Billing History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { date: 'Jan 01, 2026', amount: 79.00, status: 'Paid', invoice: 'INV-2026-001' },
                            { date: 'Dec 01, 2025', amount: 79.00, status: 'Paid', invoice: 'INV-2025-012' },
                            { date: 'Nov 01, 2025', amount: 79.00, status: 'Paid', invoice: 'INV-2025-011' },
                        ].map((bill, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{bill.date}</p>
                                        <p className="text-sm text-muted-foreground">{bill.invoice}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold">${bill.amount.toFixed(2)}</span>
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20">
                                        {bill.status}
                                    </Badge>
                                    <Button variant="ghost" size="sm">Download</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
