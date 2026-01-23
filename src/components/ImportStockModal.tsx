import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Globe, Sparkles, CheckCircle2, AlertCircle, ExternalLink, RefreshCcw, Check, Square, CheckSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { scrapingService } from '@/services/scrapingService';
import { Vehicle } from '@/types';
import { cn, sanitizeUrl } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ImportStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (vehicles: any[]) => void;
    existingVehicles: Vehicle[];
}

export const ImportStockModal: React.FC<ImportStockModalProps> = ({ isOpen, onClose, onImport, existingVehicles }) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'scraping' | 'parsing' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const [foundVehicles, setFoundVehicles] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setStatus('scraping');
        setProgress(20);

        try {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + 5;
                });
            }, 500);

            const result = await scrapingService.scrapeInventory(url);

            clearInterval(interval);
            setProgress(100);

            if (result.success && result.data) {
                setFoundVehicles(result.data);
                // By default, select all that are NOT duplicates
                const validIds = result.data
                    .filter(v => !isDuplicate(v))
                    .map(v => v.id);
                setSelectedIds(new Set(validIds));
                setStatus('success');
            } else {
                setErrorMessage(result.error || 'Falha ao processar o link. Verifique se a URL é válida.');
                setStatus('error');
            }
        } catch (err: any) {
            setErrorMessage(err.message || 'Erro desconhecido ao realizar o scraping.');
            setStatus('error');
        }
    };

    const isDuplicate = (v: any) => {
        return existingVehicles.some(existing =>
            existing.brand.toLowerCase() === v.brand.toLowerCase() &&
            existing.model.toLowerCase() === v.model.toLowerCase() &&
            existing.year === v.year &&
            existing.km === v.km
        );
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleAll = () => {
        if (selectedIds.size === foundVehicles.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(foundVehicles.map(v => v.id)));
        }
    };

    const confirmImport = () => {
        const vehiclesToImport = foundVehicles.filter(v => selectedIds.has(v.id));
        onImport(vehiclesToImport);
        onClose();
        reset();
    };

    const reset = () => {
        setStatus('idle');
        setFoundVehicles([]);
        setUrl('');
        setProgress(0);
        setErrorMessage('');
        setSelectedIds(new Set());
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-background rounded-[32px] border-border/60 shadow-2xl p-0 overflow-hidden text-foreground">
                <div className="bg-primary/5 p-8 border-b border-primary/10">
                    <DialogHeader>
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <DialogTitle className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
                                    <div className="p-2 bg-primary rounded-xl text-white"><Globe className="w-6 h-6" /></div>
                                    Importador Inteligente
                                </DialogTitle>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Sincronização com proteção contra duplicatas</p>
                            </div>
                            {status === 'success' && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black px-3 py-1">
                                    {foundVehicles.length} VEÍCULOS ENCONTRADOS
                                </Badge>
                            )}
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-8 space-y-6">
                    {status === 'idle' && (
                        <form onSubmit={handleImport} className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 text-foreground">Link do Estoque ou Anúncio</label>
                                <div className="relative">
                                    <Input
                                        placeholder="Webmotors, OLX ou site próprio..."
                                        className="h-14 bg-muted/40 rounded-2xl pl-12 font-bold focus:ring-primary/20"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required
                                    />
                                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                                    <div className="flex gap-3">
                                        <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] font-bold text-sky-700 leading-normal">
                                            Nossa IA detectará carros novos e marcará automaticamente os que você já possui no estoque para evitar repetições.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 gap-2">
                                <RefreshCcw className={cn("w-4 h-4", status !== 'idle' && "animate-spin")} /> Iniciar Sincronização
                            </Button>
                        </form>
                    )}

                    {(status === 'scraping' || status === 'parsing') && (
                        <div className="py-12 flex flex-col items-center text-center space-y-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black uppercase tracking-tight">Analisando Estoque...</h3>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Comparando dados reais com seu inventário atual</p>
                            </div>
                            <Progress value={progress} className="w-full h-2 rounded-full" />
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Selecione os carros para importar</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleAll}
                                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10"
                                >
                                    {selectedIds.size === foundVehicles.length ? 'Desmarcar Tudo' : 'Selecionar Tudo'}
                                </Button>
                            </div>

                            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {foundVehicles.map((v, i) => {
                                    const duplicate = isDuplicate(v);
                                    const selected = selectedIds.has(v.id);

                                    return (
                                        <div
                                            key={i}
                                            onClick={() => !duplicate && toggleSelect(v.id)}
                                            className={cn(
                                                "flex gap-4 p-3 rounded-2xl border transition-all cursor-pointer group relative",
                                                duplicate ? "bg-muted/10 border-border/20 opacity-60 cursor-not-allowed" :
                                                    selected ? "bg-primary/5 border-primary/40 shadow-sm" : "bg-muted/30 border-border/40 hover:border-primary/20"
                                            )}
                                        >
                                            <div className="absolute top-3 right-3">
                                                {duplicate ? (
                                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[8px] font-black px-1.5 py-0">JÁ NO ESTOQUE</Badge>
                                                ) : (
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
                                                        selected ? "bg-primary border-primary text-white" : "border-border bg-background"
                                                    )}>
                                                        {selected && <Check className="w-3 h-3 stroke-[4]" />}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-24 h-18 rounded-xl overflow-hidden shrink-0 shadow-sm bg-muted">
                                                <img src={sanitizeUrl(v.imageUrl)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={v.model} />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-12">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none mb-1">{v.brand}</p>
                                                <h5 className="text-sm font-black truncate text-foreground">{v.model}</h5>
                                                <div className="flex gap-3 mt-1.5">
                                                    <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded-lg">
                                                        <span className="text-[9px] font-black text-muted-foreground uppercase">{v.year}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded-lg">
                                                        <span className="text-[9px] font-black text-muted-foreground uppercase">{v.km}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-primary ml-auto">
                                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v.price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex gap-4 pt-4 border-t mt-4">
                                <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest" onClick={reset}>
                                    Voltar
                                </Button>
                                <Button
                                    className="flex-[2] h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                                    onClick={confirmImport}
                                    disabled={selectedIds.size === 0}
                                >
                                    Importar {selectedIds.size} {selectedIds.size === 1 ? 'Veículo' : 'Veículos'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-8 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertCircle className="w-10 h-10 text-destructive" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black uppercase tracking-tight">Falha na Sincronização</h3>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest max-w-[300px] mx-auto">
                                    {errorMessage}
                                </p>
                            </div>
                            <Button onClick={reset} className="h-12 rounded-xl px-10 font-black text-xs uppercase tracking-widest">
                                Tentar Novamente
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
