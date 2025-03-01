
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/layouts/Sidebar";
import { RecipeDetailParameters } from "./recipe/components/RecipeDetailParameters";
import { RecipeDetailPreferment } from "./recipe/components/RecipeDetailPreferment";
import { RecipeDetailPhases } from "./recipe/components/RecipeDetailPhases";
import { RecipePhotos } from "./recipe/components/RecipePhotos";
import { DeleteRecipeDialog } from "./recipe/components/DeleteRecipeDialog";
import { RecipeDetailSkeleton } from "./recipe/components/RecipeDetailSkeleton";
import { RecipeDescription } from "./recipe/components/RecipeDescription";
import { RecipeHeader } from "./recipe/components/RecipeHeader";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { LazyImage } from "@/services/landingAssetsService";

// Ici, nous allons uniquement exporter le LazyImage pour qu'il soit disponible aux composants enfants
// qui gèrent les photos de recettes

export { LazyImage };

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recettes')
        .select(`
          *,
          photos (
            url
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      const recipeWithPhotos = {
        ...data,
        photos: data.photos?.map((photo: any) => photo.url) || []
      };
      
      setRecipe(recipeWithPhotos);
      setDescription(recipeWithPhotos.description || "");
    } catch (error) {
      console.error("Erreur lors du chargement de la recette:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la recette",
        variant: "destructive",
      });
      navigate('/my-recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDescription = async () => {
    try {
      const { error } = await supabase
        .from('recettes')
        .update({ description })
        .eq('id', id);

      if (error) throw error;

      setIsEditingDescription(false);
      toast({
        description: "Description mise à jour",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la description",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      const { error } = await supabase
        .from('recettes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        description: "Recette supprimée",
      });
      navigate('/my-recipes');
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la recette",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <RecipeDetailSkeleton />;
  }

  if (!recipe) return null;

  return (
    <div className="flex min-h-screen bg-slate">
      <Sidebar />
      <div className="flex-1 md:pl-64">
        <main className="container mx-auto p-4 pb-24">
          <div className="flex items-center mb-6 sticky top-0 z-20 bg-slate py-3 -mx-4 px-4 shadow-md">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/my-recipes')}
              className="mr-2 text-cream hover:text-cream hover:bg-slate-700 flex items-center justify-center"
              aria-label="Retour aux recettes"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <h1 className="text-xl font-bold text-cream font-montserrat">Ma Recette</h1>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-8">
            <RecipeHeader 
              recipe={recipe} 
              onDelete={() => setIsDeleteDialogOpen(true)} 
            />

            <RecipePhotos 
              recipeId={id} 
              photos={recipe.photos} 
            />

            <RecipeDescription
              description={description}
              isEditing={isEditingDescription}
              onEdit={() => setIsEditingDescription(true)}
              onChange={setDescription}
              onSave={handleSaveDescription}
            />

            <div className="space-y-4">
              <RecipeDetailParameters recipe={recipe} />
            </div>

            {recipe.dough_type !== 'direct' && (
              <div className="space-y-4">
                <RecipeDetailPreferment recipe={recipe} />
              </div>
            )}

            <div className="space-y-4">
              <RecipeDetailPhases phases={recipe.phases} />
            </div>
          </div>
        </main>
      </div>

      <DeleteRecipeDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRecipe}
      />
      <Toaster />
    </div>
  );
}
