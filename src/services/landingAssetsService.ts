
import { supabase } from "@/integrations/supabase/client";

export interface LandingAsset {
  id: string;
  storage_path: string;
  section: string;
  alt_text: string;
  dimensions?: string;
  url?: string;
  position?: number;
}

/**
 * Récupère les images d'une section spécifique de la landing page, ordonnées par position
 */
export const getLandingAssetsBySection = async (section: string): Promise<LandingAsset[]> => {
  // Utilisation d'une requête SQL brute pour contourner les limitations du typage
  const { data, error } = await supabase
    .from('landing_assets')
    .select('*')
    .eq('section', section)
    .order('position');  // Tri par position

  if (error) {
    console.error('Erreur lors de la récupération des assets:', error);
    return [];
  }

  // Ajouter l'URL publique à chaque asset
  return data.map(asset => ({
    ...asset,
    url: getPublicUrl(asset.storage_path)
  })) as LandingAsset[];
};

/**
 * Récupère l'URL publique d'un fichier dans le bucket landing_assets
 */
export const getPublicUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('landing_assets')
    .getPublicUrl(path);
  
  return data.publicUrl;
};

/**
 * Charge par défaut toutes les images requises pour la landing page
 * en regroupant par section
 */
export const loadAllLandingAssets = async () => {
  const sections = ['hero', 'features', 'calculator', 'testimonials', 'platforms'];
  const assets: Record<string, LandingAsset[]> = {};
  
  await Promise.all(
    sections.map(async (section) => {
      assets[section] = await getLandingAssetsBySection(section);
    })
  );
  
  return assets;
};

/**
 * Composant Image avec lazy loading intégré
 * Peut être utilisé comme un composant React normal
 */
export const LazyImage = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc,
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }) => {
  const imgSrc = src || fallbackSrc || '/placeholder.svg';
  return (
    <img
      src={imgSrc}
      alt={alt || 'Image'}
      loading="lazy"
      className={className || ''}
      onError={(e) => {
        if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
      {...props}
    />
  );
};
