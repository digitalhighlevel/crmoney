const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros';

export interface FipeItem {
    id: string;
    nome: string;
}

export interface FipeModelResponse {
    modelos: FipeItem[];
    anos: FipeItem[];
}

export const fipeService = {
    getBrands: async (): Promise<FipeItem[]> => {
        try {
            const response = await fetch(`${BASE_URL}/marcas`);
            const data = await response.json();
            return data.map((item: any) => ({ id: item.codigo, nome: item.nome }));
        } catch (error) {
            console.error('Error fetching Fipe brands:', error);
            return [];
        }
    },

    getModels: async (brandId: string): Promise<FipeItem[]> => {
        try {
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos`);
            const data = await response.json();
            return data.modelos.map((item: any) => ({ id: item.codigo, nome: item.nome }));
        } catch (error) {
            console.error('Error fetching Fipe models:', error);
            return [];
        }
    },

    getYears: async (brandId: string, modelId: string): Promise<FipeItem[]> => {
        try {
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos`);
            const data = await response.json();
            return data.map((item: any) => ({ id: item.codigo, nome: item.nome }));
        } catch (error) {
            console.error('Error fetching Fipe years:', error);
            return [];
        }
    },

    getDetails: async (brandId: string, modelId: string, yearId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Fipe details:', error);
            return null;
        }
    }
};
