
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

interface RecipeShareProps {
  recipe: any;
}

export function RecipeShare({ recipe }: RecipeShareProps) {
  const isMobile = useIsMobile();

  const formatRecipeText = () => {
    let text = `🍕 ${recipe.nom}\n\n`;
    
    // Ajouter les informations de base
    text += `Type: ${recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)}\n`;
    text += `Hydratation: ${recipe.hydration}%\n`;
    
    if (recipe.dough_type !== 'direct') {
      text += `Pré-ferment: ${recipe.dough_type.charAt(0).toUpperCase() + recipe.dough_type.slice(1)} (${recipe.preferment_flour}%)\n`;
    }
    
    // Ajouter la durée totale
    const totalDuration = recipe.phases.reduce((acc: number, phase: any) => acc + phase.duration, 0);
    text += `Durée totale: ${totalDuration}h\n\n`;
    
    // Ajouter la description si elle existe
    if (recipe.description && recipe.description.trim()) {
      text += `📝 Description:\n${recipe.description}\n\n`;
    }
    
    // Ajouter les phases
    if (recipe.phases && recipe.phases.length > 0) {
      text += `⏱️ Phases:\n`;
      recipe.phases.forEach((phase: any, index: number) => {
        text += `${index + 1}. ${phase.duration}h à ${phase.temperature}°C\n`;
      });
    }
    
    text += "\n🔗 Partagé depuis Pizzametrix";
    
    return text;
  };

  const handleShare = async () => {
    const recipeText = formatRecipeText();
    
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: `Recette ${recipe.nom}`,
          text: recipeText,
        });
        toast({
          description: "Recette partagée avec succès",
        });
      } catch (error) {
        console.error("Erreur lors du partage:", error);
        // L'utilisateur a annulé ou une erreur s'est produite
        if ((error as Error).name !== 'AbortError') {
          toast({
            title: "Erreur",
            description: "Impossible de partager la recette",
            variant: "destructive",
          });
        }
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      try {
        await navigator.clipboard.writeText(recipeText);
        toast({
          description: "Recette copiée dans le presse-papier",
        });
      } catch (error) {
        console.error("Erreur lors de la copie:", error);
        toast({
          title: "Erreur",
          description: "Impossible de copier la recette",
          variant: "destructive",
          });
        }
      }
    };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-cream border-cream/20 hover:bg-cream/10 hover:text-basil"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      {isMobile ? "Partager" : "Exporter"}
    </Button>
  );
}
