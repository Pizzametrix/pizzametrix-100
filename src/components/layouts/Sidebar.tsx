
import { Menu, LogOut, X, Calculator, Home, Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggle, close } = useSidebarStore();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [pseudonyme, setPseudonyme] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Get avatar URL if exists
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(`${user.id}`);

      if (publicUrl) {
        setAvatarUrl(publicUrl);
      }

      // Get pseudonyme
      const { data } = await supabase
        .from('utilisateurs')
        .select('pseudonyme')
        .eq('id', user.id)
        .single();

      if (data) {
        setPseudonyme(data.pseudonyme);
      }
    }
  };

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
    if (location.pathname === '/profil') {
      return "Mon profil";
    }
    if (location.pathname.includes('/mes-recettes/')) {
      return "Ma recette";
    }
    if (location.pathname === "/calculators/napolitaine") {
      return "Pizza Napolitaine";
    }
    if (location.pathname === "/calculators/teglia") {
      return "Pizza Teglia";
    }
    if (location.pathname === "/mes-recettes") {
      return "Mes recettes";
    }
    if (location.pathname === "/calculators") {
      return "Calculatrices";
    }
    return <>Pizzametri<span className="text-[#77BFA3]">x</span></>;
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
              <h1 className="font-montserrat font-bold text-2xl mb-8">
                <span className="text-[#F5E9D7]">Pizzametri</span>
                <span className="text-[#77BFA3]">x</span>
              </h1>
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
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#F5E9D7]/80 hover:text-terracotta hover:bg-cream/5 text-sm"
                    onClick={() => handleNavigation('/calculators/teglia')}
                  >
                    <span>Pizza Teglia</span>
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
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-[#F5E9D7] hover:text-terracotta hover:bg-cream/5"
              onClick={() => handleNavigation('/profil')}
            >
              <Avatar className="mr-2 h-4 w-4">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-cream text-basil/30">
                  <User className="h-2 w-2" />
                </AvatarFallback>
              </Avatar>
              <span>Mon profil</span>
            </Button>
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
