
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Sidebar } from "@/components/layouts/Sidebar";
import { RecipeDetailParameters } from "./recipe/components/RecipeDetailParameters";
import { RecipeDetailPreferment } from "./recipe/components/RecipeDetailPreferment";
import { RecipeDetailPhases } from "./recipe/components/RecipeDetailPhases";
import { RecipePhotos } from "./recipe/components/RecipePhotos";
import { DeleteRecipeDialog } from "./recipe/components/DeleteRecipeDialog";
import { RecipeDetailSkeleton } from "./recipe/components/RecipeDetailSkeleton";
import { RecipeDescription } from "./recipe/components/RecipeDescription";
import { RecipeHeader } from "./recipe/components/RecipeHeader";

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
      navigate('/mes-recettes');
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
      navigate('/mes-recettes');
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
      <div className="flex-1">
        <div className="md:ml-64 min-h-screen">
          <main className="p-4 pb-24 space-y-6 max-w-2xl mx-auto">
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
          </main>
        </div>
      </div>

      <DeleteRecipeDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRecipe}
      />
    </div>
  );
}
