
import React, { useState, useEffect } from "react";
import { Droplet, Timer, Package, Circle } from "lucide-react";
import { getLandingAssetsBySection } from "@/services/landingAssetsService";

export const IngredientCalculator = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>("eau");
  const [ingredientImages, setIngredientImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCalculatorImages = async () => {
      try {
        const assets = await getLandingAssetsBySection('calculator');
        const imageMap: Record<string, string> = {};
        
        assets.forEach(asset => {
          // L'identifiant est stocké dans l'alt_text (par exemple "eau", "levure", etc.)
          const ingredientId = asset.alt_text.split('-')[0];
          if (ingredientId) {
            imageMap[ingredientId] = asset.url || '';
          }
        });
        
        setIngredientImages(imageMap);
      } catch (error) {
        console.error("Erreur lors du chargement des images de calculateur:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalculatorImages();
  }, []);
  
  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredient(ingredient === selectedIngredient ? null : ingredient);
  };

  return (
    <section className="py-16 px-4 bg-slate-800" id="calculator">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-8">
          Calcul à la perfection tous vos ingrédients
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <button 
                onClick={() => handleIngredientClick('eau')} 
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  selectedIngredient === 'eau' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'
                }`}
              >
                <Droplet className="w-6 h-6" />
                <span className="font-medium">Eau, sel, huile, sucre</span>
              </button>
              <p className="text-[#F5E9D7]/80 mt-2 pl-4 text-sm">
                Calculez précisément les quantités de liquides et d'additifs pour une hydratation parfaite.
              </p>
            </div>
            
            <div className="flex flex-col">
              <button 
                onClick={() => handleIngredientClick('levure')} 
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  selectedIngredient === 'levure' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'
                }`}
              >
                <Circle className="w-6 h-6" />
                <span className="font-medium">Quantité de levure précise</span>
              </button>
              <p className="text-[#F5E9D7]/80 mt-2 pl-4 text-sm">
                Obtenez la quantité exacte de levure selon votre temps de fermentation et température ambiante.
              </p>
            </div>
            
            <div className="flex flex-col">
              <button 
                onClick={() => handleIngredientClick('repos')} 
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  selectedIngredient === 'repos' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'
                }`}
              >
                <Timer className="w-6 h-6" />
                <span className="font-medium">Ajoutez des durées de repos</span>
              </button>
              <p className="text-[#F5E9D7]/80 mt-2 pl-4 text-sm">
                Planifiez chaque étape de fermentation pour développer les arômes et la structure optimale de votre pâte.
              </p>
            </div>
            
            <div className="flex flex-col">
              <button 
                onClick={() => handleIngredientClick('preempattement')} 
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  selectedIngredient === 'preempattement' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'
                }`}
              >
                <Package className="w-6 h-6" />
                <span className="font-medium text-left">Gérez vos pré-empattements Biga ou Poolish</span>
              </button>
              <p className="text-[#F5E9D7]/80 mt-2 pl-4 text-sm">
                Améliorez la complexité et la digestibilité de votre pâte grâce aux calculs précis de pré-fermentations.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            {selectedIngredient && ingredientImages[selectedIngredient] ? (
              <img 
                src={ingredientImages[selectedIngredient]} 
                alt={`Fonction ${selectedIngredient}`} 
                className="w-full h-full object-cover" 
              />
            ) : isLoading ? (
              <div className="text-[#F5E9D7]/60 text-lg">
                Chargement des images...
              </div>
            ) : (
              <div className="text-[#F5E9D7]/60 text-lg">
                Sélectionnez une fonctionnalité pour voir plus d'informations
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

