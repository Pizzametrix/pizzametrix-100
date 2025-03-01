
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          Des outils spécialisés pour chaque style de pizza
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-700 border-[#77BFA3] overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/napolitaine.jpg" 
                alt="Pizza Napolitaine" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Pizza Napolitaine</h3>
              <p className="text-[#F5E9D7]/80 mb-4">
                Calculez les ingrédients parfaits pour une pâte napolitaine authentique, avec le bon équilibre d'hydratation et de levure.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700 border-[#C53030] overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/teglia.jpg" 
                alt="Pizza Teglia Romaine" 
                className="w-full h-full object-cover"
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
