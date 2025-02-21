
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ImageUploadProps {
  bucketName: string;
  imagePath: string;
  onUploadComplete: (url: string) => void;
}

export function ImageUpload({ bucketName, imagePath, onUploadComplete }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(imagePath, file, {
          upsert: true,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(imagePath);

      onUploadComplete(publicUrl);
      
      toast({
        title: "Image téléchargée avec succès",
        description: "L'image a été mise à jour",
      });
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur lors du téléchargement",
        description: "Impossible de télécharger l'image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id={`file-upload-${imagePath}`}
      />
      <label
        htmlFor={`file-upload-${imagePath}`}
        className="cursor-pointer"
      >
        <Button variant="outline" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Téléchargement...
            </>
          ) : (
            "Changer l'image"
          )}
        </Button>
      </label>
    </div>
  );
}
