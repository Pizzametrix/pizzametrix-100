import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layouts/Sidebar";
import { BIGA_DEFAULTS, POOLISH_DEFAULTS } from "./napolitain/constants";
import { Phase, DoughType, YeastType, Json, RecipeType } from "./napolitain/types";
import { DoughParameters } from "./napolitain/components/DoughParameters";
import { PrefermentSection } from "./napolitain/components/PrefermentSection";
import { RestPhases } from "./napolitain/components/RestPhases";
import { IngredientsTable } from "./napolitain/components/IngredientsTable";
import { SettingsPanel } from "./napolitain/components/SettingsPanel";
import { supabase } from "@/integrations/supabase/client";
import { SaveRecipeDialog } from "./napolitain/components/SaveRecipeDialog";
import { useToast } from "@/components/ui/use-toast";

export default function NapolitainCalculator() {
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
    const handleClickOutside = (event: MouseEvent) => {
      const panel = document.getElementById('settings-panel');
      if (isSettingsOpen && panel && !panel.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSettingsOpen]);

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

  const totalDuration = phases.reduce((total, phase) => total + phase.duration, 0);

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
    { 
      name: "Farine",
      preferment: prefermentFlourWeight,
      refresh: refreshFlourWeight,
      total: flourWeight 
    },
    { 
      name: "Eau",
      preferment: prefermentWaterWeight,
      refresh: refreshWaterWeight,
      total: waterWeight
    },
    { 
      name: "Sel",
      preferment: 0,
      refresh: saltWeight,
      total: saltWeight
    },
    { 
      name: "Levure",
      preferment: prefermentYeastWeight,
      refresh: refreshYeastWeight,
      total: yeastWeight
    },
    ...(isOilEnabled ? [{ 
      name: "Huile",
      preferment: 0,
      refresh: oilWeight,
      total: oilWeight
    }] : []),
    ...(isSugarEnabled ? [{ 
      name: "Sucre",
      preferment: 0,
      refresh: sugarWeight,
      total: sugarWeight
    }] : [])
  ].sort((a, b) => b.total - a.total);

  const ingredientsTotal = Math.round(ingredients.reduce((sum, ing) => sum + ing.total, 0));

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

      console.log("Type de pâte:", doughType);
      console.log("Farine préferment:", prefermentFlour);
      console.log("Hydratation préferment:", prefermentHydration);
      console.log("Levure préferment:", prefermentYeast);

      const prefermentFlourValue = doughType !== 'direct' ? Math.round(Number(prefermentFlour)) : null;
      const prefermentHydrationValue = doughType !== 'direct' ? Math.round(Number(prefermentHydration)) : null;
      const prefermentYeastValue = doughType !== 'direct' ? Number(Number(prefermentYeast).toFixed(2)) : null;

      const recipeData = {
        user_id: user.id,
        nom: recipeName.trim(),
        type: 'napolitaine' as RecipeType,
        pizza_count: Math.round(Number(pizzaCount)),
        ball_weight: Math.round(Number(ballWeight)),
        hydration: Math.round(Number(hydration)),
        salt: Number(Number(salt).toFixed(2)),
        yeast: Number((isCustomYeastEnabled ? customYeast : yeast).toFixed(2)),
        oil: isOilEnabled ? Number(Number(oil).toFixed(2)) : null,
        sugar: isSugarEnabled ? Number(Number(sugar).toFixed(2)) : null,
        dough_type: doughType,
        phases: phasesJson,
        is_custom_yeast_enabled: isCustomYeastEnabled,
        custom_yeast: isCustomYeastEnabled ? Number(Number(customYeast).toFixed(2)) : null,
        is_oil_enabled: isOilEnabled,
        is_sugar_enabled: isSugarEnabled,
        yeast_type: yeastType,
        preferment_flour: prefermentFlourValue,
        preferment_hydration: prefermentHydrationValue,
        preferment_yeast: prefermentYeastValue
      };

      console.log("Données de la recette à sauvegarder:", recipeData);

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate relative">
      <Sidebar />
      <main className="flex-1 p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <DoughParameters
              totalWeight={totalWeight}
              pizzaCount={pizzaCount}
              setPizzaCount={setPizzaCount}
              ballWeight={ballWeight}
              setBallWeight={setBallWeight}
              hydration={hydration}
              setHydration={setHydration}
              salt={salt}
              setSalt={setSalt}
              oil={oil}
              setOil={setOil}
              sugar={sugar}
              setSugar={setSugar}
              isOilEnabled={isOilEnabled}
              isSugarEnabled={isSugarEnabled}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />

            <PrefermentSection
              doughType={doughType}
              prefermentFlour={prefermentFlour}
              setPrefermentFlour={setPrefermentFlour}
              prefermentHydration={prefermentHydration}
              setPrefermentHydration={setPrefermentHydration}
              prefermentYeast={prefermentYeast}
              setPrefermentYeast={setPrefermentYeast}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />

            <RestPhases
              phases={phases}
              totalDuration={totalDuration}
              handlePhaseChange={handlePhaseChange}
              addPhase={addPhase}
              removePhase={removePhase}
            />

            <IngredientsTable
              doughType={doughType}
              ingredients={ingredients}
              ingredientsTotal={ingredientsTotal}
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-14 w-14 rounded-full bg-terracotta text-cream hover:bg-terracotta/90 shadow-lg"
          onClick={() => setIsSaveDialogOpen(true)}
        >
          <Save className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-14 w-14 rounded-full bg-terracotta text-cream hover:bg-terracotta/90 shadow-lg"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        yeastType={yeastType}
        setYeastType={setYeastType}
        doughType={doughType}
        setDoughType={setDoughType}
        isOilEnabled={isOilEnabled}
        setIsOilEnabled={setIsOilEnabled}
        isSugarEnabled={isSugarEnabled}
        setIsSugarEnabled={setIsSugarEnabled}
        isCustomYeastEnabled={isCustomYeastEnabled}
        setIsCustomYeastEnabled={setIsCustomYeastEnabled}
        customYeast={customYeast}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        setCustomYeast={setCustomYeast}
      />

      <SaveRecipeDialog
        open={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
        onSave={handleSaveRecipe}
      />
    </div>
  );
}
