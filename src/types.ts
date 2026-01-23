
export type LeadStatus = 'atendimento' | 'agendamento' | 'visita' | 'sucesso' | 'insucesso';
export type CloseType = 'venda' | 'troca' | 'compra' | null;

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'lead';
  text: string;
  timestamp: string;
  type?: 'text' | 'audio' | 'image';
}

export interface TradeInDetails {
  hasTradeIn: boolean;
  model: string;
  color: string;
  year: string;
  mileage: string;
}

export interface Dealership {
  id: string;
  name: string;
  logoUrl?: string;
  plan: 'trial' | 'pro' | 'enterprise';
  aiConfig: {
    tone: 'chill' | 'balanced' | 'aggressive';
    autoSchedule: boolean;
    knowledgeBaseUrl?: string;
  };
}

export interface Vehicle {
  id: string;
  dealershipId: string;
  brand: string;
  model: string;
  year: string;
  price: number;
  km: string;
  fuel: string;
  status: 'available' | 'reserved' | 'sold';
  imageUrl: string;
}

export interface Seller {
  id: string;
  dealershipId: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  active: boolean;
  role: 'vendedor' | 'gerente';
}

export interface LeadComment {
  id: string;
  text: string;
  user_name: string;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  content: string;
  is_completed: boolean;
}

export interface Lead {
  id: string;
  dealershipId: string;
  name: string;
  phone: string;
  address: string;
  interestedCar: string;
  interestedYear: string;
  source: string;
  status: LeadStatus;
  tradeIn: TradeInDetails;
  appointmentDate?: string;
  appointmentConfirmed: boolean;
  aiHistory: ChatMessage[];
  avatarUrl: string;
  assignedSellerId?: string;
  interestedVehicleId?: string;

  // Novos campos inspirados no Zaeom
  description?: string;
  tags: string[];
  comments: LeadComment[];
  checklists: {
    id: string;
    title: string;
    items: ChecklistItem[];
  }[];
  value?: number;
  lastContactAt?: string;
}

export interface ColumnDefinition {
  id: LeadStatus;
  title: string;
  color: string;
}
