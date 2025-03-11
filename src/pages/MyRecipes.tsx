
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { RecipeCard } from "./mes-recettes/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          toast({
            title: "Non connecté",
            description: "Veuillez vous connecter pour voir vos recettes",
            variant: "destructive"
          });
          return;
        }

        // Optimisation: récupérer uniquement la première photo par recette pour améliorer les performances
        const { data, error } = await supabase
          .from('recettes')
          .select(`
            id,
            nom,
            type,
            dough_type,
            preferment_flour,
            hydration,
            phases,
            created_at,
            photos:photos(url)
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
  }, [toast, navigate]);

  const handleNewRecipe = () => {
    navigate('/calculators');
  };

  return (
    <div className="min-h-screen flex bg-slate">
      <Sidebar />
      <div className="flex-1">
        <div className="md:pl-64">
          <main className="w-full max-w-2xl mx-auto p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-montserrat font-bold text-2xl text-cream">
                Mes recettes
              </h1>
              <Button 
                onClick={handleNewRecipe}
                className="bg-basil hover:bg-basil/90 text-cream"
                size="sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouvelle recette
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-white/5 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-cream/80 mb-4">Vous n'avez pas encore de recettes enregistrées.</p>
                <Button 
                  onClick={handleNewRecipe}
                  className="bg-basil hover:bg-basil/90 text-cream"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer ma première recette
                </Button>
              </div>
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
