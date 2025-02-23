
import { useRef, useState } from "react";
import { Camera, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Photo {
  id: string;
  url: string;
  storage_path: string;
}

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

    if (photos.length + files.length > 6) {
      toast({
        title: "Erreur",
        description: "Vous ne pouvez pas ajouter plus de 6 photos",
        variant: "destructive",
      });
      return;
    }

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

        const { error: insertError } = await supabase
          .from('photos')
          .insert({
            recipe_id: recipeId,
            url: publicUrl,
            storage_path: filePath
          });

        if (insertError) throw insertError;

        newPhotos.push(publicUrl);
      }

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
      const { data: photoData, error: fetchError } = await supabase
        .from('photos')
        .select('storage_path')
        .eq('url', photoUrl)
        .single();

      if (fetchError) throw fetchError;

      if (photoData) {
        const { error: deleteStorageError } = await supabase.storage
          .from('recipe-photos')
          .remove([photoData.storage_path]);

        if (deleteStorageError) throw deleteStorageError;
      }

      const { error: deleteDbError } = await supabase
        .from('photos')
        .delete()
        .eq('url', photoUrl);

      if (deleteDbError) throw deleteDbError;

      const newPhotos = photos.filter(p => p !== photoUrl);
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
                  loading="lazy"
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

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 bg-basil text-slate hover:bg-basil/90"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || photos.length >= 6}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          {isUploading ? "Chargement..." : "Ajouter des photos"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="bg-basil text-slate hover:bg-basil/90"
          onClick={() => alert("Fonctionnalité à venir")}
          disabled={isUploading || photos.length >= 6}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

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
