
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChefHat, Droplet, Scale, Cookie, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeDetailParametersProps {
  recipe: any;
}

export function RecipeDetailParameters({ recipe }: RecipeDetailParametersProps) {
  const parameters = [
    {
      name: "Nombre de pizzas",
      value: recipe.pizza_count,
      icon: <ChefHat className="h-4 w-4" />,
    },
    {
      name: "Poids des pâtons",
      value: `${recipe.ball_weight}g`,
      icon: <Scale className="h-4 w-4" />,
    },
    {
      name: "Sel",
      value: `${(recipe.salt * 100).toFixed(1)}%`,
      icon: <Droplet className="h-4 w-4" />,
    },
  ];

  if (recipe.is_oil_enabled && recipe.oil) {
    parameters.push({
      name: "Huile",
      value: `${(recipe.oil * 100).toFixed(1)}%`,
      icon: <FlaskConical className="h-4 w-4" />,
    });
  }

  if (recipe.is_sugar_enabled && recipe.sugar) {
    parameters.push({
      name: "Sucre/Miel",
      value: `${(recipe.sugar * 100).toFixed(1)}%`,
      icon: <Cookie className="h-4 w-4" />,
    });
  }

  parameters.push({
    name: "Type de levure",
    value: recipe.yeast_type.charAt(0).toUpperCase() + recipe.yeast_type.slice(1),
    icon: <ChefHat className="h-4 w-4" />,
  });

  if (recipe.is_custom_yeast_enabled && recipe.custom_yeast) {
    parameters.push({
      name: "Levure",
      value: `${(recipe.custom_yeast * 100).toFixed(2)}%`,
      icon: <ChefHat className="h-4 w-4" />,
    });
  }

  return (
    <Card className="bg-slate border-cream/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-cream flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-terracotta" /> Paramètres
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
