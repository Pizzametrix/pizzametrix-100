
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/landing/HeaderEn";
import { HeroSection } from "@/components/landing/HeroSectionEn";
import { FeaturesSection } from "@/components/landing/FeaturesSectionEn";
import { IngredientCalculator } from "@/components/landing/IngredientCalculatorEn";
import { RecipeSaving } from "@/components/landing/RecipeSavingEn";
import { Platforms } from "@/components/landing/PlatformsEn";
import { StatisticsSection } from "@/components/landing/StatisticsSectionEn";
import { FAQ } from "@/components/landing/FAQEn";
import { Testimonials } from "@/components/landing/TestimonialsEn";
import { CTASection } from "@/components/landing/CTASectionEn";
import { Footer } from "@/components/landing/Footer";
import { SEOMetadataEn } from "@/components/landing/SEOMetadataEn";
import { loadAllLandingAssets } from "@/services/landingAssetsService";
import { saveLanguagePreference } from "@/services/languageService";

export default function LandingEn() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sauvegarder la préférence de langue anglaise
    saveLanguagePreference('en');
    
    // Charger toutes les images de la landing page au démarrage
    const preloadAssets = async () => {
      try {
        await loadAllLandingAssets();
      } catch (error) {
        console.error("Error loading assets:", error);
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
        <title>Pizzametrix - Professional Pizza Recipe Calculator</title>
        <meta name="description" content="Pizzametrix is the ultimate tool for creating perfect pizzas. Our calculator helps you master hydration, fermentation, and all technical aspects of Neapolitan and Roman Teglia pizza recipes." />
      </Helmet>
      
      <div className="min-h-screen bg-texture-dark font-inter">
        <Header />
        <main>
          <HeroSection />
          <section id="features" aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">Main Features</h2>
            <FeaturesSection />
          </section>
          <section id="calculator" aria-labelledby="calculator-heading">
            <h2 id="calculator-heading" className="sr-only">Ingredient Calculator</h2>
            <IngredientCalculator />
          </section>
          <section id="recipes" aria-labelledby="recipes-heading">
            <h2 id="recipes-heading" className="sr-only">Recipe Saving</h2>
            <RecipeSaving />
          </section>
          <section id="platforms" aria-labelledby="platforms-heading">
            <h2 id="platforms-heading" className="sr-only">Available Platforms</h2>
            <Platforms />
          </section>
          <section id="statistics" aria-labelledby="statistics-heading">
            <h2 id="statistics-heading" className="sr-only">Statistics</h2>
            <StatisticsSection />
          </section>
          <section id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
            <FAQ />
          </section>
          <section id="testimonials" aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
            <Testimonials />
          </section>
          <CTASection />
        </main>
        <Footer />
        <SEOMetadataEn />
      </div>
    </>
  );
}
