
import React from "react";
import { Helmet } from "react-helmet";

export const SEOMetadataEn = () => {
  // JSON-LD Schema for organization structure and application
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pizzametrix",
    "url": "https://pizzametrix.com",
    "logo": "https://pizzametrix.com/icon-512x512.png",
    "description": "Professional pizza recipe calculator",
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

  // Schema specific to recipe content
  const recipeCalculatorSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Professional Pizza Dough Calculator",
    "description": "Precisely calculate your ingredients and fermentation times for professional pizzas",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Set parameters",
        "text": "Choose the number of pizzas, their weight and hydration rate"
      },
      {
        "@type": "HowToStep",
        "name": "Choose dough type",
        "text": "Select between direct dough, biga or poolish"
      },
      {
        "@type": "HowToStep",
        "name": "Manage fermentation",
        "text": "Define your fermentation phases to optimize taste and texture"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Kitchen scale"
      },
      {
        "@type": "HowToTool",
        "name": "Thermometer"
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pizzametrix" />
        <meta name="twitter:title" content="Pizzametrix - Pizza Recipe Calculator" />
        <meta name="twitter:description" content="Precise calculator for Neapolitan pizza, Roman Teglia and other styles. Create professional pizzas at home." />
        <meta name="twitter:image" content="https://pizzametrix.com/og-image.png" />
        
        {/* Language indications */}
        <link rel="alternate" href="https://pizzametrix.com/fr" hrefLang="fr" />
        <link rel="alternate" href="https://pizzametrix.com" hrefLang="en" />
        <link rel="alternate" href="https://pizzametrix.com/it" hrefLang="it" />
        <link rel="canonical" href="https://pizzametrix.com" />
        
        {/* JSON-LD Schema integration */}
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
        <h1>Pizzametrix - Professional Pizza Dough Calculator</h1>
        <p>
          Pizzametrix is a precise calculation tool for Neapolitan pizza recipes, 
          Roman teglia and other styles. Create professional pizzas at home 
          with our hydration, starter and fermentation calculators.
        </p>
        <h2>Pizza Types</h2>
        <ul>
          <li>Authentic Neapolitan pizza</li>
          <li>Roman teglia pizza</li>
          <li>Natural sourdough pizza</li>
        </ul>
        <h2>Main Features</h2>
        <ul>
          <li>Precise ingredient calculation</li>
          <li>Fermentation time management</li>
          <li>Customizable recipes</li>
          <li>Save your creations</li>
        </ul>
        <p>
          Pizza calculator, Neapolitan pizza recipe, pizza dough hydration, 
          pizza fermentation, Roman teglia pizza, homemade pizza, professional pizza,
          Italian pizza, pizza baking, pizza dough
        </p>
      </div>
    </>
  );
};
