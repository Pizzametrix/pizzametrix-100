
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingFr() {
  return (
    <div className="min-h-screen bg-slate font-inter">
      {/* Header */}
      <header className="w-full p-4 md:p-6 flex justify-between items-center">
        <div className="text-cream text-2xl font-montserrat font-bold">Pizzametrix</div>
        <div>
          <Link to="/login">
            <Button variant="secondary" className="mr-2">
              Connexion
            </Button>
          </Link>
          <Link to="/sign-in">
            <Button>Inscription</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-cream text-4xl md:text-6xl font-montserrat font-bold mb-6 animate-fadeIn">
            Perfectionnez vos recettes de pizza
          </h1>
          <p className="text-cream/80 text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: "200ms" }}>
            Calculez précisément vos ingrédients, suivez les temps de repos et créez des pizzas dignes des meilleurs restaurants italiens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: "400ms" }}>
            <Link to="/sign-in">
              <Button size="lg" className="w-full sm:w-auto">
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-cream text-3xl font-montserrat font-bold text-center mb-12">
            Des outils spécialisés pour chaque style de pizza
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-700 border-basil overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/napolitaine.jpg" 
                  alt="Pizza Napolitaine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-cream text-xl font-montserrat font-bold mb-2">Pizza Napolitaine</h3>
                <p className="text-cream/80 mb-4">
                  Calculez les ingrédients parfaits pour une pâte napolitaine authentique, avec le bon équilibre d'hydratation et de levure.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-700 border-terracotta overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/teglia.jpg" 
                  alt="Pizza Teglia Romaine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-cream text-xl font-montserrat font-bold mb-2">Pizza Teglia Romaine</h3>
                <p className="text-cream/80 mb-4">
                  Maîtrisez l'art de la pizza à la plaque romaine avec notre calculateur spécialisé pour ce style de pizza aérée et croustillante.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-cream text-3xl font-montserrat font-bold mb-4">
            Prêt à améliorer vos pizzas ?
          </h2>
          <p className="text-cream/80 text-lg mb-8">
            Rejoignez des milliers de passionnés qui utilisent Pizzametrix pour créer des pizzas exceptionnelles.
          </p>
          <Link to="/sign-in">
            <Button size="lg" className="bg-terracotta hover:bg-terracotta/90">
              Créer un compte gratuit
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-cream text-xl font-montserrat font-bold mb-4 md:mb-0">
              Pizzametrix
            </div>
            <div className="text-cream/60 text-sm">
              © {new Date().getFullYear()} Pizzametrix. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* SEO Metadata - Will be processed by search engines */}
      <div style={{ display: "none" }}>
        <h1>Pizzametrix - Calculateur de pâte à pizza professionnel</h1>
        <p>
          Pizzametrix est un outil de calcul précis pour les recettes de pizza napolitaine, 
          teglia romaine et autres styles. Créez des pizzas professionnelles à la maison 
          avec nos calculateurs d'hydratation, de levain et de fermentation.
        </p>
        <p>
          Calculateur pizza, recette pizza napolitaine, hydratation pâte pizza, 
          fermentation pizza, pizza teglia romaine, pizza maison
        </p>
      </div>
    </div>
  );
}
