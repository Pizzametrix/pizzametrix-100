
import { useEffect, useState } from "react";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick: (photo: string) => void;
  onDeletePhoto: (photo: string) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handleSelectPhoto = (event: CustomEvent<string>) => {
      onPhotoClick(event.detail);
    };

    document.addEventListener('selectPhoto', handleSelectPhoto as EventListener);
    return () => {
      document.removeEventListener('selectPhoto', handleSelectPhoto as EventListener);
    };
  }, [onPhotoClick]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setErrorImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="relative aspect-square cursor-pointer transition-transform hover:scale-105"
          onClick={() => onPhotoClick(photo)}
        >
          {!loadedImages[index] && !errorImages[index] && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-700/30 rounded-lg">
              <div className="w-8 h-8 border-2 border-cream/30 border-t-basil rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={photo}
            alt={`Photo ${index + 1}`}
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => handleImageLoad(index)}
            onError={() => handleImageError(index)}
          />
        </div>
      ))}
    </div>
  );
}
