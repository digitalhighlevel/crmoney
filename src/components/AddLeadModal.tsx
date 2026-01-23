import React, { useState } from 'react';
import { User, Phone, Car, Globe, Loader2, Sparkles } from 'lucide-react';
import { Lead, LeadStatus } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFipe } from '@/hooks/useFipe';
import { SearchableSelect } from './SearchableSelect';

interface AddLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (lead: Omit<Lead, 'id' | 'aiHistory' | 'appointmentConfirmed' | 'avatarUrl' | 'tradeIn' | 'tags' | 'comments' | 'checklists' | 'dealershipId'>) => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onSave }) => {
    const { brands, models, years, selectedBrand, setSelectedBrand, selectedModel, setSelectedModel, loading } = useFipe();
    const [selectedYear, setSelectedYear] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        interestedCar: '',
        interestedYear: '',
        source: 'Loja (Presencial)',
        status: 'atendimento' as LeadStatus
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const modelObj = models.find(m => m.id === selectedModel);
        const yearObj = years.find(y => y.id === selectedYear);

        onSave({
            ...formData,
            interestedCar: modelObj?.nome || formData.interestedCar,
            interestedYear: yearObj?.nome || formData.interestedYear
        });

        onClose();
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

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-xl bg-background rounded-[32px] border-border/60 shadow-2xl p-0 overflow-hidden text-foreground">
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase tracking-tight">Novo Lead Manual</DialogTitle>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Cadastro rápido com integração Fipe</p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nome do Cliente</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input required placeholder="Ex: João Silva" className="pl-10 h-11 rounded-xl bg-muted/30 font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Telefone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input required placeholder="(11) 99999-0000" className="pl-10 h-11 rounded-xl bg-muted/30 font-bold" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Origem</label>
                            <div className="relative text-foreground">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <select
                                    className="flex h-11 w-full rounded-xl border border-input bg-muted/30 px-3 py-2 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pl-10 appearance-none cursor-pointer"
                                    value={formData.source}
                                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                                >
                                    <option value="Loja (Presencial)">Loja (Presencial)</option>
                                    <option value="Telefone">Telefone</option>
                                    <option value="WebMotors">WebMotors</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-6 rounded-[24px] border border-border/40 space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center justify-between">
                            <span className="flex items-center gap-2"><Car className="w-4 h-4" /> Interesse Fipe</span>
                            <Sparkles className="w-3 h-3 text-primary/40" />
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase opacity-60">Marca</label>
                                <SearchableSelect
                                    items={brands}
                                    value={selectedBrand}
                                    onSelect={setSelectedBrand}
                                    placeholder="Selecione a Marca"
                                    loading={loading.brands}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase opacity-60">Modelo</label>
                                    <SearchableSelect
                                        items={models}
                                        value={selectedModel}
                                        onSelect={setSelectedModel}
                                        placeholder="Selecione o Modelo"
                                        loading={loading.models}
                                        disabled={!selectedBrand}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground ml-1 uppercase opacity-60">Ano</label>
                                    <SearchableSelect
                                        items={years}
                                        value={selectedYear}
                                        onSelect={setSelectedYear}
                                        placeholder="Selecione o Ano"
                                        loading={loading.years}
                                        disabled={!selectedModel}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-12 rounded-xl font-bold text-[10px] uppercase tracking-widest">
                            Sair
                        </Button>
                        <Button type="submit" className="flex-[2] h-12 rounded-xl font-black text-[10px] uppercase tracking-widest bg-sidebar text-white shadow-lg overflow-hidden relative group">
                            <span className="relative z-10">Concluir Cadastro</span>
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};