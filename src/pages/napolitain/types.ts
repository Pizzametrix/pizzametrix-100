
export interface Phase {
  id: number;
  duration: number;
  temperature: number;
}

export type YeastType = 'fraiche' | 'seche' | 'saf';
export type DoughType = 'direct' | 'biga' | 'poolish';

export type RecipeType = 'napolitaine' | 'teglia';

export interface PrefermentDefaults {
  flour: number;
  hydration: number;
  yeast: number;
}

export interface Ingredient {
  name: string;
  preferment: number;
  refresh: number;
  total: number;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
