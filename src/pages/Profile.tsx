import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Profile() {
  const navigate = useNavigate();
  const [pseudonyme, setPseudonyme] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from('utilisateurs')
        .select('pseudonyme')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setPseudonyme(data.pseudonyme || "");
      }

      // Get avatar URL if exists
      const { data: avatarData } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(`${user.id}`);

      if (avatarData) {
        setAvatarUrl(avatarData.publicUrl);
      }

    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement du profil");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from('utilisateurs')
        .update({ pseudonyme })
        .eq('id', user.id);

      if (error) throw error;
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du profil");
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Vous devez sélectionner une image");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      toast.success("Photo de profil mise à jour");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du téléchargement de l'image");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-cream mb-8">Mon Profil</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="avatar" className="text-cream">Photo de profil</Label>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarUrl || undefined} alt="Photo de profil" />
              <AvatarFallback className="bg-cream text-basil">
                x
              </AvatarFallback>
            </Avatar>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
              className="text-cream"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pseudonyme" className="text-cream">Pseudonyme</Label>
          <Input
            id="pseudonyme"
            type="text"
            value={pseudonyme}
            onChange={(e) => setPseudonyme(e.target.value)}
            className="text-cream bg-slate-700 border-cream/10"
          />
        </div>

        <Button 
          onClick={updateProfile}
          className="w-full"
        >
          Mettre à jour le profil
        </Button>
      </div>
    </div>
  );
}
