
import React from "react";
import { Helmet } from "react-helmet";

export const SEOMetadata = () => {
  // Schéma JSON-LD pour la structure de l'organisation et de l'application
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pizzametrix",
    "url": "https://pizzametrix.com",
    "logo": "https://pizzametrix.com/icon-512x512.png",
    "description": "Calculateur de recettes de pizza professionnel",
    "sameAs": [
      "https://twitter.com/pizzametrix",
      "https://facebook.com/pizzametrix",
      "https://instagram.com/pizzametrix"
    ]
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pizzametrix",
    "applicationCategory": "FoodApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  // Schema spécifique au contenu recette
  const recipeCalculatorSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Calculateur de pâte à pizza professionnelle",
    "description": "Calculez précisément vos ingrédients et temps de fermentation pour des pizzas professionnelles",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Définir les paramètres",
        "text": "Choisissez le nombre de pizzas, leur poids et le taux d'hydratation"
      },
      {
        "@type": "HowToStep",
        "name": "Choisir le type de pâte",
        "text": "Sélectionnez entre pâte directe, biga ou poolish"
      },
      {
        "@type": "HowToStep",
        "name": "Gérer la fermentation",
        "text": "Définissez vos phases de fermentation pour optimiser le goût et la texture"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Balance de cuisine"
      },
      {
        "@type": "HowToTool",
        "name": "Thermomètre"
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pizzametrix" />
        <meta name="twitter:title" content="Pizzametrix - Calculateur de recettes de pizza" />
        <meta name="twitter:description" content="Calculateur précis pour les recettes de pizza napolitaine, teglia romaine et autres styles. Créez des pizzas professionnelles à la maison." />
        <meta name="twitter:image" content="https://pizzametrix.com/og-image.png" />
        
        {/* Indications de langue */}
        <link rel="alternate" href="https://pizzametrix.com/fr" hrefLang="fr" />
        <link rel="alternate" href="https://pizzametrix.com" hrefLang="en" />
        <link rel="alternate" href="https://pizzametrix.com/it" hrefLang="it" />
        <link rel="canonical" href="https://pizzametrix.com/fr" />
        
        {/* Intégration des schémas JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(applicationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(recipeCalculatorSchema)}
        </script>
      </Helmet>
      
      <div className="sr-only">
        <h1>Pizzametrix - Calculateur de pâte à pizza professionnel</h1>
        <p>
          Pizzametrix est un outil de calcul précis pour les recettes de pizza napolitaine, 
          teglia romaine et autres styles. Créez des pizzas professionnelles à la maison 
          avec nos calculateurs d'hydratation, de levain et de fermentation.
        </p>
        <h2>Types de pizza</h2>
        <ul>
          <li>Pizza napolitaine authentique</li>
          <li>Pizza teglia romaine</li>
          <li>Pizza au levain naturel</li>
        </ul>
        <h2>Fonctionnalités principales</h2>
        <ul>
          <li>Calcul précis des ingrédients</li>
          <li>Gestion des temps de fermentation</li>
          <li>Recettes personnalisables</li>
          <li>Sauvegarde de vos créations</li>
        </ul>
        <p>
          Calculateur pizza, recette pizza napolitaine, hydratation pâte pizza, 
          fermentation pizza, pizza teglia romaine, pizza maison, pizza professionnelle,
          pizza italia, cuisson pizza, pâte à pizza
        </p>
      </div>
    </>
  );
};
