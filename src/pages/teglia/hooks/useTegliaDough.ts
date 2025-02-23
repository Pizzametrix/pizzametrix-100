
import { useState, useEffect } from "react";
import { Phase, DoughType, YeastType } from "../../napolitain/types";
import { BIGA_DEFAULTS, POOLISH_DEFAULTS } from "../../napolitain/constants";
import { useToast } from "@/components/ui/use-toast";
import { calculateIngredients } from "../utils/calculateIngredients";
import { saveRecipe } from "../utils/saveRecipe";

export const useTegliaDough = () => {
  const [totalWeight, setTotalWeight] = useState(1000);
  const [pizzaCount, setPizzaCount] = useState(1);
  const [ballWeight, setBallWeight] = useState(1000);
  const [hydration, setHydration] = useState(75);
  const [salt, setSalt] = useState(2.5);
  const [yeast, setYeast] = useState(0.05);
  const [customYeast, setCustomYeast] = useState(0.20);
  const [isCustomYeastEnabled, setIsCustomYeastEnabled] = useState(false);
  const [oil, setOil] = useState(3.0);
  const [sugar, setSugar] = useState(1.0);
  const [isOilEnabled, setIsOilEnabled] = useState(true);
  const [isSugarEnabled, setIsSugarEnabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, duration: 24, temperature: 4 },
    { id: 2, duration: 2, temperature: 20 },
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

  const handleSaveRecipe = async (recipeName: string) => {
    try {
      await saveRecipe({
        recipeName,
        pizzaCount,
        ballWeight,
        hydration,
        salt,
        isCustomYeastEnabled,
        customYeast,
        yeast,
        isOilEnabled,
        oil,
        isSugarEnabled,
        sugar,
        doughType,
        phases,
        yeastType,
        prefermentFlour,
        prefermentHydration,
        prefermentYeast,
      });

      toast({
        title: "Succès",
        description: "La recette a été sauvegardée",
      });
      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
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
    calculateIngredients: () => calculateIngredients({
      totalWeight,
      hydration,
      salt,
      isCustomYeastEnabled,
      customYeast,
      yeast,
      isOilEnabled,
      oil,
      isSugarEnabled,
      sugar,
      yeastType,
      doughType,
      prefermentFlour,
      prefermentHydration,
      prefermentYeast
    }),
    handleSaveRecipe,
  };
};
