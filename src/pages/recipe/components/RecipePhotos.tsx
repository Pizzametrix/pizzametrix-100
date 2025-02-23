
import { useRef, useState } from "react";
import { PhotoGrid } from "./photos/PhotoGrid";
import { PhotoActions } from "./photos/PhotoActions";
import { PhotoModal } from "./photos/PhotoModal";
import { usePhotos } from "./photos/usePhotos";

interface RecipePhotosProps {
  recipeId: string;
  photos: string[];
}

export function RecipePhotos({ recipeId, photos: initialPhotos }: RecipePhotosProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { photos, isUploading, uploadPhotos, deletePhoto } = usePhotos(recipeId, initialPhotos);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    await uploadPhotos(files);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-cream/20 rounded-lg p-4 min-h-[200px]">
        {photos.length > 0 ? (
          <PhotoGrid
            photos={photos}
            onPhotoClick={setSelectedPhoto}
            onDeletePhoto={deletePhoto}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-cream/60 text-center">Ajoutez des photos de votre recette ici</p>
          </div>
        )}
      </div>

      <PhotoActions
        onAddClick={() => fileInputRef.current?.click()}
        isUploading={isUploading}
        isDisabled={isUploading || photos.length >= 6}
      />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
