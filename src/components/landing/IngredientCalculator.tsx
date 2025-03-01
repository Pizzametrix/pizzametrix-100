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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 md:col-span-2">
            <button 
              onClick={() => handleIngredientClick('eau')} 
              className={`flex flex-col rounded-lg transition-colors ${
                selectedIngredient === 'eau' ? 'bg-[#77BFA3]' : 'bg-slate-700'
              }`}
            >
              <div className={`flex items-center gap-3 p-4 ${
                selectedIngredient === 'eau' ? 'text-white' : 'text-[#F5E9D7]'
              }`}>
                <Droplet className="w-6 h-6" />
                <h3 className="font-medium m-0">Eau, sel, huile, sucre</h3>
              </div>
              <p className={`mt-0 pb-4 pl-4 pr-4 text-sm text-left ${
                selectedIngredient === 'eau' ? 'text-white/90' : 'text-[#F5E9D7]/80'
              }`}>
                Calculez précisément les quantités de liquides et d'additifs pour une hydratation parfaite.
              </p>
            </button>
            
            <button 
              onClick={() => handleIngredientClick('levure')} 
              className={`flex flex-col rounded-lg transition-colors ${
                selectedIngredient === 'levure' ? 'bg-[#77BFA3]' : 'bg-slate-700'
              }`}
            >
              <div className={`flex items-center gap-3 p-4 ${
                selectedIngredient === 'levure' ? 'text-white' : 'text-[#F5E9D7]'
              }`}>
                <Circle className="w-6 h-6" />
                <h3 className="font-medium m-0">Quantité de levure précise</h3>
              </div>
              <p className={`mt-0 pb-4 pl-4 pr-4 text-sm text-left ${
                selectedIngredient === 'levure' ? 'text-white/90' : 'text-[#F5E9D7]/80'
              }`}>
                Obtenez la quantité exacte de levure selon votre temps de fermentation et température ambiante.
              </p>
            </button>
            
            <button 
              onClick={() => handleIngredientClick('repos')} 
              className={`flex flex-col rounded-lg transition-colors ${
                selectedIngredient === 'repos' ? 'bg-[#77BFA3]' : 'bg-slate-700'
              }`}
            >
              <div className={`flex items-center gap-3 p-4 ${
                selectedIngredient === 'repos' ? 'text-white' : 'text-[#F5E9D7]'
              }`}>
                <Timer className="w-6 h-6" />
                <h3 className="font-medium m-0">Ajoutez des durées de repos</h3>
              </div>
              <p className={`mt-0 pb-4 pl-4 pr-4 text-sm text-left ${
                selectedIngredient === 'repos' ? 'text-white/90' : 'text-[#F5E9D7]/80'
              }`}>
                Planifiez chaque étape de fermentation pour développer les arômes et la structure optimale de votre pâte.
              </p>
            </button>
            
            <button 
              onClick={() => handleIngredientClick('preempattement')} 
              className={`flex flex-col rounded-lg transition-colors ${
                selectedIngredient === 'preempattement' ? 'bg-[#77BFA3]' : 'bg-slate-700'
              }`}
            >
              <div className={`flex items-center gap-3 p-4 ${
                selectedIngredient === 'preempattement' ? 'text-white' : 'text-[#F5E9D7]'
              }`}>
                <Package className="w-6 h-6" />
                <h3 className="font-medium m-0 text-left">Gérez vos pré-empattements Biga ou Poolish</h3>
              </div>
              <p className={`mt-0 pb-4 pl-4 pr-4 text-sm text-left ${
                selectedIngredient === 'preempattement' ? 'text-white/90' : 'text-[#F5E9D7]/80'
              }`}>
                Améliorez la complexité et la digestibilité de votre pâte grâce aux calculs précis de pré-fermentations.
              </p>
            </button>
          </div>
          
          <div className="bg-slate-700 rounded-lg overflow-hidden h-full flex items-center justify-center">
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
