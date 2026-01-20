
import React from 'react';
import { Search, Filter, Plus, ChevronDown, LayoutTemplate, PlayCircle } from 'lucide-react';

interface HeaderProps {
    onAddClick: () => void;
    onSimulateClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddClick, onSimulateClick }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Leads & Pipeline</h1>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            Pipeline Ativo
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar nome, email, placa..." 
            className="flex h-10 w-64 lg:w-80 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 pl-10 text-sm shadow-sm transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar/20 focus-visible:border-sidebar hover:bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
            {onSimulateClick && (
                <button 
                    onClick={onSimulateClick}
                    className="h-10 px-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors flex items-center gap-2 mr-2"
                >
                    <PlayCircle className="w-4 h-4" />
                    Simular Lead
                </button>
            )}
            
            <button className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtrar
            </button>
            <button 
                onClick={onAddClick}
                className="h-10 px-4 rounded-lg bg-sidebar text-white text-sm font-medium hover:bg-sidebar/90 shadow-md shadow-sidebar/20 transition-all flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Novo Lead
            </button>
        </div>
      </div>
    </header>
  );
};
