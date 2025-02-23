import { useRef, useState } from "react";
import { PhotoGrid } from "./photos/PhotoGrid";
import { PhotoActions } from "./photos/PhotoActions";
import { PhotoModal } from "./photos/PhotoModal";
import { usePhotos } from "./photos/usePhotos";
import { useToast } from "@/hooks/use-toast";
interface RecipePhotosProps {
  recipeId: string;
  photos: string[];
}
export function RecipePhotos({
  recipeId,
  photos: initialPhotos
}: RecipePhotosProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const {
    photos,
    isUploading,
    uploadPhotos,
    deletePhoto
  } = usePhotos(recipeId, initialPhotos);
  const {
    toast
  } = useToast();
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Vérification immédiate du nombre total de photos
    if (photos.length + files.length > 6) {
      event.preventDefault();

      // Forcer l'affichage du toast avec une durée plus longue
      toast({
        title: "Limite de photos atteinte",
        description: `Impossible d'ajouter ${files.length} photos. La limite est de 6 photos au total (${6 - photos.length} restantes).`,
        variant: "destructive",
        duration: 5000 // 5 secondes
      });

      // Reset l'input file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    await uploadPhotos(files);
    // Reset l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <div className="space-y-4">
      <div className="border-2 border-dashed border-cream/20 rounded-lg p-4">
        <div className="space-y-4">
          {photos.length > 0 ? <PhotoGrid photos={photos} onPhotoClick={setSelectedPhoto} onDeletePhoto={deletePhoto} /> : <div className="flex items-center justify-center h-[200px]">
              <p className="text-cream/60 text-center px-[40px]">Ajoutez les photos de votre pizza ici</p>
            </div>}

          <PhotoActions onAddClick={() => {
          if (photos.length >= 6) {
            toast({
              title: "Limite atteinte",
              description: "Vous avez atteint la limite de 6 photos",
              variant: "destructive",
              duration: 5000 // 5 secondes
            });
            return;
          }
          fileInputRef.current?.click();
        }} isUploading={isUploading} isDisabled={isUploading || photos.length >= 6} />
        </div>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileChange} />

      <PhotoModal photo={selectedPhoto} photos={photos} onClose={() => setSelectedPhoto(null)} onDelete={deletePhoto} />
    </div>;
}