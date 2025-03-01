import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Timer, Package, Circle, Save, Database, Smartphone, Tablet, Laptop } from "lucide-react";

export default function LandingFr() {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredient(ingredient === selectedIngredient ? null : ingredient);
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] font-inter">
      {/* Header */}
      <header className="w-full p-4 md:p-6 flex justify-between items-center">
        <div className="text-[#F5E9D7] text-2xl font-montserrat font-bold">Pizzametrix</div>
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-[#2C2C2C]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
            Des outils spécialisés pour chaque style de pizza
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-700 border-[#77BFA3] overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/napolitaine.jpg" 
                  alt="Pizza Napolitaine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Pizza Napolitaine</h3>
                <p className="text-[#F5E9D7]/80 mb-4">
                  Calculez les ingrédients parfaits pour une pâte napolitaine authentique, avec le bon équilibre d'hydratation et de levure.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-700 border-[#C53030] overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/teglia.jpg" 
                  alt="Pizza Teglia Romaine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Pizza Teglia Romaine</h3>
                <p className="text-[#F5E9D7]/80 mb-4">
                  Maîtrisez l'art de la pizza à la plaque romaine avec notre calculateur spécialisé pour ce style de pizza aérée et croustillante.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ingredients Calculator Section */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-8">
            Calcul à la perfection tous vos ingrédients
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleIngredientClick('eau')}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'eau' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}
              >
                <Droplet className="w-6 h-6" />
                <span className="font-medium">Eau, sel, huile, sucre</span>
              </button>
              
              <button 
                onClick={() => handleIngredientClick('levure')}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'levure' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}
              >
                <Circle className="w-6 h-6" />
                <span className="font-medium">Quantité de levure précise</span>
              </button>
              
              <button 
                onClick={() => handleIngredientClick('repos')}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'repos' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}
              >
                <Timer className="w-6 h-6" />
                <span className="font-medium">Ajoutez des durées de repos</span>
              </button>
              
              <button 
                onClick={() => handleIngredientClick('preempattement')}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedIngredient === 'preempattement' ? 'bg-[#77BFA3] text-white' : 'bg-slate-700 text-[#F5E9D7]'}`}
              >
                <Package className="w-6 h-6" />
                <span className="font-medium">Gérez vos pré-empattements Biga ou Poolish</span>
              </button>
            </div>
            
            <div className="bg-slate-700 rounded-lg overflow-hidden h-80 flex items-center justify-center">
              {selectedIngredient ? (
                <img 
                  src={`/${selectedIngredient}-placeholder.jpg`} 
                  alt={`Fonction ${selectedIngredient}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[#F5E9D7]/60 text-lg">Sélectionnez une fonctionnalité pour voir plus d'informations</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Saving Section */}
      <section className="py-16 px-4 bg-[#2C2C2C]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-8">
            Enregistrez et partagez vos recettes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-slate-700 rounded-lg overflow-hidden h-80">
                <img 
                  src="/recipe-placeholder.jpg" 
                  alt="Enregistrement de recettes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#C53030] p-3 rounded-full">
                  <Save className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Sauvegardez vos créations</h3>
                  <p className="text-[#F5E9D7]/80">Conservez un historique de toutes vos recettes réussies pour les reproduire à l'identique.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#C53030] p-3 rounded-full">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Organisez votre collection</h3>
                  <p className="text-[#F5E9D7]/80">Classez vos recettes par style, occasion ou préférence pour les retrouver facilement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Platforms Section */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold mb-8">
            Disponible sur tous vos appareils
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
              <Smartphone className="w-12 h-12 text-[#77BFA3] mb-4" />
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Mobile</h3>
              <p className="text-[#F5E9D7]/80 text-center">Emportez vos recettes partout avec vous, même dans votre cuisine.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
              <Tablet className="w-12 h-12 text-[#77BFA3] mb-4" />
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Tablette</h3>
              <p className="text-[#F5E9D7]/80 text-center">Profitez d'un affichage optimal pendant que vous cuisinez.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
              <Laptop className="w-12 h-12 text-[#77BFA3] mb-4" />
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Ordinateur</h3>
              <p className="text-[#F5E9D7]/80 text-center">Planifiez vos recettes avec une expérience complète.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#2C2C2C]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Qu'est-ce que Pizzametrix ?</h3>
              <p className="text-[#F5E9D7]/80">Pizzametrix est une application web qui vous permet de calculer avec précision les ingrédients et les temps de fermentation pour réaliser des pizzas professionnelles chez vous.</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Est-ce gratuit ?</h3>
              <p className="text-[#F5E9D7]/80">Oui, l'utilisation de base de Pizzametrix est totalement gratuite. Vous pouvez créer un compte et commencer à calculer vos recettes immédiatement.</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Puis-je utiliser Pizzametrix hors ligne ?</h3>
              <p className="text-[#F5E9D7]/80">Pour le moment, Pizzametrix nécessite une connexion internet. Cependant, vous pouvez toujours consulter vos recettes enregistrées même sans connexion.</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Quels styles de pizza sont supportés ?</h3>
              <p className="text-[#F5E9D7]/80">Nous proposons actuellement des calculateurs pour la pizza napolitaine et la pizza teglia romaine. D'autres styles seront ajoutés prochainement !</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="py-10 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-4 md:mb-0">
              Pizzametrix
            </div>
            <div className="text-[#F5E9D7]/60 text-sm">
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
