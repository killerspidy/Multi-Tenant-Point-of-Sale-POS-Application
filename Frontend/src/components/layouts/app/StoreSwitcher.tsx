import { useStore } from '@/contexts/StoreContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Store, ChevronUp, Check } from "lucide-react";

export function StoreSwitcher() {
    const { currentStore, availableStores, switchStore, canSwitchStore } = useStore();

    if (!canSwitchStore) {
        return (
            <div className="w-full flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <div className={`p-1 rounded bg-${currentStore.themeColor}-100 text-${currentStore.themeColor}-700`}>
                    <Store className="h-4 w-4" />
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-sm font-medium truncate">{currentStore.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{currentStore.type} Plan</span>
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-auto py-3 px-3 border-dashed">
                    <div className="flex items-center gap-2 overflow-hidden text-left">
                        <div className={`p-1 rounded bg-${currentStore.themeColor}-100 text-${currentStore.themeColor}-700`}>
                            <Store className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-medium truncate">{currentStore.name}</span>
                            <span className="text-xs text-muted-foreground capitalize">{currentStore.type} Store</span>
                        </div>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="top">
                <DropdownMenuLabel>Select Store (Simulated)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableStores.map((store) => (
                    <DropdownMenuItem
                        key={store.id}
                        onClick={() => switchStore(store.id)}
                        className="flex items-center justify-between"
                    >
                        <div className="flex flex-col">
                            <span>{store.name}</span>
                            <span className="text-xs text-muted-foreground capitalize">{store.type}</span>
                        </div>
                        {currentStore.id === store.id && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
