
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, Droplet, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipeShare } from "./RecipeShare";

interface RecipeHeaderProps {
  recipe: any;
  onDelete: () => void;
}

export function RecipeHeader({
  recipe,
  onDelete
}: RecipeHeaderProps) {
  return <>
      <div className="flex items-center justify-between mt-16 md:mt-0">
        <h1 className="text-cream text-2xl font-medium mx-px px-[16px]">{recipe.nom}</h1>
        <div className="flex items-center gap-2">
          <RecipeShare recipe={recipe} />
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 px-[16px]">
        <div className="flex items-center gap-2 text-cream/80">
          <span>
            {recipe.dough_type !== 'direct' ? `${recipe.dough_type.charAt(0).toUpperCase() + recipe.dough_type.slice(1)} ${recipe.preferment_flour}%` : 'Direct'}
          </span>
          <span>-</span>
          <span className="flex items-center gap-1">
            <Droplet className="h-4 w-4" /> {recipe.hydration}%
          </span>
          <span>-</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.phases.reduce((acc: number, phase: any) => acc + phase.duration, 0)}h
          </span>
        </div>
        <p className="text-cream/60 text-sm">
          {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)} - Créé le{" "}
          {format(new Date(recipe.created_at), "dd/MM/yyyy", {
          locale: fr
        })}
        </p>
      </div>
    </>;
}
