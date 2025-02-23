
import { Phase, YeastType } from "../types";
import { supabase } from "@/integrations/supabase/client";

interface SaveRecipeParams {
  recipeName: string;
  pizzaCount: number;
  ballWeight: number;
  hydration: number;
  salt: number;
  isCustomYeastEnabled: boolean;
  customYeast: number;
  yeast: number;
  isOilEnabled: boolean;
  oil: number;
  isSugarEnabled: boolean;
  sugar: number;
  doughType: string;
  phases: Phase[];
  yeastType: YeastType;
  prefermentFlour: number;
  prefermentHydration: number;
  prefermentYeast: number;
}

export const saveRecipe = async (params: SaveRecipeParams) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Vous devez être connecté pour sauvegarder une recette");
  }

  const phasesJson = params.phases.map(phase => ({
    id: phase.id,
    duration: phase.duration,
    temperature: phase.temperature
  }));

  const formatYeastType = (type: YeastType): string => {
    switch (type) {
      case 'fraiche':
        return 'Fraîche';
      case 'seche':
        return 'Sèche';
      case 'saf':
        return 'SAF';
      default:
        return type;
    }
  };

  const prefermentFlourValue = params.doughType !== 'direct' ? Math.round(Number(params.prefermentFlour)) : null;
  const prefermentHydrationValue = params.doughType !== 'direct' ? Math.round(Number(params.prefermentHydration)) : null;
  const prefermentYeastValue = params.doughType !== 'direct' ? Number((Number(params.prefermentYeast) / 100).toFixed(2)) : null;

  const recipeData = {
    user_id: user.id,
    nom: params.recipeName.trim(),
    type: 'napolitaine' as const,
    pizza_count: Math.round(Number(params.pizzaCount)),
    ball_weight: Math.round(Number(params.ballWeight)),
    hydration: Math.round(Number(params.hydration)),
    salt: Number((Number(params.salt) / 100).toFixed(2)),
    yeast: Number((Number(params.isCustomYeastEnabled ? params.customYeast : params.yeast) / 100).toFixed(2)),
    oil: params.isOilEnabled ? Number((Number(params.oil) / 100).toFixed(2)) : null,
    sugar: params.isSugarEnabled ? Number((Number(params.sugar) / 100).toFixed(2)) : null,
    dough_type: params.doughType,
    phases: phasesJson,
    is_custom_yeast_enabled: params.isCustomYeastEnabled,
    custom_yeast: params.isCustomYeastEnabled ? Number(params.customYeast.toFixed(2)) : null,
    is_oil_enabled: params.isOilEnabled,
    is_sugar_enabled: params.isSugarEnabled,
    yeast_type: formatYeastType(params.yeastType),
    preferment_flour: prefermentFlourValue,
    preferment_hydration: prefermentHydrationValue,
    preferment_yeast: prefermentYeastValue
  };

  const { error: insertError } = await supabase
    .from('recettes')
    .insert([recipeData]);

  if (insertError) {
    console.error("Erreur détaillée:", insertError);
    throw new Error("Impossible de sauvegarder la recette");
  }
};
