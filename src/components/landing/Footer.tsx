import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h2 className="text-[#F5E9D7] text-2xl font-montserrat font-bold mb-2">Pizzametrix</h2>
            <p className="text-[#F5E9D7]/60 text-center md:text-left">L'outil ultime pour les passionnés de pizza</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-[#F5E9D7]/60 hover:text-[#F5E9D7]">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#F5E9D7]/60 hover:text-[#F5E9D7]">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#F5E9D7]/60 hover:text-[#F5E9D7]">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#F5E9D7]/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Pizzametrix. Tous droits réservés.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#F5E9D7]/60">
            <a href="#" className="hover:text-[#F5E9D7]">Mentions légales</a>
            <a href="#" className="hover:text-[#F5E9D7]">Politique de confidentialité</a>
            <a href="#" className="hover:text-[#F5E9D7]">CGU</a>
            <Link to="/admin/images" className="hover:text-[#F5E9D7] opacity-50 hover:opacity-100">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
