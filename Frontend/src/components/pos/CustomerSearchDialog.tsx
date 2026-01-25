import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, User } from 'lucide-react';
import { mockCustomers, searchCustomers } from '@/mocks/data/customers';
import { Customer } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CustomerSearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (customer: Customer) => void;
}

export default function CustomerSearchDialog({ open, onOpenChange, onSelect }: CustomerSearchDialogProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Customer[]>(mockCustomers);

    useEffect(() => {
        if (open) {
            setQuery('');
            setResults(mockCustomers);
        }
    }, [open]);

    useEffect(() => {
        if (query.trim()) {
            setResults(searchCustomers(query));
        } else {
            setResults(mockCustomers);
        }
    }, [query]);

    const handleSelect = (customer: Customer) => {
        onSelect(customer);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md h-[500px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Select Customer</DialogTitle>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or phone..."
                        className="pl-10"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                <ScrollArea className="flex-1 -mx-6 px-6">
                    <div className="space-y-2 py-2">
                        {results.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>No customers found.</p>
                            </div>
                        ) : (
                            results.map((cutomer) => (
                                <div
                                    key={cutomer.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors"
                                    onClick={() => handleSelect(cutomer)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{cutomer.name}</p>
                                            <p className="text-xs text-muted-foreground">{cutomer.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium">{cutomer.loyaltyPoints} pts</p>
                                        <p className="text-xs text-muted-foreground">{cutomer.phone}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>

                <DialogFooter className="sm:justify-between border-t pt-4">
                    <Button variant="ghost" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto gap-2">
                        <UserPlus className="h-4 w-4" />
                        Create New Customer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
