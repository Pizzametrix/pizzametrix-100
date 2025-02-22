
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pizza } from "lucide-react";
import { DoughType, Ingredient } from "../types";

interface IngredientsTableProps {
  doughType: DoughType;
  ingredients: Ingredient[];
  ingredientsTotal: number;
}

export function IngredientsTable({
  doughType,
  ingredients,
  ingredientsTotal
}: IngredientsTableProps) {
  return (
    <Card className="bg-slate border-cream/10">
      <CardHeader>
        <CardTitle className="text-[#F5E9D7] flex items-center gap-2">
          <Pizza className="h-5 w-5 text-terracotta" /> Ingrédients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {doughType !== 'direct' && (
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-cream/10">
              <span className="text-[#F5E9D7]/60">&nbsp;</span>
              <span className="text-right text-[#F5E9D7]/60">{doughType === 'biga' ? 'Biga' : 'Poolish'}</span>
              <span className="text-right text-[#F5E9D7]/60">Rafraîchi</span>
              <span className="text-right text-[#F5E9D7]/60">Total</span>
            </div>
          )}
          {ingredients.map((ingredient) => (
            <div key={ingredient.name} className={`grid ${doughType !== 'direct' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 py-2 border-b border-cream/10`}>
              <span className="text-[#F5E9D7]">{ingredient.name}</span>
              {doughType !== 'direct' ? (
                <>
                  <span className="text-[#F5E9D7] text-right">
                    {ingredient.preferment > 0 ? (
                      `${ingredient.name === "Levure" ? 
                        ingredient.preferment.toFixed(2) : 
                        ingredient.preferment}g` 
                    ) : "-"}
                  </span>
                  <span className="text-[#F5E9D7] text-right">
                    {ingredient.refresh > 0 ? (
                      `${ingredient.name === "Levure" ? 
                        ingredient.refresh.toFixed(2) : 
                        ingredient.refresh}g`
                    ) : "-"}
                  </span>
                </>
              ) : null}
              <span className="text-[#F5E9D7] text-right">
                {ingredient.total > 0 ? (
                  `${ingredient.name === "Levure" ? 
                    ingredient.total.toFixed(2) : 
                    ingredient.total}g`
                ) : "-"}
              </span>
            </div>
          ))}
          <div className={`grid ${doughType !== 'direct' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 py-2 font-medium`}>
            <span className="text-[#F5E9D7]">Total</span>
            {doughType !== 'direct' && (
              <>
                <span className="text-[#F5E9D7] text-right">
                  {Math.round(ingredients.reduce((sum, ing) => sum + ing.preferment, 0))}g
                </span>
                <span className="text-[#F5E9D7] text-right">
                  {Math.round(ingredients.reduce((sum, ing) => sum + ing.refresh, 0))}g
                </span>
              </>
            )}
            <span className="text-[#F5E9D7] text-right">{ingredientsTotal}g</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
