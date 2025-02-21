import { Sidebar } from "@/components/layouts/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Settings } from "lucide-react";
import { useState } from "react";

export default function NapolitainCalculator() {
  const [totalWeight, setTotalWeight] = useState(1000);
  const [pizzaCount, setPizzaCount] = useState(4);
  const [ballWeight, setBallWeight] = useState(250);
  const [hydration, setHydration] = useState(65);
  const [salt, setSalt] = useState(2.8);

  const handleIncrement = (value: number, setValue: (value: number) => void, max: number, step: number = 1) => {
    setValue(Math.min(value + step, max));
  };

  const handleDecrement = (value: number, setValue: (value: number) => void, min: number, step: number = 1) => {
    setValue(Math.max(value - step, min));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-cream mb-8">
            Calculatrice Pizza Napolitaine
          </h1>

          <Card className="bg-slate border-cream/10">
            <CardHeader>
              <CardTitle className="text-cream flex items-center gap-2">
                <Settings className="h-5 w-5 text-terracotta" /> Paramètres de la pâte
              </CardTitle>
              <p className="text-cream/80 text-sm mt-1">Poids total {totalWeight}g</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-cream/80 block text-center">Nombre de pizzas</label>
                  <div className="flex items-center bg-white/5 rounded-md h-12">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(pizzaCount, setPizzaCount, 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="relative w-full">
                        <Input
                          type="number"
                          value={pizzaCount}
                          onChange={(e) => setPizzaCount(Number(e.target.value))}
                          className="w-full bg-transparent border-0 text-center text-cream text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-0 pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50">unités</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleIncrement(pizzaCount, setPizzaCount, 20)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-cream/80 block text-center">Poids des pâtons</label>
                  <div className="flex items-center bg-white/5 rounded-md h-12">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(ballWeight, setBallWeight, 100, 5)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="relative w-full">
                        <Input
                          type="number"
                          value={ballWeight}
                          onChange={(e) => setBallWeight(Number(e.target.value))}
                          className="w-full bg-transparent border-0 text-center text-cream text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-0 pr-8"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50">g</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleIncrement(ballWeight, setBallWeight, 500, 5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-cream/80 block text-center">Hydratation</label>
                  <div className="flex items-center bg-white/5 rounded-md h-12">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(hydration, setHydration, 50)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="relative w-full">
                        <Input
                          type="number"
                          value={hydration}
                          onChange={(e) => setHydration(Number(e.target.value))}
                          className="w-full bg-transparent border-0 text-center text-cream text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-0 pr-8"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50">%</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleIncrement(hydration, setHydration, 90)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-cream/80 block text-center">Sel</label>
                  <div className="flex items-center bg-white/5 rounded-md h-12">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(salt, setSalt, 1, 0.1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="relative w-full">
                        <Input
                          type="number"
                          value={salt.toFixed(1)}
                          onChange={(e) => setSalt(Number(e.target.value))}
                          className="w-full bg-transparent border-0 text-center text-cream text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-0 pr-8"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50">%</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleIncrement(salt, setSalt, 5, 0.1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
