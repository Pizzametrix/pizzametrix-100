
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
      <div className="flex items-center justify-center min-h-screen bg-slate">
        <div className="text-cream animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* En-tête du profil */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-basil shadow-lg">
            <AvatarImage src={avatarUrl || undefined} alt="Photo de profil" />
            <AvatarFallback className="bg-cream text-basil text-2xl font-bold">
              x
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-montserrat text-cream">Mon Profil</h1>
            <p className="text-cream/60 mt-1">Gérez vos informations personnelles</p>
          </div>
        </div>

        {/* Formulaire du profil */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 space-y-6 border border-cream/5">
          {/* Section photo de profil */}
          <div>
            <Label htmlFor="avatar" className="sr-only">Photo de profil</Label>
            <div className="mt-1">
              <Button
                variant="outline"
                className="w-full py-8 border-2 border-dashed border-cream/20 rounded-lg hover:border-basil hover:bg-basil/5 transition-all duration-300"
              >
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-basil/10 rounded-full">
                    <Camera className="h-6 w-6 text-basil" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-cream block">
                      {uploading ? "Téléchargement..." : "Changer la photo de profil"}
                    </span>
                    <span className="text-xs text-cream/60 mt-1 block">
                      PNG, JPG (max. 10 Mo)
                    </span>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Section pseudonyme */}
          <div className="space-y-4">
            <Label htmlFor="pseudonyme" className="text-sm font-medium text-cream">
              Pseudonyme
            </Label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  id="pseudonyme"
                  type="text"
                  value={pseudonyme}
                  onChange={(e) => setPseudonyme(e.target.value)}
                  className="pl-10 bg-slate-700 border-cream/10 text-cream placeholder:text-cream/40 focus:border-basil focus:ring-1 focus:ring-basil"
                  placeholder="Votre pseudonyme"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/40" />
              </div>
              <Button 
                onClick={updateProfile}
                className="bg-basil hover:bg-basil/90 text-slate font-medium px-6"
              >
                <Save className="h-5 w-5 mr-2" />
                <span>Enregistrer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
