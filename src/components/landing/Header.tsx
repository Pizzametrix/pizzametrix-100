
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    const headerOffset = 90; // Hauteur de la navbar + marge
    
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="w-full p-4 md:p-6 flex justify-between items-center sticky top-0 z-50 bg-[#2C2C2C]/95 backdrop-blur-sm">
      <div className="text-[#F5E9D7] text-2xl font-montserrat font-bold">Pizzametrix</div>
      
      {/* Navigation desktop */}
      <nav className="hidden md:flex items-center space-x-8 mr-8">
        <button 
          onClick={() => scrollToSection("features")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Fonctionnalités
        </button>
        <button 
          onClick={() => scrollToSection("calculator")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Calculateur
        </button>
        <button 
          onClick={() => scrollToSection("testimonials")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Témoignages
        </button>
        <button 
          onClick={() => scrollToSection("recipes")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Recettes
        </button>
        <button 
          onClick={() => scrollToSection("platforms")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Plateformes
        </button>
        <button 
          onClick={() => scrollToSection("faq")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          FAQ
        </button>
      </nav>
      
      <div className="flex items-center">
        <Link to="/login" className="hidden md:block">
          <Button variant="outline" className="mr-2 border-[#F5E9D7] text-[#F5E9D7] hover:bg-[#F5E9D7]/10">
            Connexion
          </Button>
        </Link>
        <Link to="/sign-in" className="hidden md:block">
          <Button>Inscription</Button>
        </Link>
        
        {/* Menu mobile toggle */}
        <button 
          className="md:hidden text-[#F5E9D7]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#2C2C2C] p-4 flex flex-col space-y-4 border-t border-[#F5E9D7]/10">
          <button 
            onClick={() => scrollToSection("features")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Fonctionnalités
          </button>
          <button 
            onClick={() => scrollToSection("calculator")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Calculateur
          </button>
          <button 
            onClick={() => scrollToSection("testimonials")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Témoignages
          </button>
          <button 
            onClick={() => scrollToSection("recipes")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Recettes
          </button>
          <button 
            onClick={() => scrollToSection("platforms")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Plateformes
          </button>
          <button 
            onClick={() => scrollToSection("faq")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            FAQ
          </button>
          <div className="pt-2 flex flex-col space-y-2">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full border-[#F5E9D7] text-[#F5E9D7] hover:bg-[#F5E9D7]/10">
                Connexion
              </Button>
            </Link>
            <Link to="/sign-in" className="w-full">
              <Button className="w-full">Inscription</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
