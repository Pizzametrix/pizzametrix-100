
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/layouts/Sidebar";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-slate">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-cream mb-4">
            Bienvenue sur Pizzametrix
          </h1>
          <p className="text-cream/80">
            Commencez à créer vos délicieuses recettes de pizza
          </p>
        </div>
      </main>
    </div>
  );
}
