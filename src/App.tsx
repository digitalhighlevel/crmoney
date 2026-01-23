
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { LeadCard } from '@/components/LeadCard';
import { LeadModal } from '@/components/LeadModal';
import { SuccessDialog } from '@/components/SuccessDialog';
import { AddLeadModal } from '@/components/AddLeadModal';
import { SimulationWizard } from '@/components/SimulationWizard';
import { DashboardView } from '@/components/DashboardView';
import { ListView } from '@/components/ListView';
import { BoardView } from '@/components/BoardView';
import { TeamView } from '@/components/TeamView';
import { SettingsView } from '@/components/SettingsView';
import { NotificationsView } from '@/components/NotificationsView';
import { InventoryView } from '@/components/InventoryView';
import { AgendaView } from '@/components/AgendaView';
import { StoresListView } from '@/components/StoresListView';
import { COLUMNS, MOCK_LEADS } from '@/constants';
import { Lead, LeadStatus, CloseType } from '@/types';
import { Plus, MoreHorizontal } from 'lucide-react';
import { arrayMove } from '@dnd-kit/sortable';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('kanban');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [pendingSuccessLeadId, setPendingSuccessLeadId] = useState<string | null>(null);

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    const lead = leads.find(l => l.id === leadId);

    if (lead && lead.status !== targetStatus) {
      if (targetStatus === 'sucesso') {
        setPendingSuccessLeadId(leadId);
        setSuccessDialogOpen(true);
      } else {
        updateLeadStatus(leadId, targetStatus);
      }
    }
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleSuccessConfirm = (type: CloseType) => {
    if (pendingSuccessLeadId && type) {
      updateLeadStatus(pendingSuccessLeadId, 'sucesso');
    }
    setSuccessDialogOpen(false);
    setPendingSuccessLeadId(null);
  };

  const handleSuccessCancel = () => {
    setSuccessDialogOpen(false);
    setPendingSuccessLeadId(null);
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const reorderLeads = (activeId: string, overId: string) => {
    setLeads((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(items, oldIndex, newIndex);
      }
      return items;
    });
  };

  const createNewLead = (data: Partial<Lead>): string => {
    const newId = Date.now().toString();
    const newLead: Lead = {
      id: newId,
      dealershipId: 'd1', // Default for now
      name: data.name || 'Novo Lead',
      phone: data.phone || '',
      address: data.address || '',
      interestedCar: data.interestedCar || '',
      interestedYear: data.interestedYear || '',
      source: data.source || 'Simulação',
      status: (data.status as LeadStatus) || 'atendimento',
      tradeIn: { hasTradeIn: false, model: '', color: '', year: '', mileage: '' },
      appointmentConfirmed: false,
      aiHistory: [],
      tags: [],
      comments: [],
      checklists: [],
      description: data.description || '',
      avatarUrl: `https://picsum.photos/seed/${(data.name || 'new').replace(' ', '')}/200/200`
    };
    setLeads(prev => [newLead, ...prev]);
    if (activeView === 'dashboard' || activeView === 'settings') setActiveView('kanban');
    return newId;
  };

  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'aiHistory' | 'appointmentConfirmed' | 'avatarUrl' | 'tradeIn' | 'tags' | 'comments' | 'checklists' | 'dealershipId'>) => {
    createNewLead(newLeadData);
  };

  // Simulation Logic
  const handleSimulationCreate = (data: { name: string, car: string, phone: string }) => {
    // Create in 'Atendimento' initially
    return createNewLead({
      name: data.name,
      interestedCar: data.car,
      phone: data.phone,
      status: 'atendimento',
      source: 'IA Simulation'
    });
  };

  const handleSimulationUpdate = (id: string, status: LeadStatus) => {
    // Move to next stage during simulation
    updateLeadStatus(id, status);
  };

  const openLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      {/* Sidebar - Fixed Left */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onAddClick={() => setIsAddModalOpen(true)}
          onSimulateClick={() => setIsSimulationOpen(true)}
        />

        {/* Content Views */}
        <main className="flex-1 overflow-hidden relative">

          {activeView === 'dashboard' && <DashboardView leads={leads} />}
          {activeView === 'list' && <ListView leads={leads} onSelect={openLeadModal} />}
          {activeView === 'team' && <TeamView />}
          {activeView === 'settings' && <SettingsView />}
          {activeView === 'notifications' && <NotificationsView />}
          {activeView === 'inventory' && <InventoryView />}
          {activeView === 'agenda' && <AgendaView />}
          {activeView === 'stores' && <StoresListView />}

          {activeView === 'kanban' && (
            <BoardView
              leads={leads}
              onLeadClick={openLeadModal}
              onUpdateStatus={updateLeadStatus}
              onReorder={reorderLeads}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleLeadUpdate}
        />
      )}

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddLead}
      />

      <SimulationWizard
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        onCreateLead={handleSimulationCreate}
        onUpdateStatus={handleSimulationUpdate}
      />

      <SuccessDialog
        isOpen={successDialogOpen}
        onConfirm={handleSuccessConfirm}
        onCancel={handleSuccessCancel}
      />
    </div>
  );
};

export default App;
