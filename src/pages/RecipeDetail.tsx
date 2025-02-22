
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Droplet, Clock, Camera, ChefHat, Edit2, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Sidebar } from "@/components/layouts/Sidebar";
import { RecipeDetailParameters } from "./recipe/components/RecipeDetailParameters";
import { RecipeDetailPreferment } from "./recipe/components/RecipeDetailPreferment";
import { RecipeDetailPhases } from "./recipe/components/RecipeDetailPhases";
import { RecipePhotos } from "./recipe/components/RecipePhotos";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const { data, error } = await supabase
        .from('recettes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRecipe(data);
      setDescription(data.description || "");
    } catch (error) {
      console.error("Erreur lors du chargement de la recette:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la recette",
        variant: "destructive",
      });
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

  if (!recipe) return null;

  return (
    <div className="flex min-h-screen bg-slate">
      <Sidebar />
      <div className="flex-1">
        <div className="md:ml-64 min-h-screen">
          <main className="p-4 pb-24 space-y-6 max-w-2xl mx-auto">
            <h1 className="text-cream text-2xl font-medium mt-4 md:mt-0">{recipe.nom}</h1>

            {/* En-tête de la recette */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cream/80">
                <span>{recipe.dough_type !== 'direct' ? `${recipe.dough_type.charAt(0).toUpperCase() + recipe.dough_type.slice(1)} ${recipe.preferment_flour}%` : 'Direct'}</span>
                <span className="flex items-center gap-1">
                  <Droplet className="h-4 w-4" /> {recipe.hydration}%
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 
                  {recipe.phases.reduce((acc: number, phase: any) => acc + phase.duration, 0)}h
                </span>
              </div>
              <p className="text-cream/60 text-sm">
                {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)} - Créé le {format(new Date(recipe.created_at), "dd/MM/yyyy", { locale: fr })}
              </p>
            </div>

            {/* Section photos */}
            <RecipePhotos recipeId={id} photos={recipe.photos || []} />

            {/* Section description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-cream flex items-center gap-2">
                  <Edit2 className="h-5 w-5 text-terracotta" /> Notes
                </h2>
                {isEditingDescription ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cream hover:text-terracotta hover:bg-cream/5"
                    onClick={handleSaveDescription}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cream hover:text-terracotta hover:bg-cream/5"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditingDescription ? (
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/5 border-cream/10 text-cream resize-none"
                  placeholder="Ajoutez vos notes ici..."
                />
              ) : (
                <p className="text-cream/80 min-h-[4rem]">
                  {description || "Aucune note"}
                </p>
              )}
            </div>

            {/* Section paramètres */}
            <RecipeDetailParameters recipe={recipe} />

            {/* Section préferment */}
            {recipe.dough_type !== 'direct' && (
              <RecipeDetailPreferment recipe={recipe} />
            )}

            {/* Section phases */}
            <RecipeDetailPhases phases={recipe.phases} />
          </main>
        </div>
      </div>
    </div>
  );
}
