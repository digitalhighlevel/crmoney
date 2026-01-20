
import React from 'react';
import { User, Bell, Shield, Lock } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Configurações</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-sidebar" /> Perfil da Loja
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Nome da Loja</label>
                    <input type="text" className="w-full p-2 border border-slate-200 rounded-md" defaultValue="Deer Cell Motors" />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">CNPJ</label>
                    <input type="text" className="w-full p-2 border border-slate-200 rounded-md" defaultValue="00.000.000/0001-99" />
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-sidebar" /> Configuração da IA
            </h3>
            <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-800">Agressividade nas Vendas</p>
                        <p className="text-sm text-slate-500">Define o tom da IA ao abordar leads</p>
                    </div>
                    <select className="p-2 border border-slate-200 rounded-md bg-white">
                        <option>Conservador</option>
                        <option selected>Balanceado</option>
                        <option>Agressivo</option>
                    </select>
                 </div>
                 <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                        <p className="font-medium text-slate-800">Auto-Agendamento</p>
                        <p className="text-sm text-slate-500">Permitir que a IA agende visitas sem confirmação humana</p>
                    </div>
                    <div className="w-11 h-6 bg-sidebar rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
