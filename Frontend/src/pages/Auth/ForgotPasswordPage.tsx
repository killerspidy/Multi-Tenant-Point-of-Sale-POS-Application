import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        setIsLoading(false);
        toast.success('Password reset email sent!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6 animate-fade-in">
                {/* Logo */}
                <div className="text-center">
                    <Link to="/welcome" className="inline-flex items-center gap-2 mb-2">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold">POS Master</span>
                    </Link>
                    <p className="text-muted-foreground text-sm">Reset your password</p>
                </div>

                {/* Card */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Forgot Password?</CardTitle>
                        <CardDescription>
                            {isSubmitted
                                ? "Check your email for reset instructions"
                                : "Enter your email address and we'll send you a reset link"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800 dark:text-green-200">
                                    We've sent a password reset link to <strong>{email}</strong>.
                                    Please check your inbox and follow the instructions.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3">
                        {isSubmitted && (
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Try another email
                            </Button>
                        )}
                        <Link
                            to="/login"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to sign in
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
