import React, { useState } from 'react';
import { Store, Plus, Search, MapPin, Users, TrendingUp, Settings2, ExternalLink, ShieldCheck, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

export const StoresListView: React.FC = () => {
    const stores = [
        {
            id: 'd1',
            name: 'Deer Motors Matriz',
            location: 'São Paulo, SP',
            sellers: 12,
            leadsMonth: 450,
            status: 'active',
            plan: 'Enterprise',
            aiEfficiency: 94
        },
        {
            id: 'd2',
            name: 'Premium Select Curitiba',
            location: 'Curitiba, PR',
            sellers: 5,
            leadsMonth: 180,
            status: 'active',
            plan: 'Pro',
            aiEfficiency: 88
        },
        {
            id: 'd3',
            name: 'Litoral Cars',
            location: 'Santos, SP',
            sellers: 3,
            leadsMonth: 95,
            status: 'trial',
            plan: 'Trial',
            aiEfficiency: 75
        }
    ];

    return (
        <ScrollArea className="h-full">
            <div className="p-10 space-y-10">
                {/* Header Section */}
                <div className="flex items-end justify-between border-b pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">Gestão de Lojas</h2>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Painel de Controle Multi-tenant (SaaS)</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <Input
                                placeholder="Buscar loja por nome ou cidade..."
                                className="pl-10 w-72 bg-background shadow-sm border-border/60"
                            />
                        </div>
                        <Button className="gap-2 font-black text-[10px] uppercase tracking-widest px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
                            <Plus className="w-3 h-3" strokeWidth={3} /> Cadastrar Nova Loja
                        </Button>
                    </div>
                </div>

                {/* Dashboard Stats for Admin */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="rounded-3xl border-primary/10 bg-primary/5 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary rounded-2xl text-white shadow-lg"><Globe className="w-6 h-6" /></div>
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Total de Lojas</p>
                                <p className="text-3xl font-black">24</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-3xl border-emerald-500/10 bg-emerald-500/5 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg"><TrendingUp className="w-6 h-6" /></div>
                            <div>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">MRR Total</p>
                                <p className="text-3xl font-black">R$ 48.900</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-3xl border-amber-500/10 bg-amber-500/5 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg"><ShieldCheck className="w-6 h-6" /></div>
                            <div>
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Leads via IA/mês</p>
                                <p className="text-3xl font-black">12.4k</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Stores List */}
                <div className="space-y-4">
                    {stores.map(store => (
                        <Card key={store.id} className="group overflow-hidden rounded-[32px] border-border/40 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-background/40 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-3xl bg-muted/50 flex items-center justify-center border border-border/60 group-hover:scale-110 transition-transform shadow-inner">
                                            <Store className="w-8 h-8 text-primary/60" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-2xl font-black tracking-tight">{store.name}</h3>
                                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                                                    {store.plan}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-muted-foreground">
                                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                                    <MapPin className="w-3.5 h-3.5" /> {store.location}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                                    <Users className="w-3.5 h-3.5" /> {store.sellers} Vendedores
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 max-w-xs space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                                            <span>Eficiência IA</span>
                                            <span className="text-primary">{store.aiEfficiency}%</span>
                                        </div>
                                        <Progress value={store.aiEfficiency} className="h-2.5 bg-muted/40" />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="text-right mr-4 hidden xl:block">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Leads este mês</p>
                                            <p className="text-xl font-black text-foreground">{store.leadsMonth}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all">
                                            <Settings2 className="w-6 h-6" />
                                        </Button>
                                        <Button className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-[0.2em] gap-3 shadow-xl shadow-black/10 transition-all active:scale-95">
                                            Acessar Loja <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
};
