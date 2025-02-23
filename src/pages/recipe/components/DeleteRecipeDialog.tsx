
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogOverlay } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteRecipeDialog({ open, onOpenChange, onConfirm }: DeleteRecipeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogOverlay />
      <AlertDialogContent 
        className="bg-slate border-cream/10"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-cream">Supprimer la recette</AlertDialogTitle>
          <AlertDialogDescription className="text-cream/60">
            Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/5 text-cream hover:bg-white/10 hover:text-cream border-cream/10">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
