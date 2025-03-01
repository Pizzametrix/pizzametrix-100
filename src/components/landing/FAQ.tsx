
import React from "react";

export const FAQ = () => {
  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          Questions fréquentes
        </h2>
        
        <div className="space-y-6">
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Qu'est-ce que Pizzametrix ?</h3>
            <p className="text-[#F5E9D7]/80">Pizzametrix est une application web qui vous permet de calculer avec précision les ingrédients et les temps de fermentation pour réaliser des pizzas professionnelles chez vous.</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Est-ce gratuit ?</h3>
            <p className="text-[#F5E9D7]/80">Oui, l'utilisation de base de Pizzametrix est totalement gratuite. Vous pouvez créer un compte et commencer à calculer vos recettes immédiatement.</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Puis-je utiliser Pizzametrix hors ligne ?</h3>
            <p className="text-[#F5E9D7]/80">Pour le moment, Pizzametrix nécessite une connexion internet. Cependant, vous pouvez toujours consulter vos recettes enregistrées même sans connexion.</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Quels styles de pizza sont supportés ?</h3>
            <p className="text-[#F5E9D7]/80">Nous proposons actuellement des calculateurs pour la pizza napolitaine et la pizza teglia romaine. D'autres styles seront ajoutés prochainement !</p>
          </div>
        </div>
      </div>
    </section>
  );
};
