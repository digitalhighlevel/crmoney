import React from 'react';
import { CheckCircle2, DollarSign, RefreshCw, Car } from 'lucide-react';
import { CloseType } from '../types';

interface SuccessDialogProps {
  isOpen: boolean;
  onConfirm: (type: CloseType) => void;
  onCancel: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={onCancel}></div>
      
      <div className="relative z-50 grid w-full max-w-lg gap-4 border border-slate-200 bg-white p-6 shadow-2xl duration-200 sm:rounded-xl animate-in zoom-in-95 slide-in-from-bottom-4">
        
        <div className="flex flex-col items-center text-center space-y-2 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-2 border border-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Negócio Fechado!</h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Parabéns! Selecione abaixo qual foi o tipo de conversão realizada com este cliente.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
            {[
                { type: 'venda', icon: DollarSign, label: 'Venda Simples', desc: 'Saída de veículo do estoque.', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
                { type: 'troca', icon: RefreshCw, label: 'Venda com Troca', desc: 'Venda + entrada de veículo usado.', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
                { type: 'compra', icon: Car, label: 'Compra de Veículo', desc: 'Aquisição de veículo para estoque.', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' }
            ].map((item) => (
                <button 
                    key={item.label}
                    onClick={() => onConfirm(item.type as CloseType)}
                    className="group relative flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 hover:border-slate-300 transition-all text-left shadow-sm hover:shadow-md"
                >
                    <div className={`p-3 rounded-lg border ${item.bg} ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="font-semibold text-slate-900">{item.label}</h3>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                </button>
            ))}
        </div>

        <div className="flex justify-center mt-6">
            <button 
                onClick={onCancel} 
                className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
            >
                Cancelar ação
            </button>
        </div>

      </div>
    </div>
  );
};