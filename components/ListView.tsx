import React from 'react';
import { Lead } from '../types';
import { MoreHorizontal, Phone, Calendar } from 'lucide-react';

export const ListView: React.FC<{ leads: Lead[]; onSelect: (lead: Lead) => void }> = ({ leads, onSelect }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700">Lead</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Veículo de Interesse</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Contato</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Data</th>
                    <th className="px-6 py-4 text-right"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={() => onSelect(lead)}>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <img src={lead.avatarUrl} className="w-8 h-8 rounded-full bg-slate-200" />
                                <div>
                                    <p className="font-medium text-slate-900">{lead.name}</p>
                                    <p className="text-xs text-slate-500">{lead.source}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                             <span className={`
                                inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset
                                ${lead.status === 'sucesso' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 
                                  lead.status === 'insucesso' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                                  'bg-slate-100 text-slate-600 ring-slate-500/10'}
                             `}>
                                {lead.status}
                             </span>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-slate-700 font-medium">{lead.interestedCar}</p>
                            <p className="text-xs text-slate-500">{lead.interestedYear}</p>
                        </td>
                        <td className="px-6 py-4">
                             <div className="flex items-center gap-2 text-slate-500">
                                 <Phone className="w-3.5 h-3.5" />
                                 {lead.phone}
                             </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                            {lead.appointmentDate ? (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(lead.appointmentDate).toLocaleDateString('pt-BR')}
                                </div>
                            ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};