import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                    <Card className="w-full max-w-md shadow-lg border-red-200 dark:border-red-900">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <CardTitle className="text-xl text-red-700 dark:text-red-400">Something went wrong</CardTitle>
                            <CardDescription>
                                An unexpected error occurred while rendering this page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {this.state.error && (
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-xs font-mono overflow-auto max-h-32 text-slate-700 dark:text-slate-300">
                                    {this.state.error.toString()}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button onClick={this.handleReload} className="w-full">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reload Application
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
