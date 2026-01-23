import React, { useState } from 'react';
import { Vehicle } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, sanitizeUrl } from '@/lib/utils';
import { AddVehicleModal } from './AddVehicleModal';
import { ImportStockModal } from './ImportStockModal';
import { Globe, Plus, Search, Car, Tag, Fuel, Gauge, Edit2, Trash2, ExternalLink } from 'lucide-react';

export const InventoryView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        {
            id: 'v1',
            dealershipId: 'd1',
            brand: 'Toyota',
            model: 'Corolla XEi 2.0',
            year: '2024',
            price: 158900,
            km: '0km',
            fuel: 'Flex',
            status: 'available',
            imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 'v2',
            dealershipId: 'd1',
            brand: 'BMW',
            model: '320i M Sport',
            year: '2023',
            price: 320000,
            km: '12.000km',
            fuel: 'Gasolina',
            status: 'reserved',
            imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 'v3',
            dealershipId: 'd1',
            brand: 'Jeep',
            model: 'Compass Longitude',
            year: '2022',
            price: 145000,
            km: '34.500km',
            fuel: 'Flex',
            status: 'available',
            imageUrl: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 'v4',
            dealershipId: 'd1',
            brand: 'Honda',
            model: 'Civic RS',
            year: '2024',
            price: 265000,
            km: '0km',
            fuel: 'Híbrido',
            status: 'available',
            imageUrl: 'https://images.unsplash.com/photo-1605816988069-b11c83b40639?q=80&w=800&auto=format&fit=crop'
        }
    ]);

    const handleAddVehicle = (newVehicle: Omit<Vehicle, 'id' | 'dealershipId'>) => {
        const vehicle: Vehicle = {
            ...newVehicle,
            id: Date.now().toString(),
            dealershipId: 'd1',
        };
        setVehicles(prev => [vehicle, ...prev]);
    };

    const handleImportVehicles = (imported: any[]) => {
        const newVehicles = imported.map(v => ({
            ...v,
            id: 'imp-' + Math.random().toString(36).substr(2, 9),
            dealershipId: 'd1'
        }));
        setVehicles(prev => [...newVehicles, ...prev]);
    };

    const filteredVehicles = vehicles.filter(v =>
        v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollArea className="h-full">
            <div className="p-10 space-y-10">
                {/* Header Section */}
                <div className="flex items-end justify-between border-b pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">Estoque</h2>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Gestão de veículos e ativos da loja</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <Input
                                placeholder="Buscar veículo..."
                                className="pl-10 w-64 bg-background shadow-sm border-border/60 font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setIsImportModalOpen(true)}
                            className="gap-2 font-black text-[10px] uppercase tracking-widest px-6 border-primary/20 hover:bg-primary/5 text-primary rounded-xl overflow-hidden"
                        >
                            <Globe className="w-4 h-4" /> Importar Estoque
                        </Button>
                        <Button
                            onClick={() => setIsAddModalOpen(true)}
                            className="gap-2 font-black text-[10px] uppercase tracking-widest px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 rounded-xl"
                        >
                            <Plus className="w-3 h-3" strokeWidth={3} /> Adicionar Veículo
                        </Button>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredVehicles.map(vehicle => (
                        <Card key={vehicle.id} className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 rounded-3xl">
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={sanitizeUrl(vehicle.imageUrl)}
                                    alt={vehicle.model}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <Badge className={cn(
                                        "font-black text-[9px] uppercase tracking-widest px-3 py-1 shadow-lg",
                                        vehicle.status === 'available' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                                    )}>
                                        {vehicle.status === 'available' ? 'Disponível' : 'Reservado'}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{vehicle.brand}</p>
                                    <h3 className="text-white text-lg font-black tracking-tight">{vehicle.model}</h3>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-6 bg-background">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Tag className="w-4 h-4 text-primary/60" />
                                        <span className="text-xs font-bold leading-none">{vehicle.year}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Gauge className="w-4 h-4 text-primary/60" />
                                        <span className="text-xs font-bold leading-none">{vehicle.km}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Fuel className="w-4 h-4 text-primary/60" />
                                        <span className="text-xs font-bold leading-none">{vehicle.fuel}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Car className="w-4 h-4 text-primary/60" />
                                        <span className="text-xs font-bold leading-none">Original</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Preço Sugerido</p>
                                        <p className="text-2xl font-black text-primary tracking-tight">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vehicle.price)}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary rounded-xl">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-destructive rounded-xl">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Button className="w-full bg-muted/30 hover:bg-muted/50 text-foreground font-black text-[10px] uppercase tracking-widest h-12 rounded-2xl gap-2 group/btn">
                                    Ver Detalhes IA <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add New Placeholder */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-[460px] rounded-3xl border-4 border-dashed border-muted/50 flex flex-col items-center justify-center text-muted-foreground/40 gap-4 hover:border-primary/20 hover:text-primary/40 transition-all group"
                    >
                        <div className="p-6 rounded-full bg-muted/10 group-hover:scale-110 transition-transform shadow-inner">
                            <Plus className="w-10 h-10" strokeWidth={3} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Novo Veículo</span>
                    </button>
                </div>

                <AddVehicleModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddVehicle}
                />

                <ImportStockModal
                    isOpen={isImportModalOpen}
                    onClose={() => setIsImportModalOpen(false)}
                    onImport={handleImportVehicles}
                    existingVehicles={vehicles}
                />
            </div>
        </ScrollArea>
    );
};
