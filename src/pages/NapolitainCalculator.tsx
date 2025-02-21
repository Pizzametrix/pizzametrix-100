import { Sidebar } from "@/components/layouts/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Settings, Clock, Trash2 } from "lucide-react";
import { useState } from "react";

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
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, duration: 18, temperature: 5 },
    { id: 2, duration: 6, temperature: 20 },
  ]);

  const handleIncrement = (value: number, setValue: (value: number) => void, max: number, step: number = 1) => {
    setValue(Math.min(value + step, max));
  };

  const handleDecrement = (value: number, setValue: (value: number) => void, min: number, step: number = 1) => {
    setValue(Math.max(value - step, min));
  };

  const handlePhaseChange = (id: number, field: 'duration' | 'temperature', value: number) => {
    const min = field === 'duration' ? 1 : 1;
    const max = field === 'duration' ? 96 : 40;
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

  const removePhase = (id: number) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#F5E9D7] mb-8">
            Calculatrice Pizza Napolitaine
          </h1>

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
                <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
                  <Clock className="h-5 w-5 text-terracotta" /> Phases de repos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {phases.map((phase, index) => (
                  <div key={phase.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <span className="text-[#F5E9D7] font-medium">{index + 1}</span>
                    </div>
                    <div className="col-span-5 space-y-1">
                      <label className="text-sm text-[#F5E9D7]/80 block">Durée (h)</label>
                      <div className="flex items-center bg-white/5 rounded-md h-12">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                          onClick={() => handlePhaseChange(phase.id, 'duration', phase.duration - 1)}
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
                          onClick={() => handlePhaseChange(phase.id, 'duration', phase.duration + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-5 space-y-1">
                      <label className="text-sm text-[#F5E9D7]/80 block">Température (°C)</label>
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
                    <div className="col-span-1">
                      {phases.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                          onClick={() => removePhase(phase.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {phases.length < 4 && (
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 border border-[#F5E9D7]/10"
                    onClick={addPhase}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Ajouter une phase
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
