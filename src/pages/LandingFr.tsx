
import React, { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { IngredientCalculator } from "@/components/landing/IngredientCalculator";
import { RecipeSaving } from "@/components/landing/RecipeSaving";
import { Platforms } from "@/components/landing/Platforms";
import { StatisticsSection } from "@/components/landing/StatisticsSection";
import { FAQ } from "@/components/landing/FAQ";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { SEOMetadata } from "@/components/landing/SEOMetadata";

export default function LandingFr() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Ajouter la classe quand l'élément est visible
        if (position.top < window.innerHeight - 100) {
          element.classList.add('animate-visible');
        }
      });
    };
    
    // Exécuter une fois au chargement pour animer les éléments déjà visibles
    handleScroll();
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-texture-dark font-inter">
      <Header />
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="calculator">
        <IngredientCalculator />
      </div>
      <div id="recipes">
        <RecipeSaving />
      </div>
      <div id="platforms">
        <Platforms />
      </div>
      <div id="statistics">
        <StatisticsSection />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <CTASection />
      <Footer />
      <SEOMetadata />
    </div>
  );
}
