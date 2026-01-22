import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ShoppingCart,
    Package,
    BarChart3,
    Users,
    Zap,
    Shield,
    ArrowRight
} from 'lucide-react';

export default function WelcomePage() {
    const features = [
        {
            icon: ShoppingCart,
            title: 'Point of Sale',
            description: 'Fast and intuitive POS system for seamless transactions',
        },
        {
            icon: Package,
            title: 'Inventory Management',
            description: 'Real-time stock tracking across multiple locations',
        },
        {
            icon: BarChart3,
            title: 'Analytics & Reports',
            description: 'Comprehensive insights into your business performance',
        },
        {
            icon: Users,
            title: 'Multi-Tenant',
            description: 'Secure data isolation for multiple businesses',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Optimized for speed and efficiency',
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level security with role-based access control',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            {/* Header */}
            <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold">POS Master</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link to="/login">Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/register">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    <div className="inline-block">
                        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                            ✨ The Future of Retail Management
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Manage Your Business
                        <br />
                        <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                            Like Never Before
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Complete point-of-sale and inventory management solution designed for
                        modern businesses. Multi-location support, real-time analytics, and
                        enterprise-grade security.
                    </p>

                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Button size="lg" asChild className="group">
                            <Link to="/register">
                                Start Free Trial
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/login">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Powerful features to streamline your operations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 group"
                        >
                            <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Join thousands of businesses already using POS Master
                    </p>
                    <Button size="lg" asChild>
                        <Link to="/register">Get Started Now</Link>
                    </Button>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t bg-background/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
                    <p>© 2026 POS Master. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
