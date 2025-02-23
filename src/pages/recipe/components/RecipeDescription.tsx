
import { Edit2, NotebookPen, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeDescriptionProps {
  description: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
}

export function RecipeDescription({
  description,
  isEditing,
  onEdit,
  onChange,
  onSave,
}: RecipeDescriptionProps) {
  return (
    <Card className="bg-slate border-cream/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-cream flex items-center gap-2">
            <NotebookPen className="h-5 w-5 text-terracotta" /> Notes
          </CardTitle>
          {isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-cream hover:text-terracotta hover:bg-cream/5"
              onClick={onSave}
            >
              <Save className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-cream hover:text-terracotta hover:bg-cream/5"
              onClick={onEdit}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-cream/10 rounded-md p-4">
          {isEditing ? (
            <Textarea
              value={description}
              onChange={(e) => onChange(e.target.value)}
              className="bg-white/5 border-cream/10 text-cream resize-none"
              placeholder="Ajoutez vos notes ici..."
            />
          ) : (
            <p className="text-cream/80 min-h-[4rem]">
              {description || "Aucune note"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
