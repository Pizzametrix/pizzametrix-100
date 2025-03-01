import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Settings } from "lucide-react";

interface DoughParametersProps {
  totalWeight: number;
  pizzaCount: number;
  setPizzaCount: (value: number) => void;
  ballWeight: number;
  setBallWeight: (value: number) => void;
  hydration: number;
  setHydration: (value: number) => void;
  salt: number;
  setSalt: (value: number) => void;
  oil: number;
  setOil: (value: number) => void;
  sugar: number;
  setSugar: (value: number) => void;
  isOilEnabled: boolean;
  isSugarEnabled: boolean;
  handleIncrement: (value: number, setValue: (value: number) => void, max: number, step?: number) => void;
  handleDecrement: (value: number, setValue: (value: number) => void, min: number, step?: number) => void;
  maxBallWeight?: number;
}

export function DoughParameters({
  totalWeight,
  pizzaCount,
  setPizzaCount,
  ballWeight,
  setBallWeight,
  hydration,
  setHydration,
  salt,
  setSalt,
  oil,
  setOil,
  sugar,
  setSugar,
  isOilEnabled,
  isSugarEnabled,
  handleIncrement,
  handleDecrement,
  maxBallWeight = 600
}: DoughParametersProps) {
  return (
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
                onClick={() => handleIncrement(ballWeight, setBallWeight, maxBallWeight, 5)}
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
  );
}
