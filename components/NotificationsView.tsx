
import React from 'react';
import { Bot, Calendar, Clock, ChevronRight, User } from 'lucide-react';

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
    <div className="p-8 h-full overflow-y-auto max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Notificações</h2>
            <p className="text-slate-500">Atualizações da IA e agenda.</p>
        </div>
        <button className="text-sm text-sidebar font-medium hover:underline">Marcar todas como lidas</button>
      </div>

      <div className="space-y-4">
        {notifications.map(notif => (
            <div 
                key={notif.id} 
                className={`
                    flex items-start gap-4 p-5 rounded-xl border transition-all cursor-pointer hover:shadow-md
                    ${notif.read ? 'bg-white border-slate-200' : 'bg-blue-50/50 border-blue-100 shadow-sm'}
                `}
            >
                {/* Icon */}
                <div className={`
                    p-3 rounded-full shrink-0
                    ${notif.type === 'mention' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}
                `}>
                    {notif.type === 'mention' ? <Bot className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className={`font-semibold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                            {notif.title}
                        </h4>
                        <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {notif.time}
                        </span>
                    </div>
                    
                    <p className={`mt-1 text-sm leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-700'}`}>
                        {notif.message}
                    </p>

                    {/* Footer Actions/Tags */}
                    <div className="mt-3 flex items-center gap-3">
                        {notif.leadName && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                                <User className="w-3 h-3" /> {notif.leadName}
                            </span>
                        )}
                        {notif.date && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium">
                                <Calendar className="w-3 h-3" /> {notif.date}
                            </span>
                        )}
                    </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-300 self-center" />
            </div>
        ))}
      </div>
    </div>
  );
};
