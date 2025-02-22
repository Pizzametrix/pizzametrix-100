
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PocketKnife, Droplet, ChefHat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeDetailPrefermentProps {
  recipe: any;
}

export function RecipeDetailPreferment({ recipe }: RecipeDetailPrefermentProps) {
  const parameters = [
    {
      name: "Farine",
      value: `${recipe.preferment_flour}%`,
      icon: <PocketKnife className="h-4 w-4" />,
    },
    {
      name: "Hydratation",
      value: `${recipe.preferment_hydration}%`,
      icon: <Droplet className="h-4 w-4" />,
    },
    {
      name: "Levure",
      value: `${(recipe.preferment_yeast * 100).toFixed(2)}%`,
      icon: <ChefHat className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="bg-slate border-cream/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-cream flex items-center gap-2">
          <PocketKnife className="h-5 w-5 text-terracotta" /> 
          {recipe.dough_type === 'biga' ? 'Biga' : 'Poolish'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-cream/10">
          <Table>
            <TableBody>
              {parameters.map((param, index) => (
                <TableRow key={param.name} className={index === parameters.length - 1 ? "" : "border-cream/10"}>
                  <TableCell className="text-cream/80 flex items-center gap-2">
                    {param.icon}
                    {param.name}
                  </TableCell>
                  <TableCell className="text-right text-cream">{param.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
