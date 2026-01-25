import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Product, ProductVariation } from '@/types';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProductVariationSelectorProps {
    product: Product;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddToCart: (product: Product, variation: ProductVariation) => void;
}

export default function ProductVariationSelector({
    product,
    open,
    onOpenChange,
    onAddToCart
}: ProductVariationSelectorProps) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

    // Reset selection when product or open state changes
    useEffect(() => {
        if (open) {
            setSelectedAttributes({});
            setSelectedVariation(null);
        }
    }, [open, product]);

    const handleAttributeSelect = (attributeName: string, value: string) => {
        const newAttributes = { ...selectedAttributes, [attributeName]: value };
        setSelectedAttributes(newAttributes);

        // Check if all attributes are selected
        if (product.attributes && Object.keys(newAttributes).length === product.attributes.length) {
            findMatchingVariation(newAttributes);
        } else {
            setSelectedVariation(null);
        }
    };

    const findMatchingVariation = (attributes: Record<string, string>) => {
        if (!product.variations) return;

        const match = product.variations.find(v => {
            return Object.entries(attributes).every(([key, value]) => v.attributes[key] === value);
        });

        setSelectedVariation(match || null);
    };

    const handleAdd = () => {
        if (selectedVariation) {
            onAddToCart(product, selectedVariation);
            onOpenChange(false);
        } else {
            toast.error('Please select all options');
        }
    };

    if (!product.attributes) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="flex items-center gap-4">
                        {selectedVariation?.image ? (
                            <img
                                src={selectedVariation.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-md border"
                            />
                        ) : (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-md border"
                            />
                        )}
                        <div>
                            <p className="text-sm text-muted-foreground">{product.sku}</p>
                            <div className="mt-1">
                                {selectedVariation ? (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-2xl font-bold text-primary">
                                            ${selectedVariation.price.toFixed(2)}
                                        </span>
                                        <Badge variant={selectedVariation.stock > 0 ? 'outline' : 'destructive'}>
                                            {selectedVariation.stock > 0 ? `${selectedVariation.stock} in stock` : 'Out of stock'}
                                        </Badge>
                                    </div>
                                ) : (
                                    <span className="text-xl font-bold text-muted-foreground">
                                        Select options
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {product.attributes.map((attr) => (
                            <div key={attr.name} className="space-y-2">
                                <Label>{attr.name}</Label>
                                <div className="flex flex-wrap gap-2">
                                    {attr.options.map((option) => (
                                        <Button
                                            key={option}
                                            variant={selectedAttributes[attr.name] === option ? "default" : "outline"}
                                            onClick={() => handleAttributeSelect(attr.name, option)}
                                            className="min-w-[3rem]"
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        disabled={!selectedVariation || selectedVariation.stock === 0}
                    >
                        Add to Cart
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
