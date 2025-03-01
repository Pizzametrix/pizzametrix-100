
import React from "react";

export const Footer = () => {
  return (
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
  );
};
