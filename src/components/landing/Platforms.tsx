
import React, { useEffect, useState } from "react";
import { Smartphone, Tablet, Laptop } from "lucide-react";
import { getLandingAssetsBySection, LazyImage } from "@/services/landingAssetsService";
import type { LandingAsset } from "@/services/landingAssetsService";

export const Platforms = () => {
  const [images, setImages] = useState<LandingAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const platformImages = await getLandingAssetsBySection('platforms');
        setImages(platformImages);
      } catch (error) {
        console.error("Erreur lors du chargement des images de plateformes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // Fonction pour obtenir l'image par position dans le tableau
  const getImageByPosition = (position: number): string | undefined => {
    const image = images.find(img => img.position === position);
    return image?.url;
  };

  return <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold mb-8">
          Disponible sur tous vos appareils
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
            {getImageByPosition(0) ? (
              <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
                <LazyImage 
                  src={getImageByPosition(0)} 
                  alt="Application mobile" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <Smartphone className="w-12 h-12 text-[#77BFA3] mb-4" />
            )}
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Smartphone</h3>
            <p className="text-[#F5E9D7]/80 text-center">Emportez vos recettes partout avec vous, même dans votre cuisine.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
            {getImageByPosition(1) ? (
              <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
                <LazyImage 
                  src={getImageByPosition(1)} 
                  alt="Application tablette" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <Tablet className="w-12 h-12 text-[#77BFA3] mb-4" />
            )}
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Tablette</h3>
            <p className="text-[#F5E9D7]/80 text-center">Profitez d'un affichage optimal pendant que vous cuisinez.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
            {getImageByPosition(2) ? (
              <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
                <LazyImage 
                  src={getImageByPosition(2)} 
                  alt="Application ordinateur" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <Laptop className="w-12 h-12 text-[#77BFA3] mb-4" />
            )}
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Ordinateur</h3>
            <p className="text-[#F5E9D7]/80 text-center">Planifiez vos recettes avec une expérience complète.</p>
          </div>
        </div>
      </div>
    </section>;
};
