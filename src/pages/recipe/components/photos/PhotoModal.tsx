
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";

interface PhotoModalProps {
  photo: string | null;
  photos: string[];
  onClose: () => void;
  onDelete?: (photo: string) => void;
}

export function PhotoModal({ photo, photos, onClose, onDelete }: PhotoModalProps) {
  const currentIndex = photo ? photos.indexOf(photo) : -1;

  const handleDelete = () => {
    if (!photo || !onDelete) return;
    
    const nextPhoto = photos[currentIndex + 1] || photos[currentIndex - 1];
    onDelete(photo);
    
    if (!nextPhoto) {
      onClose();
    } else {
      onClose();
      setTimeout(() => document.dispatchEvent(new CustomEvent('selectPhoto', { detail: nextPhoto })), 0);
    }
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      const previousPhoto = photos[currentIndex - 1];
      onClose();
      setTimeout(() => document.dispatchEvent(new CustomEvent('selectPhoto', { detail: previousPhoto })), 0);
    }
  };

  const showNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextPhoto = photos[currentIndex + 1];
      onClose();
      setTimeout(() => document.dispatchEvent(new CustomEvent('selectPhoto', { detail: nextPhoto })), 0);
    }
  };

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl !p-0 !m-0 !border-0 !outline-none !ring-0 !shadow-none bg-slate/95">
        <div className="relative w-full h-full">
          {photo && (
            <>
              <div className="absolute w-full top-0 z-50 flex justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-slate/80 text-cream hover:text-terracotta hover:bg-slate"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-slate/80 text-cream hover:text-terracotta hover:bg-slate"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-slate/80 text-cream hover:text-terracotta hover:bg-slate"
                  onClick={showPrevious}
                  disabled={currentIndex <= 0}
                >
                  <ChevronLeft className="h-10 w-10" />
                </Button>

                <div className="w-full flex items-center justify-center p-6">
                  <img
                    src={photo}
                    alt="Photo agrandie"
                    className="w-full h-auto max-h-[80vh] object-contain !border-0 !outline-none !ring-0 !shadow-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-slate/80 text-cream hover:text-terracotta hover:bg-slate"
                  onClick={showNext}
                  disabled={currentIndex >= photos.length - 1}
                >
                  <ChevronRight className="h-10 w-10" />
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
