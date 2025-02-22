import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Minus, Plus } from "lucide-react";
import { Phase } from "../types";

interface RestPhasesProps {
  phases: Phase[];
  totalDuration: number;
  handlePhaseChange: (id: number, field: 'duration' | 'temperature', value: number) => void;
  addPhase: () => void;
  removePhase: () => void;
}

export function RestPhases({
  phases,
  totalDuration,
  handlePhaseChange,
  addPhase,
  removePhase
}: RestPhasesProps) {
  return (
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
  );
}
