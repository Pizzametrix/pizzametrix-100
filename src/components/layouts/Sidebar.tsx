
import { Menu, LogOut, X, Calculator, Home, Book, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggle, close } = useSidebarStore();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
      return;
    }
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    close();
  };

  const getTitle = () => {
    if (location.pathname === "/profile") {
      return "Mon Profil";
    }
    if (location.pathname.includes('/my-recipes/')) {
      return "Ma recette";
    }
    if (location.pathname === "/calculators/neapolitan") {
      return "Pizza Napolitaine";
    }
    if (location.pathname === "/calculators/teglia") {
      return "Pizza Teglia";
    }
    if (location.pathname === "/my-recipes") {
      return "Mes recettes";
    }
    if (location.pathname === "/calculators") {
      return "Calculatrices";
    }
    return <>Pizzametri<span className="text-[#77BFA3]">x</span></>;
  };

  const isActiveRoute = (path: string) => {
    if (path === '/calculators' && location.pathname.includes('/calculators')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <>
      <div className="md:hidden w-full bg-slate border-b border-cream/10 p-4 flex justify-between items-center fixed top-0 z-50">
        <h1 className="font-montserrat font-bold text-xl text-[#F5E9D7] truncate pr-2">{getTitle()}</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5 shrink-0"
          onClick={toggle}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div 
        className={`
          fixed top-0 left-0 h-screen w-64 bg-slate border-r border-cream/10
          transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          pt-20 md:pt-4 p-4
        `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="hidden md:block">
              <Link to="/home" className="inline-block">
                <h1 className="font-montserrat font-bold text-2xl mb-8 hover:text-[#77BFA3] transition-colors">
                  <span className="text-[#F5E9D7]">Pizzametri</span>
                  <span className="text-[#77BFA3]">x</span>
                </h1>
              </Link>
            </div>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start hover:text-terracotta hover:bg-cream/5 ${
                  isActiveRoute('/home') ? 'bg-cream/10 text-terracotta' : 'text-[#F5E9D7]'
                }`}
                onClick={() => handleNavigation('/home')}
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Accueil</span>
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start hover:text-terracotta hover:bg-cream/5 ${
                  isActiveRoute('/profile') ? 'bg-cream/10 text-terracotta' : 'text-[#F5E9D7]'
                }`}
                onClick={() => handleNavigation('/profile')}
              >
                <UserRound className="mr-2 h-4 w-4" />
                <span>Mon Profil</span>
              </Button>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start hover:text-terracotta hover:bg-cream/5 ${
                    isActiveRoute('/calculators') ? 'bg-cream/10 text-terracotta' : 'text-[#F5E9D7]'
                  }`}
                  onClick={() => handleNavigation('/calculators')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculatrices</span>
                </Button>
                <div className="pl-6 space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start hover:text-terracotta hover:bg-cream/5 ${
                      location.pathname === '/calculators/neapolitan' ? 'bg-cream/10 text-terracotta' : 'text-[#F5E9D7]/80'
                    }`}
                    onClick={() => handleNavigation('/calculators/neapolitan')}
                  >
                    <span>Pizza Napolitaine</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start hover:text-terracotta hover:bg-cream/5 ${
                      location.pathname === '/calculators/teglia' ? 'bg-cream/10 text-terracotta' : 'text-[#F5E9D7]/80'
                    }`}
                    onClick={() => handleNavigation('/calculators/teglia')}
                  >
                    <span>Pizza Teglia</span>
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                className={`w-full justify-start hover:text-terracotta hover:bg-cream/5 ${
                  isActiveRoute('/my-recipes') ? 'bg-cream/10 text-terracotta' : 'text-[#F5E9D7]'
                }`}
                onClick={() => handleNavigation('/my-recipes')}
              >
                <Book className="mr-2 h-4 w-4" />
                <span>Mes recettes</span>
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={close}
        />
      )}
    </>
  );
};
