
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Clock, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeDetailPhasesProps {
  phases: any[];
}

export function RecipeDetailPhases({ phases }: RecipeDetailPhasesProps) {
  const totalDuration = phases.reduce((acc, phase) => acc + phase.duration, 0);

  return (
    <Card className="bg-slate border-cream/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-cream flex items-center gap-2">
          <Clock className="h-5 w-5 text-terracotta" /> Phases de repos
        </CardTitle>
        <p className="text-cream/60 text-sm">Durée totale : {totalDuration}h</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-cream/10">
          <Table>
            <TableBody>
              {phases.map((phase, index) => (
                <TableRow key={phase.id} className={index === phases.length - 1 ? "" : "border-cream/10"}>
                  <TableCell className="text-cream/80">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center text-cream text-sm">
                        {index + 1}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-cream">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cream/60" />
                      {phase.duration}h
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-cream">
                    <div className="flex items-center justify-end gap-2">
                      <Thermometer className="h-4 w-4 text-cream/60" />
                      {phase.temperature}°C
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
