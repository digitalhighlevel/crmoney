import React, { useState } from 'react';
import { X, User, Phone, MapPin, Car, Globe } from 'lucide-react';
import { Lead, LeadStatus } from '../types';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Omit<Lead, 'id' | 'aiHistory' | 'appointmentConfirmed' | 'avatarUrl' | 'tradeIn'>) => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    interestedCar: '',
    interestedYear: '',
    source: 'Loja (Presencial)',
    status: 'atendimento' as LeadStatus
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
        name: '',
        phone: '',
        address: '',
        interestedCar: '',
        interestedYear: '',
        source: 'Loja (Presencial)',
        status: 'atendimento'
    });
  };

  const inputClass = "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar disabled:cursor-not-allowed disabled:opacity-50 text-slate-900";
  const labelClass = "text-sm font-medium leading-none text-slate-700 mb-2 block";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      
      <div className="relative z-50 w-full max-w-lg border border-slate-200 bg-white shadow-2xl duration-200 sm:rounded-xl animate-in zoom-in-95 flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <h2 className="text-lg font-bold text-slate-900">Novo Lead Manual</h2>
            <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-200 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className={labelClass}>Nome do Cliente</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input required type="text" placeholder="Ex: João Silva" className={`${inputClass} pl-9`} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                </div>
                
                <div>
                    <label className={labelClass}>Telefone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input required type="text" placeholder="(00) 00000-0000" className={`${inputClass} pl-9`} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Origem</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <select className={`${inputClass} pl-9`} value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                            <option value="Loja (Presencial)">Loja (Presencial)</option>
                            <option value="Telefone">Telefone</option>
                            <option value="Indicação">Indicação</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="WebMotors">WebMotors</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-2">
                    <label className={labelClass}>Endereço</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input type="text" placeholder="Cidade - UF" className={`${inputClass} pl-9`} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 my-4 pt-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4 text-sidebar" /> Interesse
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className={labelClass}>Modelo</label>
                        <input required type="text" placeholder="Ex: Honda Civic" className={inputClass} value={formData.interestedCar} onChange={e => setFormData({...formData, interestedCar: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelClass}>Ano</label>
                        <input type="text" placeholder="2024" className={inputClass} value={formData.interestedYear} onChange={e => setFormData({...formData, interestedYear: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sidebar hover:bg-sidebar/90 rounded-lg shadow-sm transition-colors">Cadastrar Lead</button>
            </div>
        </form>

      </div>
    </div>
  );
};