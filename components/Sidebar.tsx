import React from 'react';
import { LayoutGrid, Users, MessageSquare, PieChart, Bell, Home, Settings, Briefcase } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="w-20 bg-sidebar flex flex-col items-center py-6 gap-8 shrink-0 shadow-xl z-30 h-full">
      {/* Logo Area */}
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4">
        <Home className="w-6 h-6" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        <NavItem icon={PieChart} active={activeView === 'dashboard'} onClick={() => onViewChange('dashboard')} />
        <NavItem icon={LayoutGrid} active={activeView === 'kanban'} onClick={() => onViewChange('kanban')} />
        {/* Users for Clients/Leads */}
        <NavItem icon={Users} active={activeView === 'list'} onClick={() => onViewChange('list')} />
        {/* Briefcase for Team/Employees */}
        <NavItem icon={Briefcase} active={activeView === 'team'} onClick={() => onViewChange('team')} />
        
        {/* Notifications with Badge */}
        <div className="relative w-full">
             <NavItem icon={Bell} active={activeView === 'notifications'} onClick={() => onViewChange('notifications')} />
             <span className="absolute top-0 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-sidebar"></span>
        </div>

        <div className="flex-1"></div>
        <NavItem icon={Settings} active={activeView === 'settings'} onClick={() => onViewChange('settings')} />
      </nav>

      {/* User Avatar Bottom */}
      <div className="mt-auto mb-4 relative group">
        <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Admin" 
            className="w-10 h-10 rounded-full border-2 border-white/20 cursor-pointer hover:border-white transition-colors"
        />
        <div className="absolute left-14 bottom-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Admin Profile
        </div>
      </div>
    </aside>
  );
};

const NavItem: React.FC<{ icon: any, active?: boolean, onClick: () => void }> = ({ icon: Icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200
      ${active 
        ? 'bg-white text-sidebar shadow-lg scale-105' 
        : 'text-white/60 hover:bg-white/10 hover:text-white'}
    `}
  >
    <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
  </button>
);