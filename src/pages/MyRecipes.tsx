
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { RecipeCard } from "./mes-recettes/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from('recettes')
          .select(`
            *,
            photos (
              url
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const recipesWithPhotos = data?.map(recipe => ({
          ...recipe,
          photos: recipe.photos?.map(photo => photo.url) || []
        })) || [];
        setRecipes(recipesWithPhotos);
      } catch (error) {
        console.error("Erreur lors du chargement des recettes:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos recettes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [toast]);

  return (
    <div className="min-h-screen flex bg-slate">
      <Sidebar />
      <div className="flex-1">
        <div className="md:pl-64">
          <main className="w-full max-w-2xl mx-auto p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
            <h1 className="hidden md:block font-montserrat font-bold text-2xl text-cream mb-8">
              Mes recettes
            </h1>
            {loading ? (
              <p className="text-cream text-center">Chargement de vos recettes...</p>
            ) : recipes.length === 0 ? (
              <p className="text-cream text-center">Vous n'avez pas encore de recettes enregistrées.</p>
            ) : (
              <div className="space-y-4">
                {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
