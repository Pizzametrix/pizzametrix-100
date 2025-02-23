
import { DoughType, YeastType, Ingredient } from "../../napolitain/types";

export const calculateIngredients = (params: {
  totalWeight: number;
  hydration: number;
  salt: number;
  isCustomYeastEnabled: boolean;
  customYeast: number;
  yeast: number;
  isOilEnabled: boolean;
  oil: number;
  isSugarEnabled: boolean;
  sugar: number;
  yeastType: YeastType;
  doughType: DoughType;
  prefermentFlour: number;
  prefermentHydration: number;
  prefermentYeast: number;
}) => {
  const {
    totalWeight,
    hydration,
    salt,
    isCustomYeastEnabled,
    customYeast,
    yeast,
    isOilEnabled,
    oil,
    isSugarEnabled,
    sugar,
    yeastType,
    doughType,
    prefermentFlour,
    prefermentHydration,
    prefermentYeast
  } = params;

  const calculateYeastWeight = (baseWeight: number, type: YeastType): number => {
    switch (type) {
      case 'seche':
        return Number((baseWeight * 0.5).toFixed(2));
      case 'saf':
        return Number((baseWeight * 0.34).toFixed(2));
      default:
        return baseWeight;
    }
  };

  const totalPercentage = 100 + hydration + salt + 
    (isCustomYeastEnabled ? customYeast : yeast) + 
    (isOilEnabled ? oil : 0) + 
    (isSugarEnabled ? sugar : 0);
  
  const flourWeight = Math.round(totalWeight / (1 + (totalPercentage - 100) / 100));
  const waterWeight = Math.round((flourWeight * hydration) / 100);
  const saltWeight = Number(((flourWeight * salt) / 100).toFixed(1));
  const baseYeastWeight = Number(((flourWeight * (isCustomYeastEnabled ? customYeast : yeast)) / 100).toFixed(2));
  const yeastWeight = calculateYeastWeight(baseYeastWeight, yeastType);
  const oilWeight = isOilEnabled ? Number(((flourWeight * oil) / 100).toFixed(1)) : 0;
  const sugarWeight = isSugarEnabled ? Number(((flourWeight * sugar) / 100).toFixed(1)) : 0;

  const prefermentFlourWeight = doughType !== 'direct' ? Math.round((flourWeight * prefermentFlour) / 100) : 0;
  const prefermentWaterWeight = doughType !== 'direct' ? Math.round((prefermentFlourWeight * prefermentHydration) / 100) : 0;
  const prefermentYeastWeight = doughType !== 'direct' ? Number(((yeastWeight * prefermentYeast) / 100).toFixed(2)) : 0;

  const refreshFlourWeight = flourWeight - prefermentFlourWeight;
  const refreshWaterWeight = waterWeight - prefermentWaterWeight;
  const refreshYeastWeight = Number((yeastWeight - prefermentYeastWeight).toFixed(2));

  const ingredients: Ingredient[] = [
    { name: "Farine", preferment: prefermentFlourWeight, refresh: refreshFlourWeight, total: flourWeight },
    { name: "Eau", preferment: prefermentWaterWeight, refresh: refreshWaterWeight, total: waterWeight },
    { name: "Sel", preferment: 0, refresh: saltWeight, total: saltWeight },
    { name: "Levure", preferment: prefermentYeastWeight, refresh: refreshYeastWeight, total: yeastWeight },
    ...(isOilEnabled ? [{ name: "Huile", preferment: 0, refresh: oilWeight, total: oilWeight }] : []),
    ...(isSugarEnabled ? [{ name: "Sucre", preferment: 0, refresh: sugarWeight, total: sugarWeight }] : [])
  ].sort((a, b) => b.total - a.total);

  const ingredientsTotal = Math.round(ingredients.reduce((sum, ing) => sum + ing.total, 0));

  return { ingredients, ingredientsTotal };
};
