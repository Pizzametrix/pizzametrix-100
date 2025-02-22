
import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

interface RecipePhotosProps {
  recipeId: string;
  photos: string[];
}

export function RecipePhotos({ recipeId, photos: initialPhotos }: RecipePhotosProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <div className="space-y-4">
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleDeletePhoto(photo)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="flex-1 text-cream hover:bg-terracotta hover:text-cream"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          {isUploading ? "Chargement..." : "Ajouter des photos"}
        </Button>
        <Button
          variant="ghost"
          className="text-cream hover:bg-terracotta hover:text-cream"
          onClick={() => alert("Fonctionnalité à venir")}
          disabled={isUploading}
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
    </div>
  );
}
