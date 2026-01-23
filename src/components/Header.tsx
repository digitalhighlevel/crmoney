import React from 'react';
import { Search, Filter, Plus, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
  onAddClick: () => void;
  onSimulateClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddClick, onSimulateClick }) => {
  return (
    <header className="h-20 bg-background border-b border-border flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Leads & Funil</h1>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Badge variant="secondary" className="px-3 py-1 font-medium bg-secondary text-secondary-foreground">
          Funil Ativo
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <Input
            type="text"
            placeholder="Buscar nome, email, placa..."
            className="w-64 lg:w-80 pl-10 bg-muted/50 focus:bg-background transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onSimulateClick && (
            <Button
              variant="outline"
              onClick={onSimulateClick}
              className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Simular Lead
            </Button>
          )}

          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <Button
            onClick={onAddClick}
            className="bg-sidebar text-white hover:bg-sidebar/90 shadow-md shadow-sidebar/20 gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </Button>
        </div>
      </div>
    </header>
  );
};
