
import React from "react";
import { Smartphone, Tablet, Laptop } from "lucide-react";

export const Platforms = () => {
  return (
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold mb-8">
          Disponible sur tous vos appareils
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
            <Smartphone className="w-12 h-12 text-[#77BFA3] mb-4" />
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Mobile</h3>
            <p className="text-[#F5E9D7]/80 text-center">Emportez vos recettes partout avec vous, même dans votre cuisine.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
            <Tablet className="w-12 h-12 text-[#77BFA3] mb-4" />
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Tablette</h3>
            <p className="text-[#F5E9D7]/80 text-center">Profitez d'un affichage optimal pendant que vous cuisinez.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
            <Laptop className="w-12 h-12 text-[#77BFA3] mb-4" />
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Ordinateur</h3>
            <p className="text-[#F5E9D7]/80 text-center">Planifiez vos recettes avec une expérience complète.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
