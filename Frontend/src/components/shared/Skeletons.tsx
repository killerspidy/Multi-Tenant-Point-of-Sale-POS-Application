export function PageSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="grid gap-4 md:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted rounded" />
                ))}
            </div>
            <div className="h-96 bg-muted rounded" />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3 animate-pulse">
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded" />
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="space-y-3 p-6 border rounded-lg animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-3/4" />
        </div>
    );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="space-y-3 p-4 border rounded-lg animate-pulse">
                    <div className="h-32 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-6 bg-muted rounded w-1/3" />
                </div>
            ))}
        </div>
    );
}
