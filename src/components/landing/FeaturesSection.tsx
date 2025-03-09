
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getLandingAssetsBySection } from "@/services/landingAssetsService";
import type { LandingAsset } from "@/services/landingAssetsService";

export const FeaturesSection = () => {
  const [images, setImages] = useState<LandingAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const featuresImages = await getLandingAssetsBySection('features');
        setImages(featuresImages);
      } catch (error) {
        console.error("Erreur lors du chargement des images de features:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // Images de remplacement au cas où aucune image n'est trouvée dans Supabase
  const fallbackImages = {
    napolitaine: "/napolitaine.jpg",
    teglia: "/teglia.jpg"
  };

  // Fonction pour obtenir l'image par position dans le tableau, avec fallback si nécessaire
  const getImageByPosition = (position: number, type: 'napolitaine' | 'teglia'): string => {
    const image = images.find(img => img.position === position);
    if (image && image.url) {
      return image.url;
    }
    return fallbackImages[type];
  };

  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          Une application spécialisée pour chaque style de pizza
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-700 border-[#F5E9D7] overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={getImageByPosition(0, 'napolitaine')} 
                alt="Pizza Napolitaine authentique avec une pâte fine et des bords soufflés caractéristiques" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Pizza Napolitaine</h3>
              <p className="text-[#F5E9D7]/80 mb-4">
                Calculez les ingrédients parfaits pour une pâte napolitaine authentique, avec le bon équilibre d'hydratation et de levure.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700 border-[#F5E9D7] overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={getImageByPosition(1, 'teglia')} 
                alt="Pizza Teglia Romaine à la plaque avec sa texture aérienne et croustillante caractéristique" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Pizza Teglia Romaine</h3>
              <p className="text-[#F5E9D7]/80 mb-4">
                Maîtrisez l'art de la pizza à la plaque romaine avec notre calculateur spécialisé pour ce style de pizza aérée et croustillante.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
