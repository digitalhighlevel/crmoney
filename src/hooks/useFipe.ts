import { useState, useEffect } from 'react';
import { fipeService, FipeItem } from '@/services/fipeService';

export const useFipe = () => {
    const [brands, setBrands] = useState<FipeItem[]>([]);
    const [models, setModels] = useState<FipeItem[]>([]);
    const [years, setYears] = useState<FipeItem[]>([]);

    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');

    const [loading, setLoading] = useState({
        brands: false,
        models: false,
        years: false
    });

    // Load brands on mount
    useEffect(() => {
        const loadBrands = async () => {
            setLoading(prev => ({ ...prev, brands: true }));
            const data = await fipeService.getBrands();
            setBrands(data);
            setLoading(prev => ({ ...prev, brands: false }));
        };
        loadBrands();
    }, []);

    // Load models when brand changes
    useEffect(() => {
        if (!selectedBrand) {
            setModels([]);
            return;
        }
        const loadModels = async () => {
            setLoading(prev => ({ ...prev, models: true }));
            const data = await fipeService.getModels(selectedBrand);
            setModels(data);
            setLoading(prev => ({ ...prev, models: false }));
        };
        loadModels();
    }, [selectedBrand]);

    // Load years when model changes
    useEffect(() => {
        if (!selectedModel || !selectedBrand) {
            setYears([]);
            return;
        }
        const loadYears = async () => {
            setLoading(prev => ({ ...prev, years: true }));
            const data = await fipeService.getYears(selectedBrand, selectedModel);
            setYears(data);
            setLoading(prev => ({ ...prev, years: false }));
        };
        loadYears();
    }, [selectedModel, selectedBrand]);

    return {
        brands,
        models,
        years,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        loading
    };
};
