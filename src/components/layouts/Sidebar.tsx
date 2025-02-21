
import { Menu, LogOut, X, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSidebarStore } from "@/store/useSidebarStore";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { isOpen, toggle } = useSidebarStore();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
      return;
    }
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  return (
    <>
      {/* Barre de navigation mobile */}
      <div className="md:hidden w-full bg-slate border-b border-cream/10 p-4 flex justify-between items-center fixed top-0 z-50">
        <h1 className="font-montserrat font-bold text-xl text-cream">Pizzametrix</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-cream hover:text-terracotta hover:bg-cream/5"
          onClick={toggle}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Menu latéral */}
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
              <h1 className="font-montserrat font-bold text-2xl text-cream mb-8">Pizzametrix</h1>
            </div>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-cream hover:text-terracotta hover:bg-cream/5"
                onClick={() => navigate('/calculators')}
              >
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculatrices</span>
              </Button>
            </nav>
          </div>
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start text-cream hover:text-terracotta hover:bg-cream/5"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay pour fermer le menu sur mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggle}
        />
      )}
    </>
  );
};
