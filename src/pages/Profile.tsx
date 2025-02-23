
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Save, User } from "lucide-react";

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
      const filePath = `${user.id}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-cream animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-xl mx-auto p-4">
      <div className="bg-slate/50 backdrop-blur-sm rounded-lg border border-cream/10 p-6 space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-cream/10">
          <Avatar className="w-24 h-24 border-2 border-cream/20">
            <AvatarImage src={avatarUrl || undefined} alt="Photo de profil" />
            <AvatarFallback className="bg-cream text-basil">
              x
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-cream">Mon Profil</h1>
            <p className="text-cream/60 text-sm">Gérez vos informations personnelles</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Label htmlFor="avatar" className="sr-only">Photo de profil</Label>
            <Button
              variant="outline"
              className="w-full border-dashed border-2 border-cream/20 text-cream hover:text-basil hover:border-basil h-24 relative"
            >
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <Camera className="h-6 w-6" />
                <span className="text-sm">
                  {uploading ? "Téléchargement..." : "Changer la photo de profil"}
                </span>
              </div>
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pseudonyme" className="text-cream">Pseudonyme</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="pseudonyme"
                  type="text"
                  value={pseudonyme}
                  onChange={(e) => setPseudonyme(e.target.value)}
                  className="text-cream bg-slate-700/50 border-cream/10 pl-10"
                  placeholder="Votre pseudonyme"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/40" />
              </div>
              <Button 
                onClick={updateProfile}
                className="bg-basil hover:bg-basil/90 text-slate"
              >
                <Save className="h-5 w-5" />
                <span className="hidden sm:inline ml-2">Enregistrer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
