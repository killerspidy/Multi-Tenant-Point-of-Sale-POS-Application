import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Printer, Barcode } from 'lucide-react';

export default function LabelPrinterPage() {
    const [template, setTemplate] = useState('standard');
    const [copies, setCopies] = useState(1);

    // Mock Product for Preview
    const previewProduct = {
        name: "Wireless Mouse",
        price: "$29.99",
        sku: "ELEC-001",
        barcode: "123456789012"
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Label Printer</h1>
                    <p className="text-muted-foreground">Design and print product barcode labels.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Configure label format and size.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Product</Label>
                                <Input placeholder="Search product by name or SKU..." />
                            </div>

                            <div className="space-y-2">
                                <Label>Label Template</Label>
                                <Select value={template} onValueChange={setTemplate}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard (2" x 1")</SelectItem>
                                        <SelectItem value="large">Large Asset Tag (4" x 2")</SelectItem>
                                        <SelectItem value="jewelry">Jewelry Dumbbell</SelectItem>
                                        <SelectItem value="shelf">Shelf Edge Label</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Copies: {copies}</Label>
                                <Slider
                                    value={[copies]}
                                    onValueChange={(val) => setCopies(val[0])}
                                    max={100}
                                    step={1}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full" size="lg">
                        <Printer className="mr-2 h-5 w-5" /> Print {copies} Labels
                    </Button>
                </div>

                {/* Live Preview */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Live Preview</Label>
                    <div className="border rounded-xl aspect-square flex items-center justify-center bg-muted/20 p-8">
                        {/* Dynamic Label Preview based on template */}
                        <div className={`bg-white border shadow-sm p-4 flex flex-col items-center justify-center text-center ${template === 'standard' ? 'w-48 h-24' :
                                template === 'large' ? 'w-72 h-36' :
                                    template === 'shelf' ? 'w-64 h-20 bg-yellow-50' : 'w-24 h-8 text-[8px]'
                            }`}>
                            <h3 className="font-bold truncate w-full text-black">{previewProduct.name}</h3>
                            <div className="flex-1 flex items-center justify-center py-1 w-full">
                                <Barcode className="w-full h-full opacity-80" />
                            </div>
                            <div className="flex justify-between w-full text-xs font-mono mt-1">
                                <span>{previewProduct.sku}</span>
                                <span className="font-bold text-lg leading-none">{previewProduct.price}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">Actual print output may vary slightly depending on printer calibration.</p>
                </div>
            </div>
        </div>
    );
}
