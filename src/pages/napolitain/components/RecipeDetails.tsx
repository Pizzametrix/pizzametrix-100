
import { ImageUpload } from "@/components/ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";

interface RecipeDetailsProps {
  photos: string[];
  setPhotos: (photos: string[]) => void;
  description: string;
  setDescription: (description: string) => void;
}

export function RecipeDetails({
  photos,
  setPhotos,
  description,
  setDescription,
}: RecipeDetailsProps) {
  const handleAddPhoto = (url: string) => {
    if (photos.length < 6) {
      setPhotos([...photos, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-cream">Description de la recette</Label>
        <Textarea
          placeholder="Ajoutez vos notes personnelles..."
          className="bg-white/5 border-cream/10 text-cream placeholder:text-cream/50 min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cream">Photos ({photos.length}/6)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemovePhoto(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {photos.length < 6 && (
            <div className="w-full h-32">
              <ImageUpload onUpload={handleAddPhoto} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
