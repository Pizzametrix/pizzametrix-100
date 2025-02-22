<lov-code>
import { Sidebar } from "@/components/layouts/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Settings, Clock, ChefHat, X } from "lucide-react";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Phase {
  id: number;
  duration: number;
  temperature: number;
}

type YeastType = 'fraiche' | 'seche' | 'saf';
type DoughType = 'direct' | 'biga' | 'poolish';

interface PrefermentDefaults {
  flour: number;
  hydration: number;
  yeast: number;
}

const BIGA_DEFAULTS: PrefermentDefaults = {
  flour: 50,
  hydration: 48,
  yeast: 100
};

const POOLISH_DEFAULTS: PrefermentDefaults = {
  flour: 40,
  hydration: 100,
  yeast: 100
};

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

  // Reset preferment values when changing type
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

  // Calculs des ingrédients avec pré-fermentation
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

  // Calculs pour la pré-fermentation
  const prefermentFlourWeight = doughType !== 'direct' ? Math.round((flourWeight * prefermentFlour) / 100) : 0;
  const prefermentWaterWeight = doughType !== 'direct' ? Math.round((prefermentFlourWeight * prefermentHydration) / 100) : 0;
  const prefermentYeastWeight = doughType !== 'direct' ? Number(((prefermentFlourWeight * prefermentYeast * (isCustomYeastEnabled ? customYeast : yeast)) / 10000).toFixed(2)) : 0;

  // Calculs pour le rafraîchi
  const refreshFlourWeight = flourWeight - prefermentFlourWeight;
  const refreshWaterWeight = waterWeight - prefermentWaterWeight;
  const refreshYeastWeight = Number((yeastWeight - prefermentYeastWeight).toFixed(2));

  // Création d'un tableau d'ingrédients pour le tri avec pré-fermentation
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate relative">
      <Sidebar />
      <main className="flex-1 p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <Card className="bg-slate border-cream/10">
              <CardHeader>
                <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
                  <Settings className="h-5 w-5 text-terracotta" /> Paramètres de la pâte
                </CardTitle>
                <p className="text-[#F5E9D7]/80 text-sm mt-1">Poids total {totalWeight}g</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Nombre de pizzas</label>
                    <div className="flex items-center bg-white/5 rounded-md h-12">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                        onClick={() => handleDecrement(pizzaCount, setPizzaCount, 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          type="text"
                          value={pizzaCount}
                          readOnly
                          className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                        onClick={() => handleIncrement(pizzaCount, setPizzaCount, 300)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Poids des pâtons</label>
                    <div className="flex items-center bg-white/5 rounded-md h-12">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                        onClick={() => handleDecrement(ballWeight, setBallWeight, 100, 5)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 min-w-0">
                        <Input
                          type="text"
                          value={`${ballWeight}g`}
                          readOnly
                          className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                        onClick={() => handleIncrement(ballWeight, setBallWeight, 600, 5)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Hydratation</label>
                    <div className="flex items-center bg-white/5 rounded-md h-12">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                        onClick={() => handleDecrement(hydration, setHydration, 50)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 min-w-0">
                        <Input
                          type="text"
                          value={`${hydration}%`}
                          readOnly
                          className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                        onClick={() => handleIncrement(hydration, setHydration, 100)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Sel</label>
                    <div className="flex items-center bg-white/5 rounded-md h-12">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                        onClick={() => handleDecrement(salt, setSalt, 0, 0.1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 min-w-0">
                        <Input
                          type="text"
                          value={`${salt.toFixed(1)}%`}
                          readOnly
                          className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                        onClick={() => handleIncrement(salt, setSalt, 5, 0.1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {isOilEnabled && (
                    <div className="space-y-2">
                      <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Huile</label>
                      <div className="flex items-center bg-white/5 rounded-md h-12">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handleDecrement(oil, setOil, 0.1, 0.1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 min-w-0">
                          <Input
                            type="text"
                            value={`${oil.toFixed(1)}%`}
                            readOnly
                            className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handleIncrement(oil, setOil, 10, 0.1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {isSugarEnabled && (
                    <div className="space-y-2">
                      <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Sucre/Miel</label>
                      <div className="flex items-center bg-white/5 rounded-md h-12">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handleDecrement(sugar, setSugar, 0.1, 0.1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 min-w-0">
                          <Input
                            type="text"
                            value={`${sugar.toFixed(1)}%`}
                            readOnly
                            className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handleIncrement(sugar, setSugar, 10, 0.1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

      {(doughType === 'biga' || doughType === 'poolish') && (
        <Card className="bg-slate border-cream/10">
          <CardHeader>
            <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-terracotta" /> 
              {doughType === 'biga' ? 'Biga' : 'Poolish'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Farine (%)</label>
                <div className="flex items-center bg-white/5 rounded-md h-12">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleDecrement(prefermentFlour, setPrefermentFlour, 20)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <Input
                      type="text"
                      value={`${prefermentFlour}%`}
                      readOnly
                      className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleIncrement(prefermentFlour, setPrefermentFlour, 100)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Hydratation (%)</label>
                <div className="flex items-center bg-white/5 rounded-md h-12">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleDecrement(prefermentHydration, setPrefermentHydration, 20)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <Input
                      type="text"
                      value={`${prefermentHydration}%`}
                      readOnly
                      className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleIncrement(prefermentHydration, setPrefermentHydration, 100)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Levure (%)</label>
                <div className="flex items-center bg-white/5 rounded-md h-12">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleDecrement(prefermentYeast, setPrefermentYeast, 20)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <Input
                      type="text"
                      value={`${prefermentYeast}%`}
                      readOnly
                      className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleIncrement(prefermentYeast, setPrefermentYeast, 100)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

            <Card className="bg-slate border-cream/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
                    <Clock className="h-5 w-5 text-terracotta" /> Phases de repos
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                      onClick={() => removePhase()}
                      disabled={phases.length <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                      onClick={() => addPhase()}
                      disabled={phases.length >= 4}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-[#F5E9D7]/80 text-sm mt-1">Durée totale {totalDuration}h</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {phases.map((phase, index) => (
                  <div key={phase.id} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Durée (h)</label>
                      <div className="flex items-center bg-white/5 rounded-md h-12">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handlePhaseChange(phase.id, 'duration', phase.duration - 0.5)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          value={`${phase.duration}h`}
                          readOnly
                          className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handlePhaseChange(phase.id, 'duration', phase.duration + 0.5)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Température (°C)</label>
                      <div className="flex items-center bg-white/5 rounded-md h-12">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handlePhaseChange(phase.id, 'temperature', phase.temperature - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          value={`${phase.temperature}°C`}
                          readOnly
                          className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handlePhaseChange(phase.id, 'temperature', phase.temperature + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

      <Card className="bg-slate border-cream/10">
        <CardHeader>
          <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-terracotta" /> Ingrédients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {doughType !== 'direct' && (
              <div className="grid grid-cols-4 gap-4 py-2 border-b border-cream/10">
                <span className="text-[#F5E9D7]/60">Ingrédient</span>
                <span className="text-right text-[#F5E9D7]/60">{doughType === 'biga' ? 'Biga' : 'Poolish'}</span>
                <span className="text-right text-[#F5E9D7]/60">Rafraîchi</span>
                <span className="text-right text-[#F5E9D7]/60">Total</span>
              </div>
            )}
            {ingredients.map((ingredient) => (
              <div key={ingredient.name} className={`grid ${doughType !== 'direct' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 py-2 border-b border-cream/10`}>
                <span className="text-[#F5E9D7]">{ingredient.name}</span>
                {doughType !== 'direct' ? (
                  <>
                    <span className="text-[#F5E9D7] text-right">
                      {ingredient.preferment > 0 ? (
                        ingredient.name === "Levure" ? 
                        ingredient.preferment.toFixed(2) : 
                        ingredient.preferment
                      ) : "-"}g
                    </span>
                    <span className="text-[#F5E9D7] text-right">
                      {ingredient.refresh > 0 ? (
                        ingredient.name === "Levure" ? 
                        ingredient.refresh.toFixed(2) : 
                        ingredient.refresh
                      ) : "-"}g
                    </span>
                  </>
                ) : null}
                <span className="text-[#F5E9D7] text-right">
                  {ingredient.name === "Levure" ? 
                    ingredient.total.toFixed(2) : 
                    ingredient.total}g
                </span>
              </div>
            ))}
            <div className={`grid ${doughType !== 'direct' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 py-2 font-medium`}>
              <span className="text-[#F5E9D7]">Total</span>
              {doughType !== 'direct' && (
                <>
                  <span className="text-[#F5E9D7] text-right">
                    {Math.round(ingredients.reduce((sum, ing) => sum + ing.preferment, 0))}g
                  </span>
                  <span className="text-[#F5E9D7] text-right">
                    {Math.round(ingredients.reduce((sum, ing) => sum + ing.refresh, 0))}g
                  </span>
                </>
              )}
              <span className="text-[#F5E9D7] text-right">{ingredientsTotal}g</span>
            </div>
          </div>
        </CardContent>
      </Card>
          </div>
        </div>
      </main>

      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-terracotta text-cream hover:bg-terracotta/90 shadow-lg z-30"
        onClick={() => setIsSettingsOpen(true)}
      >
        <Settings className="h-6 w-6" />
      </Button>

      {isSettingsOpen && (
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity z-40"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      <div
        id="settings-panel"
        className={`fixed inset-y-0 right-0 w-3/4 sm:w-96 bg-slate border-l border-cream/10 p-6 shadow-xl transform transition-transform duration
