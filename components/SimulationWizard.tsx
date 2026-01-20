
import React, { useState, useEffect } from 'react';
import { X, User, Car, ArrowRight, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface SimulationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  // New props for live simulation
  onCreateLead: (data: any) => string; // Returns ID
  onUpdateStatus: (id: string, status: any) => void;
}

export const SimulationWizard: React.FC<SimulationWizardProps> = ({ isOpen, onClose, onCreateLead, onUpdateStatus }) => {
  const [step, setStep] = useState(1);
  const [simulationData, setSimulationData] = useState({
    name: '',
    phone: '',
    car: 'Corolla XEi 2024'
  });
  const [progress, setProgress] = useState(0);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setProgress(0);
      setSimulationData({ name: '', phone: '', car: 'Corolla XEi 2024' });
      setCurrentLeadId(null);
    }
  }, [isOpen]);

  const handleStartQualification = () => {
      // 1. Create Lead Immediately in 'Atendimento'
      const id = onCreateLead({
          name: simulationData.name,
          phone: simulationData.phone,
          car: simulationData.car
      });
      setCurrentLeadId(id);
      setStep(2);
  };

  useEffect(() => {
    if (step === 2 && currentLeadId) {
      // Simulate qualification progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev === 50) {
              // 2. Mid-simulation: Bot moves lead to 'Agendamento' (or Visita)
              onUpdateStatus(currentLeadId, 'agendamento');
          }

          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 500);
            return 100;
          }
          return prev + 2; // Slower, smoother update
        });
      }, 50); // Speed of simulation
      return () => clearInterval(interval);
    }
  }, [step, currentLeadId, onUpdateStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in" onClick={onClose}></div>
      
      <div className="relative z-50 w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col min-h-[480px] animate-in slide-in-from-bottom-5">
        
        {/* Progress Bar Top */}
        <div className="h-1.5 w-full bg-slate-100">
            <div 
                className="h-full bg-sidebar transition-all duration-500 ease-in-out" 
                style={{ width: `${(step / 3) * 100}%` }}
            ></div>
        </div>

        <div className="flex-1 p-8 flex flex-col relative">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800">Simulação de Entrada</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Step 1: Data Entry - Dark Inputs Style */}
            {step === 1 && (
                <div className="space-y-6 flex-1 animate-in slide-in-from-right-2 flex flex-col">
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Novo Lead Identificado</h3>
                        <p className="text-sm text-slate-500">Simule a chegada de um lead via Web/WhatsApp.</p>
                    </div>

                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Nome do Cliente" 
                            className="w-full p-4 bg-[#374151] text-white border-none rounded-lg placeholder:text-gray-400 focus:ring-2 focus:ring-sidebar outline-none shadow-inner"
                            value={simulationData.name}
                            onChange={(e) => setSimulationData({...simulationData, name: e.target.value})}
                        />
                         <input 
                            type="text" 
                            placeholder="Telefone" 
                            className="w-full p-4 bg-[#374151] text-white border-none rounded-lg placeholder:text-gray-400 focus:ring-2 focus:ring-sidebar outline-none shadow-inner"
                            value={simulationData.phone}
                            onChange={(e) => setSimulationData({...simulationData, phone: e.target.value})}
                        />
                         <input 
                            type="text" 
                            placeholder="Carro de Interesse" 
                            className="w-full p-4 bg-[#374151] text-white border-none rounded-lg placeholder:text-gray-400 focus:ring-2 focus:ring-sidebar outline-none shadow-inner"
                            value={simulationData.car}
                            onChange={(e) => setSimulationData({...simulationData, car: e.target.value})}
                        />
                    </div>
                    
                    <button 
                        onClick={handleStartQualification}
                        disabled={!simulationData.name}
                        className="w-full mt-auto py-4 bg-[#0f766e] text-white rounded-lg font-bold text-base hover:bg-[#0d6b63] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-teal-900/20"
                    >
                        Iniciar Qualificação <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Step 2: AI Qualification */}
            {step === 2 && (
                <div className="flex flex-col items-center justify-center flex-1 space-y-8 animate-in zoom-in-95">
                    <div className="relative">
                        <div className="w-24 h-24 bg-sidebar/10 rounded-full flex items-center justify-center animate-pulse">
                            <Bot className="w-12 h-12 text-sidebar" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-lg">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                        </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-slate-800">IA Negociando...</h3>
                        <p className="text-slate-500">O Lead foi criado em <span className="font-bold text-slate-700">Atendimento</span>.</p>
                        {progress > 50 && (
                            <p className="text-emerald-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                                ✓ Movido automaticamente para <span className="font-bold">Agendamento</span>
                            </p>
                        )}
                    </div>

                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>Confiança</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-sidebar transition-all duration-100 ease-linear" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full text-sm text-slate-600 shadow-sm">
                        <p className="mb-2"><strong>IA:</strong> Olá {simulationData.name}, vi que gostou do {simulationData.car}...</p>
                        <p className="opacity-50"><strong>Lead:</strong> Gostaria de saber o preço.</p>
                    </div>
                </div>
            )}

            {/* Step 3: Result (Dark Card Style) */}
            {step === 3 && (
                <div className="flex flex-col flex-1 animate-in slide-in-from-bottom-5">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Lead Qualificado!</h3>
                        <p className="text-sm text-slate-500">Agendamento confirmado automaticamente pela IA.</p>
                    </div>

                    {/* Dark Card Replica from Image */}
                    <div className="bg-[#1e293b] rounded-xl p-6 text-white shadow-2xl mb-6 relative overflow-hidden ring-1 ring-white/10">
                        <div className="flex items-center gap-3 mb-8">
                            <Car className="w-6 h-6 text-slate-400" />
                            <span className="text-xl font-medium tracking-wide">{simulationData.car}</span>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-slate-400 text-sm font-medium">Confiança da IA</span>
                                <span className="text-3xl font-bold tracking-tight">98%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[98%] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    </div>

                    <div className="mt-auto space-y-3">
                        <button 
                            onClick={onClose} 
                            className="w-full py-4 bg-[#0f766e] text-white rounded-lg font-bold hover:bg-[#0d6b63] transition-colors shadow-lg shadow-teal-900/20"
                        >
                            Ver no Pipeline
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
