import React from 'react';
import { Lead } from '../types';
import { Calendar, MoreHorizontal, Phone, Car, Clock } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick, onDragStart }) => {
  const isOverdue = React.useMemo(() => {
    if (!lead.appointmentDate) return false;
    const apptDate = new Date(lead.appointmentDate);
    const now = new Date();
    return apptDate < now && !lead.appointmentConfirmed && (lead.status === 'visita' || lead.status === 'agendamento');
  }, [lead]);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onClick={() => onClick(lead)}
      className={`
        group relative rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md cursor-pointer
        ${isOverdue ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-100 hover:border-slate-300'}
      `}
    >
      {/* Top Section: Avatar + Name + Menu */}
      <div className="flex items-start justify-between mb-3">
         <div className="flex items-center gap-3">
            <img 
                src={lead.avatarUrl} 
                alt={lead.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50" 
            />
            <div>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{lead.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">{lead.source}</p>
            </div>
         </div>
         <button className="text-slate-300 hover:text-slate-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
         </button>
      </div>

      {/* Info Section: Icons + Text */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2.5 text-slate-500">
            <div className="w-6 flex justify-center">
                <Car className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium truncate text-slate-700">{lead.interestedCar} <span className="text-slate-400 font-normal">({lead.interestedYear})</span></span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-500">
            <div className="w-6 flex justify-center">
                <Phone className="w-4 h-4" />
            </div>
            <span className="text-xs">{lead.phone}</span>
        </div>
        {lead.appointmentDate && (
             <div className={`flex items-center gap-2.5 ${isOverdue ? 'text-red-500' : 'text-amber-600'}`}>
                <div className="w-6 flex justify-center">
                    <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium">
                    {new Date(lead.appointmentDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        )}
      </div>

      {/* Footer Tags */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
            {lead.status === 'sucesso' ? 'Cliente' : 'Lead'}
        </span>
        {lead.tradeIn.hasTradeIn && (
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Troca
            </span>
        )}
         {isOverdue && (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Atrasado
            </span>
        )}
      </div>
    </div>
  );
};