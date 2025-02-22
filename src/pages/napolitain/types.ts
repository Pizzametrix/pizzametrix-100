
export interface Phase {
  id: number;
  duration: number;
  temperature: number;
}

export type YeastType = 'fraiche' | 'seche' | 'saf';
export type DoughType = 'direct' | 'biga' | 'poolish';

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
