
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PocketKnife, Droplet, Wheat } from "lucide-react";

interface RecipeDetailPrefermentProps {
  recipe: any;
}

export function RecipeDetailPreferment({ recipe }: RecipeDetailPrefermentProps) {
  const parameters = [
    {
      name: "Farine",
      value: `${recipe.preferment_flour}%`,
      icon: <Wheat className="h-4 w-4" />,
    },
    {
      name: "Hydratation",
      value: `${recipe.preferment_hydration}%`,
      icon: <Droplet className="h-4 w-4" />,
    },
    {
      name: "Levure",
      value: `${Math.round(recipe.preferment_yeast * 100)}%`,
      icon: <img src="/lovable-uploads/bbef9e96-a767-4130-af50-1e5e69a54e3d.png" alt="Levure" className="h-4 w-4 text-cream/80 opacity-80" />,
    },
  ];

  return (
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
  );
}
