import React from 'react';
import { LayoutGrid, Users, PieChart, Bell, Home, Settings, Briefcase, Car, Calendar, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="w-20 bg-sidebar flex flex-col items-center py-6 gap-6 shrink-0 shadow-xl z-30 h-full overflow-y-auto no-scrollbar">
      {/* Store Switcher / Logo */}
      <div className="relative group mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewChange('stores')}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner",
            activeView === 'stores' ? "bg-primary text-white shadow-lg" : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          <Home className="w-6 h-6" />
        </Button>
        <div className="absolute left-16 top-0 bg-slate-900 border border-white/10 text-white text-[10px] uppercase font-black tracking-widest px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
          Painel Administrativo SaaS
        </div>
      </div>

      <Separator className="w-10 bg-white/10" />

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-3 pt-2">
        <NavItem icon={PieChart} active={activeView === 'dashboard'} onClick={() => onViewChange('dashboard')} title="Dashboard" />
        <NavItem icon={LayoutGrid} active={activeView === 'kanban'} onClick={() => onViewChange('kanban')} title="Funil" />
        <NavItem icon={Users} active={activeView === 'list'} onClick={() => onViewChange('list')} title="Contatos" />

        <Separator className="bg-white/5 mx-2" />

        <NavItem icon={Car} active={activeView === 'inventory'} onClick={() => onViewChange('inventory')} title="Estoque" />
        <NavItem icon={Calendar} active={activeView === 'agenda'} onClick={() => onViewChange('agenda')} title="Agenda" />
        <NavItem icon={Briefcase} active={activeView === 'team'} onClick={() => onViewChange('team')} title="Equipe" />

        <div className="relative w-full">
          <NavItem icon={Bell} active={activeView === 'notifications'} onClick={() => onViewChange('notifications')} title="Notificações" />
          <span className="absolute top-1 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-sidebar"></span>
        </div>

        <div className="flex-1"></div>
        <NavItem icon={Settings} active={activeView === 'settings'} onClick={() => onViewChange('settings')} title="Configurações" />
      </nav>

      {/* User Avatar Bottom */}
      <div className="mt-auto relative group cursor-pointer pt-4">
        <Avatar className="w-12 h-12 border-2 border-white/20 group-hover:border-white transition-all shadow-lg hover:scale-105">
          <AvatarImage src="https://picsum.photos/seed/admin/100/100" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="absolute left-16 bottom-0 bg-slate-900 border border-white/10 text-white text-[10px] uppercase font-black tracking-widest px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
          Perfil Admin (SaaS)
        </div>
      </div>
    </aside>
  );
};

const NavItem: React.FC<{ icon: any, active?: boolean, onClick: () => void, title: string }> = ({ icon: Icon, active, onClick, title }) => (
  <div className="relative group w-full">
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 border-none",
        active
          ? "bg-primary text-white shadow-[0_10px_20px_rgba(var(--primary),0.3)] scale-105 hover:bg-primary/90"
          : "text-white/40 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
    </Button>
    <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-white/10 text-white text-[10px] uppercase font-black tracking-widest px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl scale-95 group-hover:scale-100 origin-left">
      {title}
    </div>
  </div>
);