import React, { useState } from "react";
import { Droplet, Timer, Package, Circle } from "lucide-react";
export const IngredientCalculator = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredient(ingredient === selectedIngredient ? null : ingredient);
  };
  return <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-8">
          Calcul à la perfection tous vos ingrédients
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <button onClick={() => handleIngredientClick('eau')} className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'eau' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}>
              <Droplet className="w-6 h-6" />
              <span className="font-medium">Eau, sel, huile, sucre</span>
            </button>
            
            <button onClick={() => handleIngredientClick('levure')} className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'levure' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}>
              <Circle className="w-6 h-6" />
              <span className="font-medium">Quantité de levure précise</span>
            </button>
            
            <button onClick={() => handleIngredientClick('repos')} className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'repos' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}>
              <Timer className="w-6 h-6" />
              <span className="font-medium">Ajoutez des durées de repos</span>
            </button>
            
            <button onClick={() => handleIngredientClick('preempattement')} className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'preempattement' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}>
              <Package className="w-6 h-6" />
              <span className="font-medium text-left">Gérez vos pré-empattements Biga ou Poolish</span>
            </button>
          </div>
          
          <div className="bg-slate-700 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            {selectedIngredient ? <img src={`/${selectedIngredient}-placeholder.jpg`} alt={`Fonction ${selectedIngredient}`} className="w-full h-full object-cover" /> : <div className="text-[#F5E9D7]/60 text-lg">Sélectionnez une fonctionnalité pour voir plus d'informations</div>}
          </div>
        </div>
      </div>
    </section>;
};