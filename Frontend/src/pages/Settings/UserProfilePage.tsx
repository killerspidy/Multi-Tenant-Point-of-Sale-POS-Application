import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Key, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfilePage() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal account settings and security.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <Button variant="outline">Change Avatar</Button>
                            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB Max.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input defaultValue={user?.name} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input defaultValue={user?.email} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <div className="flex">
                                <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    {user?.role}
                                </Badge>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Tenant ID</Label>
                            <Input defaultValue={user?.tenantId} disabled className="font-mono bg-muted" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline">Update Password</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                    </div>

                    <Separator />

                    <div className="pt-4">
                        <Button variant="destructive" className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Sign out of all devices
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
