import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Item {
    id: string;
    nome: string;
}

interface SearchableSelectProps {
    items: Item[];
    value: string;
    onSelect: (id: string) => void;
    placeholder: string;
    loading?: boolean;
    disabled?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
    items,
    value,
    onSelect,
    placeholder,
    loading,
    disabled
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedItem = items.find(i => i.id === value);
    const filteredItems = items.filter(i =>
        i.nome.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                    "flex h-11 w-full items-center justify-between rounded-xl border border-input bg-muted/40 px-4 py-2 text-sm font-bold ring-offset-background transition-all cursor-pointer group",
                    disabled && "opacity-50 cursor-not-allowed",
                    isOpen && "ring-2 ring-primary/20 border-primary/40"
                )}
            >
                <span className={cn("truncate", !selectedItem && "text-muted-foreground font-medium")}>
                    {selectedItem ? selectedItem.nome : placeholder}
                </span>
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                )}
            </div>

            {isOpen && (
                <div className="absolute top-12 left-0 z-50 w-full animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-popover text-popover-foreground rounded-2xl border border-border/60 shadow-2xl overflow-hidden max-h-[350px] flex flex-col">
                        <div className="p-3 border-b border-border/40 bg-muted/20">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="h-10 pl-10 bg-background border-border/60 focus-visible:ring-primary/20 text-sm font-bold rounded-xl"
                                    placeholder="Comece a digitar..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <ScrollArea className="flex-1 overflow-y-auto">
                            <div className="p-2">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => {
                                                onSelect(item.id);
                                                setIsOpen(false);
                                                setSearch('');
                                            }}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-tight rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary/10 hover:text-primary mb-1",
                                                value === item.id ? "bg-primary text-white" : "text-muted-foreground hover:translate-x-1"
                                            )}
                                        >
                                            <span className="truncate">{item.nome}</span>
                                            {value === item.id && <Check className="h-4 w-4 shrink-0" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-xs text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40">
                                        Nenhum resultado
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}
        </div>
    );
};
