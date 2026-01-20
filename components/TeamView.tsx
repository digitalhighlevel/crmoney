
import React from 'react';
import { MoreHorizontal, Mail, Phone } from 'lucide-react';

export const TeamView: React.FC = () => {
  const team = [
    { id: 1, name: 'Ana Silva', role: 'Gerente de Vendas', email: 'ana@deercell.com', active: true },
    { id: 2, name: 'Pedro Santos', role: 'Vendedor Sênior', email: 'pedro@deercell.com', active: true },
    { id: 3, name: 'Lucas Oliveira', role: 'Vendedor Jr', email: 'lucas@deercell.com', active: false },
    { id: 4, name: 'Mariana Costa', role: 'Atendimento', email: 'mariana@deercell.com', active: true },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Equipe de Vendas</h2>
        <button className="px-4 py-2 bg-sidebar text-white rounded-lg text-sm font-medium">Convidar Membro</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700">Nome</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Cargo</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Contato</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {team.map(member => (
                    <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                    {member.name.charAt(0)}
                                </div>
                                <span className="font-medium text-slate-900">{member.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{member.role}</td>
                        <td className="px-6 py-4">
                            <div className="flex flex-col text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {member.email}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${member.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                {member.active ? 'Ativo' : 'Inativo'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
