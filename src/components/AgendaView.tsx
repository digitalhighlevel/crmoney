import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, AlertCircle, Plus, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const AgendaView: React.FC = () => {
    const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00 to 18:00
    const [selectedDate, setSelectedDate] = useState(new Date());

    const appointments = [
        {
            id: '1',
            client: 'Rodrigo Oliveira',
            vehicle: 'Corolla 2024',
            seller: 'Ana Silva',
            time: '14:00',
            duration: '1h',
            status: 'confirmed',
            avatar: 'https://i.pravatar.cc/150?u=rodrigo'
        },
        {
            id: '2',
            client: 'Beatriz Santos',
            vehicle: 'Jeep Compass',
            seller: 'Marcos Souza',
            time: '10:00',
            duration: '1.5h',
            status: 'pending',
            avatar: 'https://i.pravatar.cc/150?u=beatriz'
        }
    ];

    return (
        <ScrollArea className="h-full">
            <div className="p-10 space-y-10">
                {/* Header Section */}
                <div className="flex items-end justify-between border-b pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">Agenda</h2>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Visitas agendadas e disponibilidade da equipe</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-muted/50 rounded-2xl p-1 gap-1 border border-border/50">
                            <Button variant="ghost" size="sm" className="h-10 rounded-xl px-4 font-bold text-xs">Dia</Button>
                            <Button variant="secondary" size="sm" className="h-10 rounded-xl px-4 font-bold text-xs shadow-sm shadow-black/5">Semana</Button>
                            <Button variant="ghost" size="sm" className="h-10 rounded-xl px-4 font-bold text-xs">Mês</Button>
                        </div>
                        <Button className="h-12 gap-2 font-black text-[10px] uppercase tracking-widest px-8 shadow-xl shadow-primary/10">
                            <Plus className="w-3 h-3" strokeWidth={3} /> Novo Agendamento
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Calendar Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="rounded-3xl border-border/60 shadow-xl shadow-black/5 bg-background overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="font-black text-xs uppercase tracking-widest">Janeiro 2024</h4>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronLeft className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronRight className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                                        <span key={d} className="text-[10px] font-black text-muted-foreground">{d}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <Button
                                            key={i}
                                            variant="ghost"
                                            className={cn(
                                                "h-10 w-full p-0 font-bold text-xs rounded-xl",
                                                i + 1 === 20 ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90" : "hover:bg-muted/60"
                                            )}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground ml-2">Vendedores Ativos</h4>
                            <div className="space-y-3">
                                {['Ana Silva', 'Marcos Souza', 'Julia Ferreira'].map((name, idx) => (
                                    <div key={name} className="flex items-center gap-3 p-3 rounded-2xl border border-transparent hover:border-border/60 hover:bg-background/80 transition-all cursor-pointer group">
                                        <Avatar className="h-10 w-10 border-2 border-primary/10">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${idx}`} />
                                            <AvatarFallback>{name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold tracking-tight">{name}</p>
                                            <p className="text-[10px] font-medium text-muted-foreground uppercase">2 visitas hoje</p>
                                        </div>
                                        <div className={cn("w-2 h-2 rounded-full", idx === 2 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400')}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline View */}
                    <div className="lg:col-span-3">
                        <Card className="rounded-[40px] border-border/60 shadow-2xl shadow-black/5 bg-background/60 backdrop-blur-xl overflow-hidden self-start">
                            <CardContent className="p-0">
                                {hours.map((hour, idx) => {
                                    const appt = appointments.find(a => a.time === `${hour}:00`);
                                    return (
                                        <div key={hour} className={cn(
                                            "flex min-h-[100px] border-l-4 group",
                                            appt ? (appt.status === 'confirmed' ? "border-primary" : "border-amber-400 bg-amber-50/20") : "border-transparent"
                                        )}>
                                            <div className="w-24 flex items-start justify-center pt-6 border-r border-border/40">
                                                <span className="text-xs font-black text-muted-foreground/60 transition-colors group-hover:text-foreground">{hour}:00</span>
                                            </div>
                                            <div className="flex-1 p-4">
                                                {appt ? (
                                                    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-border/40 flex items-center justify-between group-hover:-translate-y-1 transition-transform animate-in fade-in slide-in-from-left-4">
                                                        <div className="flex items-center gap-5">
                                                            <Avatar className="h-14 w-14 shadow-lg">
                                                                <AvatarImage src={appt.avatar} />
                                                                <AvatarFallback>{appt.client[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-1">
                                                                    <h5 className="font-black text-lg tracking-tight">{appt.client}</h5>
                                                                    <Badge className={cn(
                                                                        "text-[8px] uppercase font-black px-2",
                                                                        appt.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                                                    )}>
                                                                        {appt.status === 'confirmed' ? 'Confirmado' : 'Aguardando'}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex items-center gap-4 text-muted-foreground">
                                                                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                                                        <Car className="w-3 h-3 text-primary" /> {appt.vehicle}
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                                                        <User className="w-3 h-3 text-primary" /> {appt.seller}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-muted"><Clock className="w-5 h-5 text-muted-foreground" /></Button>
                                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-muted text-primary"><CheckCircle2 className="w-5 h-5" /></Button>
                                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-muted"><MoreVertical className="w-5 h-5 text-muted-foreground" /></Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full min-h-[80px] rounded-3xl border-2 border-dashed border-muted/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" className="gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all">
                                                            <Plus className="w-4 h-4" /> Alocar Vaga
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

const Car: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
);
