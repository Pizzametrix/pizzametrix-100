
import { Menu, LogOut, X, Calculator, Home, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { isOpen, toggle, close } = useSidebarStore();
  const [recipeName, setRecipeName] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeName = async () => {
      if (location.pathname.startsWith('/mes-recettes/') && params.id) {
        try {
          const { data, error } = await supabase
            .from('recettes')
            .select('nom')
            .eq('id', params.id)
            .single();

          if (error) throw error;
          setRecipeName(data.nom);
        } catch (error) {
          console.error("Erreur lors du chargement du nom de la recette:", error);
        }
      } else {
        setRecipeName(null);
      }
    };

    fetchRecipeName();
  }, [location.pathname, params.id]);

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
    if (recipeName) {
      return recipeName;
    }
    if (location.pathname === "/calculators/napolitaine") {
      return "Pizza Napolitaine";
    }
    if (location.pathname === "/mes-recettes") {
      return "Mes recettes";
    }
    return "Pizzametrix";
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
          fixed md:static top-0 left-0 h-full w-64 bg-slate border-r border-cream/10
          transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:h-screen
          pt-20 md:pt-4 p-4
        `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="hidden md:block">
              <h1 className="font-montserrat font-bold text-2xl text-[#F5E9D7] mb-8">{getTitle()}</h1>
            </div>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                onClick={() => handleNavigation('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Accueil</span>
              </Button>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                  onClick={() => handleNavigation('/calculators')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculatrices</span>
                </Button>
                <div className="pl-6 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#F5E9D7]/80 hover:text-terracotta hover:bg-cream/5 text-sm"
                    onClick={() => handleNavigation('/calculators/napolitaine')}
                  >
                    <span>Pizza Napolitaine</span>
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
                onClick={() => handleNavigation('/mes-recettes')}
              >
                <Book className="mr-2 h-4 w-4" />
                <span>Mes recettes</span>
              </Button>
            </nav>
          </div>
          <div>
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
