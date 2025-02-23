
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Clock, Droplet, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: {
    id: string;
    nom: string;
    type: string;
    dough_type: string;
    preferment_flour: number | null;
    hydration: number;
    phases: any[];
    created_at: string;
    photos: string[];
  };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();

  const getTotalDuration = (phases: any[]) => {
    return phases.reduce((acc, phase) => acc + phase.duration, 0);
  };

  const getPrefermentText = () => {
    if (recipe.dough_type === 'direct') return 'Direct';
    return recipe.dough_type.charAt(0).toUpperCase() + recipe.dough_type.slice(1);
  };

  const DefaultImagePlaceholder = () => (
    <div className="w-full h-full bg-slate flex flex-col items-center justify-center">
      <Camera className="w-8 h-8 text-cream mb-2" />
      <p className="text-cream text-sm font-semibold">
        Pizzametri<span className="text-basil">x</span>
      </p>
    </div>
  );

  return (
    <Card 
      className="flex h-24 overflow-hidden bg-white/5 border-cream/10 cursor-pointer hover:bg-white/10 transition-colors"
      onClick={() => navigate(`/mes-recettes/${recipe.id}`)}
    >
      <div className="w-[100px] min-w-[100px] h-full">
        {recipe.photos?.[0] ? (
          <img
            src={recipe.photos[0]}
            alt={recipe.nom}
            className="w-full h-full object-cover"
          />
        ) : (
          <DefaultImagePlaceholder />
        )}
      </div>
      <div className="flex-1 p-3 text-left">
        <h3 className="font-semibold text-lg text-cream mb-0.5 truncate">{recipe.nom}</h3>
        <div className="text-sm text-cream/80 space-y-0.5">
          <p className="flex items-center gap-2">
            <span>{getPrefermentText()}</span>
            <span className="text-cream/60">-</span>
            <span className="flex items-center gap-1">
              <Droplet className="h-4 w-4" /> {recipe.hydration}%
            </span>
            <span className="text-cream/60">-</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {getTotalDuration(recipe.phases)}h
            </span>
          </p>
          <p className="text-cream/60 text-xs">
            {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)} - Créé le {format(new Date(recipe.created_at), "dd/MM/yyyy", { locale: fr })}
          </p>
        </div>
      </div>
    </Card>
  );
}
