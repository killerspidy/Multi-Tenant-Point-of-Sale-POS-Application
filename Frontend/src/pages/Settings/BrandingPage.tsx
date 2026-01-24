import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Upload, Globe, Layout, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function BrandingPage() {
    const [primaryColor, setPrimaryColor] = useState('#7c3aed');
    const [storeName, setStoreName] = useState('My Awesome Store');
    const [domain, setDomain] = useState('mystore.pos-app.com');

    const handleSave = () => {
        toast.success('Branding settings updated successfully!');
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Tenant Branding</h1>
                <p className="text-muted-foreground">Customize the look and feel of your POS to match your brand identity.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                Store Identity
                            </CardTitle>
                            <CardDescription>Basic information about your store presence.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Store Name</Label>
                                <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Custom Domain</Label>
                                <div className="flex gap-2">
                                    <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
                                    <Button variant="outline">Verify</Button>
                                </div>
                                <p className="text-xs text-muted-foreground">CNAME verification required for custom domains.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5 text-primary" />
                                Color Theme
                            </CardTitle>
                            <CardDescription>Choose your brand's primary colors.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Primary Brand Color</Label>
                                <div className="flex gap-4 items-center">
                                    <div
                                        className="w-12 h-12 rounded-lg border shadow-sm"
                                        style={{ backgroundColor: primaryColor }}
                                    />
                                    <Input
                                        type="color"
                                        className="w-24 h-10 p-1"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                    />
                                    <Input
                                        className="w-32 font-mono"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-primary" />
                                Assets
                            </CardTitle>
                            <CardDescription>Upload your brand logos and icons.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                    <span className="text-sm font-medium">Upload Logo</span>
                                    <span className="text-xs text-muted-foreground">PNG, SVG (max 2MB)</span>
                                </div>
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                    <span className="text-sm font-medium">Upload Favicon</span>
                                    <span className="text-xs text-muted-foreground">ICO, PNG (32x32)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Live Preview Section */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Live Preview</Label>
                    <div className="border rounded-xl shadow-2xl overflow-hidden bg-background">
                        {/* Mock Header */}
                        <div className="h-14 border-b flex items-center px-4 justify-between" style={{ borderTop: `4px solid ${primaryColor}` }}>
                            <div className="flex items-center gap-2 font-bold text-lg">
                                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center" style={{ color: primaryColor }}>
                                    {storeName.charAt(0)}
                                </div>
                                {storeName}
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-muted"></div>
                            </div>
                        </div>
                        {/* Mock Content */}
                        <div className="p-6 space-y-4 bg-muted/10 h-[400px]">
                            <div className="h-32 rounded-lg bg-gradient-to-r from-background to-muted border p-4 flex flex-col justify-end">
                                <h3 className="text-xl font-bold">Welcome back!</h3>
                                <p className="text-muted-foreground">Here's your store overview.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-24 rounded-lg border bg-background p-4 flex flex-col justify-between">
                                    <span className="text-sm text-muted-foreground">Total Sales</span>
                                    <span className="text-2xl font-bold" style={{ color: primaryColor }}>$12,450</span>
                                </div>
                                <div className="h-24 rounded-lg border bg-background p-4 flex flex-col justify-between">
                                    <span className="text-sm text-muted-foreground">New Customers</span>
                                    <span className="text-2xl font-bold">128</span>
                                </div>
                            </div>
                            <Button className="w-full" style={{ backgroundColor: primaryColor }}>
                                Primary Action Button
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                        This is how your tenant dashboard will appear to your users.
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button variant="outline">Reset to Default</Button>
                <Button size="lg" onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
}
