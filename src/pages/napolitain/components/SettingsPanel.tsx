import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import { DoughType, YeastType } from "../types";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  yeastType: YeastType;
  setYeastType: (value: YeastType) => void;
  doughType: DoughType;
  setDoughType: (value: DoughType) => void;
  isOilEnabled: boolean;
  setIsOilEnabled: (value: boolean) => void;
  isSugarEnabled: boolean;
  setIsSugarEnabled: (value: boolean) => void;
  isCustomYeastEnabled: boolean;
  setIsCustomYeastEnabled: (value: boolean) => void;
  customYeast: number;
  handleIncrement: (value: number, setValue: (value: number) => void, max: number, step?: number) => void;
  handleDecrement: (value: number, setValue: (value: number) => void, min: number, step?: number) => void;
  setCustomYeast: (value: number) => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  yeastType,
  setYeastType,
  doughType,
  setDoughType,
  isOilEnabled,
  setIsOilEnabled,
  isSugarEnabled,
  setIsSugarEnabled,
  isCustomYeastEnabled,
  setIsCustomYeastEnabled,
  customYeast,
  handleIncrement,
  handleDecrement,
  setCustomYeast
}: SettingsPanelProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity z-40"
          onClick={onClose}
        />
      )}
      <div
        id="settings-panel"
        className={`fixed inset-y-0 right-0 w-3/4 sm:w-96 bg-slate border-l border-cream/10 p-6 shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#F5E9D7]">Réglages</h2>
          <Button variant="ghost" size="icon" className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#F5E9D7] mb-2">Type de levure</h3>
            <RadioGroup defaultValue={yeastType} onValueChange={(value) => setYeastType(value as YeastType)} className="flex flex-wrap gap-2">
              <div className="relative">
                <RadioGroupItem value="fraiche" id="yeast-fraiche" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                <Label htmlFor="yeast-fraiche" className="flex px-4 py-2 rounded-md bg-white/5 border border-cream/10 text-[#F5E9D7]/80 peer-data-[state=checked]:bg-terracotta/20 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-[#F5E9D7] transition-colors">
                  Fraîche
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="seche" id="yeast-seche" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                <Label htmlFor="yeast-seche" className="flex px-4 py-2 rounded-md bg-white/5 border border-cream/10 text-[#F5E9D7]/80 peer-data-[state=checked]:bg-terracotta/20 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-[#F5E9D7] transition-colors">
                  Sèche active
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="saf" id="yeast-saf" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                <Label htmlFor="yeast-saf" className="flex px-4 py-2 rounded-md bg-white/5 border border-cream/10 text-[#F5E9D7]/80 peer-data-[state=checked]:bg-terracotta/20 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-[#F5E9D7] transition-colors">
                  Instantanée (SAF)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#F5E9D7] mb-2">Type d'empatement</h3>
            <RadioGroup defaultValue={doughType} onValueChange={(value) => setDoughType(value as DoughType)} className="flex flex-wrap gap-2">
              <div className="relative">
                <RadioGroupItem value="direct" id="dough-direct" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                <Label htmlFor="dough-direct" className="flex px-4 py-2 rounded-md bg-white/5 border border-cream/10 text-[#F5E9D7]/80 peer-data-[state=checked]:bg-terracotta/20 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-[#F5E9D7] transition-colors">
                  Direct
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="biga" id="dough-biga" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                <Label htmlFor="dough-biga" className="flex px-4 py-2 rounded-md bg-white/5 border border-cream/10 text-[#F5E9D7]/80 peer-data-[state=checked]:bg-terracotta/20 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-[#F5E9D7] transition-colors">
                  Biga
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="poolish" id="dough-poolish" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                <Label htmlFor="dough-poolish" className="flex px-4 py-2 rounded-md bg-white/5 border border-cream/10 text-[#F5E9D7]/80 peer-data-[state=checked]:bg-terracotta/20 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-[#F5E9D7] transition-colors">
                  Poolish
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#F5E9D7]">Huile</h3>
            <Switch id="oil" checked={isOilEnabled} onCheckedChange={setIsOilEnabled} className="w-14 h-7" />
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#F5E9D7]">Sucre/miel</h3>
            <Switch id="sugar" checked={isSugarEnabled} onCheckedChange={setIsSugarEnabled} className="w-14 h-7" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#F5E9D7]">% de levure</h3>
              <Switch id="custom-yeast" checked={isCustomYeastEnabled} onCheckedChange={setIsCustomYeastEnabled} className="w-14 h-7" />
            </div>
            {isCustomYeastEnabled && (
              <div className="mt-4">
                <div className="flex items-center bg-white/5 rounded-md h-12">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleDecrement(customYeast, setCustomYeast, 0, 0.01)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <Input
                      type="text"
                      value={`${customYeast.toFixed(2)}%`}
                      readOnly
                      className="w-full bg-transparent border-0 text-center text-white text-lg h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
                    onClick={() => handleIncrement(customYeast, setCustomYeast, 10, 0.01)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
