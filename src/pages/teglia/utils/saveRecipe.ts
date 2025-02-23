
import { DoughType, YeastType, Phase } from "../../napolitain/types";
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
  doughType: DoughType;
  phases: Phase[];
  yeastType: YeastType;
  prefermentFlour: number;
  prefermentHydration: number;
  prefermentYeast: number;
}

export async function saveRecipe(params: SaveRecipeParams) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Vous devez être connecté pour sauvegarder une recette");
  }

  // Convertir les phases en format JSON compatible avec Supabase
  const phasesJson = params.phases.map(phase => ({
    id: phase.id,
    duration: phase.duration,
    temperature: phase.temperature
  }));

  const { error } = await supabase
    .from('recettes')
    .insert({
      nom: params.recipeName,
      type: 'teglia',
      user_id: user.id,
      pizza_count: params.pizzaCount,
      ball_weight: params.ballWeight,
      hydration: params.hydration,
      salt: params.salt,
      yeast: params.yeast,
      is_custom_yeast_enabled: params.isCustomYeastEnabled,
      custom_yeast: params.customYeast,
      is_oil_enabled: params.isOilEnabled,
      oil: params.oil,
      is_sugar_enabled: params.isSugarEnabled,
      sugar: params.sugar,
      dough_type: params.doughType,
      phases: phasesJson,
      yeast_type: params.yeastType,
      preferment_flour: params.prefermentFlour,
      preferment_hydration: params.prefermentHydration,
      preferment_yeast: params.prefermentYeast,
    });

  if (error) {
    throw new Error("Erreur lors de la sauvegarde de la recette");
  }
}
