
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LandingImageUploaderProps {
  onUploadSuccess?: () => void;
}

export function LandingImageUploader({ onUploadSuccess }: LandingImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [section, setSection] = useState<string>("hero");
  const [altText, setAltText] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !altText) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner un fichier et entrer un texte alternatif",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // 1. Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${section}/${crypto.randomUUID()}.${fileExt}`;
      
      // 2. Uploader le fichier
      const { error: uploadError } = await supabase.storage
        .from('landing_assets')
        .upload(fileName, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 3. Enregistrer les métadonnées
      const { error: insertError } = await supabase
        .from('landing_assets')
        .insert({
          storage_path: fileName,
          section,
          alt_text: altText,
          dimensions,
        });

      if (insertError) throw insertError;

      toast({
        title: "Upload réussi",
        description: "L'image a été téléchargée avec succès",
      });

      // Réinitialiser le formulaire
      setFile(null);
      setAltText("");
      setDimensions("");
      
      // Callback en cas de succès
      if (onUploadSuccess) onUploadSuccess();
      
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
      <h3 className="text-lg font-medium">Upload d'image pour la Landing Page</h3>
      
      <div className="grid gap-2">
        <Label htmlFor="section">Section</Label>
        <Select value={section} onValueChange={setSection}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hero">Hero</SelectItem>
            <SelectItem value="features">Fonctionnalités</SelectItem>
            <SelectItem value="calculator">Calculateur</SelectItem>
            <SelectItem value="testimonials">Témoignages</SelectItem>
            <SelectItem value="platforms">Plateformes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="file">Fichier image</Label>
        <Input 
          id="file" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="altText">Texte alternatif</Label>
        <Input 
          id="altText" 
          value={altText} 
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Description de l'image pour l'accessibilité"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="dimensions">Dimensions recommandées (optionnel)</Label>
        <Input 
          id="dimensions" 
          value={dimensions} 
          onChange={(e) => setDimensions(e.target.value)}
          placeholder="ex: 1200x800"
        />
      </div>
      
      <Button 
        onClick={handleUpload} 
        disabled={isUploading || !file || !altText}
        className="w-full"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Téléchargement...
          </>
        ) : (
          "Télécharger l'image"
        )}
      </Button>
    </div>
  );
}
