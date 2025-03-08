
import React from "react";
import { Save, Database } from "lucide-react";

export const RecipeSaving = () => {
  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-8">
          Save and share your recipes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-slate-700 rounded-lg overflow-hidden h-80">
              <img 
                src="/recipe-placeholder.jpg" 
                alt="Recipe saving" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#C53030] p-3 rounded-full">
                <Save className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Save your creations</h3>
                <p className="text-[#F5E9D7]/80">Keep a history of all your successful recipes to reproduce them identically.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[#C53030] p-3 rounded-full">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Organize your collection</h3>
                <p className="text-[#F5E9D7]/80">Classify your recipes by style, occasion or preference to easily find them.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
