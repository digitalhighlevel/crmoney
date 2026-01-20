import React, { useState, useRef, useEffect } from 'react';
import { Lead, TradeInDetails, ChatMessage } from '../types';
import { X, User, Car, Sparkles, MessageSquare, Save, Phone, MapPin, Mic, Image as ImageIcon, Send, Play, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface LeadModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedLead: Lead) => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ lead, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'ai'>('info');
  const [formData, setFormData] = useState<Lead>(lead);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setFormData(lead);
  }, [lead]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'ai') {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [formData.aiHistory, activeTab, isTyping]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof Lead, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTradeInChange = (field: keyof TradeInDetails, value: any) => {
    setFormData(prev => ({
      ...prev,
      tradeIn: { ...prev.tradeIn, [field]: value }
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    onClose();
  };

  // Real AI Logic using Gemini
  const handleSendMessage = async (type: 'text' | 'audio' | 'image' = 'text', content?: string) => {
    const textToSend = content || chatInput;
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const newMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'lead',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: type
    };

    const updatedHistory = [...formData.aiHistory, newMsg];
    setFormData(prev => ({ ...prev, aiHistory: updatedHistory }));
    setChatInput('');
    setIsTyping(true);

    try {
        // 2. Prepare Context for Gemini
        // Safe check for API Key availability
        const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
        if (!apiKey) {
             throw new Error("API Key missing");
        }

        const ai = new GoogleGenAI({ apiKey });
        
        // System Instruction: Enhanced Sales Persona including Mileage context
        const tradeInInfo = formData.tradeIn.hasTradeIn 
            ? `Sim: ${formData.tradeIn.model} (${formData.tradeIn.year}), Cor: ${formData.tradeIn.color}, KM: ${formData.tradeIn.mileage || 'Não informado'}`
            : 'Não informado';

        const systemInstruction = `
            ATUAÇÃO: Você é a 'Deer AI', uma especialista em vendas automotivas da 'Deer Cell Motors'.
            
            CONTEXTO:
            - Cliente: ${formData.name}
            - Interesse: ${formData.interestedCar} (${formData.interestedYear})
            - Status Atual: ${formData.status}
            - Veículo na Troca: ${tradeInInfo}
            
            OBJETIVO PRINCIPAL: Conseguir que o cliente visite a loja HOJE ou AMANHÃ.
            
            REGRAS DE OURO:
            1. PERSONALIDADE: Seja empático, entusiasta e profissional.
            2. OBJEÇÕES: Se o cliente perguntar preço/parcela, dê uma estimativa vaga e convide para loja.
            3. TÉCNICA DE FECHAMENTO: Sempre termine com uma pergunta de opção ("Prefere manhã ou tarde?").
            4. TROCA: Se o cliente tem um veículo de troca, elogie o modelo e mencione que pagamos bem, especialmente se tiver KM baixo.
            5. MULTIMÍDIA: Se o usuário enviar áudio ou foto, aja como se tivesse entendido perfeitamente ("Ouvi seu áudio..." ou "Vi a foto...").
            
            Exemplo de tom: "Oi Carlos! O Corolla está lindo. Vi que você tem um Civic com ${formData.tradeIn.mileage || 'baixa km'}. Conseguimos uma avaliação excelente nele!"
        `;

        // Format history for Gemini (Model/User turns)
        const historyForModel = updatedHistory.map(msg => ({
            role: msg.sender === 'ai' ? 'model' : 'user',
            parts: [{ text: `[Tipo: ${msg.type || 'text'}] ${msg.text}` }]
        }));

        // 3. Call Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview',
            config: { 
                systemInstruction: systemInstruction,
                temperature: 0.8, 
            },
            contents: historyForModel,
        });

        const aiResponseText = response.text;

        // 4. Add AI Message
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: aiResponseText || "Estou verificando com o gerente. Um momento.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setFormData(prev => ({
            ...prev,
            aiHistory: [...prev.aiHistory, aiMsg]
        }));

    } catch (error) {
        console.error("Erro na AI:", error);
        let errorText = "Ops, tive uma falha de conexão com o servidor da loja. Mas o carro está disponível! Que tal vir vê-lo amanhã?";
        
        if ((error as any).message === "API Key missing") {
             errorText = "Simulação: API Key não configurada. Configure process.env.API_KEY para respostas reais da IA.";
        }

        const fallbackMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: errorText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };
        setFormData(prev => ({ ...prev, aiHistory: [...prev.aiHistory, fallbackMsg] }));
    } finally {
        setIsTyping(false);
    }
  };

  // Shadcn CSS Classes for Light Mode
  const labelClass = "text-sm font-medium leading-none text-slate-700 mb-2 block";
  const inputClass = "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar disabled:cursor-not-allowed disabled:opacity-50 text-slate-900";
  const buttonPrimary = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sidebar text-white hover:bg-sidebar/90 h-9 px-4 py-2 shadow-sm";
  const buttonGhost = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 h-9 px-4 py-2 text-slate-500";
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" 
        onClick={onClose}
      ></div>
      
      <div className="relative z-50 grid w-full max-w-4xl gap-4 border border-slate-200 bg-white p-0 shadow-2xl duration-200 sm:rounded-xl overflow-hidden h-[85vh] flex flex-col animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100 bg-slate-50/50">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={formData.avatarUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold leading-none tracking-tight text-slate-900">{formData.name}</h2>
                    <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600 capitalize shadow-sm">
                            {formData.status}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>{formData.source}</span>
                    </p>
                  </div>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-400" />
              </button>
           </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-6 bg-white">
            <div className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 w-full sm:w-auto">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full sm:w-40 gap-2 ${activeTab === 'info' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
                >
                    <User className="w-4 h-4" /> Dados
                </button>
                <button 
                    onClick={() => setActiveTab('ai')}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full sm:w-40 gap-2 ${activeTab === 'ai' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'}`}
                >
                    <Sparkles className="w-4 h-4" /> IA Agent
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-6 bg-white">
          
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-5">
                <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-sidebar" /> Informações de Contato
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Nome Completo</label>
                        <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Telefone</label>
                        <div className="relative">
                            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <input type="text" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={`${inputClass} pl-9`} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Endereço</label>
                        <div className="relative">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <input type="text" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className={`${inputClass} pl-9`} />
                        </div>
                    </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                 <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Car className="w-4 h-4 text-sidebar" /> Veículo de Interesse
                 </h3>
                 
                 <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className={labelClass}>Modelo</label>
                            <input type="text" value={formData.interestedCar} onChange={(e) => handleInputChange('interestedCar', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Ano</label>
                            <input type="text" value={formData.interestedYear} onChange={(e) => handleInputChange('interestedYear', e.target.value)} className={inputClass} />
                        </div>
                    </div>
                 </div>

                 <div className="space-y-4 pt-2">
                     <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="tradeIn"
                            checked={formData.tradeIn.hasTradeIn} 
                            onChange={(e) => handleTradeInChange('hasTradeIn', e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-sidebar focus:ring-sidebar"
                        />
                        <label htmlFor="tradeIn" className="text-sm font-medium leading-none text-slate-700 select-none cursor-pointer">
                          Cliente possui troca?
                        </label>
                     </div>

                     {formData.tradeIn.hasTradeIn && (
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                             <div className="sm:col-span-3">
                                <label className={labelClass}>Modelo da Troca</label>
                                <input type="text" value={formData.tradeIn.model} onChange={(e) => handleTradeInChange('model', e.target.value)} className={inputClass} placeholder="Ex: Honda Civic" />
                             </div>
                             <div>
                                <label className={labelClass}>Cor</label>
                                <input type="text" value={formData.tradeIn.color} onChange={(e) => handleTradeInChange('color', e.target.value)} className={inputClass} placeholder="Prata" />
                             </div>
                             <div>
                                <label className={labelClass}>Ano</label>
                                <input type="text" value={formData.tradeIn.year} onChange={(e) => handleTradeInChange('year', e.target.value)} className={inputClass} placeholder="2020" />
                             </div>
                             <div className="sm:col-span-3">
                                <label className={labelClass}>Quilometragem (KM)</label>
                                <input type="text" value={formData.tradeIn.mileage || ''} onChange={(e) => handleTradeInChange('mileage', e.target.value)} className={inputClass} placeholder="Ex: 45.000 km" />
                             </div>
                         </div>
                     )}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="flex flex-col h-full">
               <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 mb-6 flex gap-4 items-center">
                   <div className="relative">
                        <div className="bg-blue-100 p-2 rounded-full h-fit relative z-10">
                                <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>
                        {/* Pulse Effect */}
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                   </div>
                   <div className="space-y-1">
                        <div className="flex items-center gap-2">
                             <h4 className="text-sm font-bold text-blue-900">IA Sales Agent</h4>
                             <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Online</span>
                        </div>
                        <p className="text-xs text-blue-700 leading-relaxed">
                           Conectado ao Gemini 2.5 Flash. Modo de Vendas Ativo.
                        </p>
                   </div>
               </div>

               <div className="flex-1 space-y-6 pr-2 custom-scrollbar overflow-y-auto min-h-[300px] px-2">
                  {formData.aiHistory.map((msg) => (
                      <div key={msg.id} className={`flex w-full ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`
                             flex max-w-[80%] flex-col gap-1 rounded-2xl px-5 py-3 text-sm shadow-sm
                             ${msg.sender === 'ai' 
                               ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-none' 
                               : 'bg-sidebar text-white rounded-tr-none'}
                          `}>
                              {msg.type === 'audio' ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <Play className="w-4 h-4 fill-current" />
                                    </div>
                                    <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-1/2"></div>
                                    </div>
                                    <span className="text-xs opacity-80">0:12</span>
                                </div>
                              ) : msg.type === 'image' ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 opacity-90 text-xs font-medium">
                                        <ImageIcon className="w-3 h-3" />
                                        <span>Imagem enviada</span>
                                    </div>
                                    <div className="w-48 h-32 bg-slate-800/10 rounded-lg flex items-center justify-center border border-white/20">
                                        <Car className="w-8 h-8 opacity-50" />
                                    </div>
                                </div>
                              ) : (
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                              )}
                              
                              <span className={`text-[10px] self-end opacity-70`}>
                                  {msg.timestamp}
                              </span>
                          </div>
                      </div>
                  ))}
                  
                  {isTyping && (
                      <div className="flex w-full justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                           <div className="bg-white border border-slate-100 text-slate-700 rounded-tl-none rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-sidebar" />
                                <span className="text-xs text-slate-500 font-medium">Deer AI digitando...</span>
                           </div>
                      </div>
                  )}

                  <div ref={chatEndRef} />
               </div>
               
               <div className="mt-4 flex w-full items-center gap-2 border-t border-slate-100 pt-4 bg-white sticky bottom-0">
                   <div className="flex items-center gap-1">
                        <button onClick={() => handleSendMessage('audio', 'Enviou um áudio de 12 segundos.')} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-sidebar transition-colors" title="Simular envio de áudio">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleSendMessage('image', 'Enviou uma foto do veículo.')} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-sidebar transition-colors" title="Simular envio de foto">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                   </div>
                   <input 
                        type="text" 
                        placeholder="Digite sua mensagem..." 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className={`${inputClass} bg-slate-50 border-slate-200 focus:bg-white`} 
                   />
                   <button onClick={() => handleSendMessage()} className="inline-flex items-center justify-center rounded-lg bg-sidebar text-white hover:bg-sidebar/90 h-9 w-9 shadow-sm transition-all hover:scale-105 active:scale-95">
                       <Send className="h-4 w-4" />
                   </button>
               </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50">
            <button onClick={onClose} className={buttonGhost}>Cancelar</button>
            <button onClick={handleSave} className={buttonPrimary}>
                <Save className="w-4 h-4 mr-2" /> Salvar Alterações
            </button>
        </div>
      </div>
    </div>
  );
};