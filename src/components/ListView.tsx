import React from 'react';
import { Lead } from '@/types';
import { MoreHorizontal, Phone, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

export const ListView: React.FC<{ leads: Lead[]; onSelect: (lead: Lead) => void }> = ({ leads, onSelect }) => {
    return (
        <ScrollArea className="h-full">
            <div className="p-8">
                <Card className="border-border/50 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-muted/30 border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Lead</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Veículo de Interesse</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Contato</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Data</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-muted/20 transition-colors cursor-pointer group" onClick={() => onSelect(lead)}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-border/50 shadow-sm">
                                                <AvatarImage src={lead.avatarUrl} />
                                                <AvatarFallback>{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-foreground text-sm leading-tight">{lead.name}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5">{lead.source}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className={`
                                    text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5
                                    ${lead.status === 'sucesso' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                lead.status === 'insucesso' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    'bg-muted/50 text-muted-foreground border-border/50'}
                                 `}>
                                            {lead.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-0.5">
                                            <p className="text-foreground font-bold text-sm leading-tight">{lead.interestedCar}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase">Model {lead.interestedYear}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs">
                                            <Phone className="w-3.5 h-3.5 text-primary/50" />
                                            {lead.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                                        {lead.appointmentDate ? (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-primary/50" />
                                                {new Date(lead.appointmentDate).toLocaleDateString('pt-BR')}
                                            </div>
                                        ) : <span className="opacity-30">Sem data</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-foreground">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </ScrollArea>
    );
};