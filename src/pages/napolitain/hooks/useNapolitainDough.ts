
import { useState, useEffect } from "react";
import { Phase, DoughType, YeastType } from "../types";
import { BIGA_DEFAULTS, POOLISH_DEFAULTS } from "../constants";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useNapolitainDough = () => {
  const [totalWeight, setTotalWeight] = useState(1000);
  const [pizzaCount, setPizzaCount] = useState(1);
  const [ballWeight, setBallWeight] = useState(260);
  const [hydration, setHydration] = useState(65);
  const [salt, setSalt] = useState(2.5);
  const [yeast, setYeast] = useState(0.05);
  const [customYeast, setCustomYeast] = useState(0.20);
  const [isCustomYeastEnabled, setIsCustomYeastEnabled] = useState(false);
  const [oil, setOil] = useState(2.5);
  const [sugar, setSugar] = useState(1.0);
  const [isOilEnabled, setIsOilEnabled] = useState(false);
  const [isSugarEnabled, setIsSugarEnabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, duration: 18, temperature: 5 },
    { id: 2, duration: 6, temperature: 20 },
  ]);
  const [yeastType, setYeastType] = useState<YeastType>('fraiche');
  const [doughType, setDoughType] = useState<DoughType>('direct');
  const [prefermentFlour, setPrefermentFlour] = useState(BIGA_DEFAULTS.flour);
  const [prefermentHydration, setPrefermentHydration] = useState(BIGA_DEFAULTS.hydration);
  const [prefermentYeast, setPrefermentYeast] = useState(BIGA_DEFAULTS.yeast);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setTotalWeight(pizzaCount * ballWeight);
  }, [pizzaCount, ballWeight]);

  useEffect(() => {
    if (doughType === 'biga') {
      setPrefermentFlour(BIGA_DEFAULTS.flour);
      setPrefermentHydration(BIGA_DEFAULTS.hydration);
      setPrefermentYeast(BIGA_DEFAULTS.yeast);
    } else if (doughType === 'poolish') {
      setPrefermentFlour(POOLISH_DEFAULTS.flour);
      setPrefermentHydration(POOLISH_DEFAULTS.hydration);
      setPrefermentYeast(POOLISH_DEFAULTS.yeast);
    }
  }, [doughType]);

  const handleIncrement = (value: number, setValue: (value: number) => void, max: number, step: number = 1) => {
    setValue(Math.min(value + step, max));
  };

  const handleDecrement = (value: number, setValue: (value: number) => void, min: number, step: number = 1) => {
    setValue(Math.max(value - step, min));
  };

  const handlePhaseChange = (id: number, field: 'duration' | 'temperature', value: number) => {
    const min = field === 'duration' ? 1 : 1;
    const max = field === 'duration' ? 96 : 40;
    const step = field === 'duration' ? 0.5 : 1;
    const clampedValue = Math.min(Math.max(value, min), max);
    
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, [field]: clampedValue } : phase
    ));
  };

  const addPhase = () => {
    if (phases.length < 4) {
      const newPhase = {
        id: Math.max(0, ...phases.map(p => p.id)) + 1,
        duration: 12,
        temperature: 5
      };
      setPhases([...phases, newPhase]);
    }
  };

  const removePhase = () => {
    if (phases.length > 1) {
      setPhases(phases.slice(0, -1));
    }
  };

  const calculateIngredients = () => {
    const calculateYeastWeight = (baseWeight: number, type: YeastType): number => {
      switch (type) {
        case 'seche':
          return Number((baseWeight * 0.5).toFixed(2));
        case 'saf':
          return Number((baseWeight * 0.34).toFixed(2));
        default:
          return baseWeight;
      }
    };

    const totalPercentage = 100 + hydration + salt + 
      (isCustomYeastEnabled ? customYeast : yeast) + 
      (isOilEnabled ? oil : 0) + 
      (isSugarEnabled ? sugar : 0);
    
    const flourWeight = Math.round(totalWeight / (1 + (totalPercentage - 100) / 100));
    const waterWeight = Math.round((flourWeight * hydration) / 100);
    const saltWeight = Number(((flourWeight * salt) / 100).toFixed(1));
    const baseYeastWeight = Number(((flourWeight * (isCustomYeastEnabled ? customYeast : yeast)) / 100).toFixed(2));
    const yeastWeight = calculateYeastWeight(baseYeastWeight, yeastType);
    const oilWeight = isOilEnabled ? Number(((flourWeight * oil) / 100).toFixed(1)) : 0;
    const sugarWeight = isSugarEnabled ? Number(((flourWeight * sugar) / 100).toFixed(1)) : 0;

    const prefermentFlourWeight = doughType !== 'direct' ? Math.round((flourWeight * prefermentFlour) / 100) : 0;
    const prefermentWaterWeight = doughType !== 'direct' ? Math.round((prefermentFlourWeight * prefermentHydration) / 100) : 0;
    const prefermentYeastWeight = doughType !== 'direct' ? Number(((yeastWeight * prefermentYeast) / 100).toFixed(2)) : 0;

    const refreshFlourWeight = flourWeight - prefermentFlourWeight;
    const refreshWaterWeight = waterWeight - prefermentWaterWeight;
    const refreshYeastWeight = Number((yeastWeight - prefermentYeastWeight).toFixed(2));

    const ingredients = [
      { name: "Farine", preferment: prefermentFlourWeight, refresh: refreshFlourWeight, total: flourWeight },
      { name: "Eau", preferment: prefermentWaterWeight, refresh: refreshWaterWeight, total: waterWeight },
      { name: "Sel", preferment: 0, refresh: saltWeight, total: saltWeight },
      { name: "Levure", preferment: prefermentYeastWeight, refresh: refreshYeastWeight, total: yeastWeight },
      ...(isOilEnabled ? [{ name: "Huile", preferment: 0, refresh: oilWeight, total: oilWeight }] : []),
      ...(isSugarEnabled ? [{ name: "Sucre", preferment: 0, refresh: sugarWeight, total: sugarWeight }] : [])
    ].sort((a, b) => b.total - a.total);

    const ingredientsTotal = Math.round(ingredients.reduce((sum, ing) => sum + ing.total, 0));

    return { ingredients, ingredientsTotal };
  };

  const handleSaveRecipe = async (recipeName: string) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour sauvegarder une recette",
          variant: "destructive",
        });
        return;
      }

      const phasesJson = phases.map(phase => ({
        id: phase.id,
        duration: phase.duration,
        temperature: phase.temperature
      }));

      const formatYeastType = (type: YeastType): string => {
        switch (type) {
          case 'fraiche':
            return 'Fraîche';
          case 'seche':
            return 'Sèche';
          case 'saf':
            return 'SAF';
          default:
            return type;
        }
      };

      const prefermentFlourValue = doughType !== 'direct' ? Math.round(Number(prefermentFlour)) : null;
      const prefermentHydrationValue = doughType !== 'direct' ? Math.round(Number(prefermentHydration)) : null;
      const prefermentYeastValue = doughType !== 'direct' ? Number((Number(prefermentYeast) / 100).toFixed(2)) : null;

      const recipeData = {
        user_id: user.id,
        nom: recipeName.trim(),
        type: 'napolitaine' as const,
        pizza_count: Math.round(Number(pizzaCount)),
        ball_weight: Math.round(Number(ballWeight)),
        hydration: Math.round(Number(hydration)),
        salt: Number((Number(salt) / 100).toFixed(2)),
        yeast: Number((Number(isCustomYeastEnabled ? customYeast : yeast) / 100).toFixed(2)),
        oil: isOilEnabled ? Number((Number(oil) / 100).toFixed(2)) : null,
        sugar: isSugarEnabled ? Number((Number(sugar) / 100).toFixed(2)) : null,
        dough_type: doughType,
        phases: phasesJson,
        is_custom_yeast_enabled: isCustomYeastEnabled,
        custom_yeast: isCustomYeastEnabled ? Number(customYeast.toFixed(2)) : null,
        is_oil_enabled: isOilEnabled,
        is_sugar_enabled: isSugarEnabled,
        yeast_type: formatYeastType(yeastType),
        preferment_flour: prefermentFlourValue,
        preferment_hydration: prefermentHydrationValue,
        preferment_yeast: prefermentYeastValue
      };

      const { error: insertError } = await supabase
        .from('recettes')
        .insert([recipeData]);

      if (insertError) {
        console.error("Erreur détaillée:", insertError);
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder la recette",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "La recette a été sauvegardée",
      });
      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return {
    totalWeight,
    pizzaCount,
    setPizzaCount,
    ballWeight,
    setBallWeight,
    hydration,
    setHydration,
    salt,
    setSalt,
    yeast,
    setYeast,
    customYeast,
    setCustomYeast,
    isCustomYeastEnabled,
    setIsCustomYeastEnabled,
    oil,
    setOil,
    sugar,
    setSugar,
    isOilEnabled,
    setIsOilEnabled,
    isSugarEnabled,
    setIsSugarEnabled,
    isSettingsOpen,
    setIsSettingsOpen,
    phases,
    yeastType,
    setYeastType,
    doughType,
    setDoughType,
    prefermentFlour,
    setPrefermentFlour,
    prefermentHydration,
    setPrefermentHydration,
    prefermentYeast,
    setPrefermentYeast,
    isSaveDialogOpen,
    setIsSaveDialogOpen,
    handleIncrement,
    handleDecrement,
    handlePhaseChange,
    addPhase,
    removePhase,
    calculateIngredients,
    handleSaveRecipe,
  };
};
