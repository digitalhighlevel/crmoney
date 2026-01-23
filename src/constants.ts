import { ColumnDefinition, Lead } from './types';

export const COLUMNS: ColumnDefinition[] = [
  { id: 'atendimento', title: 'Atendimento', color: 'border-blue-500' },
  { id: 'agendamento', title: 'Agendamento', color: 'border-yellow-500' },
  { id: 'visita', title: 'Visita (Aguardando)', color: 'border-orange-500' },
  { id: 'sucesso', title: 'Sucesso', color: 'border-emerald-500' },
  { id: 'insucesso', title: 'Insucesso', color: 'border-red-500' },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    dealershipId: 'd1',
    name: 'Carlos Silva',
    phone: '(11) 99999-1234',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    interestedCar: 'Toyota Corolla XEi',
    interestedYear: '2022',
    source: 'WebMotors',
    status: 'atendimento',
    tradeIn: { hasTradeIn: false, model: '', color: '', year: '', mileage: '' },
    appointmentConfirmed: false,
    avatarUrl: 'https://picsum.photos/seed/carlos/200/200',
    aiHistory: [
      { id: 'm1', sender: 'ai', text: 'Olá Carlos, vi que se interessou pelo Corolla 2022. Ele está impecável! Você gostaria de saber mais sobre as condições de financiamento?', timestamp: '10:00' },
      { id: 'm2', sender: 'lead', text: 'Sim, qual a taxa para 24x?', timestamp: '10:05' },
      { id: 'm3', sender: 'ai', text: 'Temos taxas a partir de 0.99%. O carro está na loja da Vila Olímpia. Que tal vir ver pessoalmente hoje às 15h?', timestamp: '10:06' }
    ],
    tags: ['Interessado em Financiamento'],
    comments: [],
    checklists: [],
    description: 'Cliente interessado no Corolla XEi 2022.'
  },
  {
    id: '2',
    dealershipId: 'd1',
    name: 'Fernanda Lima',
    phone: '(21) 98888-5678',
    address: 'Rua das Laranjeiras, 50 - Rio de Janeiro, RJ',
    interestedCar: 'Jeep Compass Longitude',
    interestedYear: '2021',
    source: 'Instagram',
    status: 'visita',
    appointmentDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday (Overdue)
    appointmentConfirmed: false,
    tradeIn: { hasTradeIn: true, model: 'Honda HR-V', color: 'Prata', year: '2018', mileage: '58000 km' },
    avatarUrl: 'https://picsum.photos/seed/fernanda/200/200',
    aiHistory: [
      { id: 'm1', sender: 'ai', text: 'Oi Fernanda! O Compass é uma excelente escolha para quem busca conforto. Percebi que você tem um HR-V, correto? Conseguimos uma avaliação ótima na troca.', timestamp: '09:00' },
      { id: 'm2', sender: 'lead', text: 'Sério? Quanto vocês pagam no meu?', timestamp: '09:15' },
      { id: 'm3', sender: 'ai', text: 'Preciso que nosso avaliador veja o carro. Posso agendar sua visita para amanhã de manhã?', timestamp: '09:16' },
      { id: 'm4', sender: 'lead', text: 'Pode ser.', timestamp: '09:20' }
    ],
    tags: ['Troca', 'Atrasado'],
    comments: [{ id: 'c1', text: 'Avaliar HR-V com cuidado.', user_name: 'Admin', created_at: new Date().toISOString() }],
    checklists: [],
    description: 'Cliente possui HR-V 2018 para troca.'
  },
  {
    id: '3',
    dealershipId: 'd1',
    name: 'Roberto Souza',
    phone: '(31) 97777-4321',
    address: 'Belo Horizonte, MG',
    interestedCar: 'BMW 320i M Sport',
    interestedYear: '2023',
    source: 'Indicação',
    status: 'agendamento',
    appointmentDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    appointmentConfirmed: true,
    tradeIn: { hasTradeIn: false, model: '', color: '', year: '', mileage: '' },
    avatarUrl: 'https://picsum.photos/seed/roberto/200/200',
    aiHistory: [
      { id: 'm1', sender: 'ai', text: 'Roberto, a BMW 320i acabou de chegar. É a configuração M Sport na cor Azul Portimão. Exclusiva.', timestamp: '14:00' },
      { id: 'm2', sender: 'lead', text: 'Estou indo aí ver.', timestamp: '14:02' }
    ],
    tags: ['Premium', 'BMW'],
    comments: [],
    checklists: [],
    description: 'Cliente buscando BMW 320i M Sport.'
  },
  {
    id: '4',
    dealershipId: 'd1',
    name: 'Ana Pereira',
    phone: '(41) 99111-2233',
    address: 'Curitiba, PR',
    interestedCar: 'Fiat Pulse Audace',
    interestedYear: '2024',
    source: 'Facebook Ads',
    status: 'sucesso',
    tradeIn: { hasTradeIn: false, model: '', color: '', year: '', mileage: '' },
    appointmentConfirmed: true,
    avatarUrl: 'https://picsum.photos/seed/ana/200/200',
    aiHistory: [
      { id: 'm1', sender: 'ai', text: 'Olá Ana, tudo bem? Vi seu interesse no Pulse.', timestamp: '11:00' }
    ],
    tags: ['Vendido'],
    comments: [],
    checklists: [],
    description: 'Lead convertido.'
  }
];