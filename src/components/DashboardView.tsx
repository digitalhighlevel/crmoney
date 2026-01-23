import React from 'react';
import { Lead } from '@/types';
import { TrendingUp, Users, CalendarCheck, DollarSign, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const mockLeads: Lead[] = [
    {
        id: '1',
        dealershipId: 'd1',
        name: 'Ana Silva',
        phone: '(11) 98765-4321',
        address: 'Av. Paulista, 1000 - SP',
        interestedCar: 'Jeep Compass',
        interestedYear: '2023',
        source: 'Instagram ADS',
        status: 'atendimento',
        tradeIn: { hasTradeIn: true, model: 'HB20', color: 'Branco', year: '2019', mileage: '45.000' },
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        appointmentConfirmed: false,
        aiHistory: [
            { id: '1', sender: 'lead', text: 'Quero saber sobre o Compass 2023', timestamp: '09:00', type: 'text' },
            { id: '2', sender: 'ai', text: 'Olá! O Compass 2023 é um excelente SUV. Temos a versão Longitude disponível.', timestamp: '09:01', type: 'text' }
        ],
        tags: ['Quente', 'SUV'],
        comments: [],
        checklists: [
            {
                id: 'cl1',
                title: 'Qualificação',
                items: [
                    { id: 'i1', content: 'Confirmar orçamento', is_completed: true },
                    { id: 'i2', content: 'Avaliar carro de troca', is_completed: false }
                ]
            }
        ],
        description: 'Cliente está trocando de carro após 4 anos. Busca conforto para a família.'
    },
    {
        id: '2',
        dealershipId: 'd1',
        name: 'Carlos Mendes',
        phone: '(11) 97766-5544',
        address: 'Rua Augusta, 500 - SP',
        interestedCar: 'Toyota Corolla',
        interestedYear: '2022',
        source: 'WebMotors',
        status: 'agendamento',
        tradeIn: { hasTradeIn: false, model: '', color: '', year: '', mileage: '' },
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        appointmentDate: new Date().toISOString(),
        appointmentConfirmed: false,
        aiHistory: [],
        tags: ['Visita Pendente'],
        comments: [{ id: 'c1', text: 'Cliente prefere cor preta ou prata.', user_name: 'Marcos', created_at: new Date().toISOString() }],
        checklists: []
    },
];

export const DashboardView: React.FC<{ leads: Lead[] }> = ({ leads }) => {
    const totalLeads = leads.length;
    const sales = leads.filter(l => l.status === 'sucesso').length;
    const visits = leads.filter(l => l.status === 'visita' || l.status === 'sucesso').length;
    const conversionRate = totalLeads > 0 ? Math.round((sales / totalLeads) * 100) : 0;

    return (
        <ScrollArea className="h-full">
            <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total de Leads" value={totalLeads} icon={Users} trend="+12%" color="bg-blue-600" />
                    <StatCard title="Visitas Agendadas" value={visits} icon={CalendarCheck} trend="+5%" color="bg-amber-600" />
                    <StatCard title="Vendas Realizadas" value={sales} icon={DollarSign} trend="+2%" color="bg-emerald-600" />
                    <StatCard title="Taxa de Conversão" value={`${conversionRate}%`} icon={TrendingUp} trend="+0.5%" color="bg-purple-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Performance de Vendas (Semanal)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-end justify-between gap-4 px-2">
                                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                    <div key={i} className="w-full bg-muted/30 rounded-t-lg relative group overflow-hidden">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-primary/80 transition-all duration-500 group-hover:bg-primary"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/70 font-bold uppercase tracking-widest">
                                            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-bold">Atividade Recente</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {leads.slice(0, 5).map(lead => (
                                <div key={lead.id} className="flex items-center gap-3 pb-3 border-b border-border/40 last:border-0 last:pb-0">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={lead.avatarUrl} />
                                        <AvatarFallback>{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-foreground truncate">{lead.name}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">
                                            Status: <Badge variant="outline" className="h-4 px-1.5 py-0 text-[9px] capitalize border-primary/20 bg-primary/5 text-primary">{lead.status}</Badge>
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium">2h</span>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full mt-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 hover:bg-primary/5 gap-2">
                                Ver todo histórico <ArrowUpRight className="w-3 h-3" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScrollArea>
    );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardContent className="p-6 flex items-start justify-between">
            <div>
                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-3xl font-black text-foreground tabular-nums">{value}</h3>
                <div className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1 bg-emerald-50 w-fit px-1.5 py-0.5 rounded border border-emerald-100">
                    <ArrowUpRight className="w-2.5 h-2.5" /> {trend} <span className="text-muted-foreground font-normal ml-1">neste mês</span>
                </div>
            </div>
            <div className={cn("p-2.5 rounded-xl text-white shadow-lg", color)}>
                <Icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
        </CardContent>
    </Card>
);