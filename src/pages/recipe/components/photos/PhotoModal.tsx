
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface PhotoModalProps {
  photo: string | null;
  photos: string[];
  onClose: () => void;
  onDelete?: (photo: string) => void;
}

export function PhotoModal({ photo, photos, onClose, onDelete }: PhotoModalProps) {
  const currentIndex = photo ? photos.indexOf(photo) : -1;

  const showPrevious = () => {
    if (currentIndex > 0) {
      const previousPhoto = photos[currentIndex - 1];
      // Mettre à jour la photo sélectionnée via un callback
      onClose();
      setTimeout(() => document.dispatchEvent(new CustomEvent('selectPhoto', { detail: previousPhoto })), 0);
    }
  };

  const showNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextPhoto = photos[currentIndex + 1];
      // Mettre à jour la photo sélectionnée via un callback
      onClose();
      setTimeout(() => document.dispatchEvent(new CustomEvent('selectPhoto', { detail: nextPhoto })), 0);
    }
  };

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6 overflow-hidden bg-slate/95 border-cream/10">
        <div className="relative">
          {photo && (
            <>
              <div className="absolute top-0 right-0 z-10">
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-cream hover:text-terracotta hover:bg-cream/5"
                    onClick={() => onDelete(photo)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-cream hover:text-terracotta hover:bg-cream/5"
                  onClick={showPrevious}
                  disabled={currentIndex <= 0}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <img
                  src={photo}
                  alt="Photo agrandie"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-cream hover:text-terracotta hover:bg-cream/5"
                  onClick={showNext}
                  disabled={currentIndex >= photos.length - 1}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
