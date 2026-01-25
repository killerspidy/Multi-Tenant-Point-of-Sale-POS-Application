import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Award, Gift, Zap, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function LoyaltyProgramPage() {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Loyalty Program</h1>
                    <p className="text-muted-foreground">Configure rewards and membership tiers</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="loyalty-mode">Program Status</Label>
                    <Switch id="loyalty-mode" checked={isEnabled} onCheckedChange={setIsEnabled} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Points Issued</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45,600</div>
                        <p className="text-xs text-muted-foreground">Value: $456.00</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Redemption Rate</CardTitle>
                        <Gift className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24%</div>
                        <p className="text-xs text-muted-foreground">Avg. 150 pts per redemption</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="tires" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="tires">Membership Tiers</TabsTrigger>
                    <TabsTrigger value="rules">Earning Rules</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="tires" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Silver Tier */}
                        <Card className="border-slate-200 dark:border-slate-800">
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    Silver
                                    <Badge variant="secondary">Default</Badge>
                                </CardTitle>
                                <CardDescription>Entry level membership</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <span className="text-2xl font-bold">1x</span>
                                    <p className="text-xs text-muted-foreground">Points Multiplier</p>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-4 w-4 text-primary" />
                                        <span>Spend $0 - $499</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Gift className="h-4 w-4 text-primary" />
                                        <span>Birthday Bonus (50 pts)</span>
                                    </div>
                                </div>
                                <Button className="w-full" variant="outline">Edit Tier</Button>
                            </CardContent>
                        </Card>

                        {/* Gold Tier */}
                        <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-900/10">
                            <CardHeader>
                                <CardTitle className="flex justify-between text-yellow-700 dark:text-yellow-500">
                                    Gold
                                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Popular</Badge>
                                </CardTitle>
                                <CardDescription>For regular customers</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-500">1.5x</span>
                                    <p className="text-xs text-muted-foreground">Points Multiplier</p>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-4 w-4 text-yellow-600" />
                                        <span>Spend $500 - $1999</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Gift className="h-4 w-4 text-yellow-600" />
                                        <span>Birthday Bonus (100 pts)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-yellow-600" />
                                        <span>Early Access to Sales</span>
                                    </div>
                                </div>
                                <Button className="w-full" variant="outline">Edit Tier</Button>
                            </CardContent>
                        </Card>

                        {/* Platinum Tier */}
                        <Card className="border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                            <CardHeader>
                                <CardTitle className="flex justify-between text-slate-700 dark:text-slate-300">
                                    Platinum
                                    <Badge variant="secondary">VIP</Badge>
                                </CardTitle>
                                <CardDescription>Top tier rewards</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">2x</span>
                                    <p className="text-xs text-muted-foreground">Points Multiplier</p>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        <span>Spend $2000+</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Gift className="h-4 w-4" />
                                        <span>Birthday Bonus (250 pts)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        <span>Free Shipping</span>
                                    </div>
                                </div>
                                <Button className="w-full" variant="outline">Edit Tier</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="rules" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Earning Configuration</CardTitle>
                            <CardDescription>Define how customers earn points</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Points Currency Ratio</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Earn</span>
                                        <Input type="number" defaultValue="1" className="w-20" />
                                        <span className="text-sm">point(s) for every</span>
                                        <Input type="number" defaultValue="1" className="w-20" />
                                        <span className="text-sm">USD spent</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Redemption Ratio</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Redeem</span>
                                        <Input type="number" defaultValue="100" className="w-20" />
                                        <span className="text-sm">point(s) =</span>
                                        <Input type="number" defaultValue="1" className="w-20" />
                                        <span className="text-sm">USD discount</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={() => toast.success('Rules saved successfully')}>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
