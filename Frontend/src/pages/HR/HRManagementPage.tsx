import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Calendar, FileText, UserPlus, CheckCircle } from 'lucide-react';

export default function HRManagementPage() {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Mike Cashier', role: 'Cashier', status: 'Active', department: 'Sales', joinDate: '2025-06-15' },
        { id: 2, name: 'Sarah Manager', role: 'Store Manager', status: 'Active', department: 'Management', joinDate: '2024-03-10' },
        { id: 3, name: 'John Stock', role: 'Inventory Clerk', status: 'On Leave', department: 'Logistics', joinDate: '2025-08-22' },
        { id: 4, name: 'Emily Admin', role: 'HR Specialist', status: 'Active', department: 'HR', joinDate: '2024-01-05' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">HR & Payroll</h1>
                    <p className="text-muted-foreground">Manage employees, attendance, and payroll slips.</p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Employee
                </Button>
            </div>

            <Tabs defaultValue="employees">
                <TabsList>
                    <TabsTrigger value="employees">Employees</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="payroll">Payroll</TabsTrigger>
                </TabsList>

                {/* Employee Directory */}
                <TabsContent value="employees">
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Directory</CardTitle>
                            <CardDescription>Manage your store staff.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Join Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.map((emp) => (
                                        <TableRow key={emp.id}>
                                            <TableCell className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{emp.name}</span>
                                            </TableCell>
                                            <TableCell>{emp.role}</TableCell>
                                            <TableCell>{emp.department}</TableCell>
                                            <TableCell>
                                                <Badge variant={emp.status === 'Active' ? 'default' : 'secondary'}>
                                                    {emp.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{new Date(emp.joinDate).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Time Clock / Attendance */}
                <TabsContent value="attendance">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-primary text-primary-foreground">
                            <CardHeader>
                                <CardTitle>Time Clock</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Log your daily work hours.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center p-6 bg-primary-foreground/10 rounded-xl">
                                    <h3 className="text-4xl font-bold font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                                    <p className="text-sm opacity-80 mt-1">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="secondary" className="w-full text-green-700 font-bold bg-white hover:bg-green-50">Clock In</Button>
                                    <Button variant="outline" className="w-full border-white/40 hover:bg-white/10 text-white">Clock Out</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Attendance Log (Today)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee</TableHead>
                                            <TableHead>Clock In</TableHead>
                                            <TableHead>Clock Out</TableHead>
                                            <TableHead>Total Hours</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Mike Cashier</TableCell>
                                            <TableCell>08:58 AM</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>Running...</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Sarah Manager</TableCell>
                                            <TableCell>09:15 AM</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>Running...</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>John Stock</TableCell>
                                            <TableCell>08:00 AM</TableCell>
                                            <TableCell>12:00 PM</TableCell>
                                            <TableCell>4.0 Hrs</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Payroll Slips */}
                <TabsContent value="payroll">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payroll History</CardTitle>
                            <CardDescription>View and download payslips.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Basic Salary</TableHead>
                                        <TableHead>Bonuses</TableHead>
                                        <TableHead>Deductions</TableHead>
                                        <TableHead>Net Pay</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>December 2025</TableCell>
                                        <TableCell>Mike Cashier</TableCell>
                                        <TableCell>$2,400.00</TableCell>
                                        <TableCell>$150.00</TableCell>
                                        <TableCell>-$200.00</TableCell>
                                        <TableCell className="font-bold">$2,350.00</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-3 w-3 mr-2" /> Slip
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>December 2025</TableCell>
                                        <TableCell>Sarah Manager</TableCell>
                                        <TableCell>$3,800.00</TableCell>
                                        <TableCell>$400.00</TableCell>
                                        <TableCell>-$350.00</TableCell>
                                        <TableCell className="font-bold">$3,850.00</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-3 w-3 mr-2" /> Slip
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
