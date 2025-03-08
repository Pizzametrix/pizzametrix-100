
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
import { loadAllLandingAssets } from "@/services/landingAssetsService";

export default function LandingFr() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger toutes les images de la landing page au démarrage
    const preloadAssets = async () => {
      try {
        await loadAllLandingAssets();
      } catch (error) {
        console.error("Erreur lors du chargement des assets:", error);
      } finally {
        setLoading(false);
      }
    };

    preloadAssets();

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
    <>
      <Helmet>
        <title>Pizzametrix - Calculateur de recettes de pizza professionnelles</title>
        <meta name="description" content="Pizzametrix est l'outil ultime pour créer des pizzas parfaites. Notre calculateur vous aide à maîtriser l'hydratation, la fermentation et tous les aspects techniques des recettes de pizza napolitaine et teglia romaine." />
      </Helmet>
      
      <div className="min-h-screen bg-texture-dark font-inter">
        <Header />
        <main>
          <HeroSection />
          <section id="features" aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">Fonctionnalités principales</h2>
            <FeaturesSection />
          </section>
          <section id="calculator" aria-labelledby="calculator-heading">
            <h2 id="calculator-heading" className="sr-only">Calculateur d'ingrédients</h2>
            <IngredientCalculator />
          </section>
          <section id="recipes" aria-labelledby="recipes-heading">
            <h2 id="recipes-heading" className="sr-only">Sauvegarde de recettes</h2>
            <RecipeSaving />
          </section>
          <section id="platforms" aria-labelledby="platforms-heading">
            <h2 id="platforms-heading" className="sr-only">Plateformes disponibles</h2>
            <Platforms />
          </section>
          <section id="statistics" aria-labelledby="statistics-heading">
            <h2 id="statistics-heading" className="sr-only">Statistiques</h2>
            <StatisticsSection />
          </section>
          <section id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="sr-only">Questions fréquentes</h2>
            <FAQ />
          </section>
          <section id="testimonials" aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading" className="sr-only">Témoignages</h2>
            <Testimonials />
          </section>
          <CTASection />
        </main>
        <Footer />
        <SEOMetadata />
      </div>
    </>
  );
}
