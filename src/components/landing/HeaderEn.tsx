
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SupportedLanguage, saveLanguagePreference } from "@/services/languageService";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    const headerOffset = 90; // Header height + margin
    
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLanguageChange = (language: SupportedLanguage) => {
    saveLanguagePreference(language);
  };

  return (
    <header className="w-full p-4 md:p-6 flex justify-between items-center sticky top-0 z-50 bg-[#2C2C2C]/95 backdrop-blur-sm">
      <div className="text-[#F5E9D7] text-2xl font-montserrat font-bold">Pizzametrix</div>
      
      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center space-x-8 mr-8">
        <button 
          onClick={() => scrollToSection("features")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection("calculator")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Calculator
        </button>
        <button 
          onClick={() => scrollToSection("testimonials")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Testimonials
        </button>
        <button 
          onClick={() => scrollToSection("recipes")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Recipes
        </button>
        <button 
          onClick={() => scrollToSection("platforms")}
          className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors"
        >
          Platforms
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
            Login
          </Button>
        </Link>
        <Link to="/sign-in" className="hidden md:block">
          <Button>Sign Up</Button>
        </Link>
        
        {/* Language selector */}
        <div className="hidden md:flex mx-4 space-x-2">
          <Link to="/" className="text-[#F5E9D7] font-medium" onClick={() => handleLanguageChange('en')}>
            EN
          </Link>
          <span className="text-[#F5E9D7]">|</span>
          <Link to="/fr" className="text-[#F5E9D7]/70 hover:text-[#F5E9D7]" onClick={() => handleLanguageChange('fr')}>
            FR
          </Link>
        </div>
        
        {/* Mobile menu toggle */}
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
            Features
          </button>
          <button 
            onClick={() => scrollToSection("calculator")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Calculator
          </button>
          <button 
            onClick={() => scrollToSection("testimonials")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection("recipes")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Recipes
          </button>
          <button 
            onClick={() => scrollToSection("platforms")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            Platforms
          </button>
          <button 
            onClick={() => scrollToSection("faq")}
            className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors py-2"
          >
            FAQ
          </button>
          
          {/* Language selector for mobile */}
          <div className="flex space-x-4 py-2 border-t border-[#F5E9D7]/10">
            <Link to="/" className="text-[#F5E9D7] font-medium" onClick={() => handleLanguageChange('en')}>
              English
            </Link>
            <Link to="/fr" className="text-[#F5E9D7]/70 hover:text-[#F5E9D7]" onClick={() => handleLanguageChange('fr')}>
              Français
            </Link>
          </div>
          
          <div className="pt-2 flex flex-col space-y-2">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full border-[#F5E9D7] text-[#F5E9D7] hover:bg-[#F5E9D7]/10">
                Login
              </Button>
            </Link>
            <Link to="/sign-in" className="w-full">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
