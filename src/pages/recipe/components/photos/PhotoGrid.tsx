
import { useEffect, useState } from "react";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick: (photo: string) => void;
  onDeletePhoto: (photo: string) => void;
}

export function PhotoGrid({ photos, onPhotoClick, onDeletePhoto }: PhotoGridProps) {
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

  const handleDelete = (e: React.MouseEvent, photo: string) => {
    e.stopPropagation();
    onDeletePhoto(photo);
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
          {errorImages[index] && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-700/30 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-terracotta mb-2"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
              <p className="text-xs text-cream">Erreur de chargement</p>
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
          
          {loadedImages[index] && (
            <button
              onClick={(e) => handleDelete(e, photo)}
              className="absolute top-2 right-2 p-1 bg-slate/80 rounded-full text-cream hover:text-terracotta hover:bg-slate opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
              aria-label="Supprimer la photo"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
