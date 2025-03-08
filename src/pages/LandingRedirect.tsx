
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { detectPreferredLanguage, redirectToLanguage } from "@/services/languageService";

/**
 * Composant pour rediriger vers la landing page dans la bonne langue
 * Basé sur la détection de la langue préférée
 */
export default function LandingRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Détecte la langue préférée et redirige
    const preferredLanguage = detectPreferredLanguage();
    
    if (preferredLanguage === 'en') {
      navigate('/', { replace: true });
    } else {
      navigate(`/${preferredLanguage}`, { replace: true });
    }
  }, [navigate]);

  // Affiche un écran de chargement pendant la redirection
  return (
    <div className="min-h-screen bg-[#2C2C2C] flex items-center justify-center">
      <div className="text-[#F5E9D7] text-xl">Loading...</div>
    </div>
  );
}
