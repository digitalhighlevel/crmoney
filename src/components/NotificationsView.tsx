import React from 'react';
import { Bot, Calendar, Clock, ChevronRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const NotificationsView: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'mention',
      title: 'IA Agent mencionou você',
      message: 'O cliente Carlos demonstrou alto interesse no Corolla. Pode assumir a negociação?',
      time: '2 min atrás',
      read: false,
      leadName: 'Carlos Silva'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Lembrete de Reunião',
      message: 'Visita agendada com Roberto Souza (BMW 320i).',
      time: '15 min atrás',
      read: false,
      date: 'Hoje, 14:00'
    },
    {
      id: 3,
      type: 'mention',
      title: 'IA Agent marcou uma visita',
      message: 'Fernanda Lima confirmou visita para amanhã às 09:00. Prepare o Honda HR-V da troca.',
      time: '1 hora atrás',
      read: true,
      leadName: 'Fernanda Lima'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Follow-up Necessário',
      message: 'Lead Ana Pereira está na fase de Sucesso há 2 dias. Enviar pesquisa de satisfação.',
      time: 'Ontem',
      read: true,
      date: 'Atrasado'
    }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="p-10 max-w-4xl mx-auto space-y-10">
        <div className="flex items-end justify-between border-b pb-8">
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tighter">NOTIFICAÇÕES</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Sincronização em tempo real com a Deer AI</p>
          </div>
          <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline opacity-70 hover:opacity-100">
            Marcar todas como lidas
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map(notif => (
            <Card
              key={notif.id}
              className={cn(
                "group cursor-pointer border-border/50 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5",
                !notif.read ? 'bg-primary/5 border-primary/20 shadow-lg shadow-primary/5' : 'bg-background'
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className={cn(
                    "p-3 rounded-2xl shrink-0 shadow-inner group-hover:scale-110 transition-transform",
                    notif.type === 'mention' ? 'bg-indigo-500 text-white' : 'bg-primary text-white'
                  )}>
                    {notif.type === 'mention' ? <Bot className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className={cn(
                        "font-bold text-base tracking-tight",
                        !notif.read ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground transition-colors'
                      )}>
                        {notif.title}
                      </h4>
                      <span className="text-[10px] font-bold text-muted-foreground/60 flex items-center gap-1.5 uppercase tracking-widest">
                        <Clock className="w-3 h-3" /> {notif.time}
                      </span>
                    </div>

                    <p className={cn(
                      "text-sm leading-relaxed",
                      !notif.read ? 'text-foreground/90 font-medium' : 'text-muted-foreground'
                    )}>
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      {notif.leadName && (
                        <Badge variant="outline" className="h-6 px-2 gap-1.5 font-bold text-[9px] uppercase tracking-wider bg-background border-border/60">
                          <User className="w-3 h-3 text-primary" strokeWidth={3} /> {notif.leadName}
                        </Badge>
                      )}
                      {notif.date && (
                        <Badge variant="outline" className="h-6 px-2 gap-1.5 font-bold text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-600 border-amber-500/20">
                          <Calendar className="w-3 h-3" strokeWidth={3} /> {notif.date}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground/30 group-hover:text-primary transition-colors">
                    <ChevronRight className="w-5 h-5" strokeWidth={3} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
