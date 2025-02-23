
import { DoughType, YeastType, Phase } from "../../napolitain/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  // S'assurer que les nombres sont bien des nombres
  const recipeData = {
    nom: params.recipeName,
    type: 'teglia',
    user_id: user.id,
    pizza_count: Number(params.pizzaCount),
    ball_weight: Number(params.ballWeight),
    hydration: Number(params.hydration),
    salt: Number(params.salt),
    yeast: Number(params.yeast),
    is_custom_yeast_enabled: Boolean(params.isCustomYeastEnabled),
    custom_yeast: params.customYeast ? Number(params.customYeast) : null,
    is_oil_enabled: Boolean(params.isOilEnabled),
    oil: params.isOilEnabled ? Number(params.oil) : null,
    is_sugar_enabled: Boolean(params.isSugarEnabled),
    sugar: params.isSugarEnabled ? Number(params.sugar) : null,
    dough_type: params.doughType,
    phases: phasesJson,
    yeast_type: params.yeastType,
    preferment_flour: params.prefermentFlour ? Number(params.prefermentFlour) : null,
    preferment_hydration: params.prefermentHydration ? Number(params.prefermentHydration) : null,
    preferment_yeast: params.prefermentYeast ? Number(params.prefermentYeast) : null,
  };

  console.log("Données à sauvegarder:", recipeData);

  const { error } = await supabase
    .from('recettes')
    .insert(recipeData);

  if (error) {
    console.error("Erreur détaillée de sauvegarde:", {
      error,
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message
    });
    toast.error("Erreur lors de la sauvegarde de la recette");
    throw new Error("Erreur lors de la sauvegarde de la recette");
  }

  toast.success("Recette sauvegardée avec succès");
}
