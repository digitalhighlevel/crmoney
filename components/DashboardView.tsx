import React from 'react';
import { Lead } from '../types';
import { TrendingUp, Users, CalendarCheck, DollarSign, ArrowUpRight } from 'lucide-react';

export const DashboardView: React.FC<{ leads: Lead[] }> = ({ leads }) => {
  const totalLeads = leads.length;
  const sales = leads.filter(l => l.status === 'sucesso').length;
  const visits = leads.filter(l => l.status === 'visita' || l.status === 'sucesso').length;
  const conversionRate = totalLeads > 0 ? Math.round((sales / totalLeads) * 100) : 0;

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Leads" value={totalLeads} icon={Users} trend="+12%" color="bg-blue-500" />
        <StatCard title="Visitas Agendadas" value={visits} icon={CalendarCheck} trend="+5%" color="bg-amber-500" />
        <StatCard title="Vendas Realizadas" value={sales} icon={DollarSign} trend="+2%" color="bg-emerald-500" />
        <StatCard title="Taxa de Conversão" value={`${conversionRate}%`} icon={TrendingUp} trend="+0.5%" color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Simulation */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Performance de Vendas (Semanal)</h3>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group overflow-hidden">
                        <div 
                            className="absolute bottom-0 left-0 right-0 bg-sidebar transition-all duration-500 group-hover:bg-sidebar/80"
                            style={{ height: `${h}%` }}
                        ></div>
                        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/50 font-medium">
                            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Atividade Recente</h3>
             <div className="space-y-4">
                 {leads.slice(0, 5).map(lead => (
                     <div key={lead.id} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                         <img src={lead.avatarUrl} className="w-8 h-8 rounded-full bg-slate-100" />
                         <div className="flex-1">
                             <p className="text-sm font-medium text-slate-800">{lead.name}</p>
                             <p className="text-xs text-slate-500">Novo status: <span className="capitalize text-sidebar font-medium">{lead.status}</span></p>
                         </div>
                         <span className="text-xs text-slate-400">2h</span>
                     </div>
                 ))}
             </div>
             <button className="w-full mt-4 py-2 text-sm text-sidebar font-medium hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                 Ver todo histórico <ArrowUpRight className="w-4 h-4" />
             </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
        <div>
            <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {trend} <span className="text-slate-400 font-normal">vs mês anterior</span>
            </p>
        </div>
        <div className={`p-3 rounded-lg ${color} text-white shadow-lg shadow-${color}/30`}>
            <Icon className="w-5 h-5" />
        </div>
    </div>
);