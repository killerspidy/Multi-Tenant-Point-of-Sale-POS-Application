import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ActionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    mode: 'amount' | 'text';
    onConfirm: (value: any, type?: 'fixed' | 'percent') => void;
}

export default function ActionDialog({ open, onOpenChange, title, mode, onConfirm }: ActionDialogProps) {
    const [value, setValue] = useState('');
    const [type, setType] = useState<'fixed' | 'percent'>('fixed');

    useEffect(() => {
        if (open) setValue('');
    }, [open]);

    const handleConfirm = () => {
        if (!value) return;

        if (mode === 'amount') {
            onConfirm(parseFloat(value), type);
        } else {
            onConfirm(value);
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {mode === 'amount' && (
                        <Tabs value={type} onValueChange={(v) => setType(v as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="fixed">Fixed ($)</TabsTrigger>
                                <TabsTrigger value="percent">Percent (%)</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="value">
                            {mode === 'text' ? 'Note Content' : 'Value'}
                        </Label>
                        <Input
                            id="value"
                            type={mode === 'amount' ? 'number' : 'text'}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                            autoFocus
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
