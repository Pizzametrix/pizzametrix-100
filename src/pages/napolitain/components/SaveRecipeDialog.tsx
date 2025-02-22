
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SaveRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
}

export function SaveRecipeDialog({ open, onOpenChange, onSave }: SaveRecipeDialogProps) {
  const [recipeName, setRecipeName] = useState("");

  const handleSave = () => {
    if (recipeName.trim()) {
      onSave(recipeName.trim());
      setRecipeName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate border-cream/10 text-cream">
        <DialogHeader>
          <DialogTitle className="text-cream">Sauvegarder la recette</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              placeholder="Nom de la recette"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="bg-white/5 border-cream/10 text-cream placeholder:text-cream/50"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-cream hover:text-cream/80 hover:bg-white/5"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="bg-terracotta text-cream hover:bg-terracotta/90"
              disabled={!recipeName.trim()}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
