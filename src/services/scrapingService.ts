import { Vehicle } from '@/types';

interface ScrapingResult {
    success: boolean;
    data?: Vehicle[];
    error?: string;
}

export const scrapingService = {
    /**
     * Motor Turbo Scan V3.4 - Otimização de Janela de Contexto.
     * Capaz de extrair listas longas (50+) removendo ruído de código desnecessário.
     */
    scrapeInventory: async (url: string): Promise<ScrapingResult> => {
        const FIRECRAWL_API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY;

        if (!FIRECRAWL_API_KEY) {
            return { success: false, error: 'Chave Firecrawl não configurada.' };
        }

        console.log('🚀 Iniciando Turbo Scan V3.4 para listas longas...');

        try {
            const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: url,
                    formats: ['json'],
                    onlyMainContent: true, // Mudado para True para limpar o lixo de menus/rodapés e focar na lista
                    timeout: 120000,

                    // PERFORMANCE: Removemos tudo que gasta "espaço" na memória da IA
                    removeBase64Images: true,
                    blockAds: true,
                    waitFor: 5000,

                    actions: [
                        { type: 'scroll', direction: 'down' },
                        { type: 'wait', milliseconds: 2000 },
                        { type: 'scroll', direction: 'down' },
                        { type: 'wait', milliseconds: 2000 },
                        { type: 'scroll', direction: 'down' },
                        { type: 'wait', milliseconds: 2000 },
                        { type: 'scroll', direction: 'down' }
                    ],

                    jsonOptions: {
                        schema: {
                            type: 'object',
                            properties: {
                                vehicles: {
                                    type: 'array',
                                    description: 'Extraia ABSOLUTAMENTE TODOS os carros. Não resuma. Se houver 50, traga 50.',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            brand: { type: 'string' },
                                            model: { type: 'string' },
                                            year: { type: 'string' },
                                            price: { type: 'number' },
                                            km: { type: 'string' },
                                            imageUrl: { type: 'string', description: 'URL da imagem REAL.' }
                                        },
                                        required: ['brand', 'model', 'price', 'imageUrl']
                                    }
                                }
                            }
                        }
                    }
                })
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, error: `Falha: ${result.error || 'Erro na API'}` };
            }

            if (result.success && result.data?.json?.vehicles) {
                const vehicles = result.data.json.vehicles.map((v: any) => ({
                    ...v,
                    id: 'fc-v34-' + Math.random().toString(36).substr(2, 9),
                    dealershipId: 'd1',
                    status: 'available',
                    brand: v.brand?.toUpperCase().trim(),
                    // Melhoria na captura de imagens caso a IA falhe em algumas
                    imageUrl: v.imageUrl && v.imageUrl.length > 20 ? v.imageUrl : 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop'
                }));

                console.log(`✅ Turbo Scan Concluído: ${vehicles.length} carros extraídos.`);
                return { success: true, data: vehicles };
            }

            return { success: false, error: 'A extração falhou. Talvez a página seja grande demais. Tente importar em duas vezes ou usar filtros.' };

        } catch (error: any) {
            return { success: false, error: 'Erro: ' + error.message };
        }
    }
};
