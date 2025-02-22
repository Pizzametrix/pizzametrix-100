
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PocketKnife, Minus, Plus } from "lucide-react";
import { DoughType } from "../types";

interface PrefermentSectionProps {
  doughType: DoughType;
  prefermentFlour: number;
  setPrefermentFlour: (value: number) => void;
  prefermentHydration: number;
  setPrefermentHydration: (value: number) => void;
  prefermentYeast: number;
  setPrefermentYeast: (value: number) => void;
  handleIncrement: (value: number, setValue: (value: number) => void, max: number, step?: number) => void;
  handleDecrement: (value: number, setValue: (value: number) => void, min: number, step?: number) => void;
}

export function PrefermentSection({
  doughType,
  prefermentFlour,
  setPrefermentFlour,
  prefermentHydration,
  setPrefermentHydration,
  prefermentYeast,
  setPrefermentYeast,
  handleIncrement,
  handleDecrement
}: PrefermentSectionProps) {
  if (doughType !== 'biga' && doughType !== 'poolish') return null;

  return (
    <Card className="bg-slate border-cream/10">
      <CardHeader>
        <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
          <PocketKnife className="h-5 w-5 text-terracotta" /> 
          {doughType === 'biga' ? 'Biga' : 'Poolish'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Farine</label>
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
            <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Hydratation</label>
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
            <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Levure</label>
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
  );
}
