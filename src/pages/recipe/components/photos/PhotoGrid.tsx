
import { useEffect } from "react";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick: (photo: string) => void;
  onDeletePhoto: (photo: string) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  useEffect(() => {
    const handleSelectPhoto = (event: CustomEvent<string>) => {
      onPhotoClick(event.detail);
    };

    document.addEventListener('selectPhoto', handleSelectPhoto as EventListener);
    return () => {
      document.removeEventListener('selectPhoto', handleSelectPhoto as EventListener);
    };
  }, [onPhotoClick]);

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
        </div>
      ))}
    </div>
  );
}
