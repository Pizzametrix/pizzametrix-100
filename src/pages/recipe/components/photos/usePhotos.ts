
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function usePhotos(recipeId: string, initialPhotos: string[]) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [isUploading, setIsUploading] = useState(false);

  const uploadPhotos = async (files: FileList) => {
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

  const deletePhoto = async (photoUrl: string) => {
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

      setPhotos(photos.filter(p => p !== photoUrl));
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

  return {
    photos,
    isUploading,
    uploadPhotos,
    deletePhoto
  };
}
