
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick: (photo: string) => void;
  onDeletePhoto: (photo: string) => void;
}

export function PhotoGrid({ photos, onPhotoClick, onDeletePhoto }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="relative aspect-square cursor-pointer transition-transform hover:scale-105"
          onClick={() => onPhotoClick(photo)}
        >
          <img
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              onDeletePhoto(photo);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
