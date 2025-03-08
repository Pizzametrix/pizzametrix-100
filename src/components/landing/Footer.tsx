
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const isFrenchVersion = location.pathname.includes('/fr');
  
  return (
    <footer className="py-10 px-4 bg-[#2C2C2C] border-t border-[#F5E9D7]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-4">
              Pizzametrix
            </div>
            <p className="text-[#F5E9D7]/70 text-sm">
              {isFrenchVersion 
                ? "L'outil ultime pour créer des pizzas parfaites" 
                : "The ultimate tool for creating perfect pizzas"}
            </p>
          </div>
          
          {/* Pages */}
          <div className="md:col-span-1">
            <h3 className="text-[#F5E9D7] font-medium mb-4">
              {isFrenchVersion ? "Pages" : "Pages"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={isFrenchVersion ? "/fr" : "/"} className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm">
                  {isFrenchVersion ? "Accueil" : "Home"}
                </Link>
              </li>
              <li>
                <a 
                  href={`${isFrenchVersion ? "/fr" : "/"}#features`} 
                  className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm"
                >
                  {isFrenchVersion ? "Fonctionnalités" : "Features"}
                </a>
              </li>
              <li>
                <a 
                  href={`${isFrenchVersion ? "/fr" : "/"}#testimonials`}
                  className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm"
                >
                  {isFrenchVersion ? "Témoignages" : "Testimonials"}
                </a>
              </li>
              <li>
                <a 
                  href={`${isFrenchVersion ? "/fr" : "/"}#faq`}
                  className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm"
                >
                  {isFrenchVersion ? "FAQ" : "FAQ"}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connexion */}
          <div className="md:col-span-1">
            <h3 className="text-[#F5E9D7] font-medium mb-4">
              {isFrenchVersion ? "Compte" : "Account"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm">
                  {isFrenchVersion ? "Connexion" : "Login"}
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm">
                  {isFrenchVersion ? "Inscription" : "Sign Up"}
                </Link>
              </li>
              <li>
                <Link to="/reset-password" className="text-[#F5E9D7]/70 hover:text-[#77BFA3] transition-colors text-sm">
                  {isFrenchVersion ? "Mot de passe oublié" : "Reset Password"}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Langue */}
          <div className="md:col-span-1">
            <h3 className="text-[#F5E9D7] font-medium mb-4">
              {isFrenchVersion ? "Langue" : "Language"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`transition-colors text-sm ${isFrenchVersion ? 'text-[#F5E9D7]/70 hover:text-[#77BFA3]' : 'text-[#77BFA3] font-medium'}`}>
                  English
                </Link>
              </li>
              <li>
                <Link to="/fr" className={`transition-colors text-sm ${isFrenchVersion ? 'text-[#77BFA3] font-medium' : 'text-[#F5E9D7]/70 hover:text-[#77BFA3]'}`}>
                  Français
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-[#F5E9D7]/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#F5E9D7]/60 text-sm">
            © {new Date().getFullYear()} Pizzametrix. {isFrenchVersion ? "Tous droits réservés." : "All rights reserved."}
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="#" className="text-[#F5E9D7]/60 hover:text-[#77BFA3] text-sm transition-colors">
              {isFrenchVersion ? "Conditions d'utilisation" : "Terms of Service"}
            </Link>
            <Link to="#" className="text-[#F5E9D7]/60 hover:text-[#77BFA3] text-sm transition-colors">
              {isFrenchVersion ? "Politique de confidentialité" : "Privacy Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
