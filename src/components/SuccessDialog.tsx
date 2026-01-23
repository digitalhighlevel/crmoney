import React from 'react';
import { CheckCircle2, DollarSign, RefreshCw, Car } from 'lucide-react';
import { CloseType } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuccessDialogProps {
    isOpen: boolean;
    onConfirm: (type: CloseType) => void;
    onCancel: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
            <DialogContent className="sm:max-w-md p-6">
                <div className="flex flex-col items-center text-center space-y-2 mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-2 border border-emerald-100 shadow-inner">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">Negócio Fechado!</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                        Parabéns pelo fechamento! Selecione abaixo o tipo de conversão realizada.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {[
                        { type: 'venda', icon: DollarSign, label: 'Venda Simples', desc: 'Saída de veículo do estoque.', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
                        { type: 'troca', icon: RefreshCw, label: 'Venda com Troca', desc: 'Venda + entrada de veículo usado.', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
                        { type: 'compra', icon: Car, label: 'Compra de Veículo', desc: 'Aquisição de veículo para estoque.', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' }
                    ].map((item) => (
                        <Button
                            variant="outline"
                            key={item.label}
                            onClick={() => onConfirm(item.type as CloseType)}
                            className="h-auto w-full group relative flex items-center justify-start gap-4 rounded-xl border-border/60 p-4 hover:bg-accent hover:border-primary/30 transition-all shadow-sm"
                        >
                            <div className={cn("p-2.5 rounded-lg border", item.bg, item.color)}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-foreground text-sm">{item.label}</h3>
                                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tighter">{item.desc}</p>
                            </div>
                        </Button>
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                    >
                        Cancelar ação
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};