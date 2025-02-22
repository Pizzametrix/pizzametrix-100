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

export default function NapolitainCalculator() {
  const [totalWeight, setTotalWeight] = useState(1000);
  const [pizzaCount, setPizzaCount] = useState(1);
  const [ballWeight, setBallWeight] = useState(260);
  const [hydration, setHydration] = useState(65);
  const [salt, setSalt] = useState(2.5);
  const [yeast, setYeast] = useState(0.05);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, duration: 18, temperature: 5 },
    { id: 2, duration: 6, temperature: 20 },
  ]);

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

  const flourWeight = Math.round(totalWeight / (1 + (hydration + salt + yeast) / 100));
  const waterWeight = Math.round((flourWeight * hydration) / 100);
  const saltWeight = Number(((flourWeight * salt) / 100).toFixed(1));
  const yeastWeight = Number(((flourWeight * yeast) / 100).toFixed(2));
  const ingredientsTotal = Math.round(flourWeight + waterWeight + saltWeight + yeastWeight);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate relative">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
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
                </div>
              </CardContent>
            </Card>

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
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-cream/10">
                    <span className="text-[#F5E9D7]">Farine</span>
                    <span className="text-[#F5E9D7] text-right">{flourWeight}g</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-cream/10">
                    <span className="text-[#F5E9D7]">Eau</span>
                    <span className="text-[#F5E9D7] text-right">{waterWeight}g</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-cream/10">
                    <span className="text-[#F5E9D7]">Sel</span>
                    <span className="text-[#F5E9D7] text-right">{saltWeight}g</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-cream/10">
                    <span className="text-[#F5E9D7]">Levure</span>
                    <span className="text-[#F5E9D7] text-right">{yeastWeight.toFixed(2)}g</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 font-medium">
                    <span className="text-[#F5E9D7]">Total</span>
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
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-terracotta text-cream hover:bg-terracotta/90 shadow-lg"
        onClick={() => setIsSettingsOpen(true)}
      >
        <Settings className="h-6 w-6" />
      </Button>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/20 transition-opacity" />
      )}

      <div
        id="settings-panel"
        className={`fixed inset-y-0 right-0 w-3/4 sm:w-96 bg-slate border-l border-cream/10 p-6 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-cream">Réglages</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(false)}
            className="text-cream hover:text-terracotta hover:bg-cream/5 z-50"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-cream font-medium text-base">Type de levure</Label>
            <RadioGroup defaultValue="fraiche" className="flex flex-wrap gap-2">
              <div className="inline-flex">
                <RadioGroupItem
                  value="fraiche"
                  id="fraiche"
                  className="peer hidden"
                />
                <Label
                  htmlFor="fraiche"
                  className="inline-flex cursor-pointer whitespace-nowrap rounded-lg border border-cream/10 bg-white/5 px-4 py-2 text-cream hover:bg-cream/5 peer-data-[state=checked]:bg-terracotta peer-data-[state=checked]:text-cream transition-colors text-sm"
                >
                  Fraîche
                </Label>
              </div>
              <div className="inline-flex">
                <RadioGroupItem
                  value="seche"
                  id="seche"
                  className="peer hidden"
                />
                <Label
                  htmlFor="seche"
                  className="inline-flex cursor-pointer whitespace-nowrap rounded-lg border border-cream/10 bg-white/5 px-4 py-2 text-cream hover:bg-cream/5 peer-data-[state=checked]:bg-terracotta peer-data-[state=checked]:text-cream transition-colors text-sm"
                >
                  Sèche active
                </Label>
              </div>
              <div className="inline-flex">
                <RadioGroupItem
                  value="saf"
                  id="saf"
                  className="peer hidden"
                />
                <Label
                  htmlFor="saf"
                  className="inline-flex cursor-pointer whitespace-nowrap rounded-lg border border-cream/10 bg-white/5 px-4 py-2 text-cream hover:bg-cream/5 peer-data-[state=checked]:bg-terracotta peer-data-[state=checked]:text-cream transition-colors text-sm"
                >
                  Instantanée (SAF)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-cream font-medium text-base">Type d'empâtement</Label>
            <RadioGroup defaultValue="direct" className="flex flex-wrap gap-2">
              <div className="inline-flex">
                <RadioGroupItem
                  value="direct"
                  id="direct"
                  className="peer hidden"
                />
                <Label
                  htmlFor="direct"
                  className="inline-flex cursor-pointer whitespace-nowrap rounded-lg border border-cream/10 bg-white/5 px-4 py-2 text-cream hover:bg-cream/5 peer-data-[state=checked]:bg-terracotta peer-data-[state=checked]:text-cream transition-colors text-sm"
                >
                  Direct
                </Label>
              </div>
              <div className="inline-flex">
                <RadioGroupItem
                  value="biga"
                  id="biga"
                  className="peer hidden"
                />
                <Label
                  htmlFor="biga"
                  className="inline-flex cursor-pointer whitespace-nowrap rounded-lg border border-cream/10 bg-white/5 px-4 py-2 text-cream hover:bg-cream/5 peer-data-[state=checked]:bg-terracotta peer-data-[state=checked]:text-cream transition-colors text-sm"
                >
                  Biga
                </Label>
              </div>
              <div className="inline-flex">
                <RadioGroupItem
                  value="poolish"
                  id="poolish"
                  className="peer hidden"
                />
                <Label
                  htmlFor="poolish"
                  className="inline-flex cursor-pointer whitespace-nowrap rounded-lg border border-cream/10 bg-white/5 px-4 py-2 text-cream hover:bg-cream/5 peer-data-[state=checked]:bg-terracotta peer-data-[state=checked]:text-cream transition-colors text-sm"
                >
                  Poolish
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-1">
              <Label className="text-cream text-base">Huile</Label>
              <Switch className="h-7 w-12 data-[state=checked]:bg-terracotta" />
            </div>
            <div className="flex items-center justify-between p-1">
              <Label className="text-cream text-base">Sucre/Miel</Label>
              <Switch className="h-7 w-12 data-[state=checked]:bg-terracotta" />
            </div>
            <div className="flex items-center justify-between p-1">
              <Label className="text-cream text-base">% de levure</Label>
              <Switch className="h-7 w-12 data-[state=checked]:bg-terracotta" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
