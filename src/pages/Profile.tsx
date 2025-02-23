
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Camera, User, Save } from "lucide-react";
import { Sidebar } from "@/components/layouts/Sidebar";

export default function Profile() {
  const navigate = useNavigate();
  const [pseudonyme, setPseudonyme] = useState("");
  const [niveau, setNiveau] = useState("");
  const [four, setFour] = useState("");
  const [petrin, setPetrin] = useState("");
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
        .select('pseudonyme, niveau, four, petrin')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPseudonyme(data.pseudonyme || "");
        setNiveau(data.niveau || "");
        setFour(data.four || "");
        setPetrin(data.petrin || "");
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
        .update({ 
          pseudonyme,
          niveau,
          four,
          petrin
        })
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
    <div className="flex min-h-screen bg-slate">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-64">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* En-tête du profil */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-basil shadow-lg">
                <AvatarImage src={avatarUrl || undefined} alt="Photo de profil" />
                <AvatarFallback className="bg-cream text-basil/30">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 translate-y-2">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="bg-basil rounded-full p-2 hover:bg-basil/90 transition-colors">
                    <Camera className="h-5 w-5 text-slate" />
                  </div>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold font-montserrat text-cream">Mon Profil</h1>
              <p className="text-cream/60 mt-1">Gérez vos informations personnelles</p>
            </div>
          </div>

          {/* Grille d'informations */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 space-y-6 border border-cream/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pseudo */}
              <div className="space-y-2">
                <Label htmlFor="pseudonyme" className="text-sm font-medium text-cream">
                  Pseudonyme
                </Label>
                <div className="relative">
                  <Input
                    id="pseudonyme"
                    type="text"
                    value={pseudonyme}
                    onChange={(e) => setPseudonyme(e.target.value)}
                    className="pl-10 bg-slate-700 border-cream/10 text-cream placeholder:text-cream/40"
                    placeholder="Votre pseudonyme"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/40" />
                </div>
              </div>

              {/* Niveau */}
              <div className="space-y-2">
                <Label htmlFor="niveau" className="text-sm font-medium text-cream">
                  Niveau
                </Label>
                <Select value={niveau} onValueChange={setNiveau}>
                  <SelectTrigger className="bg-slate-700 border-cream/10 text-cream">
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="confirme">Confirmé</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Four */}
              <div className="space-y-2">
                <Label htmlFor="four" className="text-sm font-medium text-cream">
                  Four
                </Label>
                <Input
                  id="four"
                  type="text"
                  value={four}
                  onChange={(e) => setFour(e.target.value)}
                  className="bg-slate-700 border-cream/10 text-cream placeholder:text-cream/40"
                  placeholder="Votre four"
                />
              </div>

              {/* Pétrin */}
              <div className="space-y-2">
                <Label htmlFor="petrin" className="text-sm font-medium text-cream">
                  Pétrin
                </Label>
                <Select value={petrin} onValueChange={setPetrin}>
                  <SelectTrigger className="bg-slate-700 border-cream/10 text-cream">
                    <SelectValue placeholder="Sélectionnez votre pétrin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans</SelectItem>
                    <SelectItem value="domestic">Domestic</SelectItem>
                    <SelectItem value="semi-pro">Semi Pro</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={updateProfile}
                className="bg-basil hover:bg-basil/90 text-slate font-medium px-6"
              >
                <Save className="h-5 w-5 mr-2" />
                <span>Enregistrer les modifications</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
