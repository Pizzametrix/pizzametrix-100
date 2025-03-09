
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

export default function SitemapFr() {
  return (
    <>
      <Helmet>
        <title>Plan du site - Pizzametrix</title>
        <meta name="description" content="Explorez toutes les pages disponibles sur Pizzametrix." />
      </Helmet>
      
      <div className="min-h-screen bg-[#2C2C2C] text-[#F5E9D7] font-inter">
        <Header />
        
        <main className="py-16 px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-10">Plan du site</h1>
          
          <div className="space-y-10">
            {/* Pages principales */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Pages principales</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/fr" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link to="/sign-in" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link to="/reset-password" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Mot de passe oublié
                  </Link>
                </li>
              </ul>
            </section>
            
            {/* Pages de l'application */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Pages de l'application</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/home" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Tableau de bord
                  </Link>
                </li>
                <li>
                  <Link to="/calculators" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Calculateurs
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/neapolitan" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Calculateur Napolitaine
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/teglia" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Calculateur Teglia
                  </Link>
                </li>
                <li>
                  <Link to="/my-recipes" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Mes recettes
                  </Link>
                </li>
              </ul>
            </section>
            
            {/* Pages légales */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Pages légales</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/fr/terms" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link to="/fr/privacy" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/fr/sitemap" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Plan du site
                  </Link>
                </li>
              </ul>
            </section>
            
            {/* Versions linguistiques */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Versions linguistiques</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    English Version
                  </Link>
                </li>
                <li>
                  <Link to="/fr" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Version Française
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Sitemap (EN)
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
