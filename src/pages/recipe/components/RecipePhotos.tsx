import { useRef, useState } from "react";
import { Camera, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RecipePhotosProps {
  recipeId: string;
  photos: string[];
}

export function RecipePhotos({ recipeId, photos: initialPhotos }: RecipePhotosProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      const newPhotos = [...photos];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${recipeId}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('recipe-photos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('recipe-photos')
          .getPublicUrl(filePath);

        newPhotos.push(publicUrl);
      }

      const { error: updateError } = await supabase
        .from('recettes')
        .update({ photos: newPhotos })
        .eq('id', recipeId);

      if (updateError) throw updateError;

      setPhotos(newPhotos);
      toast({
        description: "Photos ajoutées avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter les photos",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoUrl: string) => {
    try {
      const fileName = photoUrl.split('/').pop();
      if (!fileName) throw new Error("Nom de fichier invalide");

      const { error: deleteError } = await supabase.storage
        .from('recipe-photos')
        .remove([`${recipeId}/${fileName}`]);

      if (deleteError) throw deleteError;

      const newPhotos = photos.filter(p => p !== photoUrl);

      const { error: updateError } = await supabase
        .from('recettes')
        .update({ photos: newPhotos })
        .eq('id', recipeId);

      if (updateError) throw updateError;

      setPhotos(newPhotos);
      toast({
        description: "Photo supprimée",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la photo",
        variant: "destructive",
      });
    }
  };

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-cream/20 rounded-lg p-4 min-h-[200px]">
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="relative aspect-square cursor-pointer transition-transform hover:scale-105"
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(photo);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-cream/60 text-center">Ajoutez des photos de votre recette ici</p>
          </div>
        )}
      </div>

      {photos.length < 6 && (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-basil text-slate hover:bg-basil/90"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            {isUploading ? "Chargement..." : "Ajouter des photos"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-basil text-slate hover:bg-basil/90"
            onClick={() => alert("Fonctionnalité à venir")}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Photo agrandie"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
