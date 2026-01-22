import { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainAppLayoutProps {
    children: ReactNode;
}

export default function MainAppLayout({ children }: MainAppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className="flex-1 p-6 md:ml-64">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
