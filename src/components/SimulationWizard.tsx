import React, { useState, useEffect } from 'react';
import { X, User, Car, ArrowRight, Bot, Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SimulationWizardProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateLead: (data: any) => string;
    onUpdateStatus: (id: string, status: any) => void;
}

export const SimulationWizard: React.FC<SimulationWizardProps> = ({ isOpen, onClose, onCreateLead, onUpdateStatus }) => {
    const [step, setStep] = useState(1);
    const [simulationData, setSimulationData] = useState({
        name: '',
        phone: '',
        car: 'Corolla XEi 2024'
    });
    const [progress, setProgress] = useState(0);
    const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setProgress(0);
            setSimulationData({ name: '', phone: '', car: 'Corolla XEi 2024' });
            setCurrentLeadId(null);
        }
    }, [isOpen]);

    const handleStartQualification = () => {
        const id = onCreateLead({
            name: simulationData.name,
            phone: simulationData.phone,
            car: simulationData.car
        });
        setCurrentLeadId(id);
        setStep(2);
    };

    useEffect(() => {
        if (step === 2 && currentLeadId) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev === 50) {
                        onUpdateStatus(currentLeadId, 'agendamento');
                    }

                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStep(3), 600);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 60);
            return () => clearInterval(interval);
        }
    }, [step, currentLeadId, onUpdateStatus]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden min-h-[520px] border-none shadow-2xl flex flex-col">
                {/* Progress Bar Header */}
                <div className="h-2 w-full bg-muted overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                <div className="flex-1 p-8 flex flex-col">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-xl font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" /> Motor de Simulação IA
                        </DialogTitle>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Simule o poder da Deer AI em tempo real</p>
                    </DialogHeader>

                    {step === 1 && (
                        <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4">
                            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 text-center">
                                <User className="w-10 h-10 text-primary mx-auto mb-3" />
                                <h3 className="font-bold text-base">Entrada de Lead Manual</h3>
                                <p className="text-xs text-muted-foreground mt-1">Identificando novo prospect via tráfego pago...</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nome (Exemplo)</label>
                                    <Input
                                        placeholder="Ex: Rodrigo Oliveira"
                                        className="h-12 bg-background font-medium focus-visible:ring-primary shadow-inner"
                                        value={simulationData.name}
                                        onChange={(e) => setSimulationData({ ...simulationData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Telefone</label>
                                        <Input
                                            placeholder="(11) 99999-0000"
                                            className="h-12 bg-background font-medium focus-visible:ring-primary shadow-inner"
                                            value={simulationData.phone}
                                            onChange={(e) => setSimulationData({ ...simulationData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Veículo</label>
                                        <Input
                                            placeholder="Corolla 2024"
                                            className="h-12 bg-background font-medium focus-visible:ring-primary shadow-inner"
                                            value={simulationData.car}
                                            onChange={(e) => setSimulationData({ ...simulationData, car: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                disabled={!simulationData.name}
                                onClick={handleStartQualification}
                                className="w-full mt-auto h-14 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                            >
                                Iniciar Agente IA <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col items-center justify-center flex-1 space-y-10 animate-in zoom-in-95 duration-500">
                            <div className="relative">
                                <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                                    <Bot className="w-14 h-14 text-primary" />
                                </div>
                                <div className="absolute -top-1 -right-1 flex h-6 w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-white shadow-md"></span>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <h3 className="text-2xl font-black italic tracking-tighter">QUALIFICANDO...</h3>
                                <div className="space-y-1">
                                    <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 font-bold">FASE: ATENDIMENTO</Badge>
                                    {progress > 50 && (
                                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest animate-in slide-in-from-bottom-2">
                                            ✓ MOVENDO PARA AGENDAMENTO
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full max-w-xs space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                                    <span>Confiança IA</span>
                                    <span className="text-primary">{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-3 shadow-inner" />
                            </div>

                            <div className="bg-muted/50 p-4 rounded-xl border border-border/50 w-full text-sm font-medium italic shadow-inner">
                                <p className="text-muted-foreground opacity-60">"Olá {simulationData.name}, sou a Deer AI. Identificamos seu interesse no {simulationData.car}..."</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col flex-1 animate-in slide-in-from-bottom-8 duration-700">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4 border-2 border-emerald-100 shadow-inner">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-2">LEAD QUALIFICADO!</h3>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Visita agendada e vendedor notificado.</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-between animate-in slide-in-from-left-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg"><User className="w-4 h-4 text-primary" /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">Vendedor Alocado</p>
                                            <p className="text-sm font-bold">Marcos Souza</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 font-bold text-[9px] uppercase">Disponível</Badge>
                                </div>

                                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-between animate-in slide-in-from-right-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg"><Calendar className="w-4 h-4 text-primary" /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">Visita Confirmada</p>
                                            <p className="text-sm font-bold">Amanhã, 14:30</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary font-bold text-[9px] uppercase">Agenda OK</Badge>
                                </div>
                            </div>

                            {/* Dark Vision Card */}
                            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden group">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Car className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold leading-none">{simulationData.car}</h4>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-2">Ativo Identificado</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Probabilidade de Conversão IA</span>
                                        <span className="text-4xl font-black tracking-tighter text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">98.2%</span>
                                    </div>
                                    <Progress value={98.2} className="h-4 bg-white/10" indicatorClassName="bg-gradient-to-r from-orange-400 to-orange-600" />
                                </div>

                                {/* Visual accents */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
                            </div>

                            <Button
                                onClick={onClose}
                                className="w-full mt-auto h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all"
                            >
                                Ver no Pipeline
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
