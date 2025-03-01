
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold mb-4">
          Prêt à améliorer vos pizzas ?
        </h2>
        <p className="text-[#F5E9D7]/80 text-lg mb-8">
          Rejoignez des milliers de passionnés qui utilisent Pizzametrix pour créer des pizzas exceptionnelles.
        </p>
        <Link to="/sign-in">
          <Button size="lg" className="bg-[#C53030] hover:bg-[#C53030]/90">
            Créer un compte gratuit
          </Button>
        </Link>
      </div>
    </section>
  );
};
