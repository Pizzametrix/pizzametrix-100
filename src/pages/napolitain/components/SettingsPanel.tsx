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
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#F5E9D7]">Type de levure</h3>
            <p className="text-sm text-[#F5E9D7]/60">Choisissez le type de levure que vous utilisez.</p>
            <RadioGroup defaultValue={yeastType} className="pt-2" onValueChange={(value) => setYeastType(value as YeastType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fraiche" id="yeast-fraiche" className="peer h-5 w-5 rounded-full border-2 border-cream/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terracotta data-[state=checked]:text-terracotta" />
                <Label htmlFor="yeast-fraiche" className="text-[#F5E9D7]/80">Fraîche</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seche" id="yeast-seche" className="peer h-5 w-5 rounded-full border-2 border-cream/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terracotta data-[state=checked]:text-terracotta" />
                <Label htmlFor="yeast-seche" className="text-[#F5E9D7]/80">Sèche</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saf" id="yeast-saf" className="peer h-5 w-5 rounded-full border-2 border-cream/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terracotta data-[state=checked]:text-terracotta" />
                <Label htmlFor="yeast-saf" className="text-[#F5E9D7]/80">SAF Instant</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#F5E9D7]">Type de pâte</h3>
            <p className="text-sm text-[#F5E9D7]/60">Choisissez le type de pâte que vous souhaitez réaliser.</p>
            <RadioGroup defaultValue={doughType} className="pt-2" onValueChange={(value) => setDoughType(value as DoughType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="dough-direct" className="peer h-5 w-5 rounded-full border-2 border-cream/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terracotta data-[state=checked]:text-terracotta" />
                <Label htmlFor="dough-direct" className="text-[#F5E9D7]/80">Direct</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biga" id="dough-biga" className="peer h-5 w-5 rounded-full border-2 border-cream/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terracotta data-[state=checked]:text-terracotta" />
                <Label htmlFor="dough-biga" className="text-[#F5E9D7]/80">Biga</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poolish" id="dough-poolish" className="peer h-5 w-5 rounded-full border-2 border-cream/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terracotta data-[state=checked]:text-terracotta" />
                <Label htmlFor="dough-poolish" className="text-[#F5E9D7]/80">Poolish</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium text-[#F5E9D7]">Ajouter de l'huile</h3>
              <p className="text-sm text-[#F5E9D7]/60">Activer pour inclure l'huile dans la recette.</p>
            </div>
            <Switch id="oil" checked={isOilEnabled} onCheckedChange={setIsOilEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium text-[#F5E9D7]">Ajouter du sucre/miel</h3>
              <p className="text-sm text-[#F5E9D7]/60">Activer pour inclure le sucre ou le miel dans la recette.</p>
            </div>
            <Switch id="sugar" checked={isSugarEnabled} onCheckedChange={setIsSugarEnabled} />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-lg font-medium text-[#F5E9D7]">Levure personnalisée</h3>
                <p className="text-sm text-[#F5E9D7]/60">Activer pour spécifier un pourcentage de levure personnalisé.</p>
              </div>
              <Switch id="custom-yeast" checked={isCustomYeastEnabled} onCheckedChange={setIsCustomYeastEnabled} />
            </div>
            {isCustomYeastEnabled && (
              <div className="mt-4 space-y-2">
                <label className="text-base text-[#F5E9D7]/80 block text-center font-medium">Pourcentage de levure personnalisé</label>
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
