import React from 'react';
import { MoreHorizontal, Mail, Phone, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const TeamView: React.FC = () => {
    const team = [
        { id: 1, name: 'Ana Silva', role: 'Gerente de Vendas', email: 'ana@deercell.com', active: true },
        { id: 2, name: 'Pedro Santos', role: 'Vendedor Sênior', email: 'pedro@deercell.com', active: true },
        { id: 3, name: 'Lucas Oliveira', role: 'Vendedor Jr', email: 'lucas@deercell.com', active: false },
        { id: 4, name: 'Mariana Costa', role: 'Atendimento', email: 'mariana@deercell.com', active: true },
    ];

    return (
        <ScrollArea className="h-full">
            <div className="p-10 max-w-5xl mx-auto space-y-10">
                <div className="flex items-end justify-between border-b pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black tracking-tighter">TEAM</h2>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Manage your dealership sales force</p>
                    </div>
                    <Button className="gap-2 font-black text-[10px] uppercase tracking-widest px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
                        <Plus className="w-3 h-3" strokeWidth={3} /> Invite Member
                    </Button>
                </div>

                <Card className="border-border/50 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-muted/30 border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contact</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {team.map(member => (
                                <tr key={member.id} className="hover:bg-muted/20 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10 border border-border/50 shadow-sm group-hover:scale-105 transition-transform">
                                                <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-bold text-foreground text-sm tracking-tight">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 px-6">
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{member.role}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                                <Mail className="w-3 h-3 text-primary/50" /> {member.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Badge variant={member.active ? "secondary" : "outline"} className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-2",
                                            member.active ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "opacity-50"
                                        )}>
                                            {member.active ? 'Active' : 'Offline'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-5 text-right">
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
