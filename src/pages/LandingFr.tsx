
import React from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { IngredientCalculator } from "@/components/landing/IngredientCalculator";
import { RecipeSaving } from "@/components/landing/RecipeSaving";
import { Platforms } from "@/components/landing/Platforms";
import { FAQ } from "@/components/landing/FAQ";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { SEOMetadata } from "@/components/landing/SEOMetadata";

export default function LandingFr() {
  return (
    <div className="min-h-screen bg-[#2C2C2C] font-inter">
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
