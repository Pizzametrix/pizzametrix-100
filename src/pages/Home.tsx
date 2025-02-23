
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
      <div className="flex-1">
        <div className="md:pl-64">
          <main className="w-full max-w-4xl mx-auto p-4 md:p-8 mt-16 md:mt-0">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-cream mb-4">
                Bienvenue sur Pizzametrix
              </h1>
              <p className="text-sm md:text-base text-cream/80">
                Commencez à créer vos délicieuses recettes de pizza
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
