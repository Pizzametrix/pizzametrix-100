
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PhotoModalProps {
  photo: string | null;
  onClose: () => void;
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
        {photo && (
          <img
            src={photo}
            alt="Photo agrandie"
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
