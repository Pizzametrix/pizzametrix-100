import { Camera, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
interface PhotoActionsProps {
  onAddClick: () => void;
  isUploading: boolean;
  isDisabled: boolean;
}
export function PhotoActions({
  onAddClick,
  isUploading,
  isDisabled
}: PhotoActionsProps) {
  return <div className="flex gap-2 py-0 my-[6px]">
      <Button variant="secondary" size="sm" className="flex-1 bg-basil text-slate hover:bg-basil/90" onClick={onAddClick} disabled={isDisabled}>
        <ImagePlus className="h-4 w-4 mr-2" />
        {isUploading ? "Chargement..." : "Ajouter des photos"}
      </Button>
      <Button variant="secondary" size="sm" className="bg-basil text-slate hover:bg-basil/90" onClick={() => alert("Fonctionnalité à venir")} disabled={isDisabled}>
        <Camera className="h-4 w-4" />
      </Button>
    </div>;
}