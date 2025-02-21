
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Sidebar = () => {
  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    // La logique de déconnexion sera ajoutée plus tard
  };

  return (
    <div className="w-64 h-screen bg-slate border-r border-cream/10 p-4 flex flex-col justify-between">
      <div>
        <h1 className="font-montserrat font-bold text-2xl text-cream mb-8">Pizzametrix</h1>
      </div>
      <div>
        <Button
          variant="ghost"
          className="w-full justify-start text-cream hover:text-terracotta hover:bg-cream/5"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};
