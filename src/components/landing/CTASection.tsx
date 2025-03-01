
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#C53030]/10 blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#77BFA3]/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-on-scroll">
        <h2 className="text-[#F5E9D7] text-3xl md:text-4xl font-montserrat font-bold mb-4">
          Prêt à améliorer vos pizzas ?
        </h2>
        <p className="text-[#F5E9D7]/80 text-lg mb-10 max-w-2xl mx-auto">
          Rejoignez des milliers de passionnés qui utilisent Pizzametrix pour créer des pizzas exceptionnelles.
        </p>
        <Link to="/sign-in">
          <Button size="lg" className="bg-gradient-primary hover:bg-[#C53030]/90 btn-glow shadow-lg shadow-[#C53030]/30 text-lg px-8 py-6 h-auto">
            Créer un compte gratuit <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
