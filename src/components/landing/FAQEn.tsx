
import React from "react";

export const FAQ = () => {
  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">What is Pizzametrix?</h3>
            <p className="text-[#F5E9D7]/80">Pizzametrix is a web application that allows you to precisely calculate ingredients and fermentation times to make professional pizzas at home.</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Is it free?</h3>
            <p className="text-[#F5E9D7]/80">Yes, basic use of Pizzametrix is completely free. You can create an account and start calculating your recipes immediately.</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Can I use Pizzametrix offline?</h3>
            <p className="text-[#F5E9D7]/80">At the moment, Pizzametrix requires an internet connection. However, you can still access your saved recipes even without a connection.</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Which pizza styles are supported?</h3>
            <p className="text-[#F5E9D7]/80">We currently offer calculators for Neapolitan pizza and Roman teglia pizza. More styles will be added soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
};
