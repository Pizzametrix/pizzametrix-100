
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-[#F5E9D7] text-4xl md:text-6xl font-montserrat font-bold mb-6 animate-fadeIn">
          Perfectionnez vos recettes de pizza
        </h1>
        <p className="text-[#F5E9D7]/80 text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: "200ms" }}>
          Calculez précisément vos ingrédients, suivez les temps de repos et créez des pizzas dignes des meilleurs restaurants italiens.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <Link to="/sign-in">
            <Button size="lg" className="w-full sm:w-auto bg-[#C53030] hover:bg-[#C53030]/90">
              Commencer gratuitement
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Se connecter
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
