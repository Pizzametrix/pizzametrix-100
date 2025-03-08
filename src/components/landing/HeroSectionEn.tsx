
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-texture-dark">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-[#F5E9D7] text-4xl md:text-6xl font-montserrat font-bold mb-6 animate-on-scroll animate-visible">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5E9D7] to-[#ffd8a8]">
            Perfect Your Pizza Recipes
          </span>
        </h1>
        <p className="text-[#F5E9D7]/80 text-lg md:text-xl mb-10 max-w-3xl mx-auto animate-on-scroll animate-visible" style={{
          animationDelay: "200ms"
        }}>
          Precisely calculate your ingredients, track resting times, and create pizzas worthy of the best Italian restaurants.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-on-scroll animate-visible" style={{
          animationDelay: "400ms"
        }}>
          <Link to="/sign-in">
            <Button size="lg" className="w-full sm:w-auto btn-glow bg-gradient-primary hover:bg-[#C53030]/90 shadow-lg shadow-[#C53030]/30 text-lg px-8 py-6 h-auto">
              Start for free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
