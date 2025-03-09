
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Footer } from "@/components/landing/Footer";
import { HeaderEn } from "@/components/landing/HeaderEn";

export default function SitemapEn() {
  return (
    <>
      <Helmet>
        <title>Sitemap - Pizzametrix</title>
        <meta name="description" content="Explore all pages available on Pizzametrix." />
      </Helmet>
      
      <div className="min-h-screen bg-[#2C2C2C] text-[#F5E9D7] font-inter">
        <HeaderEn />
        
        <main className="py-16 px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-10">Sitemap</h1>
          
          <div className="space-y-10">
            {/* Main Pages */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Main Pages</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/sign-in" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/reset-password" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Reset Password
                  </Link>
                </li>
              </ul>
            </section>
            
            {/* App Pages */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">App Pages</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/home" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/calculators" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Calculators
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/neapolitan" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Neapolitan Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculators/teglia" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Teglia Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/my-recipes" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    My Recipes
                  </Link>
                </li>
              </ul>
            </section>
            
            {/* Legal Pages */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Legal Pages</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/terms" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </section>
            
            {/* Language Versions */}
            <section>
              <h2 className="text-xl font-montserrat font-bold mb-4 text-[#77BFA3]">Language Versions</h2>
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
                  <Link to="/fr/sitemap" className="text-[#F5E9D7] hover:text-[#77BFA3] transition-colors">
                    Plan du site (FR)
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
