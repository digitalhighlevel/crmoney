import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFipe } from '@/hooks/useFipe';
import { Loader2, Car, Image as ImageIcon, Sparkles } from 'lucide-react';
import { fipeService } from '@/services/fipeService';
import { SearchableSelect } from './SearchableSelect';

interface AddVehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (vehicle: any) => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { brands, models, years, selectedBrand, setSelectedBrand, selectedModel, setSelectedModel, loading } = useFipe();

    const [selectedYear, setSelectedYear] = useState('');
    const [price, setPrice] = useState('');
    const [km, setKm] = useState('');
    const [fuel, setFuel] = useState('Flex');
    const [imageUrl, setImageUrl] = useState('');
    const [isFetchingPrice, setIsFetchingPrice] = useState(false);

    const handleAutoFillPrice = async (yearId: string) => {
        setSelectedYear(yearId);
        if (!selectedBrand || !selectedModel || !yearId) return;

        setIsFetchingPrice(true);
        const details = await fipeService.getDetails(selectedBrand, selectedModel, yearId);
        if (details && details.Valor) {
            // "R$ 158.900,00" -> 158900
            const numericPrice = details.Valor.replace(/[^\d]/g, '').slice(0, -2);
            setPrice(numericPrice);
        }
        setIsFetchingPrice(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const brandObj = brands.find(b => b.id === selectedBrand);
        const modelObj = models.find(m => m.id === selectedModel);

        onAdd({
            brand: brandObj?.nome || '',
            model: modelObj?.nome || '',
            year: years.find(y => y.id === selectedYear)?.nome || '',
            price: Number(price),
            km: km + ' km',
            fuel,
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
            status: 'available'
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-background rounded-[32px] border-border/60 shadow-2xl p-0 overflow-hidden">
                <div className="bg-primary/5 p-8 border-b border-primary/10">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-xl text-white"><Car className="w-6 h-6" /></div>
                            Adicionar ao Estoque
                        </DialogTitle>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">Conectado com a Tabela Fipe em tempo real</p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Brand Selection */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Marca</label>
                            <SearchableSelect
                                items={brands}
                                value={selectedBrand}
                                onSelect={setSelectedBrand}
                                placeholder="Selecione a Marca"
                                loading={loading.brands}
                            />
                        </div>

                        {/* Model Selection */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Modelo</label>
                            <SearchableSelect
                                items={models}
                                value={selectedModel}
                                onSelect={setSelectedModel}
                                placeholder="Selecione o Modelo"
                                loading={loading.models}
                                disabled={!selectedBrand}
                            />
                        </div>

                        {/* Year Selection */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Ano Modelo</label>
                            <SearchableSelect
                                items={years}
                                value={selectedYear}
                                onSelect={handleAutoFillPrice}
                                placeholder="Selecione o Ano"
                                loading={loading.years}
                                disabled={!selectedModel}
                            />
                        </div>

                        {/* Fuel */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Combustível</label>
                            <select
                                className="w-full h-11 rounded-xl bg-muted/40 border-border/60 px-4 text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                value={fuel}
                                onChange={(e) => setFuel(e.target.value)}
                            >
                                <option value="Flex">Flex</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Elétrico">Elétrico</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex justify-between">
                                Preço (R$)
                                {isFetchingPrice && <span className="text-primary animate-pulse normal-case">Consultando Fipe...</span>}
                            </label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="0,00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="h-11 bg-muted/40 rounded-xl font-bold"
                                    required
                                />
                                <Sparkles className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" />
                            </div>
                        </div>

                        {/* KM */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Quilometragem</label>
                            <Input
                                placeholder="Ex: 15.000"
                                value={km}
                                onChange={(e) => setKm(e.target.value)}
                                className="h-11 bg-muted/40 rounded-xl font-bold"
                                required
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">URL da Imagem</label>
                        <div className="relative">
                            <Input
                                placeholder="https://..."
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="h-11 bg-muted/40 rounded-xl font-medium pl-10"
                            />
                            <ImageIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest">
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-[2] h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white">
                            Confirmar Veículo
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
