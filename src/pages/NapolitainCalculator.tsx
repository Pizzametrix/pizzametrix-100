
import { Sidebar } from "@/components/layouts/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function NapolitainCalculator() {
  const [totalWeight, setTotalWeight] = useState(1000);
  const [pizzaCount, setPizzaCount] = useState(4);
  const [ballWeight, setBallWeight] = useState(250);
  const [hydration, setHydration] = useState(65);
  const [salt, setSalt] = useState(2.8);

  const handleIncrement = (value: number, setValue: (value: number) => void, max: number) => {
    setValue(Math.min(value + 1, max));
  };

  const handleDecrement = (value: number, setValue: (value: number) => void, min: number) => {
    setValue(Math.max(value - 1, min));
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
                <span className="text-terracotta">🍕</span> Paramètres de la pâte
              </CardTitle>
              <p className="text-cream/80 text-sm mt-1">Poids total {totalWeight}g</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-cream/80">Nombre de pizzas</label>
                  <div className="flex items-center bg-white/5 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(pizzaCount, setPizzaCount, 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={pizzaCount}
                      onChange={(e) => setPizzaCount(Number(e.target.value))}
                      className="bg-transparent border-0 text-center text-cream [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
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
                  <label className="text-sm text-cream/80">Poids des pâtons</label>
                  <div className="flex items-center bg-white/5 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(ballWeight, setBallWeight, 100)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={`${ballWeight}`}
                      onChange={(e) => setBallWeight(Number(e.target.value))}
                      className="bg-transparent border-0 text-center text-cream [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleIncrement(ballWeight, setBallWeight, 500)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-cream/80">Hydratation</label>
                  <div className="flex items-center bg-white/5 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(hydration, setHydration, 50)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={`${hydration}`}
                      onChange={(e) => setHydration(Number(e.target.value))}
                      className="bg-transparent border-0 text-center text-cream [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
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
                  <label className="text-sm text-cream/80">Sel</label>
                  <div className="flex items-center bg-white/5 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleDecrement(salt, setSalt, 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={`${salt}`}
                      onChange={(e) => setSalt(Number(e.target.value))}
                      className="bg-transparent border-0 text-center text-cream [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-cream hover:text-terracotta hover:bg-cream/5"
                      onClick={() => handleIncrement(salt, setSalt, 5)}
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
