
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const Sidebar = () => {
  const navigate = useNavigate();

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
    <div className="w-full md:w-64 h-auto md:h-screen bg-slate border-b md:border-b-0 md:border-r border-cream/10 p-4 flex flex-row md:flex-col justify-between items-center md:items-start">
      <div>
        <h1 className="font-montserrat font-bold text-xl md:text-2xl text-cream mb-0 md:mb-8">Pizzametrix</h1>
      </div>
      <div>
        <Button
          variant="ghost"
          className="w-auto md:w-full justify-start text-cream hover:text-terracotta hover:bg-cream/5"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Déconnexion</span>
        </Button>
      </div>
    </div>
  );
}
