import { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainAppLayoutProps {
    children: ReactNode;
}

export default function MainAppLayout({ children }: MainAppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true); // Desktop

    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar
                isOpen={isSidebarOpen}
                isDesktopOpen={isDesktopSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header onMenuClick={toggleSidebar} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
