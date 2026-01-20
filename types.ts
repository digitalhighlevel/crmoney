
export type LeadStatus = 'atendimento' | 'agendamento' | 'visita' | 'sucesso' | 'insucesso';

export type CloseType = 'venda' | 'troca' | 'compra' | null;

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'lead';
  text: string;
  timestamp: string;
  type?: 'text' | 'audio' | 'image'; // Added for multimedia simulation
}

export interface TradeInDetails {
  hasTradeIn: boolean;
  model: string;
  color: string;
  year: string;
  mileage: string; // Added mileage
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  interestedCar: string;
  interestedYear: string;
  source: string;
  status: LeadStatus;
  tradeIn: TradeInDetails;
  appointmentDate?: string; // ISO String
  appointmentConfirmed: boolean;
  aiHistory: ChatMessage[];
  avatarUrl: string;
}

export interface ColumnDefinition {
  id: LeadStatus;
  title: string;
  color: string;
}
